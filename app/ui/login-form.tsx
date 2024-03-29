'use client'
import { inter } from '@/app/ui/fonts'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { Button } from './button'
import { useFormState, useFormStatus } from 'react-dom'
// import { authenticate } from '@/app/lib/actions'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { axiosNext, signIn } from '../lib/api'

// export default function LoginForm() {
const LoginForm = () => {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  interface ISignIn {
    username: string
    password: string
    stay: boolean
  }

  const { register, handleSubmit } = useForm<ISignIn>()
  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsSubmitting(true)
    await signIn(data.username, data.password)
    setIsSubmitting(false)
    router.push('/dashboard')
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`${inter.className} mb-3 text-2xl`}>
            Please log in to continue.
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Username
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="username"
                  type="username"
                  // name="username"
                  placeholder="Enter your email address"
                  required
                  {...register('username')}
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  // name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                  {...register('password')}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <LoginButton />
          <div className="flex h-8 items-end space-x-1">
            {/* Add form errors here */}
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            ></div>
          </div>
        </div>
      </form>
    </>
  )
}

const LoginButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  )
}

export default LoginForm
