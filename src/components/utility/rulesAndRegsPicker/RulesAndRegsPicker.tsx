import React, { useState } from "react"
import './_rulesAndRegsPicker.scss'
import RuleOrReg from "./ruleOrReg/RuleOrReg"
import { globalRulesAndRegs, isDefaultRorR } from "../../../shared/rulesAndRegs"
import { userType } from "../../../shared/localStorage"
import { rulesAndRegsType } from "../../../shared/types"

interface rulesAndRegsPickerType<T> {
  user: userType
  form: T
  setForm: React.Dispatch<React.SetStateAction<T>>
}

const RulesAndRegsPicker = <T extends { rulesAndRegs: rulesAndRegsType }>({ user, form, setForm }: rulesAndRegsPickerType<T>) => {
  const [ global, setGlobal ] = useState<boolean>(false)

  return (
    <div className="rules-and-regs-picker">
      {global && globalRulesAndRegs(user).map((item, i) => 
        <RuleOrReg<T>
          key={i} 
          index={i + 1}
          item={item}
          setForm={setForm}
          global={global}
        />)}
      {form.rulesAndRegs.list.map((item, i) => 
        <RuleOrReg<T>
          key={i} 
          index={i + 1}
          item={item}
          setForm={setForm}
          def={isDefaultRorR(user, item)}
        />)}
    </div>
  )
}

export default RulesAndRegsPicker
