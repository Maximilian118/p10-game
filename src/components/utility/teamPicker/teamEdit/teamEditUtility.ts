import moment from "moment"
import { teamType } from "../../../../shared/types"
import { teamEditFormErrType, teamEditFormType } from "./TeamEdit"

export const teamEditErrors = (
  editForm: teamEditFormType,
  setEditFormErr: React.Dispatch<React.SetStateAction<teamEditFormErrType>>,
  teams: teamType[],
): boolean => {
  const errors: teamEditFormErrType = {
    teamName: "",
    inceptionDate: "",
    nationality: "",
    dropzone: "",
  }

  if (!editForm.teamName) {
    errors.teamName = "Please enter a name."
  }

  if (!editForm.inceptionDate) {
    errors.inceptionDate = "Please enter a date."
  } else if (moment(editForm.inceptionDate).isAfter(moment())) {
    errors.inceptionDate = "Date can not be in the future dummy."
  }

  if (!editForm.nationality) {
    errors.nationality = "Please enter a nationality."
  }

  if (!editForm.icon) {
    errors.dropzone = "Please enter an image."
  }

  // Loop through all of the existing teams.
  for (const team of teams) {
    // If teamName already exists in teams array.
    if (team.name.toLowerCase() === editForm.teamName.toLowerCase()) {
      errors.teamName = "Duplicate Team Name."
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

// Determine what privilages the user has to edit this team.
export const canEditTeam = (team: teamType): boolean => {
  // If any drivers belong to this team.
  if (team.drivers.length > 0) {
    return true
  }

  return false
}
