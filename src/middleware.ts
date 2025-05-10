import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check if the path is /create
  if (path === '/create') {
    // Get the wallet connection status from cookies or headers
    const isWalletConnected = request.cookies.get('wallet_connected')?.value === 'true'

    // If wallet is not connected, redirect to home page
    if (!isWalletConnected) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

// Configure the paths that should be checked by the middleware
export const config = {
  matcher: '/create'
} 