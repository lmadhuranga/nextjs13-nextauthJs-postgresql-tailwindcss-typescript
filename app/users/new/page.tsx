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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">New User</button>
      </form>
    </>
  )
}
