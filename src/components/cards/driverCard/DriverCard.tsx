import React from "react"
import './_driverCard.scss';
import { driverType } from "../../../shared/types";
import Icon from "../../utility/icon/Icon";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

interface driverCardType {
  driver: driverType
  onClick?: (driver: driverType) => void
  canEdit?: boolean
}

const DriverCard: React.FC<driverCardType> = ({ driver, onClick, canEdit }) => (
  <div className="driver-card" onClick={() => onClick && onClick(driver)}>
    <Icon src={driver.url} style={{ marginRight: 16 }}/>
    <p>{driver.name}</p>
    {canEdit && (
      <IconButton className="edit-button">
        <Edit/>
      </IconButton>
    )}
  </div>
)

export default DriverCard
