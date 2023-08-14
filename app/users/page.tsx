'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "../components/Pagination";

async function getUsers(page: number = 1) {
  const res = await fetch(`/api/users/?page=${page}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function deleteUser(id: number) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error('Failed to delete data');
  }
  return res.json();
}

export default function Page({ searchParams: { page } }: { searchParams: { page: number } }) {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  // const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    if (page > 0) {
      setCurrentPage(page);
    }

    async function fetchData() {
      const { users, pagination: { currentPage, totalPages, totalUsers } } = await getUsers(page);
      setUsersData(users);
      // setCurrentPage(currentPage);
      setTotalPages(totalPages);
      // setTotalUsers(totalUsers);
    }
    fetchData();
  }, [page]);

  const onDeleteHandler = async (id: number) => {
    if (confirm("Are you sure to delete the user ?")) {
      await deleteUser(id);
      const { users } = await getUsers(page);
      setUsersData(users);
    }
  };

  const renderedUsers = usersData.map(({ id, name, email, role }: UserData) => {
    return (
      <tr key={id}>
        <td className="border px-4 py-2">{name}</td>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2">{role}</td>
        <td className="border px-4 py-2">
          <Link href={`/users/view/${id}`}  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">View</Link>{' '}
          <Link href={`/users/edit/${id}`}  className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update</Link>{' '}
          <button onClick={() => onDeleteHandler(id)}  className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold underline">User List</h1>
        <br />
        <Link href={`/users/new`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">New</Link>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderedUsers}
          </tbody>
        </table>
        <div className="flex justify-start mt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}