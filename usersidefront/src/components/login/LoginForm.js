import { useState }  from 'react'
import { useNavigate } from 'react-router-dom'
// import { useCookies } from 'react-cookie'

import { login } from '../../api/member'
import { FormWithGrid } from "../common"


function LoginForm () {
    const navigate = useNavigate()
    // const [ cookie, setCookie ] = useCookies(['userInfo'])
    const [ inputID, setInputID ] = useState()
    const [ inputPassword, setInputPassword ] = useState()

    const textFieldOption = [
        {id: "userId", target:inputID, setTarget: setInputID, label: "ID or E-Mail", focus: true, type: "id"},
        {id: "password", target: inputPassword, setTarget: setInputPassword, label: "Password", focus: false, type: "password"},
    ]

    const temp_user_info = Object.keys(textFieldOption).reduce((acc, key) => {
        acc[textFieldOption[key].id] = textFieldOption[key].target;
        return acc;
      }, {});

    const onTypingHandler = (e) => {
        for (const key in textFieldOption) {
            const option = textFieldOption[key];
            if (e.target.id === option.id) {
                option.setTarget(e.target.value);
                break;
            }
        }
    };

    const onClickHandler = (e) => {
        e.preventDefault()
        // 제대로된 request로 바꿔야 함
        axios_test()
        console.log(inputID, inputPassword, temp_user_info)
    }

    async function axios_test() {
        await login(
            temp_user_info,
            (data) => {
                alert(data.data)
                navigate('/')
            },
            (err) => console.log(err)
        )
    }

    return (
        <>
            {FormWithGrid({option: textFieldOption, onClickHandler: onClickHandler, onTypingHandler: onTypingHandler})}
        </>
    )   
}
export default LoginForm