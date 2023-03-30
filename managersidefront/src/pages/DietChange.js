import { DateSelector } from "../components/common"
import { HeaderBar, SideBar } from "../components/navbar"

import styled from "styled-components"
import { DietField, ExcelButton } from "../components/diet"
import { useEffect, useState } from "react"
import { Button, ButtonGroup } from "@mui/material"

function DietChange() {
    const emptyFood = {name: '', category: '', isChild: true}
    const dummyDiet = { A: [
        {name: '', category: '', isChild: false},
        {name: '', category: '', isChild: true},
        {name: '', category: '', isChild: true},
        {name: '', category: '', isChild: true},
        {name: '', category: '', isChild: true},
        {name: '', category: '', isChild: true},
    ],
    B: [
        {name: '', category: '', isChild: false},
        {name: '', category: '', isChild: true},
        {name: '', category: '', isChild: true},
        {name: '', category: '', isChild: true},
        {name: '', category: '', isChild: true},
        {name: '', category: '', isChild: true},
    ]}
    const [ foodList, setFoodList ] = useState(dummyDiet)
    const [ selectedButton, setSelectedButton ] = useState('A') 

    useEffect(() => {

    }, [ foodList ])

    const addFood = (target) => {
        setFoodList({...foodList[target], emptyFood})
    }

    const deleteFood = (index) => {
        const newFoodList = [...foodList];
        newFoodList.splice(index, 1);
        setFoodList(newFoodList);
    };

    const styleForButton = {
        color: '#000000',
        fontWeight: 1000,
        border: '2px solid black',
    }

    return (
        <>
        <HeaderBar />
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <SideBar />
            <Container >
                <ExcelButton buttonName={'식단 일괄 수정'}/>
                <FlexBox style={{display: 'flex', }}>
                    <DateSelector />
                    <ButtonGroup style={{marginLeft: 20}}>
                        <Button onClick={() => setSelectedButton('A')} variant={selectedButton === 'A' ? 'contained' : 'outlined'} >A : 한식</Button>
                        <Button onClick={() => setSelectedButton('B')} variant={selectedButton === 'B' ? 'contained' : 'outlined'}>B : 일품</Button>
                    </ButtonGroup>
                </FlexBox>
                <br />
                {foodList[selectedButton].map((food, index) => {
                    return (
                        <DietField food={food} key={index} index={index} addFood={addFood} deleteFood={deleteFood} />
                        )
                    })}
                <br />
                <hr />
            </Container>
            <Container style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="outlined" style={styleForButton} >등록</Button>
            </Container>
        </div>
    </>
    )
}

const Container = styled.div`
    width: 100vh;
    margin: 30px calc(15%) 0px calc(200px + 15%);
`

const FlexBox = styled.div`
    display: flex;
`

export default DietChange