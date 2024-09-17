import React from "react"
import '../_icon.scss'
import './_counterIcon.scss'

interface iconCounterType {
  counter: number
  size?: "small" | "medium" | "large" | "contained"
}

const CounterIcon: React.FC<iconCounterType> = ({ counter, size }) => {
  return (
    <div className={`icon-${size ? size : "medium"} counter-icon`}>
      <p>{`+${counter}`}</p>
    </div>
  )
}

export default CounterIcon
