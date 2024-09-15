import React, { useEffect, useRef, useState } from "react"
import './_driverGroupCard.scss'
import Icon from "../../utility/icon/Icon"
import { driverGroupType, driverType } from "../../../shared/types"
import IconCounter from "../../utility/icon/iconCounter/IconCounter"

interface driverGroupCardType {
  group: driverGroupType
  onClick: () => void
}

const DriverGroupCard: React.FC<driverGroupCardType> = ({ group, onClick }) => {
  const [ lastIcon, setLastIcon ] = useState<number>(10) // Last Icon to be rendered before IconCounter.
  const groupDriversRef = useRef<HTMLDivElement>(null) // Ref of the Icon list container.

  useEffect(() => {
    const dListWidth = groupDriversRef.current?.getBoundingClientRect().width

    if (dListWidth) {
      setLastIcon(Math.floor(dListWidth / 37) - 1) // -1 for 0 based indexing
    }
  }, [])

  return (
    <div className="driver-group-card" onClick={onClick}>
      <Icon src={group.url} style={{ height: 80, width: 80 }}/>
      <div className="driver-group-content">
        <p>{group.name}</p>
        <div ref={groupDriversRef} className="driver-group-drivers">
          {group.drivers.map((driver: driverType, i: number) => {
            if (i < lastIcon ) {
              return <Icon key={i} src={driver.url}/>
            } else if (i === lastIcon) {
              return <IconCounter key={i} counter={group.drivers.length - lastIcon}/>
            } else {
              return null
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default DriverGroupCard
