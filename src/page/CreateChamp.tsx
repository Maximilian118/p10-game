import React, { useContext, useState } from "react"
import DropZone from "../components/utility/dropZone/DropZone"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import { Button, CircularProgress, Pagination } from "@mui/material"
import { inputLabel, updateForm } from "../shared/formValidation"
import { NavigateFunction, useNavigate } from "react-router-dom"
import FormElContainer from "../components/utility/formElContainer/FormElContainer"
import PointsPicker from "../components/utility/pointsPicker/PointsPicker"
import { presetArrays } from "../components/utility/pointsPicker/ppPresets"
import { badgeType, driverGroupType, pointsStructureType, rulesAndRegsType } from "../shared/types"
import { defaultRulesAndRegs } from "../shared/rulesAndRegs"
import AppContext from "../context"
import RulesAndRegsPicker from "../components/utility/rulesAndRegsPicker/RulesAndRegsPicker"
import BadgePicker from "../components/utility/badgePicker/BadgePicker"
import DriverGroupPicker from "../components/utility/driverGroupPicker/DriverGroupPicker"
import MUITextField from "../components/utility/muiTextField/MUITextField"

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

  const paginationHandler = (e: React.ChangeEvent<unknown>, value: number) => {
    setForm(prevForm => {
      return {
        ...prevForm,
        rounds: value
      }
    })
  }

  return (
    <div className="content-container" style={{ background: "white" }}>
      <div className="form-container">
       <img 
          src="https://p10-game.s3.eu-west-2.amazonaws.com/assets/f1-engine1.jpeg" 
          alt="An old Formula 1 car." 
          className="form-background" 
          style={{ width: "250%", top: 86, left: "-35%" }}
        />
        <div className="form-title" style={{ marginBottom: 20 }}>
          <h2 style={{ marginBottom: 10 }}>Create Championship</h2>
          <h2 className="clickable" onClick={() => navigate(-1)}>Back</h2>
        </div>
        <form onSubmit={e => onSubmitHandler(e, navigate)}>
          <DropZone<createChampFormType, createChampFormErrType> 
            form={form}
            setForm={setForm} 
            formErr={formErr}
            setFormErr={setFormErr} 
            backendErr={backendErr}
            setBackendErr={setBackendErr}
            purposeText="Championship Icon"
          />
          <MUITextField
            inputProps={{ maxLength: 30 }}
            className="mui-form-el"
            name="champName"
            label={inputLabel("champName", formErr, backendErr)}
            value={form.champName}
            onBlur={e => updateForm<createChampFormType, createChampFormErrType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
            error={formErr.champName || backendErr.type === "champName" ? true : false}
          />
          <FormElContainer
            name="rounds"
            content={
              <Pagination 
                count={30}
                page={form.rounds as number}
                className="mui-form-pagination"
                color="primary"
                onChange={paginationHandler}
              />
            }
            formErr={formErr}
            backendErr={backendErr}
          />
          <FormElContainer
            name="pointsStructure"
            content={
              <PointsPicker
                setForm={setForm}
                formErr={formErr}
                backendErr={backendErr}
              />
            }
            formErr={formErr}
            backendErr={backendErr}
          />
          <FormElContainer
            name="driverGroups"
            content={
              <DriverGroupPicker
                form={form}
                setForm={setForm}
                user={user}
                setUser={setUser}
                setBackendErr={setBackendErr}
              />
            }
            formErr={formErr}
            backendErr={backendErr}
          />
          <FormElContainer
            name="rulesAndRegs"
            content={
              <RulesAndRegsPicker<createChampFormType>
                user={user}
                form={form}
                setForm={setForm}
              />
            }
            formErr={formErr}
            backendErr={backendErr}
          />
          <FormElContainer
            name="champBadges"
            content={
              <BadgePicker<createChampFormType>
                form={form}
                setForm={setForm}
                user={user}
                setUser={setUser}
                setBackendErr={setBackendErr}
              />
            }
            formErr={formErr}
            backendErr={backendErr}
          />
          <Button 
            variant="contained" 
            type="submit"
            style={{ margin: "20px 0" }}
            startIcon={loading && <CircularProgress size={20} color={"inherit"}/>}
          >Create Championship</Button>
        </form>
      </div>
    </div>
  )
}

export default CreateChamp
