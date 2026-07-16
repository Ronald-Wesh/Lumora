import { useEffect, useState } from 'react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function format(now: Date) {
  let h = now.getHours()
  const m = String(now.getMinutes()).padStart(2, '0')
  const mer = h >= 12 ? 'pm' : 'am'
  h = h % 12 || 12
  return {
    time: `${h}:${m}${mer}`,
    date: `${now.getDate()} ${MONTHS[now.getMonth()]}, ${now.getFullYear()}`,
  }
}

export function useClock() {
  const [value, setValue] = useState<{ time: string; date: string } | null>(null)

  useEffect(() => {
    setValue(format(new Date()))
    const id = setInterval(() => setValue(format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return value ?? { time: '9:41am', date: '12 March, 2025' }
}
