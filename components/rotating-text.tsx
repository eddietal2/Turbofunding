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
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const exitTimeout = setTimeout(() => {
      setIsExiting(true)

      const changeTimeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        setIsExiting(false)
      }, 500) // Duration of exit animation

      return () => clearTimeout(changeTimeout)
    }, interval - 500) // Total interval minus exit time

    return () => clearTimeout(exitTimeout)
  }, [currentIndex, interval, words.length])

  return (
    <>
      <style>{`
        @keyframes slideUpIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUpOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-30px);
          }
        }
        .rotating-text-enter {
          animation: slideUpIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .rotating-text-exit {
          animation: slideUpOut 0.5s ease-in forwards;
        }
      `}</style>
      <span
        className={`inline-block min-h-[1.5em] whitespace-nowrap ${
          isExiting ? "rotating-text-exit" : "rotating-text-enter"
        } ${className}`}
        aria-live="polite"
        style={style}
      >
        {words[currentIndex]}
      </span>
    </>
  )
}
