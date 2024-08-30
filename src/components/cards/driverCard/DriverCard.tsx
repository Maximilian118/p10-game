import React from "react"
import './_driverCard.scss';
import { driverType } from "../../../shared/types";
import Icon from "../../utility/icon/Icon";
import { IconButton } from "@mui/material";
import { Edit, Remove } from "@mui/icons-material";

interface driverCardType {
  driver: driverType
  onClick?: (driver: driverType) => void
  canEdit?: boolean
  onRemove?: (driver: driverType) => void
}

const DriverCard: React.FC<driverCardType> = ({ driver, onClick, canEdit, onRemove }) => (
  <div className="driver-card" onClick={() => onClick && onClick(driver)}>
    <Icon src={driver.url} style={{ marginRight: 16 }}/>
    <p>{driver.name}</p>
    <div className="toolbar">
      {canEdit && (
        <IconButton className="button edit">
          <Edit/>
        </IconButton>
      )}
      <IconButton
        className="button remove"
        onClick={(e) => {
          e.stopPropagation()
          onRemove && onRemove(driver)
        }}
      >
        <Remove/>
      </IconButton>
    </div>
  </div>
)

export default DriverCard
