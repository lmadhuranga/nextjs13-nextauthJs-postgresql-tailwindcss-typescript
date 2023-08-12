import Link from "next/link";

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/users?page=1')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export default async function Page() {
  const { users } = await getUsers();
  const usersData = users.map(({ id, name, email, role }: { id: number, name: string, email: string, role: string }) => (
    <tr key={id}>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <Link href={`/users/view/${id}`}>View </Link> |{' '}
        <Link href={`/users/edit/${id}`}> Update </Link> |{' '}
        <Link href={`/users/delete/${id}`}> Delete</Link>
      </td>
    </tr>
  ));
  // const users = await getUsers();
  // console.log(`users1`,users);
  // const {id, email,X name, role} = await getUsers();
  return (
    <>
      <h1>User List</h1>
      <ul>
        <li><Link href="/users/new">New</Link></li>
      </ul>
      <ul>
        <li><Link href="/users/view/1">View 1</Link></li>
      </ul>
      <ul>
        <li><Link href="/users/edit/1">update 1</Link></li>
      </ul>

      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData}
        </tbody>
      </table>
    </>
  );
}