import axios from "axios"
import { driverType } from "../types"
import { userType } from "../localStorage"
import { graphQLErrors, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { NavigateFunction } from "react-router-dom"
import { populateDriver } from "./requestPopulation"
import { driverEditFormType } from "../../components/utility/driverPicker/driverEdit/DriverEdit"
import { uplaodS3 } from "./bucketRequests"
import moment from "moment"
import { onlyNumbers } from "../utility"

export const newDriver = async <T extends { drivers: driverType[] }>(
  editForm: driverEditFormType,
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
    iconURL = await uplaodS3(editForm.driverName, "icon", editForm.icon, setBackendErr) // prettier-ignore

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
            name: editForm.driverName,
            driverID: editForm.driverID,
            teams: editForm.teams.map((team) => team._id),
            nationality: editForm.nationality?.label,
            heightCM: onlyNumbers(editForm.heightCM!),
            weightKG: onlyNumbers(editForm.weightKG!),
            birthday: moment(editForm.birthday).format(),
            moustache: editForm.moustache,
            mullet: editForm.mullet,
          },
          query: `
            mutation NewDriver(
              $created_by: ID!, 
              $url: String!, 
              $name: String!,
              $driverID: String!,
              $teams: [ID!],
              $nationality: String!
              $heightCM: Int!,
              $weightKG: Int!,
              $birthday: String!,
              $moustache: Boolean!,
              $mullet: Boolean!,
            ) {
              newDriver(
                driverInput: { 
                  created_by: $created_by, 
                  url: $url, 
                  name: $name,
                  driverID: $driverID,
                  teams: $teams,
                  nationality: $nationality,
                  heightCM: $heightCM,
                  weightKG: $weightKG,
                  birthday: $birthday,
                  moustache: $moustache,
                  mullet: $mullet,
                }
              ) {
                ${populateDriver}
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("newDriver", res, setUser, navigate, setBackendErr, true)
        } else {
          const driver = graphQLResponse("newDriver", res, user, setUser) as driverType

          setForm((prevForm) => {
            return {
              ...prevForm,
              drivers: [...prevForm.drivers, driver],
            }
          })

          success = true
        }
      })
      .catch((err: any) => {
        graphQLErrors("newDriver", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("newDriver", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
  return success
}

export const updateDriver = async <T extends { drivers: driverType[] }>(
  driver: driverType,
  editForm: driverEditFormType,
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
    iconURL = await uplaodS3(editForm.driverName, "icon", editForm.icon, setBackendErr, user, setUser, navigate, 0) // prettier-ignore

    if (!iconURL) {
      setLoading(false)
      return false
    }
  }

  const updatedDriver = {
    url: iconURL ? iconURL : driver.url,
    name: editForm.driverName,
    nationality: editForm.nationality!.label,
    heightCM: onlyNumbers(editForm.heightCM!),
    weightKG: onlyNumbers(editForm.weightKG!),
    birthday: moment(editForm.birthday).format(),
  }

  try {
    await axios
      .post(
        "",
        {
          variables: {
            ...editForm,
            ...updatedDriver,
            teams: editForm.teams.map((team) => team._id!),
          },
          query: `
            mutation UpdateDriver(
              $_id: ID,
              $url: String,
              $name: String!,
              $driverID: String!,
              $teams: [ID!],
              $nationality: String!,
              $heightCM: Int!,
              $weightKG: Int!,
              $birthday: String!,
              $moustache: Boolean!,
              $mullet: Boolean!,
            ) {
              updateDriver(
                driverInput: { 
                  _id: $_id,
                  url: $url,
                  name: $name,
                  driverID: $driverID,
                  teams: $teams,
                  nationality: $nationality,
                  heightCM: $heightCM,
                  weightKG: $weightKG,
                  birthday: $birthday,
                  moustache: $moustache,
                  mullet: $mullet,
                }
              ) {
                ${populateDriver}
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("updateDriver", res, setUser, navigate, setBackendErr, true)
        } else {
          const newDriver = graphQLResponse("updateDriver", res, user, setUser, false) as driverType

          // Update this driver in editForm.drivers
          setForm((prevForm) => {
            return {
              ...prevForm,
              drivers: prevForm.drivers.map((d) => {
                if (d._id === driver._id) {
                  return newDriver
                } else {
                  return d
                }
              }),
            }
          })

          success = true
        }
      })
      .catch((err: any) => {
        graphQLErrors("updateDriver", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("updateDriver", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
  return success
}

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
                  ${populateDriver}
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

export const deleteDriver = async <T extends { drivers: driverType[] }>(
  driver: driverType,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
): Promise<boolean> => {
  setLoading(true)
  let success = false

  try {
    await axios
      .post(
        "",
        {
          variables: {
            _id: driver._id,
          },
          query: `
            mutation DeleteDriver( $_id: ID! ) {
              deleteDriver( _id: $_id ) {
                ${populateDriver}
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("deleteDriver", res, setUser, navigate, setBackendErr, true)
        } else {
          graphQLResponse("deleteDriver", res, user, setUser)

          // Remove this driver from the drivers array
          setForm((prevForm) => {
            return {
              ...prevForm,
              drivers: prevForm.drivers.filter((d) => d._id !== driver._id),
            }
          })

          success = true
        }
      })
      .catch((err: any) => {
        graphQLErrors("deleteDriver", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("deleteDriver", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
  return success
}
