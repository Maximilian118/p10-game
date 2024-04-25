import React, { useContext, useState } from "react"
import { TextField, Button, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { updateForm, formValid, inputLabel } from '../shared/formValidation'
import { login } from "../shared/requests/userRequests"
import AppContext from "../context"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"

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
          disabled={!formValid<loginFormType, loginFormType>(form, formErr)}
        >Login</Button>
      </form>
      <h5 onClick={() => navigate("/forgot")}>Forgotten Password?</h5>
    </div>
  )
}

export default Login
