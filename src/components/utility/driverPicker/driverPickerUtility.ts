import moment from "moment"
import { driverType } from "../../../shared/types"
import { isThreeLettersUppercase } from "../../../shared/utility"
import { driverEditFormErrType, driverEditFormType } from "./driverEdit/DriverEdit"

export const driverEditErrors = (
  editForm: driverEditFormType,
  setEditFormErr: React.Dispatch<React.SetStateAction<driverEditFormErrType>>,
  drivers: driverType[],
): boolean => {
  const errors: driverEditFormErrType = {
    url: "",
    driverName: "",
    driverID: "",
    teams: "",
    nationality: "",
    heightCM: "",
    weightKG: "",
    birthday: "",
    moustache: "",
    mullet: "",
    dropzone: "",
  }

  if (!editForm.icon) {
    errors.dropzone = "Please enter an image."
  }

  if (!editForm.driverName) {
    errors.driverName = "Please enter a name."
  }

  if (!editForm.driverID) {
    errors.driverID = "Please enter a name."
  } else if (!isThreeLettersUppercase(editForm.driverID)) {
    errors.driverID = "Must be three uppercase letters."
  }

  if (!editForm.nationality) {
    errors.nationality = "Please enter a nationality."
  }

  if (!editForm.heightCM) {
    errors.heightCM = "Please enter a height."
  }

  if (!editForm.weightKG) {
    errors.weightKG = "Please enter a weight."
  }

  if (!editForm.birthday) {
    errors.birthday = "Please enter a date."
  } else if (moment(editForm.birthday).isAfter(moment())) {
    errors.birthday = "Date can not be in the future dummy."
  }

  // Loop through all of the existing teams.
  for (const driver of drivers) {
    // If teamName already exists in teams array.
    if (driver.name.toLowerCase() === editForm.driverName.toLowerCase()) {
      errors.driverName = "Duplicate Driver Name."
      break
    }
  }

  setEditFormErr((prevErrs) => {
    return {
      ...prevErrs,
      ...errors,
    }
  })

  return Object.values(errors).some((error) => error !== "")
}
