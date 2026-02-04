"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface RotatingTextProps {
  words: string[]
  interval?: number
  className?: string
  style?: React.CSSProperties
}

export function RotatingText({ words, interval = 2000, className = "", style = {} }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setFade(true)

      const changeTimeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        setFade(false)
      }, 500) // Half a second for fade out

      return () => clearTimeout(changeTimeout)
    }, interval - 500) // Total interval minus fade time

    return () => clearTimeout(fadeTimeout)
  }, [currentIndex, interval, words.length])

  return (
    <span
      className={`inline-block transition-opacity duration-500 min-h-[1.5em] whitespace-nowrap ${fade ? "opacity-0" : "opacity-100"} ${className}`}
      aria-live="polite"
      style={{ color: "inherit", ...style }}
    >
      {words[currentIndex]}
    </span>
  )
}
