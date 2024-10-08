import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { compressImage, displayError, dropZoneThumb, errTypes, formatError } from "./dropZoneUtility"
import { graphQLErrorType, hasBackendErr, initGraphQLError } from "../../../shared/requests/requestsUtility"
import './_dropZone.scss'
import { CircularProgress } from "@mui/material"
import { formErrType, formType } from "../../../shared/types"
import { userType } from "../../../shared/localStorage"

interface dropZoneType<T, U> {
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  formErr?: U
  setFormErr?: React.Dispatch<React.SetStateAction<U>>
  backendErr?: graphQLErrorType
  setBackendErr?: React.Dispatch<React.SetStateAction<graphQLErrorType>>
  user?: userType
  style?: React.CSSProperties
  purposeText?: string
  zoom?: number
  thumbImg?: string | false
  disabled?: boolean
}

interface compressedImagesType {
  icon: File
  profile_picture: File
}

const DropZone = <T extends formType, U extends formErrType>({ 
  form, 
  setForm, 
  formErr,
  setFormErr, 
  backendErr, 
  setBackendErr, 
  user, 
  style, 
  purposeText, 
  zoom, 
  thumbImg,
  disabled,
}: dropZoneType<T, U>) => {
  const [ thumb, setThumb ] = useState<string>("")
  const [ error, setError ] = useState<string>("")
  const [ imgErr, setImgErr ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ myFiles, setMyFiles ] = useState<File[]>([])

  // On component mount, check for a profile_picture File and setThumb if truthy.
  useEffect(() => {
    if (user?.token && user?.profile_picture) {
      setThumb(user.profile_picture)
    }

    if (form.profile_picture) {
      setThumb(URL.createObjectURL(form.profile_picture))
    } else if (thumbImg) {
      setThumb(thumbImg)
    }
  }, [form.profile_picture, user, thumbImg])

  // Determine if the window has drag and drop capabilities.
  const canDragDrop = (): boolean => {
    const testDiv = document.createElement('div')
    return (('draggable' in testDiv) || ('ondragstart' in testDiv && 'ondrop' in testDiv)) && 'FormData' in window && 'FileReader' in window
  }

  // Add acceptedFiles to myFiles state. 
  // This allows us to be able to remove files from the component state and not call acceptedFilesHandler unnecessarily.
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setMyFiles([...myFiles, ...acceptedFiles])
  }, [myFiles])

  // Init DropZone with the necessary arguments.
  const { fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({ 
    accept: { // Only allow these file types.
      'image/jpeg': [],
      'image/png': [],
    },
    multiple: false, // Only 1 file.
    maxSize: 10000000, // Maximum file size = 10mb.
    onDrop, // onDrop use own state instead of accaptedFiles.
  })

  // When a file is accepted, compress into two different sizes.
  // Then, setThumb with a url string for the thumbnail.
  // Then, setForm with compressed Files.
  useEffect(() => {
    if (myFiles.length > 0 && fileRejections.length === 0 && myFiles[0].name !== form.icon?.name) {
      setLoading(true)
      // If files have been accepted, remove any backend errors.
      if (backendErr && setBackendErr && hasBackendErr(errTypes, backendErr)) {
        setBackendErr(prevErr => {
          return {
            ...prevErr,
            ...initGraphQLError,
          }
        })
      }
      // Compress files, remove errors and update form state with the compressed files.
      const acceptedFilesHandler = async (
        setForm: React.Dispatch<React.SetStateAction<T>>,
        setError: React.Dispatch<React.SetStateAction<string>>,
        setFormErr?: React.Dispatch<React.SetStateAction<U>>,
      ): Promise<void> => {
        const compressImages = async (file: File): Promise<compressedImagesType> => {
          return {
            icon: await compressImage(file, 0.1),
            profile_picture: await compressImage(file, 1),
          }
        }

        const compressedImages = await compressImages(myFiles[0])

        setImgErr(false)
        setThumb(URL.createObjectURL(compressedImages.profile_picture))
        setError("")
        setFormErr && setFormErr((prevFormErr): U => {
          return {
            ...prevFormErr,
            dropzone: "",
          }
        })
        setForm(prevForm => {
          return {
            ...prevForm,
            ...compressedImages,
          }
        })

        setMyFiles([])
        setLoading(false)
      }

      acceptedFilesHandler(setForm, setError, setFormErr)
    } else if (fileRejections.length > 0) {
      const err = fileRejections[0].errors[0].message

      setThumb("")
      setError(err)
      setFormErr && setFormErr((prevFormErr): U => {
        return {
          ...prevFormErr,
          dropzone: err,
        }
      })

      setLoading(false)
    }
  }, [form.icon?.name, myFiles, fileRejections, setForm, setFormErr, backendErr, setBackendErr])

  // If formErr is passed, display the dropzone error if there is one.
  useEffect(() => {
    if (formErr?.dropzone) {
      setError(formErr.dropzone)
    }
  }, [formErr?.dropzone])

  const dropZoneContent = (
    canDragDrop: () => boolean,
    thumb: string,
    error: string,
    loading: boolean,
    backendErr?: graphQLErrorType,
  ): JSX.Element => {
    if (loading) {
      return <CircularProgress size={"25%"}/>
    }

    if (error) {
      return <p>{formatError(error)}</p>
    }

    if (backendErr && hasBackendErr(errTypes, backendErr)) {
      return <p>{backendErr.message}</p>
    }

    if (thumb) {
      return dropZoneThumb(thumb, imgErr, setImgErr, user, zoom)
    }

    return <p>{`${canDragDrop() ? `Drag and drop` : `Select`} a ${purposeText ? purposeText : "Profile Picture"}...`}</p>
  }

  return (
    <div style={style} {...getRootProps({
      className: `
        dropzone 
        ${disabled ? "dropzone-disabled" : ""} 
        ${displayError(error, loading, backendErr) ? "dropzone-error" : ""}
      `
    })}>
      <div className={`inside-border ${isDragActive ? "drag-active" : ""}`}>
        <input {...getInputProps()} />
        {dropZoneContent(canDragDrop, thumb, error, loading, backendErr)}
      </div>
      {!loading && thumb && <div className="change">
        <p>Change</p>
      </div>}
    </div>
  )
}

export default DropZone
