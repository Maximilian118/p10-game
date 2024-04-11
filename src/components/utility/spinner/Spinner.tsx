import React from "react"
import img from "./assets/pirelli-tyre-soft.png"
import './_spinner.scss'

const Spinner: React.FC<{ size?: number | `${string}px` | `${string}%` }> = ({ size }) => (
  <div className="content-container">
    <img 
      className="spinner"
      style={{ width: size, height: size }} 
      alt="Loading..." 
      src={img}
    />
  </div>
)

export default Spinner
