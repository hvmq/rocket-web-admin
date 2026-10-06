'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition, type FormEvent } from 'react'
import { getAdminAccessCopy, type Locale } from '@/i18n/admin-access'
import { AdminButton, AdminCheckbox, AdminField } from './AdminForm'

// These credentials only open the demo UI; they do not create a Supabase session.
const demoAccount = {
  identifier: 'admin@rocket.demo',
  password: 'Rocket2026!',
}

export function AdminSignInForm({ locale }: { locale: Locale }) {
  const router = useRouter()
  const copy = getAdminAccessCopy(locale)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<'missing' | 'invalid' | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isPending) return

    const data = new FormData(event.currentTarget)
    const identifier = String(data.get('identifier') ?? '')
      .trim()
      .toLowerCase()
    const password = String(data.get('password') ?? '')

    if (!identifier || !password) {
      setError('missing')
      return
    }

    if (
      identifier !== demoAccount.identifier ||
      password !== demoAccount.password
    ) {
      setError('invalid')
      return
    }

    setError(null)
    startTransition(() => {
      router.replace(`/dashboard?lang=${locale}`)
    })
  }

  return (
    <form
      className="admin-auth-form"
      onSubmit={handleSubmit}
      onChange={() => setError(null)}
      aria-busy={isPending}
      noValidate
    >
      <AdminField
        id="admin-identifier"
        name="identifier"
        label={copy.adminIdentifier}
        placeholder={copy.emailOrSupportedIdentifier}
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        required
        aria-invalid={!!error}
        aria-describedby={error ? 'admin-sign-in-feedback' : undefined}
      />
      <AdminField
        id="admin-password"
        name="password"
        label={copy.password}
        placeholder={copy.enterYourPassword}
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        required
        aria-invalid={!!error}
        aria-describedby={error ? 'admin-sign-in-feedback' : undefined}
      />
      <AdminCheckbox
        id="admin-show-password"
        label={copy.showPassword}
        checked={showPassword}
        onChange={(event) => setShowPassword(event.target.checked)}
      />
      <div
        id="admin-sign-in-feedback"
        className="admin-form-feedback"
        aria-live="polite"
        aria-atomic="true"
      >
        {error === 'missing'
          ? copy.enterCredentials
          : error === 'invalid'
            ? copy.invalidCredentials
            : ''}
      </div>
      <AdminButton type="submit" disabled={isPending}>
        {isPending ? copy.signingIn : copy.signIn}
      </AdminButton>
    </form>
  )
}
