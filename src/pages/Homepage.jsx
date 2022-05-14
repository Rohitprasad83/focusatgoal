import React, { useState, useEffect } from 'react'
import { Clock, Weather } from '../components/'
import quotes from '../db/quotes'
export function Homepage({ name, city }) {
  const [mainFocus, setMainFocus] = useState(null)
  const [focusCompleted, setFocusCompleted] = useState(false)
  const today = new Date().toLocaleDateString()
  const [quote, setQuote] = useState(quotes[0])

  const mainFocusHandler = e => {
    if (e.key === 'Enter') {
      localStorage.setItem(
        'mainFocus',
        JSON.stringify({
          focus: e.target.value,
          date: today,
          completed: false,
        })
      )
      setMainFocus(e.target.value)
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('mainFocus'))
    if (data) {
      if (data.date !== today) {
        localStorage.removeItem('mainFocus')
      } else {
        setMainFocus(data.focus)
        setFocusCompleted(data.completed)
      }
    }
    const newQuote = quotes.data[Math.floor(Math.random() * 30)].quote
    if (quote !== newQuote) setQuote(newQuote)
    else setQuote(quote)
  }, [])
  return (
    <div className="flex flex-col justify-center h-full gap-y-8">
      <Clock />
      <Weather />
      <h2 className="text-3xl md:text-5xl">Good evening {name}</h2>
      {mainFocus ? (
        <div className="flex justify-center gap-4 text-2xl p-2 items-center">
          <div
            className="cursor-pointer text-2xl md:text-4xl"
            onClick={() => {
              setFocusCompleted(true)
              let data = JSON.parse(localStorage.getItem('mainFocus'))
              data.completed = true
              localStorage.setItem('mainFocus', JSON.stringify(data))
            }}
            style={
              focusCompleted
                ? { textDecoration: 'line-through' }
                : { textDecoration: 'none' }
            }>
            My main focus is {mainFocus}
          </div>
          <span className="cursor-pointer mt-full">
            <i
              className="fa-solid fa-trash-can"
              onClick={() => {
                setMainFocus(null)
                setFocusCompleted(false)
                localStorage.removeItem('mainFocus')
              }}></i>
          </span>
        </div>
      ) : (
        <div className="flex flex-col align-center">
          <label htmlFor="main-focus" className="text-2xl md:text-4xl">
            What is your main Focus for today?
          </label>
          <input
            type="text"
            id="main-focus"
            className="border-b-2 focus:outline-none text-2xl mx-auto bg-transparent w-64 mt-4 text-center md:w-2/6 md:p-2 md:text-4xl"
            onKeyPress={e => mainFocusHandler(e)}
          />
        </div>
      )}
      <div className="mt-56 px-2">"{quote}"</div>
    </div>
  )
}
