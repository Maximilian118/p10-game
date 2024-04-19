import React from "react"
import { userType } from "../../../shared/localStorage"
import { getInitials } from "../../../shared/utility"
import './_userIcon.scss'

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

  return (
    <div className="user-icon">
      {iconContent(user)}
    </div>
  )
}

export default UserIcon
