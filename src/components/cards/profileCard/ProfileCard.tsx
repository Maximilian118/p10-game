import React from "react"
import './_profileCard.scss'
import DropZone from "../../utility/dropZone/DropZone"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import { userType } from "../../../shared/localStorage"
import { getPermLevel } from "../../../shared/utility"
import moment from "moment"
import { formErrType, formType } from "../../../shared/types"

interface profileCardType<T> {
  user: userType,
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  backendErr?: graphQLErrorType
  setBackendErr?: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

const ProfileCard = <T extends formType, U extends formErrType>({ user, form, setForm, backendErr, setBackendErr }: profileCardType<T>) => {
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
        <p>{user.name}</p>
        <h5 style={{ textTransform: "capitalize" }}>
          {`${getPermLevel(user)} since: ${moment(user.created_at).format("Do MMM YYYY")}`}
        </h5>
      </div>
    </div>
  )
}

export default ProfileCard
