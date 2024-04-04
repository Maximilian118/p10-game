import React from "react"
import { Route, Routes } from "react-router-dom"
import { userType } from './shared/localStorage'

import Notfound from "./page/NotFound"

interface routerType {
  user: userType,
}

const Router: React.FC<routerType> = ({ user }) => user.token ? (
  <Routes>
    <Route path="*" Component={Notfound}/>
  </Routes>
) : (
  <Routes>
    <Route path="*" Component={Notfound}/>
  </Routes>
)

export default Router