import React, { useContext, useEffect, useState } from "react"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import { Button, CircularProgress } from "@mui/material"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { presetArrays } from "../components/utility/pointsPicker/ppPresets"
import { badgeType, driverGroupType, pointsStructureType, rulesAndRegsType } from "../shared/types"
import { defaultRulesAndRegs } from "../shared/rulesAndRegs"
import AppContext from "../context"
import ChampBasicsCard from "../components/cards/champBasicsCard/ChampBasicsCard"
import { muiStepperSteps } from "../components/utility/muiStepper/muiStepperUtility"
import ChampHeaderCard from "../components/cards/champHeaderCard/ChampHeaderCard"
import DriverGroupPicker from "../components/utility/driverGroupPicker/DriverGroupPicker"
import RulesAndRegsPicker from "../components/utility/rulesAndRegsPicker/RulesAndRegsPicker"
import BadgePicker from "../components/utility/badgePicker/BadgePicker"
import ChampCompleteCard from "../components/cards/champCompleteCard/ChampCompleteCard"

interface createChampFormBaseType {
  champName: string
  rounds: number | string
}

export interface createChampFormType extends createChampFormBaseType {
  driverGroups: driverGroupType[]
  icon: File | null
  profile_picture: File | null
  pointsStructure: pointsStructureType
  rulesAndRegs: rulesAndRegsType
  champBadges: badgeType[]
}

export interface createChampFormErrType extends createChampFormBaseType {
  driverGroups: string
  dropzone: string
  pointsStructure: string
  rulesAndRegs: string
  champBadges: string
  [key: string]: string | number
}

const CreateChamp: React.FC = props => {
  const { user, setUser } = useContext(AppContext)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ activeStep, setActiveStep ] = useState<number>(0)
  const [ stepperBtns, setStepperBtns ] = useState<JSX.Element>(<></>)
  const [ form, setForm ] = useState<createChampFormType>({
    champName: "",
    rounds: 24,
    driverGroups: [],
    icon: null,
    profile_picture: null,
    pointsStructure: presetArrays(1).map(item => {
      return {
        result: item.result,
        points: item.value,
      }
    }),
    rulesAndRegs: {
      default: true,
      list: defaultRulesAndRegs(user),
    },
    champBadges: [],
  })
  const [ formErr, setFormErr ] = useState<createChampFormErrType>({
    driverGroups: "",
    champName: "",
    rounds: "",
    dropzone: "",
    pointsStructure: "",
    rulesAndRegs: "",
    champBadges: "",
  })

  const navigate = useNavigate()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>, navigate: NavigateFunction) => {
    e.preventDefault()
    // create a champ
  }

  const firstStep = activeStep === 0
  const lastStep = muiStepperSteps.createChamp.length === activeStep

  useEffect(() => {
    setStepperBtns(() =>  <div className="button-bar">
      <Button
        variant="contained" 
        color="inherit"
        disabled={firstStep}
        onClick={e => !firstStep && setActiveStep(prevStep => prevStep - 1)}
      >Back</Button>
      <Button 
        variant="contained" 
        type={lastStep ? "submit" : "button"}
        onClick={() => !lastStep && setActiveStep(prevStep => prevStep + 1)}
        startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
      >{lastStep ? "Create Championship" : "Next"}</Button>
    </div>)
  }, [firstStep, lastStep, loading])

  const contentMargin = { marginBottom: 78.5 }

  return (
    <form className="content-container" onSubmit={e => onSubmitHandler(e, navigate)} style={{ height: "100vh" }}>
      <ChampHeaderCard activeStep={activeStep}/>
        {activeStep === 0 && 
        <ChampBasicsCard
          form={form}
          setForm={setForm}
          formErr={formErr}
          setFormErr={setFormErr}
          backendErr={backendErr}
          setBackendErr={setBackendErr}
          stepperBtns={stepperBtns}
          style={contentMargin}
        />
      }
      {activeStep === 1 && 
        <DriverGroupPicker
          form={form}
          setForm={setForm}
          user={user}
          setUser={setUser}
          setBackendErr={setBackendErr}
          stepperBtns={stepperBtns}
          style={contentMargin}
        />
      }
      {activeStep === 2 && 
        <RulesAndRegsPicker
          user={user}
          form={form}
          setForm={setForm}
          stepperBtns={stepperBtns}
          style={contentMargin}
        />
      }
      {activeStep === 3 && 
        <BadgePicker
          form={form}
          setForm={setForm}
          user={user}
          setUser={setUser}
          setBackendErr={setBackendErr}
          stepperBtns={stepperBtns}
          style={contentMargin}
        />
      }
      {activeStep === 4 && 
        <ChampCompleteCard
          stepperBtns={stepperBtns}
        />
      }
    </form>
  )
}

export default CreateChamp
