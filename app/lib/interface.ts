export interface FormValue {
  title: string
  category: string
  category_id: number
  has_highlight: boolean
  is_anony: boolean
  disableEditDelete: boolean
}

export interface ISignIn {
  username: string
  password: string
  stay: boolean
}
