'use client'
import clsx from 'clsx'
import { Feed_Category } from '../../lib/type'
import { usePathname, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useRouter } from 'next/navigation'
import { boolean } from 'zod'
import { useEffect, useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function CategorySelectButton({ data }: { data: Feed_Category }) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const params = new URLSearchParams(searchParams)
  const flag = searchParams.get('category')
  const handleSearch = useDebouncedCallback((term) => {
    if (term) {
      params.set('category', term)
    } else {
      params.delete('category')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  useEffect(() => {
    if (flag == data.name) setIsActive(true)
    else setIsActive(false)
  }, [flag])

  return (
    <button
      onClick={() => {
        handleSearch(data.name)
      }}
      className={`flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 hover:text-white border-sky-100 border-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${
        isActive
          ? 'bg-blue-500 text-white'
          : ' bg-blue-100 text-black hover:bg-blue-400 '
      }`}
    >
      {data.name}
    </button>
  )
}
