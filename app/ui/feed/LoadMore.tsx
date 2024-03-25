'use client'
import { getPosts } from '@/app/lib/api'
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import FeedCard, { FeedCard_Skeleton } from './feed-card'
import { Feed_Post } from '@/app/lib/type'
let page = 1
function LoadMore() {
  const { ref, inView } = useInView()
  const [data, setData] = useState<Feed_Post[]>([])
  // useEffect(() => {
  //   if (inView) {
  //     getPosts(4, page).then((res) => {
  //       setData([...data, ...res])
  //     })
  //     console.log('data', data)
  //     page++
  //   }
  // }, [inView, data])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (inView) {
      setIsLoading(true)
      // Add a delay of 500 milliseconds
      const delay = 500

      const timeoutId = setTimeout(() => {
        getPosts(4, page).then((res) => {
          setData([...data, ...res])
          console.log('data', data)
          page++
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
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  )
}

export default LoadMore
