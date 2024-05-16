import React, { useContext, useState } from "react"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import AppContext from "../context"
import ProfileCard from "../components/cards/profileCard/ProfileCard"
import { formErrType, formType } from "../shared/types"
import AuthButtons from "../components/cards/authButtonsCard/AuthButtonsCard"
import UpdateEmailCard from "../components/cards/updateEmailCard/updateEmailCard"

const Profile: React.FC = () => {
  const { user, setUser } = useContext(AppContext)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ form, setForm ] = useState<formType>({
    icon: null,
    profile_picture: null,
    email: user.email,
  })
  const [ formErr, setFormErr ] = useState<formErrType>({
    email: "",
    dropzone: "",
  })

  return (
    <div className="content-container">
      <ProfileCard<formType, formErrType>
        user={user}
        setUser={setUser}
        form={form}
        setForm={setForm}
        setFormErr={setFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
      />
      <UpdateEmailCard
        user={user}
        setUser={setUser}
        form={form}
        setForm={setForm}
        formErr={formErr}
        setFormErr={setFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
      />
      <AuthButtons setUser={setUser}/>
    </div>
  )
}

export default Profile
