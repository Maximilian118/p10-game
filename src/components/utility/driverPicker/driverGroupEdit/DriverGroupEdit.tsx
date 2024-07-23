import React, { useState } from "react"
import './_driverGroupEdit.scss'
import { driverGroupType } from "../../../../shared/types"
import { graphQLErrorType, initGraphQLError } from "../../../../shared/requests/requestsUtility"
import DropZone from "../../dropZone/DropZone"
import { TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../../shared/formValidation"

interface driverGroupEditType<T> {
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  group: driverGroupType
  setGroup: React.Dispatch<React.SetStateAction<driverGroupType>>
}

interface editFormType {
  groupName: string
  icon: File | null
  profile_picture: File | null
}

export interface editFormErrType {
  groupName: string
  dropzone: string
  [key: string]: string
}

const DriverGroupEdit = <T extends { driverGroups: driverGroupType[] }>({ 
  form, 
  setForm, 
  isEdit, 
  setIsEdit, 
  group, 
  setGroup 
}: driverGroupEditType<T>) => {
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ editForm, setEditForm ] = useState<editFormType>({
    groupName: isEdit ? group.name : "",
    icon: null,
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<editFormErrType>({
    groupName: "",
    dropzone: "",
  })

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
    </div>
  )
}

export default DriverGroupEdit
