import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Equipe editorial",
  description: "Entenda como o Grana em Ordem produz, revisa e atualiza seus conteúdos educativos.",
  alternates: { canonical: "/quem-escreve" },
};

export default function QuemEscrevePage() {
  return (
    <article style={{ maxWidth: 880, margin: "0 auto", padding: "24px 0 64px" }}>
      <p style={{ color: "var(--primary)", fontWeight: 800 }}>TRANSPARÊNCIA EDITORIAL</p>
      <h1>Equipe editorial do Grana em Ordem</h1>
      <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
        O Grana em Ordem publica conteúdo educativo sobre finanças pessoais. Nosso compromisso é explicar conceitos de forma clara, indicar limites e manter os leitores informados quando um tema exige confirmação em fontes oficiais ou orientação individualizada.
      </p>

      <section>
        <h2>Como os conteúdos são produzidos</h2>
        <p>
          Cada artigo parte de uma dúvida prática, passa por revisão editorial e deve usar fontes verificáveis quando abordar regras, impostos, taxas, investimentos, crédito ou produtos financeiros. Conteúdos desatualizados são revisados, ampliados ou retirados de circulação.
        </p>
      </section>

      <section>
        <h2>Limites e responsabilidade</h2>
        <p>
          O material do site não é recomendação personalizada de investimento, orientação contábil, jurídica ou tributária. Decisões financeiras dependem de renda, objetivos, prazo, dívidas, perfil de risco e da regra vigente; por isso, fontes oficiais e profissionais habilitados devem ser consultados quando necessário.
        </p>
      </section>

      <section>
        <h2>Atualizações, correções e autoria</h2>
        <p>
          Estamos estruturando a identificação individual de autores e revisores para que cada conteúdo traga a atribuição adequada. Enquanto essa página é finalizada, dúvidas, correções e pedidos de atualização podem ser enviados pelo canal institucional do site.
        </p>
      </section>

      <p style={{ marginTop: 32 }}>
        <Link href="/contato">Falar com a equipe editorial</Link>
      </p>
    </article>
  );
}
