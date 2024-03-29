'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const errorModal = async () => {
    Modal.error({
      title: '로그인이 만료되었습니다.',
      content: '로그인 페이지로 이동합니다.',
      onOk() {
        router.push('/')
      },
    })
  }
  useEffect(() => {
    errorModal()
  }, [])

  return (
    <>
      <main className="flex h-full flex-col items-center justify-center">
        <h2 className="text-center">Loading</h2>
      </main>
    </>
  )
}
