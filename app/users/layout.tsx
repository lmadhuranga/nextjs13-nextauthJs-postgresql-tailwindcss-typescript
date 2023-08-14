import Link from "next/link"
import { LoginButton, LogoutButton } from "../auth"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function EditLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  console.log(`session+++++++++++++`, session);
  return (
    <section>
      <nav>
        {session===null ? <LoginButton /> : <LogoutButton />}
        <Link href={'/users'}>Users</Link>
      </nav>
      {children}
    </section>
  )
}