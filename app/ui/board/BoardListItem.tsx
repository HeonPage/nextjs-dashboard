import { Board_Post } from '@/app/lib/type'
import { prettifyToYMDorTime } from '@/app/lib/utils'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { FcApproval, FcLock } from 'react-icons/fc'
export function BoardListItem({
  item,
  boardName,
  isNotice,
}: {
  item: Board_Post
  boardName: string
  isNotice: boolean
}) {
  return (
    <>
      {/* Desktop */}
      <div className="desktop-visible">
        <div
          className="flex flex-row"
          // className={`flex flex-row border-b dark:border-gray-500 text-sm ${
          //   isNotice ? 'bg-gray-100 dark:bg-seiyondarksecondary' : ''
          // } ${
          //   item.id == router.query.id ? 'bg-slate-100 dark:bg-gray-700' : ''
          // }`}
        >
          <div className="w-[8%] h-[42px] pt-3 text-xs">
            <p className={`flex justify-center`}>
              <span className="text-gray-400 font-ellipsis">공지사항</span>
            </p>
          </div>
          <div className="w-[60%] pt-3">
            <Link href={''} passHref>
              <p>
                <button
                // className={`flex ${
                //   item.has_highlight == true ? 'font-extrabold' : ''
                // } ${
                //   item.downVoteShadow == true
                //     ? 'text-gray-200 dark:text-gray-700'
                //     : ''
                // }`}
                >
                  {item.title.length > 34
                    ? item.title.slice(0, 34) + '...'
                    : item.title}
                  {/* <span className="ml-1 text-seiyonblue">
                      [{item.n_comments}]
                    </span>
                    {item.job && (
                      <span className="ml-1 self-end">
                        <FcApproval size={18} className="mb-1" />
                      </span>
                    )}
                    {item.disableEditDelete && (
                      <span className="ml-1 self-end">
                        <FcLock size={18} className="mb-1" />
                      </span>
                    )} */}
                </button>
              </p>
            </Link>
          </div>
          <div className="w-[17%] text-xs text-gray-400">
            <div className="flex pl-2 justify-start">
              <div className="pt-2 flex-shrink-0">
                {/* <Image
                  width="25"
                  height="25"
                  src={`https://static.seiyon.net/images/${
                    isNotice ? 'none_santa' : item.avatar
                  }.png`}
                  alt="seiyonnet avatar image"
                /> */}
              </div>

              <Link href={`/message/?post_id=${item.id}`} passHref>
                <button className="ml-0.5 pt-3 pr-2 self-start font-ellipsis">
                  {item.nick}
                </button>
              </Link>
            </div>
          </div>
          <div className="w-[5%] pt-3 text-xs text-gray-400">
            {/* <p
              className={`flex justify-center ${
                item.n_upvotes > 0 ? 'text-red-500 dark:text-blue-500' : ''
              }`}
            >
              {item.n_upvotes}
            </p> */}
          </div>
          <div className="w-[10%] pt-3 text-xs text-gray-400">
            <p className={`flex justify-center`}>
              {prettifyToYMDorTime(item.created_at)}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export function BoardListItem_Skeleton() {
  return (
    <>
      {/* Mobile */}
      <div className="movile-visible">
        <div
          className={`h-[60px] p-2 overflow-hidden whitespace-nowrap text-ellipsis mobile-visible text-sm border-b border-gray-300 dark:border-gray-500`}
        >
          <div className="flex flex-col">
            <div className="py-1 mb-1 flex">
              <div className="flex font-ellipsis">
                <div className="mr-2 text-xs text-gray-400 w-16 h-4 skeleton-bg rounded-md"></div>
                <div className="text-xs text-gray-400 w-56 h-4 skeleton-bg rounded-md"></div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-row text-xs text-gray-400">
                <div className="mr-2 text-xs text-gray-400 w-16 h-4 skeleton-bg rounded-md"></div>
                <div className="text-xs text-gray-400 w-16 h-4 skeleton-bg rounded-md"></div>
              </div>
              <div className="flex text-xs text-red-500">
                <div className="ml-2">
                  <div className="ml-1 text-xs w-10 h-4 skeleton-bg rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="desktop-visible">
        <div className={`flex flex-row border-b dark:border-gray-500 text-sm`}>
          <div className="w-[8%] h-[42px] pt-3">
            <div className={`flex justify-center`}>
              <div className="w-6 h-4 skeleton-bg rounded-md"></div>
            </div>
          </div>
          <div className="w-[60%] pt-3">
            <div className="flex">
              <div className="w-72 h-4 skeleton-bg rounded-md"></div>
              <div className="ml-1 w-5 h-4 skeleton-bg rounded-md"></div>
            </div>
          </div>
          <div className="w-[17%] pt-3 text-xs text-gray-400">
            <div className={`flex justify-center`}>
              <div className="w-16 h-4 skeleton-bg rounded-md"></div>
            </div>
          </div>
          <div className="w-[5%] pt-3 text-xs text-gray-400">
            <div className={`flex justify-center`}>
              <div className="w-5 h-4 skeleton-bg rounded-md"></div>
            </div>
          </div>
          <div className="w-[10%] pt-3 text-xs text-gray-400">
            <div className={`flex justify-center`}>
              <div className="w-12 h-4 skeleton-bg rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
