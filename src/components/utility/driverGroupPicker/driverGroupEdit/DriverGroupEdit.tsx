import React, { useEffect, useState } from "react"
import './_driverGroupEdit.scss'
import { driverGroupType, driverType } from "../../../../shared/types"
import { graphQLErrorType, initGraphQLError } from "../../../../shared/requests/requestsUtility"
import DropZone from "../../dropZone/DropZone"
import { Button, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../../shared/formValidation"
import { initDriverGroup } from "../DriverGroupPicker"
import { getDrivers } from "../../../../shared/requests/driverRequests"
import { userType } from "../../../../shared/localStorage"
import { useNavigate } from "react-router-dom"

interface driverGroupEditType<T> {
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  group: driverGroupType
  setGroup: React.Dispatch<React.SetStateAction<driverGroupType>>
}

interface editFormType {
  groupName: string
  groupDrivers: driverType[]
  icon: File | null
  profile_picture: File | null
}

export interface editFormErrType {
  groupName: string
  groupDrivers: string
  dropzone: string
  [key: string]: string
}

const DriverGroupEdit = <T extends { driverGroups: driverGroupType[] }>({ 
  form, 
  setForm,
  user,
  setUser,
  isEdit, 
  setIsEdit, 
  group, 
  setGroup,
}: driverGroupEditType<T>) => {
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ drivers, setDrivers ] = useState<driverType[]>([]) // All drivers in the database.
  const [ reqSent, setReqSent ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ editForm, setEditForm ] = useState<editFormType>({
    groupName: isEdit ? group.name : "",
    groupDrivers: isEdit ? group.drivers : [], // All drivers already in the the object for this group.
    icon: null,
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<editFormErrType>({
    groupName: "",
    groupDrivers: "",
    dropzone: "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (drivers.length === 0 && !reqSent) {
      // Get all drivers in the database so the user can select existing drivers for the group.
      getDrivers(setDrivers, user, setUser, navigate, setLoading, setBackendErr)
    }
    setReqSent(true)
  }, [drivers, reqSent, user, setUser, navigate])

  const onSubmitHandler = () => {

  }

  return (
    <div className="driver-group-edit">
      <h4>{`${isEdit ? `New` : `Edit`} Driver Group`}</h4>
      <DropZone<editFormType, editFormErrType>
        form={editForm}
        setForm={setEditForm}
        formErr={editFormErr}
        setFormErr={setEditFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
        purposeText="Group Image"
        thumbImg={isEdit ? group.url : false}
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
