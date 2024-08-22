import React, { useState } from "react"
import './_teamEdit.scss'
import { teamType } from "../../../shared/types"
import DropZone from "../dropZone/DropZone"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import { Button, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../shared/formValidation"
import MUICountrySelect, { CountryType } from "../muiCountrySelect/MUICountrySelect"
import { initTeam } from "../../../shared/init"
import MUIDatePicker from "../muiDatePicker/MUIDatePicker"
import { Moment } from "moment"

interface teamEditType {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  team: teamType
  setTeam: React.Dispatch<React.SetStateAction<teamType>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

interface editFormType {
  teamName: string
  inceptionDate: Moment | null
  nationality: CountryType | null
  icon: File | null
  profile_picture: File | null
}

interface editFormErrType {
  teamName: string
  inceptionDate: string
  nationality: string
  dropzone: string
  [key: string]: string
}

const TeamEdit: React.FC<teamEditType> = ({ setIsEdit, team, setTeam, backendErr, setBackendErr }) => {
  const [ editForm, setEditForm ] = useState<editFormType>({
    teamName: "",
    inceptionDate: null,
    nationality: null,
    icon: null,
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<editFormErrType>({
    teamName: "",
    inceptionDate: "",
    nationality: "",
    dropzone: "",
  })

  const onSubmitHandler = () => {
    // Update team.
  }

  return (
    <div className="team-edit">
      <h4>{`${!team.name ? `New` : `Edit`} Team`}</h4>
      <DropZone<editFormType, editFormErrType>
        form={editForm}
        setForm={setEditForm}
        formErr={editFormErr}
        setFormErr={setEditFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
        purposeText="Team Logo"
        thumbImg={team.url ? team.url : false}
        style={{ marginBottom: 30 }}
      />
      <TextField
        name="teamName"
        inputProps={{ maxLength: 30 }}
        className="mui-el"
        label={inputLabel("teamName", editFormErr, backendErr)}
        variant="filled" 
        onChange={e => updateForm<editFormType, editFormErrType>(e, editForm, setEditForm, setEditFormErr, backendErr, setBackendErr)}
        value={editForm.teamName}
        error={editFormErr.teamName || backendErr.type === "teamName" ? true : false}
      />
      <MUICountrySelect
        label="Nationality"
        onChange={(e, val) => {
          setEditForm(prevForm => {
            return {
              ...prevForm,
              nationality: val
            }
          })
        }}
      />
      <MUIDatePicker
        label="Founded"
        value={editForm.inceptionDate as null}
        className="mui-el"
        onChange={(newValue: Moment | null) => {
          setEditForm(prevForm => {
            return {
              ...prevForm,
              inceptionDate: newValue
            }
          })
        }}
      />
      <div className="button-bar">
        <Button
          className="mui-button-back"
          variant="contained" 
          color="inherit"
          onClick={e => {
            setIsEdit(false)
            setTeam(initTeam)
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

export default TeamEdit
