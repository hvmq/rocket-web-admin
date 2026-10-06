'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/admin-access'
import { teamT } from '@/i18n/admin-team'
import { AdminShell } from './AdminShell'
import { AdminIcon } from './AdminIcon'
import { ChangePasswordDialog } from './AdminDashboard'
import { AdminTeamBadge, AdminTeamTable } from './AdminTeamTable'
import {
  AdminTeamDialog,
  type TeamDialog,
  type TeamDialogValues,
} from './AdminTeamDialogs'
import {
  createTeamDemo,
  teamPermissions,
  type AdminRole,
} from './admin-team-demo'
import './dashboard.css'
import './team.css'

export function AdminTeam({ locale }: { locale: Locale }) {
  const t = (source: string, values?: Record<string, string | number>) =>
    teamT(locale, source, values)
  const [data, setData] = useState(createTeamDemo)
  const [tab, setTab] = useState<'accounts' | 'roles'>('accounts')
  const [search, setSearch] = useState('')
  const [dialog, setDialog] = useState<TeamDialog | null>(null)
  const [notice, setNotice] = useState('')
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [demoPassword, setDemoPassword] = useState('Rocket2026!')
  const { accounts, roles } = data
  const roleName = (id: string) =>
    roles.find((role) => role.id === id)?.name ?? ''
  const filtered = accounts.filter((account) =>
    `${account.name} ${account.email} ${roleName(account.roleId)} ${t(roleName(account.roleId))}`
      .toLocaleLowerCase(locale)
      .includes(search.trim().toLocaleLowerCase(locale)),
  )
  const assigned = (id: string) =>
    accounts.filter((account) => account.roleId === id).length

  function open(value: TeamDialog) {
    setNotice('')
    setDialog(value)
  }

  function save(values: TeamDialogValues): string | undefined {
    if (!dialog) return 'The selected record is unavailable.'
    if (dialog.type === 'create-account') {
      if (!values.name) return 'Enter a full name.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
        return 'Enter a valid email address.'
      if (
        accounts.some((account) => account.email.toLowerCase() === values.email)
      )
        return 'An Admin account already uses this email.'
      if (!roles.some((role) => role.id === values.roleId))
        return 'Choose a valid role.'
      if (values.password.length < 8)
        return 'Use at least 8 characters for the initial password.'
      setData({
        ...data,
        accounts: [
          ...accounts,
          {
            id: `admin-${crypto.randomUUID()}`,
            name: values.name,
            email: values.email,
            roleId: values.roleId,
            status: 'Active',
          },
        ],
      })
      setNotice(
        t('{name} was created as {role}.', {
          name: values.name,
          role: t(roleName(values.roleId)),
        }),
      )
    } else if (dialog.type === 'create-role' || dialog.type === 'edit-role') {
      const target = dialog.type === 'edit-role' ? dialog.role : undefined
      if (target?.id === 'owner') return 'Owner cannot be edited or deleted.'
      if (!values.name) return 'Enter a role name.'
      if (values.name.length > 40)
        return 'Use 40 characters or fewer for the role name.'
      if (
        roles.some(
          (role) =>
            role.id !== target?.id &&
            role.name.toLowerCase() === values.name.toLowerCase(),
        )
      )
        return 'A role already uses this name.'
      const next: AdminRole = {
        id: target?.id ?? `role-${crypto.randomUUID()}`,
        name: values.name,
        permissionIds: values.permissionIds,
      }
      setData({
        ...data,
        roles: target
          ? roles.map((role) => (role.id === target.id ? next : role))
          : [...roles, next],
      })
      setNotice(
        t(target ? '{name} was updated.' : '{name} was created.', {
          name: values.name,
        }) +
          ' ' +
          t(
            target && assigned(target.id)
              ? 'Permissions apply to {count} assigned accounts.'
              : 'You can now assign it to accounts.',
            { count: target ? assigned(target.id) : 0 },
          ),
      )
    } else if (dialog.type === 'delete-role') {
      if (dialog.role.id === 'owner' || assigned(dialog.role.id))
        return 'Reassign all accounts before deleting this role.'
      setData({
        ...data,
        roles: roles.filter((role) => role.id !== dialog.role.id),
      })
      setNotice(t('{name} was deleted.', { name: dialog.role.name }))
    } else {
      const target = dialog.account
      if (target.id === 'admin-owner')
        return 'Your own account cannot be changed.'
      if (dialog.type === 'change-role') {
        if (!roles.some((role) => role.id === values.roleId))
          return 'Choose a valid role.'
        setData({
          ...data,
          accounts: accounts.map((account) =>
            account.id === target.id
              ? { ...account, roleId: values.roleId }
              : account,
          ),
        })
        setNotice(
          t('{name} now has the {role} role.', {
            name: target.name,
            role: t(roleName(values.roleId)),
          }),
        )
      } else {
        const status = target.status === 'Active' ? 'Inactive' : 'Active'
        setData({
          ...data,
          accounts: accounts.map((account) =>
            account.id === target.id ? { ...account, status } : account,
          ),
        })
        setNotice(
          t('{name} is now {status}.', {
            name: target.name,
            status: t(status),
          }),
        )
      }
    }
  }

  function changeTab(next: 'accounts' | 'roles') {
    setTab(next)
    setNotice('')
  }

  return (
    <>
      <AdminShell
        locale={locale}
        active="team"
        title="Admin Accounts & Roles"
        translate={t}
        onChangePassword={() => setPasswordOpen(true)}
      >
        <div className="admin-team-layout">
          <div
            className="admin-segmented admin-team-tabs"
            role="tablist"
            aria-label={t('Admin management')}
          >
            {(['accounts', 'roles'] as const).map((value) => (
              <button
                key={value}
                id={`team-tab-${value}`}
                type="button"
                role="tab"
                aria-selected={tab === value}
                aria-controls={`team-panel-${value}`}
                tabIndex={tab === value ? 0 : -1}
                className={tab === value ? 'is-active' : ''}
                onClick={() => changeTab(value)}
                onKeyDown={(event) => {
                  if (
                    ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault()
                    const next =
                      event.key === 'Home'
                        ? 'accounts'
                        : event.key === 'End'
                          ? 'roles'
                          : value === 'accounts'
                            ? 'roles'
                            : 'accounts'
                    changeTab(next)
                    document.getElementById(`team-tab-${next}`)?.focus()
                  }
                }}
              >
                {t(value === 'accounts' ? 'Accounts' : 'Roles & Permissions')}{' '}
                <small>
                  {value === 'accounts' ? accounts.length : roles.length}
                </small>
              </button>
            ))}
          </div>
          {notice && (
            <p className="admin-team-notice admin-motion-enter" role="status">
              {notice}
            </p>
          )}
          <section
            key={tab}
            id={`team-panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`team-tab-${tab}`}
            className="admin-team-panel admin-motion-enter"
          >
            {tab === 'accounts' ? (
              <>
                <div className="admin-team-toolbar">
                  <label className="admin-team-search">
                    <AdminIcon name="search" />
                    <input
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder={t('Search name, email or role')}
                      aria-label={t('Search Admin accounts')}
                    />
                  </label>
                  <button
                    className="admin-primary-button"
                    type="button"
                    onClick={() => open({ type: 'create-account' })}
                  >
                    {t('Create Account')}
                  </button>
                </div>
                <AdminTeamTable
                  label={t('Admin accounts')}
                  headings={['Admin', 'Role', 'Status', 'Actions'].map(
                    (heading) => t(heading),
                  )}
                >
                  {filtered.map((account) => (
                    <tr key={account.id}>
                      <td>
                        <strong>{account.name}</strong>
                        <small>{account.email}</small>
                      </td>
                      <td>
                        <AdminTeamBadge>
                          {t(roleName(account.roleId))}
                        </AdminTeamBadge>
                      </td>
                      <td>
                        <AdminTeamBadge positive={account.status === 'Active'}>
                          {t(account.status)}
                        </AdminTeamBadge>
                      </td>
                      <td>
                        <div className="admin-team-row-actions">
                          <button
                            type="button"
                            disabled={account.id === 'admin-owner'}
                            onClick={() =>
                              open({ type: 'change-role', account })
                            }
                          >
                            {t('Change Role')}
                          </button>
                          <button
                            type="button"
                            disabled={account.id === 'admin-owner'}
                            onClick={() => open({ type: 'status', account })}
                          >
                            {t(
                              account.status === 'Active'
                                ? 'Deactivate'
                                : 'Activate',
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!filtered.length && (
                    <tr>
                      <td colSpan={4}>
                        <div className="admin-team-empty" role="status">
                          {t('No accounts match this search.')}{' '}
                          <button
                            className="admin-secondary-button"
                            type="button"
                            onClick={() => setSearch('')}
                          >
                            {t('Clear search')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </AdminTeamTable>
              </>
            ) : (
              <>
                <div className="admin-team-toolbar">
                  <div>
                    <h2>{t('Roles & Permissions')}</h2>
                    <p>
                      {t(
                        'Create a role, choose its allowed functions, then assign it to accounts.',
                      )}
                    </p>
                  </div>
                  <button
                    className="admin-primary-button"
                    type="button"
                    onClick={() => open({ type: 'create-role' })}
                  >
                    {t('Create Role')}
                  </button>
                </div>
                <AdminTeamTable
                  roles
                  label={t('Admin roles')}
                  headings={[
                    'Role',
                    'Allowed functions',
                    'Accounts',
                    'Actions',
                  ].map((heading) => t(heading))}
                >
                  {roles.map((role) => {
                    const labels = role.permissionIds.map((id) =>
                      t(permissionLabel(id)),
                    )
                    const summary =
                      labels.slice(0, 3).join(', ') +
                      (labels.length > 3
                        ? t(' +{count} more', { count: labels.length - 3 })
                        : '')
                    return (
                      <tr key={role.id}>
                        <td>
                          <strong>{t(role.name)}</strong>
                          {role.id === 'owner' && (
                            <small>{t('Protected system role')}</small>
                          )}
                        </td>
                        <td>
                          <strong>
                            {role.id === 'owner'
                              ? t('All functions + Admin management')
                              : t('{count} allowed functions', {
                                  count: labels.length,
                                })}
                          </strong>
                          <small>{summary}</small>
                        </td>
                        <td>
                          {t('{count} assigned', { count: assigned(role.id) })}
                        </td>
                        <td>
                          <div className="admin-team-row-actions">
                            <button
                              type="button"
                              onClick={() => open({ type: 'edit-role', role })}
                            >
                              {t(
                                role.id === 'owner'
                                  ? 'View Permissions'
                                  : 'Edit Role',
                              )}
                            </button>
                            {role.id !== 'owner' && (
                              <button
                                type="button"
                                disabled={assigned(role.id) > 0}
                                title={
                                  assigned(role.id)
                                    ? t(
                                        'Reassign all accounts before deleting this role.',
                                      )
                                    : undefined
                                }
                                onClick={() =>
                                  open({ type: 'delete-role', role })
                                }
                              >
                                {t('Delete')}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </AdminTeamTable>
                <p className="admin-role-help">
                  {t(
                    'Owner cannot be edited or deleted. Reassign all accounts before deleting another role.',
                  )}
                </p>
              </>
            )}
          </section>
        </div>
      </AdminShell>
      {dialog && (
        <AdminTeamDialog
          dialog={dialog}
          roles={roles}
          assigned={'role' in dialog ? assigned(dialog.role.id) : 0}
          t={t}
          onSave={save}
          onClose={() => setDialog(null)}
        />
      )}
      {passwordOpen && (
        <ChangePasswordDialog
          locale={locale}
          translate={t}
          demoPassword={demoPassword}
          onPasswordChange={setDemoPassword}
          onClose={() => setPasswordOpen(false)}
        />
      )}
    </>
  )
}

function permissionLabel(id: string) {
  return teamPermissions.find((permission) => permission.id === id)?.label ?? id
}
