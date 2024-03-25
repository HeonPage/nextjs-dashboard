import { Revenue } from './type'

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = []
  const highestRecord = Math.max(...revenue.map((month) => month.revenue))
  const topLabel = Math.ceil(highestRecord / 1000) * 1000

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`)
  }

  return { yAxisLabels, topLabel }
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    ' ...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '... ',
    totalPages,
  ]
}

export const prettifyTime = (time: string) => {
  try {
    const date = new Date(time)
    //date.setTime(date.getTime() + 9*60*60*1000)
    //console.log(date.toLocaleString())
    return date.toLocaleString()
  } catch {
    return time
  }
}

export const prettifyToYMD = (time: string) => {
  const date = new Date(time)
  return `${String(date.getFullYear()).padStart(2, '0')}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export const prettifyToYMDHM = (time: string) => {
  const date = new Date(time)
  return `${String(date.getFullYear()).padStart(2, '0')}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(
    date.getHours(),
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export const prettifyToYMDorTime = (time: string) => {
  try {
    if (time == '방금') {
      return time
    }

    const date = new Date(time)

    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const diffDate = (diff / (1000 * 60 * 60 * 24)) | 0
    const diffHours = (diff / (1000 * 60 * 60)) | 0
    const diffMin = (diff / (1000 * 60)) | 0

    if (diffDate >= 2 && diffDate <= 6) {
      return `${Number(diffDate)}일 전`
    } else if (diffDate == 1) {
      return `어제 ${date.getHours()}:${date.getMinutes()}`
    } else if (diffDate == 0 && diffMin == 0) {
      return `방금`
    } else if (diffDate == 0 && diffHours < 1) {
      return `${diffMin}분 전`
    } else if (diffDate == 0) {
      return `${diffHours}시간 전`
    }

    return `${String(date.getFullYear()).padStart(2, '0')}-${String(
      date.getMonth() + 1,
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  } catch {
    return time
  }
}

export const uploadS3ImagePath = (file_name: string, paths: Array<string>) => {
  /*
      file_name : "hello.jpg"
      paths : ['board', 'anony']
      -> return 'upload/board/anony/20220101101010_abcdefgh.jpg'
  */
  var fileExt = file_name.split('.').pop()
  const dateObj = new Date()
  const crypto = require('crypto')
  let hashed_filename = crypto
    .createHash('sha1')
    .update(file_name)
    .digest('hex')
    .slice(0, 8)
  const time = `${dateObj.getFullYear()}${String(
    Number(dateObj.getMonth()) + 1,
  ).padStart(2, '0')}${String(dateObj.getDate()).padStart(2, '0')}${String(
    dateObj.getHours(),
  ).padStart(2, '0')}${String(dateObj.getMinutes()).padStart(2, '0')}${String(
    dateObj.getSeconds(),
  ).padStart(2, '0')}`

  let upload_path = 'upload/'

  for (const path of paths) {
    upload_path += path + '/'
  }

  upload_path += `${time}_${hashed_filename}.${fileExt}`

  return upload_path
}

export const getErrorMessage = (e: any) => {
  try {
    const errorDataJson = e.response.data
    const message = Array.isArray(errorDataJson['message'])
      ? errorDataJson['message'][0]
      : errorDataJson['message']
    return message
  } catch (e) {
    return '에러가 발생했습니다'
  }
}

export const staticImageUri = 'https://static.seiyon.net/images/emoticon/'

export const urlParsedContent = ({
  content,
  matched,
}: {
  content: string
  matched: any
}) => {
  let urlParsedContent = ''
  let beforeIndex = 0
  if (matched)
    for (let i = 0; i < matched.length; i++) {
      if (content.slice(matched[i].index - 2, matched[i].index) == `="`) {
        urlParsedContent =
          urlParsedContent + content.slice(beforeIndex, matched[i].lastIndex)
        beforeIndex = matched[i].lastIndex
        continue
      }
      urlParsedContent =
        urlParsedContent + content.slice(beforeIndex, matched[i].index)
      urlParsedContent =
        urlParsedContent +
        `<a href="${matched[i].url}" target='_blank' style="color: blue; text-decoration:underline;" rel="noreferrer">${matched[i].text}</a>`
      beforeIndex = matched[i].lastIndex
    }

  urlParsedContent = urlParsedContent + content.slice(beforeIndex)
  return urlParsedContent
}

export const ltgtConvertedContent = (content: string) => {
  const ltConvert = content.replaceAll('&lt;', '<')
  const gtConvert = ltConvert.replaceAll('&gt;', '>')
  return gtConvert
}
