import imageCompression from "browser-image-compression"

// Compress an image as close as possible to the fileSize passed.
export const compressImage = async (
  file: File,
  fileSize: number,
): Promise<File> => {
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

// Determine if error class should be applied.
export const displayError = (
  error: string,
  loading: boolean,
  backendErr?: string,
): boolean => {
  if (loading) {
    return false
  }

  if (error || backendErr) {
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
