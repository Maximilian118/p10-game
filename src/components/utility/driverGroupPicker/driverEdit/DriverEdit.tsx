import React, { useState } from "react"
import './_driverEdit.scss'
import DropZone from "../../dropZone/DropZone"
import { Button, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../../shared/formValidation"
import { graphQLErrorType } from "../../../../shared/requests/requestsUtility"
import { driverType } from "../../../../shared/types"
import { initDriver } from "../driverGroupEdit/DriverGroupEdit"
import MUIAutocomplete from "../../muiAutocomplete/muiAutocomplete"
import { heightCMOptions, weightKGOptions } from "../../../../shared/utility"

interface driverEditType {
  setIsDriverEdit: React.Dispatch<React.SetStateAction<boolean>>
  driver: driverType
  setDriver: React.Dispatch<React.SetStateAction<driverType>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

interface editFormType {
  url: string
  driverName: string
  heightCM: string | null
  weightKG: string | null
  age: string | null
  moustache: boolean
  mullet: boolean
  icon: File | null
  profile_picture: File | null
}

interface editFormErrType {
  url: string
  driverName: string
  heightCM: string
  weightKG: string
  age: string
  moustache: string
  mullet: string
  dropzone: string
  [key: string]: string
}

const DriverEdit: React.FC<driverEditType> = ({ setIsDriverEdit, driver, setDriver, backendErr, setBackendErr }) => {
  const [ editForm, setEditForm ] = useState<editFormType>({
    url: driver.url ? driver.url : "",
    driverName: driver.name ? driver.name : "",
    heightCM: driver.stats.heightCM ? `${driver.stats.heightCM}cm` : null,
    weightKG: driver.stats.weightKG ? `${driver.stats.weightKG}kg` : null,
    age: null,
    moustache: false,
    mullet: false,
    icon: null,
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<editFormErrType>({
    url: "",
    driverName: "",
    heightCM: "",
    weightKG: "",
    age: "",
    moustache: "",
    mullet: "",
    dropzone: "",
  })

  const onSubmitHandler = () => {
    // Update group. Group will update form on submission.
    // Convert strings to numbers
  }

  return (
    <div className="driver-edit">
      <h4>{`${!driver.name ? `New` : `Edit`} Driver`}</h4>
      <DropZone<editFormType, editFormErrType>
        form={editForm}
        setForm={setEditForm}
        formErr={editFormErr}
        setFormErr={setEditFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
        purposeText="Driver Image"
        thumbImg={driver.url ? driver.url : false}
        style={{ marginBottom: 30 }}
      />
      <TextField
        name="driverName"
        className="mui-el"
        label={inputLabel("driverName", editFormErr, backendErr)}
        variant="filled" 
        onChange={e => updateForm<editFormType, editFormErrType>(e, editForm, setEditForm, setEditFormErr, backendErr, setBackendErr)}
        value={editForm.driverName}
        error={editFormErr.driverName || backendErr.type === "driverName" ? true : false}
      />
      <div className="driver-edit-stats">
        <MUIAutocomplete
          label={inputLabel("heightCM", editFormErr, backendErr)}
          options={heightCMOptions()}
          value={editForm.heightCM}
          error={editFormErr.heightCM || backendErr.type === "heightCM" ? true : false}
          setValue={(value) => {
            setEditForm(prevForm => {
              return {
                ...prevForm,
                heightCM: value as string
              }
            })
          }}
          onChange={() => setEditFormErr(prevErrs => {
            return {
              ...prevErrs,
              heightCM: "",
            }
          })}
        />
        <MUIAutocomplete
          label={inputLabel("weightKG", editFormErr, backendErr)}
          options={weightKGOptions()}
          value={editForm.weightKG}
          error={editFormErr.weightKG || backendErr.type === "weightKG" ? true : false}
          setValue={(value) => {
            setEditForm(prevForm => {
              return {
                ...prevForm,
                weightKG: value as string
              }
            })
          }}
          onChange={() => setEditFormErr(prevErrs => {
            return {
              ...prevErrs,
              weightKG: "",
            }
          })}
        />
      </div>
      <div className="button-bar">
        <Button
          className="mui-button-back"
          variant="contained" 
          color="inherit"
          onClick={e => {
            setIsDriverEdit(false)
            setDriver(initDriver)
          }}
        >Back</Button>
        <Button
          variant="contained"
          onClick={e => onSubmitHandler()}
        >Submit</Button>
      </div>
    </div>
  )
}

export default DriverEdit