import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { axiosNext } from './app/lib/api'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials)
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data
          const user = await axiosNext.post('/auth/signin', {
            username: username,
            password: password,
          })
          return user.data.result.user
        }
        return null
      },
    }),
  ],
})
