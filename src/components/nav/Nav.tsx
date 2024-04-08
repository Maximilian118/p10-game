import React from "react"
import NavItem from './navItem/NavItem'

const Nav: React.FC = () => {
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
      {navItems.map((item, i) => (<NavItem key={i} item={{...item, i}}/>))}
    </nav>
  )
}

export default Nav