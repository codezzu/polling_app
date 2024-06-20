import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request method:', req.method); // Debug: HTTP yöntemini logla

  if (req.method === 'POST') {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      console.error('User creation failed', error);
      res.status(500).json({ error: 'User creation failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
