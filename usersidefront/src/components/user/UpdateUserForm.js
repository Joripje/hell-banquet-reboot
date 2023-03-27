import { Button } from "@mui/material"
// import { useState } from "react"
import { updateUserInfo } from "../../api/member"

function UpdateUser(params) {
    // const { userInfo } = params
    const userInfo = {
        id: 'ssafy',
        email: 'ssafy@gmail.com'
    }

    async function update() {
        await updateUserInfo(
            userInfo,
            (data) => {
                console.log(data)
            }, 
            (err) => console.log(err)
        )
    }

    return (
        <Button variant="contained" onClick={update} >
            수정 완료
        </Button>
    )
}


export default UpdateUser