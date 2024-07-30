import { Autocomplete, CircularProgress, Paper, TextField } from "@mui/material"
import React, { SyntheticEvent } from "react"
import './_muiAutocomplete.scss'
import { Add } from "@mui/icons-material"

interface muiAutocompleteType {
  label: string
  options: string[] // Array items to choose from.
  value: string | null // The current value selected.
  setValue: React.Dispatch<React.SetStateAction<string | null>> // setState function to mutate value.
  error: boolean
  onChange: () => void // Can be used for any change. My use case is for removing error for error prop on value change.
  loading?: boolean // Enables async behaviour with spinner if loading = true.
  variant?: "standard" | "filled" // Style of Textarea.
  className?: string
  customNewLabel?: string // Change the name of the label for createNew.
  displayNew?: "always" | "noOptions" | "never" // Choose the behaviour of adding a list item that can navigate to creating a new item to be listed.
  onNewMouseDown?: React.MouseEventHandler<HTMLDivElement> // When user clicks on createNew, do something.
  style?: {}
}

// Return JSX for the onClick element to create a new of whatever is being listed.
const createNew = (label: string, onNewMouseDown?: React.MouseEventHandler<HTMLDivElement>, customNewLabel?: string) => (
  <div
    className="mui-autocomplete-no-options"
    onMouseDown={onNewMouseDown}
  >
    <Add/>
    <p>{`New ${customNewLabel ? customNewLabel : label}`}</p>
  </div>
)

// Detemine wheather to display createNew.
const displayCreateNew = (
  label: string, 
  hasOptions: boolean,
  onNewMouseDown?: React.MouseEventHandler<HTMLDivElement>,
  customNewLabel?: string, 
  displayNew?: string,
): JSX.Element | null => {
  if (!displayNew || displayNew === "never") {
    return null
  }

  if (displayNew === "always" || !hasOptions) {
    return createNew(label, onNewMouseDown, customNewLabel)
  }

  return null
}

const MUIAutocomplete: React.FC<muiAutocompleteType> = ({ 
  label, 
  options, 
  value, 
  setValue, 
  error, 
  onChange, 
  loading, 
  variant, 
  className, 
  customNewLabel, 
  displayNew,
  onNewMouseDown,
  style 
}) => (
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
    loading={loading}
    PaperComponent={({ children }) => {
      let hasOptions = true

      if (React.isValidElement(children)) {
        const { className } = children.props
        hasOptions = className !== "MuiAutocomplete-noOptions"
      }

      return (
        <Paper>
          {hasOptions && children}
          {displayCreateNew(label, hasOptions, onNewMouseDown, customNewLabel, displayNew)}
        </Paper>  
      )
    }}
    renderInput={(params) => (
      <TextField 
        {...params} 
        variant={variant ? variant : "filled"} 
        label={label} 
        error={error}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? (
                <div className="spinner">
                  <CircularProgress color="inherit" size={20} />
                </div>
              ) : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />
    )}
  />
)

export default MUIAutocomplete
