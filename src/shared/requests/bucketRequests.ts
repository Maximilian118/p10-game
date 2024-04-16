import axios from "axios"
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
  userName: string,
  category: string,
  file: File | null,
): Promise<string> => {
  let url = ""

  if (!file) {
    return url
  }

  try {
    await axios
      .post("", {
        variables: {
          filename: formatFilename(userName, category, file),
        },
        query: `
          query SignS3($filename: String!) {
            signS3(filename: $filename) {
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
          await putS3(file, res.data.data.signS3.signedRequest)
          url = res.data.data.signS3.url
        }
      })
      .catch((err: any) => {
        formatGraphQLError("signS3", err.response.data.errors[0], true)
        console.log(err)
      })
  } catch (err: any) {
    formatGraphQLError("signS3", err.response.data, true)
  }

  return url
}
