'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userCookie = document.cookie.split('; ').find((row) => row.startsWith('user='));
      if (userCookie) {
        setUser(JSON.parse(decodeURIComponent(userCookie.split('=')[1])));
      }
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" className="text-white text-lg">Sosyal Turnuva</Link>
      <div>
        {user ? (
          <div className="flex items-center">
            <span className="text-white mr-4">Merhaba {user.username}, hoşgeldin!</span>
            <button onClick={handleLogout} className="bg-red-500 text-white py-1 px-2 rounded">Çıkış Yap</button>
          </div>
        ) : (
          <div>
            <Link href="/auth/login" className="text-white mr-4">Giriş Yap</Link>
            <Link href="/auth/register" className="text-white">Kayıt Ol</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
