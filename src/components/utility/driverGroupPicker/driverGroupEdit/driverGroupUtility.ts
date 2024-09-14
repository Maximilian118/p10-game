import { driverGroupType } from "../../../../shared/types"
import { driverGroupEditFormErrType, driverGroupEditFormType } from "./DriverGroupEdit"

export const driverGroupEditErrors = (
  editForm: driverGroupEditFormType,
  setEditFormErr: React.Dispatch<React.SetStateAction<driverGroupEditFormErrType>>,
  groups: driverGroupType[],
  update?: boolean,
): boolean => {
  const errors: driverGroupEditFormErrType = {
    groupName: "",
    drivers: "",
    dropzone: "",
  }

  if (!editForm.groupName) {
    errors.groupName = "Please enter a name."
  }

  if (!editForm.icon && !update) {
    errors.dropzone = "Please enter an image."
  }

  if (editForm.drivers.length < 2) {
    errors.drivers = "2 or more drivers are required."
  }
  // Remove the group with this editForm._id from the groups array for duplicate checking.
  const newGroups = groups.filter((g) => g._id !== editForm._id)
  // Loop through all of the existing teams.
  for (const group of newGroups) {
    // If groupName already exists in groups array.
    if (group.name.toLowerCase() === editForm.groupName.toLowerCase()) {
      errors.groupName = "A group by that name already exists!"
    }

    if (update && group._id === editForm._id) {
      // If nothing has changed
      if (
        group.name === editForm.groupName &&
        group.drivers === editForm.drivers &&
        !editForm.icon
      ) {
        errors.groupName = "No changes have been made."
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
