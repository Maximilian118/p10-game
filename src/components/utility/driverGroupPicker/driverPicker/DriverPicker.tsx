import React, { useEffect, useState } from "react"
import './_driverPicker.scss'
import MUIAutocomplete from "../../muiAutocomplete/muiAutocomplete"
import { inputLabel } from "../../../../shared/formValidation"
import { driverType } from "../../../../shared/types"
import { useNavigate } from "react-router-dom"
import { getDrivers } from "../../../../shared/requests/driverRequests"
import { userType } from "../../../../shared/localStorage"
import { graphQLErrorType } from "../../../../shared/requests/requestsUtility"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"

interface driverPickerType<U> {
  setIsDriverEdit: React.Dispatch<React.SetStateAction<boolean>>
  driver: driverType
  setDriver: React.Dispatch<React.SetStateAction<driverType>>
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  editFormErr: U
  setEditFormErr: React.Dispatch<React.SetStateAction<U>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

const DriverPicker = <U extends { drivers: string }>({
  setIsDriverEdit,
  driver,
  setDriver,
  user, 
  setUser,
  editFormErr,
  setEditFormErr, 
  backendErr, 
  setBackendErr,
}: driverPickerType<U>) => {
  const [ drivers, setDrivers ] = useState<driverType[]>([]) // All drivers in db.
  const [ value, setValue ] = useState<string | null>(null) // Current value of Autocomplete.
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
      <MUIAutocomplete
        label={inputLabel("drivers", editFormErr, backendErr)}
        options={drivers.map((driver: driverType) => driver.name)}
        value={value}
        setValue={setValue}
        error={editFormErr.drivers || backendErr.type === "drivers" ? true : false}
        onChange={() => setEditFormErr(prevErrs => {
          return {
            ...prevErrs,
            drivers: "",
          }
        })}
      />
      <div className="driver-picker-list">
        <IconButton 
          className="add-button" 
          onClick={() => {
            setIsDriverEdit(true)
          }}
        >
          <Add/>
        </IconButton>
      </div>
    </div>
  )
}

export default DriverPicker
