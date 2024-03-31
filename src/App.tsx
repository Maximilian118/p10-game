import React, {useState} from 'react'
import './scss/base.scss'
import { userType, checkUserLS } from './shared/localStorage'
import Footer from './components/footer/Footer'
import Nav from './components/nav/Nav'

const Context = React.createContext({})

const App: React.FC = () => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ user, setUser ] = useState<userType>(checkUserLS())

  return (
    <Context.Provider value={{ loading, setLoading, user, setUser }}>
      <main>
        <Nav/>
      </main>
      <Footer/>
    </Context.Provider>
  )
}

export default App
export {Context}
