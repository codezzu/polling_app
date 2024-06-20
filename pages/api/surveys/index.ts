import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, questions, userId } = req.body;

    if (!title || !questions || !userId) {
      return res.status(400).json({ error: 'Title, questions, and userId are required' });
    }

    try {
      const survey = await prisma.survey.create({
        data: {
          title,
          userId,
          questions: {
            create: questions.map((text: string) => ({ text })),
          },
        },
      });
      return res.status(201).json({ message: 'Survey created', survey });
    } catch (error) {
      console.error('Survey creation failed', error);
      return res.status(500).json({ error: 'Survey creation failed', details: error });
    }
  } else if (req.method === 'GET') {
    try {
      const surveys = await prisma.survey.findMany({
        include: {
          questions: true,
        },
      });
      return res.status(200).json(surveys);
    } catch (error) {
      console.error('Failed to fetch surveys', error);
      return res.status(500).json({ error: 'Failed to fetch surveys' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
