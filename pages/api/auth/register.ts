import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const { rows } = await sql`
        INSERT INTO users (username, password)
        VALUES (${username}, ${hashedPassword})
        RETURNING *
      `;
      const user = rows[0];
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      res.status(500).json({ error: 'User creation failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
