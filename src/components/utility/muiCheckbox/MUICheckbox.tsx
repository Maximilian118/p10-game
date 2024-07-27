import React, { MouseEvent } from "react"
import './_muiCheckbox.scss'
import { Checkbox } from "@mui/material"

interface MUICheckboxType {
  text: string
  checked: boolean
  onClick: (e: MouseEvent) => void
  checkedColour?: string
  textRight?: boolean
}

const MUICheckbox: React.FC<MUICheckboxType> = ({ text, checked, onClick, checkedColour, textRight }) => {
  return (
    <div className="checkbox-container">
      {text && !textRight && <p>{text}</p>}
      <Checkbox
        checked={checked}
        inputProps={{ 'aria-label': 'Badge filter checkbox' }}
        onClick={onClick}
        sx={checkedColour ? {
          '&.Mui-checked': {
            color: checkedColour,
          },
        } : {}}
      />
      {text && textRight && <p>{text}</p>}
    </div>
  )
}

export default MUICheckbox
