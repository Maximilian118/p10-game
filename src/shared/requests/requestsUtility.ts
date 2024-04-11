import moment from "moment"

const formatString = (str: string) => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-")
}
// Format name of all files to be uploaded to s3.
export const formatFilename = (
  _id: string,
  name: string,
  category: `${string}/`,
  file: File,
): string => {
  const username = formatString(name)
  const date = formatString(moment().format())
  const filename = formatString(file.name)

  return `${username}-${_id}/${category}${date}-${file.size}/${filename}`
}
