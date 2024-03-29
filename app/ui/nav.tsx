import Navbar from './navbar'

const user = {
  username: 'gkddyd',
  name: 'gkddyd',
  email: 'gkddyd@naver.com',
}
export default async function Nav() {
  return <Navbar user={user} />
}
