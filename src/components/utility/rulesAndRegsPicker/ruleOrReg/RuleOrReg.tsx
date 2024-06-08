import React from "react"
import './_ruleOrReg.scss'
import { ruleOrRegType, rulesAndRegsType } from "../../../../shared/types"
import { Button, IconButton } from "@mui/material"
import { Clear, Edit } from "@mui/icons-material"

interface rOrrType<T> {
  index: number
  item: ruleOrRegType
  setForm: React.Dispatch<React.SetStateAction<T>>
  global?: boolean
  def?: boolean
}

const RuleOrReg = <T extends { rulesAndRegs: rulesAndRegsType }>({ index, item, setForm, global, def }: rOrrType<T>) => {
  const toolbarContent = (global?: boolean): JSX.Element => {
    if (global) {
      return (
        <Button className="text-button global">
          <p>Global</p>
        </Button>
      )
    }

    const deleteRRHandler = (i: number) => {
      setForm(prevForm => {
        return {
          ...prevForm,
          rulesAndRegs: {
            ...prevForm.rulesAndRegs,
            list: prevForm.rulesAndRegs.list.filter((item, index) => index !== i - 1)
          }
        }
      })
    }

    return ( 
      <>
        {def && 
        <Button className="text-button default">
          <p>Default</p>
        </Button>}
        <IconButton className="button edit">
          <Edit/>
        </IconButton>
        <IconButton className="button delete" onClick={e => deleteRRHandler(index)}>
          <Clear/>
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
