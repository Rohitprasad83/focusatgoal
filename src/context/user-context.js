import { createContext, useContext, useReducer } from 'react'
import { userReducer } from '../reducer/userReducer'

const userContext = createContext()
const useUserContext = () => useContext(userContext)

const UserProvider = ({ children }) => {
  const [userDetails, userDispatch] = useReducer(userReducer, {
    name: '',
    city: '',
  })

  return (
    <userContext.Provider value={{ userDetails, userDispatch }}>
      {children}
    </userContext.Provider>
  )
}

export { UserProvider, useUserContext }
