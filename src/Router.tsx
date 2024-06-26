import React from "react"
import { Route, Routes } from "react-router-dom"
import { userType } from './shared/localStorage'

import Notfound from "./page/NotFound"
import Home from './page/Home'
import Splash from './page/Splash'
import Login from './page/Login'
import Forgot from "./page/Forgot"
import Create from "./page/Create"
import Profile from "./page/Profile"
import Password from "./page/Password"
import PassSuccess from "./page/PassSuccess"
import Championships from "./page/Championships"
import CreateChamp from "./page/CreateChamp"

interface routerType {
  user: userType,
}

const Router: React.FC<routerType> = ({ user }) => user.token ? (
  <Routes>
    <Route path="*" Component={Notfound}/>
    <Route path="/" Component={Home}/>
    <Route path="/profile" Component={Profile}/>
    <Route path="/password" Component={Password}/>
    <Route path="/championships" Component={Championships}/>
    <Route path="/create-championship" Component={CreateChamp}/>
  </Routes>
) : (
  <Routes>
    <Route path="*" Component={Notfound}/>
    <Route path="/" Component={Splash}/>
    <Route path="/login" Component={Login}/>
    <Route path="/forgot" Component={Forgot}/>
    <Route path="/create" Component={Create}/>
    <Route path="/pass-success" Component={PassSuccess}/>
  </Routes>
)

export default Router