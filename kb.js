/**
 * Base de conhecimento da Senda (educativa).
 * Fontes públicas de referência: SBP, SBEM, MSD Manual, Anvisa (uso geral).
 * Não é bula, diagnóstico nem indicação de dose/ciclo.
 */
window.SENDA_KB = [
  {
    id: "nutricao-geral",
    category: "nutricao",
    tag: "Nutrição",
    title: "Nutrição — visão geral",
    summary:
      "Nutrição é o conjunto de escolhas alimentares que fornecem energia e nutrientes para o corpo funcionar, treinar e se recuperar. O ponto de partida costuma ser: calorias adequadas ao objetivo, proteína, fibras, hidratação e regularidade.",
    keywords: [
      "nutricao",
      "nutrição",
      "alimentar",
      "alimentacao",
      "alimentação",
      "dieta",
      "comida",
      "macros",
      "macro",
    ],
    faqs: [
      {
        q: "Por onde começar?",
        a: "Defina o objetivo (emagrecer, manter ou ganhar), estime o gasto diário e monte refeições com proteína + vegetais + carboidrato + gordura boa.",
      },
      {
        q: "Preciso cortar um grupo alimentar?",
        a: "Na maioria dos casos, não. Restrições extremas dificultam adesão. Ajuste porções e qualidade antes de eliminar grupos inteiros.",
      },
      {
        q: "Quando procurar profissional?",
        a: "Sempre que houver doença, uso de medicamento, adolescência, gestação ou meta agressiva de peso. Nutricionista e médico orientam com segurança.",
      },
    ],
    related: ["deficit-calorico", "proteina", "hidratacao", "suplementos-geral"],
  },
  {
    id: "deficit-calorico",
    category: "nutricao",
    tag: "Nutrição",
    title: "Déficit calórico",
    summary:
      "Déficit calórico é consumir menos energia do que o corpo gasta no dia (TDEE). Um corte moderado (cerca de 15–20% abaixo do TDEE, ou ~300–500 kcal) tende a ser mais sustentável do que dietas muito restritivas.",
    keywords: [
      "deficit",
      "déficit",
      "emagrecer",
      "emagrecimento",
      "perda",
      "calorias",
      "cutting",
      "secar",
    ],
    faqs: [
      {
        q: "Como calcular na prática?",
        a: "Estime a TMB (ex.: Mifflin-St Jeor), multiplique pelo nível de atividade (TDEE) e reduza de forma moderada. A ferramenta da Senda faz essa estimativa.",
      },
      {
        q: "Posso comer abaixo da TMB?",
        a: "Cortes muito abaixo da TMB aumentam fadiga, perda muscular e efeito sanfona. Prefira déficit sobre o TDEE, com proteína e treino de força.",
      },
      {
        q: "Qual o papel da proteína?",
        a: "Ajuda a preservar massa magra e aumenta saciedade. Em déficit, muitas referências usam cerca de 1,6–2,2 g/kg para quem treina.",
      },
    ],
    related: ["superavit", "proteina", "metabolismo", "sono"],
  },
  {
    id: "superavit",
    category: "nutricao",
    tag: "Nutrição",
    title: "Superávit calórico",
    summary:
      "Superávit é ingerir um pouco acima do gasto diário para favorecer ganho de peso/massa, idealmente com treino de força. Excesso grande acelera ganho de gordura.",
    keywords: ["superavit", "superávit", "bulk", "volume", "ganhar", "massa", "hipertrofia"],
    faqs: [
      {
        q: "Quanto acima do TDEE?",
        a: "Começos comuns ficam em torno de +200 a +300 kcal/dia, ajustando conforme balança e medidas a cada 2–3 semanas.",
      },
      {
        q: "Só comer mais resolve?",
        a: "Não. Sem estímulo de treino e proteína adequada, o ganho tende a ser mais de gordura do que de músculo.",
      },
    ],
    related: ["proteina", "creatina", "deficit-calorico"],
  },
  {
    id: "proteina",
    category: "nutricao",
    tag: "Nutrição",
    title: "Proteína",
    summary:
      "Proteínas constroem e reparam tecidos. Para quem treina força, faixas citadas na literatura ficam em torno de 1,6–2,2 g por kg de peso corporal, distribuídas ao longo do dia.",
    keywords: ["proteina", "proteína", "ovos", "carne", "feijao", "feijão", "macros"],
    faqs: [
      {
        q: "Fontes alimentares?",
        a: "Ovos, carnes magras, peixe, laticínios, feijão, lentilha, tofu. Whey é opcional se a comida não fechar a meta.",
      },
      {
        q: "Preciso de shake?",
        a: "Só se facilitar a rotina. O total diário importa mais do que o horário exato do shake.",
      },
    ],
    related: ["whey", "deficit-calorico", "superavit"],
  },
  {
    id: "metabolismo",
    category: "estudos",
    tag: "Estudos",
    title: "Metabolismo basal (TMB) e TDEE",
    summary:
      "TMB é a energia gasta em repouso absoluto. TDEE é a TMB multiplicada pelo fator de atividade (do sedentário ao atleta). O déficit ou superávit se aplica sobre o TDEE, não sobre a TMB isolada.",
    keywords: ["metabolismo", "tmb", "tdee", "basal", "gasto", "calorico", "calórico", "mifflin"],
    faqs: [
      {
        q: "Qual fórmula a Senda usa?",
        a: "Mifflin-St Jeor, bastante usada como estimativa. É aproximação — não substitui calorimetria nem avaliação clínica.",
      },
      {
        q: "O metabolismo 'trava'?",
        a: "Déficits longos e agressivos podem reduzir gasto e adesão. Pausas estratégicas e proteína/treino ajudam a preservar massa magra.",
      },
    ],
    related: ["deficit-calorico", "nutricao-geral"],
  },
  {
    id: "hidratacao",
    category: "saude",
    tag: "Saúde",
    title: "Hidratação",
    summary:
      "Água regula temperatura, transporte de nutrientes e performance. Uma referência prática é ~35 ml por kg/dia, ajustando com calor, suor e treino.",
    keywords: ["agua", "água", "hidratacao", "hidratação", "líquido", "liquido", "sede"],
    faqs: [
      {
        q: "Sinais de boa hidratação?",
        a: "Urina clara/amarela clara, menos sede excessiva e melhor disposição no treino.",
      },
      {
        q: "Refrigerante conta?",
        a: "Líquido sim, mas açúcar em excesso atrapalha metas. Priorize água; chás sem açúcar também ajudam.",
      },
    ],
    related: ["sono", "nutricao-geral"],
  },
  {
    id: "sono",
    category: "saude",
    tag: "Saúde",
    title: "Sono e recuperação",
    summary:
      "Sono curto aumenta fome, piora humor e atrapalha recuperação muscular. Meta útil para adultos: 7–9 horas com horário mais estável.",
    keywords: ["sono", "dormir", "insonia", "insônia", "recuperacao", "recuperação"],
    faqs: [
      {
        q: "Dicas práticas?",
        a: "Horário fixo, menos tela à noite, cafeína mais cedo e ambiente escuro/fresco.",
      },
    ],
    related: ["deficit-calorico", "hidratacao"],
  },
  {
    id: "exames",
    category: "saude",
    tag: "Saúde",
    title: "Exames e check-up",
    summary:
      "Exames não diagnosticam sozinhos no app: servem de apoio ao profissional. Rotinas comuns incluem hemograma, glicemia, lipídios, função tireoidiana e, quando indicado, hormônios.",
    keywords: ["exame", "exames", "sangue", "check", "checkup", "laboratorio", "laboratório"],
    faqs: [
      {
        q: "Quando procurar?",
        a: "Cansaço extremo, alteração forte de peso, queda de cabelo, sede excessiva, histórico familiar ou antes de suplementação intensa.",
      },
    ],
    related: ["anabolizantes", "suplementos-geral"],
  },
  {
    id: "suplementos-geral",
    category: "suplementos",
    tag: "Suplementos",
    title: "Suplementos — visão geral",
    summary:
      "Suplementos complementam a alimentação; não a substituem. Os mais estudados no esporte incluem creatina e proteína em pó. Uso deve considerar saúde, exames e orientação profissional — especialmente em adolescentes e quem tem doença renal/hepática.",
    keywords: [
      "suplemento",
      "suplementos",
      "suplementacao",
      "suplementação",
      "shake",
      "pó",
      "po",
    ],
    faqs: [
      {
        q: "Todo mundo precisa?",
        a: "Não. Muita gente fecha as metas só com comida. Suplemento ajuda quando há lacuna prática ou demanda alta de treino.",
      },
      {
        q: "Fazem mal aos rins?",
        a: "Em pessoas saudáveis, creatina e whey nas faixas habituais costumam ser considerados seguros pela literatura quando bem usados. Quem tem doença renal precisa de avaliação médica antes.",
      },
      {
        q: "Precaução geral",
        a: "Evite 'packs' milagrosos, produtos sem rótulo claro e doses absurdas. Prefira marcas com boa procedência e orientação de nutricionista/médico.",
      },
    ],
    related: ["creatina", "whey", "proteina", "anabolizantes"],
  },
  {
    id: "creatina",
    category: "suplementos",
    tag: "Suplementos",
    title: "Creatina",
    summary:
      "Creatina monoidratada é um dos suplementos mais estudados para força e esforços curtos de alta intensidade. No Brasil, referências regulatórias/educativas citam uso em torno de 3 g/dia; literatura internacional frequentemente menciona 3–5 g/dia. Horário importa menos que a consistência diária.",
    keywords: ["creatina", "creatine", "monoidratada", "força", "forca"],
    faqs: [
      {
        q: "Precisa de fase de carregamento?",
        a: "Não é obrigatória. Com 3–5 g/dia a saturação muscular ocorre em poucas semanas; carregamento só acelera esse processo e pode causar desconforto GI.",
      },
      {
        q: "Quem deve ter cuidado?",
        a: "Pessoas com doença renal, adolescentes sem indicação e quem usa vários suplementos juntos sem orientação.",
      },
    ],
    related: ["whey", "suplementos-geral", "proteina"],
  },
  {
    id: "whey",
    category: "suplementos",
    tag: "Suplementos",
    title: "Whey protein",
    summary:
      "Whey é proteína do soro do leite em pó: prática para completar a meta proteica. Não é anabolizante hormonal. O importante é o total de proteína do dia; o timing pré/pós-treino é secundário.",
    keywords: ["whey", "wheyprotein", "proteina em po", "proteína em pó", "shake"],
    faqs: [
      {
        q: "Substitui refeição?",
        a: "Não deve substituir refeições completas de forma crônica. É complemento.",
      },
      {
        q: "Intolerância à lactose?",
        a: "Isolate ou hidrolisado costumam ter menos lactose; avalie individualmente e, se preciso, use outras fontes (carne, ovo, vegetais + combinação).",
      },
    ],
    related: ["proteina", "creatina", "suplementos-geral"],
  },
  {
    id: "anabolizantes",
    category: "hormonios",
    tag: "Hormônios",
    title: "Anabolizantes (esteroides) — o que é",
    summary:
      "Esteroides anabolizantes androgênicos são hormônios sintéticos relacionados à testosterona. Têm uso médico restrito (ex.: algumas deficiências hormonais). O uso sem indicação — inclusive o popularmente chamado de \"bomba\" — é considerado de alto risco por sociedades médicas (como SBP e SBEM).",
    keywords: [
      "anabolizante",
      "anabolizantes",
      "esteroide",
      "esteroides",
      "bomba",
      "bombas",
      "aas",
      "eas",
      "roids",
    ],
    faqs: [
      {
        q: "O que a Senda recomenda?",
        a: "Não recomendamos uso recreativo ou estético. Caminhos seguros para massa: treino de força, proteína, creatina (se apropriado), sono e acompanhamento profissional.",
      },
      {
        q: "Quais precauções gerais?",
        a: "Riscos descritos na literatura e por sociedades médicas incluem coração, fígado, humor, fertilidade, acne, dependência e, em mulheres, virilização. Adolescentes correm risco ao crescimento ósseo.",
      },
      {
        q: "A Senda passa ciclo ou dose?",
        a: "Não. Este app é educativo e não orienta ciclo, dose, compra ou protocolo de anabolizantes.",
      },
    ],
    related: ["testosterona", "durateston", "dhea", "riscos-anabolizantes", "creatina"],
  },
  {
    id: "riscos-anabolizantes",
    category: "hormonios",
    tag: "Hormônios",
    title: "Anabolizantes — precauções e riscos",
    summary:
      "Efeitos adversos possíveis incluem hipertensão, alteração de colesterol, risco cardiovascular, hepatotoxicidade, alterações de humor (irritabilidade, depressão), infertilidade, ginecomastia em homens e virilização em mulheres. Uso injetável irregular ainda eleva risco de infecções se houver compartilhamento de agulhas.",
    keywords: [
      "risco",
      "riscos",
      "efeito",
      "efeitos",
      "colateral",
      "perigo",
      "precaução",
      "precaucao",
      "cuidado",
    ],
    faqs: [
      {
        q: "Existe dose segura para estética?",
        a: "Sociedades como a SBEM enfatizam que uso off-label para estética/performance não tem garantia de segurança — mesmo com 'supervisão' informal.",
      },
      {
        q: "Sinais para procurar ajuda?",
        a: "Dor no peito, falta de ar, inchaço intenso, queda brusca de humor, infertilidade, acne severa ou qualquer sintoma novo grave: procure atendimento médico.",
      },
    ],
    related: ["anabolizantes", "exames", "testosterona"],
  },
  {
    id: "testosterona",
    category: "hormonios",
    tag: "Hormônios",
    title: "Testosterona",
    summary:
      "Hormônio androgênico ligado a massa muscular, libido, humor e características sexuais. Níveis baixos em homens podem ter causa clínica (hipogonadismo) e exigem diagnóstico com exames e endocrinologista — não automedicação.",
    keywords: ["testosterona", "testo", "hormonio", "hormônio", "hipogonadismo", "trh"],
    faqs: [
      {
        q: "Baixa testosterona = preciso de injeção?",
        a: "Só após avaliação médica. Sintomas isolados não bastam; exames e investigação da causa vêm primeiro.",
      },
      {
        q: "Treino e sono ajudam?",
        a: "Sono, composição corporal e treino de força apoiam saúde hormonal de forma geral, mas não substituem tratamento quando há doença.",
      },
    ],
    related: ["durateston", "anabolizantes", "dhea", "exames"],
  },
  {
    id: "durateston",
    category: "hormonios",
    tag: "Hormônios",
    title: "Durateston (mistura de ésteres de testosterona)",
    summary:
      "Durateston é medicamento com combinação de ésteres de testosterona, indicado em bula para reposição em homens com deficiência confirmada (hipogonadismo), sob prescrição. O uso recreativo para hipertrofia está associado a riscos cardiovasculares, hepáticos, hormonais e psicológicos graves.",
    keywords: [
      "durateston",
      "duratestom",
      "sustanon",
      "enanthate",
      "cipionato",
      "deca",
      "decanoato",
    ],
    faqs: [
      {
        q: "Para que serve no contexto médico?",
        a: "Reposição quando há falta comprovada de testosterona, com acompanhamento e exames. Não é 'atalho' de academia.",
      },
      {
        q: "A Senda orienta como usar?",
        a: "Não. Sem dose, sem ciclo, sem indicação de compra. Em dúvida clínica, fale com endocrinologista.",
      },
      {
        q: "Riscos no uso indevido?",
        a: "Relatos e alertas médicos incluem infarto, AVC, arritmia, infertilidade, acne, retenção hídrica, alterações de humor e produtos falsificados no mercado irregular.",
      },
    ],
    related: ["testosterona", "anabolizantes", "riscos-anabolizantes", "dhea"],
  },
  {
    id: "dhea",
    category: "hormonios",
    tag: "Hormônios",
    title: "DHEA (desidroepiandrosterona)",
    summary:
      "DHEA é hormônio precursor produzido nas adrenais, convertido em androgênios/estrogênios. Como suplemento, muitos benefícios alegados (anti-idade, massa, energia) não têm comprovação sólida para uso livre. Manuais como o MSD alertam para efeitos androgênicos e interações.",
    keywords: ["dhea", "deidroepiandrosterona", "desidroepiandrosterona", "prasterona"],
    faqs: [
      {
        q: "Emagrece ou põe massa sozinha?",
        a: "Não há evidência forte de que DHEA livre seja solução para hipertrofia ou emagrecimento na população geral.",
      },
      {
        q: "Riscos possíveis?",
        a: "Acne, alterações de humor, efeitos androgênicos, possível impacto em condições hormônio-sensíveis. Não usar em crianças; atletas podem ter restrição por doping.",
      },
      {
        q: "Recomendação da Senda",
        a: "Não iniciar por conta própria. Se houver interesse clínico, discuta com médico — nunca como substituto de treino e alimentação.",
      },
    ],
    related: ["testosterona", "anabolizantes", "suplementos-geral"],
  },
  {
    id: "enfermagem-sinais",
    category: "estudos",
    tag: "Estudos",
    title: "Sinais vitais — resumo de estudos",
    summary:
      "Temperatura, pulso, respiração e pressão arterial são a base da avaliação clínica inicial. Conhecer intervalos de referência ajuda estudantes e profissionais a comunicar alterações com clareza.",
    keywords: ["enfermagem", "sinais", "vitais", "pressao", "pressão", "pulso", "estudo", "estudos"],
    faqs: [
      {
        q: "Para que serve este tópico na Senda?",
        a: "Apoiar estudo e ensino (ex.: quem veio da enfermagem e quer compartilhar resumos), sem substituir aula ou protocolo institucional.",
      },
    ],
    related: ["exames", "nutricao-geral"],
  },
  {
    id: "gengibre",
    category: "natural",
    tag: "Natural",
    title: "Gengibre (uso tradicional)",
    summary:
      "Usado tradicionalmente para náusea leve e conforto digestivo. Infusão: fatias em água quente 8–10 min. Não substitui medicamento prescrito; cuidado com interações e excesso.",
    keywords: ["gengibre", "cha", "chá", "digestao", "digestão", "nausea", "náusea"],
    faqs: [
      {
        q: "É remédio oficial?",
        a: "É prática tradicional/popular. Sintomas persistentes pedem avaliação profissional.",
      },
    ],
    related: ["camomila", "aveia"],
  },
  {
    id: "camomila",
    category: "natural",
    tag: "Natural",
    title: "Camomila",
    summary:
      "Chá tradicionalmente associado a relaxamento leve. Pode integrar rotina de sono; evite se houver alergia conhecida a plantas da família.",
    keywords: ["camomila", "relaxar", "chá", "cha", "calmante"],
    faqs: [{ q: "Substitui ansiolítico?", a: "Não. É hábito de conforto, não tratamento de transtorno de ansiedade." }],
    related: ["sono", "gengibre"],
  },
  {
    id: "aveia",
    category: "natural",
    tag: "Natural",
    title: "Aveia e saciedade",
    summary:
      "Fonte de fibras solúveis; ajuda na saciedade e no controle glicêmico quando faz parte de refeição equilibrada (ex.: com fruta e proteína).",
    keywords: ["aveia", "fibra", "fibras", "saciedade", "cafe", "café", "cafe da manha"],
    faqs: [
      {
        q: "Ideia prática?",
        a: "Aveia + fruta + iogurte ou ovo. Simples, barata e alinhada a metas de déficit com saciedade.",
      },
    ],
    related: ["deficit-calorico", "nutricao-geral"],
  },
];
