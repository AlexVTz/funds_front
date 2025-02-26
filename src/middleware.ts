import type { NextRequest } from "next/server";
import { authMiddleware } from "./middleware/authMiddleware";

export async function middleware(req: NextRequest) {
  return authMiddleware(req);

  // Apply CSP middleware first to set the nonce
  //const cspResponse = cspMiddleware(req);

  // Apply Auth middleware
  /* const authResponse = await authMiddleware(req);
    console.log(authResponse) */

  // If authMiddleware returns a redirect response, return it immediately
  /* if (authResponse) {
        return authResponse;
    } */

  // Combine responses
  //const response = NextResponse.next();

  // Merge headers from both middlewares
  /* cspResponse.headers.forEach((value, key) => {
        response.headers.set(key, value);
    });

    if (authResponse && authResponse instanceof NextResponse) {
        authResponse.headers.forEach((value, key) => {
            response.headers.set(key, value);
        });
    
    }

    return response; */
}
