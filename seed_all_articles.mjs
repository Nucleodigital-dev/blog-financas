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
  // 1. CALCULADORA DE JUROS COMPOSTOS
  {
    id: "art-calculadora-juros-compostos",
    slug: "calculadora-juros-compostos",
    title_pt: "Calculadora de Juros Compostos: Quanto Rende seu Dinheiro no Longo Prazo?",
    title_en: "Compound Interest Calculator: How Much Your Money Yields In the Long Run",
    cover_image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000",
    cover_alt: "Gráfico financeiro brilhante subindo de forma exponencial, representando juros compostos.",
    category_id: "cat-investimentos",
    is_featured: true,
    status: "published",
    content_pt: `Os juros compostos são considerados a "oitava maravilha do mundo" por uma razão muito simples: eles fazem o dinheiro crescer de forma exponencial. Diferente dos juros simples, onde o rendimento é calculado apenas em cima do valor inicial, nos juros compostos você ganha juros sobre os juros que já foram acumulados.

No início de uma jornada de investimentos, o crescimento parece lento e desanimador. R$ 100 rendem alguns centavos por mês. Mas conforme os anos passam, a bola de neve ganha tração e velocidade. Em prazos mais longos (como 10, 20 ou 30 anos), a maior parte do seu patrimônio final será composta por rendimentos do mercado, e não pelos aportes que você fez do próprio bolso.

Utilize o simulador interativo abaixo para calcular exatamente a evolução do seu patrimônio de forma visual!

---

## Como usar a Calculadora de Juros Compostos a seu favor

Para extrair o melhor resultado dos seus investimentos e simular cenários realistas, você precisa compreender três variáveis fundamentais:

1. **O Aporte Inicial:** O valor que você tem hoje para começar. Não se preocupe se for pouco (como R$ 100 ou R$ 500). O segredo está no hábito e não no montante inicial.
2. **A Regularidade (Aportes Mensais):** Este é o verdadeiro motor da riqueza. Investir R$ 200 todos os meses de forma consistente é infinitamente mais poderoso do que investir R$ 2.000 uma única vez e parar.
3. **A Taxa de Juros (Rentabilidade):** A taxa de juros real anual da sua carteira. Lembre-se de descontar a inflação para simular o ganho de poder de compra real no futuro.
4. **O Tempo:** O fator de maior peso na fórmula. Dobrar o tempo de investimento não apenas dobra o resultado final - muitas vezes ele multiplica o valor por quatro ou cinco vezes devido ao efeito exponencial da curva.

## O Impacto da Curva Exponencial
Nos primeiros 5 anos, a diferença entre manter o dinheiro embaixo do colchão e investir em uma boa carteira de renda fixa parece marginal. O gráfico de evolução é quase uma linha reta. No entanto, após o 10º ano, a inclinação da curva muda drasticamente de rumo. O rendimento mensal começa a superar o valor do próprio aporte mensal. É nesse estágio que ocorre o efeito de "juros pagando juros", pavimentando o seu caminho rumo à independência financeira definitiva.`,
    content_en: "English version coming soon. Calculate how your monthly savings grow exponentially over time using compound interest.",
  },

  // 2. SIMULADOR DE RESERVA DE EMERGÊNCIA
  {
    id: "art-simulador-reserva-emergencia",
    slug: "simulador-reserva-emergencia",
    title_pt: "Simulador de Reserva de Emergência: Quanto Você Precisa e Onde Guardar?",
    title_en: "Emergency Fund Simulator: How Much You Need And Where To Save It",
    cover_image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000",
    cover_alt: "Mão colocando moeda em um porquinho dourado em fundo verde escuro.",
    category_id: "cat-planejamento-financeiro",
    is_featured: false,
    status: "published",
    content_pt: `A reserva de emergência é o pilar mais importante de qualquer planejamento financeiro saudável. Antes de pensar em comprar ações, fundos imobiliários ou qualquer ativo de renda variável, você precisa garantir que possui uma rede de segurança sólida para proteger você e sua família de imprevistos inevitáveis.

Problemas de saúde, desemprego inesperado, consertos urgentes no carro ou infiltrações em casa acontecem com todos. Sem uma reserva financeira de alta liquidez, a única alternativa para a maioria das pessoas é recorrer a empréstimos bancários caros, cheque especial ou faturas rotativas do cartão de crédito, gerando uma espiral perigosa de dívidas.

Abaixo, utilize o nosso simulador interativo para calcular a sua reserva recomendada com base nas suas necessidades particulares.

---

## O que define uma boa Reserva de Emergência?

Diferente de investimentos focados em aposentadoria, onde a rentabilidade de longo prazo é o objetivo principal, a reserva de emergência possui duas regras sagradas que nunca devem ser quebradas:

1. **Segurança Extrema:** O dinheiro deve ser investido em ativos com risco de crédito praticamente nulo. Não coloque este capital em renda variável, criptomoedas ou fundos com risco de perda do valor principal.
2. **Liquidez Imediata (D+0):** Você precisa ter a capacidade de resgatar esse dinheiro no exato instante em que a emergência bater à sua porta, incluindo noites e fins de semana.

## Onde aplicar a sua Reserva de Emergência?
As três opções recomendadas no Brasil atual que reúnem segurança extrema e alta liquidez são:
- **Tesouro Selic (Título Público Federal):** A aplicação de menor risco de crédito do país, pagando juros diários com base na taxa básica Selic.
- **CDB de liquidez diária de grandes bancos:** Que paguem no mínimo 100% do CDI, garantidos pelo Fundo Garantidor de Crédito (FGC).
- **Contas remuneradas com garantia em títulos públicos:** Como as "caixinhas" com liquidez imediata oferecidas por bancos digitais consolidados.`,
    content_en: "English version coming soon. Discover how many months of costs you need as a safety net and check the best places to store it.",
  },

  // 3. CALCULADORA DE CUSTO EFETIVO TOTAL (CET)
  {
    id: "art-calculadora-cet",
    slug: "calculadora-cet",
    title_pt: "Calculadora de Custo Efetivo Total (CET): Como Não Ser Enganado em Empréstimos",
    title_en: "Total Effective Cost (CET) Calculator: Avoid Being Tricked by Loans",
    cover_image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000",
    cover_alt: "Calculadora, caneta e documentos de taxas bancárias sobre a mesa.",
    category_id: "cat-financas-pessoais",
    is_featured: false,
    status: "published",
    content_pt: `Ao contratar um empréstimo, financiamento ou parcelamento de longo prazo, a maioria das pessoas olha apenas para a taxa de juros anunciada pela instituição financeira. No entanto, focar unicamente nessa taxa é um dos maiores erros que você pode cometer, pois ela raramente representa o custo real da operação.

É aqui que entra o **Custo Efetivo Total (CET)**. Exigido pelo Banco Central, o CET é uma taxa percentual anualizada que reúne todos os encargos, tarifas, impostos (como o IOF), registros de contrato e seguros obrigatórios associados ao empréstimo. Muitas vezes, uma instituição anuncia juros baixos de 12% ao ano, mas cobra tantas tarifas extras que o CET real ultrapassa 22% ao ano.

Compare as taxas nominais vs. reais no nosso simulador de CET exato abaixo!

---

## As taxas embutidas que encarecem o seu crédito

Quando você assina um contrato de crédito, o banco costuma adicionar silenciosamente várias taxas além dos juros puramente contratuais:

- **Imposto sobre Operações Financeiras (IOF):** Imposto federal obrigatório sobre transações de crédito, cobrado proporcionalmente ao prazo do contrato.
- **Tarifa de Abertura de Cadastro (TAC):** Tarifa que os bancos cobram para analisar a ficha do cliente.
- **Seguro Prestamista:** Seguro de vida embutido que quita as parcelas do empréstimo em caso de desemprego ou falecimento. Embora seja útil, muitas vezes é embutido sem autorização explícita (venda casada).
- **Taxas Administrativas e de Avaliação de Bens:** Comuns em financiamentos de imóveis ou veículos.

## Como usar o CET para economizar milhares de reais?
Antes de fechar qualquer contrato, exija sempre a **Planilha do Custo Efetivo Total (CET)**. Faça a comparação direta de propostas de diferentes instituições usando o CET como critério definitivo. Quem tiver o menor CET real oferece o empréstimo mais barato, independente de qual seja a taxa de juros nominal exibida em letras garrafais no anúncio publicitário!`,
    content_en: "English version coming soon. Understand how hidden fees, IOF, and insurance raise your actual loan interest rate.",
  },

  // 4. SIMULADOR DE INDEPENDÊNCIA FINANCEIRA (FIRE)
  {
    id: "art-simulador-independencia-financeira",
    slug: "simulador-independencia-financeira",
    title_pt: "Simulador de Independência Financeira (FIRE): Quanto Investir para Viver de Renda?",
    title_en: "FIRE Independence Simulator: How Much to Save to Live Off Capital Yields",
    cover_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000",
    cover_alt: "Pessoa olhando o horizonte no topo de uma montanha ao pôr do sol, expressando liberdade.",
    category_id: "cat-planejamento-financeiro",
    is_featured: false,
    status: "published",
    content_pt: `O movimento **FIRE (Financial Independence, Retire Early)** ganhou força global por propor uma meta ousada: acumular patrimônio de forma focada para conquistar a liberdade de escolha e poder se aposentar ou desacelerar profissionalmente muito antes da idade tradicional imposta pelo governo.

A essência do movimento FIRE não é viver uma vida de privações extremas perpétuas, mas entender que cada real que você economiza e investe hoje encurta o seu tempo de dependência de um emprego convencional. A meta é atingir um patamar onde o rendimento da sua carteira de investimentos seja plenamente capaz de cobrir o seu custo de vida perpétuo.

Abaixo, faça a simulação do seu Número FIRE e descubra o tempo necessário para alcançar este objetivo.

---

## O que é a Regra dos 4% e o Número FIRE?

Baseado no famoso estudo Trinity da Universidade de Harvard, o movimento FIRE adota a **Regra dos 4%** como uma taxa segura de retirada anual para manter o patrimônio intacto durante décadas:

- **O Número FIRE:** Para viver de renda sem nunca corroer o seu principal, você precisa acumular **25 vezes o seu custo de vida anual** (ou multiplicar o seu custo fixo mensal por 300).
- **Exemplo:** Se o seu custo de vida mínimo é de R$ 5.000 por mês, o seu Número FIRE alvo é R$ 1.500.000.
- **A Retirada Segura:** Retirando 4% desse montante ao ano (R$ 60.000, ou R$ 5.000 por mês) e corrigindo pela inflação, as chances do seu dinheiro acabar antes de 30 anos são praticamente nulas.

## Como Acelerar a sua Jornada FIRE
Existem apenas três alavancas capazes de acelerar a sua conquista da independência financeira:
1. **Aumentar o Aporte Mensal:** Desenvolver novas fontes de renda extra para aumentar o excedente investido.
2. **Reduzir o Custo de Vida:** Adotar o minimalismo inteligente e focar em experiências que não demandam gastos pesados de manutenção recorrente.
3. **Buscar Rentabilidade Real Superior:** Montar uma carteira diversificada em Renda Fixa e Renda Variável de qualidade para capturar prêmios de juros reais mais expressivos.`,
    content_en: "English version coming soon. Calculate your target capital under the 4% rule and simulate the timeline to reach it.",
  },

  // 5. COMPARADOR DE RENDA FIXA (TESOURO VS POUPANÇA VS CDB)
  {
    id: "art-comparador-renda-fixa",
    slug: "comparador-renda-fixa",
    title_pt: "Comparador de Renda Fixa: Tesouro Direto vs. Poupança vs. CDB",
    title_en: "Fixed Income Comparison: Tesouro Direto vs. Poupança vs. CDB",
    cover_image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000",
    cover_alt: "Gráfico de barras douradas simulando rendimentos de investimentos seguros.",
    category_id: "cat-investimentos",
    is_featured: false,
    status: "published",
    content_pt: `A Renda Fixa é o porto seguro de milhões de investidores brasileiros. Ela garante que, no momento da aplicação, você já saiba exatamente a regra de juros que receberá pelo seu capital. Porém, dentro da própria Renda Fixa existem diferenças brutais de rendimento que podem fazer você perder muito dinheiro sem perceber.

Muitas pessoas mantêm economias acumuladas na poupança por medo ou desconhecimento de alternativas. O que elas não enxergam é que a poupança rende pouquíssimo e perde constantemente para a inflação real. Outras alternativas com o mesmo nível de segurança chegam a pagar 50% a mais de rendimento líquido ao ano.

Compare as três principais aplicações de Renda Fixa no nosso simulador líquido dinâmico abaixo!

---

## Entendendo os principais investimentos de Renda Fixa

1. **Poupança Tradicional:** O rendimento é tabelado por lei. Se a taxa Selic estiver acima de 8,5% ao ano, ela rende fixo 0,5% ao mês + Taxa Referencial (TR). É isenta de Imposto de Renda, mas sua rentabilidade líquida é sempre a menor do mercado.
2. **CDB 100% do CDI:** Títulos emitidos por bancos privados para captar recursos. O rendimento acompanha a taxa interbancária CDI (que caminha ao lado da taxa Selic). Sofre cobrança progressiva de Imposto de Renda (de 22.5% a 15% sobre o lucro, a depender do tempo de aplicação), mas rende significativamente mais que a poupança mesmo após o desconto de impostos. Protegido pelo FGC.
3. **Tesouro Selic:** Títulos da dívida pública emitidos pelo Governo Federal. É o ativo de menor risco da economia nacional, excelente para iniciantes e formação de reserva de emergência. A B3 cobra uma pequena taxa de custódia anual (0,2%) para valores acima de R$ 10.000, mas o retorno final bate a poupança com facilidade.

## Tabela de Alíquotas de Imposto de Renda sobre Renda Fixa
Diferente da poupança, os CDBs e Títulos Públicos sofrem incidência de IR sobre o lucro no momento do resgate, seguindo a tabela regressiva:
- **Até 180 dias de aplicação:** 22,5% sobre os ganhos.
- **De 181 a 360 dias:** 20,0% sobre os ganhos.
- **De 361 a 720 dias:** 17,5% sobre os ganhos.
- **Acima de 720 dias:** 15,0% sobre os ganhos.`,
    content_en: "English version coming soon. Compare fixed income instruments net of taxes and optimize your safety funds.",
  },

  // 6. FINANCIAMENTO DE IMÓVEL VS ALUGUEL
  {
    id: "art-financiamento-imovel-vs-aluguel",
    slug: "financiamento-imovel-vs-aluguel",
    title_pt: "Financiamento de Imóvel vs. Aluguel: A Matemática Financeira que os Bancos Omitam",
    title_en: "Buying vs. Renting: The Financial Math Banks Never Reveal",
    cover_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000",
    cover_alt: "Chave de casa de metal dourada com chaveiro de casa pequena de madeira.",
    category_id: "cat-planejamento-financeiro",
    is_featured: false,
    status: "published",
    content_pt: `A compra da casa própria é considerada o maior sonho de consumo das famílias brasileiras. Culturalmente, fomos ensinados que "quem aluga está jogando dinheiro fora" e que "financiar é pagar por algo que será seu". Mas será que essa afirmação se sustenta quando fazemos as contas usando matemática financeira pura?

A verdade é que um financiamento imobiliário de 30 anos (SAC ou Price) é, em essência, um aluguel de dinheiro pago ao banco. Ao financiar um imóvel de R$ 300.000 com parcelas de R$ 2.500 por mês durante 360 meses, você pagará mais de R$ 800.000 no final. Mais da metade do seu dinheiro suado virará juros puramente bancários, enriquecendo a instituição credora.

Neste artigo, desmistificamos a matemática imobiliária para que você tome a decisão certa para o seu bolso.

---

## O Custo Invisível do Financiamento

Quando financiamos, pagamos muito mais do que apenas a amortização do valor do imóvel. Existem despesas pesadas associadas que são completamente ignoradas na hora da emoção do fechamento:

- **Juros Compilados de 30 Anos:** A taxa de juros nominal anual pode parecer baixa (e.g. 9,5% a.a.), mas compounding sobre 30 anos multiplica o saldo devedor brutalmente.
- **Seguros Obrigatórios (MIP e DFI):** Seguros exigidos em contratos habitacionais que encarecem a parcela todos os meses.
- **Taxas de Administração de Contrato:** Uma cobrança mensal fixa repassada ao comprador pela instituição financeira.
- **Impostos e Cartório (ITBI):** Custos imediatos na assinatura que chegam a consumir 4% a 5% do valor total do imóvel.

## A Alternativa de Alugar e Investir a Diferença
Se o aluguel do mesmo imóvel custa R$ 1.200 e a parcela do financiamento seria de R$ 2.500, você possui uma diferença disponível de R$ 1.300 todos os meses.
Se você investir esses R$ 1.300 em títulos de Renda Fixa ou Fundos Imobiliários de qualidade pagando juros reais consistentes:
- Em menos de 12 a 15 anos, você acumulará capital líquido suficiente para **comprar o imóvel à vista**, economizando 15 anos de escravidão de parcelas bancárias.
- A decisão de comprar ou alugar não deve ser emocional. Trata-se de avaliar a relação entre a taxa de juros do financiamento contra a rentabilidade esperada dos seus investimentos!`,
    content_en: "English version coming soon. Discover the actual cost of a 30-year property mortgage vs. renting and investing the difference.",
  },

  // 7. O VERDADEIRO CUSTO DE TER UM CARRO ZERO
  {
    id: "art-verdadeiro-custo-carro-zero",
    slug: "verdadeiro-custo-carro-zero",
    title_pt: "O Verdadeiro Custo de Ter um Carro Zero: Por Que Ele é o Seu Pior Investimento",
    title_en: "The True Cost of a Brand New Car: Why It's Your Worst Financial Decision",
    cover_image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000",
    cover_alt: "Carro moderno e brilhante exposto em concessionária elegante de alto padrão.",
    category_id: "cat-financas-pessoais",
    is_featured: false,
    status: "published",
    content_pt: `Poucos símbolos de status social são tão fortes na cultura brasileira quanto o carro zero quilômetro. O cheiro de novo, as tecnologias de bordo e o prazer de sair da concessionária com um veículo intocado são inegáveis. Mas do ponto de vista puramente financeiro, o carro zero é uma das máquinas mais eficientes de destruir patrimônio pessoal.

Ao cruzar o portão da concessionária, o carro perde instantaneamente de 10% a 20% do seu valor comercial de mercado. Essa depreciação é apenas o topo do iceberg. O verdadeiro custo de manter um veículo de luxo zero consome fatias absurdas da renda mensal de um profissional que poderiam estar acelerando sua independência financeira.

---

## O Impacto Financeiro Oculto (Muito Além do Combustível)

Ter um carro novo envolve uma série de despesas fixas recorrentes e silenciosas que poucos motoristas de fato colocam na ponta do lápis:

- **Depreciação Acelerada:** Nos primeiros 3 anos, o automóvel perde cerca de 30% a 40% do seu valor de tabela FIPE original.
- **IPVA:** Imposto estadual anual pesado (que varia de 2% a 4% do valor venal do veículo na maioria dos estados).
- **Seguro Auto Compulsório:** Seguros para carros zero são extremamente caros para evitar perdas totais, roubos e sinistros em áreas urbanas de risco.
- **Custo de Oportunidade do Capital:** Se você gastou R$ 120.000 à vista em um carro, deixou de ter esse capital aplicado rendendo juros líquidos mensais de mais de R$ 1.000 no mercado financeiro.

## Comparações Práticas de Manutenção
Um motorista consciente prefere adquirir veículos seminovos com 2 a 3 anos de uso. Nesse momento:
- A curva mais violenta de depreciação já foi absorvida pelo primeiro dono do carro.
- O preço de aquisição é muito menor, liberando capital excedente para ser investido produtivamente no Tesouro Direto ou CDBs de qualidade!`,
    content_en: "English version coming soon. Learn the detailed cost breakdown of new car depreciation, insurance, and taxes.",
  },

  // 8. CONSÓRCIO VALE A PENA?
  {
    id: "art-consorcio-vale-a-pena",
    slug: "consorcio-vale-a-pena",
    title_pt: "Consórcio Vale a Pena? Entenda as Taxas Ocultas e Quem Realmente Ganha",
    title_en: "Is Group Financing (Consórcio) Worth It? Unveiling the Hidden Costs",
    cover_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000",
    cover_alt: "Reunião de negócios com gráficos e tabelas de taxas financeiras de investimento.",
    category_id: "cat-investimentos",
    is_featured: false,
    status: "published",
    content_pt: `Os consórcios são amplamente promovidos no Brasil pelas instituições bancárias como uma "poupança forçada inteligente" ou "uma alternativa excelente de financiamento sem juros". De fato, a ausência de taxa de juros clássica atrai milhares de investidores que temem o financiamento tradicional. Mas a verdade é que o consórcio possui custos pesados e ineficiências matemáticas gravíssimas.

Se você está pensando em assinar um consórcio de imóveis ou veículos, pare imediatamente e leia este artigo. Vamos analisar friamente a estrutura de taxas deste produto bancário e provar matematicamente porque ele raramente beneficia o cliente.

---

## O Mito do "Financiamento Sem Juros"

Embora não exista a palavra "juros" escrita nas lâminas dos consórcios, existem outras cobranças que drenam a rentabilidade do seu capital de forma silenciosa:

- **Taxa de Administração:** Cobrada mensalmente pela administradora do grupo para gerir os recursos. Varia de 15% a 25% sobre o valor total do bem ao longo do plano.
- **Fundo de Reserva:** Uma taxa extra recolhida para cobrir inadimplências de outros membros do grupo.
- **Reajustes Anuais do Saldo Devedor:** Para garantir que a carta de crédito consiga comprar o bem no futuro, a parcela do consórcio é reajustada periodicamente por índices de inflação do setor (como o INCC para imóveis ou IPCA). Conforme o saldo devedor cresce, as suas parcelas também sobem de valor ao longo dos anos, mesmo após você ser contemplado.

## O Custo de Oportunidade e o Sorteio
No consórcio, você paga parcelas hoje para ter a chance de ser contemplado por sorteio ou lance. Se você for sorteado apenas nos últimos meses do grupo (o que pode levar 10 ou 15 anos):
- Você terá emprestado dinheiro sem juros para a administradora por anos a fio.
- Se tivesse investido o valor da parcela em um bom título indexado à inflação (Tesouro IPCA+), você já teria o valor total para comprar o bem à vista muito antes da contemplação por sorteio!`,
    content_en: "English version coming soon. Learn the mathematical reality behind admin fees and indexation updates in group savings schemes.",
  },

  // 9. A ILUSÃO DA SEGURANÇA DA POUPANÇA
  {
    id: "art-poupanca-ilusao-seguranca",
    slug: "poupanca-ilusao-seguranca",
    title_pt: "A Ilusão da Segurança: Por Que Deixar Dinheiro na Poupança Faz Você Empobrecer",
    title_en: "The Safety Illusion: Why Keeping Money in Savings Accounts Bleeds Wealth",
    cover_image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000",
    cover_alt: "Mão segurando moeda sobre pote de vidro fechado cheio de economias estagnadas.",
    category_id: "cat-investimentos",
    is_featured: false,
    status: "published",
    content_pt: `A caderneta de poupança é o investimento mais tradicional do Brasil. Transmitida de geração para geração, ela é sinônimo de tranquilidade e simplicidade. Infelizmente, no cenário financeiro moderno, a poupança tornou-se uma das piores decisões que você pode tomar para o seu patrimônio. Ela cria uma perigosa ilusão de segurança.

A ilusão está no fato de que o saldo da sua poupança nunca diminui nominalmente na tela do banco. Você sempre vê alguns centavos adicionados no aniversário mensal. Mas a verdadeira segurança financeira deve ser medida pelo **poder de compra real** do seu capital. Se o preço das coisas no mercado sobe mais rápido do que o rendimento da sua aplicação, você está empobrecendo de forma silenciosa todos os dias.

---

## Inflação Real vs. Rendimento Nominal

Para entender a armadilha da poupança, você precisa compreender a diferença entre juros nominais e juros reais:

- **Juros Nominais:** É a taxa bruta que o investimento entrega (ex: a poupança rendendo 6,17% ao ano).
- **Juros Reais:** É o ganho real de capital após descontarmos a inflação oficial (IPCA). Se a inflação do ano foi de 6,50% e a sua poupança rendeu 6,17%, seu ganho real foi de **-0,33%**.
- **O Efeito Prático:** Com o dinheiro guardado na poupança, você consegue comprar menos itens no supermercado hoje do que conseguia comprar no ano passado. O seu patrimônio está sofrendo corrosão invisível.

## Alternativas com a Mesma Segurança
Hoje, com os bancos digitais e a desmistificação da corretagem de valores, você consegue acessar produtos com o exato mesmo nível de risco e garantia de segurança (FGC ou Garantia Soberana do Governo) que rendem de 30% a 50% a mais:
- **CDBs de liquidez diária** de bancos de renome.
- **Tesouro Selic** diretamente no aplicativo da sua instituição.
- Não deixe a inércia sabotar os frutos do seu trabalho suado!`,
    content_en: "English version coming soon. Learn how inflation erodes cash and how to secure better yields with equal protection.",
  },

  // 10. VALE A PENA ANTECIPAR PARCELAS DE EMPRÉSTIMO?
  {
    id: "art-antecipar-parcelas-emprestimo",
    slug: "antecipar-parcelas-emprestimo",
    title_pt: "Vale a Pena Antecipar Parcelas de Empréstimo? Saiba Como Funciona o Desconto",
    title_en: "Should You Prepay Loan Installments? How Interest Discount Works in Practice",
    cover_image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000",
    cover_alt: "Pessoa segurando caneta analisando contrato de dívida bancária com carimbo de desconto.",
    category_id: "cat-financas-pessoais",
    is_featured: false,
    status: "published",
    content_pt: `Se você possui uma dívida ativa (empréstimo pessoal, consignado, financiamento de veículo ou imóvel), provavelmente já pensou em usar qualquer dinheiro extra que recebe, como décimo terceiro salário, férias ou renda extra, para antecipar o pagamento das parcelas. Mas será que isso é financeiramente vantajoso?

A resposta curta é: **sim, quase sempre vale muito a pena**. A amortização antecipada é uma das ferramentas mais poderosas para economizar juros e se livrar de dívidas anos antes do previsto. Por lei, todo consumidor tem direito ao desconto proporcional dos juros sempre que adianta o pagamento de uma parcela.

Aprenda a aplicar essa estratégia de forma profissional no seu dia a dia.

---

## Amortização por Prazo vs. Amortização por Parcela

Ao antecipar parcelas, o banco oferece duas modalidades principais de abatimento da dívida:

1. **Reduzir o Valor da Parcela Recorrente:** Você continua pagando o mesmo número de meses contratados inicialmente, mas o valor de cada prestação mensal cai. Excelente se o orçamento mensal estiver sufocante.
2. **Reduzir o Prazo do Contrato (Recomendado):** Você abate parcelas diretamente do final da dívida. O valor da parcela atual se mantém estável, mas o contrato termina muito mais rápido. Essa modalidade é de longe a que garante o **maior desconto em juros absolutos**, pois elimina o tempo de incidência de compounding futuro.

## Como Solicitar a Amortização Corretamente
- Acesse o aplicativo do seu banco ou entre em contato com o atendimento oficial.
- Solicite a emissão de boleto para amortização do saldo devedor com desconto proporcional de juros.
- Certifique-se de que a amortização seja direcionada para **redução de prazo**, quitando as parcelas de trás para frente. Isso impede que os juros adicionais continuem correndo sobre o saldo acumulado!`,
    content_en: "English version coming soon. Learn how prepaying installments reduces interest costs and shortcuts financial independence.",
  },

  // 11. COMO SAIR DAS DÍVIDAS GANHANDO POUCO
  {
    id: "art-como-sair-das-dividas-ganhando-pouco",
    slug: "como-sair-das-dividas-ganhando-pouco",
    title_pt: "Como Sair das Dívidas Ganhando Pouco: Um Plano Prático de 5 Passos",
    title_en: "How to Get Out of Debt on a Low Income: A Practical 5-Step Plan",
    cover_image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000",
    cover_alt: "Pessoa organizando papéis e moedas de forma serena em mesa limpa de madeira clara.",
    category_id: "cat-financas-pessoais",
    is_featured: false,
    status: "published",
    content_pt: `A maioria dos conselhos financeiros tradicionais sobre como sair do vermelho parece desconectada da realidade de quem ganha um salário mínimo ou tem um orçamento extremamente apertado. Cortar o cafezinho diário ou reduzir assinaturas de streaming não resolve o problema de quem mal consegue pagar o aluguel e as contas básicas de mercado.

A verdade é que sair das dívidas ganhando pouco exige uma estratégia focada em sobrevivência física primeiro, estabilização psicológica em seguida, e negociação inteligente depois. Não se trata de milagres, mas de aplicar regras matemáticas frias e blindar a sua renda básica de pressões bancárias injustas.

Conheça o nosso plano prático e realista de 5 passos desenhado para quem precisa respirar financeiramente.

---

## Passo 1: Blinde o seu Salário Essencial
Bancos costumam descontar dívidas de cartões e empréstimos diretamente na sua conta corrente assim que seu salário é depositado. Para evitar isso, abra imediatamente uma **Conta Salário** em outro banco de sua preferência ou solicite a **portabilidade salarial** para uma conta digital que não possua pendências de crédito. O seu dinheiro para comida e moradia deve estar totalmente protegido de cobranças automáticas automáticas.

## Passo 2: O Diagnóstico e a Lista Realista
Escreva em um papel apenas as dívidas comerciais (cartão, empréstimo, carnês). Separe-as de contas essenciais como água, luz e aluguel. Lembre-se: contas de consumo básico devem ser prioridade máxima para evitar cortes de serviços fundamentais.

## Passo 3: Priorize o Cartão de Crédito e o Especial
As dívidas de juros rotativos são os grandes vilões do orçamento. Se não puder pagá-las agora, deixe-as paradas temporariamente. Junte dinheiro aos poucos para negociar à vista futuramente com descontos massivos de até 90% através de mutirões judiciais de renegociação.

## Passo 4: Crie Pequenas Fontes de Receita Extra
Qualquer recurso adicional gerado, como venda de itens sem uso, serviços rápidos de fins de semana, deve ser mantido em conta de investimentos segura e intocada para construir sua reserva básica.

## Passo 5: Feche Acordos que Cabem no Bolso
Nunca assine acordos de parcelamento de renegociação com parcelas maiores do que sua real capacidade de pagamento líquida mensal. Caso contrário, você renegociará a dívida e atrasará novamente, acumulando ainda mais juros acumulados sobre o novo contrato!`,
    content_en: "English version coming soon. Discover a practical 5-step checklist to recover your financial dignity on a budget.",
  },

  // 12. ONDE INVESTIR OS PRIMEIROS R$ 100,00
  {
    id: "art-onde-investir-os-primeiros-100-reais",
    slug: "onde-investir-os-primeiros-100-reais",
    title_pt: "Onde Investir os Primeiros R$ 100,00: O Guia Definitivo Sem Jargões",
    title_en: "Where to Invest Your First R$ 100: The Definitive Jargon-Free Guide",
    cover_image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000",
    cover_alt: "Mão depositando nota de cem reais de forma calma e decidida em fundo minimalista.",
    category_id: "cat-investimentos",
    is_featured: false,
    status: "published",
    content_pt: `Muitas pessoas adiam o início dos seus investimentos por acreditarem que precisam acumular milhares de reais antes de abrir conta em uma corretora de valores. Esse é um mito prejudicial herdado da era dos grandes bancos tradicionais. A verdade é que com apenas R$ 100,00 você já consegue acessar os melhores investimentos do Brasil.

O maior benefício de investir os primeiros R$ 100,00 não é o ganho financeiro imediato em reais (que será pequeno), mas a construção do **hábito de poupar** e o aprendizado prático de como a plataforma de investimentos funciona. Ao quebrar a inércia e fazer a sua primeira aplicação, você se torna oficialmente um investidor ativo.

---

## Três Aplicações Premium para os Seus R$ 100,00

1. **Tesouro Selic 2029 (Aproximadamente R$ 145,00 ou frações):** Embora a cota cheia do título custe mais, o programa do Tesouro Direto permite a compra de frações mínimas equivalentes a 1% do valor do título, a partir de cerca de R$ 30,00! É a aplicação mais segura do mercado nacional, excelente para construir sua segurança.
2. **CDB 100% do CDI com Liquidez Diária:** Dezenas de bancos digitais e corretoras de alta reputação oferecem aplicação inicial mínima de apenas R$ 1,00 nestes títulos. Rende diariamente de forma constante e tem a segurança integral do FGC.
3. **Fundos de Renda Fixa Simples (Taxa Zero):** Fundos focados em títulos públicos federais que não cobram taxa de administração e aceitam aportes a partir de R$ 10,00 ou R$ 50,00.

## Passo a Passo para Investir os Primeiros R$ 100,00
- **Passo 1:** Abra conta em uma corretora de valores com taxa de corretagem zero para renda fixa.
- **Passo 2:** Transfira seus R$ 100,00 via Pix a partir de sua conta de mesma titularidade.
- **Passo 3:** No menu "Renda Fixa" ou "Tesouro Direto", selecione o título escolhido.
- **Passo 4:** Digite o valor que deseja aplicar (ex: R$ 100) e confirme a operação digitando sua assinatura eletrônica!`,
    content_en: "English version coming soon. Learn how easy it is to start building wealth with as little as 100 reais.",
  },

  // 13. TESOURO DIRETO PARA LEIGOS
  {
    id: "art-tesouro-direto-para-leigos",
    slug: "tesouro-direto-para-leigos",
    title_pt: "Tesouro Direto para Leigos: Como Funciona e Qual Título Escolher",
    title_en: "Tesouro Direto for Beginners: How It Works and How to Select Your First Bond",
    cover_image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000",
    cover_alt: "Logotipo oficial e tela do aplicativo do Tesouro Direto demonstrando facilidade.",
    category_id: "cat-investimentos",
    is_featured: false,
    status: "published",
    content_pt: `Se você quer sair da poupança e começar a investir com inteligência, a sua porta de entrada obrigatória é o **Tesouro Direto**. Desenvolvido pelo Governo Federal em parceria com a B3 (a bolsa de valores brasileira), o programa permite que qualquer pessoa física compre títulos públicos diretamente pela internet, a partir de aproximadamente R$ 30,00.

Ao investir no Tesouro Direto, você está, em termos simples, emprestando dinheiro para o governo brasileiro em troca de rendimentos futuros. Como o governo federal é a instituição com maior poder de arrecadação do país, os títulos públicos são considerados os ativos de menor risco de crédito de toda a economia nacional.

Aprenda a escolher o título ideal para a sua necessidade de forma clara e descomplicada.

---

## Os Três Tipos Principais de Títulos Públicos

O Tesouro Direto oferece títulos adequados para diferentes objetivos e prazos. Entender a diferença evita erros de resgate antecipado indesejados:

### 1. Tesouro Selic (Pós-Fixado)
Rende de acordo com a taxa Selic básica da economia. Possui liquidez imediata (D+0) e o seu rendimento diário impede perdas em caso de resgates emergenciais.
- **Ideal para:** Reserva de emergência ou objetivos de curto prazo.

### 2. Tesouro IPCA+ (Híbrido)
Garante um rendimento real pagando uma taxa de juros fixa somada à inflação oficial medida pelo IPCA. Isso blinda o seu dinheiro de perder poder de compra.
- **Ideal para:** Objetivos de longo prazo (compra de imóvel futura, aposentadoria). Evite resgatar antes do vencimento devido à marcação a mercado.

### 3. Tesouro Prefixado (Fixo)
No momento da compra, você já sabe exatamente a taxa fixa final que receberá no vencimento (ex: 11% ao ano). Excelente para travar rentabilidades se a Selic estiver caindo.
- **Ideal para:** Objetivos de médio prazo com data exata definida.`,
    content_en: "English version coming soon. Master the different federal government bond types and start investing risk-free.",
  },

  // 14. REGRA DO 50-30-20
  {
    id: "art-regra-do-50-30-20-como-dividir-salario",
    slug: "regra-do-50-30-20-como-dividir-salario",
    title_pt: "Regra do 50-30-20: Como Dividir seu Salário e Organizar o Orçamento",
    title_en: "The 50-30-20 Rule: How to Divide Your Salary and Budget Smartly",
    cover_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000",
    cover_alt: "Gráfico de pizza minimalista dividindo o orçamento em necessidades, desejos e investimentos.",
    category_id: "cat-planejamento-financeiro",
    is_featured: false,
    status: "published",
    content_pt: `A maioria das tentativas de organizar o orçamento familiar falha no primeiro mês pelo excesso de controle. Registrar exaustivamente cada cupom fiscal de padaria esgota o foco das pessoas e as faz desistir em poucas semanas.

Para resolver isso de forma inteligente e sustentável, a regra do **50-30-20** propõe um sistema simples baseado em proporções macro de gastos. Em vez de se preocupar com onde gastou cada centavo, você foca em garantir que os seus recursos líquidos mensais fluam de forma equilibrada em três grandes categorias de despesas:

- **50% para as Necessidades Básicas:** Despesas inegociáveis para sua manutenção e segurança familiar (aluguel, condomínio, contas de água, energia, mercado básico e saúde).
- **30% para Desejos e Estilo de Vida:** O pote destinado a jantares fora, pequenos mimos, saídas culturais e assinaturas de lazer. Afinal, as finanças devem permitir desfrutar o presente!
- **20% para Poupança e Futuro:** Foco em aportes para reserva de emergência, fundos de previdência, ações ou amortização rápida de dívidas ativas.

---

## Como Fazer a Divisão Prática

1. **Apurar a Renda Líquida Real:** Calcule o salário exato que cai na conta, deduzidos todos os impostos de folha e descontos automáticos.
2. **Cortar nos Excessos das Necessidades:** Se o seu custo de vida básico consome 70% do salário, você precisará renegociar aluguéis, mudar para planos de telefonia mais baratos ou buscar formas urgentes de aumentar sua renda mensal.
3. **Poupe no Início do Mês:** Não espere sobrar dinheiro no dia 30 para investir os 20%. Transfira esse valor para a sua carteira de investimentos logo no momento em que receber o seu salário!`,
    content_en: "English version coming soon. Divide your salary in three buckets: necessities, lifestyle choices, and future savings.",
  },

  // 15. COMO MONTAR UM ORÇAMENTO DOMÉSTICO DO ZERO
  {
    id: "art-como-montar-orcamento-domestico-do-zero",
    slug: "como-montar-orcamento-domestico-do-zero",
    title_pt: "Como Montar um Orçamento Doméstico do Zero: Plano de Ação Passo a Passo",
    title_en: "How to Build a Household Budget from Scratch: Step-by-Step Action Plan",
    cover_image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000",
    cover_alt: "Família reunida de forma alegre planejando suas finanças domésticas com auxílio de uma planilha simples.",
    category_id: "cat-planejamento-financeiro",
    is_featured: false,
    status: "published",
    content_pt: `Controlar o dinheiro dentro de uma casa envolve muito mais do que planilhas matemáticas: envolve gerenciar prioridades familiares, alinhar metas comuns de curto prazo e construir hábitos seguros de consumo. Sem um orçamento doméstico estruturado, o dinheiro parece evaporar de forma misteriosa a cada mês.

Se você quer sair do modo passivo e assumir a cabine de comando da sua vida financeira familiar, este guia prático ensinará você a criar um orçamento doméstico do absoluto zero de forma descomplicada.

---

## O Fluxo Simplificado do Planejamento Doméstico

- **Mapear Entradas Reais:** Registre todas as rendas líquidas que entram na residência de forma regular ou temporária.
- **Registrar Despesas Fixas:** Liste contas previsíveis e recorrentes de vencimento mensal (aluguel, condomínio, mensalidades escolares, planos de saúde).
- **Controlar Despesas Variáveis:** Mantenha um teto máximo semanal para gastos de mercado, saídas recreativas ou combustíveis para evitar estourar o orçamento acumulado do mês.
- **Reunião de Alinhamento Familiar:** Reserve 15 minutos mensais para debater com seus familiares as metas de poupança comuns da família. O engajamento de todos os moradores reduz fricções e potencializa o alcance das metas coletivas!

## Baixe Nosso Template Limpo de Planejamento Financeiro
Para simplificar a sua jornada de organização financeira, preparamos uma planilha de orçamento doméstico leve e minimalista. Nela você só precisa inserir suas despesas macros para ver o cálculo proporcional em tempo real. Solicite o link de acesso em nossos canais oficiais!`,
    content_en: "English version coming soon. Meticulously track and build your home budget step by step without friction.",
  },

  // 16. COMO LIMPAR O NOME NO SERASA
  {
    id: "art-como-limpar-nome-serasa-aumentar-score",
    slug: "como-limpar-nome-serasa-aumentar-score",
    title_pt: "Como Limpar o Nome no Serasa e Aumentar seu Score Rápido",
    title_en: "How to Clear Your Name on Serasa and Boost Your Credit Score Fast",
    cover_image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000",
    cover_alt: "Notebook exibindo a página do Serasa Limpa Nome com feedback positivo.",
    category_id: "cat-financas-pessoais",
    is_featured: false,
    status: "published",
    content_pt: `Ter o "nome sujo" ou CPF negativado nos birôs de crédito (como Serasa, SPC e Boa Vista) causa restrições pesadas na vida de qualquer cidadão. Impede a aprovação de cartões de crédito básicos, dificulta o aluguel de imóveis residenciais de qualidade e bloqueia financiamentos imobiliários fundamentais.

A boa notícia é que o processo de limpar o nome e recuperar a confiança do mercado está mais transparente e acessível do que nunca. Você não precisa pagar intermediários ou golpistas que prometem apagar seus dados milagrosamente. O caminho seguro é feito de forma direta e totalmente protegida.

---

## Como Negociar Suas Pendências Passo a Passo

1. **Consulte Seu CPF Gratuitamente:** Acesse o aplicativo ou site oficial do **Serasa Limpa Nome** ou do portal do **Acordo Certo**.
2. **Avalie as Propostas Oferecidas:** As próprias instituições credoras oferecem descontos de até 90% para quitação de pendências antigas de forma digital direta.
3. **Pague o Boleto do Acordo à Vista ou Parcelado:** Após o pagamento da primeira parcela do acordo, o credor é obrigado a retirar o seu nome dos cadastros de inadimplentes em até **5 dias úteis**.
4. **Construa Hábitos de Bom Pagador:** Ative o Cadastro Positivo do Banco Central. Ele registra as contas de luz, água e faturas que você paga em dia, demonstrando aos bancos que você é um cliente de baixo risco e merece menores taxas de juros futuros!`,
    content_en: "English version coming soon. Follow these verified methods to clean your credit history and boost your Score.",
  },

  // 17. O QUE É CDI E COMO ELE AFETA SEU RENDIMENTO
  {
    id: "art-o-que-e-cdi-como-afeta-rendimento",
    slug: "o-que-e-cdi-como-afeta-rendimento",
    title_pt: "O Que é CDI e Como Ele Afeta o Rendimento do seu Dinheiro?",
    title_en: "What is CDI and How Does It Influence Your Investment Returns?",
    cover_image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000",
    cover_alt: "Gráfico de juros CDI flutuando ao lado da taxa básica Selic nacional.",
    category_id: "cat-investimentos",
    is_featured: false,
    status: "published",
    content_pt: `Qualquer pessoa que começa a pesquisar sobre renda fixa depara-se imediatamente com a sigla **CDI**. "Este CDB rende 100% do CDI", "Aquela conta paga 110% do CDI". Embora seja o termo mais utilizado no mercado financeiro nacional, pouquíssimos investidores sabem o que a sigla realmente significa.

A sigla CDI significa **Certificado de Depósito Interbancário**. Trata-se de uma taxa de juros diária apurada a partir das transações de empréstimos rápidos de curtíssimo prazo realizadas de forma exclusiva entre os próprios bancos comerciais do país.

Entenda de forma definitiva como essa taxa afeta a rentabilidade diária das suas economias.

---

## A Regra de Fechamento de Caixa dos Bancos

Por determinação de segurança do Banco Central, todos os bancos operando em território nacional devem fechar o dia com o saldo do caixa positivo. No entanto, em determinados dias, o volume de saques dos clientes supera o volume de depósitos efetuados, fazendo o banco fechar a conta diária no vermelho.
Para resolver isso:
- O banco que precisa de recursos pega um empréstimo rápido de 24 horas com outro banco que sobrou dinheiro em caixa.
- Os juros cobrados nestas operações de curtíssimo prazo formam a **Taxa CDI**.
- Como as operações ocorrem sob os mesmos patamares de juros da dívida soberana nacional, a taxa CDI caminha praticamente colada à **taxa básica Selic** (geralmente ficando 0,10% abaixo da Selic atual).
- Quando o Comitê de Política Monetária (Copom) aumenta a Selic, a taxa CDI sobe na mesma proporção, fazendo as suas aplicações de renda fixa renderem mais dinheiro de forma imediata!`,
    content_en: "English version coming soon. Learn the banking mechanics behind the CDI rate and how it drives your cash yields.",
  },

  // 18. FUNDO IMOBILIÁRIO (FII) VS IMÓVEL FÍSICO
  {
    id: "art-fundo-imobiliario-fii-vs-imovel-fisico",
    slug: "fundo-imobiliario-fii-vs-imovel-fisico",
    title_pt: "Fundo Imobiliário (FII) vs. Imóvel Físico: Qual Gera Mais Renda Passiva?",
    title_en: "Real Estate Funds (FIIs) vs. Physical Property: Which Delivers Better Passive Income?",
    cover_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000",
    cover_alt: "Edifícios comerciais de altíssimo padrão, representando a carteira de um fundo imobiliário de alta performance.",
    category_id: "cat-investimentos",
    is_featured: false,
    status: "published",
    content_pt: `Investir em imóveis é uma das formas mais antigas e consagradas de construção de riqueza no mundo. Historicamente, os aluguéis fornecem uma renda passiva sólida e proteção automática contra a inflação por meio de reajustes contratuais regulares. No entanto, no século XXI, a aquisição de imóveis físicos enfrenta uma forte concorrência dos **Fundos de Investimento Imobiliários (FIIs)**.

Ao comprar cotas de FIIs, você se torna coproprietário de grandes ativos imobiliários corporativos do país, como shoppings de luxo, edifícios de escritórios premium e galpões logísticos, com valores de entrada irrisórios a partir de R$ 100,00.

Analisamos abaixo as principais vantagens e desvantagens de cada modalidade de investimento imobiliário.

---

## Por Que Muitos Preferem Fundos Imobiliários?

1. **Acessibilidade Absoluta:** Enquanto comprar um apartamento físico exige centenas de milhares de reais, FIIs aceitam investimentos de qualquer montante a partir de cerca de R$ 10 ou R$ 100 por cota.
2. **Rendimentos Mensais Isentos de IR:** Os dividendos (aluguéis) distribuídos mensalmente por FIIs na sua conta da corretora são totalmente isentos de Imposto de Renda para pessoas físicas.
3. **Liquidez de Bolsa de Valores:** Se você precisar do dinheiro de volta com urgência, pode vender suas cotas em segundos clicando no aplicativo da corretora. Vender um imóvel de alvenaria físico pode levar longos meses ou exigir descontos pesados de pressa.
4. **Diversificação Sem Burocracia:** Com apenas R$ 1.000 aplicados em um único FII de papel ou tijolo, você dilui seu risco geográfico em dezenas de imóveis localizados em diferentes capitais do país!`,
    content_en: "English version coming soon. Compare physical brick-and-mortar leases vs. liquid real estate funds (FIIs) in B3.",
  },

  // 19. COMO USAR O CARTÃO DE CRÉDITO A SEU FAVOR
  {
    id: "art-como-usar-cartao-de-credito-a-seu-favor",
    slug: "como-usar-cartao-de-credito-a-seu-favor",
    title_pt: "Como Usar o Cartão de Crédito a Seu Favor: Estratégias de Milhas e Cashback",
    title_en: "How to Leverage Credit Cards: Milage Programs and Cashback Strategies",
    cover_image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1000",
    cover_alt: "Cartão de crédito premium com design moderno e minimalista sendo usado em compras.",
    category_id: "cat-renda-extra",
    is_featured: false,
    status: "published",
    content_pt: `O cartão de crédito costuma ser apontado como o grande vilão do endividamento das famílias brasileiras. É verdade que as taxas de juros cobradas no rotativo do cartão são as mais altas de toda a economia nacional. No entanto, o cartão de crédito não passa de uma ferramenta financeira neutra: o resultado final depende exclusivamente do comportamento do usuário.

Se você possui disciplina financeira e paga a fatura integral rigorosamente em dia, o cartão de crédito pode se transformar em um poderoso gerador de renda extra e benefícios gratuitos, permitindo que você acumule pontos, ganhe cashback e resgate passagens aéreas sem gastar um único real a mais do seu bolso.

---

## As Chaves do Uso Inteligente do Cartão

- **Centralizar Despesas da Casa:** Ao pagar contas de água, luz, assinaturas de streaming e despesas de mercado básicas no cartão de crédito, você acumula um volume relevante de pontos em uma única fatura mensal.
- **Participar de Clubes de Fidelidade Gratuitos:** Cadastre-se nos programas oficiais de pontos do seu banco (como Livelo, Esfera ou Itaú Shop) para acumular pontuação básica de cada transação de consumo.
- **Transferências com Bônus Proporcionais:** Aguarde campanhas promocionais de transferência com bônus de 80% ou 100% dos pontos da corretora para companhias aéreas parceiras (como Smiles, Latam Pass ou TudoAzul) para dobrar o seu saldo de milhas de forma gratuita!
- **Atenção Máxima à Anuidade:** Evite cartões que cobram taxas pesadas de manutenção sem entregar benefícios reais que superem o custo fixo cobrado pelo banco.`,
    content_en: "English version coming soon. Learn credit card hacks to optimize points, cashbacks, and airline loyalty program conversions.",
  },

  // 20. COMO DECLARAR INVESTIMENTOS DE RENDA FIXA NO IR
  {
    id: "art-como-declarar-investimentos-renda-fixa-ir",
    slug: "como-declarar-investimentos-renda-fixa-ir",
    title_pt: "Como Declarar Investimentos de Renda Fixa no Imposto de Renda: Passo a Passo",
    title_en: "How to Declare Fixed Income Investments in Your Taxes: Step-by-Step Guide",
    cover_image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000",
    cover_alt: "Documentos e telas de declaração de imposto de renda da Receita Federal sobre a mesa de trabalho.",
    category_id: "cat-planejamento-financeiro",
    is_featured: false,
    status: "published",
    content_pt: `Chegou a época de prestar contas com a Receita Federal e muitos investidores principiantes tremem de medo ao abrir o programa de declaração de Imposto de Renda. A maior preocupação é cometer algum erro de preenchimento e cair nas garras da malha fina fiscal.

Felizmente, declarar aplicações tradicionais de Renda Fixa, como Poupança, CDBs, LCIs, LCAs e Títulos Públicos do Tesouro Direto, é um processo simples e direto. Os bancos e corretoras de valores são obrigados por lei a fornecer o **Informe de Rendimentos Anual**, onde todas as posições e saldos vêm detalhados exatamente com os códigos corretos que você só precisa transcrever.

---

## Onde Lançar os Saldos e Rendimentos no Programa do IR

- **Rendimentos Isentos e Não Tributáveis (Poupança, LCI e LCA):** Os ganhos decorrentes de aplicações isentas devem ser preenchidos nesta aba sob os códigos adequados (ex: Código 12 para Poupança).
- **Rendimentos Sujeitos à Tributação Exclusiva (CDBs e Tesouro Direto):** Como o imposto sobre estas aplicações é recolhido direto na fonte no momento do resgate, lance os lucros informados nesta pasta (Código 06).
- **Declaração de Bens e Direitos (Saldos em 31/12):** O valor principal investido em cada título até o final do ano calendário deve ser informado nesta ficha utilizando os códigos específicos do grupo de aplicações (Grupo 02 - Renda Fixa).
- Siga rigorosamente as linhas e valores descritos no Informe da sua Corretora para garantir uma declaração impecável e livre de malha fina!`,
    content_en: "English version coming soon. Learn how to accurately fill the federal tax forms for all your savings accounts and bonds.",
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

    console.log("Cleaning old articles...");
    // Let's delete existing articles so we have a clean set of 20 high-quality finance articles
    const { error: deleteError } = await supabase
      .from("articles")
      .delete()
      .not("id", "is", null); // delete all
    if (deleteError) {
      console.warn("Could not delete old articles, proceeding with upserts. Error:", deleteError.message);
    } else {
      console.log("Old articles deleted successfully.");
    }

    console.log("Upserting 20 finance articles...");
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

    console.log("Database seeding completed successfully for all 20 premium financial articles!");
  } catch (err) {
    console.error("Failed to seed database:", err);
    process.exit(1);
  }
}

run();
