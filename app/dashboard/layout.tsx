import SideNav from '@/app/ui/dashboard/sidenav'
import { Metadata } from 'next'
import { Suspense } from 'react'
import Nav from '../ui/nav'
import Toast from '../ui/toast'

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense>
        <Nav />
      </Suspense>
      <div className="flex h-screen flex-col md:mt-16 md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-1 mt-10 md:mt-0 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </div>
  )
}
