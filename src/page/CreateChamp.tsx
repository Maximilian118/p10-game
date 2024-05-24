import React, { useState } from "react"
import DropZone from "../components/utility/dropZone/DropZone"
import { graphQLErrorType, initGraphQLError } from "../shared/requests/requestsUtility"
import { Button, CircularProgress, TextField } from "@mui/material"
import { inputLabel, updateForm } from "../shared/formValidation"
import { NavigateFunction, useNavigate } from "react-router-dom"

interface createChampFormBaseType {
  champName: string
}

export interface createChampFormType extends createChampFormBaseType {
  icon: File | null
  profile_picture: File | null
}

export interface createChampFormErrType extends createChampFormBaseType {
  dropzone: string
  [key: string]: string
}

const CreateChamp: React.FC = props => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ backendErr, setBackendErr ] = useState<graphQLErrorType>(initGraphQLError)
  const [ form, setForm ] = useState<createChampFormType>({
    champName: "",
    icon: null,
    profile_picture: null,
  })
  const [ formErr, setFormErr ] = useState<createChampFormErrType>({
    champName: "",
    dropzone: "",
  })

  const navigate = useNavigate()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>, navigate: NavigateFunction) => {
    e.preventDefault()
    // create a champ
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
