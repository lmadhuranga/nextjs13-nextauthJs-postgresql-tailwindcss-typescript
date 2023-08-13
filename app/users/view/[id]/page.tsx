import Link from "next/link";

async function getUser(id: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/users/${id}`,
  );

  if (!res.ok) {
    // Todo:: Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
 
export default async function Page({ params: { id } }: { params: { id: string } }) {

  const { user  }: { user: UserData } = await getUser(id);
  const { user: { name, email, role } }: { user: UserData } = await getUser(id);
  
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