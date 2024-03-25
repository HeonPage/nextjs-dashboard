import { inter } from '@/app/ui/fonts'
import { Feed_Post } from '@/app/lib/type'
import Image from 'next/image'
// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

export default function FeedCard({ data }: { data: Feed_Post }) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 m-2 shadow-sm">
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
    </div>
  )
}

export function FeedCard_Skeleton() {
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
    // <div className="rounded-xl bg-gray-50 p-2 m-2 shadow-sm">
    //   <div className="flex flex-col p-4">
    //     <div className="flex gap-2 items-center">

    //       <Image
    //         className="h-4 w-4 rounded-full"
    //         src={`${
    //           data?.category.imageUrn || 'https://avatar.vercel.sh/leerob'
    //         }`}
    //         height={32}
    //         width={32}
    //         alt={`${data?.categoryName || 'placeholder'} avatar`}
    //       />
    //       <h6 className="text-sm">{data.username}</h6>
    //     </div>
    //     <div>
    //       <h3 className="text-lg font-medium">{data.title}</h3>
    //     </div>
    //   </div>
    //   <p
    //     className={`${inter.className}
    //       truncate rounded-xl bg-white px-4 py-8`}
    //   >
    //     {data.body}
    //   </p>
    // </div>
  )
}
