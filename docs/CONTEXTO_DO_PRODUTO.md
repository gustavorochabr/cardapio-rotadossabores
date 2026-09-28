# Contexto do produto — Rota dos Sabores

## 1. Visão

O **Rota dos Sabores** será o cardápio digital da empresa: uma experiência web, pensada primeiro para celular, em que o cliente explora produtos, escolhe variações e monta o pedido. A finalização não acontece por pagamento ou checkout no site; ela gera uma mensagem organizada para envio pelo WhatsApp da empresa.

O produto deve reduzir o atrito entre “quero pedir” e “mandar a mensagem”, evitando que o cliente precise anotar itens, preços e observações manualmente.

## 2. Problema que resolvemos

Hoje, quando o pedido é feito por conversa, é comum haver mensagens incompletas, dúvidas sobre preço, itens esquecidos e retrabalho no atendimento. O cardápio concentra as informações de venda e entrega ao WhatsApp um resumo padronizado do pedido.

## 3. Objetivos da primeira versão

- Apresentar o catálogo de forma clara e apetitiva.
- Permitir incluir diversos produtos em uma sacola.
- Permitir informar quantidades e observações por item.
- Exibir subtotal e resumo do pedido antes do envio.
- Abrir o WhatsApp com uma mensagem pronta para a empresa.
- Oferecer alternativa de copiar a mensagem quando o WhatsApp não puder ser aberto.
- Funcionar muito bem em navegadores móveis, sem exigir instalação ou conta.

## 4. O que não faz parte da primeira versão

- Pagamento online.
- Criação de conta, login ou histórico de pedidos do cliente.
- Rastreamento de entrega.
- Gestão interna de estoque, cozinha ou entregadores.
- Confirmação automática do pedido: o atendimento no WhatsApp continua sendo a fonte de confirmação.

## 5. Público e cenários principais

**Cliente pelo celular**: acessa o link vindo de Instagram, QR code, Google ou indicação; navega rapidamente, adiciona itens e envia o pedido pelo WhatsApp.

**Cliente indeciso**: percorre categorias, vê imagem, descrição, preço e detalhes dos produtos antes de decidir.

**Atendente**: recebe uma mensagem já estruturada, confere disponibilidade, calcula taxa de entrega quando necessário e confirma o pedido na conversa.

## 6. Fluxo principal

1. O cliente abre o cardápio.
2. Visualiza a marca, o status de funcionamento e as categorias.
3. Escolhe um produto e consulta seus detalhes.
4. Seleciona opções obrigatórias ou complementos, se existirem, e adiciona uma observação.
5. Adiciona o produto à sacola e pode repetir o processo.
6. Na sacola, altera quantidades, remove itens e confere subtotal.
7. Informa dados mínimos para o atendimento, como nome, entrega/retirada e endereço quando aplicável.
8. Confere o resumo e toca em **Enviar pedido pelo WhatsApp**.
9. O site abre a conversa da empresa com a mensagem preenchida; se isso falhar, o cliente pode copiar a mensagem.

## 7. Mensagem padrão para WhatsApp

O texto deve ser legível para o atendente e simples de editar pelo cliente:

```text
Olá! Gostaria de fazer um pedido pelo cardápio.

*Pedido*
• 2x Produto A — R$ 20,00
  Observação: sem cebola
• 1x Produto B — R$ 12,00

*Subtotal: R$ 32,00*

Nome: Ana
Tipo: Entrega
Endereço: Rua Exemplo, 123
Observação geral: tocar a campainha
```

Taxa de entrega e forma de pagamento podem constar como campos informativos, mas a confirmação e o cálculo final ficam com o atendimento até que essas regras estejam definidas.

## 8. Conteúdo mínimo de cada produto

- Nome.
- Foto.
- Descrição curta.
- Preço base.
- Categoria.
- Disponibilidade.
- Opções, complementos ou tamanhos, quando houver.
- Observação livre do cliente.

Cada opção precisa indicar se é obrigatória, se permite uma ou várias escolhas e se altera o preço.

## 9. Experiência e interface

O projeto será **mobile first**. A navegação deve ser confortável com uma mão, usar áreas de toque generosas e manter a sacola sempre acessível. A versão para telas maiores ampliará o conteúdo, mas não será o foco do desenho inicial.

Princípios da interface:

- A comida e os preços são a informação central.
- Categorias e busca ajudam a encontrar itens rapidamente.
- O botão da sacola mostra quantidade de itens e valor parcial.
- Estados de produto indisponível precisam ser claros e não permitir pedido.
- A confirmação anterior ao WhatsApp evita mensagens incompletas.
- Contraste, tipografia legível e textos objetivos são obrigatórios.

## 10. Dados e regras de negócio iniciais

- A sacola fica salva no dispositivo durante a navegação, para não se perder ao voltar de uma tela.
- Um produto só entra na sacola quando suas opções obrigatórias estiverem selecionadas.
- Itens iguais com escolhas ou observações diferentes permanecem separados no resumo.
- O subtotal considera produtos, opções e quantidades; não promete valor final de entrega antes das regras da empresa.
- O número do WhatsApp deve ficar configurado em um único local, no formato internacional, para facilitar manutenção.
- Horário de funcionamento e aviso de loja fechada devem ser configuráveis.

## 11. Critérios de sucesso

- Um cliente consegue montar e encaminhar o pedido sem precisar digitar os itens novamente.
- A mensagem recebida pelo atendimento contém todos os itens, quantidades, preços exibidos e observações.
- O fluxo principal é executável em um celular comum, inclusive em conexão instável.
- O site deixa transparente que o pedido só é confirmado pelo atendimento via WhatsApp.

## 12. Informações necessárias antes da implementação visual

Para transformar este contexto em uma primeira versão fiel à empresa, ainda precisaremos definir:

1. Número de WhatsApp que receberá pedidos.
2. Nome comercial final, logo e cores da marca.
3. Categorias, produtos, fotos, descrições e preços.
4. Opções por produto (tamanho, sabores, adicionais e regras de escolha).
5. Horários e dias de funcionamento.
6. Modalidades de atendimento: entrega, retirada ou consumo no local.
7. Áreas/taxa de entrega e formas de pagamento, caso devam aparecer no cardápio.
8. Tom da marca: caseiro, premium, descontraído, familiar etc.

## 13. Próxima entrega recomendada

Com essas definições, a próxima etapa é criar a estrutura navegável da primeira versão: página inicial, listagem por categoria, detalhe de produto, sacola e tela de revisão/envio pelo WhatsApp. Ela poderá usar conteúdo de exemplo até o catálogo real estar disponível.
