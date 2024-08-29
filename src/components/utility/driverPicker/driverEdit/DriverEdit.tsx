import React, { useState } from "react"
import './_driverEdit.scss'
import DropZone from "../../dropZone/DropZone"
import { Button, CircularProgress, InputAdornment, TextField } from "@mui/material"
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
import { canEditDriver, driverEditErrors } from "../driverPickerUtility"
import TeamEdit from "../../teamPicker/teamEdit/TeamEdit"
import TeamPicker from "../../teamPicker/TeamPicker"
import { newDriver } from "../../../../shared/requests/driverRequests"
import { useNavigate } from "react-router-dom"

interface driverEditType<T> {
  setIsDriverEdit: React.Dispatch<React.SetStateAction<boolean>>
  setForm: React.Dispatch<React.SetStateAction<T>>
  driver: driverType
  setDriver: React.Dispatch<React.SetStateAction<driverType>>
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
  drivers: driverType[]
}

export interface driverEditFormType {
  _id: string | null
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

const DriverEdit = <T extends { drivers: driverType[] }>({ 
  setIsDriverEdit, 
  setForm, 
  driver, 
  setDriver, 
  user, 
  setUser, 
  backendErr, 
  setBackendErr, 
  drivers,
  }: driverEditType<T>) => {
  const [ isEdit, setIsEdit ] = useState<boolean>(false) // Render TeamEdit or not.
  const [ team, setTeam ] = useState<teamType>(initTeam(user)) // If we're editing a team rather than making a new one, populate.
  const [ teams, setTeams ] = useState<teamType[]>([]) // Teams requested from DB.
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ delLoading, setDelLoading ] = useState<boolean>(false)
  const [ editForm, setEditForm ] = useState<driverEditFormType>({
    _id: driver._id ? driver._id : null,
    url: driver.url ? driver.url : "",
    driverName: driver.name ? driver.name : "",
    driverID: driver.driverID ? driver.driverID : "",
    teams: driver.teams ? driver.teams : [], // All the teams the driver currently belongs to.
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

  const navigate = useNavigate()

  const deleteDriverHandler = () => {
    // Delete driver
    console.log(setDelLoading)
  }

  const updateDriverHandler = () => {
    // Update driver
  }

  const onSubmitHandler = async () => {
    // Check for Errors
    if (driverEditErrors(editForm, setEditFormErr, drivers)) {
      return
    }
    // Send request to add a new driver to the DB and mutate form state
    if (await newDriver(editForm, setForm, user, setUser, navigate, setLoading, setBackendErr)) {
      setIsDriverEdit(false)
      setDriver(initDriver(user))
    }
  }

  return isEdit ? 
    <TeamEdit
      setIsEdit={setIsEdit}
      setForm={setEditForm}
      user={user}
      setUser={setUser}
      team={team}
      setTeam={setTeam}
      teams={teams}
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
        disabled={canEditDriver(driver)}
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
        disabled={canEditDriver(driver)}
      />
      <MUICountrySelect
        label={inputLabel("nationality", editFormErr, backendErr)}
        value={editForm.nationality}
        error={editFormErr.nationality || backendErr.type === "nationality" ? true : false}
        disabled={canEditDriver(driver)}
        onChange={(e, val) => {
          setEditForm(prevForm => {
            return {
              ...prevForm,
              nationality: val
            }
          })

          setEditFormErr(prevErrs => {
            return {
              ...prevErrs,
              nationality: "",
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
        setTeams={setTeams}
      />
      <div className="driver-edit-stats">
        <MUIAutocomplete
          label={inputLabel("heightCM", editFormErr, backendErr)}
          options={heightCMOptions()}
          value={editForm.heightCM}
          error={editFormErr.heightCM || backendErr.type === "heightCM" ? true : false}
          disabled={canEditDriver(driver)}
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
          disabled={canEditDriver(driver)}
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
          label={inputLabel("birthday", editFormErr, backendErr)}
          value={editForm.birthday as null}
          error={editFormErr.birthday || backendErr.type === "birthday" ? true : false}
          disabled={canEditDriver(driver)}
          onChange={(newValue: Moment | null) => {
            setEditForm(prevForm => {
              return {
                ...prevForm,
                birthday: newValue
              }
            })

            setEditFormErr(prevErrs => {
              return {
                ...prevErrs,
                birthday: "",
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
          disabled={canEditDriver(driver)}
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
          disabled={canEditDriver(driver)}
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
          disabled={canEditDriver(driver)}
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
        {!canEditDriver(driver) && driver._id && <Button
          variant="contained" 
          color="error"
          onClick={e => deleteDriverHandler()}
          startIcon={delLoading && <CircularProgress size={20} color={"inherit"}/>}
        >Delete</Button>}
        <Button
          variant="contained"
          disabled={canEditDriver(driver)}
          onClick={e => editForm._id ? updateDriverHandler() : onSubmitHandler()}
          startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
        >{editForm._id ? "Update" : "Submit"}</Button>
      </div>
    </div>
  )
}

export default DriverEdit