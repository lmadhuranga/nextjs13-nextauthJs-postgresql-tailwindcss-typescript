import Link from "next/link"
import { LoginButton, LogoutButton } from "../auth"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default function EditLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const session = getServerSession(authOptions)
  return (
    <section>
      <nav>
        {!session && <LoginButton />}
        {!!session && <LogoutButton />}
        <Link href={'/users'}>Users</Link>
      </nav>
      {children}
    </section>
  )
}