'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

function exitDuration() {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--admin-motion-exit-duration')
    .trim()
  const duration = Number.parseFloat(value)
  if (!Number.isFinite(duration)) return 180
  if (value.endsWith('ms')) return duration
  if (value.endsWith('s')) return duration * 1000
  return 180
}

export function useAnimatedDismiss(onDismiss: () => void) {
  const [closing, setClosing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onDismissRef = useRef(onDismiss)
  onDismissRef.current = onDismiss

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const dismiss = useCallback(() => {
    if (timer.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDismissRef.current()
      return
    }

    setClosing(true)
    timer.current = setTimeout(() => {
      timer.current = null
      setClosing(false)
      onDismissRef.current()
    }, exitDuration())
  }, [])

  const cancel = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    setClosing(false)
  }, [])

  return { closing, dismiss, cancel }
}
