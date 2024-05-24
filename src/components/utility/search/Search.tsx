import React from "react"
import "./_search.scss"
import { TextField } from "@mui/material";

interface searchType<T> {
  original: T[],
  search: T[],
  setSearch: React.Dispatch<React.SetStateAction<T[]>>,
}

interface searchCriteriaType {
  name: string
}

const Search = <T extends searchCriteriaType>({ original, search, setSearch }: searchType<T>) => {
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      const filtered = search.filter((item) => item.name.includes(e.target.value))   
      setSearch(prevArr => filtered)
    } else {
      setSearch(prevArr => original)
    }
  }

  return (
    <TextField
      onInput={(e: React.ChangeEvent<HTMLInputElement>) => { searchHandler(e) }}
      className="search"
      label="Search"
      variant="filled"
      size="small"
    />
  )
}

export default Search
