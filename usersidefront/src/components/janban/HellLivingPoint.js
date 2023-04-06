import { useState, useEffect } from "react";
import styled from "styled-components";

function HellLivingPoint() {
  const [randomIndex, setRandomIndex] = useState(0);
  const tips = [
    "지옥에는 비빔밥이란 단어가 없습니다. 이미 다 비벼져 있죠.",
    "지옥에선 자기가 한 말에 영원히 책임을 져야 합니다.",
    "쯔양은 평생 잔반 면제권이 있다고 합니다.",
    "해반이는 팔 대신 지느러미가 있습니다.",
    "잔반을 너무 많이 가져간 잔반이는 염라대왕과 개인면담 시간을 가집니다.",
    "잔반이의 정체는 잔반의 요정으로, 버려지는 음식들의 한을 풀어주기 위해 탄생했습니다.",
    "잔반이의 정체는 잔반의 요정으로, 버려지는 음식들의 한을 풀어주기 위해 탄생했습니다.",
    "잔반이의 정체는 잔반의 요정으로, 버려지는 음식들의 한을 풀어주기 위해 탄생했습니다.",
    "잔반이의 정체는 잔반의 요정으로, 버려지는 음식들의 한을 풀어주기 위해 탄생했습니다.",
    "알레르기가 생기는 이유는 잔반이가 먹고 싶어 장난을 친 것입니다.",
    "ALGO 계셨나요? 흘린 물은 주워담을 수 없습니다.",
    "살아생전 밥을 많이 남긴 사람은 잔반이로 환생합니다. 기준이요? 대외비입니다.",
    "기술의 발전으로 지옥에 잔반량 인식 AI가 도입되었습니다.",
    "지옥에서도 개발자 붐이 일고 있습니다.",
    "10층에 가는 사람들은 면제권이 부여됩니다.",
    "지옥에선 게시물도 죽을 수 없습니다."
  ];
  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * tips.length));
  }, []);

  return <TypoContent>
    <TypoTip>지옥 뷔페 Tip</TypoTip>
    {tips[randomIndex]}</TypoContent>;
}

const TypoTip = styled.p`
  margin: 0;
  font-family: ChosunCentennial;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`

const TypoContent = styled.div`
  position: absolute;
  top: 5%;
  right: 2%;

  width: 40%;
  height: auto;
  font-size: 16px;

  padding: 10px;
  background: #e5e5e5;

  font-family: ChosunCentennial;
  border: 1px solid black;
  border-radius: 10px;
`;

export default HellLivingPoint;
