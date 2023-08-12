import Link from "next/link";

async function getUser(id: string) {
  const res = await fetch(`http://localhost:3000/api/users/${id}`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

interface UserData {
  name: string;
  email: string;
  role: string;
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const userEE = await getUser(id);
  const { user: { name, email, role } }: { user: UserData } = await getUser(id);
  console.log(`Page userEE`,userEE);
  return (
    <>
      <div>My User id: {id}</div>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Role: {role}</div>
      <Link href={`/users`}>Back</Link>
    </>
  );
}