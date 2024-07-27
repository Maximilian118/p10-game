import React from "react"
import './_driverCard.scss';
import { driverType } from "../../../shared/types";

interface driverCardType {
  driver: driverType
  onClick?: () => void
}

const DriverCard: React.FC<driverCardType> = ({ driver, onClick }) => {
  return (
    <div className="driver-card" onClick={onClick}>
      
    </div>
  )
}

export default DriverCard
