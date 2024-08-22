import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { Moment } from "moment"
import React from "react"

interface MUIDatePickerType {
  label: string
  value: Moment | null
  onChange: (newValue: Moment | null) => void
  className?: string
}

const MUIDatePicker: React.FC<MUIDatePickerType> = ({ label, value, onChange, className }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={label}
        className={className}
        slotProps={{ textField: { variant: "filled" } }}
        value={value}
        format="DD/MM/YYYY"
        onChange={onChange}
      />
    </LocalizationProvider>
  )
}

export default MUIDatePicker
