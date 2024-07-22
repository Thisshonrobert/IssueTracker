'use client';

import { Avatar, Box, Button, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import classnames from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBug } from 'react-icons/fa';
import ThemeSwitcher from './theme/ThemeSwitcher';

const NavBar = () => {
  const currentPath = usePathname(); // gives the path name
  const { status, data: session } = useSession();
  const Links = [
    {
      label: 'Dashboard',
      href: '/'
    },
    {
      label: 'Issues',
      href: '/issues/list'
    }
  ];
  if (currentPath === '/') {
    return null;
  }

  // Log session data to check the profile picture URL
  console.log('Session Data:', session);

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <ul className="flex space-x-6">
              {Links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames({
                      'text-zinc-300': link.href === currentPath,
                      'text-zinc-400': link.href !== currentPath,
                      'hover:text-zinc-800 transition-colors': true
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Flex gap='5'>
          <ThemeSwitcher/>
            {status === 'loading' ? (
              // Show a loading indicator while session data is being fetched
              <Button disabled >
                <Box width="24px" height="24px">
              <svg viewBox="0 0 64 64" fill="currentColor">
                <path d="M41.5 14c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S33 27.962 33 23 36.813 14 41.5 14zM56.289 43.609C57.254 46.21 55.3 49 52.506 49c-2.759 0-11.035 0-11.035 0 .689-5.371-4.525-10.747-8.541-13.03 2.388-1.171 5.149-1.834 8.07-1.834C48.044 34.136 54.187 37.944 56.289 43.609zM37.289 46.609C38.254 49.21 36.3 52 33.506 52c-5.753 0-17.259 0-23.012 0-2.782 0-4.753-2.779-3.783-5.392 2.102-5.665 8.245-9.472 15.289-9.472S35.187 40.944 37.289 46.609zM21.5 17c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S13 30.962 13 26 16.813 17 21.5 17z" />
              </svg>
            </Box>
            </Button>
            ) : status === 'authenticated' ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session?.user?.image || ''}
                    fallback={
                      <Box width="24px" height="24px">
                        <svg viewBox="0 0 64 64" fill="currentColor">
                          <path d="M41.5 14c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S33 27.962 33 23 36.813 14 41.5 14zM56.289 43.609C57.254 46.21 55.3 49 52.506 49c-2.759 0-11.035 0-11.035 0 .689-5.371-4.525-10.747-8.541-13.03 2.388-1.171 5.149-1.834 8.07-1.834C48.044 34.136 54.187 37.944 56.289 43.609zM37.289 46.609C38.254 49.21 36.3 52 33.506 52c-5.753 0-17.259 0-23.012 0-2.782 0-4.753-2.779-3.783-5.392 2.102-5.665 8.245-9.472 15.289-9.472S35.187 40.944 37.289 46.609zM21.5 17c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S13 30.962 13 26 16.813 17 21.5 17z" />
                        </svg>
                      </Box>
                    }
                    radius="full"
                    size="4"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>{session?.user?.email}</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onSelect={() => signOut()}>
                    Sign out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : (
              <Button color="green" onClick={() => signIn()}>
                Sign in
              </Button>
            )}
            
          </Flex>
          
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
