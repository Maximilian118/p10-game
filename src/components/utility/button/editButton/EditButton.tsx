import React, { SyntheticEvent } from "react"
import '../_button.scss'
import './_editButton.scss'
import { IconButton } from "@mui/material"
import { Edit } from "@mui/icons-material"

interface editButtonType {
  onClick?: (e: SyntheticEvent) => void
  size?: "small" | "medium" | "large" | "contained"
  style?: React.CSSProperties
}

const EditButton: React.FC<editButtonType> = ({ onClick, size, style }) => {
  return (
    <IconButton
      className={`button-${size ? size : "small"} edit-button`}
      onClick={onClick}
      style={style}
    >
      <Edit/>
    </IconButton>
  )
}

export default EditButton
