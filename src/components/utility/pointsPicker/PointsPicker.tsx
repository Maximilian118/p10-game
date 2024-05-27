import React from "react"
import './_pointsPicker.scss'
import { createChampFormErrType, createChampFormType } from "../../../page/CreateChamp"
import { Slider } from "@mui/material"
import { graphQLErrorType } from "../../../shared/requests/requestsUtility"

interface pointsPickerType {
  form: createChampFormType
  setForm: React.Dispatch<React.SetStateAction<createChampFormType>>
  formErr: createChampFormErrType
  backendErr: graphQLErrorType
}

const PointsPicker: React.FC<pointsPickerType> = ({ form, setForm, formErr, backendErr }) => {
  const valueLabelFormat = (value: number): string => {
    switch (value) {
      case 0: return "Tight Arse"
      case 1: return "Normal"
      case 2: return "Abundant"
      case 3: return "Custom"
      default: return "Normal"
    }
  }

  return (
    <div className="points-picker">
      <Slider
        aria-label="Preset"
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        marks
        defaultValue={1}
        min={0}
        max={3}
        color={formErr.pointsStructure || backendErr.type === "pointsStructure" ? "error" : "primary" }
      />
    </div>
  )
}

export default PointsPicker
