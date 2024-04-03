import AcmeLogo from '@/app/ui/acme-logo'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import LoginForm from './ui/login-form'
import { credentialByToken } from './lib/api'
import { User } from './lib/type'
import { RedirectType, redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Page() {
  const user = await credentialByToken()
  if (user) redirect('/dashboard')
  return (
    <div>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-96">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
              <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                <div className="w-32 text-white md:w-36">
                  <AcmeLogo />
                </div>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="flex-grow mt-10 md:mt-0 md:overflow-y-auto">
          <div className="flex flex-col items-center justify-center p-1 md:w-3/5 md:px-4">
            {/* Add Hero Images Here */}
            <Image
              src={'/hero-desktop.png'}
              width={1000}
              height={760}
              className="hidden md:block md:min-w-[500px]"
              alt="desktop version"
            />
            <Image
              src="/hero-mobile.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshot of the dashboard project showing mobile version"
            />{' '}
            {/* Add Hero Images Here */}
            <Image
              src={'/hero-desktop.png'}
              width={1000}
              height={760}
              className="hidden md:block"
              alt="desktop version"
            />
            <Image
              src="/hero-mobile.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshot of the dashboard project showing mobile version"
            />{' '}
            {/* Add Hero Images Here */}
            <Image
              src={'/hero-desktop.png'}
              width={1000}
              height={760}
              className="hidden md:block"
              alt="desktop version"
            />
            <Image
              src="/hero-mobile.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshot of the dashboard project showing mobile version"
            />{' '}
            {/* Add Hero Images Here */}
            <Image
              src={'/hero-desktop.png'}
              width={1000}
              height={760}
              className="hidden md:block"
              alt="desktop version"
            />
            <Image
              src="/hero-mobile.png"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshot of the dashboard project showing mobile version"
            />
          </div>
        </div>
      </div>
    </div>

    // <main className="flex min-h-screen flex-col p-6">
    //   <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
    //     {/* <AcmeLogo /> */}
    //     <AcmeLogo />
    //   </div>
    //   <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
    //     <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
    //       <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
    //         <strong>Welcome to Acme.</strong> This is the example for the{' '}
    //         <a href="https://nextjs.org/learn/" className="text-blue-500">
    //           Next.js Learn Course
    //         </a>
    //         , brought to you by Vercel.
    //       </p>
    //       <Link
    //         href="/login"
    //         className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
    //       >
    //         <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
    //       </Link>
    //     </div>
    //     <div className="flex items-center justify-center p-1 md:w-3/5 md:px-28 md:py-12">
    //       {/* Add Hero Images Here */}
    //       <Image
    //         src={'/hero-desktop.png'}
    //         width={1000}
    //         height={760}
    //         className="hidden md:block"
    //         alt="desktop version"
    //       />
    //       <Image
    //         src="/hero-mobile.png"
    //         width={560}
    //         height={620}
    //         className="block md:hidden"
    //         alt="Screenshot of the dashboard project showing mobile version"
    //       />
    //     </div>
    //   </div>
    // </main>
  )
}
