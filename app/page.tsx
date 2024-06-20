'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Survey {
  id: number;
  title: string;
  questions: { id: number; text: string }[];
}

const HomePage = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('/api/surveys');
        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        console.error('Failed to fetch surveys', error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center mt-4">Anketler</h1>
      <ul className="mt-4">
        {surveys.map((survey) => (
          <li key={survey.id} className="border p-4 mb-4">
            <h2 className="text-lg font-semibold">
              <Link href={`/surveys/${survey.id}`}>
                {survey.title}
              </Link>
            </h2>
            <ul className="mt-2">
              {survey.questions.map((question) => (
                <li key={question.id}>{question.text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
