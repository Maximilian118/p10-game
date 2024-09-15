import React from "react"
import './_iconCounter.scss'

interface iconCounterType {
  counter: number
}

const IconCounter: React.FC<iconCounterType> = ({ counter }) => {
  return (
    <div className="icon-counter">
      <p>{`+${counter}`}</p>
    </div>
  )
}

export default IconCounter
