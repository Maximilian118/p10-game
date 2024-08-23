import axios from "axios"
import { teamType } from "../types"
import { userType } from "../localStorage"
import { graphQLErrors, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { NavigateFunction } from "react-router-dom"
import { teamEditFormType } from "../../components/utility/teamEdit/TeamEdit"
import { uplaodS3 } from "./bucketRequests"
import moment from "moment"
import { populateTeam } from "./requestPopulation"

export const newTeam = async <T extends { team: string | null }>(
  editForm: teamEditFormType,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  setTeams: React.Dispatch<React.SetStateAction<teamType[]>>,
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
            url: iconURL,
            name: editForm.teamName,
            nationality: editForm.nationality?.label,
            inceptionDate: moment(editForm.inceptionDate).format(),
          },
          query: `
            mutation NewTeam( $url: String!, $name: String!, $nationality: String!, $inceptionDate: String!) {
              newTeam(teamInput: { url: $url, name: $name, nationality: $nationality, inceptionDate: $inceptionDate }) {
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

          setTeams((prevTeams) => {
            return [...prevTeams, team]
          })

          setForm((prevForm) => {
            return {
              ...prevForm,
              team: team.name,
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
