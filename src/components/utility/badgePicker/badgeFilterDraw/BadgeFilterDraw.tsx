import React, { useState } from "react"
import './_badgeFilterDraw.scss'
import { Button, Checkbox } from "@mui/material"
import { badgeType } from "../../../../shared/types"
import { badgeRarities, badgeRarityType } from "../../../../shared/badges"

interface badgeFilterDrawType<T> {
  draw: boolean
  setDraw: React.Dispatch<React.SetStateAction<boolean>>
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  defaults: badgeType[]
  filtered: number[]
  setFiltered: React.Dispatch<React.SetStateAction<number[]>>
}

const BadgeFilterDraw = <T extends { champBadges: badgeType[] }>({ draw, setDraw, form, setForm, defaults, filtered, setFiltered }: badgeFilterDrawType<T>) => {
  const [ defs, setDefs ] = useState<boolean>(false)
  
  const removeDefaultsHandler = (champBadges: badgeType[], setForm: React.Dispatch<React.SetStateAction<T>> ) => {
    setForm(prevForm => {
      return {
        ...prevForm,
        champBadges: champBadges.filter((badge: badgeType) => !badge.default)
      }
    })
  }

  const addDefaultsHandler = (defaults: badgeType[], setForm: React.Dispatch<React.SetStateAction<T>> ) => {
    setForm(prevForm => {
      return {
        ...prevForm,
        champBadges: [
          ...prevForm.champBadges,
          ...defaults.filter((badge: badgeType) => !prevForm.champBadges.some(prevBadge => prevBadge._id === badge._id))
        ]
      }
    })
  }

  const filterBadgesHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, rarity: badgeRarityType) => {
    setFiltered((prevFiltered) => {
      const rareIndex = prevFiltered.indexOf(rarity.rarity)
      if (rareIndex !== -1) {
        // Remove the rarity index if it's already in the filtered array
        return prevFiltered.filter((_, index) => index !== rareIndex)
      } else {
        // Add the rarity index if it's not in the filtered array
        return [...prevFiltered, rarity.rarity]
      }
    })
  }

  const onDefaultClickHandler = (
    champBadges: badgeType[],
    defaults: badgeType[], 
    setForm: React.Dispatch<React.SetStateAction<T>>, 
    defs: boolean,
  ): void => {
    if (defs) {
      return addDefaultsHandler(defaults, setForm)
    } else {
      return removeDefaultsHandler(champBadges, setForm)
    }
  }

  return (
    <div className={`badge-filter-draw ${draw ? "badge-draw-open" : ""}`}>
      <div className="badge-filter-options">
        {badgeRarities().map((rarity: badgeRarityType, i: number) => (
          <div key={i} className="checkbox-container">
            <p>{rarity.rarityName}</p>
            <Checkbox
              checked={filtered.includes(rarity.rarity)}
              inputProps={{ 'aria-label': 'Badge filter checkbox' }}
              onClick={e => filterBadgesHandler(e, rarity)}
              sx={{
                '&.Mui-checked': {
                  color: rarity.colour,
                },
              }}
            />
          </div>
        ))}
      </div>
      <div className="badge-filter-buttons">
        <Button
          className="mui-button-back"
          variant="contained" 
          color="inherit"
          size="small"
          onClick={e => setDraw(!draw)}
        >Back</Button>
        <Button
          variant="contained" 
          size="small"
          onClick={e => {
            onDefaultClickHandler(form.champBadges, defaults, setForm, defs)
            setDefs(!defs)
          }}
        >{`${defs ? "Add" : "Remove"} defaults`}</Button>
      </div>
    </div>
  )
}

export default BadgeFilterDraw
