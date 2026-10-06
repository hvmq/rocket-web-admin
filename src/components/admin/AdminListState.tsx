import type { ReactNode } from 'react'
import { AdminIcon, type IconName } from './AdminIcon'
import './list-state.css'

export function AdminListState({
  icon,
  title,
  description,
  label,
  children,
}: {
  icon: IconName
  title: string
  description: string
  label: string
  children?: ReactNode
}) {
  return (
    <section className="admin-list-state admin-motion-enter" role="status">
      <AdminIcon name={icon} />
      <div>
        <p className="admin-kicker">{label}</p>
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
      </div>
    </section>
  )
}
