import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../api/member";
import { FormWithGrid } from "../common";

import { Container } from "@mui/material";

function SignUpForm() {
  const navigate = useNavigate();
  const [inputID, setInputID] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [inputPasswordCheck, setInputPasswordCheck] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [inputName, setInputName] = useState();
  // const [ inputGroup, setInputGroup ] = useState()

  const textFieldOption = [
    {
      id: "userId",
      target: inputID,
      setTarget: setInputID,
      label: "ID",
      focus: true,
      type: "id",
    },
    {
      id: "password",
      target: inputPassword,
      setTarget: setInputPassword,
      label: "Password",
      focus: false,
      type: "password",
    },
    {
      id: "passwordCheck",
      target: inputPasswordCheck,
      setTarget: setInputPasswordCheck,
      label: "Password Check",
      focus: false,
      type: "password",
    },
    {
      id: "email",
      target: inputEmail,
      setTarget: setInputEmail,
      label: "E-mail",
      focus: false,
      type: "email",
    },
    {
      id: "name",
      target: inputName,
      setTarget: setInputName,
      label: "별명",
      focus: false,
    },
    // {id: "group", target: inputGroup, setTarget: setInputGroup, label: "소속 그룹", focus: false, },
  ];

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

  // 주석처리된 validation
  // const emailValidation = new RegExp('[a-z0-9_.]+@[a-z]+.[a-z]{2,3}')
  // const idForm = /^[a-z0-9]{4,16}$/
  // const idErrorMessage = {
  //     null: "필수 입력입니다.",
  //     form: "ID는 4글자부터 16글자 까지입니다.",
  // }

  // const passwordForm = /^[a-z0-9]{4,12}$/
  // const passwordErrorMessage = {
  //     null: "필수 입력입니다.",
  //     form: "비밀번호가 취약합니다.",
  //     same: "비밀번호가 일치하지 않습니다.",
  // }

  async function userSignup() {
    await signup(
      tempUserInfo,
      (data) => {
        console.log(data);
        navigate("/login");
      },
      (err) => console.log(err)
    );
  }

  return (
    <Container fixed>
      {FormWithGrid({
        option: textFieldOption,
        onClickHandler: userSignup,
        onTypingHandler: onTypingHandler,
        buttonName: "회원가입",
      })}
    </Container>
  );
}

export default SignUpForm;
