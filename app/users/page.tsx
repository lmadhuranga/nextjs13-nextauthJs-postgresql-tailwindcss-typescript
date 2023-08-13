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
    if(page>0) {
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
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td>
          <Link href={`/users/view/${id}`}>View </Link> |{' '}
          <Link href={`/users/edit/${id}`}> Update </Link> |{' '}
          <button onClick={() => onDeleteHandler(id)}>Delete</button>
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
          {renderedUsers}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}