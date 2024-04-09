import React from "react"
import { Route, Routes } from "react-router-dom"
import { userType } from './shared/localStorage'

import Notfound from "./page/NotFound"
import Home from './page/Home'
import Splash from './page/Splash'
import Login from './page/Login'

interface routerType {
  user: userType,
}

const Router: React.FC<routerType> = ({ user }) => user.token ? (
  <Routes>
    <Route path="*" Component={Notfound}/>
    <Route path="/" Component={Home}/>
  </Routes>
) : (
  <Routes>
    <Route path="*" Component={Notfound}/>
    <Route path="/" Component={Splash}/>
    <Route path="/login" Component={Login}/>
  </Routes>
)

export default Router