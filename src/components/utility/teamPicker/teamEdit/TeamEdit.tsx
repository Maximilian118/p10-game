import React, { useState } from "react"
import './_teamEdit.scss'
import { teamType } from "../../../../shared/types"
import DropZone from "../../dropZone/DropZone"
import { graphQLErrorType, initGraphQLError } from "../../../../shared/requests/requestsUtility"
import { Button, CircularProgress, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../../shared/formValidation"
import MUICountrySelect, { countryType, findCountryByString } from "../../muiCountrySelect/MUICountrySelect"
import { initTeam } from "../../../../shared/init"
import MUIDatePicker from "../../muiDatePicker/MUIDatePicker"
import moment, { Moment } from "moment"
import { newTeam } from "../../../../shared/requests/teamRequests"
import { useNavigate } from "react-router-dom"
import { userType } from "../../../../shared/localStorage"
import { teamEditErrors } from "./teamEditUtility"

interface teamEditType<T> {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  user: userType
  setUser: React.Dispatch<React.SetStateAction<userType>>
  team: teamType // The team in question.
  setTeam: React.Dispatch<React.SetStateAction<teamType>>
}

export interface teamEditFormType {
  teamName: string
  inceptionDate: Moment | null
  nationality: countryType | null
  icon: File | null
  profile_picture: File | null
}

export interface teamEditFormErrType {
  teamName: string
  inceptionDate: string
  nationality: string
  dropzone: string
  [key: string]: string
}

const TeamEdit = <T extends { teams: teamType[] }>({ setIsEdit, form, setForm, user, setUser, team, setTeam }: teamEditType<T>) => {
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ editForm, setEditForm ] = useState<teamEditFormType>({
    teamName: team.name ? team.name : "",
    inceptionDate: team.stats.inceptionDate ? moment(team.stats.inceptionDate) : null,
    nationality: team.stats.nationality ? findCountryByString(team.stats.nationality) : null,
    icon: null,
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<teamEditFormErrType>({
    teamName: "",
    inceptionDate: "",
    nationality: "",
    dropzone: "",
  })

  const navigate = useNavigate()

  const onSubmitHandler = async () => {
    // Check for Errors
    if (teamEditErrors(editForm, setEditFormErr, form.teams)) {
      return
    }

    await newTeam(editForm, setForm, user, setUser, navigate, setLoading, setBackendErr, setIsEdit)
    setTeam(initTeam(user))
  }

  return (
    <div className="team-edit">
      <h4>{`${!team.name ? `New` : `Edit`} Team`}</h4>
      <DropZone<teamEditFormType, teamEditFormErrType>
        form={editForm}
        setForm={setEditForm}
        formErr={editFormErr}
        setFormErr={setEditFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
        purposeText="Team Logo"
        thumbImg={team.url ? team.url : false}
        style={{ marginBottom: 40 }}
      />
      <TextField
        name="teamName"
        inputProps={{ maxLength: 30 }}
        className="mui-el"
        label={inputLabel("teamName", editFormErr, backendErr)}
        variant="filled" 
        onChange={e => updateForm<teamEditFormType, teamEditFormErrType>(e, editForm, setEditForm, setEditFormErr, backendErr, setBackendErr)}
        value={editForm.teamName}
        error={editFormErr.teamName || backendErr.type === "teamName" ? true : false}
      />
      <MUICountrySelect
        label="Nationality"
        value={editForm.nationality}
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
            setTeam(initTeam(user))
            setIsEdit(false)
          }}
        >Back</Button>
        <Button
          variant="contained"
          onClick={e => onSubmitHandler()}
          startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
        >Submit</Button>
      </div>
    </div>
  )
}

export default TeamEdit
