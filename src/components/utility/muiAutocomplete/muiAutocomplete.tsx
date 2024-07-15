import { Autocomplete, TextField } from "@mui/material"
import React, { SyntheticEvent } from "react"
import './_muiAutocomplete.scss'

interface muiAutocompleteType {
  label: string
  options: string[]
  value: string | null
  setValue: React.Dispatch<React.SetStateAction<string | null>>
  error: boolean
  onChange: () => void
  variant?: "standard" | "filled"
  className?: string
  style?: {}
}

const MUIAutocomplete: React.FC<muiAutocompleteType> = ({ label, options, value, setValue, error, onChange, variant, className, style }) => (
  <Autocomplete
    id="combo-box-demo"
    className={`mui-autocomplete ${className}`}
    style={style}
    value={value}
    onChange={(e: SyntheticEvent<Element, Event>, value: string | null) => {
      setValue(value)
      onChange()
    }}
    options={options as readonly string[]}
    renderInput={(params) => <TextField {...params} variant={variant ? variant : "filled"} label={label} error={error}/>}
  />
)

export default MUIAutocomplete
