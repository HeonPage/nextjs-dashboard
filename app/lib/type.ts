// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  username: string
  password: string
  email: string
  nick: string
  company: string
}

export type Customer = {
  id: string
  name: string
  email: string
  image_url: string
}

export type Invoice = {
  id: string
  customer_id: string
  amount: number
  date: string
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid'
}

export type Revenue = {
  month: string
  revenue: number
}

export type LatestInvoice = {
  id: string
  name: string
  image_url: string
  email: string
  amount: string
}

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number
}

export type InvoicesTable = {
  id: string
  customer_id: string
  name: string
  email: string
  image_url: string
  date: string
  amount: number
  status: 'pending' | 'paid'
}

export type CustomersTableType = {
  id: string
  name: string
  email: string
  image_url: string
  total_invoices: number
  total_pending: number
  total_paid: number
}

export type FormattedCustomersTable = {
  id: string
  name: string
  email: string
  image_url: string
  total_invoices: number
  total_pending: string
  total_paid: string
}

export type CustomerField = {
  id: string
  name: string
}

export type InvoiceForm = {
  id: string
  customer_id: string
  amount: number
  status: 'pending' | 'paid'
}

export type Radio_Document = {
  id: number
  created_at: string
  updated_at: string
  no: number
  b_type: string
  medium: string
  lic_num: string
  name: string
  spot: string
  belong: string
  addr: string
  addr_lat1: number
  addr_lat2: number
  addr_lat3: number
  addr_lng1: number
  addr_lng2: number
  addr_lng3: number
  power: number
  r_power: number
  r_power_yebi: number
  freq: number
  end_trans: string
  end_trans_num: string
  tx_1_vendor: string
  tx_1_type: string
  tx_1_no: string
  tx_2_vendor: string
  tx_2_type: string
  tx_2_no: string
  rx_ch: string
  rx_site: string
  tx_ant_type: string
  tx_ant_dan: string
  tx_ant_myon: string
  tx_ant_pol: string
  tx_ant_gain: string
  tx_ant_gnd: string
  tx_ant_ocn: string
  tx_ant_ang: string
  tx_ant_ele: string
  tx_ant_tilt: string
  tx_ant2_type: string
  tx_ant2_dan: string
  tx_ant2_myon: string
  tx_ant2_pol: string
  tx_ant2_gain: string
  tx_ant2_gnd: string
  tx_ant2_ocn: string
  tx_ant2_ang: string
  tx_ant2_ele: string
  tx_ant2_tilt: string
  tx_lin_type: string
  tx_lin_len: string
  tx_lin_loss: string
  tx_lin_etc: string
  tx_lin_bigo: string
  tx_lin_totl: string
  tx_lin2_type: string
  tx_lin2_len: string
  tx_lin2_loss: string
  tx_lin2_etc: string
  tx_lin2_bigo: string
  tx_lin2_totl: string
  rx_ant_type: string
  rx_ant_pol: string
  rx_ant_gain: string
  rx_ant_gnd: string
  rx_ant_ocn: string
  rx_ant_ang: string
  tower_type: string
  tower_len: string
  tower_gnd: string
  tower_shr: string
  tower_num: string
  dum_type: string
  dum_cap: string
  tum_num: string
  warn_addr: string
  warn_list: string
  con_addr: string
  con_list: string
  pwr1_kind: string
  pwr1_cap: string
  pwr1_v: string
  pwr1_sang: string
  pwr1_bigo: string
  pwr2_kind: string
  pwr2_cap: string
  pwr2_v: string
  pwr2_sang: string
  pwr2_bigo: string
  yeonju_kind: string
  yeonju_hot: string
  yeonju_standby: string
  yeonju_name: string
  yeonju_bigo: string
  jojung_kind: string
  jojung_hot: string
  jojung_standby: string
  jojung_name: string
  jojung_bigo: string
  date_start: string
  radio_type: string
  addr2: string
  addr2_lat1: string
  addr2_lat2: string
  addr2_lat3: string
  addr2_lng1: string
  addr2_lng2: string
  addr2_lng3: string
  coverage: null
  medium2: string
  content: string
}
