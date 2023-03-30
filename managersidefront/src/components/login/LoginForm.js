import { useState }  from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useCookies } from 'react-cookie'

import { login } from '../../api/member'
import { FormWithGrid } from "../common"


function LoginForm () {
    // const navigate = useNavigate()
    // const [ cookie, setCookie ] = useCookies(['userInfo'])
    const [ inputID, setInputID ] = useState()
    const [ inputPassword, setInputPassword ] = useState()

    const textFieldOption = [
        {id: "userId", target:inputID, setTarget: setInputID, label: "ID or E-Mail", focus: true, type: "id"},
        {id: "password", target: inputPassword, setTarget: setInputPassword, label: "Password", focus: false, type: "password"},
    ]

    const tempUserInfo = Object.keys(textFieldOption).reduce((acc, key) => {
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

    async function LoginFunc(userInfo) {
        await login(
            userInfo,
            (data) => {
                // Refresh Token과 Authorization을 cookie나 session에 저장해야함
                localStorage.setItem('userId', inputID)
                localStorage.setItem('auth', data.headers.get('Authorization'))
                localStorage.setItem('refresh', data.headers.get('refreshToken'))
                alert(data.data)
                // navigate('/')
            },
            (err) => console.log(err)
        )
    } 

    const onLoginHandler = (e) => {
        e.preventDefault()
        // 제대로된 request로 바꿔야 함
        LoginFunc(tempUserInfo)
        console.log(inputID, inputPassword, tempUserInfo)
    }

    return (
        <>
            {FormWithGrid({option: textFieldOption, onClickHandler: onLoginHandler, onTypingHandler: onTypingHandler, buttonName: '로그인'})}
        </>
    )   
}
export default LoginForm
