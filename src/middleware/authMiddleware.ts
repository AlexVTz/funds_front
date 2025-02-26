import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cspMiddleware } from "./cspMiddleware";
import cookie from "cookie";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || "tok");

const validateExpireTime = async (token: string) => {
  const { payload } = await jwtVerify(token, SECRET_KEY);
  const currentTime = Math.floor(Date.now() / 1000);

  if (payload.exp && currentTime > payload.exp) {
    return false;
  }

  return true;
};

const requiresLogin = () => {
  return ["/welcome", "/api", "/"];
};

const csp = () => {
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

  return { csp, nonce };
};

export async function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const response = NextResponse.next();

  const { csp: cspHeader, nonce } = csp();
  response.headers.set(
    "Content-Security-Policy",
    cspHeader.replace(/\s{2,}/g, " ").trim()
  );

  response.headers.set("x-nonce", nonce);

  if (!pathname) {
    return NextResponse.next();
  }

  const validatePage = requiresLogin().includes(pathname);
  // Apply authentication check only to the /welcome route
  if (validatePage) {
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const token = cookies.token;
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!(await validateExpireTime(token))) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }

    // Set the authorization header
    return NextResponse.next();
  } else if (pathname === "/login" || pathname === "/signup") {
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const token = cookies.token;

    if (token && (await validateExpireTime(token))) {
      return NextResponse.redirect(new URL("/welcome", req.url));
    }
  }
  return response;
}

/* export const config = {
    matcher: ['/welcome', '/login', '/signup', '/api'],
} */
