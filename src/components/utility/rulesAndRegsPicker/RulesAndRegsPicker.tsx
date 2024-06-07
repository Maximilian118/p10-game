import React from "react"
import './_rulesAndRegsPicker.scss'
import { rulesAndRegsType } from "../../../shared/types"
import RuleOrReg from "./ruleOrReg/RuleOrReg"

interface rulesAndRegsPickerType {
  rulesAndRegs: rulesAndRegsType
}

const RulesAndRegsPicker: React.FC<rulesAndRegsPickerType> = ({ rulesAndRegs }) => {
  return (
    <div className="rules-and-regs-picker">
      {rulesAndRegs.list.map((item, i) => 
        <RuleOrReg 
          key={i} 
          index={i + 1}
          item={item}
        />)}
    </div>
  )
}

export default RulesAndRegsPicker
