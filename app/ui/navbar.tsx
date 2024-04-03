'use client'

import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { User } from '../lib/type'
import { LuLogOut } from 'react-icons/lu'
import { signOut } from '../lib/api'
import React, { useState } from 'react'
import { Button, Drawer } from 'antd'
import Link from 'next/link'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Playground', href: '/playground' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ user }: { user: User }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  return (
    <>
      <div className="navbar fixed top-0 w-full z-10 bg-white shadow-sm">
        <Disclosure as="nav" className="bg-white shadow-sm">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        className="text-gray-100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="100%"
                          height="100%"
                          rx="16"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            pathname === item.href
                              ? 'border-slate-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                          )}
                          aria-current={
                            pathname === item.href ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <Menu as="div" className="relative ml-3">
                      <div className="flex flex-row gap-2">
                        <Link href={'/dashboard/feed/new'}>
                          <Button>+ Create</Button>
                        </Link>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={'https://avatar.vercel.sh/leerob'}
                            // src={user?.image || 'https://avatar.vercel.sh/leerob'}
                            height={32}
                            width={32}
                            alt={`{'placeholder'} avatar`}
                            // alt={`${user?.name || 'placeholder'} avatar`}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <button
                              className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              // onClick={() => signOut()}
                            >
                              <div className="flex gap-2 items-center">
                                <Image
                                  className="h-8 w-8 rounded-full"
                                  src={'https://avatar.vercel.sh/leerob'}
                                  // src={user?.image || 'https://avatar.vercel.sh/leerob'}
                                  height={32}
                                  width={32}
                                  alt={`{'placeholder'} avatar`}
                                  // alt={`${user?.name || 'placeholder'} avatar`}
                                />
                                <div className="flex flex-col items-start">
                                  <p>{user?.username}</p>
                                  <p className="text-xs">
                                    {user?.nick} / {user?.company}
                                  </p>
                                </div>
                              </div>
                            </button>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              className="flex w-full px-4 py-2 text-sm text-gray-700 items-center hover:bg-gray-100"
                              onClick={() => signOut()}
                            >
                              <LuLogOut className="w-8 h-4" />
                              <p>Log Out</p>
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    <div className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 gap-2">
                      <Button>+ Create</Button>
                      <Button onClick={showDrawer}>
                        <Bars3Icon
                          className="block h-4 w-4"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    </>
  )
}
