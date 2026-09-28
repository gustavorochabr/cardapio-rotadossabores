import { describe, expect, it } from 'vitest'
import { buildOrderMessage, cartTotal, formatMoney, isOpenAt, itemUnitPrice, whatsappUrl } from './lib'
import type { CartItem, OrderInfo } from './types'

const item: CartItem = {
  id: 'test',
  productId: 'hot-dog-tradicional',
  quantity: 2,
  selections: { protein: ['linguica'] },
  note: 'Sem milho',
}

const info: OrderInfo = {
  fulfillment: 'delivery',
  name: 'Ana',
  address: 'Rua Exemplo, 123 — Centro',
  reference: 'Portão azul',
  payment: 'pix',
  changeFor: '',
  note: 'Tocar a campainha',
}

describe('regras do pedido', () => {
  it('soma adicionais, quantidades e formata em real', () => {
    expect(itemUnitPrice(item)).toBe(2599)
    expect(cartTotal([item])).toBe(5198)
    expect(formatMoney(5198)).toContain('51,98')
  })

  it('respeita os horários de atendimento', () => {
    expect(isOpenAt(1, 20)).toBe(false)
    expect(isOpenAt(2, 18)).toBe(true)
    expect(isOpenAt(5, 23)).toBe(false)
    expect(isOpenAt(6, 23)).toBe(true)
  })

  it('gera mensagem e link de WhatsApp completos', () => {
    const message = buildOrderMessage([item], info, 'RDS-123456')
    expect(message).toContain('RDS-123456')
    expect(message).toContain('2x Cachorro-Quente Tradicional')
    expect(message).toContain('Taxa de entrega: confirmar com a equipe')
    expect(message).toContain('Pagamento: Pix')
    expect(whatsappUrl(message)).toContain('https://wa.me/5521991864054?text=')
  })
})
