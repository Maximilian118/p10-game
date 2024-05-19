import { Button, CircularProgress, TextField } from "@mui/material"
import React, { useState } from "react"
import { inputLabel, updateForm } from "../shared/formValidation"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"

interface passFormType {
  currentPass: string
  password: string
  passConfirm: string
  [key: string]: string
}

const Password: React.FC = () => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ form, setForm ] = useState<passFormType>({
    currentPass: "",
    password: "",
    passConfirm: "",
  })
  const [ formErr, setFormErr ] = useState<passFormType>({
    currentPass: "",
    password: "",
    passConfirm: "",
  })

  const updatePassHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
  }

  return (
    <form 
      className="content-container" 
      style={{ background: "white" }}
      onSubmit={e => updatePassHandler(e)}
    >
      <TextField
        required={!formErr.currentPass}
        type="password"
        className="mui-form-el"
        style={{ marginTop: 40 }}
        name="currentPass"
        label={inputLabel("currentPass", formErr, backendErr)} 
        variant="filled"
        onChange={e => updateForm<passFormType, passFormType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
        value={form.currentPass}
        error={formErr.currentPass ? true : false}
      />
      <TextField
        required={!formErr.newPass}
        type="password"
        className="mui-form-el"
        name="password" 
        label={inputLabel("password", formErr, backendErr)} 
        variant="filled"
        onChange={e => updateForm<passFormType, passFormType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
        value={form.password}
        error={formErr.password ? true : false}
      />
      <TextField
        required={!formErr.newPass}
        type="password"
        className="mui-form-el"
        name="passConfirm" 
        label={inputLabel("passConfirm", formErr, backendErr)} 
        variant="filled"
        onChange={e => updateForm<passFormType, passFormType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
        value={form.passConfirm}
        error={formErr.passConfirm ? true : false}
      />
      <Button
        variant="contained" 
        type="submit"
        style={{ margin: "20px 0 40px 0" }}
        startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
      >Change Password</Button>
    </form>
  )
}

export default Password
