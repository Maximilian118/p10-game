import React from "react"
import './_champHeaderCard.scss'
import MUIStepper from "../../utility/muiStepper/MUIStepper"
import { muiStepperSteps } from "../../utility/muiStepper/muiStepperUtility"
import { useNavigate } from "react-router-dom"

interface champHeaderCardType {
  activeStep: number
}

const ChampHeaderCard: React.FC<champHeaderCardType> = ({ activeStep }) => {
  const navigate = useNavigate()
  
  return (
    <div className="champ-header-card">
      <div className="form-title">
        <h2 style={{ marginBottom: 10 }}>Create Championship</h2>
        <h2 className="clickable" onClick={() => navigate(-1)}>Back</h2>
      </div>
      <MUIStepper steps={muiStepperSteps.createChamp} activeStep={activeStep} style={{ width: "85%" }}/>
    </div>
  )
}

export default ChampHeaderCard
