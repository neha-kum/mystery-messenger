import {NextRequest, NextResponse } from 'next/server'
 export { default } from "next-auth/middleware"
//to get token in middleware
import { getToken } from "next-auth/jwt"

export const config = { //file/paths where u want middleware to run
    matcher: [
      '/sign-in',
      '/sign-up',
      '/',
      '/dashboard/:path*',
      '/verify/:path*'
    ]
  }

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({req : request})
    console.log("Token:", token);

    const url = request.nextUrl

    // If the user is authenticated (has a token), they are redirected to /dashboard when trying to access /sign-in, /sign-up, or /verify.

    // if(token && 
    //     (url.pathname.startsWith('/sign-in'))||
    //     (url.pathname.startsWith('/sign-up')) ||
    //     (url.pathname.startsWith('/verify')) ||
    //     (url.pathname.startsWith('/'))
    // ){
    //         return NextResponse.redirect(new URL('/dashboard', request.url))
    //     }

        if (!token && url.pathname.startsWith('/dashboard')) {
            console.log(token)
            return NextResponse.redirect(new URL('/sign-in', request.url));
          }
        
          return NextResponse.next();

//   return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more


//jane se pehle mil kr 
//handle requests before they reach pages or API routes
//handle redirects, authentication, and caching.