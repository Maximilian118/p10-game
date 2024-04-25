import React, { useState } from "react"
import { TextField, Button, CircularProgress } from "@mui/material"
import { formValid, inputLabel, updateForm } from '../shared/formValidation'
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import { forgot } from "../shared/requests/userRequests"

export interface forgotFormType {
  email: string,
  [key: string]: string
}

const Forgot: React.FC = () => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ success, setSuccess ] = useState<boolean>(false)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ form, setForm ] = useState<forgotFormType>({
    email: "",
  })
  const [ formErr, setFormErr ] = useState<forgotFormType>({
    email: "",
  })

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    forgot(form, setLoading, setBackendErr, setSuccess)
  }

  return (
    <div className="content-container">
      {success ? 
      <p style={{ width: "80%", textAlign: "center" }}>An email has been sent to your email address. Please follow the password reset instructions there. Don't forget to check your Junk folder!</p>
      : 
      <form onSubmit={e => onSubmitHandler(e)}>
      <TextField
          required={!formErr.email && backendErr.type !== "email"}
          className="mui-form-el"
          name="email"
          label={inputLabel("email", formErr, backendErr)}
          variant="filled" 
          onChange={e => updateForm<forgotFormType, forgotFormType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
          value={form.email}
          error={formErr.email || backendErr.type === "email" ? true : false}
        />
        <Button 
          variant="contained" 
          type="submit"
          startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
          disabled={!formValid<forgotFormType, forgotFormType>(form, formErr)}
        >Submit</Button>
      </form>}
    </div>
  )
}

export default Forgot
