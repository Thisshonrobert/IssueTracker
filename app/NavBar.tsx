'use client'
import React from 'react';
import Link from 'next/link';
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { signIn, useSession,signOut} from "next-auth/react";
import { Box, Button, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname(); // gives the path name 
    const {status, data: session } = useSession();
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
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors":
                        true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Button color='crimson' onClick={() => signOut()}>Sign out</Button>
            )}
            {status === "unauthenticated" && (
              <Button color='green' onClick={() => signIn()}>Signin</Button>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;