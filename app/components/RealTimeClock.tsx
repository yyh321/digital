'use client'

import { useEffect, useState } from 'react'

export default function RealTimeClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('zh-CN', { hour12: false }))
      setDate(now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="text-right">
      <div className="font-digital text-[28px] text-[#0ea5e9] leading-none tracking-wider drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]">
        {time}
      </div>
      <div className="text-[13px] text-[#64748b] mt-1 tracking-wide">
        {date}
      </div>
    </div>
  )
}
