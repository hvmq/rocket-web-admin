import type { HTMLInputTypeAttribute, ReactNode } from 'react'

type AdminFieldProps = {
  id: string
  name: string
  label: string
  placeholder: string
  type?: HTMLInputTypeAttribute
  autoComplete?: string
}

export function AdminField({
  id,
  name,
  label,
  placeholder,
  type = 'text',
  autoComplete,
}: AdminFieldProps) {
  return (
    <label className="admin-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    </label>
  )
}

export function AdminCheckbox({ id, label }: { id: string; label: string }) {
  return (
    <label className="admin-check" htmlFor={id}>
      <input id={id} type="checkbox" />
      <span>{label}</span>
    </label>
  )
}

export function AdminButton({
  children,
  type = 'button',
}: {
  children: ReactNode
  type?: 'button' | 'submit'
}) {
  return (
    <button className="admin-primary-button" type={type}>
      {children}
    </button>
  )
}

export function AdminPanel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="admin-auth-card" aria-labelledby="admin-auth-title">
      <h1 id="admin-auth-title">{title}</h1>
      {children}
    </section>
  )
}
