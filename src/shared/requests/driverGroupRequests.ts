import axios from "axios"
import { userType } from "../localStorage"
import { NavigateFunction } from "react-router-dom"
import { graphQLErrors, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { driverGroupType } from "../types"

export const getDriverGroups = async (
  setGroups: React.Dispatch<React.SetStateAction<driverGroupType[]>>,
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
              getDriverGroups {
                array {
                  _id
                  url
                  name
                  championships
                  drivers
                  created_at
                  updated_at
                  tokens
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
          graphQLErrors("getDriverGroups", res, setUser, navigate, setBackendErr, true)
        } else {
          const driverGroups = graphQLResponse("getDriverGroups", res, user, setUser) as {
            array: driverGroupType[]
            token: string
            code: number
          }

          if (driverGroups.array.length > 0) {
            setGroups(driverGroups.array)
          }
        }
      })
      .catch((err: any) => {
        graphQLErrors("getDriverGroups", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("getDriverGroups", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}
