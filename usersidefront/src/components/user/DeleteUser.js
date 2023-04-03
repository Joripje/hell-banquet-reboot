import { deleteUser } from "../../api/member"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

function DeleteUser(params) {
    const { userInfo } = params
    const navigate = useNavigate()

    async function userDelete() {
        console.log(userInfo)
        await deleteUser(
            userInfo,
            (data) => {
                console.log(data)
                navigate('/login')
            }, 
            (err) => console.log(err)
        )
    }

    return (
        <Button variant="contained" color="error" onClick={userDelete} style={{marginBottom: 20, width: '10rem', height: '3rem'}} >
            계정 삭제
        </Button>

    )
}

export default DeleteUser