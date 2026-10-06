import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

export function GET() {
  logger.info('Health check requested')
  return NextResponse.json({ status: 'ok' })
}
