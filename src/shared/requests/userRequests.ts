import axios from "axios"
import { createFormType } from "../../page/Create"
import { userType } from "../localStorage"
import { populateUser } from "./requestPopulation"
import { uplaodS3 } from "./bucketRequests"
import { formatGraphQLError, formatGraphQLResponse, graphQLErrorType } from "./requestsUtility"

export const createUser = async (
  form: createFormType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
): Promise<void> => {
  setLoading(true)
  let iconURL = ""
  let ppURL = ""

  if (form.icon && form.profile_picture) {
    iconURL = await uplaodS3(form.name, "icon", form.icon, setBackendErr)
    ppURL = await uplaodS3(form.name, "profile_picture", form.profile_picture, setBackendErr)

    if (!iconURL || !ppURL) {
      const errorMessage = "Failed to upload image."
      console.error(`Error: ${errorMessage}`)
      setBackendErr((prevErr) => {
        return {
          ...prevErr,
          message: `${errorMessage} Try again!`,
        }
      })
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
      .then(async (res: any) => {
        if (res.data.errors) {
          formatGraphQLError("createUser", res.data.errors[0].message, setBackendErr, true)
        } else {
          setUser((prevUser) => {
            return {
              ...prevUser,
              ...formatGraphQLResponse("createUser", res, true),
            }
          })
        }
      })
      .catch((err: any) => {
        formatGraphQLError("createUser", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    formatGraphQLError("createUser", err.response.data, setBackendErr, true)
  }

  setLoading(false)
}
