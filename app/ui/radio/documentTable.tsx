import Image from 'next/image'
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons'
import InvoiceStatus from '@/app/ui/invoices/status'
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils'
import { fetchFilteredInvoices } from '@/app/lib/data'
import { getRadioDocuments } from '@/app/lib/api'
import { Radio_Document } from '@/app/lib/type'

export default async function DocumentTable({
  documents,
}: {
  documents: Radio_Document[]
}) {
  return (
    <div className="mt-6 flow-root overflow-scroll">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile */}
          {/* <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium text-center">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          {/* Desktop */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-2 font-medium text-center sm:pl-6"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  매체
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  허가번호
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  무선국명
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  관할
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  시설
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  주소
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  출력
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  주파수
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  (주)제조사
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  (주)송신기
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  (예)제조사
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  (예)송신기
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  수신채널
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  안테나
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  편파
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2 font-medium text-center"
                >
                  해발고
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {documents.map((document: Radio_Document) => (
                <tr
                  key={document.id}
                  className="w-full border-b py-3 text-sm hover:bg-slate-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">{document.id}</div>
                  </td>
                  <td
                    className={`whitespace-nowrap px-5 py-2 
                    ${document.medium.includes('AM') && 'bg-cyan-100'} 
                    ${document.medium.includes('FM') && 'bg-yellow-100'}
                     ${
                       (document.medium == '1DTV' ||
                         document.medium == '2DTV' ||
                         document.medium == 'EDTV') &&
                       'bg-blue-200'
                     }
                    ${document.medium.includes('UDTV') && 'bg-green-100'}
                    ${document.medium.includes('DMB') && 'bg-red-100'}
                    ${document.medium.includes('단파') && 'bg-gray-200'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {document.medium}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.lic_num}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.belong}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.spot}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.addr}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.power}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.freq}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.tx_1_vendor}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.tx_1_type}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.tx_2_vendor}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.tx_2_type}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.rx_ch}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.tx_ant_type}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.tx_ant_pol}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex items-center gap-3">
                      {document.tx_ant_gnd}
                    </div>
                  </td>
                  {/* <td className="whitespace-nowrap px-5 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-2">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
