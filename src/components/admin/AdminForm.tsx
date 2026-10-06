import type { InputHTMLAttributes, ReactNode } from 'react'

type AdminFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  name: string
  label: string
  placeholder: string
}

export function AdminField({
  id,
  name,
  label,
  placeholder,
  type = 'text',
  ...inputProps
}: AdminFieldProps) {
  return (
    <label className="admin-field" htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...inputProps}
      />
    </label>
  )
}

export function AdminCheckbox({
  id,
  label,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & { id: string; label: string }) {
  return (
    <label className="admin-check" htmlFor={id}>
      <input {...inputProps} id={id} type="checkbox" />
      <span>{label}</span>
    </label>
  )
}

export function AdminButton({
  children,
  type = 'button',
  disabled,
}: {
  children: ReactNode
  type?: 'button' | 'submit'
  disabled?: boolean
}) {
  return (
    <button className="admin-primary-button" type={type} disabled={disabled}>
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
