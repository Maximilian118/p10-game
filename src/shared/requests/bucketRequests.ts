import axios from "axios"
import { userType } from "../localStorage"
import { formatFilename, formatGraphQLError } from "./requestsUtility"

const putS3 = async (file: File, signedRequest: string): Promise<void> => {
  return await axios
    .put(signedRequest, file, { headers: { "Content-Type": file.type } })
    .then((res: any) => {
      console.log(res)
    })
    .catch((err: any) => {
      formatGraphQLError("putS3", err, true)
    })
}

export const uplaodS3 = async (
  user: userType,
  category: string,
  file: File,
): Promise<string> => {
  let fileURL = ""

  try {
    await axios
      .post("", {
        variables: {
          filename: formatFilename(user.name, category, file),
          filetype: file.type,
        },
        query: `
          query SignS3($filename: String!, $filetype: String!) {
            signS3(filename: $filename, filetype: $filetype) {
              signedRequest
              url
            }
          }
        `,
      })
      .then(async (res: any) => {
        if (res.data.errors) {
          formatGraphQLError("signS3", res.data.errors[0].message, true)
        } else {
          fileURL = res.data.url
          await putS3(file, res.data.signedRequest)
        }
      })
      .catch((err: any) => {
        formatGraphQLError("signS3", err.response.data.errors[0], true)
        console.log(err)
      })
  } catch (err: any) {
    formatGraphQLError("signS3", err.response.data, true)
  }

  return fileURL
}
