import { BoardListItem, BoardListItem_Skeleton } from './BoardListItem'
import Link from 'next/link'
import React, { useState } from 'react'

interface IBoardListProps {
  posts: any
  noticePosts: any
  categories: Array<any>
  isSearch: boolean
}

export function BoardList({
  posts,
  noticePosts,
  categories,
  isSearch,
}: IBoardListProps) {
  return (
    <>
      <div role="main">
        <div className="flex flex-col gap-3">
          <div className="min-w-full border dark:border-gray-500">
            <div>
              <div className="w-full relative flex flex-row border-b">
                <div className="w-[8%] board-header">분류</div>
                <div className="w-[60%] board-header">제목</div>
                <div className="w-[17%] board-header">작성자</div>
                <div className="w-[5%] board-header">추천</div>
                <div className="w-[10%] board-header">작성일</div>
              </div>
            </div>
            <div>
              {posts.map((item: any) => (
                <BoardListItem
                  key={item.id}
                  item={item}
                  boardName={'community'}
                  isNotice={false}
                />
                // <BoardListItem_Skeleton />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function BoardList_Skeleton() {
  return <>loading</>
}
