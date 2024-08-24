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

  if (!editForm.url) {
    errors.awardedHow = "An image is required."
  }

  if (!editForm.driverName) {
    errors.driverName = "Please enter a name."
  }

  if (!editForm.driverID) {
    errors.driverID = "Please enter a name."
  } else if (!isThreeLettersUppercase(editForm.driverID)) {
    errors.driverID = "Must be three uppercase letters."
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
