import React, { useState } from 'react'
import { Clock } from '../components/Clock'
export function UserOnboarding({ setUserDetails }) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [next, setNext] = useState(null)

  const nameHandler = e => {
    localStorage.setItem('name', name)
    setNext(true)
  }

  const cityHandler = e => {
    localStorage.setItem('city', city)
    setUserDetails(true)
  }
  return (
    <div className="flex-col place-content-center w-screen h-screen pt-32">
      {next ? (
        <h1 className="text-3xl font-bold h-fit mb-8 md:text-6xl">
          Enter your City
        </h1>
      ) : (
        <h1 className="text-3xl font-bold h-fit mb-8 md:text-6xl">
          Hello, what's your name?
        </h1>
      )}
      {next ? (
        <div>
          <div>
            <input
              onChange={e => setCity(e.target.value)}
              type="text"
              value={city}
              className="border-b-2 focus:outline-none text-2xl bg-transparent w-64 mt-4 text-center md:w-2/6 md:p-4 md:text-4xl"
            />
          </div>
          <button
            onClick={e => cityHandler(e)}
            disabled={city ? false : true}
            className="bg-slate-50 text-black w-32 h-9 rounded-full border-2 mt-8 md:w-48">
            Continue
          </button>
        </div>
      ) : (
        <div>
          <div>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border-b-2 focus:outline-none text-2xl bg-transparent w-64 mt-4 text-center md:w-2/6 md:p-4 md:text-4xl"
            />
          </div>
          <button
            onClick={e => nameHandler(e)}
            disabled={name ? false : true}
            className="bg-slate-50 text-black w-32 h-9 rounded-full border-2 mt-8 md:w-48">
            Next
          </button>
        </div>
      )}
    </div>
  )
}
