import React, { useContext, useState } from "react"
import { TextField, Button } from "@mui/material"
import { updateForm, formValid } from '../shared/formValidation'
import DropZone from "../components/utility/dropZone/DropZone"
import { createUser } from "../shared/requests/userRequests"
import Spinner from "../components/utility/spinner/Spinner"
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
}

const Create: React.FC = () => {
  const { setUser } = useContext(AppContext)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ backendErr, setBackendErr ] = useState<string>("")
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

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUser(form, setUser, setLoading, setBackendErr)
  }

  return loading ? <Spinner/> : (
    <div className="content-container">
      <form onSubmit={e => onSubmitHandler(e)}>
        <DropZone<createFormType, createFormErrType> 
          form={form}
          setForm={setForm} 
          setFormErr={setFormErr} 
          backendErr={backendErr}
          setBackendErr={setBackendErr}
        />
        <TextField
          required={!formErr.name}
          className="mui-form-el"
          name="name"
          label={`Name${formErr.name && `: ${formErr.name}`}`}
          variant="outlined" 
          onChange={e => updateForm<createFormType, createFormErrType>(e, form, setForm, setFormErr)}
          value={form.name}
          error={formErr.name ? true : false}
        />
        <TextField
          required={!formErr.email}
          className="mui-form-el"
          name="email"
          label={`Email${formErr.email && `: ${formErr.email}`}`}
          variant="outlined" 
          onChange={e => updateForm<createFormType, createFormErrType>(e, form, setForm, setFormErr)}
          value={form.email}
          error={formErr.email ? true : false}
        />
        <TextField 
          required={!formErr.password}
          type="password"
          className="mui-form-el"
          name="password" 
          label={`Password${formErr.password && `: ${formErr.password}`}`} 
          variant="outlined"
          onChange={e => updateForm<createFormType, createFormErrType>(e, form, setForm, setFormErr)}
          value={form.password}
          error={formErr.password ? true : false}
        />
        <TextField 
          required={!formErr.passConfirm}
          type="password"
          className="mui-form-el"
          name="passConfirm" 
          label={`Confirm Password${formErr.passConfirm && `: ${formErr.passConfirm}`}`} 
          variant="outlined"
          onChange={e => updateForm<createFormType, createFormErrType>(e, form, setForm, setFormErr)}
          value={form.passConfirm}
          error={formErr.passConfirm ? true : false}
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
