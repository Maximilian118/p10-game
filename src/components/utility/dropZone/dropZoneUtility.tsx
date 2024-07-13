import imageCompression from "browser-image-compression"
import { graphQLErrorType, hasBackendErr } from "../../../shared/requests/requestsUtility"
import { getInitials } from "../../../shared/utility"
import { userType } from "../../../shared/localStorage"

// Compress an image as close as possible to the fileSize passed.
export const compressImage = async (file: File, fileSize: number): Promise<File> => {
  let compressedFile = file

  const options = {
    maxSizeMB: fileSize,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  }

  try {
    compressedFile = await imageCompression(file, options)
  } catch (err) {
    console.log(err)
  }

  return compressedFile
}

// An array of strings to indicate wheather backendErrs are applicable to dropZone.
export const errTypes = ["icon", "profile_picture", "signS3", "putS3", "Unknown"]

// Determine if error class should be applied.
export const displayError = (
  error: string,
  loading: boolean,
  backendErr?: graphQLErrorType,
): boolean => {
  if (loading || !backendErr) {
    return false
  }

  if (error || hasBackendErr(errTypes, backendErr)) {
    return true
  } else {
    return false
  }
}

// Return more palatable dropZone errors.
export const formatError = (error: string): string => {
  switch (error) {
    case "File is larger than 10000000 bytes":
      return "File size is too big! 10 megabytes maximum."
    case "File type must be image/jpeg,image/png":
      return "The file type must be a jpeg or png."
    case "Too many files":
      return "Woah there! Only one file buster."
    default:
      return error
  }
}

// Return thumbnail JSX
export const dropZoneThumb = (
  thumb: string,
  imgErr: boolean,
  setImgErr: React.Dispatch<React.SetStateAction<boolean>>,
  user?: userType,
  zoom?: number,
): JSX.Element => {
  if (imgErr && user) {
    return (
      <div className="dropzone-user-icon">
        <p>{getInitials(user.name)}</p>
      </div>
    )
  } else {
    return (
      <img 
        alt="Thumbnail"
        src={thumb}
        onError={() => setImgErr(true)}
        style={{ 
          width: zoom ? `${zoom}%` : "100%",
          height: zoom ? `${zoom}%` : "100%",
        }}
      />
    )
  }
}