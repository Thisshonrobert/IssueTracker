// RootLayout.tsx
import './custom.css';
import '@radix-ui/themes/styles.css';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Container, Theme } from '@radix-ui/themes';
import NavBar from './NavBar';
import AuthProvider from './auth/AuthProvider';
import ClientQuery from './ClientQuery';
import { ThemeProvider } from './theme/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'IssueTracker',
  description: 'Help in managing Issues',
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
            <ThemeProvider attribute="class" defaultTheme="dark">
              <Theme accentColor="blue" grayColor="gray" >
                <NavBar />
                <main className="p-5">
                  <Container>{children}</Container>
                </main>
              </Theme>
            </ThemeProvider>
          </AuthProvider>
        </ClientQuery>
      </body>
    </html>
  );
}
