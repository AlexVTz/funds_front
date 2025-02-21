import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            res.setHeader('Set-Cookie', cookie.serialize('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60, // 1 week
                sameSite: 'strict',
                path: '/',
            }));

            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: result.error || 'Login failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}