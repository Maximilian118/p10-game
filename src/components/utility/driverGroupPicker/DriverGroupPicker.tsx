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

interface driverGroupPickerType<T> {
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

export const initDriverGroup: driverGroupType = {
  url: "",
  name: "",
  championships: [],
  drivers: [],
}

const DriverGroupPicker= <T extends { driverGroups: driverGroupType[] }>({ form, setForm, user, setUser, setBackendErr }: driverGroupPickerType<T>) => {
  const [ isEdit, setIsEdit ] = useState<boolean>(false) // Render DriverGroupEdit or not.
  const [ group, setGroup ] = useState<driverGroupType>(initDriverGroup) // If we're editing a driver group rather than making a new one, populate.
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
    /> : (
    <div className="driver-group-picker">
      {loading ? <CircularProgress/> : 
        <div className="driver-group-list">
          {groups.map((driverGroup: driverGroupType) => 
            <DriverGroup 
              onClick={() => {
                setGroup(driverGroup)
                setIsEdit(!isEdit)
              }}
            />)}
          <IconButton 
            className="add-button"
            onClick={() => setIsEdit(!isEdit)}
          >
            <Add/>
          </IconButton>
        </div>
      }
    </div>
  )
}

export default DriverGroupPicker
