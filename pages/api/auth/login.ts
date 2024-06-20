import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const { rows } = await sql`
        SELECT * FROM users WHERE username = ${username}
      `;
      const user = rows[0];

      if (user && (await bcrypt.compare(password, user.password))) {
        res.setHeader('Set-Cookie', serialize('user', JSON.stringify(user), { path: '/', httpOnly: true, sameSite: 'strict' }));
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
