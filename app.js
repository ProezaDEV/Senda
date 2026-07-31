/**
 * Senda — protótipo educativo de orientação em nutrição e saúde.
 * Cálculos: Mifflin-St Jeor (TMB) + fator de atividade (TDEE).
 */

const CONTENTS = [
  {
    id: 1,
    category: "nutricao",
    tag: "Nutrição",
    title: "Déficit calórico sem mistério",
    summary:
      "Para emagrecer com segurança, o corpo precisa gastar um pouco mais do que consome. Um déficit moderado (cerca de 15–20%) costuma ser mais sustentável do que cortes extremos.",
    keywords: ["deficit", "déficit", "emagrecer", "calorias", "peso"],
  },
  {
    id: 2,
    category: "nutricao",
    tag: "Nutrição",
    title: "Superávit para ganhar massa",
    summary:
      "Quem busca ganho muscular precisa de energia extra (superávit), proteína adequada e estímulo de treino. O excesso muito grande favorece gordura, não só músculo.",
    keywords: ["superavit", "superávit", "massa", "ganhar", "proteina", "proteína"],
  },
  {
    id: 3,
    category: "nutricao",
    tag: "Nutrição",
    title: "Proteína no dia a dia",
    summary:
      "Referência comum: cerca de 1,6 a 2,2 g por kg de peso para quem treina. Ovos, feijão, iogurte, peixe e carnes magras ajudam a fechar a meta.",
    keywords: ["proteina", "proteína", "treino", "músculo"],
  },
  {
    id: 4,
    category: "saude",
    tag: "Saúde",
    title: "Hidratação que faz diferença",
    summary:
      "Uma base prática é ~35 ml por kg de peso, ajustando com calor e treino. Urina clara e energia estável são bons sinais de que a água está em dia.",
    keywords: ["agua", "água", "hidratação", "hidratacao", "líquido"],
  },
  {
    id: 5,
    category: "saude",
    tag: "Saúde",
    title: "Quando pensar em exames",
    summary:
      "Cansaço intenso, queda de cabelo, alterações de peso sem causa clara ou histórico familiar podem indicar avaliação com hemograma, glicemia, lipídios e tireoide — sempre com profissional.",
    keywords: ["exame", "exames", "sangue", "diagnostico", "diagnóstico", "medico"],
  },
  {
    id: 6,
    category: "estudos",
    tag: "Estudos",
    title: "Sinais vitais — resumo de enfermagem",
    summary:
      "Temperatura, pulso, respiração e pressão arterial formam a base da avaliação. Saber os intervalos de referência ajuda a perceber alterações e comunicar com clareza.",
    keywords: ["enfermagem", "sinais", "vitais", "pressao", "pressão", "estudo"],
  },
  {
    id: 7,
    category: "estudos",
    tag: "Estudos",
    title: "Metabolismo basal (TMB)",
    summary:
      "É a energia que o corpo gasta em repouso absoluto. A fórmula de Mifflin-St Jeor estima a TMB; multiplicando pelo nível de atividade chegamos ao gasto total diário (TDEE).",
    keywords: ["metabolismo", "tmb", "tdee", "basal", "repouso"],
  },
  {
    id: 8,
    category: "natural",
    tag: "Natural",
    title: "Chá de gengibre e digestão",
    summary:
      "O gengibre é usado tradicionalmente para náusea leve e conforto digestivo. Infusão simples: fatias frescas em água quente por 8–10 min. Evite excessos e consulte se houver medicação.",
    keywords: ["cha", "chá", "gengibre", "natural", "digestão", "receita"],
  },
  {
    id: 9,
    category: "natural",
    tag: "Natural",
    title: "Aveia e saciedade",
    summary:
      "Rica em fibras solúveis, a aveia ajuda na saciedade e no controle glicêmico quando faz parte de uma refeição equilibrada. Combine com fruta e fonte de proteína.",
    keywords: ["aveia", "fibra", "saciedade", "café", "cafe", "receita"],
  },
  {
    id: 10,
    category: "saude",
    tag: "Saúde",
    title: "Sono e fome",
    summary:
      "Noites curtas elevam a fome e dificultam escolhas alimentares. Meta útil: 7–9 horas e horário mais estável. Isso apoia qualquer plano nutricional.",
    keywords: ["sono", "dormir", "fome", "habito", "hábito"],
  },
  {
    id: 11,
    category: "nutricao",
    tag: "Suplementos",
    title: "Creatina — o que costuma se saber",
    summary:
      "A creatina monoidratada é um dos suplementos mais estudados para força e performance. Uso comum em literatura: ~3–5 g/dia. Quem tem problema renal deve falar com médico antes.",
    keywords: ["creatina", "suplemento", "suplementos", "treino", "força"],
  },
  {
    id: 12,
    category: "nutricao",
    tag: "Suplementos",
    title: "Whey e proteína em pó",
    summary:
      "Whey ajuda a fechar a meta de proteína quando a comida não basta. Não é mágico: o total diário e o treino importam mais que a marca.",
    keywords: ["whey", "proteina", "proteína", "suplemento", "shake"],
  },
  {
    id: 13,
    category: "saude",
    tag: "Saúde",
    title: "Anabolizantes — riscos gerais",
    summary:
      "Esteroides anabolizantes sem indicação médica elevam riscos cardiovasculares, hepáticos e hormonais. A Senda não orienta ciclos nem doses — procure acompanhamento profissional.",
    keywords: ["anabolizante", "anabolizantes", "esteroide", "hormonio", "hormônio"],
  },
  {
    id: 14,
    category: "natural",
    tag: "Natural",
    title: "Chá de camomila e relaxamento",
    summary:
      "Camomila é usada tradicionalmente para relaxamento leve. Infusão suave à noite pode ajudar a rotina de sono; evite se houver alergia a plantas da família.",
    keywords: ["camomila", "chá", "cha", "natural", "sono", "relaxar"],
  },
];

const CHAT_KB = [
  {
    keys: ["deficit", "déficit", "emagrecer", "emagrecimento", "perder peso"],
    reply:
      "Déficit calórico é consumir menos energia do que o corpo gasta. Na prática: estime seu gasto (TDEE), reduza cerca de 15–20% e priorize proteína + fibras. Cortes muito agressivos aumentam fadiga e efeito sanfona. Use a ferramenta acima para uma meta inicial.",
  },
  {
    keys: ["superavit", "superávit", "massa", "hipertrofia", "ganhar"],
    reply:
      "Superávit é ingerir um pouco acima do gasto para favorecer ganho de massa, junto com treino de força e proteína adequada. Comece com +200 a +300 kcal/dia e ajuste conforme a balança e as medidas.",
  },
  {
    keys: ["proteina", "proteína", "whey"],
    reply:
      "Para quem treina, 1,6–2,2 g de proteína por kg de peso corporal é uma faixa comum na literatura. Distribua ao longo do dia. Suplemento só ajuda se a comida não fechar a meta.",
  },
  {
    keys: ["agua", "água", "hidrata"],
    reply:
      "Uma referência prática é cerca de 35 ml por kg/dia, subindo com treino e calor. Bebidas açucaradas não substituem água para hidratação de base.",
  },
  {
    keys: ["exame", "sangue", "medico", "médico", "nutricionista"],
    reply:
      "A Senda não diagnostica. Sinais de alerta (cansaço extremo, tontura, alteração forte de peso) pedem avaliação presencial. Exames frequentes na rotina: hemograma, glicemia, perfil lipídico — pedidos por profissional.",
  },
  {
    keys: ["sono", "dormir", "insonia", "insônia"],
    reply:
      "Sono irregular atrapalha fome, humor e recuperação. Tente horário fixo, menos tela à noite e cafeína mais cedo. Sem sono, qualquer plano alimentar fica mais difícil.",
  },
  {
    keys: ["metabolismo", "tmb", "basal", "tdee"],
    reply:
      "TMB é o gasto em repouso. TDEE é TMB × nível de atividade. A ferramenta da Senda usa Mifflin-St Jeor para estimar esses números e sugerir meta conforme seu objetivo.",
  },
  {
    keys: ["enfermagem", "estudo", "resumo"],
    reply:
      "Na área de estudos, a ideia da Senda é reunir resumos (sinais vitais, farmacologia básica, nutrição clínica) para quem aprende ou ensina — como profissionais de enfermagem compartilhando material didático.",
  },
  {
    keys: ["creatina"],
    reply:
      "Creatina monoidratada é bem estudada para força e performance. Faixa comum citada: cerca de 3–5 g/dia com água. Não substitui treino nem proteína. Quem tem doença renal deve consultar médico.",
  },
  {
    keys: ["whey", "suplemento", "suplementos"],
    reply:
      "Suplementos (whey, creatina, vitaminas) complementam a alimentação — não a substituem. Whey serve para fechar proteína; vitaminas só fazem sentido se houver deficiência ou orientação. Avalie com nutricionista.",
  },
  {
    keys: ["anabolizante", "anabolizantes", "esteroide", "esteroides"],
    reply:
      "Anabolizantes sem indicação médica trazem riscos sérios (coração, fígado, hormônios). A Senda não indica ciclo, dose nem compra. Se houver interesse clínico legítimo, fale com médico.",
  },
];

function mifflinStJeor({ weight, height, age, sex }) {
  // weight kg, height cm
  const base = 10 * weight + 6.25 * height - 5 * age;
  return sex === "masculino" ? base + 5 : base - 161;
}

function imc(weight, heightCm) {
  const h = heightCm / 100;
  return weight / (h * h);
}

function imcLabel(value) {
  if (value < 18.5) return "abaixo do peso (referência OMS)";
  if (value < 25) return "faixa considerada adequada (referência OMS)";
  if (value < 30) return "sobrepeso (referência OMS)";
  return "obesidade (referência OMS) — avalie com profissional";
}

function waterTarget(weight) {
  return (weight * 0.035).toFixed(1);
}

function proteinTarget(weight, goal) {
  const min = goal === "ganhar" ? 1.8 : 1.6;
  const max = goal === "ganhar" ? 2.2 : 2.0;
  return { min: Math.round(weight * min), max: Math.round(weight * max) };
}

function buildDirection(data) {
  const tmb = Math.round(mifflinStJeor(data));
  const tdee = Math.round(tmb * data.activity);
  const bmi = imc(data.weight, data.height);
  const waterSug = waterTarget(data.weight);
  const protein = proteinTarget(data.weight, data.goal);

  let targetCalories;
  let goalTitle;
  let steps;

  switch (data.goal) {
    case "emagrecer":
      targetCalories = Math.round(tdee * 0.82);
      goalTitle = "Déficit calórico guiado";
      steps = [
        `Meta aproximada: ${targetCalories} kcal/dia (cerca de 18% abaixo do seu gasto estimado).`,
        `Proteína: ${protein.min}–${protein.max} g/dia para preservar massa magra.`,
        `Água sugerida: ~${waterSug} L/dia (você informou ${data.water} L).`,
        "Priorize refeições com vegetais, proteína e carboidratos integrais; evite cortar grupos alimentares inteiros sem orientação.",
        "Combine com caminhada ou treino 3–5x/semana e reavalie peso a cada 2 semanas.",
      ];
      break;
    case "ganhar":
      targetCalories = Math.round(tdee * 1.12);
      goalTitle = "Superávit calórico controlado";
      steps = [
        `Meta aproximada: ${targetCalories} kcal/dia (cerca de 12% acima do gasto estimado).`,
        `Proteína: ${protein.min}–${protein.max} g/dia + treino de força.`,
        `Água sugerida: ~${waterSug} L/dia.`,
        "Aumente porções aos poucos; se o ganho for só de gordura, reduza o superávit.",
        "Durma 7–9 h — recuperação é parte do ganho muscular.",
      ];
      break;
    case "manter":
      targetCalories = tdee;
      goalTitle = "Manutenção com equilíbrio";
      steps = [
        `Meta aproximada: ${targetCalories} kcal/dia (próximo ao seu TDEE).`,
        `Proteína: ${protein.min}–${protein.max} g/dia.`,
        `Água sugerida: ~${waterSug} L/dia.`,
        "Foque em consistência: horários regulares, fibras e movimento diário.",
        "Use a balança semanalmente só como um dos sinais — energia e disposição também contam.",
      ];
      break;
    default:
      targetCalories = tdee;
      goalTitle = "Modo aprendizado";
      steps = [
        `Seu gasto estimado em repouso (TMB) é ~${tmb} kcal; com atividade, ~${tdee} kcal (TDEE).`,
        "Déficit = comer abaixo do TDEE (emagrecer). Superávit = acima do TDEE (ganhar massa).",
        `IMC estimado: ${bmi.toFixed(1)} — ${imcLabel(bmi)}.`,
        "Explore os conteúdos abaixo e use o chat para tirar dúvidas pontuais.",
        "Quando for aplicar mudanças reais, valide com nutricionista ou médico.",
      ];
  }

  const exams = [];
  if (bmi >= 30 || bmi < 18.5) {
    exams.push("Avaliação presencial com médico/nutricionista (IMC fora da faixa intermediária).");
  }
  if (data.age >= 40) {
    exams.push("Check-up periódico: glicemia, perfil lipídico e pressão arterial.");
  }
  if (Number(data.water) < Number(waterSug) * 0.7) {
    exams.push("Hidratação abaixo do sugerido — ajuste gradual; se houver sede excessiva ou fadiga, converse com profissional.");
  }
  if (data.goal === "emagrecer" && tdee - targetCalories > 700) {
    exams.push("Déficit muito alto não é o foco aqui; mantenha o corte moderado da meta calculada.");
  }
  if (exams.length === 0) {
    exams.push("Com os dados atuais, nenhum alerta forte. Mesmo assim, rotina anual de exames é recomendável.");
  }

  const matches = matchContents(data.query || data.goal);

  return {
    tmb,
    tdee,
    targetCalories,
    bmi,
    bmiLabel: imcLabel(bmi),
    goalTitle,
    steps,
    exams,
    matches,
  };
}

function matchContents(query) {
  const q = (query || "").toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  if (!q.trim()) {
    return CONTENTS.slice(0, 3);
  }
  const scored = CONTENTS.map((item) => {
    const hay = [item.title, item.summary, ...item.keywords, item.tag]
      .join(" ")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "");
    let score = 0;
    q.split(/\s+/).forEach((word) => {
      if (word.length > 2 && hay.includes(word)) score += 1;
    });
    item.keywords.forEach((k) => {
      const kn = k.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
      if (q.includes(kn)) score += 2;
    });
    return { item, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.item);

  return scored.length ? scored : CONTENTS.slice(0, 3);
}

function renderResult(result) {
  const body = document.getElementById("result-body");
  const empty = document.getElementById("result-empty");
  empty.classList.add("hidden");
  body.classList.remove("hidden");

  body.innerHTML = `
    <h3>${result.goalTitle}</h3>
    <p>IMC estimado: <strong>${result.bmi.toFixed(1)}</strong> — ${result.bmiLabel}</p>
    <div class="metrics">
      <div class="metric"><span>TMB (repouso)</span><strong>${result.tmb} kcal</strong></div>
      <div class="metric"><span>TDEE (com atividade)</span><strong>${result.tdee} kcal</strong></div>
      <div class="metric"><span>Meta do objetivo</span><strong>${result.targetCalories} kcal</strong></div>
      <div class="metric"><span>Próximo passo</span><strong>Seguir plano</strong></div>
    </div>
    <h4 style="margin:0;font-family:var(--font-display)">Sua direção</h4>
    <ul class="direction-list">
      ${result.steps.map((s) => `<li>${s}</li>`).join("")}
    </ul>
    <div class="alert-box">
      <strong>Exames e cuidado profissional</strong>
      ${result.exams.map((e) => `<div>• ${e}</div>`).join("")}
    </div>
    <div class="match-box">
      <h4>Conteúdos relacionados à sua pesquisa</h4>
      <ul>
        ${result.matches.map((m) => `<li><strong>${m.title}:</strong> ${m.summary}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderContents(filter = "todos") {
  const list = document.getElementById("content-list");
  const items = filter === "todos" ? CONTENTS : CONTENTS.filter((c) => c.category === filter);
  list.innerHTML = items
    .map(
      (c) => `
    <article class="content-item" data-category="${c.category}">
      <span class="tag">${c.tag}</span>
      <h3>${c.title}</h3>
      <p>${c.summary}</p>
    </article>`
    )
    .join("");
}

const CHAT_DAILY_LIMIT = 25;
const CHAT_LIMIT_KEY = "senda_chat_quota";

function localChatReply(text) {
  const q = text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  for (const entry of CHAT_KB) {
    if (entry.keys.some((k) => q.includes(k.normalize("NFD").replace(/\p{M}/gu, "")))) {
      return entry.reply;
    }
  }
  return "Ainda não tenho essa resposta na base local. Com a IA ligada na Vercel, perguntas novas passam a ser interpretadas. Enquanto isso, tente déficit, proteína, creatina, hidratação, sono ou exames.";
}

function getChatQuota() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const raw = JSON.parse(localStorage.getItem(CHAT_LIMIT_KEY) || "{}");
    if (raw.day !== today) return { day: today, count: 0 };
    return { day: today, count: Number(raw.count) || 0 };
  } catch {
    return { day: today, count: 0 };
  }
}

function bumpChatQuota() {
  const q = getChatQuota();
  q.count += 1;
  localStorage.setItem(CHAT_LIMIT_KEY, JSON.stringify(q));
  return q;
}

async function askSenda(text) {
  const quota = getChatQuota();
  if (quota.count >= CHAT_DAILY_LIMIT) {
    return {
      reply: `Limite do protótipo: ${CHAT_DAILY_LIMIT} perguntas por dia neste navegador. Volte amanhã ou use a base de conteúdos abaixo.`,
      source: "limit",
    };
  }

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok && data.reply) {
      bumpChatQuota();
      return { reply: data.reply, source: "ai" };
    }

    if (data.fallback || data.code === "missing_api_key" || res.status === 503) {
      bumpChatQuota();
      return { reply: localChatReply(text), source: "local" };
    }

    if (res.status === 429) {
      return { reply: data.error || "Muitas perguntas agora. Aguarde um pouco.", source: "limit" };
    }

    bumpChatQuota();
    return {
      reply: data.error ? `${data.error} Usando base local: ${localChatReply(text)}` : localChatReply(text),
      source: "local",
    };
  } catch {
    bumpChatQuota();
    return { reply: localChatReply(text), source: "local" };
  }
}

function appendBubble(text, who) {
  const log = document.getElementById("chat-log");
  const div = document.createElement("div");
  div.className = `bubble ${who}`;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function setChatBusy(busy) {
  const input = document.getElementById("chat-input");
  const btn = document.querySelector("#chat-form button");
  input.disabled = busy;
  btn.disabled = busy;
  btn.textContent = busy ? "Pensando…" : "Enviar";
}

function init() {
  renderContents();

  document.getElementById("health-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      goal: fd.get("goal"),
      age: Number(fd.get("age")),
      sex: fd.get("sex"),
      weight: Number(fd.get("weight")),
      height: Number(fd.get("height")),
      water: Number(fd.get("water") || 0),
      activity: Number(fd.get("activity")),
      query: String(fd.get("query") || ""),
    };

    if (!data.age || !data.weight || !data.height) {
      alert("Preencha idade, peso e altura.");
      return;
    }

    const result = buildDirection(data);
    renderResult(result);
    document.getElementById("result-panel").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderContents(btn.dataset.filter);
    });
  });

  document.getElementById("chat-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;
    appendBubble(text, "user");
    input.value = "";
    setChatBusy(true);
    const { reply } = await askSenda(text);
    appendBubble(reply, "bot");
    setChatBusy(false);
    input.focus();
  });

  document.getElementById("interest-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get("name");
    const role = fd.get("role");
    const feedback = document.getElementById("interest-feedback");
    const interests = JSON.parse(localStorage.getItem("senda_interest") || "[]");
    interests.push({
      name,
      role,
      message: fd.get("message"),
      at: new Date().toISOString(),
    });
    localStorage.setItem("senda_interest", JSON.stringify(interests));
    feedback.textContent = `Obrigado, ${name}. Seu interesse foi registrado neste dispositivo. Em breve a Senda terá um canal oficial para contato.`;
    feedback.classList.remove("hidden");
    e.target.reset();
  });
}

document.addEventListener("DOMContentLoaded", init);
