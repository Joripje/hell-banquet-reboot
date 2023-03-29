import { useState, useRef, useEffect } from "react"

import { Camera } from "../components/camera"
import { LogedPageTemplate } from "../components/common"

import styled from "styled-components"
import { Container, TextField } from "@mui/material"

function RecordMeal() {
    const cameraRef = useRef()
    const [target, setTarget] = useState(-1)
    const [mealImages, setMealImages] = useState([undefined, undefined]);

    const handleCapture = (blob) => {
        const imageUrl = URL.createObjectURL(blob);
        const newImage = [...mealImages];
        newImage[target] = imageUrl;
        setMealImages(newImage);
    };
    
    const handleStartStream = (event) => {
        const camera = cameraRef.current;
        setTarget(event)
        if (camera) {
            camera.startStream();
        }
    };

    const handleUploadImg = (e) => {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        const newImage = [...mealImages];
        newImage[target] = imageUrl;
        setMealImages(newImage);
    }


    useEffect(() => {
    }, [mealImages])

    return (
        <>
        <LogedPageTemplate />
        <StyledContainer style={{marginBottom: 100, marginTop: 30}}>
            <Camera ref={cameraRef} onCapture={handleCapture} />
            <MealBox onClick={() => handleStartStream(0)}  >
                <MealImg src={mealImages[0]} 
                onError={(e) => { e.target.style.display = 'none'; }} />
                <MealAlt src={mealImages[0]} >Before</MealAlt>
            </MealBox>
            <MealBox onClick={() => handleStartStream(1)}  >
                <MealImg src={mealImages[1]}
                onError={(e) => { e.target.style.display = 'none'; }} />
                <MealAlt src={mealImages[1]} >After</MealAlt>
            </MealBox>
            <TextField type="file" accept="image/*" onChange={handleUploadImg}/>,
        </StyledContainer>
        </>
    )
}

const StyledContainer = styled(Container)`
    marginBottom: 100;
    marginTop: 30;
`

const styleForSection = `
    width: 100%;
    height: 300px;
    background: #E5E5E5;

    border-radius: 30px;
`

const MealBox = styled.div`
    ${styleForSection}
    margin: 10px 0px 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;

`

const MealImg = styled.img`
    ${styleForSection}
    z-index: ${props => props.src === undefined ? -1 : 1};
`

const MealAlt = styled.p`
    position: absolute;
    font-size: 36px;
    font-weight: 1000;
    z-index: ${props => props.src === undefined ? 1 : -1};
`

export default RecordMeal