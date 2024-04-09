import React from "react"
import NavItem from './navItem/NavItem'
import UserIcon from "../utility/userIcon/UserIcon"
import { userType } from "../../shared/localStorage"

interface navType {
  user: userType,
}

const Nav: React.FC<navType> = ({ user }) => {
  const navItems = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Championships",
      url: "/championships",
    },
  ]

  return (
    <nav>
      <div className="nav-left">
        {navItems.map((item, i) => (<NavItem key={i} item={item}/>))}
      </div>
      {!user.token ? <UserIcon user={user}/> : <NavItem item={{
        text: "Login",
        url: "/login",
      }}/>}
    </nav>
  )
}

export default Nav