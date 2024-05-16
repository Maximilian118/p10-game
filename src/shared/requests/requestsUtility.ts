import { logout, tokensHandler, userType } from "../localStorage"
import { isJSON } from "../utility"

const formatString = (str: string) => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-")
}
// Format name of all files to be uploaded to s3.
export const formatFilename = (userName: string, category: string, file: File): string => {
  const username = formatString(userName)
  const cat = formatString(category)
  const filename = formatString(file.name)

  return `${username}/${cat}/${filename}`
}

export interface graphQLErrorType {
  request: string
  type: string
  message: string
  code: number | null
  value: any
  locations: readonly string[]
  path: readonly (string | number)[]
  originalError: object
}

export let initGraphQLError: graphQLErrorType = {
  request: "",
  type: "",
  message: "",
  code: null,
  value: null,
  locations: [],
  path: [],
  originalError: {},
}

// Format and return a GraphQL Error from an Axios request.
export const graphQLError = (
  request: string,
  error: graphQLErrorType,
  setBackendErr?: React.Dispatch<React.SetStateAction<graphQLErrorType>> | false,
  log?: boolean,
): graphQLErrorType => {
  let errorObj: graphQLErrorType = initGraphQLError
  const e = error

  if (e.type === "Unknown") {
    e.message = `Unknown Error: ${e.message}`
  }

  errorObj = {
    request,
    type: e.type ? e.type : "",
    message: e.message ? e.message : "",
    code: e.code ? e.code : 400,
    value: e.value ? e.value : null,
    locations: e.locations ? e.locations : [],
    path: e.path ? e.path : [],
    originalError: error,
  }

  if (setBackendErr) {
    setBackendErr((prevErr) => {
      return {
        ...prevErr,
        ...errorObj,
      }
    })
  }

  if (log) {
    console.error(errorObj)
  }

  return errorObj
}

// Format and return a GraphQL response from an Axios request.
export const graphQLResponse = (
  request: string,
  res: {
    data: {
      data: {
        [key: string]: { tokens?: string; code?: number }
      }
    }
  },
  log?: boolean,
  code?: number,
): object => {
  let obj = res.data.data[request]

  if (obj.tokens && isJSON(obj.tokens)) {
    obj = tokensHandler(obj)
  }

  obj = {
    ...obj,
    code: code ? code : 200,
  }

  if (log) {
    console.log(obj)
  }

  return obj
}

// Loop through an array of strings. If any of those strings matches the current backendErr.type
// or at least matches a word then return true.
export const hasBackendErr = (types: string[], backendErr: graphQLErrorType): boolean => {
  let match = false

  if (backendErr.type && backendErr.message) {
    types.forEach((type) => {
      if (backendErr.type.toLowerCase().includes(type.toLowerCase())) {
        match = true
      }
    })
  }

  return match
}

// Add headers to a request
// prettier-ignore
export const headers = (token: string): {
  "Content-Type": string,
    accessToken: string,
    refreshToken: string,
} => {
  const refreshToken = localStorage.getItem("refresh_token")

  return {
    "Content-Type": "application/json",
    accessToken: `Bearer ${token}`,
    refreshToken: `Bearer ${refreshToken}`,
  }
}

// If no authentication, logout.
export const checkAuth = (
  errors: [],
  setUser: React.Dispatch<React.SetStateAction<userType>>,
  navigate: Function,
): void => {
  errors.forEach((err: { message: string }) => {
    if (err.message === "Not Authenticated!") {
      logout(setUser, navigate)
    }
  })
}
