import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function Weather() {
  const [temperature, setTemperature] = useState(0)
  const apiKey = '79c0baacc3b6f750ac3ddfc13986a423'
  const city = localStorage.getItem('city')

  useEffect(() => {
    ;(async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      const response = await axios.get(url)
      setTemperature(Number(response.data.main.temp) - 273)
    })()
  }, [])

  return (
    <div className="flex-col items-center absolute text-2xl top-5 right-5 drop-shadow-2xl">
      <div className="flex">
        <span className="my-auto">{temperature.toFixed(1)}° C</span>
      </div>

      <div className="absolute right-2">{city}</div>
    </div>
  )
}
