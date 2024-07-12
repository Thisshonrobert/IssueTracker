import "./custom.css";
import "@radix-ui/themes/styles.css";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container, Theme } from "@radix-ui/themes";
import NavBar from "./NavBar";
import AuthProvider from "./auth/AuthProvider";
import ClientQuery from "./ClientQuery";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ClientQuery>
          <AuthProvider>
            <Theme accentColor="blue" grayColor="gray">
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </ClientQuery>
      </body>
    </html>
  );
}
// ThemePanel from radix is used to set a user defined theme
//inter.varible to apply the google font
//container is used for centeralizing and responsiveness of  the contents
