import axios from "axios"
import { createFormType } from "../../page/Create"
import { userType } from "../localStorage"
import { populateUser } from "./requestPopulation"
import { uplaodS3 } from "./bucketRequests"
import { formatGraphQLError, formatGraphQLResponse } from "./requestsUtility"

export const createUser = async (
  form: createFormType,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true)
  let iconURL = ""
  let ppURL = ""

  if (form.icon && form.profile_picture) {
    iconURL = await uplaodS3(user, "icon", form.icon)
    ppURL = await uplaodS3(user, "profile_picture", form.profile_picture)

    if (iconURL === "" || ppURL === "") {
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
      .then(async (res: any) => {
        if (res.data.errors) {
          formatGraphQLError("createUser", res.data.errors[0].message, true)
        } else {
          formatGraphQLResponse("createUser", res, true)
        }
      })
      .catch((err: any) => {
        formatGraphQLError("createUser", err.response.data.errors[0], true)
      })
  } catch (err: any) {
    formatGraphQLError("createUser", err.response.data, true)
  }

  setLoading(false)
}
