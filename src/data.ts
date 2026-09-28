import type { CategoryId, OptionGroup, Product } from './types'

export const STORE = {
  name: 'Rota dos Sabores',
  subtitle: 'Hot dogs, açaís & sorvetes',
  whatsapp: '5521991864054',
  address: 'Rua Francisco Alves, 465 — Parque Beira Mar',
  instagram: 'https://www.instagram.com/rotadossabores24/',
  minimumOrder: 2000,
}

export const categories: { id: CategoryId; label: string; shortLabel: string }[] = [
  { id: 'promocoes', label: 'Promoções imperdíveis', shortLabel: 'Promoções' },
  { id: 'hamburgueres', label: 'Hambúrgueres do Rota', shortLabel: 'Hambúrgueres' },
  { id: 'hotdogs', label: 'Cachorros-quentes', shortLabel: 'Hot dogs' },
  { id: 'combos', label: 'Combinados Rota', shortLabel: 'Combinados' },
  { id: 'acais', label: 'Açaís', shortLabel: 'Açaís' },
  { id: 'sorvetes', label: 'Sorvetes', shortLabel: 'Sorvetes' },
  { id: 'bebidas', label: 'Bebidas', shortLabel: 'Bebidas' },
]

const hotDogProtein: OptionGroup = {
  id: 'protein',
  name: 'Escolha o recheio',
  required: true,
  type: 'single',
  choices: [
    { id: 'sausage', name: 'Salsicha', price: 0 },
    { id: 'linguica', name: 'Linguiça', price: 300 },
  ],
}

const sodaChoice: OptionGroup = {
  id: 'soda',
  name: 'Escolha a bebida',
  required: true,
  type: 'single',
  choices: [
    { id: 'coke', name: 'Coca-Cola 350ml', price: 0 },
    { id: 'coke-zero', name: 'Coca-Cola Zero 350ml', price: 0 },
    { id: 'guarana', name: 'Guaraná Antarctica 350ml', price: 0 },
  ],
}

const acaiSize: OptionGroup = {
  id: 'size',
  name: 'Escolha o tamanho',
  required: true,
  type: 'single',
  choices: [
    { id: '300', name: '300ml', price: 0 },
    { id: '500', name: '500ml', price: 600 },
    { id: '700', name: '700ml', price: 1000 },
  ],
}

const acaiToppings: OptionGroup = {
  id: 'toppings',
  name: 'Escolha até 3 complementos',
  type: 'multiple',
  max: 3,
  choices: [
    { id: 'banana', name: 'Banana', price: 0 },
    { id: 'strawberry', name: 'Morango', price: 200 },
    { id: 'granola', name: 'Granola', price: 0 },
    { id: 'condensed', name: 'Leite condensado', price: 0 },
    { id: 'powdered', name: 'Leite em pó', price: 200 },
  ],
}

const iceCreamFlavor: OptionGroup = {
  id: 'flavor',
  name: 'Escolha o sabor',
  required: true,
  type: 'single',
  choices: [
    { id: 'chocolate', name: 'Chocolate', price: 0 },
    { id: 'strawberry', name: 'Morango', price: 0 },
    { id: 'cream', name: 'Creme', price: 0 },
  ],
}

const image = {
  burger: '/images/burger.webp',
  hotdog: '/images/hot-dog.webp',
  acai: '/images/acai.webp',
  icecream: '/images/ice-cream.webp',
  drink: '/images/drink.webp',
}

export const products: Product[] = [
  { id: 'promo-x-tudo-coca', category: 'promocoes', name: 'X-Tudo + Coca-Cola', description: 'Pão bola, carne, queijo, presunto, ovo, calabresa, bacon, salada, batata e molho especial.', price: 2699, oldPrice: 3374, image: image.burger, featured: true, optionGroups: [sodaChoice] },
  { id: 'promo-x-bacon-coca', category: 'promocoes', name: 'X-Bacon + Coca-Cola', description: 'Carne, queijo, bacon, salada, batata palha e molho especial com bebida gelada.', price: 2799, oldPrice: 3499, image: image.burger, optionGroups: [sodaChoice] },
  { id: 'promo-parmesao-coca', category: 'promocoes', name: 'Cachorro-Quente Parmesão + Coca-Cola', description: 'Pão de parmesão, carne moída temperada, molhos da casa e bebida gelada.', price: 2999, oldPrice: 3749, image: image.hotdog, optionGroups: [hotDogProtein, sodaChoice] },

  { id: 'x-burguer', category: 'hamburgueres', name: 'X-Burguer', description: 'Pão bola, carne, queijo, alface, milho, batata palha e molho especial.', price: 1599, oldPrice: 1999, image: image.burger },
  { id: 'x-burguer-duplo', category: 'hamburgueres', name: 'X-Burguer Duplo', description: 'Pão bola, 2 carnes, 2 queijos, alface, milho, batata palha e molho especial.', price: 2099, oldPrice: 2624, image: image.burger },
  { id: 'cheddar', category: 'hamburgueres', name: 'Cheddar', description: 'Pão bola, queijo cheddar, alface, milho, batata e molho especial.', price: 1699, oldPrice: 2124, image: image.burger },
  { id: 'cheddar-duplo', category: 'hamburgueres', name: 'Cheddar Duplo', description: 'Pão bola, 2 carnes, cheddar duplo, salada, batata e molho especial.', price: 2099, oldPrice: 2624, image: image.burger },
  { id: 'cheddar-duplo-bacon', category: 'hamburgueres', name: 'Cheddar Duplo Bacon', description: 'Duas carnes, cheddar, bacon, alface, milho, batata e molho especial.', price: 2299, oldPrice: 2874, image: image.burger },
  { id: 'x-bacon', category: 'hamburgueres', name: 'X-Bacon', description: 'Carne, queijo, bacon, alface, milho, batata e molho especial.', price: 2299, oldPrice: 2874, image: image.burger, featured: true },
  { id: 'x-calabresa', category: 'hamburgueres', name: 'X-Calabresa', description: 'Carne, queijo, calabresa, salada, batata e molho especial.', price: 2099, oldPrice: 2624, image: image.burger },
  { id: 'x-egg', category: 'hamburgueres', name: 'X-Egg', description: 'Carne, queijo, ovo, alface, milho, batata e molho especial.', price: 2099, oldPrice: 2624, image: image.burger },
  { id: 'x-tudo', category: 'hamburgueres', name: 'X-Tudo', description: 'Carne, queijo, presunto, ovo, calabresa, bacon, salada e molho especial.', price: 2199, oldPrice: 2749, image: image.burger },
  { id: 'x-tudo-duplo', category: 'hamburgueres', name: 'X-Tudo Duplo', description: 'Duas carnes, 2 queijos, 2 ovos, calabresa, bacon, presunto e salada.', price: 2699, oldPrice: 3374, image: image.burger },
  { id: 'x-picanha', category: 'hamburgueres', name: 'X-Picanha', description: 'Hambúrguer de picanha, queijo, presunto, ovo, calabresa, bacon e salada.', price: 2699, oldPrice: 3374, image: image.burger },
  { id: 'x-picanha-duplo', category: 'hamburgueres', name: 'X-Picanha Duplo', description: 'Dois hambúrgueres de picanha com queijo, bacon, presunto e salada.', price: 2899, oldPrice: 3624, image: image.burger },
  { id: 'x-frango', category: 'hamburgueres', name: 'X-Filé de Frango', description: 'Filé de peito de frango, queijo, presunto, ovo, calabresa, bacon e salada.', price: 2699, oldPrice: 3374, image: image.burger },
  { id: 'x-leitao', category: 'hamburgueres', name: 'X-Leitão', description: 'Pão francês, pernil, queijo, cebola, alface e maionese de alho.', price: 2899, oldPrice: 3624, image: image.burger },

  { id: 'hot-dog-americano', category: 'hotdogs', name: 'Cachorro-Quente Americano', description: 'Pão, salsicha, ketchup, mostarda, maionese e batata palha.', price: 1999, oldPrice: 2199, image: image.hotdog, optionGroups: [hotDogProtein] },
  { id: 'hot-dog-tradicional', category: 'hotdogs', name: 'Cachorro-Quente Tradicional', description: 'Cachorro-quente de 20cm preparado com os melhores molhos da casa.', price: 2299, oldPrice: 2999, image: image.hotdog, featured: true, optionGroups: [hotDogProtein] },
  { id: 'hot-dog-2x1', category: 'hotdogs', name: '2x1 Hot Dog Americano', description: 'Dois hot dogs americanos com molhos e batata palha.', price: 2999, oldPrice: 3899, image: image.hotdog, featured: true },
  { id: 'hot-dog-parmesao', category: 'hotdogs', name: 'Cachorro-Quente Parmesão', description: 'Pão de parmesão, carne moída temperada e molhos especiais.', price: 2499, oldPrice: 3199, image: image.hotdog, optionGroups: [hotDogProtein] },
  { id: 'dogao-30cm', category: 'hotdogs', name: 'Dogão 30cm', description: 'Dogão gigante em pão de aproximadamente 30cm, bem servido e completo.', price: 2999, oldPrice: 3899, image: image.hotdog, featured: true, optionGroups: [hotDogProtein] },

  { id: 'combo-hot-dogs', category: 'combos', name: 'Combo Cachorros-Quentes', description: 'Dois cachorros-quentes e uma bebida refrescante.', price: 5999, image: image.hotdog, optionGroups: [sodaChoice] },
  { id: 'combo-tradicional-coca', category: 'combos', name: 'Tradicional + Coca-Cola Lata', description: 'Cachorro-quente tradicional de 20cm com bebida gelada.', price: 4098, oldPrice: 4299, image: image.hotdog, optionGroups: [hotDogProtein, sodaChoice] },
  { id: 'combo-dogao-coca', category: 'combos', name: 'Dogão 30cm + Coca-Cola Lata', description: 'Dogão de 30cm completo com bebida gelada.', price: 4998, oldPrice: 5199, image: image.hotdog, optionGroups: [hotDogProtein, sodaChoice] },

  { id: 'acai-classico', category: 'acais', name: 'Açaí Clássico', description: 'Açaí cremoso com complementos à sua escolha.', price: 1499, image: image.acai, featured: true, provisional: true, optionGroups: [acaiSize, acaiToppings] },
  { id: 'acai-frutas', category: 'acais', name: 'Açaí com Frutas', description: 'Açaí, banana, morango, granola e leite condensado.', price: 1899, image: image.acai, provisional: true, optionGroups: [acaiSize, acaiToppings] },
  { id: 'acai-especial', category: 'acais', name: 'Açaí Especial da Rota', description: 'Uma combinação generosa com frutas e complementos.', price: 2299, image: image.acai, provisional: true, optionGroups: [acaiSize, acaiToppings] },

  { id: 'sorvete-duas-bolas', category: 'sorvetes', name: 'Sorvete — 2 bolas', description: 'Duas bolas de sorvete com cobertura à escolha.', price: 999, image: image.icecream, featured: true, provisional: true, optionGroups: [iceCreamFlavor] },
  { id: 'sundae-rota', category: 'sorvetes', name: 'Sundae Rota', description: 'Sorvete cremoso, cobertura, chantilly e wafer.', price: 1499, image: image.icecream, provisional: true, optionGroups: [iceCreamFlavor] },
  { id: 'milk-shake', category: 'sorvetes', name: 'Milk-shake 400ml', description: 'Milk-shake cremoso no sabor que você escolher.', price: 1799, image: image.icecream, provisional: true, optionGroups: [iceCreamFlavor] },

  { id: 'coca-cola', category: 'bebidas', name: 'Coca-Cola Lata 350ml', description: 'Lata 350ml, servida gelada.', price: 799, image: image.drink },
  { id: 'guarana-lata', category: 'bebidas', name: 'Guaraná Antarctica Lata 350ml', description: 'Lata 350ml, servida gelada.', price: 799, image: image.drink },
  { id: 'guarana-1l', category: 'bebidas', name: 'Guaraná Antarctica 1L', description: 'Garrafa de 1 litro.', price: 999, image: image.drink },
  { id: 'agua-sem-gas', category: 'bebidas', name: 'Água Mineral sem Gás 500ml', description: 'Garrafa 500ml.', price: 399, image: image.drink },
  { id: 'agua-com-gas', category: 'bebidas', name: 'Água Mineral com Gás 500ml', description: 'Garrafa 500ml.', price: 499, image: image.drink },
  { id: 'coca-zero', category: 'bebidas', name: 'Coca-Cola Zero Lata 350ml', description: 'Lata 350ml, servida gelada.', price: 799, image: image.drink },
  { id: 'guaracamp', category: 'bebidas', name: 'Guaracamp Guaraná 285ml', description: 'Embalagem de 285ml.', price: 499, image: image.drink },
]

export const productById = (id: string) => products.find((product) => product.id === id)
