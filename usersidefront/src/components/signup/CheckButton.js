import { Button } from "@mui/material"

/*
    지금 위치하고 있는 TextField의 값을 가져와서 request에 넣어서 보내야함
*/
function CheckButton(params) {
    const { target, targetValue } = params
    const requestData = {}
    requestData[target] = targetValue


    const checkUnique = async (e) => {
        console.log(e)
        e.preventDefault()
        await checkUnique(
            requestData,
            (data) => {
                console.log(data)
            },
            (err) => console.log(err)
        )
    }
   
    return(
        <Button onClick={checkUnique}>
            중복 확인
        </Button>
    )
}

export default CheckButton