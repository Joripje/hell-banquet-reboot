import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { LogedPageTemplate } from "../../components/common";
import { MenuOverview } from "../../components/menu";
import { postRecordMeal } from "../../api/ai";
import {
  getCookieGameInfo,
  getDrawingGameInfo,
  sendLeftoverData,
} from "../../api/leftover";
import PlateSrc from "../../assets/images/plate.png";

import styled from "styled-components";
import { Button } from "@mui/material";
import { Replay, CheckCircleOutline } from "@mui/icons-material";
import { green } from "@mui/material/colors";

function RecordMeal() {
  const navigate = useNavigate();
  const [isUploaded, setIsUploaded] = useState([false, false]);
  const [mealImages, setMealImages] = useState([undefined, undefined]);
  const [selectedMenu, setSelectedMenu] = useState("A");

  const handleTakeImg = (event, target) => {
    const file = event.target?.files[0];
    if (!file) return;

    shrinkImage(file)
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        const newImage = [...mealImages];
        newImage[target] = imageUrl;
        setMealImages(newImage);

        const newMealImg = [...mealImages];
        newMealImg[target] = imageUrl;
        setMealImages(newMealImg);
      })
      .catch((error) => console.error(error));
  };

  const handleUploadImg = async (event, target) => {
    event.preventDefault();
    const imageUrl = mealImages[target];
    if (!imageUrl) return;

    await postRecordMeal(
      imageUrl,
      (data) => {
        return data.data;
      },
      (err) => console.log(err)
    ).then((data) => {
      const newImage = [...mealImages];
      newImage[target] = data?.s3_file_path;
      setMealImages(newImage);

      const newBoolean = [...isUploaded];
      newBoolean[target] = data?.amount;
      setIsUploaded(newBoolean);
    });
  };

  const shrinkImage = (file) => {
    const newWidth = 400;
    const newHeight = 300;
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, file.type);
      };
      image.onerror = reject;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ratio = Math.floor((isUploaded[0] / isUploaded[1]) * 100);
    const leftOverData = {
      before: isUploaded[0],
      after: isUploaded[1],
      courseNo: selectedMenu === "A" ? 0 : 1,
      userId: localStorage.getItem("userId"),
    };

    await sendLeftoverData(
      leftOverData,
      (data) => {
        alert(
          `${data.data}
          ${ratio}만큼 잔반이 생성됐습니다! 
          ${ratio >= 20 ? "유감입니다!" : "감사합니다!"}`
        );
        navigate("/janban");
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const userStateChecker = async () => {
      const cookie = await getCookieGameInfo(
        {
          today: today,
          userId: localStorage.getItem("userId"),
        },
        (data) => {
          return data.data;
        },
        (err) => console.log(err)
      ).then((result) => {
        return result;
      });
      const drawing = await getDrawingGameInfo(
        {
          today: today,
          userId: localStorage.getItem("userId"),
        },
        (data) => {
          return data.data;
        },
        (err) => console.log(err)
      ).then((result) => {
        return result;
      });

      if (cookie || drawing) {
        navigate("/janban");
      }
    };
    userStateChecker();
  }, [mealImages]);

  return (
    <LogedPageTemplate>
      <TypoStyle style={{ fontSize: 24, padding: 20 }}>
        식판 사진을 업로드
      </TypoStyle>
      <MenuOverview
        target={selectedMenu}
        onClick={(target) => setSelectedMenu(target)}
      />
      <StyledContainer style={{ marginBottom: 100, marginTop: 30 }}>
        <MealBox>
          <MealInput
            type='file'
            accept='image/*'
            onChange={(event) => handleTakeImg(event, 0)}
          />
          <MealImg
            src={mealImages[0] ? mealImages[0] : PlateSrc}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {mealImages[0] === undefined ? (
            <MealAlt src={mealImages[0]}>Before</MealAlt>
          ) : (
            <>
              <CheckCircleOutline
                sx={{ color: green[500] }}
                style={sytleForButton}
                onClick={(event) => handleUploadImg(event, 0)}
              />
              <Replay color='primary' style={sytleForRetryButton} />
            </>
          )}
        </MealBox>
        <MealBox>
          <MealInput
            type='file'
            accept='image/*'
            onChange={(event) => handleTakeImg(event, 1)}
          />
          <MealImg
            src={mealImages[1] ? mealImages[1] : PlateSrc}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {mealImages[1] === undefined ? (
            <MealAlt src={mealImages[0]}>After</MealAlt>
          ) : (
            <>
              <CheckCircleOutline
                sx={{ color: green[500] }}
                style={sytleForButton}
                onClick={(event) => handleUploadImg(event, 1)}
              />
              <Replay color='primary' style={sytleForRetryButton} />
            </>
          )}
        </MealBox>
        {isUploaded[0] !== false && isUploaded[1] !== false ? (
          <>
            <TypoStyle style={{ fontSize: 24, padding: 20 }}>
              정말 제출하시겠습니까?
            </TypoStyle>
            <Button
              variant='contained'
              style={{ width: "40%", backgroundColor: "#950101" }}
              size='large'
              onClick={handleSubmit}
            >
              <TypoStyle>예</TypoStyle>
            </Button>
          </>
        ) : (
          <></>
        )}
      </StyledContainer>
    </LogedPageTemplate>
  );
}

const styleForSection = {
  width: "100%",
  height: "300px",

  border: "none",

  borderRadius: "30px",
};

const sytleForButton = {
  position: "absolute",
  right: "5%",
  bottom: "5%",
  zIndex: 2,

  width: "60px",
  height: "60px",

  cursor: "pointer",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "35px",
};

const sytleForRetryButton = {
  ...sytleForButton,
  left: "5%",
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0px 16px 0px 16px;
  marginbottom: 100;
  margintop: 30;
`;

const MealBox = styled.label`
  ${styleForSection}
  margin: 10px 0px 10px 0px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const MealInput = styled.input`
  display: none;
`;

const MealImg = styled.img`
  ${styleForSection}
  z-index: 1;
  border: none;
`;

const MealAlt = styled.p`
  position: absolute;
  font-size: 36px;
  font-weight: 1000;
  z-index: ${(props) => (props.src ? -1 : 1)};
`;

const styleForTypo = {
  fontFamily: "ChosunCentennial",
  margin: 0,
};

const TypoStyle = styled.p`
  ${styleForTypo}
`;

export default RecordMeal;
