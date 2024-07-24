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
  const [ isEdit, setIsEdit ] = useState<boolean>(false)
  const [ group, setGroup ] = useState<driverGroupType>(initDriverGroup)
  const [ groups, setGroups ] = useState<driverGroupType[]>([])
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
      form={form}
      setForm={setForm}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      group={group}
      setGroup={setGroup}
    /> : (
    <div className="driver-group-picker">
      {loading ? <CircularProgress/> : 
        <>
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
        </>
      }
    </div>
  )
}

export default DriverGroupPicker
