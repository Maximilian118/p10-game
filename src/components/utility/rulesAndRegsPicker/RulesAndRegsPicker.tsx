import React, { useState } from "react"
import './_rulesAndRegsPicker.scss'
import RuleOrReg from "./ruleOrReg/RuleOrReg"
import { globalRulesAndRegs, isDefaultRorR } from "../../../shared/rulesAndRegs"
import { userType } from "../../../shared/localStorage"
import { ruleOrRegType, rulesAndRegsType } from "../../../shared/types"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"
import RulesAndRegsEdit from "./rulesAndRegsEdit/RulesAndRegsEdit"

interface rulesAndRegsPickerType<T> {
  user: userType
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
}

export interface editStateType {
  newRuleReg: boolean
  index: number | null
  ruleReg: ruleOrRegType | null
}

export const initEditState = {
  newRuleReg: false,
  index: null,
  ruleReg: null,
}

const RulesAndRegsPicker = <T extends { rulesAndRegs: rulesAndRegsType }>({ user, form, setForm }: rulesAndRegsPickerType<T>) => {
  const [ global, setGlobal ] = useState<boolean>(false)
  const [ edit, setEdit ] = useState<editStateType>(initEditState)

  const isEdit = edit.newRuleReg || edit.ruleReg

  return isEdit ? 
    <RulesAndRegsEdit<T>
      user={user}
      edit={edit} 
      setEdit={setEdit}
      setForm={setForm} 
    /> : (
    <div className="rules-and-regs-picker">
      <div className="rules-and-regs-list">
        {global && globalRulesAndRegs(user).map((item: ruleOrRegType, i: number) => 
          <RuleOrReg
            key={i} 
            index={i + 1}
            item={item}
            setEdit={setEdit}
            global={global}
          />)}
        {form.rulesAndRegs.list.map((item: ruleOrRegType, i: number) => 
          <RuleOrReg
            key={i} 
            index={i + 1}
            item={item}
            setEdit={setEdit}
            def={isDefaultRorR(user, item)}
          />
        )}
      </div>
      <IconButton 
        className="add-button" 
        onClick={e => setEdit(prevEdit => {
          return {
            ...prevEdit,
            newRuleReg: true,
          }
        })}
      >
        <Add/>
      </IconButton>
    </div>
  )
}

export default RulesAndRegsPicker
