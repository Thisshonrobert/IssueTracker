import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default {
  providers: [Google,GitHub],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
} satisfies NextAuthConfig

// if the github authentication doesnt work 
//  providers: [
//     Google(),
//     GitHub({ allowDangerousEmailAccountLinking: true }),
//   ],