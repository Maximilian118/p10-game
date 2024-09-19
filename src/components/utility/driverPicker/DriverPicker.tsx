import React, { useEffect, useState } from "react"
import './_driverPicker.scss'
import MUIAutocomplete from "../muiAutocomplete/muiAutocomplete"
import { inputLabel } from "../../../shared/formValidation"
import { driverGroupType, driverType } from "../../../shared/types"
import { useNavigate } from "react-router-dom"
import { getDrivers } from "../../../shared/requests/driverRequests"
import { userType } from "../../../shared/localStorage"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import DriverCard from "../../cards/driverCard/DriverCard"
import { canEditDriver } from "./driverEdit/driverEditUtility"
import { sortAlphabetically } from "../../../shared/utility"
import { canEditGroup } from "../driverGroupPicker/driverGroupEdit/driverGroupUtility"
import AddButton from "../button/addButton/AddButton"

interface driverPickerType<T, U> {
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  editForm: T
  setEditForm: React.Dispatch<React.SetStateAction<T>>
  editFormErr: U
  setEditFormErr: React.Dispatch<React.SetStateAction<U>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
  group: driverGroupType
  setGroup: React.Dispatch<React.SetStateAction<driverGroupType>>
  setIsDriverEdit: React.Dispatch<React.SetStateAction<boolean>>
  setDriver: React.Dispatch<React.SetStateAction<driverType>>
  setDrivers?: React.Dispatch<React.SetStateAction<driverType[]>> // Drivers requested from DB in a state of parent.
}

const DriverPicker = <T extends { drivers: driverType[] }, U extends { drivers: string }>({
  user,
  setUser,
  editForm,
  setEditForm,
  editFormErr,
  setEditFormErr,
  backendErr,
  setBackendErr,
  group,
  setGroup,
  setIsDriverEdit,
  setDriver,
  setDrivers,
}: driverPickerType<T, U>) => {
  const [ localDrivers, setLocalDrivers ] = useState<driverType[]>([]) // All drivers in db.
  const [ value, setValue ] = useState<driverType | null>(null) // Current value of Autocomplete.
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

  useEffect(() => { // Expose requested drivers to a higher state.
    setDrivers && setDrivers(localDrivers)
  }, [localDrivers, setDrivers])

  const removeDriverHandler = (driver: driverType) => {
    const removedDriver = editForm.drivers.filter(d => d._id !== driver._id)
    // Remove this driver from driver group form state.
    setEditForm(prevForm => {
      return {
        ...prevForm,
        drivers: removedDriver,
      }
    })

    setGroup(prevGroup => {
      return {
        ...prevGroup,
        drivers: removedDriver,
      }
    })
    // Remove this driver from the driver group in db.
    // Request
  }

  return (
    <div className="driver-picker">
      <MUIAutocomplete
        label={inputLabel("drivers", editFormErr, backendErr)}
        displayNew="always"
        customNewLabel="Driver"
        onNewMouseDown={() => setIsDriverEdit(true)}
        options={localDrivers.filter(driver => !editForm.drivers.some(d => d._id === driver._id))}
        value={value ? value.name : null}
        loading={loading}
        error={editFormErr.drivers || backendErr.type === "drivers" ? true : false}
        setObjValue={(value) => {
          setValue(value)
        }}
        onLiClick={(value) => {
          setEditForm(prevForm => {
            return {
              ...prevForm,
              drivers: [
                value,
                ...prevForm.drivers,
              ],
            }
          })

          setGroup(prevGroup => {
            return {
              ...prevGroup,
              drivers: [
                value,
                ...prevGroup.drivers,
              ]
            }
          })
        }}
        onChange={() => 
          setEditFormErr(prevErrs => {
            return {
              ...prevErrs,
              drivers: "",
            }
          }
        )}
      />
      <div className="driver-picker-list">
        {sortAlphabetically(editForm.drivers).map((driver: driverType, i: number) => (
          <DriverCard 
            key={i} 
            driver={driver}
            canEdit={!!canEditDriver(driver, user)}
            onRemove={(driver) => removeDriverHandler(driver)}
            canRemove={!!canEditGroup(group, user)}
            onClick={() => {
              setDriver(driver)
              setIsDriverEdit(true)
            }}
          />
        ))}
        <AddButton
          onClick={() => {
            setIsDriverEdit(true)
          }}
          absolute
        />
      </div>
    </div>
  )
}

export default DriverPicker
