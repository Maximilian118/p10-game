import React, { useState } from "react"
import "./_changeEmailCard.scss"
import { userType } from "../../../shared/localStorage"
import { Button, CircularProgress, TextField } from "@mui/material"
import { formErrType, formType } from "../../../shared/types"
import { inputLabel, updateForm } from "../../../shared/formValidation"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"

interface changeEmailCardType<T, U> {
  form: T,
  setForm: React.Dispatch<React.SetStateAction<T>>
  formErr: U
  setFormErr: React.Dispatch<React.SetStateAction<U>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
  user: userType
}

const ChangeEmailCard = <T extends formType, U extends formErrType>({ form, setForm, formErr, setFormErr, backendErr, setBackendErr, user }: changeEmailCardType<T, U>) => {
  const [ loading, setLoading ] = useState<boolean>(false)

  const updateEmailHandler = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault()
  }

  return (
    <form className="change-email-card">
      <TextField
        required={!formErr.email && backendErr.type !== "email"}
        className="mui-form-el"
        style={{ margin: "20px 20px 20px 0" }}
        name="email"
        label={inputLabel("email", formErr, backendErr)}
        variant="filled"
        onChange={e => updateForm<T, U>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
        value={form.email ? form.email : user.email}
        error={formErr.email || backendErr.type === "email" ? true : false}
      />
      <Button
        variant="contained" 
        type="submit"
        className="mui-form-btn"
        style={{ margin: "5px 0 0 0" }}
        startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
        onClick={e => updateEmailHandler(e)}
      >Confirm</Button>
    </form>
  )
}

export default ChangeEmailCard
