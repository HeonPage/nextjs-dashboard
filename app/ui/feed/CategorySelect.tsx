import Image from 'next/image'
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons'
import InvoiceStatus from '@/app/ui/invoices/status'
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils'
import { fetchFilteredInvoices } from '@/app/lib/data'
import { getCategoryByName } from '@/app/lib/api'
import { Feed_Category } from '@/app/lib/type'
import { CategorySelectButton } from './CategorySelectButton'

export default async function CategorySelect({ name }: { name: string }) {
  const category = await getCategoryByName(name)
  return (
    <div className="inline-block min-w-full">
      <div className="flex gap-2 rounded-lg p-2 items-center">
        {category?.map((row: Feed_Category) => (
          <CategorySelectButton key={row.id} data={row} />
        ))}
      </div>
    </div>
  )
}
