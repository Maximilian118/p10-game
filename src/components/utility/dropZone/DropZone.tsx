import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { compressImage } from "./dropZoneUtility"
import './_dropZone.scss'

interface dropZoneType<T> {
  setForm: React.Dispatch<React.SetStateAction<T>>,
  setFormErr: React.Dispatch<React.SetStateAction<T>>,
}

interface formType {
  icon: File | null,
  profile_picture: File | null,
}

interface compressedImagesType {
  icon: File,
  profile_picture: File,
}

const DropZone = <T extends formType>({ setForm, setFormErr }: dropZoneType<T>) => {
  const [ thumb, setThumb ] = useState<string>("")
  const [ error, setError ] = useState<string>("")

  // Determine if the window has drag and drop capabilities.
  const canDragDrop = (): boolean => {
    const testDiv = document.createElement('div')
    return (('draggable' in testDiv) || ('ondragstart' in testDiv && 'ondrop' in testDiv)) && 'FormData' in window && 'FileReader' in window
  }

  // Init DropZone with the necessary arguments.
  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({ 
    accept: { // Only allow these file types.
      'image/jpeg': [],
      'image/png': [],
    },
    multiple: false, // Only 1 file.
    maxSize: 10000000, // Maximum file size = 10mb.
  })

  // When a file is accepted, compress into two different sizes.
  // Then, setThumb with a url string for the thumbnail.
  // Then, setForm with compressed Files.
  useEffect(() => {
    if (acceptedFiles.length > 0 && fileRejections.length === 0) {
      const acceptedFilesHandler = async (
        setForm: React.Dispatch<React.SetStateAction<T>>,
        setFormErr: React.Dispatch<React.SetStateAction<T>>,
        setError: React.Dispatch<React.SetStateAction<string>>,
      ): Promise<void> => {
        const compressImages = async (file: File): Promise<compressedImagesType> => {
          return {
            icon: await compressImage(file, 0.1),
            profile_picture: await compressImage(file, 1),
          }
        }

        const compressedImages = await compressImages(acceptedFiles[0])

        setThumb(URL.createObjectURL(compressedImages.profile_picture))
        setError("")
        
        setFormErr(prevFormErr => {
          return {
            ...prevFormErr,
            profile_picture: null,
          }
        })

        setForm(prevForm => {
          return {
            ...prevForm,
            ...compressedImages,
          }
        })
      }

      acceptedFilesHandler(setForm, setFormErr, setError)
    } else if (fileRejections.length > 0) {
      const err = fileRejections[0].errors[0].message

      setThumb("")
      setError(err)
      setFormErr(prevFormErr => {
        return {
          ...prevFormErr,
          profile_picture: err,
        }
      })
    }
  }, [acceptedFiles, fileRejections, setForm, setFormErr])

  const dropZoneContent = (
    canDragDrop: () => boolean,
    thumb: string,
    error: string,
  ): JSX.Element => {
    if (error) {
      return <p>{error}</p>
    }

    if (thumb) {
      return <img alt="Thumbnail" src={thumb}/>
    }

    return <p>{`${canDragDrop() ? `Drag and drop` : `Select`} an image...`}</p>
  }

  return (
    <div {...getRootProps({className: 'dropzone'})}>
      <div className={`inside-border ${isDragActive ? "drag-active" : ""}`}>
        <input {...getInputProps()} />
        {dropZoneContent(canDragDrop, thumb, error)}
      </div>
    </div>
  )
}

export default DropZone
