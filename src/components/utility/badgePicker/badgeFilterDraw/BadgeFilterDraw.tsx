import React, { useState } from "react"
import './_badgeFilterDraw.scss'
import { Button } from "@mui/material"
import { badgeType } from "../../../../shared/types"

interface badgeFilterDrawType<T> {
  draw: boolean
  setDraw: React.Dispatch<React.SetStateAction<boolean>>
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
  defaults: badgeType[]
}

const BadgeFilterDraw = <T extends { champBadges: badgeType[] }>({ draw, setDraw, form, setForm, defaults }: badgeFilterDrawType<T>) => {
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
