import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware} from './middleware/authMiddleware';

export function middleware(req: NextRequest) {
    return authMiddleware(req);
}