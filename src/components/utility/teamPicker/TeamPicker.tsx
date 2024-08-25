import React, { useEffect, useState } from "react"
import './_teamPicker.scss'
import MUIAutocomplete from "../muiAutocomplete/muiAutocomplete"
import { inputLabel } from "../../../shared/formValidation"
import { getTeams } from "../../../shared/requests/teamRequests"
import { teamType } from "../../../shared/types"
import { userType } from "../../../shared/localStorage"
import { useNavigate } from "react-router-dom"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import TeamCard from "../../cards/teamCard/TeamCard"

interface teamPickerType<T, U> {
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>
  editForm: T
  setEditForm: React.Dispatch<React.SetStateAction<T>>
  editFormErr: U
  setEditFormErr: React.Dispatch<React.SetStateAction<U>>
  backendErr: graphQLErrorType
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  setTeam: React.Dispatch<React.SetStateAction<teamType>>
}

const TeamPicker = <T extends { teams: teamType[] }, U extends { teams: string }>({ 
  user, 
  setUser, 
  editForm, 
  setEditForm, 
  editFormErr, 
  setEditFormErr, 
  backendErr, 
  setBackendErr, 
  setIsEdit, 
  setTeam 
  }: teamPickerType<T, U>) => {
  const [ localTeams, setLocalTeams ] = useState<teamType[]>([]) // All teams in db.
  const [ value, setValue ] = useState<teamType | null>(null) // Current value of Autocomplete.
  const [ reqSent, setReqSent ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (localTeams.length === 0 && !reqSent) {
      // Get all teams in the database so the user can select existing teams for the driver.
      getTeams(setLocalTeams, user, setUser, navigate, setLoading, setBackendErr)
    }
    setReqSent(true)
  }, [localTeams, setLocalTeams, reqSent, user, setUser, navigate, setBackendErr])

  return (
    <div className="team-picker">
      <MUIAutocomplete
        label={inputLabel("teams", editFormErr, backendErr)}
        displayNew="always"
        customNewLabel="Team"
        onNewMouseDown={() => setIsEdit(true)}
        options={localTeams.filter(team => !editForm.teams.some(t => t._id === team._id))}
        value={value ? value.name : null}
        loading={loading}
        error={editFormErr.teams || backendErr.type === "teams" ? true : false}
        setObjValue={(value) => {
          setValue(value)
        }}
        onLiClick={(value) => {
          setEditForm(prevForm => {
            return {
              ...prevForm,
              teams: [
                value,
                ...prevForm.teams,
              ],
            }
          })
        }}
        onChange={() => 
          setEditFormErr(prevErrs => {
            return {
              ...prevErrs,
              teams: "",
            }
          }
        )}
      />
      <div className="team-picker-list">
        {editForm.teams.map((team: teamType, i: number) => (
            <TeamCard 
              key={i} 
              team={team}
              onClick={(team) => {
                setTeam(team)
                setIsEdit(true)
              }}
            />
          ))
        }
      </div>
      <IconButton 
        className="add-button" 
        onClick={() => {
          setIsEdit(true)
        }}
      >
        <Add/>
      </IconButton>
    </div>
  )
}

export default TeamPicker
