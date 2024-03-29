'use client'
import { inter } from '@/app/ui/fonts'
import { Feed_Post } from '@/app/lib/type'
import Image from 'next/image'
import { LuThumbsDown, LuThumbsUp } from 'react-icons/lu'
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'
import { IoChatboxEllipses } from 'react-icons/io5'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { vote } from '@/app/lib/api'
import { useEffect, useState } from 'react'

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
      console.log(error)
    }
  }

  return (
    <div
      className="rounded-xl bg-gray-50 p-2 m-2 shadow-sm"
      id={data.identifier}
    >
      <div className="flex flex-col p-4">
        <div className="flex gap-2 items-center">
          <Image
            className="h-4 w-4 rounded-full"
            src={`${
              data?.category.imageUrn || 'https://avatar.vercel.sh/leerob'
            }`}
            height={32}
            width={32}
            alt={`${data?.categoryName || 'placeholder'} avatar`}
          />
          <h6 className="text-sm">{data.username}</h6>
        </div>
        <div>
          <h3 className="text-lg font-medium">
            {data.id}.{data.title}
          </h3>
        </div>
      </div>
      <p
        className={`${inter.className}
          truncate rounded-xl bg-white px-4 py-8`}
      >
        {data.body}
      </p>
      <div className="flex gap-2 p-4">
        {/* 좋아요 */}
        <div
          className="p-1 flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer items-center hover:bg-gray-300"
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
        {/* 싫어요 */}
        <div
          className="p-1 flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer items-center hover:bg-gray-300"
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
    </div>
  )
}

export const FeedCard_Skeleton = () => {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  )
}

export default FeedCard
