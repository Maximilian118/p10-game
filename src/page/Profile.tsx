import React, { useContext, useState } from "react"
import DropZone from "../components/utility/dropZone/DropZone"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import AppContext from "../context"
import { getPermLevel } from "../shared/utility"
import moment from "moment"
import { Button } from "@mui/material"
import { logout } from "../shared/localStorage"
import { useNavigate } from "react-router-dom"

interface profileFormType {
  icon: File | null
  profile_picture: File | null
}

interface profileFormErrType {
  dropzone: string
  [key: string]: string
}

const Profile: React.FC = () => {
  const { user, setUser } = useContext(AppContext)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ form, setForm ] = useState<profileFormType>({
    icon: null,
    profile_picture: null,
  })

  const navigate = useNavigate()

  return (
    <div className="content-container flex-start">
      <h2 style={{ marginBottom: 40 }}>{user.name}</h2>
      <DropZone<profileFormType, profileFormErrType> 
        form={form} 
        setForm={setForm} 
        backendErr={backendErr} 
        setBackendErr={setBackendErr}
        style={{ width: "40%" }}
      />
      <p style={{ textTransform: "capitalize", marginBottom: 40 }}>
        {`${getPermLevel(user)} since: ${moment(user.created_at).format("Do MMM YYYY")}`}
      </p>
      <Button 
        variant="contained" 
        type="submit"
        className="mui-form-btn"
        onClick={() => logout(setUser, navigate)}
      >Logout</Button>
    </div>
  )
}

export default Profile
