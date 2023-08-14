import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

import User from './users/page'
import { LoginButton, LogoutButton } from './auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <User searchParams={{page:1}}/>
    </main>
  )
}
