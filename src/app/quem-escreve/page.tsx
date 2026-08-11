import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Equipe editorial",
  description: "Conheça os profissionais responsáveis pela autoria e revisão técnica do Grana em Ordem.",
  alternates: { canonical: "/quem-escreve" },
};

const team = [
  {
    name: "Roberto Almeida",
    role: "Economista e revisor técnico",
    image: "/roberto-almeida.webp",
    alt: "Roberto Almeida",
    summary: "Revisa o conteúdo para garantir precisão nas análises, taxas e estratégias financeiras apresentadas no site.",
    bio: "Formado em Ciências Econômicas pela FGV, com MBA em Finanças e Controladoria. Possui mais de 15 anos de experiência no mercado financeiro e atua como consultor de investimentos.",
    expertise: ["Economia", "Investimentos", "Revisão técnica"],
  },
  {
    name: "Camila Rocha",
    role: "Redatora especialista em finanças pessoais",
    image: "/camila-rocha.webp",
    alt: "Camila Rocha",
    summary: "Autora dos conteúdos sobre orçamento, dívidas, poupança e organização financeira no dia a dia.",
    bio: "Jornalista econômica formada pela PUC, com certificação em Planejamento Financeiro Pessoal (CFP). Há sete anos, ensina pessoas a organizar o orçamento, sair das dívidas e começar a poupar de forma prática.",
    expertise: ["Orçamento", "Dívidas", "Planejamento financeiro"],
  },
  {
    name: "Thiago Silva",
    role: "Analista de cartões e investimentos",
    image: "/thiago-silva.webp",
    alt: "Thiago Silva",
    summary: "Produz análises e tutoriais sobre cartões, milhas e investimentos para iniciantes.",
    bio: "Administrador de Empresas pelo Insper e investidor independente há dez anos. É especialista em milhas, cartões de crédito e investimentos para iniciantes.",
    expertise: ["Cartões", "Milhas", "Investimentos para iniciantes"],
  },
];

export default function QuemEscrevePage() {
  return (
    <article style={{ maxWidth: 960, margin: "0 auto", padding: "24px 0 64px" }}>
      <p style={{ color: "var(--primary)", fontWeight: 800 }}>TRANSPARÊNCIA EDITORIAL</p>
      <h1>Quem escreve no Grana em Ordem</h1>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 760 }}>
        Conheça os profissionais responsáveis pela autoria, análise e revisão técnica dos conteúdos. O site tem finalidade educativa e não substitui recomendação financeira, contábil, jurídica ou tributária individual.
      </p>

      <div style={{ display: "grid", gap: 24, marginTop: 36 }}>
        {team.map((member) => (
          <section
            key={member.name}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(160px, 240px) minmax(0, 1fr)",
              gap: 28,
              padding: 28,
              border: "1px solid var(--border)",
              borderRadius: 20,
              background: "var(--card-bg)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: 16 }}>
              <Image src={member.image} alt={member.alt} fill sizes="(max-width: 640px) 100vw, 240px" style={{ objectFit: "cover" }} />
            </div>
            <div>
              <p style={{ color: "var(--primary)", fontWeight: 800, margin: "0 0 6px", textTransform: "uppercase", fontSize: "0.8rem" }}>{member.role}</p>
              <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-heading)" }}>{member.name}</h2>
              <p style={{ lineHeight: 1.7 }}>{member.summary}</p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>{member.bio}</p>
              <p style={{ marginBottom: 0, fontWeight: 700 }}>{member.expertise.join(" · ")}</p>
            </div>
          </section>
        ))}
      </div>

      <section style={{ marginTop: 44 }}>
        <h2>Como os conteúdos são produzidos e revisados</h2>
        <p>
          Cada artigo parte de uma dúvida prática, recebe revisão editorial e deve apontar fontes verificáveis quando abordar regras, impostos, taxas, investimentos, crédito ou produtos financeiros. Conteúdos desatualizados são revisados, ampliados ou retirados de circulação.
        </p>
        <p>
          Em temas que envolvem decisão individual, confirme as informações nas fontes oficiais e procure profissionais habilitados quando necessário.
        </p>
      </section>

      <p style={{ marginTop: 32 }}>
        <Link href="/contato">Falar com a equipe editorial</Link>
      </p>
    </article>
  );
}
