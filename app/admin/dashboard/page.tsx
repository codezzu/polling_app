'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<string[]>(['']);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const parsedUser: User = JSON.parse(userCookie);
      setUser(parsedUser);
      if (!parsedUser.isAdmin) {
        router.push('/');
      }
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Kullanıcı bilgileri bulunamadı.');
      return;
    }

    const response = await fetch('/api/surveys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, questions, userId: user.id }),
    });

    if (response.ok) {
      alert('Anket oluşturuldu!');
      setTitle('');
      setQuestions(['']);
    } else {
      const errorData = await response.json();
      alert(`Anket oluşturma başarısız oldu: ${errorData.error}`);
    }
  };

  if (!user) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center mt-4">Admin Paneli</h1>
      <p className="text-center">Burada anket oluşturabilirsiniz.</p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="title">Anket Başlığı</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-400 p-2 text-black"
          />
        </div>
        {questions.map((question, index) => (
          <div className="mb-4" key={index}>
            <label className="block mb-1" htmlFor={`question-${index}`}>Soru {index + 1}</label>
            <input
              type="text"
              id={`question-${index}`}
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="w-full border border-gray-400 p-2 text-black"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion} className="bg-blue-500 text-white py-1 px-4 rounded mb-4">Soru Ekle</button>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Anket Oluştur</button>
      </form>
    </div>
  );
};

export default Dashboard;
