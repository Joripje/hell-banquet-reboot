import { getUserImg } from "../../api/janbani";
import { useState, useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const RequestJanbani = (props) => {
  const subjects = [
    "나비넥타이",
    "케이크",
    "캠프파이어",
    "고양이",
    "꽃",
    "기타",
    "헬멧",
    "콧수영",
    "낙하산",
    "총",
    "삽",
    "스노클",
    "눈사람",
    "트럼펫",
    "우산",
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [userJanbani, setUserJanbani] = useState(null);
  useEffect(() => {
    const getUserJanban = async () => {
      await getUserImg(
        { userId: localStorage.getItem("userId") },
        (data) => {
          return data.data;
        },
        (err) => console.log(err)
      ).then((res) => {
        setUserJanbani(res);
        setIsLoading(false);
      });
    };
    getUserJanban();
  }, []);
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <ParentContainer>
          <StyledImg src={userJanbani} />
          <SpeechBubble>
            {subjects[props.subjectIndex]}가 <br />
            갖고 싶어요...
          </SpeechBubble>
          <br />
          <br />
          <SpeechBubbleMe onClick={props.handleOpen}>
            좋았어! <br /> 도전!!!
          </SpeechBubbleMe>
        </ParentContainer>
      )}
    </>
  );
};

const ParentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledImg = styled.img`
  width: 90%;
  height: auto;
`;

const SpeechBubble = styled.div`
  background: #b9dacc;
  border-radius: 0.4em;
  width: 50%;
  height: auto;
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 24px solid transparent;
    border-bottom-color: #b9dacc;
    border-top: 0;
    margin-left: -24px;
    margin-top: -24px;
  }
`;

const SpeechBubbleMe = styled.div`
  background: #9ecdff;
  border-radius: 0.4em;
  width: 50%;
  height: auto;
  font-size: 2rem;

  font-weight: bold;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 24px solid transparent;
    border-top-color: #9ecdff;
    border-bottom: 0;
    margin-left: -24px;
    margin-bottom: -24px;
  }
`;

export default RequestJanbani;
