import axios from "axios"
import { createFormType } from "../../page/Create"
import { userType, logInSuccess } from "../localStorage"
import { populateUser } from "./requestPopulation"
import { uplaodS3 } from "./bucketRequests"
import { graphQLError, graphQLErrorType } from "./requestsUtility"
import { NavigateFunction } from "react-router-dom"
import { loginFormType } from "../../page/Login"

export const createUser = async (
  form: createFormType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  navigate: NavigateFunction,
): Promise<void> => {
  setLoading(true)
  let iconURL = ""
  let ppURL = ""

  if (form.icon && form.profile_picture) {
    iconURL = await uplaodS3(form.name, "icon", form.icon, setBackendErr)
    ppURL = await uplaodS3(form.name, "profile_picture", form.profile_picture, setBackendErr)

    if (!iconURL || !ppURL) {
      console.error("Error: Failed to upload image.")
      setLoading(false)
      return
    }
  }

  try {
    await axios
      .post("", {
        variables: {
          ...form,
          icon: iconURL,
          profile_picture: ppURL,
        },
        query: `
          mutation CreateUser(
            $name: String!, 
            $email: String!, 
            $password: String!, 
            $passConfirm: String!, 
            $icon: String, 
            $profile_picture: String
          ) { 
            createUser(
              userInput: {
                name: $name, 
                email: $email, 
                password: $password, 
                passConfirm: $passConfirm, 
                icon: $icon, 
                profile_picture: $profile_picture
              }
            ) {
              ${populateUser}
            }
          }
        `,
      })
      .then((res: any) => {
        if (res.data.errors) {
          graphQLError("createUser", res.data.errors[0].message, setBackendErr, true)
        } else {
          logInSuccess("createUser", res, setUser, true)
          navigate("/")
        }
      })
      .catch((err: any) => {
        graphQLError("createUser", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    graphQLError("createUser", err.response.data, setBackendErr, true)
  }

  setLoading(false)
}

export const login = async (
  form: loginFormType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  navigate: NavigateFunction,
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post("", {
        variables: form,
        query: `
        query Login($email: String!, $password: String) {
          login(email: $email, password: $password) {
            ${populateUser}
          }
        }
      `,
      })
      .then((res: any) => {
        if (res.data.errors) {
          graphQLError("login", res.data.errors[0].message, setBackendErr, true)
        } else {
          logInSuccess("login", res, setUser, true)
          navigate("/")
        }
      })
      .catch((err: any) => {
        graphQLError("login", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    graphQLError("login", err.response.data, setBackendErr, true)
  }

  setLoading(false)
}
