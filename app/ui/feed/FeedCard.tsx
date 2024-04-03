'use client'
import { inter } from '@/app/ui/fonts'
import { Feed_Post } from '@/app/lib/type'
import Image from 'next/image'
import { LuShare, LuThumbsDown, LuThumbsUp } from 'react-icons/lu'
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2'
import { vote } from '@/app/lib/api'
import { useState } from 'react'
import { prettifyToYMDorTime } from '@/app/lib/utils'
import Link from 'next/link'
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

const FeedCard = ({ data }: { data: Feed_Post }) => {
  const [voteScore, setVoteScore] = useState(data.voteScore)
  const [userVote, setUserVote] = useState(data.userVote)

  const voteAction = async (value: number) => {
    if (value == userVote) value = 0

    try {
      await vote(data.categoryName, data.identifier, '', value).then((res) => {
        setVoteScore(res.voteScore)
        setUserVote(res.userVote)
      })
    } catch (error) {
      console.log('FeedCard Vote Error:', error)
    }
  }

  return (
    <div>
      <Link href={`/dashboard/feed/${data.categoryName}/${data.identifier}`}>
        <div
          className="p-2 md:p-4 my-1 md:rounded-3xl hover:bg-gray-50 hover:cursor-pointer"
          id={data.identifier}
        >
          <div className="flex flex-col">
            <div className="flex gap-2 items-center mb-2">
              <Image
                className="h-5 w-5 rounded-full"
                src={`${
                  data?.category.imageUrn || 'https://avatar.vercel.sh/leerob'
                }`}
                height={32}
                width={32}
                alt={`${data?.categoryName || 'placeholder'} avatar`}
              />
              <h6 className="text-xs">/{data.categoryName}</h6>
              <h6 className="text-xs">{data.username}</h6>
              <h6 className="text-xs">
                {prettifyToYMDorTime(data.updated_at)}
              </h6>
            </div>
            <div>
              <h3 className="text-md font-medium">
                {data.id}.{data.title}
              </h3>
            </div>
          </div>
          <p
            className={`${inter.className}
          w-full text-sm py-2 break-words`}
          >
            {data.body}
          </p>
          <div className="flex justify-start gap-2">
            {/* 좋아요 & 싫어요*/}
            <div className="flex gap-2 px-3 py-1 items-center bg-gray-100 rounded-3xl">
              <div
                className="p-1 flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer items-center hover:bg-gray-200"
                onClick={() => {
                  voteAction(1)
                }}
              >
                {userVote === 1 ? (
                  <LuThumbsUp className="w-4 hover:cursor-pointer text-red-500" />
                ) : (
                  <LuThumbsUp className="w-4 hover:cursor-pointer" />
                )}
              </div>
              <p className="text-xs font-bold">{voteScore}</p>
              <div
                className="p-1 flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer items-center hover:bg-gray-200"
                onClick={() => {
                  voteAction(-1)
                }}
              >
                {userVote === -1 ? (
                  <LuThumbsDown className="w-4 hover:cursor-pointer text-blue-500" />
                ) : (
                  <LuThumbsDown className="w-4 hover:cursor-pointer" />
                )}
              </div>
            </div>
            {/* 댓글 */}
            <div className="flex gap-2 px-3 py-1 items-center bg-gray-100 hover:bg-gray-200 hover:cursor-pointer rounded-3xl">
              <div
                className="p-1 flex justify-center w-6 mx-auto text-gray-400 rounded items-center"
                onClick={() => {}}
              >
                <HiOutlineChatBubbleLeft className="w-4 hover:cursor-pointer" />
              </div>
              <p className="text-xs font-bold">{voteScore}</p>
            </div>
            {/* 공유 */}
            <div className="flex gap-2 px-3 py-1 items-center bg-gray-100 hover:bg-gray-200 hover:cursor-pointer rounded-3xl">
              <div
                className="p-1 flex justify-center w-6 mx-auto text-gray-400 rounded items-center"
                onClick={() => {}}
              >
                <LuShare className="w-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export const FeedCard_Skeleton = () => {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-3xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center rounded-3xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  )
}

export default FeedCard
