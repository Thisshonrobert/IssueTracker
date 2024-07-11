import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  
} satisfies NextAuthConfig