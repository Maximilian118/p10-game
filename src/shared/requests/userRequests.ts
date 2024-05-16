import axios from "axios"
import { createFormType } from "../../page/Create"
import { userType, logInSuccess } from "../localStorage"
import { populateUser } from "./requestPopulation"
import { uplaodS3 } from "./bucketRequests"
import { graphQLError, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { NavigateFunction } from "react-router-dom"
import { loginFormType } from "../../page/Login"
import { forgotFormType } from "../../page/Forgot"
import { formType } from "../types"

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
    graphQLError("createUser", err, setBackendErr, true)
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
    graphQLError("login", err, setBackendErr, true)
  }

  setLoading(false)
}

export const forgot = async (
  form: forgotFormType,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post("", {
        variables: form,
        query: `
        mutation Forgot($email: String!) {
          forgot(email: $email)
        }
      `,
      })
      .then((res: any) => {
        if (res.data.errors) {
          graphQLError("forgot", res.data.errors[0].message, setBackendErr, true)
        } else {
          setSuccess(true)
        }
      })
      .catch((err: any) => {
        graphQLError("forgot", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    graphQLError("forgot", err, setBackendErr, true)
  }

  setLoading(false)
}

export const updatePP = async <T extends formType>(
  form: T,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
): Promise<void> => {
  setLoading(true)
  let iconURL = ""
  let ppURL = ""

  if (form.icon && form.profile_picture) {
    iconURL = await uplaodS3(user.name, "icon", form.icon, setBackendErr)
    ppURL = await uplaodS3(user.name, "profile_picture", form.profile_picture, setBackendErr)

    if (!iconURL || !ppURL) {
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
            ...form,
            icon: iconURL,
            profile_picture: ppURL,
          },
          query: `
          mutation UpdatePP($icon: String!, $profile_picture: String!) {
            updatePP(icon: $icon, profile_picture: $profile_picture) {
              icon
              profile_picture
              tokens
            }
          }
        `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLError("updatePP", res.data.errors[0].message, setBackendErr, true)
        } else {
          const response = graphQLResponse("updatePP", res) as userType

          setUser((prevUser) => {
            return {
              ...prevUser,
              icon: response.icon,
              profile_picture: response.profile_picture,
            }
          })

          setForm((prevForm) => {
            return {
              ...prevForm,
              icon: null,
              profile_picture: null,
            }
          })
        }
      })
      .catch((err: any) => {
        graphQLError("updatePP", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    graphQLError("updatePP", err, setBackendErr, true)
  }

  setLoading(false)
}

export const updateEmail = async <T extends formType>(
  form: T,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post(
        "",
        {
          variables: form,
          query: `
            mutation UpdateEmail($email: String!) {
              updateEmail(email: $email) {
                email
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLError("updateEmail", res.data.errors[0].message, setBackendErr, true)
        } else {
          const response = graphQLResponse("updateEmail", res) as userType

          setUser((prevUser) => {
            return {
              ...prevUser,
              email: response.email,
            }
          })

          setForm((prevForm) => {
            return {
              ...prevForm,
              email: response.email,
            }
          })

          localStorage.setItem("email", response.email)
          setSuccess(true)
        }
      })
      .catch((err: any) => {
        graphQLError("updateEmail", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    graphQLError("updateEmail", err, setBackendErr, true)
  }

  setLoading(false)
}

export const updateName = async <T extends formType>(
  form: T,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post(
        "",
        {
          variables: form,
          query: `
            mutation UpdateName($name: String!) {
              updateName(name: $name) {
                name
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLError("updateName", res.data.errors[0].message, setBackendErr, true)
        } else {
          const response = graphQLResponse("updateName", res) as userType

          setUser((prevUser) => {
            return {
              ...prevUser,
              name: response.name,
            }
          })

          setForm((prevForm) => {
            return {
              ...prevForm,
              name: response.name,
            }
          })

          localStorage.setItem("name", response.name)
          setSuccess(true)
        }
      })
      .catch((err: any) => {
        graphQLError("updateName", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    graphQLError("updateName", err, setBackendErr, true)
  }

  setLoading(false)
}
