import React from "react"
import { initGraphQLError, graphQLErrorType, hasBackendErr } from "./requests/requestsUtility"

interface formStateType {
  name?: string
  badgeName?: string
  driverName?: string
  groupName?: string
  champName?: string
  email?: string
  password?: string
  passConfirm?: string
  currentPass?: string
  newPass?: string
  newPassConfirm?: string
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
  backendErr?: graphQLErrorType,
  setBackendErr?: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
): void => {
  // On every keystroke mutate form.
  setForm((prevForm): T => {
    return {
      ...prevForm,
      [e.target.name]: e.target.value,
    }
  })

  // If backendErr is passed, check if the current backendErr is applicable to this element.
  // If it is then setBackendErr to inital state.
  if (backendErr && setBackendErr && hasBackendErr([e.target.name], backendErr)) {
    setBackendErr((prevErr) => {
      return {
        ...prevErr,
        ...initGraphQLError,
      }
    })
  }

  const nameCase = (): void => {
    if (/^[a-zA-Z\s-']{1,30}$/.test(e.target.value) || e.target.value.trim() === "") {
      handleInput<U>(e.target.name, setFormErr)
    } else {
      handleInput<U>(e.target.name, setFormErr, "No numbers or special characters.")
    }
  }

  const badgeNameCase = () => {
    if (e.target.value.length <= 30 || e.target.value.trim() === "") {
      handleInput<U>(e.target.name, setFormErr)
    } else {
      handleInput<U>(e.target.name, setFormErr, "Maximum length 30 characters.")
    }
  }
  // prettier-ignore
  const emailCase = () => {
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e.target.value) || e.target.value.trim() === "") { // eslint-disable-line
      handleInput<U>(e.target.name, setFormErr)
    } else {
      handleInput<U>(e.target.name, setFormErr, "Please enter a valid email address.")
    }
  }

  const passwordCase = (): void => {
    if (
      /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d!?_<>"'$£%^&(){};:+=*#]{8,40}$/.test(e.target.value) ||
      e.target.value.trim() === ""
    ) {
      handleInput<U>(e.target.name, setFormErr)

      if (e.target.value === form.passConfirm) {
        handleInput("passConfirm", setFormErr)
      }
    } else {
      let passErr = "At least one letter and one number."
      passErr = e.target.value.length <= 8 ? "Minimum 8 characters." : passErr
      passErr = e.target.value.length >= 40 ? "Maximum 40 characters." : passErr

      handleInput<U>(e.target.name, setFormErr, passErr)
    }
  }

  const passConfirmCase = () => {
    if (e.target.value === form.password || e.target.value.trim() === "") {
      handleInput<U>(e.target.name, setFormErr)
    } else {
      handleInput<U>(e.target.name, setFormErr, "Passwords do not match.")
    }
  }

  const driverIDCase = () => {
    if (/^[A-Z]{3}$/.test(e.target.value) || e.target.value.trim() === "") {
      handleInput<U>(e.target.name, setFormErr)
    } else {
      handleInput<U>(e.target.name, setFormErr, "Only 3 capital letters.")
    }
  }

  // Depending on the current element do some basic validation checks.
  // prettier-ignore
  switch (e.target.name) {
    case "name": nameCase(); break
    case "champName": nameCase(); break
    case "badgeName": badgeNameCase(); break
    case "email": emailCase(); break
    case "password": passwordCase(); break
    case "currentPass": passwordCase(); break
    case "passConfirm": passConfirmCase(); break
    case "driverID": driverIDCase(); break
    default: setFormErr(prevFormErr => prevFormErr)
  }
}

// Determine whether a form is valid for submission.
export const formValid = <T extends formStateType, U>(form: T, formErr: U): boolean => {
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

interface formErrType {
  [key: string]: string | undefined | number
}

// If error or backend error, change the input label to reflect the error.
export const inputLabel = (
  type: keyof formErrType,
  formErr: formErrType,
  backendErr: graphQLErrorType,
): string => {
  const typeString = type.toString().toLowerCase()
  let label = typeString.charAt(0).toUpperCase() + typeString.slice(1)
  let errorMessage = formErr[type]

  if (!errorMessage && backendErr.type === type) {
    errorMessage = backendErr.message
  }

  switch (type) {
    case "name":
      label = "Username"
      break
    case "champName":
      label = "Championship Name"
      break
    case "passConfirm":
      label = "Password Confirm"
      break
    case "currentPass":
      label = "Old Password"
      break
    case "newPass":
      label = "New Password"
      break
    case "newPassConfirm":
      label = "Confirm New Password"
      break
    case "rounds":
      label = "Rounds in a Season"
      break
    case "pointsStructure":
      label = "Points Structure"
      break
    case "rulesAndRegs":
      label = "Rules and Regulations"
      break
    case "champBadges":
      label = "Badges"
      break
    case "badgeName":
      label = "Name"
      break
    case "awardedHow":
      label = "Awarded For"
      break
    case "driverGroups":
      label = "Driver Groups"
      break
    case "groupName":
      label = "Name"
      break
    case "driverName":
      label = "Name"
      break
    case "heightCM":
      label = "Height"
      break
    case "weightKG":
      label = "Weight"
      break
    case "driverID":
      label = "Driver ID"
      break
    default:
      break
  }

  return `${label}${errorMessage && `: ${errorMessage}`}`
}
