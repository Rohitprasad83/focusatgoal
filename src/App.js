import { useState, useEffect } from 'react'
import wallpapers from './db/images'
import { UserOnboarding, Homepage } from './pages/'
import './App.css'

function App() {
  const [wallpaper, setWallpaper] = useState(wallpapers[0])
  const [userDetails, setUserDetails] = useState(null)
  const name = localStorage.getItem('name')
  const city = localStorage.getItem('city')

  useEffect(() => {
    setWallpaper(wallpapers[Math.floor(Math.random() * 23)])
    if (name && city) {
      setUserDetails(true)
    }
  }, [])
  return (
    <div
      className="App font-mono text-slate-100"
      style={{
        backgroundImage: `url("${wallpaper}")`,
        backgroundSize: 'cover',
      }}>
      {' '}
      {userDetails ? (
        <Homepage name={name} city={city} />
      ) : (
        <UserOnboarding setUserDetails={setUserDetails} />
      )}{' '}
    </div>
  )
}

export default App
