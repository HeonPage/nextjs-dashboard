import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { inter } from '@/app/ui/fonts'
import { fetchCardData } from '../../lib/data'
import { Suspense } from 'react'
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from '@/app/ui/skeletons'
import CardWrapper from '@/app/ui/dashboard/cards'
import { Metadata } from 'next'
import { Feed_Post } from '@/app/lib/type'
import { getPosts } from '@/app/lib/api'
import Link from 'next/link'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import FeedCard, { FeedCard_Skeleton } from '@/app/ui/feed/FeedCard'
import LoadMore from '@/app/ui/feed/LoadMore'
import FeedCardList from '@/app/ui/feed/FeedCardList'

export const metadata: Metadata = {
  title: 'Feed',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string
    take?: number
  }
}) {
  const category = ''
  const take = Number(searchParams?.take) || 8
  const page = Number(searchParams?.page) || 1
  const fetch: Feed_Post[] = await getPosts(take, page)

  return (
    <div>
      {/* Post */}
      <div className="w-full xl:w-4/5">
        <div className="divide-y">
          {fetch.map((feed) => (
            <Suspense fallback={<FeedCard_Skeleton />} key={feed.id}>
              <FeedCardList data={feed} />
            </Suspense>
          ))}
          <LoadMore />
        </div>
      </div>
    </div>
  )
}
