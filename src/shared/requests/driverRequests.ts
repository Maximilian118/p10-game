import axios from "axios"
import { driverType } from "../types"
import { userType } from "../localStorage"
import { graphQLErrors, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { NavigateFunction } from "react-router-dom"

export const getDrivers = async (
  setDrivers: React.Dispatch<React.SetStateAction<driverType[]>>,
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
              getDrivers {
                array {
                  _id
                  url
                  name
                  driverGroups
                  stats {
                    nationality
                    heightCM
                    weightKG
                    age
                    moustache
                    mullet
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
          graphQLErrors("getDrivers", res, setUser, navigate, setBackendErr, true)
        } else {
          const drivers = graphQLResponse("getDrivers", res, user, setUser) as {
            array: driverType[]
            token: string
            code: number
          }

          if (drivers.array.length > 0) {
            setDrivers(drivers.array)
          }
        }
      })
      .catch((err: any) => {
        graphQLErrors("getDrivers", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("getDrivers", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}
