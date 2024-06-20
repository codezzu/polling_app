'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Question {
  id: number;
  text: string;
}

interface Survey {
  id: number;
  title: string;
  questions: Question[];
}

const SurveyDetailPage = () => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const params = useParams();

  useEffect(() => {
    if (params && params.id) {
      const fetchSurvey = async () => {
        try {
          const response = await fetch(`/api/surveys/${params.id}`);
          const data = await response.json();
          setSurvey(data);
        } catch (error) {
          console.error('Failed to fetch survey', error);
        }
      };

      fetchSurvey();
    }
  }, [params]);

  if (!survey) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center mt-4">{survey.title}</h1>
      <ul className="mt-4">
        {survey.questions.map((question) => (
          <li key={question.id} className="border p-4 mb-4">
            {question.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyDetailPage;
