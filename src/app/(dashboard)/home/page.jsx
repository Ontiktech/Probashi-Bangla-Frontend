import { authOptions } from '@/app/libs/auth'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return <h1>Home page!</h1>
}
