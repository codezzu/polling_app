import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const survey = await prisma.survey.findUnique({
        where: { id: Number(id) },
        include: {
          questions: true,
        },
      });

      if (!survey) {
        return res.status(404).json({ error: 'Survey not found' });
      }

      res.status(200).json(survey);
    } catch (error) {
      console.error('Failed to fetch survey', error);
      res.status(500).json({ error: 'Failed to fetch survey' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
