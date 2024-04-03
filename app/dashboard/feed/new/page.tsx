// 'use client' // only in App Router

import React from 'react'
import dynamic from 'next/dynamic'
import Search from '@/app/ui/feed/Search'
import CategorySelect from '@/app/ui/feed/CategorySelect'

const CustomEditor = dynamic(
  () => {
    return import('@/app/ui/feed/Editor')
  },
  { ssr: false },
)

async function Page({
  searchParams,
}: {
  searchParams?: {
    name?: string
    category?: string
  }
}) {
  const name = searchParams?.name || ''
  const category = searchParams?.category || ''
  console.log('1284701', category)
  return (
    <>
      <Search placeholder="카테고리를 입력해주세요" />
      <CategorySelect name={name} />
      <CustomEditor content={''} category={category} />
    </>
  )
}

export default Page
