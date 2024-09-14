import React, { useEffect, useState } from "react"
import "./_driverGroupPicker.scss"
import { CircularProgress, IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import { driverGroupType } from "../../../shared/types"
import DriverGroup from "./driverGroup/DriverGroup"
import { getDriverGroups } from "../../../shared/requests/driverGroupRequests"
import { userType } from "../../../shared/localStorage"
import { useNavigate } from "react-router-dom"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import DriverGroupEdit from "./driverGroupEdit/DriverGroupEdit"
import { initDriverGroup } from "../../../shared/init"

interface driverGroupPickerType<T> {
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
  stepperBtns?: JSX.Element
  style?: React.CSSProperties
}

const DriverGroupPicker= <T extends { driverGroups: driverGroupType[] }>({ 
  form, 
  setForm, 
  user, 
  setUser,
  backendErr,
  setBackendErr,
  stepperBtns,
  style,
}: driverGroupPickerType<T>) => {
  const [ isEdit, setIsEdit ] = useState<boolean>(false) // Render DriverGroupEdit or not.
  const [ group, setGroup ] = useState<driverGroupType>(initDriverGroup(user)) // If we're editing a driver group rather than making a new one, populate.
  const [ groups, setGroups ] = useState<driverGroupType[]>([]) // Stores all driver groups from getDriverGroups response.
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ reqSent, setReqSent ] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (form.driverGroups.length === 0 && !reqSent) {
      getDriverGroups(setGroups, user, setUser, navigate, setLoading, setBackendErr)
      setReqSent(true)
    }
  }, [navigate, user, setUser, setBackendErr, form, reqSent])

  return isEdit ? 
    <DriverGroupEdit
      setForm={setForm}
      user={user}
      setUser={setUser}
      setIsEdit={setIsEdit}
      group={group}
      setGroup={setGroup}
      groups={groups}
      style={style}
    /> : (
    <div className="driver-group-picker" style={style}>
      <div className="driver-group-list-container">
        {loading ? 
          <div className="driver-group-loading">
            <CircularProgress/>
          </div> : 
          groups.length > 0 ? 
          <div className="driver-group-list">
            {groups.map((driverGroup: driverGroupType, i: number) => 
              <DriverGroup
                key={i}
                onClick={() => {
                  setGroup(driverGroup)
                  setIsEdit(!isEdit)
                }}
              />)
            }
          </div> :
          <div className="driver-group-empty">
            {backendErr.message ? 
              <p className="driver-group-error">{backendErr.message}</p> : 
              <p>No Driver Groups found... That may be a problem.</p>
            }
          </div>
        }
      </div>
      <IconButton 
        className="add-button"
        style={style}
        onClick={() => setIsEdit(!isEdit)}
      >
        <Add/>
      </IconButton>
      {stepperBtns}
    </div>
  )
}

export default DriverGroupPicker
