import moment from "moment"
import { driverType } from "../../../shared/types"
import { isThreeLettersUppercase } from "../../../shared/utility"
import { driverEditFormErrType, driverEditFormType } from "./driverEdit/DriverEdit"

export const driverEditErrors = (
  editForm: driverEditFormType,
  setEditFormErr: React.Dispatch<React.SetStateAction<driverEditFormErrType>>,
  drivers: driverType[],
  update?: boolean,
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

  if (!editForm.icon && !update) {
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

  // Loop through all of the existing drivers.
  for (const driver of drivers) {
    // If driverName already exists in drivers array.
    if (driver.name.toLowerCase() === editForm.driverName.toLowerCase()) {
      errors.driverName = "A driver by that name already exists!"
      break
    }

    if (update && driver._id === editForm._id) {
      // If nothing has changed
      if (
        !editForm.icon &&
        driver.name === editForm.driverName &&
        driver.driverID === editForm.driverID &&
        driver.teams === editForm.teams &&
        driver.stats.nationality === editForm.nationality?.label &&
        driver.stats.heightCM === editForm.heightCM &&
        driver.stats.weightKG === editForm.weightKG &&
        driver.stats.birthday === moment(editForm.birthday).format() &&
        driver.stats.moustache === editForm.moustache &&
        driver.stats.mullet === editForm.mullet
      ) {
        errors.driverName = "No changes have been made."
      }
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

// Determine what privilages the user has to edit this driver.
export const canEditDriver = (driver: driverType): boolean => {
  // If this driver belongs to any teams.
  if (driver.teams.length > 0) {
    return true
  }

  return false
}
