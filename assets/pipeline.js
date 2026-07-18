/* 報告 → 重點 → 貼文（瀏覽器端） */
(function (global) {
  const FORBIDDEN = [
    "保證獲利", "保證報酬", "穩賺", "必漲", "絕對會漲", "跟單", "內線", "明牌",
    "包賺", "零風險", "穩賺不賠", "保證賺", "百分百"
  ];
  const CAUTION = [
    "大力買進", "全力買", "翻倍", "飆股", "手續費", "折扣", "優惠", "免手續費", "最低價"
  ];

  function cleanLine(s) {
    return String(s || "")
      .replace(/^#{1,6}\s*/, "")
      .replace(/^[\-\*\u30fb\u2022]\s*/, "")
      .replace(/^\d+[\.\)]\s*/, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function extractTitle(text, fallback) {
    for (const raw of text.split(/\r?\n/)) {
      const line = cleanLine(raw);
      if (line.length >= 6 && line.length <= 80) return line;
    }
    return fallback || "研究摘要";
  }

  const NOT_TICKERS = new Set([
    "PDF", "HTTP", "HTTPS", "CEO", "CFO", "USD", "TWD", "ETF", "AI", "HPC",
    "GPU", "CPU", "API", "YOY", "QOQ", "EPS", "ROE", "ROI", "GDP", "FED",
    "IPO", "ADR", "OTC", "TWSE", "NYSE", "AND", "THE", "FOR", "WITH"
  ]);

  function extractTickers(text) {
    const re = /(?:^|[\s(（])((?:\d{4}|[A-Z]{1,5}))(?=$|[\s)），,])/g;
    const found = [];
    const slice = text.slice(0, 3500);
    let m;
    while ((m = re.exec(slice))) {
      const t = m[1].toUpperCase();
      if (!found.includes(t) && !NOT_TICKERS.has(t)) found.push(t);
    }
    return found.slice(0, 8);
  }

  function detectMarket(text, tickers) {
    if (tickers.some((t) => /^\d{4}$/.test(t)) || /台股|TWSE|上市|上櫃/.test(text)) return "tw";
    if (/美股|複委託|ADR|NASDAQ|NYSE/.test(text) || tickers.some((t) => /^[A-Z]{1,5}$/.test(t))) return "us";
    return "tw";
  }

  function parseSections(text) {
    const keyMap = [
      ["summary", /^(摘要|結論|總結|重點|overview|summary|thesis)/i],
      ["catalysts", /^(催化劑|catalyst|驅動|亮點|成長動能)/i],
      ["financials", /^(財務|營收|估值|financial)/i],
      ["risks", /^(風險|risk)/i],
      ["action", /^(觀點|策略|操作|建議|outlook)/i]
    ];
    const sections = { _body: [] };
    let current = "_body";
    for (const raw of text.split(/\r?\n/)) {
      const plain = cleanLine(raw);
      if (!plain) continue;
      let matched = null;
      for (const [key, re] of keyMap) {
        if (re.test(plain) && plain.length <= 24) {
          matched = key;
          break;
        }
      }
      if (matched) {
        current = matched;
        sections[current] = sections[current] || [];
        continue;
      }
      sections[current] = sections[current] || [];
      sections[current].push(plain);
    }
    const out = {};
    Object.keys(sections).forEach((k) => {
      if (sections[k].length) out[k] = sections[k].join("\n");
    });
    return out;
  }

  function bulletize(block, maxItems = 4) {
    if (!block) return [];
    const headingOnly = /^(摘要|結論|總結|重點|催化劑|風險|財務|觀點|策略|操作)(?:[／/].*)?$/;
    const parts = String(block).split(/(?<=[。！？；\n])|(?<=\.\s)/);
    const items = [];
    for (let part of parts) {
      part = cleanLine(part).replace(/^[・•\-:\s]+/, "");
      if (!part || headingOnly.test(part)) continue;
      if (part.length >= 12 && part.length <= 140 && !items.includes(part)) items.push(part);
      if (items.length >= maxItems) break;
    }
    if (!items.length) {
      const fallback = cleanLine(String(block)).slice(0, 100);
      if (fallback) items.push(fallback);
    }
    return items.slice(0, maxItems);
  }

  function structureReport(text, sourceName) {
    const title = extractTitle(text, sourceName);
    const tickers = extractTickers(text);
    const market = detectMarket(text, tickers);
    const sections = parseSections(text);
    const summaryBits = bulletize(sections.summary || sections._body, 3);
    const catalysts = bulletize(sections.catalysts, 4);
    const risks = bulletize(sections.risks, 4);
    const financials = bulletize(sections.financials, 3);
    const actions = bulletize(sections.action, 3);
    const riskList = risks.length
      ? risks
      : ["產業與個股可能受總經、匯率與競爭格局影響，波動風險需自行評估。"];

    const keyPoints = [];
    for (const bucket of [summaryBits, catalysts, financials]) {
      for (const b of bucket) {
        if (!keyPoints.includes(b) && !riskList.includes(b)) keyPoints.push(b);
        if (keyPoints.length >= 5) break;
      }
      if (keyPoints.length >= 5) break;
    }

    return {
      sourceFile: sourceName || "report",
      title,
      tickers,
      primaryTicker: tickers[0] || "",
      market,
      generatedAt: new Date().toISOString(),
      summary: (summaryBits.join(" ") || title).slice(0, 400),
      keyPoints: keyPoints.slice(0, 5),
      catalysts,
      risks: riskList,
      financials,
      stance: actions[0] || "中性觀察，待更多數據驗證。",
      rawCharCount: text.length
    };
  }

  function buildUtm(brand, platform, ticker) {
    const d = new Date();
    const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    const account = (brand.handle || "james").replace(/^@/, "");
    return `utm_source=${platform}&utm_medium=organic&utm_campaign=${account}_${ymd}&utm_content=${ticker || "general"}`;
  }

  function renderThreads(summary, brand) {
    const marketLabel = summary.market === "us" ? "複委託／美股" : "台股";
    const tags = summary.market === "us"
      ? "#複委託 #美股 #投資研究"
      : "#台股 #個股研究 #投資研究";
    const ticker = summary.primaryTicker;
    const points = (summary.keyPoints || []).slice(0, 4).map((p) => `・${p}`).join("\n") || "・（請補上重點）";
    const risks = (summary.risks || []).slice(0, 2).map((r) => `・${r}`).join("\n");
    const disclaimer = brand.disclaimerShort || "以上內容僅供研究分享，非投資建議，投資有風險，請自行判斷。";
    const cta = brand.cta || "主動ETF明細 → 主頁工具｜研究重點可私訊";
    const utm = buildUtm(brand, "threads", ticker);
    const tool = brand.etfUrl || brand.bioLink || "";

    return `${summary.title}

${ticker ? `「${ticker}」` : ""}${marketLabel}重點：

${points}

【風險】
${risks}

觀點：${summary.stance}
${tool ? `\n工具／明細：${tool}` : ""}

${disclaimer}

${cta}
#建議UTM ${utm}
${tags}
`.trim() + "\n";
  }

  function renderIgCarousel(summary, brand) {
    const ticker = summary.primaryTicker || "標的";
    const points = summary.keyPoints || [];
    const risks = summary.risks || [];
    const slides = [];
    slides.push(`## Slide 1 — 封面\n標題：${summary.title}\n副標：${ticker} 重點速覽｜${brand.displayName || "James"}\n角標：非投資建議\n`);
    points.slice(0, 4).forEach((p, i) => slides.push(`## Slide ${i + 2} — 重點 ${i + 1}\n${p}\n`));
    slides.push(`## Slide ${slides.length + 1} — 風險\n${risks.slice(0, 3).map((r) => `- ${r}`).join("\n")}\n`);
    slides.push(`## Slide ${slides.length + 1} — CTA\n${brand.cta || "完整摘要 → 主頁連結"}\n${brand.disclaimerShort || ""}\n`);
    slides.push(`## Caption\n${summary.title}\n\n${(summary.summary || "").slice(0, 180)}\n\n${brand.disclaimerShort || ""}\n${brand.cta || ""}\n`);
    return slides.join("\n");
  }

  function renderLanding(summary, brand) {
    const points = summary.keyPoints || [];
    return `# ${summary.title}

- 標的：${summary.primaryTicker || "—"}
- 市場：${summary.market}
- 更新：${summary.generatedAt}

## 三點重點
${points.slice(0, 3).map((p, i) => `${i + 1}. ${p}`).join("\n")}

## 風險
${(summary.risks || []).slice(0, 2).map((r) => `- ${r}`).join("\n")}

## CTA
${brand.cta || ""}
${brand.bioLink ? `連結：${brand.bioLink}` : ""}

## 免責
${brand.disclaimerFull || brand.disclaimerShort || ""}
`;
  }

  function checkCompliance(text) {
    const forbidden = FORBIDDEN.filter((p) => text.includes(p));
    const caution = CAUTION.filter((p) => text.includes(p));
    const hasDisclaimer = /非投資建議|僅供研究|僅供參考|投資有風險|請自行判斷/.test(text);
    const hasRisk = /風險|不確定|波動|可能下跌|注意/.test(text);
    let status = "PASS";
    if (forbidden.length || !hasDisclaimer) status = "FAIL";
    else if (caution.length || !hasRisk) status = "WARN";
    return { status, forbidden, caution, hasDisclaimer, hasRisk };
  }

  function buildWeekPlan(brand, days = 7) {
    const rows = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    // 平日：ETF 日更 + 研究長文交錯；週末：週回顧
    const researchDays = { 2: "研究圖文（個股／複委託）", 4: "研究圖文（產業／比較）", 6: "本週觀察摘要" };
    for (let d = 0; d < days; d++) {
      const day = new Date(start);
      day.setDate(start.getDate() + d);
      const wd = day.getDay();
      const date = day.toISOString().slice(0, 10);
      const weekLabel = "日一二三四五六"[wd];
      if (wd === 0) {
        rows.push({
          date,
          weekLabel,
          time: "—",
          platform: "—",
          pillar: "休息／回顧數據",
          notes: "看哪類貼文帶來開戶詢問"
        });
        continue;
      }
      // 每日 ETF
      rows.push({
        date,
        weekLabel,
        time: "08:30",
        platform: "Threads",
        pillar: "主動ETF雷達日更",
        notes: `資料：${brand.etfUrl || brand.bioLink || "traderwin1.netlify.app"}`
      });
      if (researchDays[wd]) {
        rows.push({
          date,
          weekLabel,
          time: "20:00",
          platform: "Threads + IG",
          pillar: researchDays[wd],
          notes: "外部AI圖文 → 本站合規後發"
        });
      }
      if (wd === 3) {
        rows.push({
          date,
          weekLabel,
          time: "12:15",
          platform: "IG",
          pillar: "教學：如何看ETF異動／開戶前準備",
          notes: "導流工具站 + 諮詢"
        });
      }
    }
    return rows;
  }

  async function readFileAsText(file) {
    const name = file.name || "report";
    const lower = name.toLowerCase();
    if (lower.endsWith(".pdf")) {
      if (!global.pdfjsLib) throw new Error("PDF 引擎尚未載入，請稍後再試或改貼文字");
      const buf = await file.arrayBuffer();
      const pdf = await global.pdfjsLib.getDocument({ data: buf }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((it) => it.str).join(" ") + "\n";
      }
      return { name, text };
    }
    const text = await file.text();
    return { name, text };
  }

  global.JCPipeline = {
    structureReport,
    renderThreads,
    renderIgCarousel,
    renderLanding,
    checkCompliance,
    buildWeekPlan,
    readFileAsText,
    buildUtm
  };
})(window);
