import React, { useState } from 'react'
import { useUserContext } from '../context/user-context'
export function UserOnboarding({ setUserDetails }) {
  const { userDetails, userDispatch } = useUserContext()
  const [next, setNext] = useState(null)

  const nameHandler = e => {
    userDispatch({ type: 'STORE_NAME' })
    setNext(true)
  }

  const cityHandler = e => {
    userDispatch({ type: 'STORE_CITY' })
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
              onChange={e =>
                userDispatch({ type: 'SET_CITY', payload: e.target.value })
              }
              type="text"
              value={userDetails.city}
              className="border-b-2 focus:outline-none text-2xl bg-transparent w-64 mt-4 text-center md:w-2/6 md:p-4 md:text-4xl"
            />
          </div>
          <button
            onClick={e => cityHandler(e)}
            disabled={userDetails.city ? false : true}
            className="bg-slate-50 text-black w-32 h-9 rounded-full border-2 mt-8 md:w-48">
            Continue
          </button>
        </div>
      ) : (
        <div>
          <div>
            <input
              type="text"
              value={userDetails.name}
              onChange={e =>
                userDispatch({ type: 'SET_NAME', payload: e.target.value })
              }
              className="border-b-2 focus:outline-none text-2xl bg-transparent w-64 mt-4 text-center md:w-2/6 md:p-4 md:text-4xl"
            />
          </div>
          <button
            onClick={e => nameHandler(e)}
            disabled={userDetails.name ? false : true}
            className="bg-slate-50 text-black w-32 h-9 rounded-full border-2 mt-8 md:w-48">
            Next
          </button>
        </div>
      )}
    </div>
  )
}
