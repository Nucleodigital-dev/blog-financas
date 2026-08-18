# Padrão editorial permanente — Grana em Ordem

Todo artigo deve ser útil, educativo, original e escrito em português do Brasil, sem prometer ganhos ou substituir orientação profissional.

## Requisitos obrigatórios

- Título claro, slug estável, meta description única e imagem com texto alternativo.
- Chamada de abertura exclusiva e curta, idealmente entre 70 e 120 caracteres, diferente do resumo e escrita para aparecer inteira abaixo do título.
- Resposta rápida no início, contexto, conceitos essenciais, passo a passo prático, alertas/riscos, próximo passo e FAQ quando pertinente.
- Capa inédita, realista, detalhada e específica para a pauta; nunca reutilizar a capa de outro artigo.
- Duas ou três imagens inéditas e contextuais distribuídas no corpo, com texto alternativo descritivo; não repetir a capa nem uma imagem interna.
- Armazenar todas as imagens editoriais no Supabase Storage e usar URLs persistentes no artigo.
- Fontes oficiais e atuais para números, regras, tributos, produtos financeiros e temas YMYL; registrar a data da revisão.
- Linguagem simples, exemplos realistas, transparência sobre limitações e ausência de aconselhamento individual.
- Links internos relevantes e nenhum link afiliado sem identificação explícita.
- Revisão de precisão, ortografia, acessibilidade, SEO e consistência antes de marcar como aprovado.
- Conferir antes da publicação que a chamada curta não está truncada, que o bloco "Resumo em 30 segundos" contém a resposta completa e que capa e imagens internas são distintas.

## Fluxo de publicação

Use `draft` durante produção, `scheduled` somente após aprovação e com `published_at` em ISO 8601, e `published` para conteúdo público. O horário editorial é America/Sao_Paulo; o banco armazena timestamps em UTC.

O conteúdo agendado só pode ser publicado automaticamente quando já estiver aprovado. A planilha editorial deve usar o mesmo slug ou ID do artigo para receber URL, status e horário de publicação.
