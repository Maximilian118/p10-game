import React, { useState } from "react"
import './_profileCard.scss'
import DropZone from "../../utility/dropZone/DropZone"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import { userType } from "../../../shared/localStorage"
import { getPermLevel } from "../../../shared/utility"
import moment from "moment"
import { formErrType, formType } from "../../../shared/types"
import { Button, CircularProgress } from "@mui/material"
import { updatePP } from "../../../shared/requests/userRequests"
import { NavigateFunction, useNavigate } from "react-router-dom"

interface profileCardType<T, U> {
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  setFormErr: React.Dispatch<React.SetStateAction<U>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

const ProfileCard = <T extends formType, U extends formErrType>({ user, setUser, form, setForm, setFormErr, backendErr, setBackendErr }: profileCardType<T, U>) => {
  const [ loading, setLoading ] = useState<boolean>(false)

  const navigate = useNavigate()

  const uploadPPHandler = async (
    e: React.FormEvent<HTMLButtonElement>, 
    form: T, 
    setForm: React.Dispatch<React.SetStateAction<T>>,
    user: userType,
    setUser: React.Dispatch<React.SetStateAction<userType>>,
    navigate: NavigateFunction,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  ): Promise<void> => {
    e.preventDefault()
    await updatePP<T>(form, setForm, user, setUser, navigate, setLoading, setBackendErr)
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
            startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
            onClick={e => uploadPPHandler(e, form, setForm, user, setUser, navigate, setLoading, setBackendErr)}
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
        setFormErr={setFormErr}
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
