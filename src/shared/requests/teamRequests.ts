import axios from "axios"
import { teamType } from "../types"
import { userType } from "../localStorage"
import { graphQLErrors, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { NavigateFunction } from "react-router-dom"
import { teamEditFormType } from "../../components/utility/teamPicker/teamEdit/TeamEdit"
import { uplaodS3 } from "./bucketRequests"
import moment from "moment"
import { populateTeam } from "./requestPopulation"

export const newTeam = async <T extends { teams: teamType[] }>(
  editForm: teamEditFormType,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true)

  let iconURL = ""

  if (editForm.icon) {
    iconURL = await uplaodS3(editForm.teamName, "icon", editForm.icon, setBackendErr)

    if (!iconURL) {
      console.error("Error: Failed to upload image.")
      setLoading(false)
      return
    }
  }

  try {
    await axios
      .post(
        "",
        {
          variables: {
            created_by: user._id,
            url: iconURL,
            name: editForm.teamName,
            nationality: editForm.nationality?.label,
            inceptionDate: moment(editForm.inceptionDate).format(),
          },
          query: `
            mutation NewTeam( $created_by: ID!, $url: String!, $name: String!, $nationality: String!, $inceptionDate: String!) {
              newTeam(teamInput: { created_by: $created_by, url: $url, name: $name, nationality: $nationality, inceptionDate: $inceptionDate }) {
                ${populateTeam}
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("newTeam", res, setUser, navigate, setBackendErr, true)
        } else {
          const team = graphQLResponse("newTeam", res, user, setUser, false) as teamType

          setForm((prevForm) => {
            return {
              ...prevForm,
              teams: [...prevForm.teams, team],
            }
          })

          if (setIsEdit) {
            setIsEdit(false)
          }
        }
      })
      .catch((err: any) => {
        graphQLErrors("newTeam", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("newTeam", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}

export const getTeams = async (
  setTeams: React.Dispatch<React.SetStateAction<teamType[]>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post(
        "",
        {
          variables: {},
          query: `
            query {
              getTeams {
                array {
                  ${populateTeam}
                }
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("getTeams", res, setUser, navigate, setBackendErr, true)
        } else {
          const teams = graphQLResponse("getTeams", res, user, setUser) as {
            array: teamType[]
            token: string
            code: number
          }

          if (teams.array.length > 0) {
            setTeams(teams.array)
          }
        }
      })
      .catch((err: any) => {
        graphQLErrors("getTeams", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("getTeams", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}
