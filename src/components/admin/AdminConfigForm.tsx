import type { HTMLInputTypeAttribute, ReactNode } from 'react'
import './config-form.css'

export function AdminConfigCard({
  title,
  children,
  stagger = 0,
  lang,
}: {
  title?: string
  children: ReactNode
  stagger?: number
  lang?: string
}) {
  return (
    <section
      className="admin-config-card admin-motion-enter"
      lang={lang}
      aria-label={title}
      style={{
        animationDelay: `var(--admin-motion-stagger-${Math.min(stagger, 4)})`,
      }}
    >
      {title && <h2 className="admin-config-platform">{title}</h2>}
      {children}
    </section>
  )
}

type ConfigFieldProps = {
  id: string
  name: string
  label: string
  value: string
  onValueChange: (value: string) => void
  error?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  type?: HTMLInputTypeAttribute
  min?: number
  step?: number
}

export function AdminConfigField({
  label,
  error,
  onValueChange,
  multiline,
  rows,
  type = 'text',
  min,
  step,
  ...attributes
}: ConfigFieldProps) {
  const errorId = error ? `${attributes.id}-error` : undefined
  return (
    <label className="admin-field" htmlFor={attributes.id}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          {...attributes}
          rows={rows}
          onChange={(event) => onValueChange(event.target.value)}
          aria-invalid={!!error}
          aria-describedby={errorId}
        />
      ) : (
        <input
          {...attributes}
          type={type}
          min={min}
          step={step}
          onChange={(event) => onValueChange(event.target.value)}
          aria-invalid={!!error}
          aria-describedby={errorId}
        />
      )}
      {error && (
        <small id={errorId} className="admin-config-field-error">
          {error}
        </small>
      )}
    </label>
  )
}
