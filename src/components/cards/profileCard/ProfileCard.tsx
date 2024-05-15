import React from "react"
import './_profileCard.scss'
import DropZone from "../../utility/dropZone/DropZone"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import { userType } from "../../../shared/localStorage"
import { getPermLevel } from "../../../shared/utility"
import moment from "moment"
import { formErrType, formType } from "../../../shared/types"
import { Button } from "@mui/material"

interface profileCardType<T> {
  user: userType,
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  backendErr?: graphQLErrorType
  setBackendErr?: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

const ProfileCard = <T extends formType, U extends formErrType>({ user, form, setForm, backendErr, setBackendErr }: profileCardType<T>) => {
  const uploadPPHandler = (form: T) => {
    console.log("clicked")
  }

  const filesInForm = (form: T): JSX.Element => {
    if (!form.icon && !form.profile_picture) {
      return (
        <>
          <p>{user.name}</p>
          <h5 style={{ textTransform: "capitalize" }}>
            {`${getPermLevel(user)} since: ${moment(user.created_at).format("Do MMM YYYY")}`}
          </h5>
        </>
      )
    } else {
      return (
        <>
          <p>Are you sure?</p>
          <Button
            variant="contained" 
            type="submit"
            className="mui-form-btn"
            style={{ margin: "5px 0 0 0" }}
            onClick={() => uploadPPHandler(form)}
          >Confirm</Button>
        </>
      )
    }
  }

  return (
    <div className="profile-card">
      <DropZone<T, U> 
        form={form} 
        setForm={setForm} 
        backendErr={backendErr} 
        setBackendErr={setBackendErr}
        user={user}
        style={{ width: 100, margin: 20 }}
      />
      <div className="profile-info">
        {filesInForm(form)}
      </div>
    </div>
  )
}

export default ProfileCard
