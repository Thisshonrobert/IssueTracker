import NextAuth from "next-auth"
import authConfig from "./auth.config"
export const config = {
  matcher: [
    '/issues/new',
 '/issues/edit/:id+'
  ]
};

export const { auth: middleware } = NextAuth(authConfig)

// to manually redirect user 
// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname === "/issues/new") {
//     const newUrl = new URL("/login", req.nextUrl.origin)
//     return Response.redirect(newUrl)
//   }
// })