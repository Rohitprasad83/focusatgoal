import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function Weather() {
  const [temperature, setTemperature] = useState(0)
  const [response, setResponse] = useState(null)

  const apiKey = '79c0baacc3b6f750ac3ddfc13986a423'
  const city = 'kolkata'
  useEffect(() => {
    ;(async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      const response = await axios.get(url)
      setTemperature(Number(response.data.main.temp) - 273)
      setResponse(response)
    })()
  }, [])

  return (
    <div className="flex-col items-center absolute text-2xl top-5 right-5 drop-shadow-2xl">
      <div className="flex">
        {response && (
          <img
            src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
            alt=""
            className="mx-0 w-16 white"
          />
        )}
        <span className="my-auto">{temperature.toFixed(1)}° C</span>
      </div>

      <div className="absolute right-2">{city}</div>
    </div>
  )
}
