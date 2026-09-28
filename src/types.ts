export type CategoryId =
  | 'promocoes'
  | 'hamburgueres'
  | 'hotdogs'
  | 'combos'
  | 'acais'
  | 'sorvetes'
  | 'bebidas'

export type OptionChoice = {
  id: string
  name: string
  price: number
}

export type OptionGroup = {
  id: string
  name: string
  required?: boolean
  type: 'single' | 'multiple'
  min?: number
  max?: number
  choices: OptionChoice[]
}

export type Product = {
  id: string
  category: CategoryId
  name: string
  description: string
  price: number
  oldPrice?: number
  image: string
  featured?: boolean
  unavailable?: boolean
  provisional?: boolean
  optionGroups?: OptionGroup[]
}

export type CartItem = {
  id: string
  productId: string
  quantity: number
  selections: Record<string, string[]>
  note: string
}

export type Fulfillment = 'delivery' | 'pickup'
export type PaymentMethod = 'pix' | 'card' | 'cash'

export type OrderInfo = {
  fulfillment: Fulfillment
  name: string
  address: string
  reference: string
  payment: PaymentMethod
  changeFor: string
  note: string
}
