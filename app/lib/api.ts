import { auth } from '@/auth'
import axios from 'axios'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
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
      const session = await auth()
      const token = session?.access_token
      if (token && token.length > 0) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        console.log('*** AXIOS : SignIn or Session ERROR ***')
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// 게시글 API
export const createPost = async (title: string, body: string) => {
  return await axiosNext.post(`/post/create`, {
    title: title,
    body: body,
  })
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
  return await axiosNext.post(`/auth/signin`, {
    username: username,
    password: password,
  })
}

export const credentialByToken = async () => {
  return await axiosNext.post(`/auth`)
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
