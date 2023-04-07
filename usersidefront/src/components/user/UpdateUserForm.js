import { updateUserInfo } from "../../api/member"

import { Button } from "@mui/material"

function UpdateUser(params) {
    const { userInfo, isChanging } = params

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
        <Button variant="contained" onClick={update} style={{marginBottom: 20, width: '10rem', height: '3rem'}} >
            {isChanging ? '수정 완료' : '수정하기'}
        </Button>
    )
}


export default UpdateUser