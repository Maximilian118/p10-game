import React, { useState } from "react"
import './_rulesAndRegsPicker.scss'
import { rulesAndRegsType } from "../../../shared/types"
import RuleOrReg from "./ruleOrReg/RuleOrReg"
import { globalRulesAndRegs, isDefaultRorR } from "../../../shared/rulesAndRegs"
import { userType } from "../../../shared/localStorage"

interface rulesAndRegsPickerType {
  user: userType
  rulesAndRegs: rulesAndRegsType
}

const RulesAndRegsPicker: React.FC<rulesAndRegsPickerType> = ({ user, rulesAndRegs }) => {
  const [ global, setGlobal ] = useState<boolean>(false)

  return (
    <div className="rules-and-regs-picker">
      {global && globalRulesAndRegs(user).map((item, i) => 
        <RuleOrReg 
          key={i} 
          index={i + 1}
          item={item}
          global={global}
        />)}
      {rulesAndRegs.list.map((item, i) => 
        <RuleOrReg 
          key={i} 
          index={i + 1}
          item={item}
          def={isDefaultRorR(user, item)}
        />)}
    </div>
  )
}

export default RulesAndRegsPicker
