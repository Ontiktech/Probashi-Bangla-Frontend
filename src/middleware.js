import { NextResponse } from 'next/server'

import withAuth from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const isAuthenticated = !!req.nextauth.token

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/login'
    }
  }
)

export const config = {
  matcher: ['/home', '/about']
}
