import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials

        try {
          // Login API Call to match the user credentials and receive user data in response along with his role
          const res = await fetch(`${process.env.API_URL}/admin/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })

          if (res.status === 401) {
            throw new Error(JSON.stringify(data))
          } else if (res.status === 400) {
            throw new Error(JSON.stringify(data))
          }

          if (res.status === 200) {
            /*
             * Please unset all the sensitive information of the user either from API response or before returning
             * user data below. Below return statement will set the user object in the token and the same is set in
             * the session which will be accessible all over the app.
             */
            const data = await res.json()

            return {
              user: data?.data?.user,
              token: data?.data?.jwt
            }
          }

          return null
        } catch (e) {
          throw new Error(e.message)
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: '/login'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user
        token.token = user.token
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user
        session.token = token.token
      }

      return session
    }
  }
}
