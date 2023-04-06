import styled from "styled-components";

function DrawSubject(params) {
  const { subjectIndex } = params;

  // const subject = '조재경'
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
  // console.log(subjects[subjectIndex]);
  return (
    <ColumnBox>
      <MyTypo fontSize="20"></MyTypo>
      <MyTypo fontSize="30">{subjects[subjectIndex]}</MyTypo>
    </ColumnBox>
  );
}

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const MyTypo = styled.span`
  font-size: ${(props) => {
    return props.fontSize;
  }}px;
  margin: 8% 5% 0% 5%;
`;

export default DrawSubject;
