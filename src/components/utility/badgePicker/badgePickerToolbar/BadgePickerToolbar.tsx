import React from "react"
import './_badgePickerToolbar.scss'
import { Button, IconButton } from "@mui/material"
import { Add, FilterList } from "@mui/icons-material"
import { badgeType } from "../../../../shared/types"

interface badgePickerToolbarType {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean | badgeType>>
}

const BadgePickerToolbar: React.FC<badgePickerToolbarType> = ({ setIsEdit }) => (
  <div className="badge-picker-toolbar">
    <Button 
      variant="contained" 
      size="small" 
      endIcon={<FilterList/>}>
      Filter
    </Button>
    <IconButton 
      className="add-button"
      onClick={e => setIsEdit(true)}
    >
      <Add/>
    </IconButton>
  </div>
)

export default BadgePickerToolbar
