import React, { useState } from "react"
import './_driverEdit.scss'
import DropZone from "../../dropZone/DropZone"
import { Button, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../../shared/formValidation"
import { graphQLErrorType } from "../../../../shared/requests/requestsUtility"
import { driverType } from "../../../../shared/types"
import { initDriver } from "../driverGroupEdit/DriverGroupEdit"

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
  icon: File | null
  profile_picture: File | null
}

interface editFormErrType {
  url: string
  driverName: string
  dropzone: string
  [key: string]: string
}

const DriverEdit: React.FC<driverEditType> = ({ setIsDriverEdit, driver, setDriver, backendErr, setBackendErr }) => {
  const [ editForm, setEditForm ] = useState<editFormType>({
    url: driver.url ? driver.url : "",
    driverName: driver.name ? driver.name : "",
    icon: null,
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<editFormErrType>({
    url: "",
    driverName: "",
    dropzone: "",
  })

  const onSubmitHandler = () => {
    // Update group. Group will update form on submission.
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