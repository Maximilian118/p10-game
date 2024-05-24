import React from "react"
import './_champUtilityCard.scss'
import Search from "../../utility/search/Search"
import { champType } from '../../../shared/types'
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"

interface champUtilityCardType {
  champs: champType[],
  search: champType[],
  setSearch: React.Dispatch<React.SetStateAction<champType[]>>,
}

const ChampUtilityCard = ({ champs, search, setSearch }: champUtilityCardType) => {
  return (
    <div className="champ-utility-card">
      <Search<champType>
        original={champs}
        search={search} 
        setSearch={setSearch}
      />
      <IconButton
        className="add-button"
      >
        <Add/>
      </IconButton>
    </div>
  )
}

export default ChampUtilityCard
