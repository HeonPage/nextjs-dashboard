import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
    async session({ session, token }) {
      session.access_token = token.access_token
      session.refresh_token = token.refresh_token
      session.user.username = token.username
      session.user.nick = token.nick
      session.user.company = token.company
      return session
    },
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
