import React, { useState } from "react"
import {
  Form,
  SendButton,
  ButtonFacebook,
  ButtonGoogle,
  Field,
  Input,
  Label,
  Title,
  Container,
  RedButton,
} from "./styled"
import { FcGoogle } from "react-icons/fc"
import { BsFacebook } from "react-icons/bs"
import { logIn } from "../../redux/actions/index"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  })

  function handleChangeLogIn(e) {
    e.preventDefault()
    setLogInForm({ ...logInForm, [e.target.name]: e.target.value })
  }

  function handleSubmitLogIn(e) {
    e.preventDefault()
    console.log("submited")
    if (!logInForm.email || !logInForm.password) {
      alert("Missing fields, please try again")
    } else {
      dispatch(logIn(logInForm))
      navigate("/")
    }

  }
  return (
    <Container>
      <Title>Log In</Title>
      <Form fields={2}>
        <Field>
          <Label>Email: </Label>
          <Input
            type="text"
            name="email"
            value={logInForm.email}
            onChange={handleChangeLogIn}
            placeholder="Email"></Input>
        </Field>
        <Field>
          <Label>Password: </Label>
          <Input
            type="text"
            name="password"
            value={logInForm.password}
            onChange={handleChangeLogIn}
            placeholder="Password"></Input>
        </Field>
        <SendButton onClick={e => handleSubmitLogIn(e)}>Log in</SendButton>
        <ButtonFacebook>
          <BsFacebook />
          Log in with Facebook
        </ButtonFacebook>
        <ButtonGoogle>
          <FcGoogle />
          Log in with Google
        </ButtonGoogle>
        <RedButton onClick={() => navigate("/forgot-password")}>
          I forgot my password
        </RedButton>
      </Form>
    </Container>
  )
}

export default Login
