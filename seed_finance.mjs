import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Custom parser to load .env.local manually
const envPath = path.resolve(".env.local");
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local file not found at " + envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf-8");
const env = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let val = match[2] || "";
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[key] = val.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY not found in .env.local");
  process.exit(1);
}

console.log("Connecting to Supabase at: " + supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { id: "cat-financas-pessoais", name_pt: "Finanças Pessoais", name_en: "Personal Finance", slug: "financas-pessoais", parent_id: null },
  { id: "cat-investimentos", name_pt: "Investimentos", name_en: "Investments", slug: "investimentos", parent_id: null },
  { id: "cat-renda-extra", name_pt: "Renda Extra", name_en: "Side Income", slug: "renda-extra", parent_id: null },
  { id: "cat-planejamento-financeiro", name_pt: "Planejamento Financeiro", name_en: "Financial Planning", slug: "planejamento-financeiro", parent_id: null },
];

const articles = [
  {
    id: "art-como-sair-das-dividas",
    slug: "como-sair-das-dividas-passo-a-passo",
    title_pt: "Como Sair das Dívidas: Passo a Passo para Organizar sua Vida Financeira",
    title_en: "How to Get Out of Debt: Step-by-Step to Organize Your Financial Life",
    cover_image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000",
    cover_alt: "Carteira com dinheiro de forma organizada, simbolizando controle financeiro.",
    category_id: "cat-financas-pessoais",
    is_featured: true,
    status: "published",
    content_pt: `Estar endividado é uma das principais fontes de estresse e noites mal dormidas para milhares de pessoas. A sensação de que o dinheiro entra e desaparece imediatamente em juros e cobranças pode parecer um labirinto sem saída. No entanto, recuperar o controle da sua vida financeira é perfeitamente possível com método, paciência e disciplina.

A grande armadilha do endividamento é a falta de clareza. Muitas pessoas deixam de abrir as faturas, evitam olhar o saldo da conta e fogem de ligações de cobrança por medo do tamanho do problema. Mas o primeiro passo real para a liberdade financeira é justamente encarar os números de frente.

Este guia prático foi desenhado para ajudar você a traçar um plano de ação realista e seguro para sair do vermelho de uma vez por todas.

## O primeiro passo: o diagnóstico completo

Você não pode vencer um inimigo que não conhece. O primeiro passo é listar todas, absolutamente todas, as suas dívidas em um papel ou planilha.

Para cada dívida, anote:
- O nome do credor (banco, loja, amigo, etc.).
- O valor total atualizado da dívida.
- A taxa de juros mensal (isso é fundamental para priorizar).
- O valor da parcela mensal atual (se houver).

Com essa lista pronta, calcule o seu custo de vida mínimo mensal. Descubra quanto dinheiro você realmente precisa para cobrir as despesas básicas de sobrevivência (aluguel, água, luz, alimentação básica e transporte). A diferença entre a sua receita líquida mensal e esse custo de vida mínimo é a sua capacidade de pagamento real.

## A regra de ouro: priorize os juros mais altos

Nem todas as dívidas são iguais. Algumas acumulam juros a velocidades assustadoras, enquanto outras crescem de forma mais lenta.

A estratégia matematicamente mais eficiente é priorizar o pagamento das dívidas com as maiores taxas de juros (método avalanche). No Brasil, o cartão de crédito rotativo e o cheque especial são os grandes vilões, com taxas que podem passar de 300% ao ano. Quitar essas contas o quanto antes deve ser a sua prioridade absoluta.

Outro fator crucial são as dívidas com garantia. Se você possui um financiamento de carro ou casa atrasado, o credor pode retomar o bem de forma relativamente rápida. Portanto, garanta que essas parcelas estejam em dia para proteger o seu patrimônio e a sua moradia.

## Negociando como um profissional

Bancos e credores querem receber o dinheiro de volta e, muitas vezes, preferem dar descontos generosos a perder o valor total.

Ao entrar em contato para renegociar:
1. **Nunca aceite a primeira proposta** se ela comprometer mais de 20% a 30% da sua renda mensal. É melhor esperar e acumular um valor para quitar à vista do que assinar um parcelamento que você não conseguirá pagar.
2. **Peça descontos sobre os juros e multas.** Muitas instituições reduzem até 90% dos juros acumulados para pagamentos à vista.
3. **Use canais oficiais de negociação.** Portais como o Serasa Limpa Nome e mutirões de bancos promovidos pelo Banco Central oferecem condições especiais com segurança.`,
    content_en: "English translation coming soon. Learn how to clear your debts and manage your finances responsibly.",
  },
  {
    id: "art-onde-investir-os-primeiros-reais",
    slug: "onde-investir-os-primeiros-reais",
    title_pt: "Onde Investir os Primeiros Reais: Guia Simples para Iniciantes",
    title_en: "Where to Invest Your First Money: A Simple Guide for Beginners",
    cover_image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000",
    cover_alt: "Moedas de ouro crescendo ao lado de uma planta, simbolizando crescimento dos investimentos.",
    category_id: "cat-investimentos",
    is_featured: false,
    status: "published",
    content_pt: `Investir dinheiro pode parecer um tema complexo, restrito a especialistas em economia ou pessoas que já possuem milhões na conta. A verdade, no entanto, é que o mercado financeiro hoje é extremamente acessível. Com valores a partir de R$ 30, você já consegue se tornar um investidor e colocar o seu dinheiro para trabalhar por você.

O maior obstáculo para quem está começando não é a falta de dinheiro, mas a falta de informação segura. É comum ver iniciantes caindo em promessas de enriquecimento rápido, aplicando em criptomoedas sem entender o risco, ou simplesmente deixando o dinheiro na poupança por achar que é a única opção segura.

Neste guia, você aprenderá as bases para começar a investir com inteligência e total segurança a partir de hoje.

## Por que a poupança tradicional não é um bom investimento?

A caderneta de poupança foi, durante décadas, a aplicação favorita dos brasileiros. Ela é simples, conhecida e segura. Porém, ela possui um grande problema: a baixíssima rentabilidade.

Em cenários de inflação moderada ou alta, o rendimento da poupança costuma ficar abaixo do aumento geral dos preços. Isso significa que, mesmo vendo o número do seu saldo crescer na tela, você está perdendo poder de compra. Comprar os mesmos itens no supermercado exigirá mais dinheiro no futuro do que a poupança é capaz de render.

Felizmente, existem alternativas de Renda Fixa que são tão seguras quanto a poupança (ou até mais) e entregam uma rentabilidade significativamente superior.

## O primeiro objetivo: a Reserva de Emergência

Antes de pensar em comprar ações de empresas ou investir para a aposentadoria, o seu foco número um deve ser construir a sua Reserva de Emergência.

Essa reserva é um colchão financeiro equivalente a 3 a 6 meses do seu custo de vida mensal básico. Ela serve para cobrir imprevistos como demissão, problemas de saúde, consertos urgentes no carro ou na casa, sem que você precise recorrer a empréstimos abusivos ou entrar no cheque especial.

Os requisitos fundamentais para o dinheiro da sua reserva de emergência são:
- **Segurança extrema:** o valor não pode oscilar negativamente.
- **Liquidez diária:** facilidade de resgatar o dinheiro imediatamente, de preferência no mesmo dia.

## Três opções seguras para começar hoje

Se você quer investir com segurança e liquidez, conheça as três principais portas de entrada no mercado financeiro:

### 1. Tesouro Selic
O Tesouro Selic é um título público emitido pelo Governo Federal. Ao investir nele, você está emprestando dinheiro para o governo brasileiro em troca de juros atrelados à taxa básica da economia (a taxa Selic). É considerado o investimento mais seguro do país.

### 2. CDBs de liquidez diária
O CDB (Certificado de Depósito Bancário) é um título emitido por bancos. Ao aplicar em um CDB, você empresta dinheiro para o banco financiar suas atividades. Para a sua reserva, procure CDBs que paguem pelo menos 100% do CDI (uma taxa que acompanha muito de perto a taxa Selic) e ofereçam liquidez diária. Eles possuem a garantia do Fundo Garantidor de Créditos (FGC) para valores de até R$ 250 mil.

### 3. Contas digitais remuneradas
Diversos bancos digitais oferecem rendimento automático para o dinheiro depositado na conta corrente ou em caixinhas de investimento dedicadas. Verifique se a instituição oferece rendimento de 100% do CDI com liquidez imediata.`,
    content_en: "English version coming soon. Discover where to safely put your first savings for yield.",
  },
  {
    id: "art-ideias-de-renda-extra",
    slug: "ideias-de-renda-extra-para-comecar-hoje",
    title_pt: "Ideias de Renda Extra para Começar Hoje Sem Investir Dinheiro",
    title_en: "Side Income Ideas to Start Today with Zero Money Down",
    cover_image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000",
    cover_alt: "Pessoa trabalhando no notebook com dinheiro ao lado, ilustrando trabalho extra em casa.",
    category_id: "cat-renda-extra",
    is_featured: false,
    status: "published",
    content_pt: `No cenário econômico atual, contar com apenas uma fonte de renda pode ser um risco. Além disso, para quem deseja sair das dívidas mais rápido, acelerar a construção da reserva de emergência ou começar a investir com mais fôlego, a renda extra surge como a ferramenta de aceleração mais poderosa disponível.

A boa notícia é que a internet e o mercado de serviços descentralizados facilitaram muito a geração de renda rápida. Você não precisa fazer investimentos altos em equipamentos ou abrir uma empresa estruturada para começar.

Neste guia, separamos ideias práticas de renda extra baseadas em habilidades que você provavelmente já possui, para começar a executar imediatamente.

## Aproveitando recursos que você já possui

Muitas vezes, a resposta para a renda extra está acumulando poeira nos armários da sua casa. Vender itens que você não usa mais é a forma mais rápida de colocar dinheiro no bolso em menos de 48 horas.

Faça uma varredura completa na sua casa:
- Roupas e calçados em bom estado que não servem mais.
- Livros que você já leu e estão na estante.
- Aparelhos eletrônicos antigos, videogames ou celulares guardados nas gavetas.
- Móveis ou utensílios de cozinha sem utilidade.

Utilize plataformas como Enjoei, Mercado Livre, OLX e o Marketplace do Facebook para anunciar esses itens. Tire boas fotos com luz natural, escreva descrições honestas e coloque preços competitivos. O dinheiro gerado pode ser o pontapé inicial dos seus investimentos.

## Oferecendo serviços digitais como freelancer

Se você possui facilidade com escrita, organização, redes sociais ou fala um segundo idioma, o mercado digital está cheio de empresas e empreendedores precisando de apoio pontual.

As principais áreas demandadas hoje são:
- **Redação e Copywriting:** produção de artigos para blogs, posts para Instagram e e-mails comerciais.
- **Assistente Virtual:** organização de agendas, resposta a clientes por WhatsApp, preenchimento de planilhas e suporte administrativo básico.
- **Tradução e Transcrição:** conversão de áudios em textos ou tradução de documentos simples.
- **Design para Redes Sociais:** criação de artes e layouts básicos utilizando ferramentas intuitivas como o Canva.

Cadastre-se em portais de intermediação de freelancers como 99Freelas, Workana, Fiverr ou VinteConto. Monte um perfil caprichado, mostre exemplos do seu trabalho e envie propostas personalizadas para os projetos disponíveis.`,
    content_en: "English version coming soon. Learn side hustle tips you can leverage today for quick cash.",
  },
  {
    id: "art-metodo-50-30-20",
    slug: "metodo-50-30-20-como-organizar-orcamento",
    title_pt: "Método 50-30-20: Como Organizar seu Orçamento Mensal na Prática",
    title_en: "The 50-30-20 Method: How to Budget in Practice",
    cover_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000",
    cover_alt: "Planilha de orçamento aberta em um notebook com óculos e caneta, simbolizando planejamento.",
    category_id: "cat-planejamento-financeiro",
    is_featured: false,
    status: "published",
    content_pt: `A maioria das pessoas falha no planejamento financeiro porque tenta usar planilhas complexas demais, registrando cada bala ou café que consome. Embora o controle minucioso seja útil em momentos de crise, ele costuma ser exaustivo e difícil de sustentar a longo prazo.

A chave para manter o orçamento sob controle de forma saudável e duradoura é a simplicidade. É aqui que entra o Método 50-30-20, uma regra prática de divisão orçamentária que ajuda a equilibrar o pagamento do custo de vida básico, o aproveitamento do presente (lazer) e a construção do seu futuro financeiro (investimentos).

Criado pela senadora americana Elizabeth Warren em seu livro 'All Your Worth', o método divide sua renda líquida em três grandes blocos de despesas.

## Os três pilares do orçamento 50-30-20

A regra propõe que você divida o seu salário líquido (o valor que realmente cai na sua conta corrente após os descontos de impostos da folha de pagamento) da seguinte maneira:

### 50% para as Necessidades
Este pote é destinado às despesas indispensáveis para a sua sobrevivência e manutenção básica. Se você perder o emprego amanhã, esses são os gastos que você não pode cortar sem comprometer sua segurança.
Inclui:
- Aluguel ou prestação da casa, condomínio e IPTU.
- Contas essenciais de consumo (água, luz, gás, internet básica).
- Mercado (alimentação básica e itens de higiene).
- Transporte (combustível, transporte público, seguro do carro).
- Saúde (plano de saúde, medicamentos contínuos).

### 30% para os Desejos
Este bloco é destinado ao seu estilo de vida, lazer e conforto pessoal. Economizar dinheiro não significa viver uma vida de privações absolutas. Ter um pote dedicado aos seus desejos ajuda você a se manter motivado no longo prazo.
Inclui:
- Jantares fora de casa, bares e deliverys.
- Assinaturas de streaming (Netflix, Spotify, etc.) e TV a cabo.
- Viagens, passeios, cinema e shows.
- Compras de roupas novas, hobbies e tratamentos de beleza não essenciais.

### 20% para a Poupança e Dívidas
Este pote é voltado para construir a sua segurança financeira futura ou liquidar pendências do passado que cobram juros caros.
Inclui:
- Aportes para a Reserva de Emergência.
- Investimentos de longo prazo (ações, títulos públicos, fundos de previdência).
- Amortização de financiamentos ou pagamento de parcelas de renegociações de dívidas.

## Como colocar o método em prática a partir de hoje

1. **Descubra a sua renda líquida total.** Se você é CLT, olhe o valor final do seu holerite. Se é autônomo ou PJ, faça uma média realista dos últimos 3 a 6 meses, já deduzindo impostos e custos operacionais da sua atividade.
2. **Classifique os seus gastos atuais.** Analise o extrato bancário e a fatura do cartão do último mês e separe as despesas nas três categorias.
3. **Compare as proporções.** Verifique o quão distante o seu orçamento atual está da meta ideal de 50-30-20.
4. **Faça ajustes graduais.** Se as suas necessidades hoje consomem 70% da sua renda, trabalhe para reduzir despesas fixas (como renegociar contratos ou mudar para um plano de internet mais barato) ou busque formas de aumentar sua renda, trazendo o percentual para mais perto do alvo aos poucos.`,
    content_en: "English version coming soon. A simple budget division rule to balance necessities, fun, and savings.",
  },
];

async function run() {
  try {
    console.log("Upserting categories...");
    for (const cat of categories) {
      const { data, error } = await supabase
        .from("categories")
        .upsert(cat, { onConflict: "slug" });
      if (error) {
        throw error;
      }
      console.log(`Successfully upserted category: ${cat.slug}`);
    }

    console.log("Upserting articles...");
    for (const art of articles) {
      const { data, error } = await supabase
        .from("articles")
        .upsert(
          {
            id: art.id,
            slug: art.slug,
            title_pt: art.title_pt,
            title_en: art.title_en,
            content_pt: art.content_pt,
            content_en: art.content_en,
            cover_image: art.cover_image,
            cover_alt: art.cover_alt,
            category_id: art.category_id,
            is_featured: art.is_featured,
            status: art.status,
          },
          { onConflict: "slug" }
        );
      if (error) {
        throw error;
      }
      console.log(`Successfully upserted article: ${art.slug}`);
    }

    console.log("Database seeding completed successfully!");
  } catch (err) {
    console.error("Failed to seed database:", err);
    process.exit(1);
  }
}

run();
