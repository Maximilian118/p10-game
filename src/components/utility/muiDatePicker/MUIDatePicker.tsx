import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { Moment } from "moment"
import React from "react"

interface MUIDatePickerType {
  value: Moment | null
  onChange: (newValue: Moment | null) => void
}

const MUIDatePicker: React.FC<MUIDatePickerType> = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="DOB"
        slotProps={{ textField: { variant: "filled" } }}
        value={value}
        format="DD/MM/YYYY"
        onChange={onChange}
      />
    </LocalizationProvider>
  )
}

export default MUIDatePicker
