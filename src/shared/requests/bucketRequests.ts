import axios from "axios"
import { formatFilename, graphQLErrors, graphQLErrorType } from "./requestsUtility"

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
      graphQLErrors("putS3", err, undefined, undefined, setBackendErr, true)
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
          graphQLErrors("signS3", res, undefined, undefined, setBackendErr, true)
        } else {
          if (!res.data.data.signS3.duplicate) {
            await putS3(file, res.data.data.signS3.signedRequest, setBackendErr)
          }

          url = res.data.data.signS3.url
        }
      })
      .catch((err: any) => {
        graphQLErrors("signS3", err, undefined, undefined, setBackendErr, true)
      })
  } catch (err: any) {
    graphQLErrors("signS3", err, undefined, undefined, setBackendErr, true)
  }

  return url
}
