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

import LoadingImg from "../../assets/images/loadingFood.gif";

function RecordMeal() {
  const navigate = useNavigate();
  const [isUploaded, setIsUploaded] = useState([false, false]);
  const [mealImages, setMealImages] = useState([undefined, undefined]);
  const [selectedMenu, setSelectedMenu] = useState("A");

  const [isUploadingImg, setIsUploadingImg] = useState([false, false]); // 로딩이미지
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

    const loadImgBoolean = [...isUploadingImg];
    loadImgBoolean[target] = !isUploadingImg[target];
    setIsUploadingImg(loadImgBoolean);

    await postRecordMeal(
      imageUrl,
      (data) => {
        return data.data;
      },
      (err) => {
        console.log(err);
      }
    )
      .then((data) => {
        console.log(data);
        if (data.status === false) {
          alert("식판이 감지되지 않았습니다. 사진을 다시 찍어주세요.");
        }
        const newImage = [...mealImages];
        newImage[target] = data?.s3_file_path;
        setMealImages(newImage);

        const newBoolean = [...isUploaded];
        newBoolean[target] = data?.amount;
        setIsUploaded(newBoolean);

        const loadImgBoolean = [...isUploadingImg];
        loadImgBoolean[target] = false;
        setIsUploadingImg(loadImgBoolean);
      })
      .catch((err) => {
        console.log(err);
        const loadImgBoolean = [...isUploadingImg];
        loadImgBoolean[target] = false;
        setIsUploadingImg(loadImgBoolean);
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
    const ratio = Math.floor((isUploaded[1] / isUploaded[0]) * 100);
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
        alert("오늘은 이미 밥을 드셨군요!");
        navigate("/record-meal/janban");
      }
    };
    userStateChecker();
  }, [mealImages, navigate]);

  return (
    <LogedPageTemplate>
      {/* <MealImg src={LoadingImg}/> */}
      <MessageBox>
        <TypoStyle style={{ fontSize: 22, padding: 18, fontWeight: "bold" }}>
          지옥 뷔페에 오신 것을 환영합니다...
        </TypoStyle>
        <TypoStyle style={{ color: "#5f5f5f", paddingBottom: 15 }}>
          입장을 위해 메뉴 선택 후 식사 전후 사진을 올려주세요.
        </TypoStyle>
        <TypoStyle style={{color: "#950101", padding: 5, fontSize: 20, fontWeight: "bold"}}>
          주의사항
        </TypoStyle>
        <TypoStyle>
          1. 식판이 전부 보이게 찍어주세요.
        </TypoStyle>
        <TypoStyle>
          2. 최종 제출 후에는 사진 수정이 불가합니다.
        </TypoStyle>
        <TypoStyle style={{fontWeight: "bold"}}>
          3. 잔반을 남기면 지옥에서 먹어야합니다.
        </TypoStyle>
      </MessageBox>
      <MenuOverview
        target={selectedMenu}
        onClick={(target) => setSelectedMenu(target)}
      />
      <StyledContainer style={{ marginBottom: 100, marginTop: 30 }}>
        <MealBox>
          <MealInput
            type="file"
            accept="image/*"
            onChange={(event) => handleTakeImg(event, 0)}
          />
          {isUploadingImg[0] ? (
            <div>
              <p style={{ position: "absolute", bottom: "5%", left: "40%" }}>
                음식을 인식하는 중...
              </p>
              <MealImg src={LoadingImg} />
            </div>
          ) : (
            <MealImg
              src={mealImages[0] ? mealImages[0] : PlateSrc}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          {mealImages[0] === undefined ? (
            <MealAlt src={mealImages[0]}>Before</MealAlt>
          ) : (
            <>
              <CheckCircleOutline
                sx={{ color: green[500] }}
                style={sytleForButton}
                onClick={(event) => handleUploadImg(event, 0)}
              />
              <Replay color="primary" style={sytleForRetryButton} />
            </>
          )}
        </MealBox>
        <MealBox>
          <MealInput
            type="file"
            accept="image/*"
            onChange={(event) => handleTakeImg(event, 1)}
          />
          {isUploadingImg[1] ? (
            <div>
              <p style={{ position: "absolute", bottom: "5%", left: "30%" }}>
                잔반을 지옥으로 가져가는 중...
              </p>
              <MealImg src={LoadingImg} />
            </div>
          ) : (
            <MealImg
              src={mealImages[1] ? mealImages[1] : PlateSrc}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          {mealImages[1] === undefined ? (
            <MealAlt src={mealImages[1]}>After</MealAlt>
          ) : (
            <>
              <CheckCircleOutline
                sx={{ color: green[500] }}
                style={sytleForButton}
                onClick={(event) => handleUploadImg(event, 1)}
              />
              <Replay color="primary" style={sytleForRetryButton} />
            </>
          )}
        </MealBox>
        {isUploaded[0] !== false && isUploaded[1] !== false ? (
          <>
            <TypoStyle style={{ fontSize: 24, padding: 20 }}>
              정말 제출하시겠습니까?
            </TypoStyle>
            <Button
              variant="contained"
              style={{ width: "40%", backgroundColor: "#950101" }}
              size="large"
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
  padding: 5px;
`;

const MessageBox = styled.div`
  background: #faf6ee;
  padding: 5px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default RecordMeal;
