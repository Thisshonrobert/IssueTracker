import NextAuth from "next-auth"
import authConfig from "./auth.config"
export const config = {
  matcher: [
    '/issues/new'
]  
};

 
export const { auth: middleware } = NextAuth(authConfig)

