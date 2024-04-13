import axios from "axios"
import { headers, checkAuth } from "../authUtility"
import { userType } from "../localStorage"
import { formatFilename } from "./requestsUtility"

export const signS3 = async (
  user: userType,
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  category: `${string}/`,
  file: File,
): Promise<string> => {
  let fileURL = ""
  const filename = formatFilename(user._id, user.name, category, file)
  try {
    await axios
      .post(
        "",
        {
          variables: {
            filename: filename,
            // filetype: file.blob.type,
          },
          query: `
        query SignS3($filename: String!, $filetype: String!) {
          signS3(filename: $filename, filetype: $filetype) {
            tokens
            signedRequest
            url
          }
        }
      `,
        },
        { headers: headers(user.token) },
      )
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors)
        } else {
          fileURL = res.data.url
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }

  return fileURL
}
