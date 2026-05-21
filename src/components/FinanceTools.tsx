"use client";

import React, { useState, useEffect } from "react";
import { Info, HelpCircle, DollarSign, Percent, TrendingUp, ShieldAlert, Award, Calendar, ChevronRight } from "lucide-react";

type ToolProps = {
  slug: string;
};

export default function FinanceTool({ slug }: ToolProps) {
  switch (slug) {
    case "calculadora-juros-compostos":
      return <CompoundInterestCalculator />;
    case "simulador-reserva-emergencia":
      return <EmergencyFundSimulator />;
    case "calculadora-cet":
      return <CetCalculator />;
    case "simulador-independencia-financeira":
      return <FireSimulator />;
    case "comparador-renda-fixa":
      return <FixedIncomeComparator />;
    default:
      return null;
  }
}

// 1. CALCULADORA DE JUROS COMPOSTOS
function CompoundInterestCalculator() {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(12); // anual %
  const [years, setYears] = useState(10);

  const [result, setResult] = useState({ total: 0, invested: 0, interest: 0 });

  useEffect(() => {
    const r = rate / 100 / 12; // taxa mensal
    const months = years * 12;
    
    let total = initial;
    for (let i = 0; i < months; i++) {
      total = total * (1 + r) + monthly;
    }
    
    // adjust for the last month if deposit is made at the start
    const invested = initial + monthly * months;
    const interest = Math.max(0, total - invested);

    setResult({
      total: Math.round(total),
      invested: Math.round(invested),
      interest: Math.round(interest),
    });
  }, [initial, monthly, rate, years]);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);
  };

  const pctInvested = result.total > 0 ? (result.invested / result.total) * 100 : 0;
  const pctInterest = result.total > 0 ? (result.interest / result.total) * 100 : 0;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <TrendingUp size={24} style={{ color: "var(--primary)" }} />
        <h3 style={styles.title}>Simulador de Juros Compostos</h3>
      </div>
      <p style={styles.description}>
        Veja o poder do tempo trabalhando a seu favor. Ajuste os valores abaixo para simular a evolução do seu patrimônio.
      </p>

      <div style={styles.grid}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Capital Inicial (R$)</label>
          <div style={styles.inputWrapper}>
            <DollarSign size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={initial}
              onChange={(e) => setInitial(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Aporte Mensal (R$)</label>
          <div style={styles.inputWrapper}>
            <DollarSign size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Taxa de Juros Anual (%)</label>
          <div style={styles.inputWrapper}>
            <Percent size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Tempo (Anos)</label>
          <div style={styles.inputWrapper}>
            <Calendar size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="1"
            max="40"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={styles.slider}
          />
        </div>
      </div>

      <div style={styles.resultsBlock}>
        <div style={styles.resultItemBig}>
          <span style={styles.resultLabel}>Valor Total Acumulado</span>
          <span style={styles.resultValueBig}>{formatBRL(result.total)}</span>
        </div>

        <div style={styles.subResults}>
          <div style={styles.resultItem}>
            <span style={styles.resultLabel}>Total Investido (Sem Juros)</span>
            <span style={{ ...styles.resultValue, color: "var(--foreground)" }}>{formatBRL(result.invested)}</span>
          </div>
          <div style={styles.resultItem}>
            <span style={styles.resultLabel}>Total Ganhos em Juros</span>
            <span style={{ ...styles.resultValue, color: "var(--primary)" }}>{formatBRL(result.interest)}</span>
          </div>
        </div>

        {/* Custom Progress Bar */}
        <div style={styles.chartTrack}>
          <div
            style={{
              ...styles.chartBar,
              width: `${pctInvested}%`,
              backgroundColor: "rgba(201, 162, 72, 0.2)",
              borderRight: "1px solid var(--border)",
            }}
            title={`Investido: ${pctInvested.toFixed(1)}%`}
          />
          <div
            style={{
              ...styles.chartBar,
              width: `${pctInterest}%`,
              backgroundColor: "var(--primary)",
            }}
            title={`Juros: ${pctInterest.toFixed(1)}%`}
          />
        </div>

        <div style={styles.chartLegend}>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendDot, backgroundColor: "rgba(201, 162, 72, 0.2)", border: "1px solid var(--primary)" }} />
            <span>Valor Investido ({pctInvested.toFixed(0)}%)</span>
          </div>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendDot, backgroundColor: "var(--primary)" }} />
            <span>Juros Acumulados ({pctInterest.toFixed(0)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. SIMULADOR DE RESERVA DE EMERGÊNCIA
function EmergencyFundSimulator() {
  const [cost, setCost] = useState(3000);
  const [jobType, setJobType] = useState("clt"); // clt, aut, pub

  const getMonths = () => {
    if (jobType === "clt") return 6;
    if (jobType === "aut") return 12;
    return 3; // pub
  };

  const months = getMonths();
  const totalReserva = cost * months;

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <Award size={24} style={{ color: "var(--primary)" }} />
        <h3 style={styles.title}>Simulador de Reserva de Emergência</h3>
      </div>
      <p style={styles.description}>
        Calcule o tamanho ideal do seu colchão financeiro com base nas suas despesas e na sua estabilidade profissional.
      </p>

      <div style={styles.grid}>
        <div style={{ ...styles.inputContainer, gridColumn: "span 2" }}>
          <label style={styles.label}>Seu Custo Fixo Mensal Médio (R$)</label>
          <div style={styles.inputWrapper}>
            <DollarSign size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="500"
            max="30000"
            step="500"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.hint}>Some aluguel, mercado, contas de consumo e saúde básicos.</span>
        </div>

        <div style={{ ...styles.inputContainer, gridColumn: "span 2" }}>
          <label style={styles.label}>Sua Situação Profissional</label>
          <div style={styles.buttonGroup}>
            <button
              onClick={() => setJobType("clt")}
              style={{
                ...styles.groupButton,
                ...(jobType === "clt" ? styles.groupButtonActive : {}),
              }}
            >
              CLT / Carteira Assinada
              <span style={styles.buttonSubText}>Recomendado: 6 meses</span>
            </button>
            <button
              onClick={() => setJobType("aut")}
              style={{
                ...styles.groupButton,
                ...(jobType === "aut" ? styles.groupButtonActive : {}),
              }}
            >
              Autônomo / PJ / Liberal
              <span style={styles.buttonSubText}>Recomendado: 12 meses</span>
            </button>
            <button
              onClick={() => setJobType("pub")}
              style={{
                ...styles.groupButton,
                ...(jobType === "pub" ? styles.groupButtonActive : {}),
              }}
            >
              Funcionário Público
              <span style={styles.buttonSubText}>Recomendado: 3 meses</span>
            </button>
          </div>
        </div>
      </div>

      <div style={styles.resultsBlock}>
        <div style={styles.resultItemBig}>
          <span style={styles.resultLabel}>Sua Reserva de Emergência Ideal</span>
          <span style={styles.resultValueBig}>{formatBRL(totalReserva)}</span>
          <span style={styles.resultSubtitle}>Equivalente a {months} meses do seu custo de vida.</span>
        </div>

        <div style={styles.recommendationBox}>
          <h4 style={styles.recTitle}>Onde guardar este dinheiro com total segurança?</h4>
          <ul style={styles.recList}>
            <li>
              <strong>40% em Tesouro Selic:</strong> Ideal para a maior parte da reserva. Protegido pelo Governo Federal e rende acima da inflação.
            </li>
            <li>
              <strong>40% em CDB 100% do CDI:</strong> Aplicação simples em bancos consolidados com liquidez diária e proteção do FGC.
            </li>
            <li>
              <strong>20% em Conta Remunerada / Dinheiro Vivo:</strong> Para resgate imediato aos fins de semana ou feriados em caso de emergências graves.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// 3. CALCULADORA DE CUSTO EFETIVO TOTAL (CET)
function CetCalculator() {
  const [loan, setLoan] = useState(10000);
  const [nominalRate, setNominalRate] = useState(15); // nominal anual %
  const [fees, setFees] = useState(800);
  const [months, setMonths] = useState(24);

  const [result, setResult] = useState({ pmtNominal: 0, pmtReal: 0, totalNominal: 0, totalReal: 0, cet: 0 });

  useEffect(() => {
    // Calculo nominal
    const rNominal = nominalRate / 100 / 12;
    const pmtNominal = rNominal > 0 
      ? (loan * rNominal * Math.pow(1 + rNominal, months)) / (Math.pow(1 + rNominal, months) - 1)
      : loan / months;
    
    // Calculo real (tarifa diluída no saldo financiado)
    const financedTotal = loan + fees;
    const pmtReal = rNominal > 0
      ? (financedTotal * rNominal * Math.pow(1 + rNominal, months)) / (Math.pow(1 + rNominal, months) - 1)
      : financedTotal / months;

    // Calcular o CET exato usando o método secante para encontrar a TIR mensal
    // Queremos encontrar 'y' tal que PV = sum(PMT_real / (1+y)^k)
    // f(y) = sum(PMT_real / (1+y)^k) - loan = 0
    let y = rNominal; // chute inicial
    let yPrev = rNominal * 1.5;
    
    const f = (rateVal: number) => {
      let sum = 0;
      for (let k = 1; k <= months; k++) {
        sum += pmtReal / Math.pow(1 + rateVal, k);
      }
      return sum - loan;
    };

    // 10 iterações do método secante para altíssima precisão
    for (let i = 0; i < 20; i++) {
      const fy = f(y);
      const fyPrev = f(yPrev);
      if (Math.abs(fy - fyPrev) < 1e-10) break;
      const yNext = y - fy * ((y - yPrev) / (fy - fyPrev));
      yPrev = y;
      y = yNext;
    }

    const cetAnual = (Math.pow(1 + y, 12) - 1) * 100;

    setResult({
      pmtNominal: Math.round(pmtNominal * 100) / 100,
      pmtReal: Math.round(pmtReal * 100) / 100,
      totalNominal: Math.round(pmtNominal * months),
      totalReal: Math.round(pmtReal * months),
      cet: Math.round(cetAnual * 100) / 100,
    });
  }, [loan, nominalRate, fees, months]);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <ShieldAlert size={24} style={{ color: "#ef4444" }} />
        <h3 style={styles.title}>Calculadora de Custo Efetivo Total (CET)</h3>
      </div>
      <p style={styles.description}>
        Descubra a taxa de juros real do seu empréstimo ou financiamento. Bancos costumam embutir taxas e seguros ocultos que disfarçam o custo real.
      </p>

      <div style={styles.grid}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Valor do Empréstimo (R$)</label>
          <div style={styles.inputWrapper}>
            <DollarSign size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={loan}
              onChange={(e) => setLoan(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={loan}
            onChange={(e) => setLoan(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Taxa de Juros Nominal Anual (%)</label>
          <div style={styles.inputWrapper}>
            <Percent size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={nominalRate}
              onChange={(e) => setNominalRate(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={nominalRate}
            onChange={(e) => setNominalRate(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Tarifas e Seguros Embutidos (R$)</label>
          <div style={styles.inputWrapper}>
            <DollarSign size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={fees}
              onChange={(e) => setFees(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={fees}
            onChange={(e) => setFees(Number(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.hint}>Ex: TAC, IOF, seguro prestamista obrigatório.</span>
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Prazo (Meses)</label>
          <div style={styles.inputWrapper}>
            <Calendar size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(Math.max(1, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="6"
            max="120"
            step="6"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            style={styles.slider}
          />
        </div>
      </div>

      <div style={styles.resultsBlock}>
        <div style={styles.subResults}>
          <div style={{ ...styles.resultItem, borderRight: "1px solid var(--border)" }}>
            <span style={styles.resultLabel}>Juros Anunciados (Nominal)</span>
            <span style={{ ...styles.resultValue, color: "var(--foreground)" }}>{nominalRate.toFixed(1)}% a.a.</span>
            <span style={styles.resultLabel}>Parcela: {formatBRL(result.pmtNominal)}</span>
          </div>
          <div style={{ ...styles.resultItem }}>
            <span style={styles.resultLabel}>Custo Efetivo Total (CET Real)</span>
            <span style={{ ...styles.resultValue, color: "#ef4444", fontSize: "2rem" }}>{result.cet.toFixed(2)}% a.a.</span>
            <span style={styles.resultLabel}><span style={{ color: "#ef4444", fontWeight: 700 }}>Parcela Real: {formatBRL(result.pmtReal)}</span></span>
          </div>
        </div>

        <div style={{ ...styles.resultItemBig, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
          <span style={styles.resultLabel}>Custo Adicional Silencioso das Taxas</span>
          <span style={{ ...styles.resultValue, color: "var(--primary)" }}>{formatBRL(result.totalReal - result.totalNominal)}</span>
          <span style={styles.resultSubtitle}>Total pago no final: {formatBRL(result.totalReal)}</span>
        </div>

        {result.cet - nominalRate > 2 && (
          <div style={styles.alertBox}>
            <h5 style={{ margin: "0 0 6px 0", color: "#ef4444", fontWeight: 700 }}>Atenção: O CET está muito acima dos juros anunciados!</h5>
            As tarifas extras e seguros estão encarecendo o seu empréstimo em <strong>{(result.cet - nominalRate).toFixed(1)}% ao ano</strong>. Tente renegociar para remover seguros embutidos ou taxas de cadastro abusivas!
          </div>
        )}
      </div>
    </div>
  );
}

// 4. SIMULADOR DE INDEPENDÊNCIA FINANCEIRA (FIRE)
function FireSimulator() {
  const [targetCost, setTargetCost] = useState(5000);
  const [currentWealth, setCurrentWealth] = useState(10000);
  const [monthlyInvest, setMonthlyInvest] = useState(1000);
  const [realRate, setRealRate] = useState(6); // retorno real anual % (acima da inflação)

  const [result, setResult] = useState({ fireNumber: 0, monthsToFire: 0, achieved: false });

  useEffect(() => {
    // Regra dos 4%: Patrimonio ideal = Custo Anual / 0.04 = Custo Mensal * 12 * 25
    const fireNumber = targetCost * 300; // Equivalente a multiplicar por 12 e dividir por 0.04
    
    const rRealMonthly = realRate / 100 / 12;
    let balance = currentWealth;
    let months = 0;
    const maxMonths = 600; // Limitado a 50 anos

    if (balance >= fireNumber) {
      setResult({ fireNumber, monthsToFire: 0, achieved: true });
      return;
    }

    while (balance < fireNumber && months < maxMonths) {
      balance = balance * (1 + rRealMonthly) + monthlyInvest;
      months++;
    }

    setResult({
      fireNumber: Math.round(fireNumber),
      monthsToFire: months,
      achieved: false,
    });
  }, [targetCost, currentWealth, monthlyInvest, realRate]);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);
  };

  const getYearsMonths = (totalMonths: number) => {
    if (totalMonths >= 600) return "Mais de 50 anos";
    const yrs = Math.floor(totalMonths / 12);
    const mths = totalMonths % 12;
    if (yrs === 0) return `${mths} meses`;
    return `${yrs} anos e ${mths} meses`;
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <TrendingUp size={24} style={{ color: "var(--primary)" }} />
        <h3 style={styles.title}>Simulador de Aposentadoria FIRE (Viver de Renda)</h3>
      </div>
      <p style={styles.description}>
        Descubra o patrimônio necessário para se aposentar e viver exclusivamente dos rendimentos dos seus investimentos (ajustado pela inflação).
      </p>

      <div style={styles.grid}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Renda Mensal Desejada (R$)</label>
          <div style={styles.inputWrapper}>
            <DollarSign size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={targetCost}
              onChange={(e) => setTargetCost(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="1000"
            max="30000"
            step="500"
            value={targetCost}
            onChange={(e) => setTargetCost(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Patrimônio Acumulado Atual (R$)</label>
          <div style={styles.inputWrapper}>
            <DollarSign size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={currentWealth}
              onChange={(e) => setCurrentWealth(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="0"
            max="500000"
            step="5000"
            value={currentWealth}
            onChange={(e) => setCurrentWealth(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Aporte Mensal (R$)</label>
          <div style={styles.inputWrapper}>
            <DollarSign size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={monthlyInvest}
              onChange={(e) => setMonthlyInvest(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="100"
            max="20000"
            step="100"
            value={monthlyInvest}
            onChange={(e) => setMonthlyInvest(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Rentabilidade Real Anual (%)</label>
          <div style={styles.inputWrapper}>
            <Percent size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={realRate}
              onChange={(e) => setRealRate(Math.max(1, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="2"
            max="12"
            step="0.5"
            value={realRate}
            onChange={(e) => setRealRate(Number(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.hint}>Dica: 5% a 7% é uma rentabilidade real histórica conservadora.</span>
        </div>
      </div>

      <div style={styles.resultsBlock}>
        <div style={styles.subResults}>
          <div style={{ ...styles.resultItem, borderRight: "1px solid var(--border)" }}>
            <span style={styles.resultLabel}>Seu Número FIRE (Patrimônio Alvo)</span>
            <span style={{ ...styles.resultValue, color: "var(--foreground)" }}>{formatBRL(result.fireNumber)}</span>
            <span style={styles.resultSubtitle}>Com base na regra de retirada de 4% ao ano.</span>
          </div>
          <div style={styles.resultItem}>
            <span style={styles.resultLabel}>Tempo para Conquistar</span>
            {result.achieved ? (
              <span style={{ ...styles.resultValue, color: "var(--primary)" }}>Já Atingido! 🎉</span>
            ) : (
              <span style={{ ...styles.resultValue, color: "var(--primary)" }}>{getYearsMonths(result.monthsToFire)}</span>
            )}
            <span style={styles.resultSubtitle}>Mantendo o aporte constante e reinvestindo.</span>
          </div>
        </div>

        <div style={styles.recommendationBox}>
          <h4 style={styles.recTitle}>Milestones da sua Liberdade Financeira:</h4>
          <div style={styles.milestoneGrid}>
            <div style={styles.milestoneItem}>
              <div style={styles.milestoneIcon}>🏠</div>
              <div>
                <strong>Segurança Básica (10% do FIRE):</strong> {formatBRL(result.fireNumber * 0.1)}
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>Garante moradia e alimentação perpétuas.</p>
              </div>
            </div>
            <div style={styles.milestoneItem}>
              <div style={styles.milestoneIcon}>🚀</div>
              <div>
                <strong>Meio Caminho (50% do FIRE):</strong> {formatBRL(result.fireNumber * 0.5)}
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>Seus juros pagam metade do seu custo de vida.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. COMPARADOR DE RENDA FIXA (TESOURO VS POUPANÇA VS CDB)
function FixedIncomeComparator() {
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(3);

  const [results, setResults] = useState({ poupanca: 0, cdb: 0, tesouro: 0 });

  useEffect(() => {
    // Rendimentos reais históricos aproximados (base Selic 10.75%)
    // Poupança: 6.17% ao ano (isento)
    // CDB 100% CDI: 10.65% ao ano nominal. Imposto de Renda progressivo descontado no final:
    //   1 ano: 17.5% de IR sobre lucros
    //   >2 anos: 15% de IR sobre lucros
    // Tesouro Selic: 10.75% ao ano nominal. Custódia B3 de 0.2% a.a. IR igual ao CDB.
    
    // 1. Poupança
    const ratePoup = 0.0617;
    const finalPoup = amount * Math.pow(1 + ratePoup, years);

    // Alíquota IR
    const days = years * 365;
    let irTax = 0.15;
    if (days <= 180) irTax = 0.225;
    else if (days <= 360) irTax = 0.20;
    else if (days <= 720) irTax = 0.175;

    // 2. CDB 100% CDI
    const rateCdb = 0.1065;
    const grossCdb = amount * Math.pow(1 + rateCdb, years);
    const profitCdb = grossCdb - amount;
    const finalCdb = amount + profitCdb * (1 - irTax);

    // 3. Tesouro Selic (Selic + 0.1% - 0.2% taxa B3)
    const rateSelic = 0.1075 - 0.002;
    const grossSelic = amount * Math.pow(1 + rateSelic, years);
    const profitSelic = grossSelic - amount;
    const finalSelic = amount + profitSelic * (1 - irTax);

    setResults({
      poupanca: Math.round(finalPoup),
      cdb: Math.round(finalCdb),
      tesouro: Math.round(finalSelic),
    });
  }, [amount, years]);

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(val);
  };

  const maxVal = Math.max(results.poupanca, results.cdb, results.tesouro);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <Award size={24} style={{ color: "var(--primary)" }} />
        <h3 style={styles.title}>Comparador de Renda Fixa Inteligente</h3>
      </div>
      <p style={styles.description}>
        Compare o rendimento líquido real (já descontando Imposto de Renda) de R$ {amount.toLocaleString("pt-BR")} investidos por {years} {years === 1 ? "ano" : "anos"}.
      </p>

      <div style={styles.grid}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Valor para Investir (R$)</label>
          <div style={styles.inputWrapper}>
            <DollarSign size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="1000"
            max="200000"
            step="5000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={styles.slider}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Prazo (Anos)</label>
          <div style={styles.inputWrapper}>
            <Calendar size={16} style={styles.inputIcon} />
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
              style={styles.input}
            />
          </div>
          <input
            type="range"
            min="1"
            max="15"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={styles.slider}
          />
        </div>
      </div>

      <div style={styles.resultsBlock}>
        {/* Dynamic Horizontal Chart Bars */}
        <div style={styles.barChartContainer}>
          
          {/* Poupança */}
          <div style={styles.chartBarWrapper}>
            <div style={styles.barLabelGroup}>
              <span style={styles.barName}>Poupança tradicional</span>
              <span style={styles.barVal}>{formatBRL(results.poupanca)}</span>
            </div>
            <div style={styles.barTrack}>
              <div 
                style={{ 
                  ...styles.barFill, 
                  width: `${(results.poupanca / maxVal) * 100}%`,
                  backgroundColor: "#8c8c8c" 
                }} 
              />
            </div>
            <span style={styles.barDetail}>Lucro Líquido: {formatBRL(results.poupanca - amount)}</span>
          </div>

          {/* CDB 100% CDI */}
          <div style={styles.chartBarWrapper}>
            <div style={styles.barLabelGroup}>
              <span style={{ ...styles.barName, fontWeight: 700 }}>CDB 100% CDI (Sofisa/Daycoval)</span>
              <span style={{ ...styles.barVal, color: "var(--primary)" }}>{formatBRL(results.cdb)}</span>
            </div>
            <div style={styles.barTrack}>
              <div 
                style={{ 
                  ...styles.barFill, 
                  width: `${(results.cdb / maxVal) * 100}%`,
                  backgroundColor: "var(--primary)" 
                }} 
              />
            </div>
            <span style={styles.barDetail}>Lucro Líquido: {formatBRL(results.cdb - amount)} (Já sem IR)</span>
          </div>

          {/* Tesouro Selic */}
          <div style={styles.chartBarWrapper}>
            <div style={styles.barLabelGroup}>
              <span style={{ ...styles.barName, fontWeight: 700 }}>Tesouro Selic (Título Público)</span>
              <span style={{ ...styles.barVal, color: "var(--primary)" }}>{formatBRL(results.tesouro)}</span>
            </div>
            <div style={styles.barTrack}>
              <div 
                style={{ 
                  ...styles.barFill, 
                  width: `${(results.tesouro / maxVal) * 100}%`,
                  backgroundColor: "#16a34a" 
                }} 
              />
            </div>
            <span style={styles.barDetail}>Lucro Líquido: {formatBRL(results.tesouro - amount)} (Com taxa B3 + IR)</span>
          </div>

        </div>

        <div style={styles.alertBox}>
          <h5 style={{ margin: "0 0 6px 0", color: "var(--primary)", fontWeight: 700 }}>Conclusão Inteligente</h5>
          Investindo em CDB 100% do CDI ou Tesouro Selic, você ganha aproximadamente <strong>{formatBRL(results.cdb - results.poupanca)} a mais</strong> em comparação à poupança tradicional neste prazo, mantendo a mesma segurança e liquidez!
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// INLINE PREMIUM STYLES (Forest Dark & Gold Color Palette)
// -------------------------------------------------------------
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "20px",
    padding: "36px",
    margin: "40px 0 56px 0",
    boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
    fontFamily: "var(--font-sans), sans-serif",
    color: "var(--foreground)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 800,
    margin: 0,
    fontFamily: "var(--font-heading), serif",
    color: "var(--foreground)",
  },
  description: {
    fontSize: "1.1rem",
    color: "var(--text-muted)",
    lineHeight: 1.6,
    marginBottom: "32px",
    marginTop: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    marginBottom: "36px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "var(--foreground)",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    color: "var(--text-muted)",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 38px",
    fontSize: "1.05rem",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    outline: "none",
    fontWeight: 500,
  },
  slider: {
    width: "100%",
    accentColor: "var(--primary)",
    cursor: "pointer",
    marginTop: "8px",
  },
  hint: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    marginTop: "4px",
  },
  buttonGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
    marginTop: "4px",
  },
  groupButton: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "var(--background)",
    color: "var(--foreground)",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: 600,
    textAlign: "center",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  },
  groupButtonActive: {
    borderColor: "var(--primary)",
    background: "rgba(201, 162, 72, 0.08)",
    boxShadow: "0 0 10px rgba(201, 162, 72, 0.1)",
  },
  buttonSubText: {
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "var(--text-muted)",
  },
  resultsBlock: {
    background: "var(--background)",
    borderRadius: "14px",
    padding: "28px",
    border: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  resultItemBig: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  resultLabel: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "4px",
  },
  resultValueBig: {
    fontSize: "2.5rem",
    fontWeight: 900,
    color: "var(--primary)",
    fontFamily: "var(--font-heading), serif",
  },
  resultSubtitle: {
    fontSize: "0.9rem",
    color: "var(--text-muted)",
    marginTop: "6px",
  },
  subResults: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  resultItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  resultValue: {
    fontSize: "1.5rem",
    fontWeight: 800,
  },
  chartTrack: {
    height: "12px",
    borderRadius: "999px",
    backgroundColor: "var(--border)",
    overflow: "hidden",
    display: "flex",
  },
  chartBar: {
    height: "100%",
    transition: "width 0.3s ease",
  },
  chartLegend: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    flexWrap: "wrap",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },
  recommendationBox: {
    borderTop: "1px solid var(--border)",
    paddingTop: "20px",
  },
  recTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    margin: "0 0 12px 0",
    color: "var(--foreground)",
  },
  recList: {
    margin: 0,
    paddingLeft: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },
  alertBox: {
    padding: "16px",
    borderRadius: "10px",
    background: "rgba(201, 162, 72, 0.05)",
    border: "1px solid rgba(201, 162, 72, 0.2)",
    fontSize: "0.95rem",
    lineHeight: 1.5,
    color: "var(--foreground)",
  },
  barChartContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  chartBarWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  barLabelGroup: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.95rem",
  },
  barName: {
    color: "var(--foreground)",
    fontWeight: 500,
  },
  barVal: {
    fontWeight: 700,
  },
  barTrack: {
    height: "10px",
    backgroundColor: "var(--background)",
    borderRadius: "999px",
    overflow: "hidden",
    border: "1px solid var(--border)",
  },
  barFill: {
    height: "100%",
    borderRadius: "999px",
    transition: "width 0.4s ease",
  },
  barDetail: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    alignSelf: "flex-end",
  },
  milestoneGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginTop: "12px",
  },
  milestoneItem: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    background: "var(--background)",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    fontSize: "0.9rem",
  },
  milestoneIcon: {
    fontSize: "1.2rem",
    lineHeight: 1,
  },
};
