import { AdminBrand } from '@/components/admin/AdminBrand'
import { AdminPanel } from '@/components/admin/AdminForm'
import { AdminSignInForm } from '@/components/admin/AdminSignInForm'
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
          <AdminSignInForm locale={locale} />
        </AdminPanel>
      </div>
    </main>
  )
}
