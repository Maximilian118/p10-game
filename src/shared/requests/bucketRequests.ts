import axios from "axios"
import { formatFilename, graphQLError, graphQLErrorType } from "./requestsUtility"

const putS3 = async (
  file: File,
  signedRequest: string,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
): Promise<void> => {
  return await axios
    .put(signedRequest, file, { headers: { "Content-Type": file.type } })
    .then((res: any) => {
      console.log(res)
    })
    .catch((err: any) => {
      graphQLError("putS3", err, setBackendErr, true)
    })
}

export const uplaodS3 = async (
  userName: string,
  category: string,
  file: File | null,
  setBackendErr: React.Dispatch<React.SetStateAction<graphQLErrorType>>,
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
              duplicate
            }
          }
        `,
      })
      .then(async (res: any) => {
        if (res.data.errors) {
          graphQLError("signS3", res.data.errors[0].message, setBackendErr, true)
        } else {
          if (!res.data.data.signS3.duplicate) {
            await putS3(file, res.data.data.signS3.signedRequest, setBackendErr)
          }

          url = res.data.data.signS3.url
        }
      })
      .catch((err: any) => {
        graphQLError("signS3", err.response.data.errors[0], setBackendErr, true)
      })
  } catch (err: any) {
    graphQLError("signS3", err.response.data, setBackendErr, true)
  }

  return url
}
