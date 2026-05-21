"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ChevronRight, ChevronLeft, CheckCircle2, ImagePlus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

// --- Blocos para finanças pessoais ---
const BLOCKS_DB: Record<string, any> = {
  quick_answer: { id: "quick_answer", name: "Resposta rápida", question: "Qual é a resposta direta para a dúvida financeira principal do leitor?", placeholder: "Ex: Para começar a investir com pouco dinheiro...", minLength: 50 },
  intro: { id: "intro", name: "Introdução", question: "Como você contextualiza o tema e acolhe o leitor?", placeholder: "Organizar as finanças pessoais é um passo essencial...", minLength: 100 },
  who_is_for: { id: "who_is_for", name: "Para quem serve", question: "Para quem este artigo foi escrito?", placeholder: "Para pessoas que querem começar a economizar...", minLength: 30 },
  concepts: { id: "concepts", name: "Conceitos essenciais", question: "Quais são os termos e conceitos que o leitor precisa entender?", placeholder: "Juros compostos: a fórmula que transforma pequenas economias...", minLength: 80 },
  step_by_step: { id: "step_by_step", name: "Passo a passo prático", question: "Descreva o passo a passo que o leitor deve seguir.", placeholder: "1. Mapeie todas as suas despesas...\n2. Defina sua reserva de emergência...", minLength: 100 },
  risks: { id: "risks", name: "Riscos e pontos de atenção", question: "Quais os principais riscos e o que o leitor deve evitar?", placeholder: "Evite aplicar dinheiro da reserva de emergência em...", minLength: 50 },
  comparison_table: { id: "comparison_table", name: "Comparativo / Tabela", question: "Compare as opções ou crie uma tabela de referência.", placeholder: "CDB: Liquidez diária — CDI: Mais rentabilidade — LCI: Isento de IR...", minLength: 80 },
  legal_notice: { id: "legal_notice", name: "Aviso legal", question: "Inclua o aviso educativo padrão para conteúdo de finanças.", placeholder: "As informações neste artigo têm caráter exclusivamente educativo...", minLength: 40 },
  faq: { id: "faq", name: "FAQ", type: "faq", question: "Quais as dúvidas frequentes do leitor sobre este tema?" },
  references: { id: "references", name: "Referências", question: "Quais as fontes e dados utilizados?", placeholder: "Banco Central do Brasil (bacen.gov.br)...", minLength: 20 },
};

const TEMPLATES_DB: Record<string, any> = {
  guide: {
    name: "Guia Prático de Finanças",
    required: ["intro", "quick_answer", "who_is_for", "concepts", "step_by_step", "risks", "faq", "references"],
    optional: ["comparison_table", "legal_notice"]
  },
  comparison: {
    name: "Comparativo (ex: investimentos)",
    required: ["intro", "quick_answer", "comparison_table", "risks", "faq", "references"],
    optional: ["concepts", "legal_notice"]
  },
  budgeting: {
    name: "Organização e Orçamento",
    required: ["intro", "quick_answer", "who_is_for", "step_by_step", "faq", "references"],
    optional: ["comparison_table", "risks", "legal_notice"]
  },
};

export default function SmartEditor() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title_pt: "",
    title_en: "",
    slug: "",
    category_id: "",
    template_id: "",
    cover_image: "",
    is_featured: false
  });

  const [activeBlocks, setActiveBlocks] = useState<any[]>([]);
  const [blockValues, setBlockValues] = useState<Record<string, any>>({});
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingBlockImage, setUploadingBlockImage] = useState(false);

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(data => {
      if(data.categories) setCategories(data.categories);
    });
  }, []);

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title_pt || !formData.template_id || !formData.category_id) return alert("Preencha todos os campos obrigatórios.");
    
    if (!formData.slug) {
      formData.slug = formData.title_pt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    
    const tpl = TEMPLATES_DB[formData.template_id];
    let initialBlocks = tpl.required.map((id: string) => ({ ...BLOCKS_DB[id], isRequired: true }));
    let optBlocks = tpl.optional.map((id: string) => ({ ...BLOCKS_DB[id], isRequired: false, active: false }));
    
    const category = categories.find(c => c.id === formData.category_id);
    if (category && category.config_json) {
      try {
         const catConfig = JSON.parse(category.config_json);
         const runtimeBlocksDb = { ...BLOCKS_DB };
         if (catConfig.custom_blocks && Array.isArray(catConfig.custom_blocks)) {
            catConfig.custom_blocks.forEach((cb: any) => { runtimeBlocksDb[cb.id] = cb; });
         }
         if (catConfig.required) {
             initialBlocks = catConfig.required.filter((id: string) => runtimeBlocksDb[id]).map((id: string) => ({ ...runtimeBlocksDb[id], isRequired: true }));
         }
         if (catConfig.optional) {
             optBlocks = catConfig.optional.filter((id: string) => runtimeBlocksDb[id]).map((id: string) => ({ ...runtimeBlocksDb[id], isRequired: false, active: false }));
         }
      } catch (err) {}
    }
    
    setActiveBlocks([...initialBlocks, ...optBlocks]);
    
    const initVals: any = { ...blockValues };
    [...initialBlocks, ...optBlocks].forEach(b => {
      if (!initVals[b.id]) {
        initVals[b.id] = b.type === 'faq' ? { faq: [{q: '', a: ''}] } : { text: '' };
      }
    });
    setBlockValues(initVals);
    setStep(2);
  };

  const handleStructureSubmit = () => {
    const finalBlocks = activeBlocks.filter(b => b.isRequired || b.active);
    setActiveBlocks(finalBlocks);
    setStep(3);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, blockId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append('file', file);
    try {
      if (blockId) setUploadingBlockImage(true);
      else setUploadingCover(true);
      
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (data.url) {
        if (blockId) {
          setBlockValues(prev => ({ ...prev, [blockId]: { ...prev[blockId], image: data.url } }));
        } else {
          setFormData(prev => ({ ...prev, cover_image: data.url }));
        }
      }
    } catch (error) {
      alert('Erro upload imagem');
    } finally {
      setUploadingBlockImage(false);
      setUploadingCover(false);
    }
  };

  const nextBlock = () => {
    const block = activeBlocks[currentBlockIndex];
    const val = blockValues[block.id];
    
    if (block.type === 'faq') {
      const validFaqs = val.faq.filter((f: any) => f.q.trim() && f.a.trim());
      if (validFaqs.length === 0) return alert("Preencha pelo menos 1 pergunta e resposta no FAQ.");
    } else {
      if (!val.text || val.text.length < (block.minLength || 10)) {
        return alert(`Este campo exige pelo menos ${block.minLength || 10} caracteres.`);
      }
    }
    setCurrentBlockIndex(prev => prev + 1);
  };

  const saveArticle = async (status: 'draft' | 'published') => {
    if (status === 'published' && !formData.cover_image) {
      return alert("A Imagem de Capa é OBRIGATÓRIA para publicar o artigo.");
    }
    
    setSaving(true);
    try {
      const buildBlocks = (isEn: boolean) => activeBlocks.map(b => {
        const val = blockValues[b.id];
        let finalContent = "";
        let faqsData = null;
        
        if (b.type === 'faq') {
           const validFaqs = val.faq.filter((f: any) => f.q.trim() && f.a.trim());
           faqsData = validFaqs.map((f: any) => isEn ? { q: f.q_en || f.q, a: f.a_en || f.a } : { q: f.q, a: f.a });
        } else {
           finalContent = isEn ? (val.text_en || val.text) : val.text;
           if (val.image) finalContent += `\n\n![${b.name}](${val.image})`;
        }
        
        return { type: b.id, title: b.name, content: finalContent, faqs: faqsData, isHtml: !!val.isHtml };
      });

      const payload = {
        title_pt: formData.title_pt,
        slug: formData.slug,
        category_id: formData.category_id,
        cover_image: formData.cover_image,
        is_featured: formData.is_featured,
        content_pt: JSON.stringify(buildBlocks(false)),
        title_en: formData.title_en || formData.title_pt,
        content_en: JSON.stringify(buildBlocks(true)),
        status
      };

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) router.push('/admin');
      else {
         const data = await res.json();
         alert(data.error || 'Erro ao salvar');
      }
    } catch(err) {
      alert('Erro fatal ao salvar artigo');
    } finally {
      setSaving(false);
    }
  };

  const progressPercent = Math.round(((currentBlockIndex) / activeBlocks.length) * 100);
  const isCompleted = currentBlockIndex >= activeBlocks.length;

  return (
    <div className="admin-editor-page" style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
      
      <div className="admin-step-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'var(--font-heading)' }}>Editor Inteligente</h1>
        <div style={{ display: 'flex', gap: 8, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <span style={{ color: step >= 1 ? 'var(--primary)' : '', fontWeight: step >= 1 ? 700 : 400 }}>1. Config</span> —
          <span style={{ color: step >= 2 ? 'var(--primary)' : '', fontWeight: step >= 2 ? 700 : 400 }}>2. Estrutura</span> —
          <span style={{ color: step >= 3 ? 'var(--primary)' : '', fontWeight: step >= 3 ? 700 : 400 }}>3. Blocos</span>
        </div>
      </div>

      {step === 1 && (
        <form className="admin-card" onSubmit={handleConfigSubmit} style={{ background: 'var(--card-bg)', padding: 32, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ marginBottom: 24, fontFamily: 'var(--font-heading)' }}>Qual artigo você quer criar?</h2>
          
          <div className="form-group">
            <label>Título (H1)</label>
            <input required value={formData.title_pt} onChange={e => setFormData({...formData, title_pt: e.target.value})} placeholder="Ex: Como montar uma reserva de emergência do zero" />
          </div>

          <div className="form-group">
            <label>Título em Inglês (Opcional)</label>
            <input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} placeholder="Ex: How to build an emergency fund from scratch" />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div className="form-group">
              <label>Categoria</label>
              <select required value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}>
                <option value="">Selecione...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_pt}</option>)}
              </select>
            </div>
            
            <div className="form-group">
              <label>Tipo de Artigo (Template)</label>
              <select required value={formData.template_id} onChange={e => setFormData({...formData, template_id: e.target.value})}>
                <option value="">Selecione...</option>
                {Object.entries(TEMPLATES_DB).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 16 }}>Avançar para Estrutura <ChevronRight size={18} /></button>
        </form>
      )}

      {step === 2 && (
        <div className="admin-card" style={{ background: 'var(--card-bg)', padding: 32, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ marginBottom: 24, fontFamily: 'var(--font-heading)' }}>Estrutura do Artigo</h2>
          
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Blocos Obrigatórios</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeBlocks.filter(b => b.isRequired).map(b => (
                <div key={b.id} style={{ padding: '12px 16px', background: 'var(--background)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--border)' }}>
                  <CheckCircle2 size={16} color="var(--primary)" /> {b.name}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Blocos Opcionais</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeBlocks.filter(b => !b.isRequired).map(b => (
                <label key={b.id} style={{ padding: '12px 16px', border: b.active ? '1px solid var(--primary)' : '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: b.active ? 'var(--primary-light)' : 'var(--card-bg)' }}>
                  <input type="checkbox" checked={b.active} onChange={() => {
                    setActiveBlocks(prev => prev.map(p => p.id === b.id ? { ...p, active: !p.active } : p))
                  }} />
                  {b.name}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <button onClick={() => setStep(1)} className="btn btn-secondary"><ChevronLeft size={18} /> Voltar</button>
            <button onClick={handleStructureSubmit} className="btn btn-primary" style={{ flex: 1 }}>Montar Formulário <ChevronRight size={18} /></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.875rem', fontWeight: 600 }}>
              <span>Progresso do Artigo</span>
              <span style={{ color: 'var(--primary)' }}>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #C9A248, #9A7632)', transition: 'width 0.3s', borderRadius: 4 }} />
            </div>
          </div>

          {!isCompleted ? (
            <div className="admin-card" style={{ background: 'var(--card-bg)', padding: 40, borderRadius: 'var(--radius)', border: '1px solid var(--border)', minHeight: 400, display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>Bloco {currentBlockIndex + 1} de {activeBlocks.length}</span>
                  <h2 style={{ fontSize: '2rem', marginTop: 8, fontFamily: 'var(--font-heading)' }}>{activeBlocks[currentBlockIndex].name}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: 8 }}>{activeBlocks[currentBlockIndex].question}</p>
                </div>
                
                {activeBlocks[currentBlockIndex].type !== 'faq' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      <input type="checkbox" checked={blockValues[activeBlocks[currentBlockIndex].id]?.isHtml || false} onChange={e => setBlockValues({...blockValues, [activeBlocks[currentBlockIndex].id]: { ...blockValues[activeBlocks[currentBlockIndex].id], isHtml: e.target.checked }})} />
                      HTML Puro
                    </label>
                    {blockValues[activeBlocks[currentBlockIndex].id]?.image ? (
                       <div style={{ width: 80, height: 60, position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                         <Image src={blockValues[activeBlocks[currentBlockIndex].id].image} alt="Block img" fill style={{ objectFit: 'cover' }} />
                       </div>
                    ) : (
                      <label className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '0.875rem', cursor: 'pointer' }}>
                        {uploadingBlockImage ? <Loader2 className="animate-spin" size={16} /> : <ImagePlus size={16} />}
                        Foto
                        <input type="file" accept="image/*" onChange={e => handleImageUpload(e, activeBlocks[currentBlockIndex].id)} style={{ display: 'none' }} />
                      </label>
                    )}
                  </div>
                )}
              </div>
              
              {activeBlocks[currentBlockIndex].type === 'faq' ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {blockValues[activeBlocks[currentBlockIndex].id].faq.map((item: any, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: 12, background: 'var(--background)', padding: 16, borderRadius: 8, border: '1px solid var(--border)' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>PT-BR</span>
                          <input placeholder="Dúvida do leitor?" value={item.q} onChange={e => {
                            const newFaq = [...blockValues[activeBlocks[currentBlockIndex].id].faq];
                            newFaq[i].q = e.target.value;
                            setBlockValues(prev => ({ ...prev, [activeBlocks[currentBlockIndex].id]: { ...prev[activeBlocks[currentBlockIndex].id], faq: newFaq } }));
                          }} style={{ marginBottom: 8 }} />
                          <textarea placeholder="Resposta..." value={item.a} onChange={e => {
                            const newFaq = [...blockValues[activeBlocks[currentBlockIndex].id].faq];
                            newFaq[i].a = e.target.value;
                            setBlockValues(prev => ({ ...prev, [activeBlocks[currentBlockIndex].id]: { ...prev[activeBlocks[currentBlockIndex].id], faq: newFaq } }));
                          }} style={{ minHeight: 80 }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>EN-US (Opcional)</span>
                          <input placeholder="Question?" value={item.q_en || ""} onChange={e => {
                            const newFaq = [...blockValues[activeBlocks[currentBlockIndex].id].faq];
                            newFaq[i].q_en = e.target.value;
                            setBlockValues(prev => ({ ...prev, [activeBlocks[currentBlockIndex].id]: { ...prev[activeBlocks[currentBlockIndex].id], faq: newFaq } }));
                          }} style={{ marginBottom: 8 }} />
                          <textarea placeholder="Answer..." value={item.a_en || ""} onChange={e => {
                            const newFaq = [...blockValues[activeBlocks[currentBlockIndex].id].faq];
                            newFaq[i].a_en = e.target.value;
                            setBlockValues(prev => ({ ...prev, [activeBlocks[currentBlockIndex].id]: { ...prev[activeBlocks[currentBlockIndex].id], faq: newFaq } }));
                          }} style={{ minHeight: 80 }} />
                        </div>
                      </div>
                      <button type="button" onClick={() => {
                        const newFaq = blockValues[activeBlocks[currentBlockIndex].id].faq.filter((_: any, index: number) => index !== i);
                        setBlockValues(prev => ({ ...prev, [activeBlocks[currentBlockIndex].id]: { ...prev[activeBlocks[currentBlockIndex].id], faq: newFaq } }));
                      }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => {
                     const newFaq = [...blockValues[activeBlocks[currentBlockIndex].id].faq, {q:'', a:'', q_en:'', a_en:''}];
                     setBlockValues(prev => ({ ...prev, [activeBlocks[currentBlockIndex].id]: { ...prev[activeBlocks[currentBlockIndex].id], faq: newFaq } }));
                  }} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}><Plus size={16} /> Adicionar Pergunta</button>
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>PT-BR</span>
                      <span style={{ fontSize: '0.85rem', color: (blockValues[activeBlocks[currentBlockIndex].id]?.text?.length || 0) < (activeBlocks[currentBlockIndex].minLength || 10) ? '#ef4444' : 'var(--primary)' }}>
                        {blockValues[activeBlocks[currentBlockIndex].id]?.text?.length || 0} / {activeBlocks[currentBlockIndex].minLength || 10} mín.
                      </span>
                    </div>
                    <textarea 
                      style={{ width: '100%', minHeight: 160, fontSize: '1.1rem', padding: 20, resize: 'vertical' }}
                      placeholder={activeBlocks[currentBlockIndex].placeholder}
                      value={blockValues[activeBlocks[currentBlockIndex].id]?.text || ""}
                      onChange={e => setBlockValues({...blockValues, [activeBlocks[currentBlockIndex].id]: { ...blockValues[activeBlocks[currentBlockIndex].id], text: e.target.value }})}
                    />
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>EN-US (Opcional)</span>
                      <button type="button" onClick={async () => {
                        const ptText = blockValues[activeBlocks[currentBlockIndex].id]?.text;
                        if (!ptText) return;
                        try {
                          const res = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: ptText, targetLang: 'en' }) });
                          const data = await res.json();
                          if (data.translatedText) {
                            setBlockValues(prev => ({ ...prev, [activeBlocks[currentBlockIndex].id]: { ...prev[activeBlocks[currentBlockIndex].id], text_en: data.translatedText } }));
                          }
                        } catch (error) { alert("Erro ao traduzir"); }
                      }} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>Traduzir do PT-BR</button>
                    </div>
                    <textarea 
                      style={{ width: '100%', minHeight: 120, fontSize: '1.1rem', padding: 20, resize: 'vertical' }}
                      placeholder="English translation..."
                      value={blockValues[activeBlocks[currentBlockIndex].id]?.text_en || ""}
                      onChange={e => setBlockValues({...blockValues, [activeBlocks[currentBlockIndex].id]: { ...blockValues[activeBlocks[currentBlockIndex].id], text_en: e.target.value }})}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                <button onClick={() => setCurrentBlockIndex(prev => Math.max(0, prev - 1))} disabled={currentBlockIndex === 0} className="btn btn-secondary"><ChevronLeft size={18} /> Anterior</button>
                <button onClick={nextBlock} className="btn btn-primary">Próximo Bloco <ChevronRight size={18} /></button>
              </div>
            </div>
          ) : (
            <div className="admin-card" style={{ background: 'var(--card-bg)', padding: 40, borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <CheckCircle2 size={64} color="var(--primary)" style={{ margin: '0 auto 24px' }} />
              <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: 8 }}>Artigo Concluído!</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Todos os blocos foram preenchidos.</p>
              
              <div style={{ background: 'var(--background)', padding: 24, borderRadius: 8, textAlign: 'left', marginBottom: 32, border: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: 16, fontFamily: 'var(--font-heading)' }}>Capa OBRIGATÓRIA</h3>
                
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
                  {formData.cover_image && (
                    <div style={{ width: 120, height: 80, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                      <Image src={formData.cover_image} alt="Capa" fill style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  <label className="btn btn-secondary" style={{ cursor: 'pointer', border: !formData.cover_image ? '2px dashed var(--primary)' : '' }}>
                    {uploadingCover ? <Loader2 className="animate-spin" size={20} /> : <ImagePlus size={20} />}
                    Upload Capa
                    <input type="file" accept="image/*" onChange={e => handleImageUpload(e)} style={{ display: 'none' }} />
                  </label>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} />
                  Destacar na Página Inicial
                </label>
              </div>

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <button onClick={() => saveArticle('draft')} disabled={saving} className="btn btn-secondary">
                  Salvar Rascunho
                </button>
                <button onClick={() => saveArticle('published')} disabled={saving} className="btn btn-primary">
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />} Publicar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
