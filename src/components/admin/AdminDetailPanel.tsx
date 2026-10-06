'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { AdminIcon } from './AdminIcon'
import { useAnimatedDismiss } from './useAnimatedDismiss'
import './detail-panel.css'

export function AdminDetailPanel({
  reference,
  title,
  label,
  closeLabel,
  onClose,
  children,
  actions,
}: {
  reference: string
  title: string
  label: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
  actions?: ReactNode
}) {
  const closeButton = useRef<HTMLButtonElement>(null)
  const { closing, dismiss } = useAnimatedDismiss(onClose)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeButton.current?.focus()
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismiss()
      }
    }
    window.addEventListener('keydown', keydown)
    return () => {
      window.removeEventListener('keydown', keydown)
      if (previous?.isConnected) previous.focus()
    }
  }, [dismiss])
  return (
    <aside
      className={`admin-detail-panel admin-motion-drawer${closing ? ' is-closing' : ''}`}
      aria-label={label}
      inert={closing}
    >
      <header>
        <div>
          <p className="admin-kicker">{reference}</p>
          <h2>{title}</h2>
        </div>
        <button
          ref={closeButton}
          type="button"
          onClick={dismiss}
          aria-label={closeLabel}
        >
          <AdminIcon name="close" />
        </button>
      </header>
      <div className="admin-detail-panel__body">{children}</div>
      {actions && <footer>{actions}</footer>}
    </aside>
  )
}
