import React from "react"
import { userType } from "../../../shared/localStorage"
import { getInitials } from "../../../shared/utility"
import './_userIcon.scss'

interface userIconType {
  user: userType,
}

const UserIcon: React.FC<userIconType> = ({ user }) => {
  return (
    <div className="user-icon">
      <p>{getInitials(user.name)}</p>
    </div>
  )
}

export default UserIcon
