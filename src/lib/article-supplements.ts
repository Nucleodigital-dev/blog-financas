import type { ArticleBlock } from "./content-types";

type SupplementSeed = {
  topic: string;
  intent: string;
  practical: string;
  checklist: string[];
  pitfalls: string[];
  support: string;
  faqs: Array<{ q: string; a: string }>;
};

export const supplementalContentUpdatedAt = "2026-05-20";

const supplements: Record<string, SupplementSeed> = {
  "como-sair-das-dividas-ganhando-pouco": {
    topic: "Como Sair das Dívidas",
    intent: "ajudar você a mapear suas pendências financeiras, negociar juros abusivos e recuperar o controle do seu orçamento de forma prática e realista",
    practical:
      "Sair das dívidas não é sobre fazer um sacrifício impossível de manter, mas sim sobre ganhar clareza e método. O erro de muitos é tentar pagar tudo de uma vez sem reserva, acabando por se endividar novamente na primeira emergência. O segredo é listar todas as contas, priorizar as que possuem juros mais altos ou ameaçam serviços essenciais, e negociar parcelas que realmente caibam no seu bolso mensal.",
    checklist: [
      "Coloque no papel todas as suas dívidas com valor total, taxa de juros e credor.",
      "Separe uma pequena reserva de emergência antes de dar todo o seu dinheiro para os credores.",
      "Priorize as dívidas com juros mais altos (como cartão de crédito e cheque especial) ou com garantias (casa, carro).",
      "Defina um valor máximo mensal realista para propor em negociações.",
      "Procure plataformas oficiais de renegociação, como o Serasa Limpa Nome ou mutirões de bancos.",
    ],
    pitfalls: [
      "Fazer acordos que consomem mais de 30% da sua renda mensal líquida.",
      "Pegar empréstimos novos para pagar dívidas antigas sem resolver a causa do descontrole.",
      "Ignorar o problema e parar de abrir as contas ou atender telefonemas de cobrança.",
      "Acreditar em promessas milagrosas de 'limpar o nome' sem pagar o que é devido.",
    ],
    support:
      "Se as dívidas causaram superendividamento (quando a renda é insuficiente para cobrir o básico de sobrevivência e pagar contas), você pode buscar apoio dos órgãos de defesa do consumidor (Procon) ou da Defensoria Pública para mediação coletiva de dívidas sob a Lei do Superendividamento.",
    faqs: [
      {
        q: "Vale a pena pegar empréstimo consignado para quitar o cartão de crédito?",
        a: "Sim, geralmente vale a pena se o juro do empréstimo consignado for consideravelmente menor do que os juros rotativos do cartão de crédito. Isso substitui uma dívida cara por uma mais barata. Contudo, isso só funciona se você parar de usar o cartão e não acumular novas dívidas.",
      },
      {
        q: "O nome limpa automaticamente após 5 anos?",
        a: "A dívida deixa de constar nos cadastros de inadimplentes (como Serasa e SPC) após 5 anos da data de vencimento original, mas a dívida em si não deixa de existir. O credor ainda pode cobrar administrativamente ou recusar crédito futuro na própria instituição.",
      },
      {
        q: "Qual dívida devo pagar primeiro?",
        a: "Primeiro, pague as contas essenciais de sobrevivência (água, luz, moradia). Depois, priorize dívidas que envolvem garantias (financiamento imobiliário ou de veículo) ou aquelas com as maiores taxas de juros (cartão e cheque especial).",
      },
    ],
  },
  "onde-investir-os-primeiros-100-reais": {
    topic: "Onde Investir os Primeiros Reais",
    intent: "orientar iniciantes a realizar suas primeiras aplicações com segurança, focando na construção de uma reserva inicial e evitando armadilhas financeiras comuns",
    practical:
      "O início da jornada de investimentos deve ser pautado pela segurança e liquidez (facilidade de retirar o dinheiro). Antes de pensar em rentabilidade agressiva, ações ou criptomoedas, seu primeiro objetivo deve ser criar sua Reserva de Emergência. Esse dinheiro servirá de escudo contra imprevistos, evitando que você precise recorrer a empréstimos caros no futuro.",
    checklist: [
      "Abra conta em uma corretora de valores taxa zero ou use um banco digital sólido com opções de investimento direto.",
      "Foque 100% dos primeiros aportes em investimentos de Renda Fixa pós-fixados.",
      "Procure ativos com liquidez diária, permitindo resgates em dias úteis ou até aos finais de semana.",
      "Evite fundos com taxas de administração altas (acima de 1%) para renda fixa simples.",
      "Separe o dinheiro que você pode precisar nos próximos meses daquele que guardará a longo prazo.",
    ],
    pitfalls: [
      "Investir em ações, fundos imobiliários ou moedas digitais antes de ter uma reserva de emergência consolidada.",
      "Deixar o dinheiro parado na poupança tradicional, que rende menos que a inflação e que alternativas simples de renda fixa.",
      "Acreditar em esquemas que prometem ganhos rápidos, retornos fixos de 10% ao mês ou robôs de investimento.",
      "Aplicar em produtos de bancos com carência longa (prazo fechado) se você pode precisar do dinheiro em breve.",
    ],
    support:
      "Lembre-se de que todo investimento de renda fixa de instituições financeiras no Brasil conta com a proteção do FGC (Fundo Garantidor de Créditos) para valores de até R$ 250 mil por CPF e instituição, o que confere extrema segurança às suas primeiras aplicações.",
    faqs: [
      {
        q: "Qual a diferença de investir pelo banco tradicional ou por corretora?",
        a: "Bancos tradicionais tendem a oferecer produtos próprios (muitas vezes menos rentáveis ou com taxas mais caras). Corretoras de valores funcionam como 'supermercados financeiros', permitindo que você compare e compre produtos de diversas instituições diferentes de forma isenta.",
      },
      {
        q: "O Tesouro Direto é realmente seguro?",
        a: "Sim, o Tesouro Direto é considerado o investimento mais seguro do país porque você está emprestando dinheiro para o próprio Governo Federal. O risco de calote do governo é menor do que o de qualquer banco privado.",
      },
      {
        q: "Quanto dinheiro preciso para começar a investir?",
        a: "Muito pouco. No Tesouro Direto ou em CDBs de liquidez diária de bancos digitais, você consegue fazer as primeiras aplicações com valores a partir de R$ 30 a R$ 100.",
      },
    ],
  },
  "ideias-de-renda-extra-para-comecar-hoje": {
    topic: "Ideias de Renda Extra",
    intent: "fornecer ideias práticas e viáveis de geração de renda rápida, utilizando habilidades existentes sem a necessidade de investir dinheiro adiantado",
    practical:
      "A melhor renda extra é aquela que aproveita um conhecimento que você já possui ou um recurso subutilizado (como tempo livre ou equipamentos que já tem). Em vez de tentar aprender uma profissão nova complexa do zero, comece com serviços de alta demanda rápida, vendas pontuais de coisas que não usa mais, ou intermediação comercial simples.",
    checklist: [
      "Faça um inventário de itens na sua casa que estão sem uso e podem ser vendidos em plataformas online.",
      "Cadastre-se em plataformas confiáveis de serviços freelancer (como Workana, 99Freelas ou VinteConto).",
      "Identifique habilidades imediatas: redação, tradução, design básico, organização, confeitaria, reforço escolar.",
      "Divulgue seus serviços para sua rede de contatos mais próxima (amigos, familiares e vizinhos).",
      "Defina quantas horas por semana você dedicará à renda extra sem prejudicar seu trabalho principal.",
    ],
    pitfalls: [
      "Pagar taxas antecipadas para ter acesso a vagas de trabalho ou pacotes de digitação.",
      "Gastar dinheiro comprando estoque de produtos caros antes de validar se há compradores interessados.",
      "Negligenciar o controle de gastos, misturando o dinheiro da renda extra com a conta corrente comum de gastos diários.",
      "Subestimar o tempo necessário de dedicação, gerando sobrecarga física and mental ou perda de foco no trabalho principal.",
    ],
    support:
      "Se sua renda extra começar a crescer e se tornar recorrente, vale a pena formalizar-se como MEI (Microentreendedor Individual). Isso garante direitos previdenciários e permite emitir notas fiscais para prestar serviços a empresas com segurança jurídica.",
    faqs: [
      {
        q: "Como evitar golpes de trabalho online?",
        a: "Desconfie de promessas de ganhos muito altos por tarefas simples, como 'responder pesquisas rápidas' ou 'assistir vídeos'. Nunca pague nenhuma taxa para começar a trabalhar. Utilize plataformas com sistema de pagamento em garantia (garantindo que você receba após a entrega).",
      },
      {
        q: "Freelance exige diploma ou faculdade?",
        a: "Geralmente não. Na internet, clientes buscam principalmente portfólio, entrega de prazos e qualidade. Se você sabe editar vídeos, criar posts para redes sociais ou escrever textos claros, seu resultado prático vale mais que a certificação.",
      },
      {
        q: "Quanto cobrar pelo meu trabalho?",
        a: "Pesquise profissionais iniciantes na mesma área em plataformas freelancers para ver os valores cobrados por hora ou projeto. Comece com preços competitivos para criar suas primeiras avaliações positivas e suba gradualmente.",
      },
    ],
  },
  "regra-do-50-30-20-como-dividir-salario": {
    topic: "Regra do 50-30-20",
    intent: "ensinar uma regra de divisão orçamentária simples e flexível para equilibrar despesas básicas, estilo de vida e metas de economia mensal",
    practical:
      "A Regra do 50-30-20 ficou famosa mundialmente por sua simplicidade. Em vez de registrar centavo por centavo em categorias infinitas que deixam qualquer um exausto, você divide seus ganhos líquidos em três grandes potes: 50% para Necessidades (o que você precisa para sobreviver), 30% para Desejos (estilo de vida e lazer) e 20% para Economias ou Dívidas. Isso dá clareza instantânea sobre onde estão os ralos de dinheiro.",
    checklist: [
      "Calcule sua renda líquida mensal (quanto realmente cai na conta após impostos).",
      "Agrupe suas despesas fixas e essenciais: moradia, alimentação básica, saúde, transporte (meta: até 50%).",
      "Separe seus gastos com conforto e lazer: restaurantes, assinaturas, saídas, hobbies (meta: até 30%).",
      "Separe no dia do pagamento a parcela destinada a economias, investimentos ou pagamento de dívidas (meta: pelo menos 20%).",
      "Faça um fechamento mensal rápido para conferir se os percentuais reais bateram com as metas.",
    ],
    pitfalls: [
      "Classificar desejos supérfluos (como TV a cabo premium ou jantares fora de casa) como necessidades obrigatórias.",
      "Tentar seguir as porcentagens exatas em momentos de renda muito baixa ou alta inflação (as proporções podem ser adaptadas temporariamente).",
      "Poupar o que sobra no final do mês, em vez de investir os 20% logo no momento em que recebe o salário.",
      "Deixar o orçamento excessivamente rígido, retirando qualquer lazer e inviabilizando a constância da organização.",
    ],
    support:
      "Caso sua renda atual seja consumida mais de 60% por gastos básicos, não desanime. Adapte a regra para o seu cenário real atual (por exemplo, 70-20-10) e trabalhe para reduzir despesas fixas ou buscar renda extra até conseguir se aproximar do modelo ideal.",
    faqs: [
      {
        q: "Como lidar com despesas variáveis no método?",
        a: "Despesas que mudam de valor mas são essenciais (como conta de luz ou mercado) entram no pote dos 50% (Necessidades). Use uma média estimada dos últimos meses para planejar e crie uma pequena folga nas previsões.",
      },
      {
        q: "Se eu tiver dívidas, elas entram onde?",
        a: "As parcelas mínimas de dívidas essenciais para sobrevivência (como o financiamento da casa) entram nos 50%. Renegociações ou valores para quitar dívidas caras entram no pote dos 20% (Investimentos/Futuro), pois quitar dívida é o melhor investimento inicial.",
      },
      {
        q: "Posso investir mais de 20%?",
        a: "Com certeza! Se você tem despesas enxutas e consegue poupar 30% ou 40%, seu caminho para a independência financeira será acelerado. Ajuste os outros potes de acordo com seus valores e prioridades de vida.",
      },
    ],
  },
};

export function getArticleSupplement(slug: string): ArticleBlock[] {
  const item = supplements[slug];
  if (!item) return [];

  return [
    {
      type: "intro",
      title: `${item.topic}: o que realmente importa`,
      content: `${item.practical}\n\nEste complemento educativo foi elaborado para ${item.intent}. O objetivo é transformar teorias complexas em decisões de aplicação imediata na sua rotina financeira, respeitando seus limites atuais.`,
      isHtml: false,
    },
    {
      type: "checklist",
      title: "Plano de ação prático",
      content: item.checklist.map((line) => `- ${line}`).join("\n"),
      isHtml: false,
    },
    {
      type: "what_to_avoid",
      title: "Erros comuns e cuidados especiais",
      content: `${item.pitfalls.map((line) => `- ${line}`).join("\n")}\n\n${item.support}`,
      isHtml: false,
    },
    {
      type: "faq",
      title: `Perguntas frequentes sobre ${item.topic.toLowerCase()}`,
      faqs: item.faqs,
    },
  ];
}

export function hasArticleSupplement(slug: string) {
  return Boolean(supplements[slug]);
}
