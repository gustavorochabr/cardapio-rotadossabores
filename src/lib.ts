import { STORE, productById } from './data'
import type { CartItem, OrderInfo, Product } from './types'

export const formatMoney = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)

export const getChoice = (product: Product, groupId: string, choiceId: string) =>
  product.optionGroups?.find((group) => group.id === groupId)?.choices.find((choice) => choice.id === choiceId)

export const itemUnitPrice = (item: CartItem) => {
  const product = productById(item.productId)
  if (!product) return 0
  const extras = Object.entries(item.selections).reduce((sum, [groupId, choices]) => {
    return sum + choices.reduce((choiceSum, choiceId) => choiceSum + (getChoice(product, groupId, choiceId)?.price ?? 0), 0)
  }, 0)
  return product.price + extras
}

export const itemTotal = (item: CartItem) => itemUnitPrice(item) * item.quantity

export const cartTotal = (items: CartItem[]) => items.reduce((sum, item) => sum + itemTotal(item), 0)

export const cartCount = (items: CartItem[]) => items.reduce((sum, item) => sum + item.quantity, 0)

export const selectionLabels = (item: CartItem) => {
  const product = productById(item.productId)
  if (!product) return []
  return Object.entries(item.selections).flatMap(([groupId, choices]) =>
    choices.map((choiceId) => getChoice(product, groupId, choiceId)?.name).filter(Boolean) as string[],
  )
}

export const isOpenAt = (day: number, hour: number) => {
  if (day === 0 || day === 6) return hour >= 18 && hour < 24
  if (day >= 2 && day <= 5) return hour >= 18 && hour < 23
  return false
}

export const isStoreOpen = (now = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const dayName = parts.find((part) => part.type === 'weekday')?.value ?? 'Mon'
  const rawHour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0)
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return isOpenAt(dayMap[dayName] ?? 1, rawHour === 24 ? 0 : rawHour)
}

export const paymentLabel = (payment: OrderInfo['payment']) =>
  ({ pix: 'Pix', card: 'Cartão', cash: 'Dinheiro' })[payment]

export const fulfillmentLabel = (fulfillment: OrderInfo['fulfillment']) =>
  fulfillment === 'delivery' ? 'Entrega' : 'Retirada'

export const generateOrderCode = () => `RDS-${String(Date.now()).slice(-6)}`

export const buildOrderMessage = (items: CartItem[], info: OrderInfo, orderCode: string) => {
  const lines = items.flatMap((item) => {
    const product = productById(item.productId)
    if (!product) return []
    const selections = selectionLabels(item)
    return [
      `• ${item.quantity}x ${product.name} — ${formatMoney(itemTotal(item))}`,
      ...(selections.length ? [`  Opções: ${selections.join(', ')}`] : []),
      ...(item.note.trim() ? [`  Observação: ${item.note.trim()}`] : []),
    ]
  })

  return [
    `Olá! Gostaria de fazer um pedido pelo cardápio.`,
    '',
    `*Pedido ${orderCode}*`,
    ...lines,
    '',
    `*Subtotal: ${formatMoney(cartTotal(items))}*`,
    ...(info.fulfillment === 'delivery' ? ['Taxa de entrega: confirmar com a equipe'] : []),
    '',
    `Tipo: ${fulfillmentLabel(info.fulfillment)}`,
    `Nome: ${info.name.trim()}`,
    ...(info.fulfillment === 'delivery' ? [`Endereço: ${info.address.trim()}`] : []),
    ...(info.fulfillment === 'delivery' && info.reference.trim() ? [`Referência: ${info.reference.trim()}`] : []),
    `Pagamento: ${paymentLabel(info.payment)}`,
    ...(info.payment === 'cash' && info.changeFor.trim() ? [`Troco para: ${info.changeFor.trim()}`] : []),
    ...(info.note.trim() ? [`Observação geral: ${info.note.trim()}`] : []),
    '',
    'Aguardo a confirmação do pedido. 😊',
  ].join('\n')
}

export const whatsappUrl = (message: string) =>
  `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`
