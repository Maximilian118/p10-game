import React from "react"
import './_badgePickerToolbar.scss'
import { Button, IconButton } from "@mui/material"
import { Add, FilterList } from "@mui/icons-material"
import { badgeType } from "../../../../shared/types"

interface badgePickerToolbarType {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean | badgeType>>
  draw: boolean
  setDraw: React.Dispatch<React.SetStateAction<boolean>>
  style?: React.CSSProperties
}

const BadgePickerToolbar: React.FC<badgePickerToolbarType> = ({ setIsEdit, draw, setDraw, style }) => (
  <div className="badge-picker-toolbar" style={style}>
    <Button 
      variant="contained" 
      size="small" 
      onClick={() => setDraw(!draw)}
      endIcon={<FilterList/>}>
      Filter
    </Button>
    <IconButton 
      className="add-button add-button-toolbar"
      onClick={e => setIsEdit(true)}
    >
      <Add/>
    </IconButton>
  </div>
)

export default BadgePickerToolbar
