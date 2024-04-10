import React, { useState } from "react"
import { TextField, Button } from "@mui/material"
import { formValid, updateForm } from '../shared/formValidation'

interface forgotFormType{
  email: string,
}

const Forgot: React.FC = () => {
  const [ form, setForm ] = useState<forgotFormType>({
    email: "",
  })
  const [ formErr, setFormErr ] = useState<forgotFormType>({
    email: "",
  })

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Backend Request...
  }

  return (
    <div className="content-container">
      <form onSubmit={e => onSubmitHandler(e)}>
        <TextField
          required={!formErr.email}
          className="mui-form-el"
          name="email"
          label={`Email${formErr.email && `: ${formErr.email}`}`}
          variant="outlined" 
          onChange={e => updateForm(e, form, setForm, setFormErr)}
          error={formErr.email ? true : false}
        />
        <Button 
          variant="outlined" 
          type="submit"
          disabled={!formValid(form, formErr)}
        >Submit</Button>
      </form>
    </div>
  )
}

export default Forgot
