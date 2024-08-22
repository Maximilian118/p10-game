import axios from "axios"
import { teamType } from "../types"
import { userType } from "../localStorage"
import { graphQLErrors, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { NavigateFunction } from "react-router-dom"

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
                  _id
                  url
                  name
                  driverGroups
                  drivers
                  stats {
                    inceptionDate
                    nationality
                  }
                  created_at
                  updated_at
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
