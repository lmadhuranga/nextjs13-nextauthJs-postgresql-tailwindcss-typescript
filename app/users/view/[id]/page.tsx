import Link from "next/link";

async function getUser(id: string) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/users/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    // Todo:: Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page({ params: { id } }: { params: { id: string } }) {

  const { user }: { user: UserData } = await getUser(id);
  const { user: { name, email, role } }: { user: UserData } = await getUser(id);

  return (
    <>
      <div className="p-4">
        <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
          <div className="text-2xl font-semibold mb-2">User Details  : {name}</div>
          <div className="mb-2"><span className="font-semibold">Name:</span> {name}</div>
          <div className="mb-2"><span className="font-semibold">Email:</span> {email}</div>
          <div className="mb-2"><span className="font-semibold">Role:</span> {role}</div>
          <Link href={`/users`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Back</Link>&nbsp;
          <Link href={`/users/edit/${id}`} className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update {name}</Link>
        </div>
      </div>
    </>
  );
}