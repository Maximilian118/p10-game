import React, { useEffect, useState } from "react"
import './_driverPicker.scss'
import MUIAutocomplete from "../muiAutocomplete/muiAutocomplete"
import { inputLabel } from "../../../shared/formValidation"
import { driverType } from "../../../shared/types"
import { useNavigate } from "react-router-dom"
import { getDrivers } from "../../../shared/requests/driverRequests"
import { userType } from "../../../shared/localStorage"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import DriverCard from "../../cards/driverCard/DriverCard"

interface driverPickerType<U> {
  setIsDriverEdit: React.Dispatch<React.SetStateAction<boolean>>
  setDriver: React.Dispatch<React.SetStateAction<driverType>>
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  editFormErr: U
  setEditFormErr: React.Dispatch<React.SetStateAction<U>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
  setDrivers?: React.Dispatch<React.SetStateAction<driverType[]>>
}

const DriverPicker = <U extends { drivers: string }>({
  setIsDriverEdit,
  setDriver,
  user, 
  setUser,
  editFormErr,
  setEditFormErr, 
  backendErr, 
  setBackendErr,
  setDrivers,
}: driverPickerType<U>) => {
  const [ localDrivers, setLocalDrivers ] = useState<driverType[]>([]) // All drivers in db.
  const [ value, setValue ] = useState<string | null>(null) // Current value of Autocomplete.
  const [ reqSent, setReqSent ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (localDrivers.length === 0 && !reqSent) {
      // Get all drivers in the database so the user can select existing drivers for the group.
      getDrivers(setLocalDrivers, user, setUser, navigate, setLoading, setBackendErr)
    }
    setReqSent(true)
  }, [localDrivers, setLocalDrivers, reqSent, user, setUser, navigate, setBackendErr])

  useEffect(() => { // Expose drivers to a higher state.
    if (setDrivers && !reqSent) {
      setDrivers(localDrivers)
    }
  }, [localDrivers, setDrivers, reqSent])

  return (
    <div className="driver-picker">
      <MUIAutocomplete
        label={inputLabel("drivers", editFormErr, backendErr)}
        displayNew="noOptions"
        onNewMouseDown={() => setIsDriverEdit(true)}
        customNewLabel="Driver"
        options={localDrivers.map((driver: driverType) => driver.name)}
        value={value}
        setValue={setValue}
        error={editFormErr.drivers || backendErr.type === "drivers" ? true : false}
        loading={loading}
        onChange={() => setEditFormErr(prevErrs => {
          return {
            ...prevErrs,
            drivers: "",
          }
        })}
      />
      <div className="driver-picker-list">
        {localDrivers
          // Add filter to remove all drivers already in the group
          .map((driver: driverType, i: number) => (
            <DriverCard 
              key={i} 
              driver={driver}
              onClick={() => {
                setDriver(driver)
                setIsDriverEdit(true)
              }}
            />
          ))
        }
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
