import React from "react"
import "./_authBottonsCard.scss"
import { logout, userType } from "../../../shared/localStorage"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface authButtonsType {
  setUser: React.Dispatch<React.SetStateAction<userType>>
}

const AuthButtons: React.FC<authButtonsType> = ({ setUser }) => {
  const navigate = useNavigate()
  
  return (
    <div className="auth-buttons">
      <Button
        variant="contained" 
        type="submit"
        className="mui-form-btn"
        style={{ margin: 0 }}
        onClick={() => logout(setUser, navigate)}
      >Logout</Button>
    </div>
  )
}

export default AuthButtons
