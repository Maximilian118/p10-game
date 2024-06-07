import React from "react"
import './_ruleOrReg.scss'
import { ruleOrRegType } from "../../../../shared/types"

interface rOrrType {
  index: number
  item: ruleOrRegType
}

const RuleOrReg: React.FC<rOrrType> = ({ index, item }) => {
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
    </div>
  )
}

export default RuleOrReg
