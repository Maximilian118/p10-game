import React, { useState } from "react"
import './_rulesAndRegsPicker.scss'
import RuleOrReg from "./ruleOrReg/RuleOrReg"
import { globalRulesAndRegs, isDefaultRorR } from "../../../shared/rulesAndRegs"
import { userType } from "../../../shared/localStorage"
import { rulesAndRegsType } from "../../../shared/types"
import { IconButton } from "@mui/material"
import { Add } from "@mui/icons-material"

interface rulesAndRegsPickerType<T> {
  user: userType
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
}

const RulesAndRegsPicker = <T extends { rulesAndRegs: rulesAndRegsType }>({ user, form, setForm }: rulesAndRegsPickerType<T>) => {
  const [ global, setGlobal ] = useState<boolean>(false)

  return (
    <div className="rules-and-regs-picker">
      <div className="rules-and-regs-list">
        {global && globalRulesAndRegs(user).map((item, i) => 
          <RuleOrReg
            key={i} 
            index={i + 1}
            item={item}
            global={global}
          />)}
        {form.rulesAndRegs.list.map((item, i) => 
          <RuleOrReg
            key={i} 
            index={i + 1}
            item={item}
            def={isDefaultRorR(user, item)}
          />)
        }
      </div>
      <IconButton className="add-button">
        <Add/>
      </IconButton>
    </div>
  )
}

export default RulesAndRegsPicker
