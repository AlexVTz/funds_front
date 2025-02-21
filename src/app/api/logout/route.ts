import { NextResponse, NextRequest} from 'next/server';

export function POST() {
    const response = NextResponse.json({ message: 'Logged out successfully' });


    response.cookies.delete('token');

    return response;
}