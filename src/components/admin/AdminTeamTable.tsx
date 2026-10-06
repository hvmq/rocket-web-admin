import type { ReactNode } from 'react'

export function AdminTeamTable({
  label,
  headings,
  children,
  roles = false,
}: {
  label: string
  headings: string[]
  children: ReactNode
  roles?: boolean
}) {
  return (
    <div className="admin-team-table-wrap">
      <table
        className={`admin-team-table${roles ? ' admin-role-table' : ''}`}
        aria-label={label}
      >
        <thead>
          <tr>
            {headings.map((heading) => (
              <th key={heading} scope="col">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function AdminTeamBadge({
  children,
  positive = false,
}: {
  children: ReactNode
  positive?: boolean
}) {
  return (
    <span
      className={`admin-team-badge${positive ? ' admin-team-badge--positive' : ''}`}
    >
      <span />
      {children}
    </span>
  )
}
