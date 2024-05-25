import React, { useState } from "react"
import DropZone from "../components/utility/dropZone/DropZone"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import { Button, CircularProgress, Pagination, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../shared/formValidation"
import { NavigateFunction, useNavigate } from "react-router-dom"
import FormElContainer from "../components/utility/formElContainer/FormElContainer"

interface createChampFormBaseType {
  champName: string
  rounds: number | string
}

export interface createChampFormType extends createChampFormBaseType {
  icon: File | null
  profile_picture: File | null
  pointsStructure: {
    result: number
    points: number
  }[]
}

export interface createChampFormErrType extends createChampFormBaseType {
  dropzone: string
  pointsStructure: string
  [key: string]: string | number
}

const CreateChamp: React.FC = props => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ form, setForm ] = useState<createChampFormType>({
    champName: "",
    rounds: 24,
    icon: null,
    profile_picture: null,
    pointsStructure: [],
  })
  const [ formErr, setFormErr ] = useState<createChampFormErrType>({
    champName: "",
    rounds: "",
    dropzone: "",
    pointsStructure: "",
  })

  const navigate = useNavigate()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>, navigate: NavigateFunction) => {
    e.preventDefault()
    console.log(form)
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
            setFormErr={setFormErr} 
            backendErr={backendErr}
            setBackendErr={setBackendErr}
            purposeText="Championship Icon"
          />
          <TextField
            required={!formErr.name && backendErr.type !== "champName"}
            className="mui-form-el"
            name="champName"
            label={inputLabel("champName", formErr, backendErr)}
            variant="filled" 
            onChange={e => updateForm<createChampFormType, createChampFormErrType>(e, form, setForm, setFormErr, backendErr, setBackendErr)}
            value={form.champName}
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
