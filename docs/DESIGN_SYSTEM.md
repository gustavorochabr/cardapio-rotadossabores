# Design System — Rota dos Sabores

## Essência visual

O Rota dos Sabores deve parecer **acolhedor, apetitoso e direto**. A interface usa o violeta como assinatura da marca e equilibra essa personalidade com fundos claros, texto escuro e bastante espaço em branco. O resultado precisa dar destaque à comida e tornar o pedido simples, sem o excesso visual de um marketplace.

**Palavras-guia:** saboroso, próximo, atual, confiável, descomplicado.

## Direção de implementação

Adotaremos o **shadcn/ui** como ponto de partida dos componentes técnicos, junto de Tailwind CSS e ícones Lucide. Não será uma interface “com cara de biblioteca”: os componentes serão ajustados aos tokens e padrões abaixo e virarão componentes próprios do Rota dos Sabores.

Essa escolha é adequada porque o shadcn/ui coloca o código dos componentes dentro do projeto, dando liberdade para personalização e manutenção, além de já oferecer boas bases de acessibilidade. A documentação oficial descreve-o justamente como uma forma de construir uma biblioteca de componentes própria, e não um pacote fechado. [Conheça o shadcn/ui](https://ui.shadcn.com/docs).

## Paleta de cores

### Marca

| Token | Cor | Uso |
| --- | --- | --- |
| `brand-50` | `#F5F0FF` | fundos suaves e estados selecionados |
| `brand-100` | `#E9DDFF` | fundos de destaque discretos |
| `brand-300` | `#C7A8FF` | detalhes, ícones e estados hover claros |
| `brand-500` | `#8B3DFF` | violeta de apoio |
| `brand-600` | `#7124D8` | cor primária padrão |
| `brand-700` | `#581AAE` | hover, foco e texto sobre fundos claros |
| `brand-800` | `#40127F` | contraste forte e elementos ativos |

**Cor primária do produto:** `brand-600` (`#7124D8`). Botões primários usam texto branco; links e controles em fundo claro usam `brand-700` para preservar contraste.

### Neutros

| Token | Cor | Uso |
| --- | --- | --- |
| `neutral-0` | `#FFFFFF` | superfícies principais |
| `neutral-50` | `#FAFAFA` | fundo geral |
| `neutral-100` | `#F3F4F6` | superfícies secundárias |
| `neutral-200` | `#E5E7EB` | bordas e divisores |
| `neutral-500` | `#6B7280` | texto auxiliar |
| `neutral-700` | `#374151` | texto de apoio |
| `neutral-900` | `#111827` | texto principal |

### Cores semânticas

| Papel | Cor | Uso |
| --- | --- | --- |
| sucesso | `#16803C` | confirmação e loja aberta |
| aviso | `#B45309` | alertas que não bloqueiam o pedido |
| erro | `#C62828` | validação, indisponibilidade e falhas |
| informação | `#1D4ED8` | mensagens neutras e orientações |

Cor nunca será a única forma de comunicar um estado: ícone e texto acompanham os avisos relevantes.

## Tipografia

Usaremos **Poppins** como família principal: sua construção geométrica combina com a identidade moderna e descontraída da Rota dos Sabores, mantendo boa leitura em telas pequenas. A fonte fica hospedada no próprio projeto, com pesos de 400 a 900, e a pilha de segurança será `system-ui, sans-serif`.

| Papel | Tamanho / altura | Peso | Exemplo |
| --- | --- | --- | --- |
| título de página | 28px / 34px | 800 | “Nosso cardápio” |
| título de seção | 22px / 28px | 700 | “Mais pedidos” |
| título de produto | 16px / 22px | 700 | “Hambúrguer artesanal” |
| corpo | 15px / 22px | 500 | descrição do produto |
| apoio | 13px / 18px | 500 | ingredientes e observações |
| preço | 16px / 22px | 800 | “R$ 32,00” |
| legenda / etiqueta | 12px / 16px | 700 | “Mais vendido” |

Não usar texto menor que 12px. Textos corridos são alinhados à esquerda; valores e quantidades podem ser alinhados à direita nas linhas de resumo.

## Espaçamento, grade e forma

- Unidade base: **4px**.
- Escala: 4, 8, 12, 16, 20, 24, 32, 40 e 48px.
- Área útil no celular: margem lateral de 16px; em seções densas, o mínimo é 12px.
- Largura máxima no desktop: 1.200px, sempre centralizada.
- Altura mínima de controles tocáveis: **44px**; ação principal: 48px ou mais.
- Raios: 12px para campos e botões, 16px para cards, 24px para superfícies de destaque.
- Bordas: 1px em `neutral-200`; evitar contornos pesados.
- Sombra: discreta, usada apenas em elementos flutuantes, sacola fixa e diálogos.

## Imagens de produto

- Proporção padrão: **4:3**, com `object-fit: cover`.
- Fotos claras, próximas e sem texto embutido.
- Cada imagem recebe texto alternativo com nome do produto.
- Quando a foto não existir, exibir um placeholder neutro com ícone de talher, nunca uma área vazia.

## Componentes-base

### Botões

- **Primário:** fundo `brand-600`, texto branco; reservado para avançar, adicionar à sacola e enviar ao WhatsApp.
- **Secundário:** fundo `brand-50`, texto `brand-700`; para ações importantes, porém não decisivas.
- **Terciário:** transparente, texto `brand-700`; para “ver mais”, voltar ou copiar pedido.
- **Destrutivo:** texto/vermelho de erro, usado somente para remover ou cancelar.
- Estados obrigatórios: padrão, pressionado, foco visível, desabilitado e carregando.

O botão de envio pelo WhatsApp preserva a identidade violeta, com ícone do WhatsApp como contexto — não deve adotar o verde como cor dominante da experiência.

### Cards de produto

Cada card reúne imagem, nome, descrição curta, preço e um caminho claro para detalhes/adicionar. No celular, o padrão inicial será lista vertical com imagem à esquerda ou acima, conforme a seção; o botão de sacola nunca pode encobrir o preço.

### Sacola

A sacola é uma barra fixa no rodapé quando houver itens: mostra quantidade, valor parcial e ação “Ver sacola”. Em telas maiores, pode evoluir para painel lateral, mantendo o mesmo conteúdo e regras.

### Seletores de quantidade

Controle horizontal com menos, quantidade e mais. O toque em menos, quando a quantidade é 1, pede remoção de modo claro ou remove com feedback imediato e opção de desfazer.

### Opções de produto

- Uma escolha: botões de rádio.
- Várias escolhas: checkboxes.
- Complementos com preço: valor adicional explicitamente visível.
- Grupo obrigatório: marcador “Obrigatório” e mensagem de validação próxima do grupo.

### Campos e formulários

Rótulo sempre visível acima do campo; placeholder serve apenas de exemplo. Campos de endereço e observação usam altura e teclado apropriados para celular. Erros aparecem abaixo do campo, em linguagem simples.

### Feedback e camadas

- **Toast:** confirmação breve, como “Adicionado à sacola”.
- **Bottom sheet:** detalhes de produto e escolhas no celular.
- **Dialog:** ação irreversível ou explicação importante.
- **Skeleton:** carregamento de catálogo, sem saltos de layout.
- **Estado vazio:** instrução útil e próxima ação, por exemplo “Sua sacola está vazia. Explore o cardápio.”

## Padrões de tela

### Cabeçalho

Marca, contexto da loja (aberta/fechada) e acesso à busca. O cabeçalho é leve e não disputa atenção com a comida.

### Página inicial e categorias

Banner de boas-vindas breve, chips horizontais de categoria e seções de produtos. Chips ativos usam fundo `brand-100` e texto `brand-700`; não depender somente da mudança de cor para a seleção.

### Detalhe de produto

Foto grande, nome, preço, descrição, opções e observação. A ação “Adicionar à sacola” fica persistente no rodapé da tela em dispositivos móveis.

### Revisão do pedido

Itens agrupados, quantidades editáveis, subtotal e campos de atendimento. Antes da ação final, o texto esclarece: “Seu pedido será enviado pelo WhatsApp e confirmado pela nossa equipe.”

## Movimento

- Duração padrão: 150–200ms.
- Curva: desaceleração suave (`ease-out`).
- Usar movimento para confirmar uma ação ou revelar uma camada; nunca apenas como enfeite.
- Respeitar preferência do sistema por redução de movimento.

## Acessibilidade

- Contraste mínimo AA para texto e controles.
- Foco de teclado com anel violeta visível, sem remover o contorno padrão sem substituí-lo.
- Ícones de ação sempre têm rótulo acessível.
- O fluxo inteiro, incluindo sacola e opções, é navegável por teclado.
- O envio ao WhatsApp é sempre acompanhado de “Copiar pedido” como alternativa prática.

## O que evitamos

- Gradientes roxos muito saturados ou usados em todas as superfícies.
- Muitos estilos de card na mesma página.
- Vermelho para ações comuns; ele fica reservado a erro e remoção.
- Botões pequenos, links difíceis de tocar ou texto dentro de imagens.
- Dar impressão de pagamento concluído antes de a equipe confirmar no WhatsApp.

## Evolução sugerida

Na implementação, os primeiros componentes próprios serão: `Button`, `ProductCard`, `CategoryChip`, `QuantityStepper`, `CartBar`, `CartItem`, `OptionGroup`, `StatusBadge` e `OrderSummary`. Eles devem consumir tokens, e não cores ou espaçamentos definidos diretamente em cada tela.
