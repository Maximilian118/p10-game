import React, { useEffect, useState } from "react"
import { champType } from "../shared/types"
import ChampUtilityCard from "../components/cards/champUtilityCard/ChampUtilityCard"

const Championships: React.FC = props => {
  const [ champs, setChamps ] = useState<champType[]>([])
  const [ search, setSearch ] = useState<champType[]>([])

  useEffect(() => {
    // retrieve all open championships and setChamps.
  }, [])

  return (
    <div className="content-container">
      <ChampUtilityCard
        champs={champs}
        search={search}
        setSearch={setSearch}
      />
    </div>
  )
}

export default Championships
