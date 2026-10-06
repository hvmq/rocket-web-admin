type AdminBrandProps = {
  name: string
  description: string
  logoLabel: string
}

export function AdminBrand({ name, description, logoLabel }: AdminBrandProps) {
  return (
    <div className="admin-brand">
      <span className="admin-brand-mark">
        <svg viewBox="0 0 48 48" role="img" aria-label={logoLabel}>
          <path d="M24 5c8.3 3.6 13 10.1 13 18.1C37 32 31.9 39.5 24 43c-7.9-3.5-13-11-13-19.9C11 15.1 15.7 8.6 24 5Z" />
          <path
            className="admin-brand-mark-cut"
            d="M24 13.3c3.8 3.1 5.8 6.6 5.8 10.5 0 4.4-2.2 8.2-5.8 11.1-3.6-2.9-5.8-6.7-5.8-11.1 0-3.9 2-7.4 5.8-10.5Z"
          />
          <circle className="admin-brand-mark-dot" cx="24" cy="22" r="3.2" />
        </svg>
      </span>
      <div>
        <strong>{name}</strong>
        <small>{description}</small>
      </div>
    </div>
  )
}
