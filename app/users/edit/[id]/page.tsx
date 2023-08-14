'use client'

import { useEffect, useState } from 'react';

const roles = ['user', 'admin'];

async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`);

  if (!res.ok) {
    // Todo:: Add errorBoundry
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function updateUser(id: string, data: UserData) {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
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

interface UserData {
  name: string;
  email: string;
  role: string;
}

export default function Page({ params: { id } }: { params: { id: string } }) {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
  });

  useEffect(() => {
    const user = getUser(id);
    user.then(({ user: { name, email, role } }: { user: UserData }) => {
      setFormData({
        name,
        email,
        role,
        password: '',
      });
    });
  }, [])

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
    const updatedUser = await updateUser(id, formData);
    // Todo:: redirect to list page
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
        <button type="submit">Update User</button>
      </form>
    </>
  )
}
