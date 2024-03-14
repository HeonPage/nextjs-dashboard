import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    access_token: string
    refresh_token: string
    user: {
      id: number
      username: string
      company: string
      nick: string
    } & DefaultSession['user']
  }
}

import { JWT } from '@auth/core/jwt'

declare module '@auth/core/jwt' {
  interface JWT {
    access_token: string
    refresh_token: string
    username: string
    nick: string
    company: string
  }
}
