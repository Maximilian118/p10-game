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
            createUser(userInput: {name: $name, email: $email, password: $password, pass_confirm: $passConfirm, icon: $icon, profile_picture: $profile_picture}) {
              ${populateUser}
            }
          }
        `,
      })
      .then(async (res) => {
        if (res.data.errors) {
          console.log(res.data.errors[0].message)
        } else {
          console.log(res)
        }

        setLoading(false)
      })
      .catch((err) => {
        console.log(JSON.parse(err.response.data.errors[0].message))
        setLoading(false)
      })
  } catch (err) {
    console.log(err)
    setLoading(false)
  }
}
