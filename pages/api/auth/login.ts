import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request method:', req.method); // Debug: HTTP yöntemini logla

  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        res.setHeader(
          'Set-Cookie',
          serialize('user', JSON.stringify(user), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 hafta
          })
        );
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login failed', error);
      res.status(500).json({ error: 'Login failed', details: error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
