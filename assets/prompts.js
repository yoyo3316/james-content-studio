/* AI 提示詞庫 — 給外部 AI（ChatGPT / Claude / Gemini 等）使用 */
(function (global) {
  const LAYOUT_RULES = `
【排版與視覺規範｜務必遵守】
1. IG 輪播固定 1080×1350（4:5 直式），一則 5–7 頁。
2. 每頁只講 1 個重點；標題 ≤ 18 字；內文 ≤ 60 字；行距寬鬆。
3. 頁面結構：上 15% 標題區｜中 60% 重點｜下 25% 數據／來源或頁碼。
4. 字級建議：標題 56–72pt、內文 28–36pt、註解 18–22pt；高對比（深底淺字或淺底深字）。
5. 配色建議（專業金融風）：深藍 #0B1220、卡其金 #C9A227、白 #F5F7FB、灰字 #8B9BB4；避免紅綠大面積「漲跌喊單感」。
6. 數字要大、結論要短；避免整段報告貼上圖。
7. 最後一頁固定：風險一句 + 免責一句 + CTA（工具連結／開戶諮詢）。
8. Threads 文：前 2 行必須是鉤子；中間用「・」條列 3–5 點；風險獨立一段；結尾免責 + CTA。
9. 禁止：保證報酬、必漲、明牌、跟單、未審核手續費折扣話術。
10. 品牌浮水印：角落小字「James｜TraderWin」即可，不要整版塞券商全名。
`.trim();

  function brandBlock(b) {
    return `
【角色設定】
你是財經內容編輯，協助個人品牌「${b.displayName || "James｜TraderWin"}」產出可發佈內容。
帳號 @${(b.handle || "traderwin").replace(/^@/, "")}
定位：${b.niche || "主動ETF追蹤 × 台股／複委託研究"}
工具站：${b.etfUrl || "https://traderwin1.netlify.app/"}
CTA：${b.cta || ""}
短免責：${b.disclaimerShort || "內容僅供研究分享，非投資建議，投資有風險。"}
`.trim();
  }

  function promptReportToPack(b) {
    return `${brandBlock(b)}

${LAYOUT_RULES}

【任務】
我會貼上一份研究報告（可能很長）。請你整理成「可直接發佈的內容包」，不要虛構報告中沒有的數字。

【輸出格式｜用繁體中文｜嚴格依序】

### A. 結構化重點 JSON
\`\`\`json
{
  "title": "",
  "ticker": "",
  "market": "tw|us",
  "one_liner": "一句話結論（≤28字）",
  "key_points": ["3~5點"],
  "catalysts": ["1~3點"],
  "risks": ["2~3點"],
  "numbers_to_verify": ["需人工核對的數字"],
  "stance": "中性觀察／偏多觀察／偏保守（勿保證）"
}
\`\`\`

### B. Threads 發佈文（可直接貼）
- 鉤子 2 行
- 重點 3–5 條
- 風險 2 條
- 觀點 1 句
- 免責 + CTA（可提到主動ETF雷達工具）

### C. IG 輪播腳本（6 頁）
每頁輸出：
- 頁碼
- 標題
- 內文（短）
- 建議圖上大數字／標籤
- 設計備註（對齊排版規範）

### D. 生圖提示詞（給 AI 繪圖／Canva）
為每頁給 1 段英文 image prompt（金融簡報風、乾淨、無亂碼文字），並註明「文字由後製排版，圖中不要生成長中文」。

### E. 開戶導流句（溫和、專業，不硬銷）
1 句放 Threads、1 句放 IG 末頁。

---
以下是報告原文：
`;
  }

  function promptEtfDaily(b) {
    return `${brandBlock(b)}

${LAYOUT_RULES}

【任務｜每日主動 ETF 雷達】
我會提供今日／本週從「主動式ETF雷達」看到的異動（新增、剔除、排行、最大漲幅等）。
資料來源工具：${b.etfUrl || "https://traderwin1.netlify.app/"}

請產出：

### 1) Threads 短文（120–400 字）
結構：
- 今日最值得看的 1 個現象（鉤子）
- 3 點客觀整理（ETF 代號、方向、意涵）
- 1 點風險或「這不代表未來報酬」
- CTA：完整明細見工具連結
- 短免責

### 2) IG 單圖或 4 頁小輪播腳本
頁面：封面現象 → 明細表重點 → 怎麼解讀 → CTA+免責

### 3) 標題備案 5 則（適合 Threads 首行）

規則：
- 只描述「發生什麼」，不要變成明牌
- 可引導「想自己追蹤每日異動 → 工具／開戶後更好執行配置」
- 若我沒給完整數據，請列出「缺少欄位」而不是瞎掰

---
今日雷達資料：
`;
  }

  function promptCarouselOnly(b) {
    return `${brandBlock(b)}

${LAYOUT_RULES}

【任務】把下面重點改成 IG 輪播 6 頁完整腳本 + 每頁英文生圖 prompt。
風格：機構研究簡報 × 社群好讀，不要網紅嘶吼感。

重點內容：
`;
  }

  function promptThreadsPolish(b) {
    return `${brandBlock(b)}

【任務】潤飾成更像真人 Threads 語氣：專業、好讀、有觀點但不保證報酬。
保留所有數字；可調整順序與鉤子。
輸出：只要定稿全文，不要前言。

原文：
`;
  }

  function promptImageSystem() {
    return `You are a financial slide designer. Create clean, premium fintech presentation slides.
Style: dark navy background, gold accent, lots of whitespace, large numbers, minimal icons.
No long Chinese text baked into the image (labels only if short English). 
Aspect ratio 4:5. No clickbait, no rocket emojis, no "to the moon".`;
  }

  global.JCPrompts = {
    LAYOUT_RULES,
    brandBlock,
    promptReportToPack,
    promptEtfDaily,
    promptCarouselOnly,
    promptThreadsPolish,
    promptImageSystem
  };
})(window);
