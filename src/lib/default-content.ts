import type { SitePage, SiteSettings } from "./content-types";

export const defaultSiteSettings: SiteSettings = {
  title: "Grana em Ordem",
  description: "Artigos educativos sobre finanças pessoais, investimentos, renda extra e independência financeira.",
  logo: "/logo.png",
  logoAlt: "Grana em Ordem",
  footerDescription: "Os melhores artigos sobre finanças pessoais e investimentos. Organize sua grana e conquiste sua liberdade financeira.",
  navigationItems: [
    { label: "Início", href: "/" },
    { label: "Finanças Pessoais", categorySlug: "financas-pessoais" },
    { label: "Investimentos", categorySlug: "investimentos" },
    { label: "Renda Extra", categorySlug: "renda-extra" },
    { label: "Planejamento", categorySlug: "planejamento-financeiro" },
    { label: "Equipe editorial", href: "/quem-escreve" },
    { label: "Sobre", href: "/sobre" },
  ],
  footerColumns: [
    {
      title: "Categorias",
      links: [
        { label: "Finanças Pessoais", categorySlug: "financas-pessoais" },
        { label: "Investimentos", categorySlug: "investimentos" },
        { label: "Renda Extra", categorySlug: "renda-extra" },
        { label: "Planejamento Financeiro", categorySlug: "planejamento-financeiro" },
      ],
    },
    {
      title: "Institucional",
      links: [
        { label: "Sobre", href: "/sobre" },
        { label: "Contato", href: "/contato" },
        { label: "Política de privacidade", href: "/politica-de-privacidade" },
        { label: "Termos de uso", href: "/termos-de-uso" },
        { label: "Política editorial", href: "/politica-editorial" },
        { label: "Política de cookies", href: "/politica-de-cookies" },
        { label: "Aviso legal", href: "/aviso-legal" },
        { label: "Equipe editorial", href: "/quem-escreve" },
      ],
    },
  ],
};

export const defaultPages: Record<string, SitePage> = {
  home: {
    slug: "home",
    title: "Organize sua Grana e Conquiste sua Liberdade",
    titleEn: "Organize Your Money and Achieve Financial Freedom",
    description:
      "Descubra estratégias práticas para organizar suas finanças, investir com inteligência e construir riqueza de verdade.",
    descriptionEn:
      "Discover practical strategies to organize your finances, invest wisely, and build real wealth.",
    seoTitle: "Grana em Ordem | Blog de Finanças Pessoais",
    seoDescription: "Os melhores artigos sobre finanças pessoais, investimentos e independência financeira.",
  },
  sobre: {
    slug: "sobre",
    eyebrow: "Sobre o projeto",
    title: "Grana em Ordem",
    description:
      "Um blog educativo criado para traduzir temas de finanças pessoais, investimentos e planejamento financeiro em guias práticos, claros e responsáveis.",
    seoTitle: "Sobre",
    seoDescription: "Conheça a missão editorial do Grana em Ordem.",
    sections: [
      {
        title: "Nossa missão",
        body: "Publicar conteúdos que ajudem leitores a tomar melhores decisões financeiras no dia a dia, sempre com linguagem simples, foco prático e cuidado para não substituir assessoria financeira profissional.",
      },
      {
        title: "Como produzimos conteúdo",
        body: "Os artigos são organizados por temas, revisados editorialmente e estruturados com respostas diretas, alertas, perguntas frequentes e referências quando o tema exige apoio técnico.",
      },
      {
        title: "Compromisso com clareza",
        body: "Priorizamos orientações educativas, evitamos promessas de ganhos garantidos e indicamos a busca por assessoria profissional quando há decisões de grande impacto financeiro.",
      },
      {
        title: "Para quem escrevemos",
        body: "Os conteúdos são pensados para pessoas que querem entender melhor orçamento, investimentos, dívidas, renda extra e hábitos financeiros sem precisar decifrar linguagem técnica de economistas.",
      },
      {
        title: "O que você encontra nos guias",
        body: "Cada artigo busca responder uma dúvida prática, explicar os conceitos mais importantes, mostrar caminhos seguros de aplicação e indicar quando vale procurar acompanhamento especializado.",
      },
      {
        title: "Limites do conteúdo online",
        body: "Informação de qualidade ajuda a tomar decisões melhores, mas não substitui análise individual. Renda, objetivos, perfil de risco, dívidas, reserva de emergência e situação tributária mudam a melhor recomendação para cada pessoa.",
      },
    ],
    cta: { label: "Ler artigos", href: "/" },
  },
  "politica-editorial": {
    slug: "politica-editorial",
    eyebrow: "Confiança e transparência",
    title: "Política editorial",
    description:
      "Nosso objetivo é publicar conteúdo útil, verificável e fácil de ler, com responsabilidade especial por tratar temas que afetam decisões financeiras.",
    seoTitle: "Política editorial",
    seoDescription: "Entenda os critérios editoriais usados nos conteúdos do Grana em Ordem.",
    sections: [
      {
        title: "Critérios de publicação",
        body: "Cada artigo deve ter uma pergunta central clara, explicar conceitos com contexto suficiente e separar orientação educativa de recomendação de investimento individual.",
      },
      {
        title: "Fontes e referências",
        body: "Quando o tema envolve afirmações técnicas, priorizamos dados do Banco Central, CVM, Receita Federal, IBGE, instituições financeiras reguladas e bases reconhecidas.",
      },
      {
        title: "Atualizações",
        body: "Conteúdos podem ser revisados conforme mudanças de regulamentação, novas taxas, alterações tributárias ou melhorias editoriais. A data exibida no artigo ajuda o leitor a entender a recência do material.",
      },
      {
        title: "Autoria e revisão",
        body: "Cada texto deve identificar sua autoria editorial e, quando o assunto exigir conhecimento técnico específico — como tributos, produtos de investimento, crédito ou regulamentação — passar por revisão compatível com o tema. Não apresentamos conteúdo educativo como recomendação individual.",
      },
      {
        title: "Independência editorial",
        body: "Não publicamos promessas de retorno garantido, recomendações de ativos específicos sem contexto educativo ou incentivo a decisões financeiras impulsivas.",
      },
      {
        title: "Publicidade, afiliados e conflitos de interesse",
        body: "Quando houver parceria comercial, recomendação patrocinada ou link com potencial de comissão, isso será apresentado de forma clara. A prioridade editorial é preservar utilidade, transparência e segurança do leitor.",
      },
    ],
    cta: { label: "Ver aviso legal", href: "/aviso-legal" },
  },
  "politica-de-cookies": {
    slug: "politica-de-cookies",
    eyebrow: "Privacidade e preferências",
    title: "Política de cookies",
    description:
      "Esta página explica como usamos cookies e tecnologias semelhantes para manter o Grana em Ordem funcionando e lembrar escolhas feitas por você.",
    seoTitle: "Política de cookies",
    seoDescription: "Entenda quais cookies o Grana em Ordem usa e como controlar suas preferências.",
    sections: [
      {
        title: "O que são cookies",
        body: "Cookies são pequenos arquivos salvos no navegador para reconhecer preferências, manter recursos técnicos funcionando e melhorar a experiência de navegação.",
      },
      {
        title: "Cookies essenciais",
        body: "Usamos cookies essenciais para registrar suas escolhas de consentimento, manter recursos técnicos e preservar a sessão administrativa quando aplicável.",
      },
      {
        title: "Preferências",
        body: "Com sua permissão, salvamos idioma preferido, tema claro ou escuro, artigos salvos para depois, últimos artigos vistos e categorias favoritas.",
      },
      {
        title: "Estatísticas",
        body: "Com consentimento, podemos carregar ferramentas como Google Analytics para entender páginas acessadas, desempenho e comportamento agregado.",
      },
      {
        title: "Como controlar suas escolhas",
        body: "Você pode aceitar todos os opcionais ou recusá-los no aviso exibido pelo site. Depois disso, é possível limpar cookies, armazenamento local e permissões diretamente nas configurações do navegador.",
      },
    ],
    cta: { label: "Voltar para o blog", href: "/" },
  },
  "aviso-legal": {
    slug: "aviso-legal",
    eyebrow: "Uso responsável",
    title: "Aviso legal",
    description: "O conteúdo do Grana em Ordem tem finalidade exclusivamente educativa e informativa.",
    seoTitle: "Aviso legal",
    seoDescription: "Aviso sobre o uso educativo dos conteúdos do Grana em Ordem.",
    sections: [
      {
        title: "Não substitui assessoria financeira",
        body: "As informações publicadas no blog não substituem consulta, análise ou acompanhamento feito por profissionais habilitados como assessores de investimento, contadores ou advogados tributaristas.",
      },
      {
        title: "Sem garantia de retorno",
        body: "Nenhum conteúdo do Grana em Ordem representa garantia de retorno financeiro, recomendação de compra ou venda de ativos específicos. Investimentos envolvem riscos e rentabilidade passada não garante resultado futuro.",
      },
      {
        title: "Decisões individuais",
        body: "Estratégias de investimento, organização orçamentária e planejamento financeiro devem considerar renda, objetivos, prazo, perfil de risco, dívidas e orientação profissional quando aplicável.",
      },
      {
        title: "Atualização das informações",
        body: "Taxas, regulamentações, limites de contribuição e regras tributárias mudam frequentemente. Sempre confirme as informações com fontes oficiais antes de tomar decisões importantes.",
      },
    ],
    cta: { label: "Voltar para o blog", href: "/" },
  },
  contato: {
    slug: "contato", eyebrow: "Fale conosco", title: "Contato", seoTitle: "Contato", seoDescription: "Entre em contato com o Grana em Ordem.",
    description: "Use este canal para dúvidas editoriais, sugestões de pauta, correções ou assuntos relacionados ao site.",
    sections: [
      { title: "Canal de contato", body: "Envie sua mensagem para dev@nucleodigitalofc.com. Procuramos responder solicitações legítimas com clareza e em prazo razoável." },
      { title: "Correções e atualizações", body: "Caso identifique uma informação desatualizada ou imprecisa, informe o endereço do artigo, o ponto específico e, quando possível, uma fonte confiável." },
      { title: "Privacidade", body: "Não envie senhas, dados bancários, documentos ou outras informações sensíveis pelo e-mail de contato." },
    ], cta: { label: "Ler artigos", href: "/" },
  },
  "politica-de-privacidade": {
    slug: "politica-de-privacidade", eyebrow: "Privacidade", title: "Política de privacidade", seoTitle: "Política de privacidade", seoDescription: "Saiba como o Grana em Ordem trata dados e preferências.",
    description: "Esta política explica quais informações podem ser tratadas durante a navegação e como o leitor controla suas preferências.",
    sections: [
      { title: "Dados de navegação", body: "Podemos tratar dados técnicos e agregados necessários para segurança, funcionamento e análise de desempenho do site." },
      { title: "Cookies e estatísticas", body: "Ferramentas de estatísticas só são carregadas quando você autoriza a categoria correspondente no aviso de cookies. Você pode mudar a escolha pelo navegador a qualquer momento." },
      { title: "Seus direitos", body: "Para dúvidas ou solicitações relacionadas a dados pessoais, entre em contato pelo e-mail dev@nucleodigitalofc.com." },
    ], cta: { label: "Política de cookies", href: "/politica-de-cookies" },
  },
  "termos-de-uso": {
    slug: "termos-de-uso", eyebrow: "Uso do site", title: "Termos de uso", seoTitle: "Termos de uso", seoDescription: "Condições de uso do Grana em Ordem.",
    description: "Ao utilizar o site, você concorda em usar seu conteúdo de forma responsável e compatível com sua finalidade educativa.",
    sections: [
      { title: "Finalidade educativa", body: "Os materiais publicados são informativos e não constituem recomendação individual de investimento, aconselhamento jurídico, contábil ou tributário." },
      { title: "Propriedade intelectual", body: "Textos, identidade visual e demais materiais do site não podem ser reproduzidos integralmente sem autorização, salvo nos limites legais." },
      { title: "Atualizações", body: "Estes termos podem ser atualizados para refletir mudanças legais, técnicas ou editoriais. A versão vigente estará sempre disponível nesta página." },
    ], cta: { label: "Ver aviso legal", href: "/aviso-legal" },
  },
};
