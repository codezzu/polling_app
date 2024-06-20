'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push('/auth/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center">Kayıt Ol</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="username">Kullanıcı Adı</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-gray-400 p-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Şifre</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-400 p-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
