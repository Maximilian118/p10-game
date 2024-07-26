import React, { useEffect, useState } from "react"
import './_driverPicker.scss'
import { useNavigate } from "react-router-dom"
import { driverType } from "../../../shared/types"
import { getDrivers } from "../../../shared/requests/driverRequests"
import { userType } from "../../../shared/localStorage"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"

interface driverPickerType<T> {
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

const DriverPicker = <T extends { drivers: driverType[] }>({ form, setForm, user, setUser, setBackendErr }: driverPickerType<T>) => {
  const [ drivers, setDrivers ] = useState<driverType[]>([]) // All drivers in the database.
  const [ reqSent, setReqSent ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (drivers.length === 0 && !reqSent) {
      // Get all drivers in the database so the user can select existing drivers for the group.
      getDrivers(setDrivers, user, setUser, navigate, setLoading, setBackendErr)
    }
    setReqSent(true)
  }, [drivers, setDrivers, reqSent, user, setUser, navigate, setBackendErr])

  return (
    <div className="driver-picker">
      
    </div>
  )
}

export default DriverPicker
