import React, { useState } from "react"
import NavItem from './navItem/NavItem'

interface navType {
  index: number,
  itemWidth: number,
  leftPosition: number,
}

const Nav: React.FC = () => {
  const [value, setValue] = useState<navType>({
    index: 0,
    itemWidth: 0,
    leftPosition: 0,
  })

  const navItems = [
    {
      text: "Home",
      url: "/home",
    },
    {
      text: "Championships",
      url: "/championships",
    },
  ]

  return (
    <nav>
      {navItems.map((item, i) => (<NavItem key={i} setValue={setValue} item={{...item, index: i}}/>))}
      <span className="nav-item-indicator" style={{ width: value.itemWidth, left: value.leftPosition }}/>
    </nav>
  )
}

export default Nav