import React from "react"
import "./_navItem.scss"
import { useLocation, useNavigate } from "react-router-dom"

interface navItemProps {
  item: {
    text: string,
    url: string,
    i: number,
  },
}

const NavItem: React.FC<navItemProps> = ({ item }) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div 
      className="nav-item" 
      style={{ color: location.pathname === item.url ? "black" : ""}} 
      onClick={() => navigate(item.url)}
    >
      <p>{item.text}</p>
    </div>
  )
} 

export default NavItem
