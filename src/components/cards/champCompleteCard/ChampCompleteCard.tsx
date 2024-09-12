import React from "react"
import './_champCompleteCard.scss'

interface chamoCompleteCardType{
  stepperBtns?: JSX.Element
  style?: React.CSSProperties
}

const ChampCompleteCard: React.FC<chamoCompleteCardType> = ({ stepperBtns, style }) => {
  return (
    <div className="champ-complete-card" style={style}>
      <div className="champ-complete-text-container">
        <h4>Finish</h4>
        <p>As the adjudicator of this championship you can always 
        edit the details of this championship after creation.</p>
      </div>
      {stepperBtns}
    </div>
  )
}

export default ChampCompleteCard
