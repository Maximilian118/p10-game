import { editFormErrType } from "./badgePickerEdit/BadgePickerEdit"

// Check badgePickerEdit errors on submission.
export const badgePickerErrors = (
  isNewBadge: boolean,
  badge: {
    icon: File | null
    awardedHow: string | null
  },
  setEditFormErr: React.Dispatch<React.SetStateAction<editFormErrType>>,
): boolean => {
  if (isNewBadge) {
    if (!badge.icon) {
      setEditFormErr((prevErrs) => {
        return {
          ...prevErrs,
          dropzone: "Please select an image.",
        }
      })
      return true
    }

    if (!badge.awardedHow) {
      setEditFormErr((prevErrs) => {
        return {
          ...prevErrs,
          awardedHow: "Please select one.",
        }
      })
      return true
    }
  }

  return false
}
