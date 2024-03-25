import Pagination from '@/app/ui/invoices/pagination'
import Search from '@/app/ui/search'
import { CreateInvoice } from '@/app/ui/invoices/buttons'
import { inter } from '@/app/ui/fonts'
import {
  DocumentsTableSkeleton,
  InvoicesTableSkeleton,
} from '@/app/ui/skeletons'
import { Suspense } from 'react'
import { fetchInvoicesPages } from '@/app/lib/data'
import { Metadata } from 'next'
import DocumentTable from '@/app/ui/radio/documentTable'
import { getRadioDocuments } from '@/app/lib/api'
import Piechart from '@/app/ui/highchart/piechart'
import { Radio_Document } from '@/app/lib/type'
import PieChart from '@/app/ui/highchart/piechart'
import { Button, ConfigProvider, Table } from 'antd'
import { DocumentTableColumns } from '@/app/lib/static-data'
export const metadata: Metadata = {
  title: 'Document',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    take?: number
  }
}) {
  const query = (searchParams?.query || '').toUpperCase()
  const take = Number(searchParams?.take) || 1400
  const page = Number(searchParams?.page) || 1
  const fetch: [Radio_Document[], number] = await getRadioDocuments(
    take,
    page,
    query,
  )
  const documents: Radio_Document[] = fetch[0]

  const dataSource: Radio_Document[] = documents
  let returnedDataSource: Radio_Document[] = []
  dataSource.map((item) => {
    returnedDataSource.push(Object.assign(item, { key: item.id }))
  })

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Document</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/* <Suspense key={query + currentPage} fallback={<DocumentsTableSkeleton />}>
        <DocumentTable documents={documents} />
      </Suspense> */}
      <div className="pt-4">
        <ConfigProvider
          theme={{
            token: {
              fontSize: 12,
              borderRadius: 2,
              padding: 2,
            },
          }}
        >
          <Table
            dataSource={returnedDataSource}
            columns={DocumentTableColumns}
            pagination={{ pageSize: 20 }}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}
