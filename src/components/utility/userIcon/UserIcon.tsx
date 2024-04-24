import React from "react"
import { userType } from "../../../shared/localStorage"
import { getInitials } from "../../../shared/utility"
import './_userIcon.scss'
import { useNavigate } from "react-router-dom"

interface userIconType {
  user: userType,
}

const UserIcon: React.FC<userIconType> = ({ user }) => {
  const iconContent = (user: userType) => {
    if (user.icon) {
      return <img alt="Icon" src={user.icon}></img>
    } else {
      return <p>{getInitials(user.name)}</p>
    }
  }

  const navigate = useNavigate()

  return (
    <div className="user-icon" onClick={() => navigate("/profile")}>
      {iconContent(user)}
    </div>
  )
}

export default UserIcon
