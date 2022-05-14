import React, { useState, useEffect } from 'react'

export function Clock() {
  const d = new Date()
  const [time, setTime] = useState(d.getHours() + ':' + d.getMinutes())
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
  return <div className="text-6xl mb-16 md:text-8xl">{time}</div>
}
