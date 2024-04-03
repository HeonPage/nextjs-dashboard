import { useQuery, useQueryClient } from '@tanstack/react-query'
import Navbar from './navbar'
import { credentialByToken, getUsers } from '../lib/api'
import { User } from '../lib/type'

// const user = {
//   username: 'gkddyd',
//   name: 'gkddyd',
//   email: 'gkddyd@naver.com',
// }
export default async function Nav() {
  const user: User = await credentialByToken()

  return <Navbar user={user} />
}
