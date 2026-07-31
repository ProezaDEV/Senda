/**
 * API da Senda (Vercel Serverless)
 * Chama um modelo compatível com OpenAI (Groq, OpenAI, OpenRouter…).
 *
 * Variáveis no Vercel → Settings → Environment Variables:
 *   AI_API_KEY   (obrigatória) — chave da API
 *   AI_BASE_URL  (opcional)    — padrão: https://api.groq.com/openai/v1
 *   AI_MODEL     (opcional)    — padrão: llama-3.1-8b-instant
 */

const SYSTEM_PROMPT = `Você é a Senda, assistente educativa de nutrição, saúde, suplementos e bem-estar.
Regras obrigatórias:
- Responda em português do Brasil.
- Seja direta e específica: no máximo 4 frases curtas ou 5 bullets.
- Não invente diagnósticos nem doses de medicamentos ou anabolizantes.
- Sobre anabolizantes/esteroides: explique riscos gerais e diga para procurar médico; NÃO oriente ciclo, dose ou compra.
- Sobre suplementos (whey, creatina, vitamina D, ômega-3 etc.): explique uso comum de forma educativa e lembre de avaliar com profissional.
- Não substitui consulta médica ou nutricional. Se o assunto for clínico, oriente procurar profissional.
- Se a pergunta for fora de saúde/nutrição/estudos da área, recuse em uma frase e redirecione.`;

const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 30;
const buckets = new Map();

function clientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function allowRequest(ip) {
  const now = Date.now();
  let bucket = buckets.get(ip);
  if (!bucket || now - bucket.start > RATE_WINDOW_MS) {
    bucket = { start: now, count: 0 };
    buckets.set(ip, bucket);
  }
  bucket.count += 1;
  return bucket.count <= RATE_MAX;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 8000) {
        reject(new Error("payload_too_large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

function send(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end();
    return;
  }

  if (req.method !== "POST") {
    send(res, 405, { error: "Use POST." });
    return;
  }

  const ip = clientIp(req);
  if (!allowRequest(ip)) {
    send(res, 429, {
      error: "Limite do protótipo: muitas perguntas nesta hora. Tente mais tarde.",
    });
    return;
  }

  const apiKey = process.env.AI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    send(res, 503, {
      error: "IA não configurada",
      code: "missing_api_key",
      fallback: true,
    });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch (err) {
    send(res, 400, { error: "Pedido inválido." });
    return;
  }

  const message = String(body.message || "").trim().slice(0, 500);
  if (!message) {
    send(res, 400, { error: "Escreva uma pergunta." });
    return;
  }

  const baseUrl = (process.env.AI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, "");
  const model = process.env.AI_MODEL || "llama-3.1-8b-instant";

  try {
    const aiRes = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.35,
        max_tokens: 220,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await aiRes.json().catch(() => ({}));
    if (!aiRes.ok) {
      const detail = data?.error?.message || `HTTP ${aiRes.status}`;
      send(res, 502, { error: "Falha ao consultar a IA.", detail });
      return;
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      send(res, 502, { error: "A IA não retornou texto." });
      return;
    }

    send(res, 200, { reply, model, source: "ai" });
  } catch (err) {
    send(res, 502, { error: "Erro de rede ao chamar a IA." });
  }
};
