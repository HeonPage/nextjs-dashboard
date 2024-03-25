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
import FeedCard, { FeedCard_Skeleton } from '@/app/ui/feed/feed-card'
import LoadMore from '@/app/ui/feed/LoadMore'

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
  const take = Number(searchParams?.take) || 4
  const page = Number(searchParams?.page) || 1
  const fetch: Feed_Post[] = await getPosts(take, page)

  let renderPosts
  // if (!fetch) {
  //   renderPosts = <p className="text-lg text-center">로딩중...</p>
  // } else if (fetch.length === 0) {
  //   renderPosts = (
  //     <p className="text-lg text-center">작성된 포스트가 없습니다.</p>
  //   )
  // } else {
  //   renderPosts = fetch.map((feed) => <FeedCard data={feed} key={feed.id} />)
  // }

  return (
    <div>
      <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>Feed</h1>
      <div className="mt-6">
        <div className="flex max-w-5xl px-4 pt-5 mx-auto">
          {/* Post */}
          <div className="w-full lg:w-8/12">
            <div className="bg-white rounded">
              {fetch.map((feed) => (
                <Suspense fallback={<FeedCard_Skeleton />} key={feed.id}>
                  <FeedCard data={feed} />
                </Suspense>
              ))}
              <LoadMore />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
