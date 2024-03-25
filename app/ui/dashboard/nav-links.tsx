'use client'
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  RadioIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import React, { useState } from 'react'
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Radios',
    href: '/dashboard/radio',
    icon: RadioIcon,
    child: [
      { name: 'Document', href: '/dashboard/radio/document', icon: RadioIcon },
      {
        name: 'Transmitter',
        href: '/dashboard/radio/transmitter',
        icon: RadioIcon,
      },
    ],
  },
  {
    name: 'Feed',
    href: '/dashboard/feed',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
]

export default function NavLinks() {
  const pathname = usePathname()
  const [isShowing, setIsShowing] = useState(false)

  const toggle = () => {
    setIsShowing(!isShowing)
  }
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return link.child ? (
          <React.Fragment key={link.name}>
            <button
              onClick={toggle}
              className={`
              flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 md:mt-1
              ${pathname === link.href ? 'bg-sky-100 text-blue-600' : ''}
             `}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </button>
            {link.child.map((child) => {
              return (
                <Link
                  key={child.name}
                  href={child.href}
                  className={`
              flex grow items-center justify-center gap-0 rounded-md font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start
              ${pathname === child.href ? 'bg-sky-100 text-blue-600' : ''}
              ${
                isShowing
                  ? 'h-[32px] text-sm md:p-2 md:px-6 md:mt-1 '
                  : 'h-0 text-[0px]'
              }
             `}
                >
                  {child.name}
                </Link>
              )
            })}
          </React.Fragment>
        ) : (
          <Link
            key={link.name}
            href={link.href}
            className={`
              flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 md:mt-1 
              ${pathname === link.href ? 'bg-sky-100 text-blue-600' : ''}
             `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
