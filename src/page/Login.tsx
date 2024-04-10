import { TextField, Button } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { updateForm, formValid } from '../shared/formValidation'

interface loginFormType {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [ form, setForm ] = useState<loginFormType>({
    email: "",
    password: "",
  })
  const [ formErr, setFormErr ] = useState<loginFormType>({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Backend Request...
  }

  return (
    <div className="content-container">
      <form onSubmit={e => onSubmitHandler(e)}>
        <TextField
          required={!formErr.email}
          id="outlined-required"
          className="mui-form-el"
          name="email"
          label={`Email${formErr.email && `: ${formErr.email}`}`}
          variant="outlined" 
          onChange={e => updateForm(e, form, setForm, setFormErr)}
          error={formErr.email ? true : false}
        />
        <TextField 
          required={!formErr.password}
          id="outlined-password-input"
          type="password"
          className="mui-form-el"
          name="password" 
          label={`Password${formErr.password && `: ${formErr.password}`}`} 
          variant="outlined"
          onChange={e => updateForm(e, form, setForm, setFormErr)}
          error={formErr.password ? true : false}
        />
        <Button 
          variant="outlined" 
          type="submit"
          disabled={!formValid(form, formErr)}
        >Login</Button>
      </form>
      <h5 onClick={() => navigate("/forgot")}>Forgotten Password?</h5>
    </div>
  )
}

export default Login
