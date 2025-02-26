import { NextResponse, NextRequest } from "next/server";

export function cspMiddleware(request: NextRequest) { 

    const array = new Uint8Array(16);
    self.crypto.getRandomValues(array);
    const nonce = btoa(String.fromCharCode(...array));

    const csp = `
        default-src 'self'; 
        script-src 'self' 'nonce-${nonce}'; 
        style-src 'self' 'unsafe-inline'; 
        img-src 'self' data:; 
        font-src 'self'; 
        connect-src 'self'; 
        media-src 'self'; 
        object-src 'none'; 
        frame-src 'none'; 
        base-uri 'self'; 
        form-action 'self'; 
        manifest-src 'self'; 
        worker-src 'self'; 
        frame-ancestors 'none';`;

    const response = NextResponse.next();
    response.headers.set('Content-Security-Policy', csp.replace(/\s{2,}/g, ' ').trim());

    response.headers.set('x-nonce', nonce);

    return response.headers;
}