'use client'
import { getPosts, getPostsByCategory } from '@/app/lib/api'
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import FeedCard, { FeedCard_Skeleton } from './FeedCard'
import { Feed_Post } from '@/app/lib/type'
let page = 2
const LoadMoreByCategory = ({ category }: { category: string }) => {
  const { ref, inView } = useInView()
  const [data, setData] = useState<Feed_Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMoreData, setHasMoreData] = useState(true)
  useEffect(() => {
    if (inView && hasMoreData) {
      setIsLoading(true)
      const delay = 200
      const timeoutId = setTimeout(() => {
        getPostsByCategory(category, 8, page).then((res) => {
          if (res.length === 0) setHasMoreData(false)
          else {
            setData([...data, ...res])
            page++
          }
        })
        setIsLoading(false)
      }, delay)

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId)
    }
  }, [inView, data, isLoading])
  return (
    <>
      {data.map((feed) => (
        <Suspense fallback={<FeedCard_Skeleton />} key={feed.id}>
          {/* <FeedCard_Skeleton /> */}
          <FeedCard data={feed} />
        </Suspense>
      ))}
      {isLoading && (
        <section className="flex justify-center items-center w-full">
          <div ref={ref}>
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
              priority
            />
          </div>
        </section>
      )}
    </>
  )
}

export default LoadMoreByCategory
