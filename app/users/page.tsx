import Link from "next/link";

async function getUsers(page: number = 1) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/users/?page=${page}`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json();
}


function onDeleteHandler(id: number) {
  console.log(`Delete user `, id);
}

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default async function Page({ searchParams: { page } }: { searchParams: { page: number } }) {
  const { users, pagination: { currentPage, totalPages, totalUsers } } = await getUsers(page);

  const paginationLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push(
      <Link href={`/users?page=${i}`} key={i}>
        {' '}{i}{' '}
      </Link>
    );
  }

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
      <div>
        {paginationLinks}
      </div>
    </>
  );
}