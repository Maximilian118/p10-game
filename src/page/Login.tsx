import React, { useContext, useState } from "react"
import { TextField, Button, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { updateForm, inputLabel } from '../shared/formValidation'
import { login } from "../shared/requests/userRequests"
import AppContext from "../context"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import formBackground from '../assets/forms/f1-car1.jpg'

export interface loginFormType {
  email: string
  password: string
}

export interface loginFormErrType extends loginFormType {
  [key: string]: string
}

const Login: React.FC = () => {
  const { setUser } = useContext(AppContext)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ form, setForm ] = useState<loginFormType>({
    email: "",
    password: "",
  })
  const [ formErr, setFormErr ] = useState<loginFormErrType>({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(form, setUser, setLoading, setBackendErr, navigate)
  }

  return (
    <div className="content-container">
      <div className="form-container">
        <img src={formBackground} alt="An old Formula 1 car." className="form-background"/>
        <div className="form-title" style={{ marginBottom: 200 }}>
          <h2>Login</h2>
        </div>
        <form onSubmit={e => onSubmitHandler(e)}>
          <TextField
            required={!formErr.email && backendErr.type !== "email"}
            className="mui-form-el"
            name="email"
            label={inputLabel("email", formErr, backendErr)}
            variant="filled"
            onChange={e => updateForm<loginFormType, loginFormErrType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
            value={form.email}
            error={formErr.email || backendErr.type === "email" ? true : false}
          />
          <TextField 
            required={!formErr.password && backendErr.type !== "password"}
            type="password"
            className="mui-form-el"
            name="password" 
            label={inputLabel("password", formErr, backendErr)} 
            variant="filled"
            onChange={e => updateForm<loginFormType, loginFormErrType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
            value={form.password}
            error={formErr.password || backendErr.type === "password" ? true : false}
          />
          <Button 
            variant="contained" 
            type="submit"
            className="mui-form-btn"
            startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
          >Login</Button>
        </form>
        <h5 className="under-form-text" onClick={() => navigate("/forgot")}>Forgot Password?</h5>
      </div>
      <div className="sign-up-container">
        <h5 className="under-form-text">No Account?</h5>
        <h5 className="under-form-text sign-up" onClick={() => navigate("/create")}>Sign Up!</h5>
      </div>
    </div>
  )
}

export default Login
