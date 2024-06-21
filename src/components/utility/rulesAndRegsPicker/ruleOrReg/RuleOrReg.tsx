import React from "react"
import './_ruleOrReg.scss'
import { ruleOrRegType } from "../../../../shared/types"
import { Button, IconButton } from "@mui/material"
import { Edit } from "@mui/icons-material"
import { editStateType } from "../RulesAndRegsPicker"

interface rOrrType {
  index: number
  item: ruleOrRegType
  setEdit: React.Dispatch<React.SetStateAction<editStateType>>
  global?: boolean
  def?: boolean
}

const RuleOrReg: React.FC<rOrrType> = ({ index, item, setEdit, global, def }) => {
  const toolbarContent = (global?: boolean): JSX.Element => {
    if (global) {
      return (
        <Button className="text-button global">
          <p>Global</p>
        </Button>
      )
    }

    return ( 
      <>
        {def && 
        <Button className="text-button default">
          <p>Default</p>
        </Button>}
        <IconButton className="button edit" onClick={e => setEdit(prevEdit => {
          return {
            ...prevEdit,
            index,
            ruleReg: item,
          }
        })}>
          <Edit/>
        </IconButton>
      </>
    )
  }

  return (
    <div className="rule-or-reg">
      <div className="main">
        <div className="title">
          <h4>{`${index}.`}</h4>
        </div>
        <p>{item.text}</p>
      </div>
      {item.subsections && item.subsections.map((r: ruleOrRegType, i: number) => {
        return (
          <div key={i} className="subsection">
            <div className="title" >
              <p>{`${index}.${i + 1}`}</p>
            </div>
            <p>{r.text}</p>
          </div>
        )
      })}
      <div className="toolbar">
        {toolbarContent(global)}
      </div>
    </div>
  )
}

export default RuleOrReg
