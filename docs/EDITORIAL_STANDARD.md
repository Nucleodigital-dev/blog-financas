# Padrão editorial permanente — Grana em Ordem

Todo artigo deve ser útil, educativo, original e escrito em português do Brasil, sem prometer ganhos ou substituir orientação profissional.

## Requisitos obrigatórios

- Título claro, slug estável, meta description única e imagem com texto alternativo.
- Resposta rápida no início, contexto, conceitos essenciais, passo a passo prático, alertas/riscos, próximo passo e FAQ quando pertinente.
- Fontes oficiais e atuais para números, regras, tributos, produtos financeiros e temas YMYL; registrar a data da revisão.
- Linguagem simples, exemplos realistas, transparência sobre limitações e ausência de aconselhamento individual.
- Links internos relevantes e nenhum link afiliado sem identificação explícita.
- Revisão de precisão, ortografia, acessibilidade, SEO e consistência antes de marcar como aprovado.

## Fluxo de publicação

Use `draft` durante produção, `scheduled` somente após aprovação e com `published_at` em ISO 8601, e `published` para conteúdo público. O horário editorial é America/Sao_Paulo; o banco armazena timestamps em UTC.

O conteúdo agendado só pode ser publicado automaticamente quando já estiver aprovado. A planilha editorial deve usar o mesmo slug ou ID do artigo para receber URL, status e horário de publicação.
