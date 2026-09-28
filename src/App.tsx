import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  AlertCircle,
  ArrowLeft,
  BadgePercent,
  Bike,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  CookingPot,
  Copy,
  CupSoda,
  GlassWater,
  IceCreamBowl,
  Info,
  MapPin,
  MessageCircle,
  Minus,
  Package,
  Plus,
  Search,
  Sandwich,
  ShoppingBag,
  Sparkles,
  Star,
  Store as StoreIcon,
  Trash2,
  WalletCards,
  X,
} from 'lucide-react'
import { STORE, categories, productById, products } from './data'
import {
  buildOrderMessage,
  cartCount,
  cartTotal,
  formatMoney,
  fulfillmentLabel,
  generateOrderCode,
  isStoreOpen,
  itemTotal,
  itemUnitPrice,
  paymentLabel,
  selectionLabels,
  whatsappUrl,
} from './lib'
import { useStore } from './store'
import type { CartItem, CategoryId, OrderInfo, Product } from './types'

export function App() {
  const [infoOpen, setInfoOpen] = useState(false)

  return (
    <div className="app-shell">
      <Header onInfo={() => setInfoOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<MenuPage onInfo={() => setInfoOpen(true)} />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/sacola" element={<CartPage />} />
          <Route path="/dados" element={<CheckoutPage />} />
          <Route path="/revisao" element={<ReviewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <InfoSheet open={infoOpen} onClose={() => setInfoOpen(false)} />
    </div>
  )
}

function Header({ onInfo }: { onInfo: () => void }) {
  const { items } = useStore()
  const count = cartCount(items)
  const open = isStoreOpen()

  return (
    <header className="site-header">
      <Link to="/" className="brand-lockup" aria-label="Ir para o cardápio">
        <img src="/images/logo-rota.png" alt="" />
        <span>
          <strong>Rota dos Sabores</strong>
          <small className={open ? 'status-open' : 'status-closed'}>
            <i aria-hidden="true" /> {open ? 'Aberto agora' : 'Fechado agora'}
          </small>
        </span>
      </Link>
      <div className="header-actions">
        <button className="icon-button" type="button" onClick={onInfo} aria-label="Ver informações da loja">
          <Clock3 size={20} />
        </button>
        <Link to="/sacola" className="cart-button" aria-label={`Abrir sacola com ${count} itens`}>
          <ShoppingBag size={20} />
          {count > 0 && <span>{count}</span>}
        </Link>
      </div>
    </header>
  )
}

function InfoSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="info-sheet" role="dialog" aria-modal="true" aria-labelledby="info-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title-row">
          <div>
            <span className="eyebrow">Informações da loja</span>
            <h2 id="info-title">Antes de pedir</h2>
          </div>
          <button className="icon-button soft" type="button" onClick={onClose} aria-label="Fechar informações"><X size={20} /></button>
        </div>

        <img className="hours-art" src="/images/horarios.png" alt="Horário: terça a sexta, das 18h às 23h; sábado e domingo, das 18h à meia-noite" />

        <div className="info-list">
          <div><Clock3 size={19} /><span><strong>Horários</strong><small>Ter–sex · 18h–23h<br />Sáb–dom · 18h–00h<br />Segunda · fechado</small></span></div>
          <div><MapPin size={19} /><span><strong>Retirada</strong><small>{STORE.address}</small></span></div>
          <div><ShoppingBag size={19} /><span><strong>Pedido mínimo</strong><small>{formatMoney(STORE.minimumOrder)}</small></span></div>
          <div><Bike size={19} /><span><strong>Entrega</strong><small>A taxa é confirmada no WhatsApp.</small></span></div>
        </div>
        <a className="secondary-button full" href={STORE.instagram} target="_blank" rel="noreferrer"><Camera size={18} /> Ver Instagram</a>
      </section>
    </div>
  )
}

function MenuPage({ onInfo }: { onInfo: () => void }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { items, addItem } = useStore()
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState((location.state as { toast?: string } | null)?.toast ?? '')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const normalizedSearch = search.toLocaleLowerCase('pt-BR').trim()
  const filtered = normalizedSearch
    ? products.filter((product) => `${product.name} ${product.description}`.toLocaleLowerCase('pt-BR').includes(normalizedSearch))
    : products
  const featured = products.filter((product) => product.featured)
  const total = cartTotal(items)
  const count = cartCount(items)

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleQuickAdd = (product: Product) => {
    if (product.optionGroups?.length) {
      navigate(`/produto/${product.id}`)
      return
    }

    addItem({ productId: product.id, quantity: 1, selections: {}, note: '' })
    setToast(`${product.name} adicionado à sacola`)
  }

  return (
    <>
      <div className="page menu-page">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="hero-pill"><Sparkles size={14} /> Sabor que encontra você</span>
            <h1>Seu favorito,<br />do seu jeito.</h1>
            <p>Monte o pedido e envie direto pelo WhatsApp.</p>
            <button type="button" className="hero-link" onClick={onInfo}><Clock3 size={16} /> Ver horários</button>
          </div>
          <img src="/images/hot-dog.webp" alt="Cachorro-quente completo" />
        </section>

        <div className="store-quick-info">
          <button type="button" onClick={onInfo}><MapPin size={17} /><span>Parque Beira Mar<small>Entrega e retirada</small></span><ChevronRight size={17} /></button>
          <span className="divider" />
          <div><ShoppingBag size={17} /><span>Pedido mínimo<small>{formatMoney(STORE.minimumOrder)}</small></span></div>
        </div>

        <label className="search-box">
          <Search size={19} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="O que você quer comer hoje?" aria-label="Buscar no cardápio" />
          {search && <button type="button" onClick={() => setSearch('')} aria-label="Limpar busca"><X size={18} /></button>}
        </label>

        {!normalizedSearch && (
          <nav className="category-chips" aria-label="Categorias do cardápio">
            <button type="button" onClick={() => scrollTo('destaques')}><Star size={14} aria-hidden="true" /> Destaques</button>
            {categories.map((category) => <button key={category.id} type="button" onClick={() => scrollTo(category.id)}><CategoryTabIcon id={category.id} /> {category.shortLabel}</button>)}
          </nav>
        )}

        {normalizedSearch ? (
          <section className="catalog-section">
            <div className="section-heading"><div><span className="eyebrow">Busca</span><h2>{filtered.length ? `${filtered.length} resultado${filtered.length > 1 ? 's' : ''}` : 'Nada por aqui'}</h2></div></div>
            {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} onQuickAdd={handleQuickAdd} />)}</div> : <EmptySearch onClear={() => setSearch('')} />}
          </section>
        ) : (
          <>
            <section id="destaques" ref={(node) => { sectionRefs.current.destaques = node }} className="catalog-section anchor-section">
              <div className="section-heading"><div><span className="eyebrow">Os mais pedidos</span><h2>Destaques da Rota</h2></div><Star size={21} /></div>
              <div className="featured-scroller">
                {featured.map((product) => <FeaturedCard key={product.id} product={product} onQuickAdd={handleQuickAdd} />)}
              </div>
            </section>
            {categories.map((category) => {
              const categoryProducts = products.filter((product) => product.category === category.id)
              return (
                <section key={category.id} id={category.id} ref={(node) => { sectionRefs.current[category.id] = node }} className="catalog-section anchor-section">
                  <div className="section-heading">
                    <div><span className="eyebrow">Cardápio</span><h2>{category.label}</h2></div>
                    <span className="item-count">{categoryProducts.length} itens</span>
                  </div>
                  {(category.id === 'acais' || category.id === 'sorvetes') && <p className="provisional-note"><Info size={15} /> Itens e valores provisórios para visualização.</p>}
                  <div className="product-grid">{categoryProducts.map((product) => <ProductCard key={product.id} product={product} onQuickAdd={handleQuickAdd} />)}</div>
                </section>
              )
            })}
          </>
        )}

        <footer className="menu-footer">
          <img src="/images/logo-rota.png" alt="Rota dos Sabores" />
          <p>{STORE.address}</p>
          <a href={STORE.instagram} target="_blank" rel="noreferrer"><Camera size={17} /> @rotadossabores24</a>
        </footer>
      </div>

      {count > 0 && (
        <button className="cart-bar" type="button" onClick={() => navigate('/sacola')}>
          <span className="cart-quantity">{count}</span>
          <strong>Ver sacola</strong>
          <b>{formatMoney(total)}</b>
        </button>
      )}
      {toast && <div className="toast"><Check size={18} /> {toast}</div>}
    </>
  )
}

function FeaturedCard({ product, onQuickAdd }: { product: Product; onQuickAdd: (product: Product) => void }) {
  return (
    <article className={`featured-card ${product.unavailable ? 'disabled' : ''}`}>
      <Link to={`/produto/${product.id}`} className="featured-image" aria-label={`Ver ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" />{product.oldPrice && <span>Oferta</span>}
      </Link>
      <div className="featured-content">
        <Link to={`/produto/${product.id}`} className="featured-details">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </Link>
        <div className="card-action-row">
          {product.unavailable ? <span className="unavailable">Indisponível</span> : <><Price product={product} /><QuickAddButton product={product} onAdd={onQuickAdd} /></>}
        </div>
      </div>
    </article>
  )
}

function ProductCard({ product, onQuickAdd }: { product: Product; onQuickAdd: (product: Product) => void }) {
  return (
    <article className={`product-card ${product.unavailable ? 'disabled' : ''}`}>
      <Link to={`/produto/${product.id}`} className="product-image-link" aria-label={`Ver ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-copy">
        <Link to={`/produto/${product.id}`} className="product-details">
          <div className="product-title-row"><h3>{product.name}</h3>{product.provisional && <span className="illustrative-badge">Provisório</span>}</div>
          <p>{product.description}</p>
        </Link>
        <div className="card-action-row">
          {product.unavailable ? <span className="unavailable">Indisponível</span> : <><Price product={product} /><QuickAddButton product={product} onAdd={onQuickAdd} /></>}
        </div>
      </div>
    </article>
  )
}

function QuickAddButton({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  const needsOptions = Boolean(product.optionGroups?.length)
  return (
    <button className="quick-add-button" type="button" onClick={() => onAdd(product)} aria-label={`${needsOptions ? 'Escolher opções e adicionar' : 'Adicionar'} ${product.name} à sacola`}>
      <Plus size={17} strokeWidth={3} aria-hidden="true" />
    </button>
  )
}

function CategoryTabIcon({ id }: { id: CategoryId }) {
  const props = { size: 14, strokeWidth: 2.25, 'aria-hidden': true as const }
  switch (id) {
    case 'promocoes': return <BadgePercent {...props} />
    case 'hamburgueres': return <Sandwich {...props} />
    case 'hotdogs': return <CookingPot {...props} />
    case 'combos': return <Package {...props} />
    case 'acais': return <CupSoda {...props} />
    case 'sorvetes': return <IceCreamBowl {...props} />
    case 'bebidas': return <GlassWater {...props} />
  }
}

function Price({ product, large = false }: { product: Product; large?: boolean }) {
  return <div className={`price-row ${large ? 'large' : ''}`}><strong>{formatMoney(product.price)}</strong>{product.oldPrice && <del>{formatMoney(product.oldPrice)}</del>}</div>
}

function EmptySearch({ onClear }: { onClear: () => void }) {
  return <div className="empty-state"><Search size={32} /><h3>Não encontramos esse item</h3><p>Tente outro nome ou volte para todas as categorias.</p><button className="secondary-button" type="button" onClick={onClear}>Limpar busca</button></div>
}

function ProductPage() {
  const { id = '' } = useParams()
  const product = productById(id)
  const navigate = useNavigate()
  const { addItem } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [selections, setSelections] = useState<Record<string, string[]>>({})
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  if (!product) return <Navigate to="/" replace />

  const draftItem: CartItem = { id: 'draft', productId: product.id, quantity, selections, note }
  const total = itemTotal(draftItem)

  const toggleChoice = (groupId: string, choiceId: string, type: 'single' | 'multiple', max?: number) => {
    setSelections((current) => {
      const selected = current[groupId] ?? []
      if (type === 'single') return { ...current, [groupId]: [choiceId] }
      if (selected.includes(choiceId)) return { ...current, [groupId]: selected.filter((id) => id !== choiceId) }
      if (max && selected.length >= max) return current
      return { ...current, [groupId]: [...selected, choiceId] }
    })
    setErrors((current) => current.filter((id) => id !== groupId))
  }

  const handleAdd = () => {
    const invalid = (product.optionGroups ?? [])
      .filter((group) => group.required && (selections[group.id]?.length ?? 0) < (group.min ?? 1))
      .map((group) => group.id)
    if (invalid.length) {
      setErrors(invalid)
      document.getElementById(`group-${invalid[0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    addItem({ productId: product.id, quantity, selections, note })
    navigate('/', { state: { toast: `${product.name} adicionado à sacola` } })
  }

  return (
    <div className="detail-page page-with-action">
      <button className="floating-back" type="button" onClick={() => navigate(-1)} aria-label="Voltar"><ArrowLeft size={21} /></button>
      <div className="detail-image"><img src={product.image} alt={product.name} />{product.oldPrice && <span className="sale-badge">Oferta especial</span>}</div>
      <div className="detail-content">
        <span className="eyebrow">{categories.find((category) => category.id === product.category)?.label}</span>
        <h1>{product.name}</h1>
        <Price product={product} large />
        <p className="detail-description">{product.description}</p>
        {product.provisional && <div className="inline-alert"><Info size={17} /><span>Este item é provisório para demonstrar o cardápio.</span></div>}

        {(product.optionGroups ?? []).map((group) => (
          <fieldset key={group.id} id={`group-${group.id}`} className={`option-group ${errors.includes(group.id) ? 'has-error' : ''}`}>
            <legend><span>{group.name}<small>{group.required ? 'Obrigatório' : 'Opcional'}{group.max ? ` · até ${group.max}` : ''}</small></span>{group.required && <b>Escolha</b>}</legend>
            <div className="choice-list">
              {group.choices.map((choice) => {
                const checked = (selections[group.id] ?? []).includes(choice.id)
                return (
                  <label key={choice.id} className={checked ? 'selected' : ''}>
                    <input type={group.type === 'single' ? 'radio' : 'checkbox'} name={group.id} checked={checked} onChange={() => toggleChoice(group.id, choice.id, group.type, group.max)} />
                    <span>{choice.name}{choice.price > 0 && <small>+ {formatMoney(choice.price)}</small>}</span>
                    <i>{checked && <Check size={14} />}</i>
                  </label>
                )
              })}
            </div>
            {errors.includes(group.id) && <p className="field-error">Escolha uma opção para continuar.</p>}
          </fieldset>
        ))}

        <label className="field-block"><span>Alguma observação? <small>Opcional</small></span><textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={160} placeholder="Ex.: sem milho, molho separado..." /><em>{note.length}/160</em></label>
        <div className="quantity-section"><span>Quantidade</span><QuantityStepper quantity={quantity} onChange={setQuantity} /></div>
      </div>
      <div className="fixed-action"><button className="primary-button" type="button" onClick={handleAdd}><ShoppingBag size={19} /> Adicionar · {formatMoney(total)}</button></div>
    </div>
  )
}

function QuantityStepper({ quantity, onChange }: { quantity: number; onChange: (value: number) => void }) {
  return <div className="quantity-stepper"><button type="button" onClick={() => onChange(Math.max(1, quantity - 1))} aria-label="Diminuir quantidade"><Minus size={17} /></button><strong>{quantity}</strong><button type="button" onClick={() => onChange(quantity + 1)} aria-label="Aumentar quantidade"><Plus size={17} /></button></div>
}

function PageTop({ title, backTo }: { title: string; backTo: string }) {
  return <div className="page-top"><Link to={backTo} className="icon-button soft" aria-label="Voltar"><ArrowLeft size={20} /></Link><div><span className="eyebrow">Rota dos Sabores</span><h1>{title}</h1></div></div>
}

function CartPage() {
  const { items, updateQuantity, removeItem, addItem } = useStore()
  const [removed, setRemoved] = useState<CartItem | null>(null)
  const navigate = useNavigate()
  const total = cartTotal(items)
  const missing = Math.max(0, STORE.minimumOrder - total)

  const remove = (item: CartItem) => {
    setRemoved(item)
    removeItem(item.id)
  }

  if (!items.length) {
    return <div className="page"><PageTop title="Sua sacola" backTo="/" /><div className="empty-state tall"><ShoppingBag size={36} /><h2>Sua sacola está vazia</h2><p>Explore o cardápio e escolha os seus favoritos.</p><Link className="primary-button compact" to="/">Ver cardápio</Link></div></div>
  }

  return (
    <div className="page page-with-action">
      <PageTop title="Sua sacola" backTo="/" />
      <div className="cart-list">
        {items.map((item) => {
          const product = productById(item.productId)
          if (!product) return null
          const labels = selectionLabels(item)
          return (
            <article key={item.id} className="cart-item">
              <img src={product.image} alt="" />
              <div className="cart-item-content">
                <div><h2>{product.name}</h2><strong>{formatMoney(itemTotal(item))}</strong></div>
                {labels.length > 0 && <p>{labels.join(' · ')}</p>}
                {item.note && <p>“{item.note}”</p>}
                <div className="cart-item-actions"><QuantityStepper quantity={item.quantity} onChange={(quantity) => updateQuantity(item.id, quantity)} /><button type="button" onClick={() => remove(item)}><Trash2 size={16} /> Remover</button></div>
              </div>
            </article>
          )
        })}
      </div>
      <Link to="/" className="add-more"><Plus size={17} /> Adicionar mais itens</Link>
      <section className="summary-card">
        <div><span>Subtotal</span><strong>{formatMoney(total)}</strong></div>
        <div><span>Taxa de entrega</span><small>Confirmada no WhatsApp</small></div>
      </section>
      {missing > 0 && <div className="minimum-alert"><AlertCircle size={18} /><span>Adicione mais <strong>{formatMoney(missing)}</strong> para atingir o pedido mínimo.</span></div>}
      <div className="fixed-action"><button className="primary-button" type="button" disabled={missing > 0} onClick={() => navigate('/dados')}>Continuar pedido <ChevronRight size={19} /></button></div>
      {removed && <div className="toast action-toast"><span>Item removido</span><button type="button" onClick={() => { const { id: _id, ...item } = removed; addItem(item); setRemoved(null) }}>Desfazer</button></div>}
    </div>
  )
}

function CheckoutPage() {
  const { items, orderInfo, updateOrderInfo } = useStore()
  const [form, setForm] = useState<OrderInfo>(orderInfo)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  if (!items.length) return <Navigate to="/" replace />

  const setField = <K extends keyof OrderInfo>(field: K, value: OrderInfo[K]) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!form.name.trim()) nextErrors.name = 'Informe seu nome.'
    if (form.fulfillment === 'delivery' && !form.address.trim()) nextErrors.address = 'Informe o endereço completo.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus()
      return
    }
    updateOrderInfo(form)
    navigate('/revisao')
  }

  return (
    <form className="page page-with-action" onSubmit={submit}>
      <PageTop title="Como você quer receber?" backTo="/sacola" />
      <div className="fulfillment-toggle">
        <button type="button" className={form.fulfillment === 'delivery' ? 'selected' : ''} onClick={() => setField('fulfillment', 'delivery')}><Bike size={20} /><span>Entrega<small>Taxa a confirmar</small></span>{form.fulfillment === 'delivery' && <Check size={16} />}</button>
        <button type="button" className={form.fulfillment === 'pickup' ? 'selected' : ''} onClick={() => setField('fulfillment', 'pickup')}><StoreIcon size={20} /><span>Retirada<small>{STORE.address}</small></span>{form.fulfillment === 'pickup' && <Check size={16} />}</button>
      </div>

      <section className="form-section">
        <div className="section-heading compact"><div><span className="eyebrow">Identificação</span><h2>Seus dados</h2></div></div>
        <label className="field-block"><span>Nome</span><input id="name" value={form.name} onChange={(event) => setField('name', event.target.value)} placeholder="Como podemos chamar você?" />{errors.name && <p className="field-error">{errors.name}</p>}</label>
        {form.fulfillment === 'delivery' && <>
          <label className="field-block"><span>Endereço completo</span><input id="address" value={form.address} onChange={(event) => setField('address', event.target.value)} placeholder="Rua, número, complemento e bairro" />{errors.address && <p className="field-error">{errors.address}</p>}</label>
          <label className="field-block"><span>Ponto de referência <small>Opcional</small></span><input value={form.reference} onChange={(event) => setField('reference', event.target.value)} placeholder="Ex.: portão azul, perto da praça" /></label>
        </>}
      </section>

      <section className="form-section">
        <div className="section-heading compact"><div><span className="eyebrow">Na entrega ou retirada</span><h2>Pagamento</h2></div><WalletCards size={21} /></div>
        <div className="payment-options">
          {([['pix', 'Pix'], ['card', 'Cartão'], ['cash', 'Dinheiro']] as const).map(([value, label]) => <button key={value} type="button" className={form.payment === value ? 'selected' : ''} onClick={() => setField('payment', value)}>{label}{form.payment === value && <Check size={15} />}</button>)}
        </div>
        {form.payment === 'cash' && <label className="field-block"><span>Troco para quanto? <small>Opcional</small></span><input value={form.changeFor} onChange={(event) => setField('changeFor', event.target.value)} inputMode="decimal" placeholder="Ex.: R$ 100,00" /></label>}
        <div className="inline-alert"><Info size={17} /><span>Nenhum pagamento é realizado neste site.</span></div>
      </section>

      <label className="field-block"><span>Observação geral <small>Opcional</small></span><textarea value={form.note} onChange={(event) => setField('note', event.target.value)} placeholder="Ex.: tocar a campainha, levar maquininha..." /></label>
      <div className="fixed-action"><button className="primary-button" type="submit">Revisar pedido <ChevronRight size={19} /></button></div>
    </form>
  )
}

function ReviewPage() {
  const { items, orderInfo } = useStore()
  const [orderCode] = useState(generateOrderCode)
  const [copied, setCopied] = useState(false)
  if (!items.length || !orderInfo.name) return <Navigate to={items.length ? '/dados' : '/'} replace />
  const message = buildOrderMessage(items, orderInfo, orderCode)
  const url = whatsappUrl(message)
  const total = cartTotal(items)

  const copy = async () => {
    await navigator.clipboard.writeText(message)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="page review-page page-with-action">
      <PageTop title="Revise seu pedido" backTo="/dados" />
      <div className="order-code"><span>Código do pedido</span><strong>{orderCode}</strong></div>

      <section className="review-card">
        <div className="review-card-title"><div><span className="eyebrow">Atendimento</span><h2>{fulfillmentLabel(orderInfo.fulfillment)}</h2></div><Link to="/dados">Editar</Link></div>
        <p><strong>{orderInfo.name}</strong></p>
        {orderInfo.fulfillment === 'delivery' ? <><p>{orderInfo.address}</p>{orderInfo.reference && <p>{orderInfo.reference}</p>}</> : <p>{STORE.address}</p>}
        <p>Pagamento: {paymentLabel(orderInfo.payment)}{orderInfo.payment === 'cash' && orderInfo.changeFor ? ` · troco para ${orderInfo.changeFor}` : ''}</p>
      </section>

      <section className="review-card">
        <div className="review-card-title"><div><span className="eyebrow">Sacola</span><h2>{cartCount(items)} {cartCount(items) === 1 ? 'item' : 'itens'}</h2></div><Link to="/sacola">Editar</Link></div>
        <div className="review-items">
          {items.map((item) => {
            const product = productById(item.productId)
            if (!product) return null
            const labels = selectionLabels(item)
            return <div key={item.id}><span><b>{item.quantity}x</b> {product.name}<small>{labels.join(' · ')}{item.note ? `${labels.length ? ' · ' : ''}${item.note}` : ''}</small></span><strong>{formatMoney(itemTotal(item))}</strong></div>
          })}
        </div>
        <div className="review-total"><span>Subtotal</span><strong>{formatMoney(total)}</strong></div>
      </section>

      <div className="warning-card"><Clock3 size={19} /><span><strong>Confirmação pelo WhatsApp</strong>A taxa de entrega, disponibilidade e prazo serão confirmados pela nossa equipe.</span></div>
      {!isStoreOpen() && <div className="closed-card"><Info size={18} /><span>A loja está fechada agora. Você pode enviar o pedido e responderemos no próximo horário.</span></div>}

      <button className="copy-button" type="button" onClick={copy}>{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? 'Pedido copiado!' : 'Copiar pedido'}</button>
      <div className="fixed-action"><a className="primary-button whatsapp" href={url} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Enviar pelo WhatsApp</a></div>
    </div>
  )
}
