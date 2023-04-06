import { useState, useEffect } from "react";
import styled from "styled-components"

function HellLivingPoint() {
    const [randomIndex, setRandomIndex] = useState(0)
    const tips = ['지옥엔 비빔밥이란 단어가 없습니다. 이미 다 비벼져 있죠.', '지옥에선 게시글을 삭제할 수 없답니다. 한 말에 책임을 질 줄 알아야 합니다.', '쯔양은 평생 잔반 면제권이 있다고 합니다.', '해반이에겐 팔이 없어 모든 걸 입으로 한답니다.', '잔반을 너무 많이 가져간 잔반이는 염라대왕과 개인면담 시간을 가져야 합니다.', '잔반이의 정식명칭은 잔반의 요정으로, 버려진 음식들의 한을 풀어주기 위해 탄생했답니다.', '알레르기가 생기는 이유는 잔반이가 그 음식이 먹고 싶어 장난을 친 것입니다.']
    useEffect(() => {
        setRandomIndex(Math.floor(Math.random() * tips.length))
    }, [])

    return(<TypoContent>{tips[randomIndex]}</TypoContent>)
}

const TypoContent = styled.div`
position: absolute;
top: 9%;
right: 9%;

width: 40%;
height: auto;
font-size: 16px;

padding: 10px;
background: #e5e5e5;

font-family: ChosunCentennial;
border: 1px solid black;  
border-radius: 10px;
  
`;

export default HellLivingPoint