import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// import { Camera } from "../components/camera";
import { LogedPageTemplate } from "../components/common";

import styled from "styled-components";
import { Button } from "@mui/material";
import { postRecordMeal } from "../api/ai";
import { sendLeftoverData } from "../api/leftover";

function RecordMeal() {
  const navigate = useNavigate();
  const [mealImages, setMealImages] = useState([undefined, undefined]);
  const [isUploaded, setIsUploaded] = useState([false, false]);

  const handleTakeImg = (event, target) => {
    const file = event.target?.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const newImage = [...mealImages];
    newImage[target] = imageUrl;
    setMealImages(newImage);
  };

  const handleUploadImg = async (event, target) => {
    event.preventDefault();
    const imageUrl = mealImages[target];
    if (!imageUrl) return;

    await postRecordMeal(
      imageUrl,
      (data) => {
        console.log(data);
        return data;
      },
      (err) => console.log(err)
    ).then((data) => {
      if (data) {
        const newImage = [...mealImages];
        newImage[target] = data?.s3_file_path;
        setMealImages(newImage);

        const newBoolean = [...isUploaded];
        newBoolean[target] = data?.amount;
        setIsUploaded(newBoolean);
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ratio = Math.floor((isUploaded[0] / isUploaded[1]) * 100);
    const leftOverData = {
      before: isUploaded[0],
      after: isUploaded[1],
      courseNo: 0,
      userId: localStorage.getItem("userId"),
    };

    await sendLeftoverData(
      leftOverData,
      (data) => {
        console.log(data);
        alert(
          `${ratio}만큼 잔반이 생성됐습니다! 
          ${ratio >= 20 ? "유감입니다!" : "감사합니다!"}`
        );
        navigate("/janban");
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {}, [mealImages]);

  return (
    <>
      <LogedPageTemplate />
      <StyledContainer style={{ marginBottom: 100, marginTop: 30 }}>
        {/* <Camera ref={cameraRef} onCapture={handleCapture} /> */}
        <MealBox>
          <MealInput
            type='file'
            accept='image/*'
            onChange={(event) => handleTakeImg(event, 0)}
          />
          <MealImg
            src={mealImages[0]}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {mealImages[0] === undefined ? (
            <MealAlt src={mealImages[0]}>Before</MealAlt>
          ) : (
            <Button
              style={sytleForButton}
              variant='contained'
              color='warning'
              onClick={(event) => handleUploadImg(event, 0)}
            >
              제출하기
            </Button>
          )}
        </MealBox>
        <MealBox>
          <MealInput
            type='file'
            accept='image/*'
            onChange={(event) => handleTakeImg(event, 1)}
          />
          <MealImg
            src={mealImages[1]}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {mealImages[1] === undefined ? (
            <MealAlt src={mealImages[0]}>After</MealAlt>
          ) : (
            <Button
              style={sytleForButton}
              variant='contained'
              color='warning'
              onClick={(event) => handleUploadImg(event, 1)}
            >
              제출하기
            </Button>
          )}
        </MealBox>
        <Button
          variant='contained'
          style={{ width: "50%", marginTop: 30 }}
          size='large'
          onClick={handleSubmit}
        >
          최종제출
        </Button>
        {/* <TextField type='file' accept='image/*' onChange={handleUploadImg} />, */}
      </StyledContainer>
    </>
  );
}

const styleForSection = `
    width: 100%;
    height: 300px;
    background: #E5E5E5;

    border-radius: 30px;
`;

const sytleForButton = {
  position: "absolute",
  right: "0%",
  bottom: "0%",
  // transform: "translate(-50%, -50%)",
  zIndex: 2,

  width: "30%",
  height: "20%",
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
  z-index: ${(props) => (props.src === undefined ? -1 : 1)};
`;

const MealAlt = styled.p`
  position: absolute;
  font-size: 36px;
  font-weight: 1000;
`;

export default RecordMeal;
