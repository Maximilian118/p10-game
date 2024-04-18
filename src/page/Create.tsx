import React, { useContext, useState } from "react"
import { TextField, Button } from "@mui/material"
import { updateForm, formValid, inputLabel } from '../shared/formValidation'
import DropZone from "../components/utility/dropZone/DropZone"
import { createUser } from "../shared/requests/userRequests"
import Spinner from "../components/utility/spinner/Spinner"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import { NavigateFunction, useNavigate } from "react-router-dom"
import AppContext from "../context"

interface createFormBaseType {
  name: string
  email: string
  password: string
  passConfirm: string
}

export interface createFormType extends createFormBaseType {
  icon: File | null
  profile_picture: File | null
}

export interface createFormErrType extends createFormBaseType {
  dropzone: string
  [key: string]: string | undefined
}

const Create: React.FC = () => {
  const { setUser } = useContext(AppContext)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ form, setForm ] = useState<createFormType>({
    name: "",
    email: "",
    password: "",
    passConfirm: "",
    icon: null,
    profile_picture: null,
  })
  const [ formErr, setFormErr ] = useState<createFormErrType>({
    name: "",
    email: "",
    password: "",
    passConfirm: "",
    dropzone: "",
  })

  const navigate = useNavigate()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>, navigate: NavigateFunction) => {
    e.preventDefault()
    createUser(form, setUser, setLoading, setBackendErr, navigate)
  }

  return loading ? <Spinner/> : (
    <div className="content-container">
      <form onSubmit={e => onSubmitHandler(e, navigate)}>
        <DropZone<createFormType, createFormErrType> 
          form={form}
          setForm={setForm} 
          setFormErr={setFormErr} 
          backendErr={backendErr}
          setBackendErr={setBackendErr}
        />
        <TextField
          required={!formErr.name && backendErr.type !== "name"}
          className="mui-form-el"
          name="name"
          label={inputLabel("name", formErr, backendErr)}
          variant="outlined" 
          onChange={e => updateForm<createFormType, createFormErrType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
          value={form.name}
          error={formErr.name || backendErr.type === "name" ? true : false}
        />
        <TextField
          required={!formErr.email && backendErr.type !== "email"}
          className="mui-form-el"
          name="email"
          label={inputLabel("email", formErr, backendErr)}
          variant="outlined" 
          onChange={e => updateForm<createFormType, createFormErrType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
          value={form.email}
          error={formErr.email || backendErr.type === "email" ? true : false}
        />
        <TextField 
          required={!formErr.password && backendErr.type !== "password"}
          type="password"
          className="mui-form-el"
          name="password" 
          label={inputLabel("password", formErr, backendErr)} 
          variant="outlined"
          onChange={e => updateForm<createFormType, createFormErrType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
          value={form.password}
          error={formErr.password || backendErr.type === "password" ? true : false}
        />
        <TextField 
          required={!formErr.passConfirm && backendErr.type !== "passConfirm"}
          type="password"
          className="mui-form-el"
          name="passConfirm" 
          label={inputLabel("passConfirm", formErr, backendErr)} 
          variant="outlined"
          onChange={e => updateForm<createFormType, createFormErrType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
          value={form.passConfirm}
          error={formErr.passConfirm || backendErr.type === "passConfirm" ? true : false}
        />
        <Button 
          variant="outlined" 
          type="submit"
          disabled={!formValid<createFormType, createFormErrType>(form, formErr)}
        >Create</Button>
      </form>
    </div>
  )
}

export default Create
