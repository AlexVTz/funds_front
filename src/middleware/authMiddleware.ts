import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cookie from 'cookie';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || 'tok');

const validateExpireTime = async (token :  string) => {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && currentTime > payload.exp) {
        return false;
    }

    return true;
}

const requiresLogin = () => {
    return ['/welcome', '/api', '/']
}

export async function authMiddleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    console.log('pathname', pathname)

    if (!pathname) {
        return NextResponse.next();
    }

    const validatePage = requiresLogin().includes(pathname);
    console.log('validatePage', validatePage)
    // Apply authentication check only to the /welcome route
    if (validatePage) {
        const cookies = cookie.parse(req.headers.get('cookie') || '');
        const token = cookies.token;
        console.log('token', token)
        if (!token) {
            return NextResponse.redirect(new URL('/signup', req.url));
        }

        if (!await validateExpireTime(token)) {
            const response = NextResponse.redirect(new URL('/signup', req.url));
            response.cookies.delete('token');
            return response;
        }
         
        // Set the authorization header
        return NextResponse.next();
    } else if (pathname === '/login' || pathname === '/signup') {
        console.log('enter')
        const cookies = cookie.parse(req.headers.get('cookie') || '');
        const token = cookies.token;

        if (token && await validateExpireTime(token)) {
            return NextResponse.redirect(new URL('/welcome', req.url));
        }
    }
    console.log('enter second')
    return NextResponse.next();
}

/* export const config = {
    matcher: ['/welcome', '/login', '/signup', '/api'],
} */