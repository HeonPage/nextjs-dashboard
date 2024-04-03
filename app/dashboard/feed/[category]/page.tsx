import { Suspense } from 'react'
import { Metadata } from 'next'
import { Feed_Post } from '@/app/lib/type'
import { getPostsByCategory } from '@/app/lib/api'
import { FeedCard_Skeleton } from '@/app/ui/feed/FeedCard'
import LoadMore from '@/app/ui/feed/LoadMore'
import FeedCardList from '@/app/ui/feed/FeedCardList'
import LoadMoreByCategory from '@/app/ui/feed/LoadMoreByCategory'
import { Button } from 'antd'

export const metadata: Metadata = {
  title: 'Feed',
}

export default async function Page({
  params,
}: {
  params: { category: string; take: number; page: number }
}) {
  const category = params?.category || ''
  const take = Number(params?.take) || 8
  const page = Number(params?.page) || 0
  const fetch: Feed_Post[] = await getPostsByCategory(category, take, page)

  return (
    <div>
      {/* Post */}
      <div className="w-full md:w-8/12">
        <div className="divide-y">
          {fetch.map((feed) => (
            <Suspense fallback={<FeedCard_Skeleton />} key={feed.id}>
              <FeedCardList data={feed} />
            </Suspense>
          ))}
          <LoadMoreByCategory category={category} />
        </div>
      </div>
    </div>
  )
}
