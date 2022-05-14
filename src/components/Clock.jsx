import React, { useState, useEffect } from 'react'

export function Clock() {
  const d = new Date()
  const name = localStorage.getItem('name')
  const [time, setTime] = useState(d.getHours() + ':' + d.getMinutes())
  const [greet, setGreet] = useState('Hello ')
  useEffect(() => {
    const interval = setInterval(() => {
      const newDate = new Date()
      const hours = newDate.getHours()
      const minutes = newDate.getMinutes()
      const newTime =
        (Number(hours) < 10 && hours !== '00' ? '0' + hours : hours) +
        ':' +
        (Number(minutes) < 10 && minutes !== '00' ? '0' + minutes : minutes)

      setTime(newTime)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const hours = time.substring(0, 2)

    if (hours < 12) {
      setGreet('Good Morning ')
    } else if (hours > 12 && hours < 16) {
      setGreet('Good Afternoon ')
    } else if (hours > 16 && hours < 21) {
      setGreet('Good Evening ')
    } else {
      setGreet('Good Night ')
    }
  }, [time])

  return (
    <div className="">
      <div className="text-6xl md:text-8xl">
        {time}
        <h2 className="text-3xl mt-8 mb-16 md:text-5xl">
          {greet} {name}
        </h2>
      </div>
    </div>
  )
}
