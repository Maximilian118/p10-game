import React, { useContext, useState } from "react"
import DropZone from "../components/utility/dropZone/DropZone"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import AppContext from "../context"
import { getPermLevel } from "../shared/utility"
import moment from "moment"

interface profileFormType {
  icon: File | null
  profile_picture: File | null
}

interface profileFormErrType {
  dropzone: string
  [key: string]: string
}

const Profile: React.FC = () => {
  const { user } = useContext(AppContext)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ form, setForm ] = useState<profileFormType>({
    icon: null,
    profile_picture: null,
  })

  return (
    <div className="content-container flex-start">
      <h2 className="profile-name">{user.name}</h2>
      <DropZone<profileFormType, profileFormErrType> 
        form={form} 
        setForm={setForm} 
        backendErr={backendErr} 
        setBackendErr={setBackendErr}
        style={{ width: "40%" }}
      />
      <p style={{ textTransform: "capitalize" }}>
        {`${getPermLevel(user)} since: ${moment(user.created_at).format("Do MMM YYYY")}`}
      </p>
    </div>
  )
}

export default Profile
