'use client'

import { createBrowserClient } from '@supabase/ssr'

function getPublicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !publishableKey) {
    throw new Error(
      'Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.',
    )
  }

  return { url, publishableKey }
}

export function createSupabaseBrowserClient() {
  const { url, publishableKey } = getPublicSupabaseConfig()
  return createBrowserClient(url, publishableKey)
}
