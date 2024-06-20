'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  username: string;
  isAdmin: boolean;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userCookie = Cookies.get('user');
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      }
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    Cookies.remove('user');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" className="text-white text-lg">Sosyal Turnuva</Link>
      <div>
        {user ? (
          <div className="flex items-center">
            {user.isAdmin && <Link href="/admin/dashboard" className="text-white mr-4">Admin Paneli</Link>}
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
