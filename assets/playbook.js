/* 市場成功帳號特質 → James／TraderWin 可執行手冊 */
(function (global) {
  const CASES = [
    {
      name: "The Financial Diet（國際）",
      type: "理財媒體型個人品牌",
      traits: [
        "定位一句話就懂：理財 × 生活文化，不是報明牌",
        "視覺系統高度一致（讀者 0.5 秒認出是你）",
        "教育為主、銷售為輔；先給框架再給產品"
      ],
      steal: "用固定版型＋固定欄目，讓人「為了某類內容」追蹤你"
    },
    {
      name: "Clever Girl Finance（國際）",
      type: "社群教育型",
      traits: [
        "內容支柱清楚（存錢／投資／心態），不東一槍西一槍",
        "社群語氣：像教練／學姊，不像法人新聞稿",
        "重複回答高頻問題，做成可收藏圖卡"
      ],
      steal: "把開戶前 FAQ、複委託疑問做成系列，比單篇研報更易追蹤"
    },
    {
      name: "台灣知識型 IG（經濟／理財懶人包類型）",
      type: "圖卡翻譯者",
      traits: [
        "把難懂資訊「翻譯」成 5–7 頁輪播",
        "封面標題＝搜尋／滑過時的鉤子",
        "收藏率優先於讚數（演算法也吃收藏）"
      ],
      steal: "研究報告不要貼牆文；改成「3 重點 + 1 風險 + 1 CTA」輪播"
    },
    {
      name: "Threads 成長型創作者（台灣流量紅利）",
      type: "短文討論型",
      traits: [
        "前兩行鉤子決定死活；短、快、可回覆",
        "固定每週節奏 > 偶發爆文",
        "發文後互動（回覆留言、回其他串）比狂發更重要",
        "IG 做信任資產、Threads 做觸及與對話"
      ],
      steal: "ETF 日更用 Threads 搶討論；研究圖卡放 IG 養專業感"
    },
    {
      name: "金融顧問內容行銷常見做法",
      type: "獲客漏斗型",
      traits: [
        "社群曝光 + 免費工具／名單磁鐵 + 私域再談服務",
        "不在公開貼文硬推開戶，而在「有需求時」被找到",
        "長期信任 > 單次轉換"
      ],
      steal: "你的主動ETF雷達＝現成 lead magnet（名單磁鐵）"
    }
  ];

  /** 成功帳號共通 8 特質 */
  const TRAITS = [
    { title: "窄定位", desc: "一提就知道你是誰：主動ETF追蹤 × 研究摘要，而不是「什麼財經都講」。" },
    { title: "可預期欄目", desc: "粉絲知道「每天／每週會看到什麼」，養成打開習慣。" },
    { title: "鉤子優先", desc: "前 1–2 秒或前 2 行決定停留；結論前置，細節後放。" },
    { title: "Edu-tainment", desc: "有料但好讀：教育 + 一點觀點／對比／提問，不是論文。" },
    { title: "視覺系統", desc: "同一套配色、字級、封面結構；專業感來自一致性。" },
    { title: "工具／磁鐵", desc: "有「免費可反覆用的東西」才留得住（你的雷達站）。" },
    { title: "發文後經營", desc: "回覆留言、參與同溫層討論；成長多半發生在發佈之後。" },
    { title: "軟轉換", desc: "先價值、後行動；開戶是結果不是每則文的唯一目的。" }
  ];

  /** 內容支柱比例（依成功帳號常見 3–5 支柱） */
  const PILLARS = [
    { id: "radar", name: "ETF 雷達日更", pct: 40, platform: "Threads 主、IG 輔", goal: "習慣＋工具點擊" },
    { id: "research", name: "研究圖文（報告）", pct: 25, platform: "IG 輪播 + Threads 長文", goal: "專業信任" },
    { id: "teach", name: "觀念／怎麼看數據", pct: 15, platform: "IG / Threads", goal: "收藏、存成系列" },
    { id: "talk", name: "觀點／提問／時事", pct: 12, platform: "Threads", goal: "互動與觸及" },
    { id: "convert", name: "開戶前準備／流程", pct: 8, platform: "IG 精選 + 限動", goal: "諮詢與開戶" }
  ];

  /** 鉤子公式庫 */
  const HOOKS = [
    "今天主動ETF有一個調倉，比股價更值得看：",
    "別先問會不會漲，先問管理人在加什麼產業：",
    "把這份報告讀完只要 30 秒——3 點重點：",
    "複委託新手最常漏掉的不是標的，是這個流程：",
    "同一檔主動ETF，本週被納入次數突然變多？",
    "我只看三個數字，判斷這則異動重不重要："
  ];

  /** 發文後 5-3-1 互動（市場常用成長手法） */
  const ENGAGE_531 = {
    title: "發文後 15 分鐘：5-3-1",
    steps: [
      "回 5 則自己貼文下的留言（或相關串）",
      "認真回覆 3 則他人貼文（同溫層：台股／ETF／複委託）",
      "主動拋 1 個問題引導討論（不要只貼完就走）"
    ]
  };

  /** 一週作業系統 */
  function weekOS(brand) {
    const tool = brand.etfUrl || brand.bioLink || "https://traderwin1.netlify.app/";
    return [
      { day: "每日（交易日）", items: [`08:30 雷達站掃異動（${tool}）`, "Threads 短文 1 則", "發文後做 5-3-1 互動"] },
      { day: "週二／週四", items: ["研究報告 → AI 圖文", "IG 輪播 + Threads 重點", "精選限動歸檔「研究」"] },
      { day: "週三", items: ["教學卡：怎麼看ETF異動／開戶前檢查", "導流工具站"] },
      { day: "週六", items: ["本週 3 則精選回顧", "回覆未回留言", "看哪篇帶來私訊"] },
      { day: "週日", items: ["休息或只互動", "準備下週 2 檔研究標的"] }
    ];
  }

  global.JCPlaybook = {
    CASES,
    TRAITS,
    PILLARS,
    HOOKS,
    ENGAGE_531,
    weekOS
  };
})(window);
