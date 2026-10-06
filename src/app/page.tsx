import { AdminBrand } from '@/components/admin/AdminBrand'
import {
  AdminButton,
  AdminCheckbox,
  AdminField,
  AdminPanel,
} from '@/components/admin/AdminForm'
import { getAdminAccessCopy, type Locale } from '@/i18n/admin-access'
import type { Metadata } from 'next'

type PageProps = {
  searchParams: Promise<{ lang?: string }>
}

function getLocale(lang?: string): Locale {
  return lang === 'vi' || lang === 'ko' ? lang : 'en'
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const locale = getLocale((await searchParams).lang)
  return { title: `${getAdminAccessCopy(locale).adminAccess} — Rocket` }
}

export default async function Home({ searchParams }: PageProps) {
  const { lang } = await searchParams
  const locale = getLocale(lang)
  const copy = getAdminAccessCopy(locale)

  return (
    <main className="admin-theme admin-auth-main" lang={locale}>
      <div className="admin-access-stack">
        <AdminBrand
          name={copy.rocket}
          description={copy.administration}
          logoLabel={copy.rocketLogo}
        />

        <AdminPanel title={copy.adminSignIn}>
          <form className="admin-auth-form">
            <AdminField
              id="admin-identifier"
              name="identifier"
              label={copy.adminIdentifier}
              placeholder={copy.emailOrSupportedIdentifier}
              autoComplete="username"
            />
            <AdminField
              id="admin-password"
              name="password"
              label={copy.password}
              placeholder={copy.enterYourPassword}
              type="password"
              autoComplete="current-password"
            />
            <AdminCheckbox id="admin-show-password" label={copy.showPassword} />
            <div className="admin-form-feedback" aria-live="polite" />
            <AdminButton>{copy.signIn}</AdminButton>
          </form>
        </AdminPanel>
      </div>
    </main>
  )
}
