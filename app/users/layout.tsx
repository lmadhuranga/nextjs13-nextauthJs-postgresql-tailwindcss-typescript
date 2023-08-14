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
      <nav className="bg-blue-500 p-4 flex justify-between items-center">
        <div>
          <Link href={"/users"} className="text-white font-semibold">
            Users
          </Link>
        </div>
        <div>
          {session === null ? <LoginButton /> : <LogoutButton />}
        </div>
      </nav>
      {children}
    </section>
  )
}