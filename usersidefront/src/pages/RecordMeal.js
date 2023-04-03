import { useState, useEffect } from "react";

// import { Camera } from "../components/camera";
import { LogedPageTemplate } from "../components/common";

import styled from "styled-components";
import { Container } from "@mui/material";

function RecordMeal() {
  const [mealImages, setMealImages] = useState([undefined, undefined]);

  const handleUploadImg = (event, target) => {
    const file = event.target?.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const newImage = [...mealImages];
    newImage[target] = imageUrl;
    setMealImages(newImage);
  };

  useEffect(() => {}, [mealImages]);

  return (
    <>
      <LogedPageTemplate />
      <StyledContainer style={{ marginBottom: 100, marginTop: 30 }}>
        {/* <Camera ref={cameraRef} onCapture={handleCapture} /> */}
        <MealBox onClick={() => handleUploadImg(0)}>
          <MealInput
            type='file'
            accept='image/*'
            onChange={(event) => handleUploadImg(event, 0)}
          />
          <MealImg
            src={mealImages[0]}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <MealAlt src={mealImages[0]}>Before</MealAlt>
        </MealBox>
        <MealBox onClick={() => handleUploadImg(1)}>
          <MealInput
            type='file'
            accept='image/*'
            onChange={(event) => handleUploadImg(event, 0)}
          />
          <MealImg
            src={mealImages[1]}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <MealAlt src={mealImages[1]}>After</MealAlt>
        </MealBox>
        {/* <TextField type='file' accept='image/*' onChange={handleUploadImg} />, */}
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled(Container)`
  marginbottom: 100;
  margintop: 30;
`;

const styleForSection = `
    width: 100%;
    height: 300px;
    background: #E5E5E5;

    border-radius: 30px;
`;

const MealBox = styled.label`
  ${styleForSection}
  margin: 10px 0px 10px 0px;
  display: flex;
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
  z-index: ${(props) => (props.src === undefined ? 1 : -1)};
`;

export default RecordMeal;
