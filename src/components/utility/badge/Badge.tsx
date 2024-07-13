import React from "react"
import './_badge.scss'
import { badgeType } from "../../../shared/types"
import BadgeOverlay from "./badgeOverlay/BadgeOverlay"
import { IconButton } from "@mui/material"
import { Edit } from "@mui/icons-material"

interface badgeCompType {
  badge: badgeType
  zoom: number
  onClick?: () => void
  style?: {}
}

const Badge: React.FC<badgeCompType> = ({ badge, zoom, onClick, style }) => {
  return (
    <div className="badge" style={style} onClick={onClick}>
      {onClick && (
        <IconButton className="edit-button">
          <Edit/>
        </IconButton>
      )}
      <BadgeOverlay rarity={badge.rarity} thickness={3}/>
      <div className="outer-ring">
        <div className="inner-ring"/>
        <img 
          alt="badge"
          src={badge.url} 
          className="badge-img"
          style={{ 
            width: zoom ? `${zoom}%` : "100%",
            height: zoom ? `${zoom}%` : "100%",
          }}
        />
      </div>
    </div>
  )
}

export default Badge
