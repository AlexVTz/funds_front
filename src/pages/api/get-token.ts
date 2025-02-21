import type { NextApiRequest, NextApiResponse } from 'next';
//import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) { 
    const token = req.cookies['token'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).json({ token });
}