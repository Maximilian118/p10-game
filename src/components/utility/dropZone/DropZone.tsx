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
  // Then, setForm with compressed Files.
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const acceptedFilesHandler = async (
        setForm: React.Dispatch<React.SetStateAction<T>>,
        setFormErr: React.Dispatch<React.SetStateAction<T>>,
      ): Promise<void> => {
        const compressImages = async (file: File): Promise<compressedImagesType> => {
          return {
            icon: await compressImage(file, 0.1),
            profile_picture: await compressImage(file, 1),
          }
        }

        const compressedImages = await compressImages(acceptedFiles[0])

        setThumb(URL.createObjectURL(compressedImages.profile_picture))

        setForm(prevForm => {
          return {
            ...prevForm,
            ...compressedImages,
          }
        })
      }

      acceptedFilesHandler(setForm, setFormErr)
    }
  }, [acceptedFiles, setForm, setFormErr])

  const dropZoneContent = (
    canDragDrop: () => boolean,
    thumb: string,
  ): JSX.Element => {
    if (thumb) {
      return <img alt="Thumbnail" src={thumb}/>
    }
    
    return <p>{`${canDragDrop() ? `Drag and drop` : `Select`} an image...`}</p>
  }

  return (
    <div {...getRootProps({className: 'dropzone'})}>
      <div className="inside-border">
        <input {...getInputProps()} />
        {dropZoneContent(canDragDrop, thumb)}
      </div>
    </div>
  )
}

export default DropZone
