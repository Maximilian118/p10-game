import moment from "moment"

export interface requestErrorType {
  type?: string
  message: string
  code?: number
  value?: any
  locations: []
  path?: []
}

const formatString = (str: string) => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-")
}
// Format name of all files to be uploaded to s3.
export const formatFilename = (
  name: string,
  category: `${string}/`,
  file: File,
): string => {
  const username = formatString(name)
  const cat = formatString(category)
  const date = formatString(moment().format())
  const size = Math.floor(file.size)
  const filename = formatString(file.name)

  return `${username}/${cat}${date}-${size}/${filename}`
}
