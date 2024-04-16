import imageCompression from "browser-image-compression"

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
