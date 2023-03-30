import { Button, Select, TextField, MenuItem, } from "@mui/material"
import styled from "styled-components"

function DietField(params) {
    const { food, addFood, deleteFood, index } = params
    const { isChild, } = food

    const menuItems = [ 
        '밥', '국수', '만두', '국', '찜', '구이',
        '전', '볶음', '조림', '튀김', '나물', '김치', '절임'
    ]

    return (
        <SingleMenu>
            <TextField size="small"/>
            <Select defaultValue={'밥'} style={{width: 80, margin: '0px 20px 0px 20px'}} >
                {menuItems.map((menu) => {
                    return (
                        <MenuItem value={menu} key={menu}>{menu}</MenuItem>
                    )
                })}
            </Select>
            {isChild 
            ? <Button variant="outlined" size="large" onClick={() => deleteFood(index)}>삭제</Button> 
            : <Button variant="outlined" size="large" onClick={addFood} >추가</Button>}
        </SingleMenu>
    )
}

const SingleMenu = styled.div`
    height: 40px;
    display: flex;
    margin-bottom: 20px;
`

export default DietField