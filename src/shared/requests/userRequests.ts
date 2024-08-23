import axios from "axios"
import { createFormType } from "../../page/Create"
import { userType, logInSuccess, logout, tokensHandler } from "../localStorage"
import { populateUser } from "./requestPopulation"
import { uplaodS3 } from "./bucketRequests"
import { graphQLErrors, graphQLErrorType, graphQLResponse, headers } from "./requestsUtility"
import { NavigateFunction } from "react-router-dom"
import { loginFormType } from "../../page/Login"
import { forgotFormType } from "../../page/Forgot"
import { formType } from "../types"
import { passFormType } from "../../page/Password"

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
          graphQLErrors("createUser", res, setUser, navigate, setBackendErr, true)
        } else {
          logInSuccess("createUser", res, setUser, true)
          navigate("/")
        }
      })
      .catch((err: any) => {
        graphQLErrors("createUser", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("createUser", err, setUser, navigate, setBackendErr, true)
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
          graphQLErrors("login", res, setUser, navigate, setBackendErr, true)
        } else {
          logInSuccess("login", res, setUser, true)
          navigate("/")
        }
      })
      .catch((err: any) => {
        console.log(err)
        graphQLErrors("login", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("login", err, setUser, navigate, setBackendErr, true)
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
          graphQLErrors("forgot", res, undefined, undefined, setBackendErr, true)
        } else {
          setSuccess(true)
        }
      })
      .catch((err: any) => {
        graphQLErrors("forgot", err, undefined, undefined, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("forgot", err, undefined, undefined, setBackendErr, true)
  }

  setLoading(false)
}

export const updatePP = async <T extends formType>(
  form: T,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: NavigateFunction,
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
          graphQLErrors("updatePP", res, setUser, navigate, setBackendErr, true)
        } else {
          const response = graphQLResponse("updatePP", res) as userType

          setUser((prevUser) => {
            return {
              ...prevUser,
              icon: response.icon,
              profile_picture: response.profile_picture,
              token: tokensHandler(user, response.tokens),
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
        graphQLErrors("updatePP", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("updatePP", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}

export const updateEmail = async <T extends formType>(
  form: T,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: NavigateFunction,
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
          graphQLErrors("updateEmail", res, setUser, navigate, setBackendErr, true)
        } else {
          const response = graphQLResponse("updateEmail", res) as userType

          setUser((prevUser) => {
            return {
              ...prevUser,
              email: response.email,
              token: tokensHandler(user, response.tokens),
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
        graphQLErrors("updateEmail", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("updateEmail", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}

export const updateName = async <T extends formType>(
  form: T,
  setForm: React.Dispatch<React.SetStateAction<T>>,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: NavigateFunction,
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
          graphQLErrors("updateName", res, setUser, navigate, setBackendErr, true)
        } else {
          const response = graphQLResponse("updateName", res) as userType

          setUser((prevUser) => {
            return {
              ...prevUser,
              name: response.name,
              token: tokensHandler(user, response.tokens),
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
        graphQLErrors("updateName", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("updateName", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}

export const updatePassword = async <T extends passFormType>(
  form: T,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post(
        "",
        {
          variables: form,
          query: `
            mutation UpdatePassword($currentPass: String!, $password: String!, $passConfirm: String!) {
              updatePassword(currentPass: $currentPass, password: $password, passConfirm: $passConfirm) {
                tokens
              }
            }
          `,
        },
        { headers: headers(user.token) },
      )
      .then((res: any) => {
        if (res.data.errors) {
          graphQLErrors("updatePassword", res, setUser, navigate, setBackendErr, true)
        } else {
          graphQLResponse("updatePassword", res) as userType
          setSuccess(true)
          logout(setUser)
          navigate("/pass-success")
        }
      })
      .catch((err: any) => {
        graphQLErrors("updatePassword", err, setUser, navigate, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("updatePassword", err, setUser, navigate, setBackendErr, true)
  }

  setLoading(false)
}
