import axios from 'axios'

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
export const getRadioDocuments = async () => {
  return await axiosNext.get(`/document`)
}

export const getRadioDocumentsByMedium = async ({
  queryKey,
}: {
  queryKey: any
}) => {
  const [_, medium] = queryKey
  return await axiosNext.get(`/document/${medium}`, {
    headers: {
      Authorization: `Bearer ${'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiT1NfUTVYT1dqVXRObHBQUzZ5U3h3eGNVWUR0ZllseVFhcnE0dG1icGZyY01uX0hzYmZvenVUZy1VSFA1NU1zNkd6eHhSOHRFbWJBYUZPNmNNV3JNbmcifQ..FhzoZWdLZVJVP7HVbA6d4A.1ESaqEpWvPAgPtzIg2gi-6lNYmqR6coI_aEJkGXGZpRdJHLCySzSOaX0gK794yZZmOxeWlrU_f5fJxQa412x7N2BEFvMQuKRO_BwGuVmcz1WpPm0lYgtMxlKnN-CG4jkibgSw9l044hsgveSmvpnHE_2GkEcfed9Yi783zSUAF0.z9mbu6FXgEyWt0Lzbea-J8HYhPhfmS2t2DyDuWyfMe8'}`,
    },
  })
}
