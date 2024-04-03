'use server'
// import { auth } from '@/auth'
import axios from 'axios'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { User } from './type'
import { redirect } from 'next/navigation'
import { FormValue } from './interface'

export const axiosNext = axios.create({
  // baseURL: '/api',
  baseURL: 'http://localhost:4000/api',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 20000,
})

axiosNext.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      // const session = await auth()
      // const token = session?.access_token
      const cookieStore = cookies()
      const access_token = cookieStore?.get('accessToken')
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token.value}`
      } else {
        console.log('no access_token')
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// 피드 API
// export async function getCategoryByName(name: string) {
//   noStore()
//   return await (
//     await axiosNext.get(`/feed/category/search`, {
//       params: {
//         name: name,
//       },
//     })
//   ).data.result
// }

export const getCategoryByName = async (name: string) => {
  noStore()
  return (
    await axiosNext.get(`/feed/category/search`, {
      params: {
        name: name,
      },
    })
  ).data.result
}

export const createPost = async (
  form_data: FormValue,
  category: string,
  content: string,
) => {
  console.log('caca', category)
  await axiosNext
    .post(`/feed/${category}/post/create`, {
      title: form_data.title,
      body: content,
    })
    .then(() => {
      redirect(`/dashboard/feed/${category}`)
    })
}

export const getPosts = async (take: number, page: number) => {
  return (
    await axiosNext.get('/feed/posts', {
      params: {
        take: take,
        page: page,
      },
    })
  ).data.result
}

export const getPostsByCategory = async (
  category: string,
  take: number,
  page: number,
) => {
  return (
    await axiosNext.get(`/feed/${category}/posts`, {
      params: {
        take: take,
        page: page,
      },
    })
  ).data.result
}

export const getPost = async (category: string, identifier: string) => {
  return (await axiosNext.get(`/feed/${category}/${identifier}`)).data.result
}

export const getPostsByUser = async () => {
  return await axiosNext.get('/post/user')
}

export const getPostById = async ({ queryKey }: { queryKey: any }) => {
  const [_, id] = queryKey
  return await axiosNext.get(`/post/${id}`)
}

export const updatePostStatusById = async ({
  status,
  queryKey,
}: {
  status: string
  queryKey: any
}) => {
  const [_, id] = queryKey
  return await axiosNext.patch(`/post/update/status/${id}`, {
    status: status,
  })
}

export const deletePostById = async ({ queryKey }: { queryKey: any }) => {
  const [_, id] = queryKey
  return await axiosNext.get(`/post/${id}`)
}

export const vote = async (
  category: string,
  identifier: string,
  commentIdentifier: string,
  value: number,
) => {
  return (
    await axiosNext.post('/feed/vote', {
      category: category,
      identifier: identifier,
      commentIdentifier: commentIdentifier,
      value: value,
    })
  ).data.result
}

// 인증 API
export const signUp = async (
  username: string,
  password: string,
  nick: string,
  company: string,
  email: string,
) => {
  return await axiosNext.post(`/auth/signup`, {
    username: username,
    password: password,
    nick: nick,
    company: company,
    email: email,
  })
}

export const signIn = async (username: string, password: string) => {
  console.log('try signin')
  return await axiosNext
    .post(`/auth/signin`, {
      username: username,
      password: password,
    })
    .then((res) => {
      const jsonData = res.data.result
      cookies().set({
        name: 'accessToken',
        value: jsonData.accessToken,
        httpOnly: true,
        path: '/',
      })
      cookies().set({
        name: 'refreshToken',
        value: jsonData.refreshToken,
        httpOnly: true,
        path: '/',
      })
      return jsonData
    })
    .catch((error) => {
      redirect('/')
    })
}

export const signOut = async () => {
  cookies().delete('accessToken')
  cookies().delete('refreshToken')
  revalidatePath('/')
  redirect('/')
}

export const credentialByToken = async (): Promise<User> => {
  return await axiosNext
    .get(`/auth`)
    .then((res) => {
      return res.data.result
    })
    .catch((error) => {
      signOut()
    })
}

export const getUsers = async () => {
  return await axiosNext.get(`/auth/users`)
}

export const getUserByUsername = async (username: string) => {
  return await axiosNext.post(`/auth/username`, {
    username: username,
  })
}

// Radio
export const getRadioDocuments = async (
  take: number,
  page: number,
  query: string,
) => {
  noStore()
  return (
    await axiosNext.get(`/document`, {
      params: {
        take: take,
        page: page,
        query: query,
      },
    })
  ).data.result
}

export const getRadioDocumentsCount = async (query: string) => {
  noStore()
  return (
    await axiosNext.get(`/document/count`, {
      params: {
        query: query,
      },
    })
  ).data.result
}

export const getRadioDocumentsByMedium = async ({
  queryKey,
}: {
  queryKey: any
}) => {
  const [_, medium] = queryKey
  return (await axiosNext.get(`/document/${medium}`)).data.result
}
