import { useEffect, useState } from "react";

import styled from "styled-components";
import { Button, Select, TextField, MenuItem } from "@mui/material";

function DietField(params) {
  console.log(params);
  const { food, addFood, deleteFood, index } = params;
  const { name, isChild } = food;
  const [category, setCategory] = useState(
    food.category === "" ? "RICE" : food.category
  );

  const menuItems = [
    "밥",
    "국수",
    "만두",
    "국",
    "찜",
    "면",
    "구이",
    "전",
    "볶음",
    "조림",
    "튀김",
    "나물",
    "김치",
    "절임",
  ];
  const menuCategorys = {
    RICE: "밥",
    NOODLE: "면",
    MANDU: "만두",
    SOUP: "국",
    STEAM: "찜",
    ROAST: "구이",
    JEON: "전",
    STIR_FRY: "볶음",
    JORIM: "조림",
    FRY: "튀김",
    NAMUL: "나물",
    KIMCHI: "김치",
    PICKLED: "절임",
  };

  useEffect(() => {
    setCategory(food.category === "" ? "RICE" : food.category);
  }, [food]);

  return (
    <SingleMenu>
      <TextField size='small' placeholder={food ? name : ""} />
      <Select
        onChange={(e) => setCategory(e.target.value)}
        value={menuCategorys[category]}
        style={{ width: 80, margin: "0px 20px 0px 20px" }}
      >
        {menuItems.map((menu) => {
          return (
            <MenuItem value={menu} key={menu}>
              {menu}
            </MenuItem>
          );
        })}
      </Select>
      {isChild ? (
        <Button
          variant='outlined'
          size='large'
          onClick={() => deleteFood(index)}
        >
          삭제
        </Button>
      ) : (
        <Button variant='outlined' size='large' onClick={addFood}>
          추가
        </Button>
      )}
    </SingleMenu>
  );
}

const SingleMenu = styled.div`
  height: 40px;
  display: flex;
  margin-bottom: 20px;
`;

export default DietField;
