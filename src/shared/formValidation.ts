import React from "react"

interface formStateType {
  name?: string
  email?: string
  password?: string
  passConfirm?: string
}

// setFormErr with an error for eTargetName if err passed.
const handleInput = <U>(
  eTargetName: string,
  setFormErr: React.Dispatch<React.SetStateAction<U>>,
  err?: string,
): void => {
  setFormErr((prevFormErr): U => {
    return {
      ...prevFormErr,
      [eTargetName]: err ? err : "",
    }
  })
}

// Update formErrs on each keystroke.
export const updateForm = <T extends formStateType, U>(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  form: T,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  setFormErr: React.Dispatch<React.SetStateAction<U>>,
): void => {
  setForm((prevForm): T => {
    return {
      ...prevForm,
      [e.target.name]: e.target.value,
    }
  })
  // prettier-ignore
  switch (e.target.name) {
    case "name": if (/^[a-zA-Z\s-']{1,30}$/.test(e.target.value) || e.target.value.trim() === "") {
      handleInput<U>(e.target.name, setFormErr)
    } else {
      handleInput<U>(e.target.name, setFormErr, "No numbers or special characters.")
    }; break
    case "email": if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e.target.value) || e.target.value.trim() === "") { // eslint-disable-line
      handleInput<U>(e.target.name, setFormErr)
    } else {
      handleInput<U>(e.target.name, setFormErr, "Please enter a valid email address.")
    }; break
    case "password": if (/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d!?_<>"'$£%^&(){};:+=*#]{8,40}$/.test(e.target.value) || e.target.value.trim() === "") {
      handleInput<U>(e.target.name, setFormErr)

      if (e.target.value === form.passConfirm) {
        handleInput("passConfirm", setFormErr)
      } 
    } else {
      let passErr = "At least one letter and one number."
      passErr = e.target.value.length <= 8 ? "Minimum 8 characters." : passErr
      passErr = e.target.value.length >= 40 ? "Maximum 40 characters." : passErr

      handleInput<U>(e.target.name, setFormErr, passErr)
    }; break
    case "passConfirm": if (e.target.value === form.password || e.target.value.trim() === "") {
      handleInput<U>(e.target.name, setFormErr)
    } else {
      handleInput<U>(e.target.name, setFormErr, "Passwords do not match.")
    }; break
    default: setFormErr(prevFormErr => prevFormErr)
  }
}

// Determine whether a form is valid for submission.
export const formValid = <T extends formStateType, U>(
  form: T,
  formErr: U,
): boolean => {
  for (const keys in form) {
    const key = form[keys as keyof T]

    if (!key && key !== null) {
      return false
    }
  }

  let withErr = false
  for (const keys in formErr) {
    if (formErr[keys as keyof U]) {
      withErr = true
    }
  }

  return withErr ? false : true
}
