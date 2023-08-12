import Link from "next/link";

async function getUsers(page: number = 1) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/users/?page=${page}`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default async function Page() {
  const { users } = await getUsers();
  const usersData = users.map(({ id, name, email, role }: UserData) => {
    return (
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
    );
  });
  return (
    <>
      <h1>User List</h1>
      <Link href={`/users/new`}>New</Link>
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