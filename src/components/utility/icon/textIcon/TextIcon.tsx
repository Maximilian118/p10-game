import React, { useEffect, useState } from "react"
import './_textIcon.scss'
import { capitalise } from "../../../../shared/utility"

interface textIconType {
  text: string
  size?: "small" | "medium" | "large" | "contained"
}

const TextIcon: React.FC<textIconType> = ({ text, size }) => {
  const [ height, setHeight ] = useState<number | undefined>(undefined)
  const iconType = `icon-${size ? size : "medium"}`

  useEffect(() => {
    const textIcon = document.getElementById(iconType)

    if (textIcon) {
      setHeight(textIcon.getBoundingClientRect().height)
    }
  }, [iconType])

  return (
    <div
      id={iconType} 
      className={`${iconType} text-icon`}
      style={{ borderRadius: height }}
    >
      <p className="text-icon-text">{capitalise(text)}</p>
    </div>
  )
}

export default TextIcon
