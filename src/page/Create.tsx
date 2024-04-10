import React, { useState } from "react"
import { TextField, Button } from "@mui/material"
import { updateForm, formValid } from '../shared/formValidation'
import DropZone from "../components/utility/dropZone/DropZone"

interface createFormType {
  name: string
  email: string
  password: string
  passConfirm: string
  icon: string
  profile_picture: string
}

const Create: React.FC = () => {
  const [ form, setForm ] = useState<createFormType>({
    name: "",
    email: "",
    password: "",
    passConfirm: "",
    icon: "",
    profile_picture: "",
  })
  const [ formErr, setFormErr ] = useState<createFormType>({
    name: "",
    email: "",
    password: "",
    passConfirm: "",
    icon: "",
    profile_picture: "",
  })

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Backend Request...
  }

  return (
    <div className="content-container">
      <form onSubmit={e => onSubmitHandler(e)}>
        <DropZone<createFormType> setForm={setForm} setFormErr={setFormErr}/>
        <TextField
          required={!formErr.name}
          className="mui-form-el"
          name="name"
          label={`Name${formErr.name && `: ${formErr.name}`}`}
          variant="outlined" 
          onChange={e => updateForm<createFormType>(e, form, setForm, setFormErr)}
          error={formErr.name ? true : false}
        />
        <TextField
          required={!formErr.email}
          className="mui-form-el"
          name="email"
          label={`Email${formErr.email && `: ${formErr.email}`}`}
          variant="outlined" 
          onChange={e => updateForm<createFormType>(e, form, setForm, setFormErr)}
          error={formErr.email ? true : false}
        />
        <TextField 
          required={!formErr.password}
          type="password"
          className="mui-form-el"
          name="password" 
          label={`Password${formErr.password && `: ${formErr.password}`}`} 
          variant="outlined"
          onChange={e => updateForm<createFormType>(e, form, setForm, setFormErr)}
          error={formErr.password ? true : false}
        />
        <TextField 
          required={!formErr.passConfirm}
          type="password"
          className="mui-form-el"
          name="passConfirm" 
          label={`Confirm Password${formErr.passConfirm && `: ${formErr.passConfirm}`}`} 
          variant="outlined"
          onChange={e => updateForm<createFormType>(e, form, setForm, setFormErr)}
          error={formErr.passConfirm ? true : false}
        />
        <Button 
          variant="outlined" 
          type="submit"
          disabled={!formValid<createFormType>(form, formErr)}
        >Create</Button>
      </form>
    </div>
  )
}

export default Create
