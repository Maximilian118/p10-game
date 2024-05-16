import React, { useState } from "react"
import "./_updateEmailCard.scss"
import { userType } from "../../../shared/localStorage"
import { Button, CircularProgress, TextField } from "@mui/material"
import { formErrType, formType } from "../../../shared/types"
import { inputLabel, updateForm } from "../../../shared/formValidation"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import { updateEmail } from "../../../shared/requests/userRequests"

interface updateEmailCardType<T, U> {
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  form: T,
  setForm: React.Dispatch<React.SetStateAction<T>>
  formErr: U
  setFormErr: React.Dispatch<React.SetStateAction<U>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

const UpdateEmailCard = <T extends formType, U extends formErrType>({ user, setUser, form, setForm, formErr, setFormErr, backendErr, setBackendErr}: updateEmailCardType<T, U>) => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ success, setSuccess ] = useState<boolean>(false)

  const updateEmailHandler = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault()
    updateEmail(form, setForm, user, setUser, setLoading, setBackendErr, setSuccess)
  }

  return (
    <form className="change-email-card">
      <TextField
        className="mui-form-el"
        style={{ margin: "20px 20px 20px 0" }}
        name="email"
        label={inputLabel("email", formErr, backendErr)}
        variant="filled"
        onChange={e => {
          setSuccess(false)
          updateForm<T, U>(e, form, setForm, setFormErr, backendErr, setBackendErr)
        }}
        value={form.email}
        error={formErr.email || backendErr.type === "email" ? true : false}
        color={success ? "success" : "primary"}
      />
      <Button
        variant="contained" 
        type="submit"
        className="mui-form-btn"
        style={{ margin: "5px 0 0 0", flexShrink: 0 }}
        startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
        onClick={e => updateEmailHandler(e)}
        color={success ? "success" : "primary"}
      >{success ? "Success!" : "Confirm"}</Button>
    </form>
  )
}

export default UpdateEmailCard
