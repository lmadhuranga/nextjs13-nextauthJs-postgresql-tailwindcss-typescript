import Link from "next/link"

export default function EditLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <nav>
        <Link href={'/users'}>Users</Link>
      </nav>
      {children}
    </section>
  )
}