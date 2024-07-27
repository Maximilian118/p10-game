import React, { useState } from "react"
import './_driverGroupEdit.scss'
import { driverGroupType, driverType } from "../../../../shared/types"
import DropZone from "../../dropZone/DropZone"
import { Button, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../../shared/formValidation"
import { initDriverGroup } from "../DriverGroupPicker"
import { graphQLErrorType, initGraphQLError } from "../../../../shared/requests/requestsUtility"
import DriverEdit from "../driverEdit/DriverEdit"
import { userType } from "../../../../shared/localStorage"
import DriverPicker from "../driverPicker/DriverPicker"

interface driverGroupEditType<T> {
  setForm: React.Dispatch<React.SetStateAction<T>>
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  group: driverGroupType
  setGroup: React.Dispatch<React.SetStateAction<driverGroupType>>
}

interface editFormType {
  groupName: string
  drivers: driverType[]
  icon: File | null
  profile_picture: File | null
}

interface editFormErrType {
  groupName: string
  drivers: string
  dropzone: string
  [key: string]: string
}

export const initDriver: driverType = {
  url: "",
  name: "",
  driverGroups: [],
  stats: {
    heightCM: null,
    weightKG: null,
    age: null,
    moustache: false,
    mullet: false,
  },
}

const DriverGroupEdit = <T extends { driverGroups: driverGroupType[] }>({
  setForm,
  user,
  setUser,
  setIsEdit, 
  group, 
  setGroup,
}: driverGroupEditType<T>) => {
  const [ isDriverEdit, setIsDriverEdit ] = useState<boolean>(false) // Render isDriverEdit or not.
  const [ driver, setDriver ] = useState<driverType>(initDriver) // If we're editing a driver rather than making a new one, populate.
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ editForm, setEditForm ] = useState<editFormType>({
    groupName: group.name ? group.name : "",
    drivers: group.drivers ? group.drivers : [],
    icon: null,
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<editFormErrType>({
    groupName: "",
    drivers: "",
    dropzone: "",
  })

  const onSubmitHandler = () => {
    // SetForm with any changes.
  }

  return isDriverEdit ? 
    <DriverEdit
      setIsDriverEdit={setIsDriverEdit}
      driver={driver}
      setDriver={setDriver}
      backendErr={backendErr}
      setBackendErr={setBackendErr}
    />
  : (
    <div className="driver-group-edit">
      <h4>{`${!group.name ? `New` : `Edit`} Group`}</h4>
      <DropZone<editFormType, editFormErrType>
        form={editForm}
        setForm={setEditForm}
        formErr={editFormErr}
        setFormErr={setEditFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
        purposeText="Group Image"
        thumbImg={group.url ? group.url : false}
        style={{ marginBottom: 30 }}
      />
      <TextField
        name="groupName"
        className="mui-el"
        label={inputLabel("groupName", editFormErr, backendErr)}
        variant="filled" 
        onChange={e => updateForm<editFormType, editFormErrType>(e, editForm, setEditForm, setEditFormErr, backendErr, setBackendErr)}
        value={editForm.groupName}
        error={editFormErr.groupName || backendErr.type === "groupName" ? true : false}
      />
      <DriverPicker
        setIsDriverEdit={setIsDriverEdit}
        driver={driver}
        setDriver={setDriver}
        user={user}
        setUser={setUser}
        editFormErr={editFormErr}
        setEditFormErr={setEditFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
      />
      <div className="button-bar">
        <Button
          className="mui-button-back"
          variant="contained" 
          color="inherit"
          onClick={e => {
            setIsEdit(false)
            setGroup(initDriverGroup)
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

export default DriverGroupEdit
