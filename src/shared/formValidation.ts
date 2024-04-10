import React from "react"

interface formStateType {
  name?: string
  email: string
  password?: string
  passConfirm?: string
}

// setFormErr with an error for eTargetName if err passed.
const handleInput = (
  eTargetName: string,
  setFormErr: React.Dispatch<React.SetStateAction<formStateType>>,
  err?: string,
): void => {
  setFormErr((prevFormErr) => {
    return {
      ...prevFormErr,
      [eTargetName]: err ? err : "",
    }
  })
}

// Update formErrs on each keystroke.
export const updateForm = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  form: formStateType,
  setForm: React.Dispatch<React.SetStateAction<formStateType>>,
  setFormErr: React.Dispatch<React.SetStateAction<formStateType>>,
): void => {
  setForm((prevForm) => {
    return {
      ...prevForm,
      [e.target.name]: e.target.value,
    }
  })
  // prettier-ignore
  switch (e.target.name) {
    case "name": if (/^[a-zA-Z\s-']{1,30}$/.test(e.target.value) || e.target.value.trim() === "") {
      handleInput(e.target.name, setFormErr)
    } else {
      handleInput(e.target.name, setFormErr, "No numbers or special characters.")
    }; break
    case "email": if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e.target.value) || e.target.value.trim() === "") { // eslint-disable-line
      handleInput(e.target.name, setFormErr)
    } else {
      handleInput(e.target.name, setFormErr, "Please enter a valid email address.")
    }; break
    case "password": if (/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d!?_<>"'$£%^&(){};:+=*#]{8,40}$/.test(e.target.value) || e.target.value.trim() === "") {
      handleInput(e.target.name, setFormErr)
    } else {
      let passErr = "At least one letter and one number."
      passErr = e.target.value.trim().length <= 8 ? "Minimum 8 characters." : passErr
      passErr = e.target.value.trim().length >= 40 ? "Maximum 40 characters." : passErr

      handleInput(e.target.name, setFormErr, passErr)
    }; break
    case "passConfirm": if (e.target.value === form.password || e.target.value.trim() === "") {
      handleInput(e.target.name, setFormErr)
    } else {
      handleInput(e.target.name, setFormErr, "Passwords do not match.")
    }; break
    default: setFormErr(prevFormErr => prevFormErr)
  }
}

// Determine whether a form is valid for submission.
export const formValid = (
  form: formStateType,
  formErr: formStateType,
): boolean => {
  for (const keys in form) {
    if (form[keys as keyof formStateType] === "") {
      return false
    } else if (!form[keys as keyof formStateType]) {
      return false
    }
  }

  let withErr = false
  for (const keys in formErr) {
    if (formErr[keys as keyof formStateType]) {
      withErr = true
    }
  }

  return withErr ? false : true
}
