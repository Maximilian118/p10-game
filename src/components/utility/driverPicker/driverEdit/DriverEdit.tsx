import React, { useState } from "react"
import './_driverEdit.scss'
import DropZone from "../../dropZone/DropZone"
import { Button, InputAdornment, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../../shared/formValidation"
import { graphQLErrorType } from "../../../../shared/requests/requestsUtility"
import { driverType, teamType } from "../../../../shared/types"
import MUIAutocomplete from "../../muiAutocomplete/muiAutocomplete"
import { heightCMOptions, weightKGOptions } from "../../../../shared/utility"
import moment, { Moment } from "moment"
import MUIDatePicker from "../../muiDatePicker/MUIDatePicker"
import { Abc } from "@mui/icons-material"
import MUICheckbox from "../../muiCheckbox/MUICheckbox"
import { userType } from "../../../../shared/localStorage"
import { initDriver, initTeam } from "../../../../shared/init"
import MUICountrySelect, { countryType, findCountryByString } from "../../muiCountrySelect/MUICountrySelect"
import { driverEditErrors } from "../driverPickerUtility"
import TeamEdit from "../../teamPicker/teamEdit/TeamEdit"
import TeamPicker from "../../teamPicker/TeamPicker"

interface driverEditType {
  setIsDriverEdit: React.Dispatch<React.SetStateAction<boolean>>
  driver: driverType
  setDriver: React.Dispatch<React.SetStateAction<driverType>>
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
  drivers: driverType[]
}

export interface driverEditFormType {
  url: string
  driverName: string
  driverID: `${Uppercase<string>}${Uppercase<string>}${Uppercase<string>}` | ""
  teams: teamType[]
  nationality: countryType | null
  heightCM: string | null
  weightKG: string | null
  birthday: Moment | null
  moustache: boolean
  mullet: boolean
  icon: File | null
  profile_picture: File | null
}

export interface driverEditFormErrType {
  url: string
  driverName: string
  driverID: string
  teams: string
  nationality: string
  heightCM: string
  weightKG: string
  birthday: string
  moustache: string
  mullet: string
  dropzone: string
  [key: string]: string
}

const DriverEdit: React.FC<driverEditType> = ({ setIsDriverEdit, driver, setDriver, user, setUser, backendErr, setBackendErr, drivers }) => {
  const [ isEdit, setIsEdit ] = useState<boolean>(false) // Render TeamEdit or not.
  const [ team, setTeam ] = useState<teamType>(initTeam(user)) // If we're editing a team rather than making a new one, populate.
  const [ editForm, setEditForm ] = useState<driverEditFormType>({
    url: driver.url ? driver.url : "",
    driverName: driver.name ? driver.name : "",
    driverID: driver.driverID ? driver.driverID : "",
    teams: driver.teams ? driver.teams : [],
    nationality: driver.stats.nationality ? findCountryByString(driver.stats.nationality) : null,
    heightCM: driver.stats.heightCM ? `${driver.stats.heightCM}cm` : null,
    weightKG: driver.stats.weightKG ? `${driver.stats.weightKG}kg` : null,
    birthday: driver.stats.birthday ? moment(driver.stats.birthday) : null,
    moustache: driver.stats.moustache ? driver.stats.moustache : false,
    mullet: driver.stats.mullet ? driver.stats.mullet : false,
    icon: null,
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<driverEditFormErrType>({
    url: "",
    driverName: "",
    driverID: "",
    teams: "",
    nationality: "",
    heightCM: "",
    weightKG: "",
    birthday: "",
    moustache: "",
    mullet: "",
    dropzone: "",
  })

  const onSubmitHandler = () => {
    // Check for Errors
    if (driverEditErrors(editForm, setEditFormErr, drivers)) {
      return
    }

    // request...
    // Update group. Group will update form on submission.
    // Convert strings to numbers
  }

  return isEdit ? 
    <TeamEdit
      setIsEdit={setIsEdit}
      form={editForm}
      setForm={setEditForm}
      user={user}
      setUser={setUser}
      team={team}
      setTeam={setTeam}
    /> : (
    <div className="driver-edit">
      <h4>{`${!driver.name ? `New` : `Edit`} Driver`}</h4>
      <DropZone<driverEditFormType, driverEditFormErrType>
        form={editForm}
        setForm={setEditForm}
        formErr={editFormErr}
        setFormErr={setEditFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
        purposeText="Driver Image"
        thumbImg={driver.url ? driver.url : false}
        style={{ marginBottom: 40 }}
      />
      <TextField
        name="driverName"
        inputProps={{ maxLength: 30 }}
        className="mui-el"
        label={inputLabel("driverName", editFormErr, backendErr)}
        variant="filled" 
        onChange={e => updateForm<driverEditFormType, driverEditFormErrType>(e, editForm, setEditForm, setEditFormErr, backendErr, setBackendErr)}
        value={editForm.driverName}
        error={editFormErr.driverName || backendErr.type === "driverName" ? true : false}
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
      <TeamPicker
        user={user}
        setUser={setUser}
        editForm={editForm}
        setEditForm={setEditForm}
        editFormErr={editFormErr}
        setEditFormErr={setEditFormErr}
        backendErr={backendErr}
        setBackendErr={setBackendErr}
        setIsEdit={setIsEdit}
        setTeam={setTeam}
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
      <div className="driver-edit-stats">
        <MUIDatePicker
          label="DOB"
          value={editForm.birthday as null}
          onChange={(newValue: Moment | null) => {
            setEditForm(prevForm => {
              return {
                ...prevForm,
                birthday: newValue
              }
            })
          }}
        />
        <TextField
          name="driverID"
          label={inputLabel("driverID", editFormErr, backendErr)}
          variant="filled" 
          onChange={e => updateForm<driverEditFormType, driverEditFormErrType>(e, editForm, setEditForm, setEditFormErr, backendErr, setBackendErr)}
          value={editForm.driverID}
          error={editFormErr.driverID || backendErr.type === "driverID" ? true : false}
          inputProps={{ maxLength: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Abc/>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="driver-edit-checkboxes">
        <MUICheckbox
          text="Moustache"
          checked={editForm.moustache}
          onClick={() => setEditForm(prevForm => {
            return {
              ...prevForm,
              moustache: !prevForm.moustache,
            }
          })}
          textRight
        />
        <MUICheckbox
          text="Mullet"
          checked={editForm.mullet}
          onClick={() => setEditForm(prevForm => {
            return {
              ...prevForm,
              mullet: !prevForm.mullet,
            }
          })}
          textRight
        />
      </div>
      <div className="button-bar">
        <Button
          className="mui-button-back"
          variant="contained" 
          color="inherit"
          onClick={e => {
            setIsDriverEdit(false)
            setDriver(initDriver(user))
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