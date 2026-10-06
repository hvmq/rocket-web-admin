'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import './overlay.css'

export function AdminOverlay({
  children,
  titleId,
  onClose,
  variant = 'dialog',
  className = '',
}: {
  children: ReactNode | ((dismiss: () => void) => ReactNode)
  titleId: string
  onClose: () => void
  variant?: 'drawer' | 'dialog'
  className?: string
}) {
  const panel = useRef<HTMLElement>(null)
  const { closing, dismiss } = useAnimatedDismiss(onClose)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const root = panel.current
    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const background = document.querySelector<HTMLElement>('.admin-screen')
    const wasInert = background?.inert ?? false
    if (background) background.inert = true
    const focusable = () =>
      Array.from(
        root?.querySelectorAll<HTMLElement>(
          'button:not(:disabled):not([tabindex="-1"]), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0)
    const first =
      root?.querySelector<HTMLElement>('[data-autofocus]') ??
      focusable()[0] ??
      root
    first?.focus()
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismiss()
      }
      if (event.key !== 'Tab') return
      const elements = focusable()
      const first = elements[0]
      const last = elements.at(-1)
      if (!first) {
        event.preventDefault()
        root?.focus()
        return
      }
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === root)
      ) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', keydown)
    return () => {
      document.removeEventListener('keydown', keydown)
      document.body.style.overflow = bodyOverflow
      if (background) background.inert = wasInert
      if (previous?.isConnected) previous.focus()
    }
  }, [dismiss])
  return (
    <div
      className={`admin-theme admin-modal-backdrop admin-overlay admin-motion-backdrop${variant === 'drawer' ? ' admin-overlay--drawer' : ''}${closing ? ' is-closing' : ''}`}
      inert={closing}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss()
      }}
    >
      <section
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`${variant === 'drawer' ? 'admin-overlay-panel admin-motion-drawer' : 'admin-dialog admin-motion-dialog'} ${className}${closing ? ' is-closing' : ''}`}
      >
        {typeof children === 'function' ? children(dismiss) : children}
      </section>
    </div>
  )
}
