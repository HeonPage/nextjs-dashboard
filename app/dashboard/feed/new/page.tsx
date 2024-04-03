'use client' // only in App Router

import React from 'react'
import dynamic from 'next/dynamic'

const CustomEditor = dynamic(
  () => {
    return import('@/app/ui/feed/Editor')
  },
  { ssr: false },
)

function Page() {
  return <CustomEditor props={undefined} />
}

export default Page
