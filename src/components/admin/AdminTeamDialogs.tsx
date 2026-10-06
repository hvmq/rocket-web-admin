'use client'

import { useState, type FormEvent } from 'react'
import { AdminOverlay } from './AdminOverlay'
import {
  normalizePermissions,
  teamPermissions,
  type AdminAccount,
  type AdminRole,
} from './admin-team-demo'

export type TeamTranslate = (
  source: string,
  values?: Record<string, string | number>,
) => string
export type TeamDialog =
  | { type: 'create-account' }
  | { type: 'change-role'; account: AdminAccount }
  | { type: 'status'; account: AdminAccount }
  | { type: 'create-role' }
  | { type: 'edit-role'; role: AdminRole }
  | { type: 'delete-role'; role: AdminRole }
export type TeamDialogValues = {
  name: string
  email: string
  password: string
  roleId: string
  permissionIds: string[]
}

export function AdminTeamDialog({
  dialog,
  roles,
  assigned,
  t,
  onSave,
  onClose,
}: {
  dialog: TeamDialog
  roles: AdminRole[]
  assigned: number
  t: TeamTranslate
  onSave: (values: TeamDialogValues) => string | undefined
  onClose: () => void
}) {
  const role = 'role' in dialog ? dialog.role : undefined
  const owner = role?.id === 'owner'
  const editingRole =
    dialog.type === 'create-role' || dialog.type === 'edit-role'
  const account = 'account' in dialog ? dialog.account : undefined
  const [permissionIds, setPermissionIds] = useState(
    role?.permissionIds ?? ['dashboard'],
  )
  const [error, setError] = useState('')
  const title = editingRole
    ? owner
      ? 'Owner Permissions'
      : role
        ? 'Edit Role'
        : 'Create Role'
    : dialog.type === 'delete-role'
      ? 'Delete Role'
      : dialog.type === 'status'
        ? account?.status === 'Active'
          ? 'Deactivate Account'
          : 'Activate Account'
        : dialog.type === 'change-role'
          ? 'Change Role'
          : 'Create Admin Account'
  const action = editingRole
    ? role
      ? 'Save Role'
      : 'Create Role'
    : dialog.type === 'delete-role'
      ? 'Delete Role'
      : dialog.type === 'status'
        ? 'Confirm'
        : dialog.type === 'change-role'
          ? 'Save Role'
          : 'Create Account'

  function toggle(id: string, checked: boolean) {
    setPermissionIds((current) =>
      normalizePermissions(
        checked ? [...current, id] : current.filter((value) => value !== id),
      ),
    )
  }

  function submit(event: FormEvent<HTMLFormElement>, dismiss: () => void) {
    event.preventDefault()
    if (owner && editingRole) return
    const data = new FormData(event.currentTarget)
    const value = (name: string) => String(data.get(name) ?? '')
    const result = onSave({
      name: value(editingRole ? 'roleName' : 'name').trim(),
      email: value('email').trim().toLowerCase(),
      password: value('password'),
      roleId: value('role'),
      permissionIds: normalizePermissions(permissionIds),
    })
    if (result) {
      setError(result)
      requestAnimationFrame(() =>
        document.getElementById('admin-team-form-error')?.focus(),
      )
    } else dismiss()
  }

  return (
    <AdminOverlay
      titleId="admin-team-dialog-title"
      onClose={onClose}
      className={`admin-team-dialog${editingRole ? ' admin-role-dialog' : ''}`}
    >
      {(dismiss) => (
        <>
          <h2 id="admin-team-dialog-title">{t(title)}</h2>
          {editingRole ? (
            <p>
              {owner ? (
                t(
                  'Owner has every permission, including Admin account and role management. This system role cannot be changed.',
                )
              ) : (
                <>
                  {t(
                    'Select the functions this role can use. Each selection includes the actions described below.',
                  )}{' '}
                  {assigned
                    ? t(
                        'Saving applies immediately to {count} assigned accounts.',
                        { count: assigned },
                      )
                    : t(
                        'Assign this role to an account to use these permissions.',
                      )}
                </>
              )}
            </p>
          ) : dialog.type === 'create-account' ? (
            <p>
              {t('Choose one role for this account. You can change it later.')}
            </p>
          ) : dialog.type === 'delete-role' ? (
            <p>
              {t('Delete {name}? This role is not assigned to any account.', {
                name: role?.name ?? '',
              })}
            </p>
          ) : (
            <p>
              {account?.name} · {account?.email}
              {dialog.type === 'status' && (
                <>
                  .{' '}
                  {t(
                    account?.status === 'Active'
                      ? 'Access will be disabled until this account is activated again.'
                      : 'They can sign in again with their existing role.',
                  )}
                </>
              )}
            </p>
          )}
          <form
            className="admin-team-form"
            noValidate
            onSubmit={(event) => submit(event, dismiss)}
          >
            {editingRole ? (
              <>
                <label className="admin-field">
                  <span>{t('Role name')}</span>
                  <input
                    name="roleName"
                    defaultValue={role?.name ?? ''}
                    maxLength={40}
                    required
                    disabled={owner}
                    data-autofocus={!owner ? true : undefined}
                  />
                </label>
                <fieldset className="admin-role-permissions">
                  <legend>{t('Allowed functions')}</legend>
                  <div className="admin-role-permission-grid">
                    {teamPermissions.map((permission) => (
                      <label
                        className="admin-role-permission"
                        key={permission.id}
                      >
                        <input
                          type="checkbox"
                          name="permissions"
                          value={permission.id}
                          checked={permissionIds.includes(permission.id)}
                          disabled={
                            owner ||
                            permission.required ||
                            !!(
                              permission.requires &&
                              !permissionIds.includes(permission.requires)
                            )
                          }
                          onChange={(event) =>
                            toggle(permission.id, event.target.checked)
                          }
                        />
                        <span>
                          <strong>
                            {t(permission.label)}
                            {permission.required && ` · ${t('Required')}`}
                          </strong>
                          <small>{t(permission.description)}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <p className="admin-permission-note">
                  {t(
                    'Admin account and role management is reserved for Owner.',
                  )}
                </p>
              </>
            ) : (
              <>
                {dialog.type === 'create-account' && (
                  <>
                    <label className="admin-field">
                      <span>{t('Full name')}</span>
                      <input
                        name="name"
                        autoComplete="name"
                        required
                        data-autofocus
                      />
                    </label>
                    <label className="admin-field">
                      <span>{t('Email')}</span>
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                      />
                    </label>
                  </>
                )}
                {(dialog.type === 'create-account' ||
                  dialog.type === 'change-role') && (
                  <label className="admin-field">
                    <span>{t('Role')}</span>
                    <select
                      name="role"
                      defaultValue={
                        account?.roleId ??
                        (roles.some((item) => item.id === 'operator')
                          ? 'operator'
                          : '')
                      }
                      required
                    >
                      <option value="" disabled>
                        {t('Choose a role')}
                      </option>
                      {roles.map((item) => (
                        <option key={item.id} value={item.id}>
                          {t(item.name)}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                {dialog.type === 'create-account' && (
                  <label className="admin-field">
                    <span>{t('Initial password')}</span>
                    <input
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </label>
                )}
              </>
            )}
            {error && (
              <p
                id="admin-team-form-error"
                className="admin-dialog-error"
                role="alert"
                tabIndex={-1}
              >
                {t(error)}
              </p>
            )}
            <div className="admin-dialog__actions">
              <button
                className="admin-secondary-button"
                type="button"
                onClick={dismiss}
              >
                {t(owner ? 'Close' : 'Cancel')}
              </button>
              {!owner && (
                <button className="admin-primary-button" type="submit">
                  {t(action)}
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </AdminOverlay>
  )
}
