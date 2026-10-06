import './pagination.css'

export function AdminPagination({
  page,
  pageCount,
  summary,
  label,
  previousLabel,
  nextLabel,
  onPageChange,
}: {
  page: number
  pageCount: number
  summary: string
  label: string
  previousLabel: string
  nextLabel: string
  onPageChange: (page: number) => void
}) {
  return (
    <nav className="admin-pagination" aria-label={label}>
      <span role="status">{summary}</span>
      <div>
        <button
          className="admin-secondary-button"
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          {previousLabel}
        </button>
        <button
          className="admin-secondary-button"
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          {nextLabel}
        </button>
      </div>
    </nav>
  )
}
