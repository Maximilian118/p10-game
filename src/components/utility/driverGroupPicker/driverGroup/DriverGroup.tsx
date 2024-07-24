import React from "react"
import './_driverGroup.scss'

interface driverGroupType {
  onClick: () => void
}

const DriverGroup: React.FC<driverGroupType> = ({ onClick }) => {
  return (
    <div className="driver-group" onClick={onClick}>
      
    </div>
  )
}

export default DriverGroup
