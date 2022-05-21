import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function Weather() {
  const [temperature, setTemperature] = useState(0)
  const apiKey = process.env.REACT_APP_API_KEY
  const [location, setLocation] = useState('')
  const [lat, setLat] = useState('28.6139')
  const [long, setLong] = useState('77.2090')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
    })
    ;(async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
      const response = await axios.get(url)
      setTemperature(Number(response.data.main.temp) - 273)
      setLocation(response.data.name)
    })()
  }, [lat, long, location])

  return (
    <div className="flex-col items-center absolute text-2xl top-5 right-0">
      <div className="flex flex-col">
        <span className="my-auto items-center">
          {temperature.toFixed(1)}° C
        </span>
      </div>

      <div className="w-36 text-lg">{location}</div>
    </div>
  )
}
