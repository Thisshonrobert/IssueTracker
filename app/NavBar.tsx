'use client'
import React from 'react';
import Link from 'next/link';
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname()
    const Links = [
        {
            label: 'Dashboard',
            href: '/'
        },
        {
            label: 'Issues',
            href: '/issues'
        }
    ];

    return (
        <nav className='flex space-x-6 border-b-2 mb-4 px-5 h-14 items-center'>
            <Link href="/">
                <FaBug />
            </Link>
            <ul className='flex space-x-6'>
                {
                    Links.map(link => 
                        <li key={link.href}>
                            <Link href={link.href} className={classnames({
                                'text-gray-900':currentPath===link.href,
                                'text-gray-500':currentPath!==link.href,
                                'transition-colors duration-200 font-bold text-xl':true
                            })}>
                                {link.label}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

export default NavBar;
