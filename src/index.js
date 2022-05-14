import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { UserProvider } from './context/user-context'
// import { ClockProvider } from './context/use-clock'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <UserProvider>
      {/* <ClockProvider> */}
      <App />
      {/* </ClockProvider> */}
    </UserProvider>
  </React.StrictMode>
)

reportWebVitals()
