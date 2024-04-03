import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import { inter } from '@/app/ui/fonts'
import { Suspense } from 'react'
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from '@/app/ui/skeletons'
import CardWrapper from '@/app/ui/dashboard/cards'
import { Metadata } from 'next'
import { Feed_Post } from '@/app/lib/type'
import { getPost, getPosts } from '@/app/lib/api'
import Link from 'next/link'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import FeedCard, { FeedCard_Skeleton } from '@/app/ui/feed/FeedCard'
import LoadMore from '@/app/ui/feed/LoadMore'

export const metadata: Metadata = {
  title: 'Feed',
}

export default async function Page({
  params,
}: {
  params: { category: string; identifier: string }
}) {
  const category = params.category
  const identifier = params.identifier
  const fetch: Feed_Post = await getPost(category, identifier)
  return (
    <div>
      {/* Post */}
      <div className="w-full md:w-8/12">
        <div className="divide-y">
          <Suspense fallback={<FeedCard_Skeleton />} key={fetch.id}>
            <FeedCard data={fetch} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
