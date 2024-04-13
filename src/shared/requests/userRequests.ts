import axios from "axios"
import { createFormType } from "../../page/Create"
import { userType } from "../localStorage"
import { populateUser } from "./requestPopulation"

export const createUser = async (
  form: createFormType,
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> => {
  setLoading(true)

  try {
    await axios
      .post("", {
        variables: form,
        query: `
          mutation CreateUser($name: String!, $email: String!, $password: String!, $passConfirm: String!, $icon: String, $profile_picture: String) {
            createUser(userInput: {name: $name, email: $email, password: $password, passConfirm: $passConfirm, icon: $icon, profile_picture: $profile_picture}) {
              ${populateUser}
            }
          }
        `,
      })
      .then(async (res: any) => {
        if (res.data.errors) {
          console.log(res.data.errors[0].message)
        } else {
          console.log(res.data.data.createUser)
        }

        setLoading(false)
      })
      .catch((err: any) => {
        console.log(err.response.data.errors[0])
        setLoading(false)
      })
  } catch (err: any) {
    console.log(err.response.data)
    setLoading(false)
  }
}
