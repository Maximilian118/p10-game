import React, {useState} from 'react'
import './scss/base.scss'
import { userType, checkUserLS } from './shared/localStorage'
import Footer from './components/footer/Footer'

const Context = React.createContext({})

const App: React.FC = () => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ user, setUser ] = useState<userType>(checkUserLS())

  // If in develop mode, console log every time any state used in context is mutated. 
  process.env.NODE_ENV === 'development' && console.log({user})

  return (
    <Context.Provider value={{ loading, setLoading, user, setUser }}>
      <main>

      </main>
      <Footer/>
    </Context.Provider>
  )
}

export default App
export {Context}
