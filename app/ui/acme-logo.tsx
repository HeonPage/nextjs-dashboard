import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { inter } from '@/app/ui/fonts'
import { LuRadioTower } from 'react-icons/lu'
export default function AcmeLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
      <LuRadioTower className="w-20 h-12 rotate-12" />
      <p className="text-[44px]">KRMS</p>
    </div>
  )
}
