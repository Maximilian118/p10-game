import axios from "axios"
import { userType } from "../localStorage"
import { NavigateFunction } from "react-router-dom"
import { graphQLErrors, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { driverGroupType } from "../types"
import { driverGroupEditFormType } from "../../components/utility/driverGroupPicker/driverGroupEdit/DriverGroupEdit"
import { populateDriverGroup } from "./requestPopulation"
import { uplaodS3 } from "./bucketRequests"
import { capitalise } from "../utility"

export const newDriverGroup = async <T extends { driverGroups: driverGroupType[] }>(
  editForm: driverGroupEditFormType,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
): Promise<boolean> => {
  setLoading(true)
  let iconURL = ""
  let success = false

  if (editForm.icon) {
    iconURL = await uplaodS3(editForm.groupName, "icon", editForm.icon, setBackendErr) // prettier-ignore

    if (!iconURL) {
      setLoading(false)
      return false
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
            name: capitalise(editForm.groupName),
            drivers: editForm.drivers.map((driver) => driver._id!),
          },
          query: `
            mutation NewDriverGroup( $created_by: ID!, $url: String!, $name: String!, $drivers: [ID!]! ) {
              newDriverGroup(driverGroupInput: { created_by: $created_by, url: $url, name: $name, drivers: $drivers }) {
                ${populateDriverGroup}
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("newDriverGroup", res, setUser, navigate, setBackendErr, true)
        } else {
          const driverGroup = graphQLResponse("newDriverGroup", res, user, setUser, false) as driverGroupType // prettier-ignore

          setForm((prevForm) => {
            return {
              ...prevForm,
              driverGroup: [...prevForm.driverGroups, driverGroup],
            }
          })

          success = true
        }
      })
      .catch((err: any) => {
        graphQLErrors("newDriverGroup", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("newDriverGroup", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
  return success
}

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
                  ${populateDriverGroup}
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
