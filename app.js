/**
 * Senda — protótipo educativo de orientação em nutrição e saúde.
 * Busca local por palavras-chave na base (kb.js). IA só se o usuário pedir.
 * Cálculos: Mifflin-St Jeor (TMB) + fator de atividade (TDEE).
 */

const KB = () => window.SENDA_KB || [];

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getTopicById(id) {
  return KB().find((t) => t.id === id);
}

/** Pontua tópicos pela combinação de palavras-chave na mensagem. */
function searchTopics(query, limit = 6) {
  const q = normalize(query);
  if (!q.trim()) return [];

  const words = q.split(/[^a-z0-9]+/).filter((w) => w.length > 2);

  const scored = KB().map((topic) => {
    const keys = (topic.keywords || []).map(normalize);
    const hay = normalize([topic.title, topic.summary, topic.tag, ...(topic.keywords || [])].join(" "));
    let score = 0;
    const hits = [];

    keys.forEach((k) => {
      if (!k) return;
      if (q.includes(k)) {
        score += 4 + Math.min(k.length, 12) * 0.15;
        hits.push(k);
      }
    });

    words.forEach((w) => {
      if (hay.includes(w)) score += 1;
      keys.forEach((k) => {
        if (k.includes(w) || w.includes(k)) score += 0.5;
      });
    });

    // Se falou de anabolizantes/bomba, reforça tópicos de hormônios relacionados
    const hormoneCue = ["bomba", "anabolizante", "esteroide", "testosterona", "durateston", "dhea"].some((c) =>
      q.includes(c)
    );
    if (hormoneCue && topic.category === "hormonios") score += 2;

    const nutritionCue = ["nutricao", "dieta", "calorias", "proteina", "emagrecer"].some((c) => q.includes(c));
    if (nutritionCue && topic.category === "nutricao") score += 1.5;

    return { topic, score, hits: [...new Set(hits)] };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function expandWithRelated(matches, max = 8) {
  const seen = new Set(matches.map((m) => m.topic.id));
  const out = [...matches];
  for (const m of matches) {
    (m.topic.related || []).forEach((id) => {
      if (seen.has(id) || out.length >= max) return;
      const t = getTopicById(id);
      if (t) {
        seen.add(id);
        out.push({ topic: t, score: 0, hits: ["relacionado"] });
      }
    });
  }
  return out;
}

function mifflinStJeor({ weight, height, age, sex }) {
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
        "Explore os conteúdos e use a busca por tópicos no chat.",
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
  if (exams.length === 0) {
    exams.push("Com os dados atuais, nenhum alerta forte. Mesmo assim, rotina anual de exames é recomendável.");
  }

  const matches = searchTopics(data.query || data.goal, 4).map((m) => m.topic);

  return {
    tmb,
    tdee,
    targetCalories,
    bmi,
    bmiLabel: imcLabel(bmi),
    goalTitle,
    steps,
    exams,
    matches: matches.length ? matches : KB().slice(0, 3),
  };
}

function renderResult(result) {
  const body = document.getElementById("result-body");
  const empty = document.getElementById("result-empty");
  empty.classList.add("hidden");
  body.classList.remove("hidden");

  body.innerHTML = `
    <h3>${escapeHtml(result.goalTitle)}</h3>
    <p>IMC estimado: <strong>${result.bmi.toFixed(1)}</strong> — ${escapeHtml(result.bmiLabel)}</p>
    <div class="metrics">
      <div class="metric"><span>TMB (repouso)</span><strong>${result.tmb} kcal</strong></div>
      <div class="metric"><span>TDEE (com atividade)</span><strong>${result.tdee} kcal</strong></div>
      <div class="metric"><span>Meta do objetivo</span><strong>${result.targetCalories} kcal</strong></div>
      <div class="metric"><span>Próximo passo</span><strong>Seguir plano</strong></div>
    </div>
    <h4 style="margin:0;font-family:var(--font-display)">Sua direção</h4>
    <ul class="direction-list">
      ${result.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
    </ul>
    <div class="alert-box">
      <strong>Exames e cuidado profissional</strong>
      ${result.exams.map((e) => `<div>• ${escapeHtml(e)}</div>`).join("")}
    </div>
    <div class="match-box">
      <h4>Tópicos da base relacionados</h4>
      <ul>
        ${result.matches.map((m) => `<li><strong>${escapeHtml(m.title)}:</strong> ${escapeHtml(m.summary)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderContents(filter = "todos") {
  const list = document.getElementById("content-list");
  const items = filter === "todos" ? KB() : KB().filter((c) => c.category === filter);
  list.innerHTML = items
    .map(
      (c) => `
    <article class="content-item" data-id="${escapeHtml(c.id)}" tabindex="0" role="button">
      <span class="tag">${escapeHtml(c.tag)}</span>
      <h3>${escapeHtml(c.title)}</h3>
      <p>${escapeHtml(c.summary)}</p>
    </article>`
    )
    .join("");

  list.querySelectorAll(".content-item").forEach((el) => {
    const open = () => openTopicInChat(el.dataset.id);
    el.addEventListener("click", open);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

function topicCardHtml(topic, hits = []) {
  const faqs = (topic.faqs || [])
    .map(
      (f) => `
      <details class="faq-item">
        <summary>${escapeHtml(f.q)}</summary>
        <p>${escapeHtml(f.a)}</p>
      </details>`
    )
    .join("");

  const hitLabel = hits.length
    ? `<span class="hit-label">Combinações: ${escapeHtml(hits.slice(0, 4).join(", "))}</span>`
    : "";

  return `
    <article class="topic-card" data-topic-id="${escapeHtml(topic.id)}">
      <span class="tag">${escapeHtml(topic.tag)}</span>
      ${hitLabel}
      <h4>${escapeHtml(topic.title)}</h4>
      <p>${escapeHtml(topic.summary)}</p>
      ${faqs ? `<div class="faq-list">${faqs}</div>` : ""}
    </article>`;
}

function appendBubble(text, who) {
  const log = document.getElementById("chat-log");
  const div = document.createElement("div");
  div.className = `bubble ${who}`;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function appendTopicsBlock(matches, intro) {
  const log = document.getElementById("chat-log");
  const wrap = document.createElement("div");
  wrap.className = "topics-block";
  wrap.innerHTML = `
    <p class="topics-intro">${escapeHtml(intro)}</p>
    <div class="topic-grid">
      ${matches.map((m) => topicCardHtml(m.topic, m.hits)).join("")}
    </div>
    <p class="topics-note">Conteúdo educativo da base Senda — não substitui consulta médica ou nutricional.</p>
  `;
  log.appendChild(wrap);
  log.scrollTop = log.scrollHeight;
}

function openTopicInChat(id) {
  const topic = getTopicById(id);
  if (!topic) return;
  document.getElementById("ferramenta")?.scrollIntoView({ behavior: "smooth", block: "start" });
  appendBubble(`Abrir tópico: ${topic.title}`, "user");
  appendTopicsBlock([{ topic, hits: [], score: 1 }], "Tópico da base de conhecimento:");
}

function handleKnowledgeSearch(text) {
  let matches = searchTopics(text, 5);
  if (!matches.length) {
    appendBubble(
      "Não achei combinação forte na base. Tente palavras como: nutrição, déficit, creatina, whey, bomba, testosterona, Durateston, DHEA, hidratação ou sono.",
      "bot"
    );
    return;
  }

  matches = expandWithRelated(matches, 7);
  const top = matches[0].topic;
  const keywordsHit = matches
    .flatMap((m) => m.hits)
    .filter(Boolean)
    .slice(0, 6);

  const intro =
    keywordsHit.length > 0
      ? `Encontrei tópicos relacionados a: ${[...new Set(keywordsHit)].join(", ")}. Abrindo fichas da base (FAQ + precauções):`
      : `Encontrei estes tópicos na base da Senda (começando por “${top.title}”):`;

  appendBubble(`Base local · ${matches.length} tópico(s) relacionados.`, "bot");
  appendTopicsBlock(matches, intro);
}

const CHAT_DAILY_LIMIT = 15;
const CHAT_LIMIT_KEY = "senda_chat_quota";

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

async function askAiOptional(text) {
  const quota = getChatQuota();
  if (quota.count >= CHAT_DAILY_LIMIT) {
    return `Limite do protótipo de IA: ${CHAT_DAILY_LIMIT}/dia. Use a busca por tópicos (sem IA), que é ilimitada neste beta.`;
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
      return data.reply;
    }
    if (data.fallback || data.code === "missing_api_key" || res.status === 503) {
      return "IA ainda não configurada na Vercel. A busca por tópicos da base local continua funcionando normalmente.";
    }
    return data.error || "Não foi possível usar a IA agora. Tente a busca por palavras-chave.";
  } catch {
    return "Sem conexão com a API. Use a busca local por tópicos.";
  }
}

function setChatBusy(busy) {
  const input = document.getElementById("chat-input");
  const btn = document.querySelector("#chat-form button[type='submit']");
  input.disabled = busy;
  if (btn) {
    btn.disabled = busy;
    btn.textContent = busy ? "Buscando…" : "Buscar tópicos";
  }
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

  document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;
    appendBubble(text, "user");
    input.value = "";
    setChatBusy(true);
    handleKnowledgeSearch(text);
    setChatBusy(false);
    input.focus();
  });

  document.getElementById("ai-ask-btn")?.addEventListener("click", async () => {
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) {
      appendBubble("Digite uma pergunta no campo e clique em “Perguntar à IA (opcional)”.", "bot");
      return;
    }
    appendBubble(text, "user");
    input.value = "";
    setChatBusy(true);
    // Sempre mostra base primeiro
    handleKnowledgeSearch(text);
    const aiReply = await askAiOptional(text);
    appendBubble(`IA (opcional): ${aiReply}`, "bot");
    setChatBusy(false);
    input.focus();
  });

  document.getElementById("interest-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get("name");
    const feedback = document.getElementById("interest-feedback");
    const interests = JSON.parse(localStorage.getItem("senda_interest") || "[]");
    interests.push({
      name,
      role: fd.get("role"),
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
