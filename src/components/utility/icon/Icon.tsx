import React, { useState } from "react"
import './_icon.scss'

interface iconType {
  src: string
  style?: object
}

const Icon: React.FC<iconType> = ({ src, style }) => {
  const [ error, setError ] = useState<boolean>(false)

  const iconContent = (error: boolean, src: string) => {
    if (!error) {
      return <img alt="Icon" onError={() => setError(true)} src={src}/>
    } else {
      return (
        <div className="image-error">
          <p>{`err`}</p>
        </div>
      )
    }
  }

  return (
    <div className="icon" style={style}>
      {iconContent(error, src)}
    </div>
  )
}

export default Icon
