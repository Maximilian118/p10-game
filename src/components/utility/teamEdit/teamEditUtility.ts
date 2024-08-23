import { teamType } from "../../../shared/types"
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

  // Loop through all of the existing teams.
  for (const team of teams) {
    // If teamName already exists in teams array.
    if (team.name === editForm.teamName) {
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
