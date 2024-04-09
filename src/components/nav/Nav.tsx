import React from "react"
import NavItem from './navItem/NavItem'
import UserIcon from "../utility/userIcon/UserIcon"
import { userType } from "../../shared/localStorage"
import { useLocation } from "react-router-dom"
import { navLeft, navRight } from './NavUtility'

interface navType {
  user: userType,
}

const Nav: React.FC<navType> = ({ user }) => {
  const location = useLocation()

  const navRightHandler = (user: userType): JSX.Element => {
    if (user.token) {
      return <UserIcon user={user}/>
    } else {
      return (
        <NavItem 
          item={location.pathname === "/login" ? navRight[1] : navRight[0]}
          style={{ paddingRight: 40 }}
        />
      )
    }
  }

  return (
    <nav>
      <div className="nav-left">
        {navLeft.map((item, i) => (<NavItem key={i} item={item}/>))}
      </div>
      {navRightHandler(user)}
    </nav>
  )
}

export default Nav