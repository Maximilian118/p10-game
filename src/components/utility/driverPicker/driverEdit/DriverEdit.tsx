import React, { useEffect, useState } from "react"
import './_driverEdit.scss'
import DropZone from "../../dropZone/DropZone"
import { Button, InputAdornment, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../../../../shared/formValidation"
import { graphQLErrorType } from "../../../../shared/requests/requestsUtility"
import { driverType, teamType } from "../../../../shared/types"
import MUIAutocomplete from "../../muiAutocomplete/muiAutocomplete"
import { heightCMOptions, weightKGOptions } from "../../../../shared/utility"
import { Moment } from "moment"
import MUIDatePicker from "../../muiDatePicker/MUIDatePicker"
import { Abc } from "@mui/icons-material"
import MUICheckbox from "../../muiCheckbox/MUICheckbox"
import { getTeams } from "../../../../shared/requests/teamRequests"
import { useNavigate } from "react-router-dom"
import { userType } from "../../../../shared/localStorage"
import TeamEdit from "../../teamEdit/TeamEdit"
import { initDriver, initTeam } from "../../../../shared/init"
import MUICountrySelect, { CountryType } from "../../muiCountrySelect/MUICountrySelect"

interface driverEditType {
  setIsDriverEdit: React.Dispatch<React.SetStateAction<boolean>>
  driver: driverType
  setDriver: React.Dispatch<React.SetStateAction<driverType>>
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
}

interface editFormType {
  url: string
  driverName: string
  driverID: `${Uppercase<string>}${Uppercase<string>}${Uppercase<string>}` | ""
  team: string | null
  nationality: CountryType | null
  heightCM: string | null
  weightKG: string | null
  birthday: Moment | null
  moustache: boolean
  mullet: boolean
  icon: File | null
  profile_picture: File | null
}

interface editFormErrType {
  url: string
  driverName: string
  driverID: string
  team: string
  nationality: string
  heightCM: string
  weightKG: string
  birthday: string
  moustache: string
  mullet: string
  dropzone: string
  [key: string]: string
}

const DriverEdit: React.FC<driverEditType> = ({ setIsDriverEdit, driver, setDriver, user, setUser, backendErr, setBackendErr }) => {
  const [ reqSent, setReqSent ] = useState<boolean>(false)
  const [ teams, setTeams ] = useState<teamType[]>([])
  const [ isEdit, setIsEdit ] = useState<boolean>(false) // Render TeamEdit or not.
  const [ team, setTeam ] = useState<teamType>(initTeam) // If we're editing a team rather than making a new one, populate.
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ editForm, setEditForm ] = useState<editFormType>({
    url: driver.url ? driver.url : "",
    driverName: driver.name ? driver.name : "",
    driverID: driver.driverID ? driver.driverID : "",
    team: driver.team ? driver.team.name : null,
    nationality: null,
    heightCM: driver.stats.heightCM ? `${driver.stats.heightCM}cm` : null,
    weightKG: driver.stats.weightKG ? `${driver.stats.weightKG}kg` : null,
    birthday: null,
    moustache: false,
    mullet: false,
    icon: null,
    profile_picture: null,
  })
  const [ editFormErr, setEditFormErr ] = useState<editFormErrType>({
    url: "",
    driverName: "",
    driverID: "",
    team: "",
    nationality: "",
    heightCM: "",
    weightKG: "",
    birthday: "",
    moustache: "",
    mullet: "",
    dropzone: "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (teams.length === 0 && !reqSent) {
      getTeams(setTeams, user, setUser, navigate, setLoading, setBackendErr)
      setReqSent(true)
    }
  }, [teams, reqSent, user, setUser, navigate, setBackendErr])

  const onSubmitHandler = () => {
    // Update group. Group will update form on submission.
    // Convert strings to numbers
  }

  return isEdit ? 
    <TeamEdit
      setIsEdit={setIsEdit}
      team={team}
      setTeam={setTeam}
      backendErr={backendErr}
      setBackendErr={setBackendErr}
    /> : (
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
        inputProps={{ maxLength: 30 }}
        className="mui-el"
        label={inputLabel("driverName", editFormErr, backendErr)}
        variant="filled" 
        onChange={e => updateForm<editFormType, editFormErrType>(e, editForm, setEditForm, setEditFormErr, backendErr, setBackendErr)}
        value={editForm.driverName}
        error={editFormErr.driverName || backendErr.type === "driverName" ? true : false}
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
      <MUIAutocomplete
        label={inputLabel("team", editFormErr, backendErr)}
        displayNew="always"
        onNewMouseDown={() => setIsEdit(true)}
        className="mui-el"
        options={teams.map((team: teamType) => team.name)}
        value={editForm.team}
        loading={loading}
        error={editFormErr.team || backendErr.type === "team" ? true : false}
        setValue={(value) => {
          setEditForm(prevForm => {
            return {
              ...prevForm,
              team: value as string
            }
          })
        }}
        onChange={() => setEditFormErr(prevErrs => {
          return {
            ...prevErrs,
            team: "",
          }
        })}
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
          onChange={e => updateForm<editFormType, editFormErrType>(e, editForm, setEditForm, setEditFormErr, backendErr, setBackendErr)}
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