import { useEffect, useRef, useState } from 'react'

export function useCountUp(end: number, duration: number = 1500, startOnMount: boolean = false) {
  const [count, setCount] = useState(startOnMount ? 0 : end)
  const [hasStarted, setHasStarted] = useState(startOnMount)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (startOnMount) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [startOnMount])

  useEffect(() => {
    if (!hasStarted) return

    let startTime = 0
    let frame = 0

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(eased * end))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [hasStarted, end, duration])

  return { count, ref }
}
