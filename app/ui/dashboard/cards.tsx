import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline'
import { inter } from '@/app/ui/fonts'
import { fetchCardData } from '@/app/lib/data'
import { getRadioDocumentsCount } from '@/app/lib/api'
import { LuRadioTower } from 'react-icons/lu'

const iconMap = {
  radio: LuRadioTower,
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
}

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData()
  const query = ''
  const Radio_Count: number = Math.ceil(
    Number(await getRadioDocumentsCount(query)),
  )
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="무선국" value={Radio_Count} type="radio" unit="국" />
      <Card
        title="Pending"
        value={totalPendingInvoices}
        type="pending"
        unit=""
      />
      <Card
        title="Total Invoices"
        value={numberOfInvoices}
        type="invoices"
        unit=""
      />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
        unit=""
      />
    </>
  )
}

export function Card({
  title,
  value,
  type,
  unit,
}: {
  title: string
  value: number | string
  type: 'radio' | 'invoices' | 'customers' | 'pending' | 'collected'
  unit: string
}) {
  const Icon = iconMap[type]

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${inter.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
        {unit}
      </p>
    </div>
  )
}
