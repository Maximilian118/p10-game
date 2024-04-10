import React, { useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { compressImage } from "./dropZoneUtility"
import './_dropZone.scss'

interface dropZoneType<T> {
  setForm: React.Dispatch<React.SetStateAction<T>>,
  setFormErr: React.Dispatch<React.SetStateAction<T>>,
}

interface formType {
  icon: string,
  profile_picture: string,
}

interface compressImagesType {
  icon: File,
  profile_picture: File,
}

const DropZone = <T extends formType>({ setForm, setFormErr }: dropZoneType<T>) => {
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
      'image/gif': [],
    },
    multiple: false, // Only 1 file.
    maxSize: 10000000, // Maximum file size = 10mb.
  })

  // When a file is accepted, compress into two different sizes.
  // Then, upload to the AWS S3 bucket and update form state with the URL strings.
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const acceptedFilesHandler = async (
        setForm: React.Dispatch<React.SetStateAction<T>>,
        setFormErr: React.Dispatch<React.SetStateAction<T>>,
      ): Promise<void> => {
        const compressImages = async (file: File): Promise<compressImagesType> => {
          return {
            icon: await compressImage(file, 0.1),
            profile_picture: await compressImage(file, 1),
          }
        }
        //
        // Give the compressed images in the blow line to backend and then upload to AWS S3 Bucket.
        //
        await compressImages(acceptedFiles[0])
      }

      acceptedFilesHandler(setForm, setFormErr)
    }
  }, [acceptedFiles, setForm, setFormErr])

  return (
    <div {...getRootProps({className: 'dropzone'})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

export default DropZone
