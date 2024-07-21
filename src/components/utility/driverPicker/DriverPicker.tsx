import React, { useEffect, useState } from "react"
import "./_driverPicker.scss"
import { CircularProgress, IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import { driverGroupType } from "../../../shared/types"
import DriverGroup from "./driverGroup/DriverGroup"
import { getDriverGroups } from "../../../shared/requests/driverGroupRequests"
import { userType } from "../../../shared/localStorage"
import { useNavigate } from "react-router-dom"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"

interface driverPickerType<T> {
  form: T
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

const DriverPicker= <T extends { driverGroups: driverGroupType[] }>({ form, user, setUser, setBackendErr }: driverPickerType<T>) => {
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

  return (
    <div className="driver-picker">
      {loading ? <CircularProgress/> : 
        <>
          {groups.map((driverGroup: driverGroupType) => <DriverGroup/>)}
          <IconButton 
            className="add-button" 
          >
            <Add/>
          </IconButton>
        </>
      }
    </div>
  )
}

export default DriverPicker
