'use client'

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const roles = ['user', 'admin'];

interface UserData {
  name: string;
  email: string;
  role: string;
}

async function newUser(data: UserData) {
  const res = await fetch(`/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


export default function Page() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    const { user: { id } } = await newUser(formData);
    console.log(`******user`, id);
    window.location.href = `/users/view/${id}`;
  };

  return (
    <>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name:</label>
            <input className="w-full px-3 py-2 border rounded" type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input className="w-full px-3 py-2 border rounded" type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Role:</label>
            <select className="w-full px-3 py-2 border rounded" name="role" value={formData.role} onChange={handleChange}>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password:</label>
            <input className="w-full px-3 py-2 border rounded" type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">New User</button>
        </form>
      </div>
    </>
  )
}
