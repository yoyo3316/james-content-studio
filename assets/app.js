/* James Content Studio v3 — 市場成功帳號特質 × 作業系統 */
(function () {
  const STORAGE_KEY = "james_content_studio_v3";

  const NAME_OPTIONS = [
    {
      id: "traderwin",
      recommended: true,
      displayName: "James｜TraderWin",
      handle: "traderwin",
      why: "與你的工具站 traderwin1 同一品牌線，好記、像產品而非券商官方。",
      risk: "若被占用可改 traderwin.james / traderwin_tw"
    },
    {
      id: "james_research",
      recommended: false,
      displayName: "James｜研究筆記",
      handle: "james.research",
      why: "國際常見「人名 + research」結構，專業感強、中性。",
      risk: "偏長，需確認 IG 是否可用點號"
    },
    {
      id: "win_markets",
      recommended: false,
      displayName: "James｜Market Notes",
      handle: "win.markets",
      why: "短、英文友善、適合複委託／跨市場內容。",
      risk: "辨識度需靠頭像與簡介補足"
    },
    {
      id: "james_alpha_lab",
      recommended: false,
      displayName: "James｜Alpha Lab",
      handle: "james.alphalab",
      why: "研究實驗室感，適合報告＋ETF 數據雙輸出。",
      risk: "Alpha 用語略積極，文案需更克制"
    }
  ];

  const DEFAULT_BRAND = {
    englishName: "James",
    displayName: "James｜TraderWin",
    company: "凱基證券",
    role: "證券服務",
    handle: "traderwin",
    nameOptionId: "traderwin",
    niche: "主動ETF追蹤 × 台股／複委託研究",
    bio: "James｜TraderWin\n每天追主動ETF調倉 × 研究重點30秒讀完\n完整明細在主頁工具\n內容研究分享｜投資有風險",
    bioLink: "https://traderwin1.netlify.app/",
    etfUrl: "https://traderwin1.netlify.app/",
    cta: "完整明細 → 主頁工具｜想執行配置／開戶可私訊",
    disclaimerShort: "內容僅供研究分享，非投資建議，投資有風險，請自行判斷。",
    disclaimerFull:
      "本內容僅供研究與教育分享，不構成任何有價證券之要約、招攬、建議或推薦。投資人應依自身財務狀況與風險承受度獨立判斷。過往績效不代表未來表現。開戶與相關權益以合作證券商官方規定為準。"
  };

  const ACCOUNT_CHECKS = [
    { id: "phone_ready", title: "準備手機號碼與常用 Email", desc: "Meta 驗證用，建議與本人資料一致。" },
    { id: "meta_account", title: "註冊／登入 Meta（FB 或既有 IG）", desc: "Threads 會綁定 Instagram。" },
    { id: "ig_create", title: "建立 Instagram（個人品牌主帳）", desc: "顯示名稱與 @handle 用本站選定的方案，不要用 kgi 當帳號名。" },
    { id: "ig_profile", title: "頭像、Bio、主頁連結", desc: "主頁連結先放主動ETF雷達：traderwin1.netlify.app" },
    { id: "ig_pro", title: "切換專業帳號", desc: "方便看洞察、之後接 API。" },
    { id: "threads_create", title: "同一 IG 開啟 Threads", desc: "threads.net 或 App 登入即可。" },
    { id: "threads_bio", title: "Threads 名稱／簡介對齊 IG", desc: "同一個人品牌辨識。" },
    { id: "highlights", title: "IG 精選分類", desc: "建議：ETF雷達／研究摘要／開戶問答" },
    { id: "positioning_posts", title: "發 3 則定位文", desc: "用本步驟文案，建立「你是誰＋工具價值」。" },
    { id: "security", title: "兩步驟驗證", desc: "IG／Meta 都打開。" }
  ];

  const STEPS = [
    { id: "welcome", title: "開始使用", hint: "全貌" },
    { id: "market", title: "成功帳號特質", hint: "案例與可抄作業" },
    { id: "brand", title: "命名與品牌", hint: "選帳號方案" },
    { id: "account", title: "申請主帳號", hint: "IG + Threads" },
    { id: "system", title: "內容作業系統", hint: "支柱比例與節奏" },
    { id: "etf", title: "每日ETF內容", hint: "雷達→貼文" },
    { id: "prompts", title: "AI 提示詞", hint: "報告→圖文" },
    { id: "layout", title: "排版規範", hint: "圖卡與文案" },
    { id: "report", title: "產出貼文", hint: "報告／AI稿" },
    { id: "compliance", title: "合規檢查", hint: "發佈前" },
    { id: "calendar", title: "一週規劃", hint: "可執行日曆" },
    { id: "publish", title: "發佈＋互動", hint: "5-3-1" },
    { id: "done", title: "完成總覽", hint: "7天行動" }
  ];

  const SAMPLE_REPORT = `# 台積電（2330）法說會後觀察摘要

## 摘要／結論
台積電（2330）本季法說會後，市場聚焦先進製程產能利用率與 AI 相關需求能見度。
短期股價已反映部分樂觀預期，中期仍取決於客戶投片節奏與資本支出執行進度。

## 催化劑／成長動能
- AI 加速器與 HPC 需求延續，3nm／2nm 產能規劃受關注。
- 海外廠進度若符合預期，有助分散地緣風險溢價。

## 財務與估值觀察
- 營收成長動能仍與高階製程組合有關，需追蹤毛利率季對季變化。
- 估值已處相對不低區間，對利空消息敏感度上升。

## 風險
- 總經放緩或終端需求不如預期，可能影響投片能見度。
- 地緣政治與出口管制變化屬結構性不確定因素。

## 觀點／策略
中性偏多觀察：若回檔且基本面未轉弱，可分批研究配置；追高需留意波動風險。
內容僅供研究分享，非投資建議，投資有風險，請自行判斷。
`;

  const SAMPLE_ETF = `日期：本交易日
重點ETF：00981A 統一台股增長、00407A 凱基主動、00980A 野村智慧優選
異動：
- 00981A：新增持股 XXX（權重約 x%），剔除 YYY
- 排行：近一週報酬前三為 …
- 最大漲幅追蹤：某檔自納入後最大漲幅 …
解讀角度：主動ETF調倉透露管理人對產業／個股偏好變化，不代表短線方向。
`;

  function defaultState() {
    return {
      stepIndex: 0,
      brand: { ...DEFAULT_BRAND },
      accountChecks: Object.fromEntries(ACCOUNT_CHECKS.map((c) => [c.id, false])),
      etfNotes: "",
      etfPosts: { threads: "", ig: "" },
      reportText: "",
      reportName: "",
      summary: null,
      posts: { threads: "", ig: "", landing: "" },
      activePostTab: "threads",
      promptTab: "report",
      weekPlan: [],
      publishChecks: {
        reviewed: false,
        scheduled: false,
        posted: false,
        logged: false,
        etfLinked: false,
        engage531: false,
        hookOk: false
      },
      completedSteps: {}
    };
  }

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return {
        ...defaultState(),
        ...parsed,
        brand: { ...DEFAULT_BRAND, ...(parsed.brand || {}) },
        accountChecks: { ...defaultState().accountChecks, ...(parsed.accountChecks || {}) },
        publishChecks: { ...defaultState().publishChecks, ...(parsed.publishChecks || {}) },
        posts: { threads: "", ig: "", landing: "", ...(parsed.posts || {}) },
        etfPosts: { threads: "", ig: "", ...(parsed.etfPosts || {}) }
      };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const pill = document.getElementById("savePill");
    if (pill) pill.textContent = "已自動儲存 · " + new Date().toLocaleTimeString();
  }

  function toast(msg) {
    const el = document.getElementById("toast");
    el.hidden = false;
    el.textContent = msg;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.hidden = true;
    }, 2600);
  }

  function accountProgress() {
    const vals = Object.values(state.accountChecks);
    const done = vals.filter(Boolean).length;
    return { done, total: vals.length, ratio: done / vals.length };
  }

  function markStepComplete(id, yes = true) {
    state.completedSteps[id] = yes;
  }

  function evaluateCompletions() {
    markStepComplete("welcome", true);
    markStepComplete("market", true);
    markStepComplete("brand", !!(state.brand.displayName && state.brand.handle && !/kgi/i.test(state.brand.handle)));
    markStepComplete("account", accountProgress().ratio >= 0.8);
    markStepComplete("system", true);
    markStepComplete("etf", !!(state.brand.etfUrl && (state.etfNotes || state.etfPosts.threads)));
    markStepComplete("prompts", true);
    markStepComplete("layout", true);
    markStepComplete("report", !!(state.summary && state.posts.threads));
    if (state.posts.threads) {
      const c = JCPipeline.checkCompliance(state.posts.threads);
      markStepComplete("compliance", c.status !== "FAIL");
    } else markStepComplete("compliance", false);
    markStepComplete("calendar", (state.weekPlan || []).length > 0);
    const p = state.publishChecks;
    markStepComplete("publish", p.reviewed && p.posted && p.engage531);
    markStepComplete("done", accountProgress().ratio >= 0.5);
  }

  function progressPercent() {
    evaluateCompletions();
    const n = STEPS.filter((s) => state.completedSteps[s.id]).length;
    return Math.round((n / STEPS.length) * 100);
  }

  function applyNameOption(opt) {
    state.brand.nameOptionId = opt.id;
    state.brand.displayName = opt.displayName;
    state.brand.handle = opt.handle;
    state.brand.bio = `${opt.displayName}
每天追主動ETF調倉 × 研究重點30秒讀完
完整明細在主頁工具
內容研究分享｜投資有風險`;
    state.brand.niche = "主動ETF追蹤 × 台股／複委託研究";
    state.brand.cta = "主動ETF完整明細 → 主頁工具｜想了解開戶可私訊 James";
    state.brand.bioLink = state.brand.etfUrl || "https://traderwin1.netlify.app/";
    saveState();
  }

  function copyText(text, label) {
    navigator.clipboard.writeText(text).then(
      () => toast(`已複製${label || ""}`),
      () => toast("複製失敗，請手動選取")
    );
  }

  function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  /* ---------- nav / header ---------- */
  function renderNav() {
    const nav = document.getElementById("stepsNav");
    evaluateCompletions();
    nav.innerHTML = STEPS.map((s, i) => {
      const active = i === state.stepIndex ? "active" : "";
      const done = state.completedSteps[s.id] ? "done" : "";
      return `<button type="button" class="step-item ${active} ${done}" data-step="${i}">
        <div class="step-num">${state.completedSteps[s.id] ? "✓" : String(i + 1).padStart(2, "0")}</div>
        <div>
          <div class="step-label">${s.title}</div>
          <div class="step-hint">${s.hint}</div>
        </div>
      </button>`;
    }).join("");
    nav.querySelectorAll("[data-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.stepIndex = Number(btn.dataset.step);
        saveState();
        render();
      });
    });
  }

  function setHeader() {
    const step = STEPS[state.stepIndex];
    document.getElementById("stepEyebrow").textContent = `STEP ${String(state.stepIndex + 1).padStart(2, "0")} / ${String(STEPS.length).padStart(2, "0")}`;
    document.getElementById("stepTitle").textContent = step.title;
    const leads = {
      welcome: "這次流程已對齊市場上能長大的財經帳號做法：窄定位、可預期欄目、鉤子、工具磁鐵、發文後互動。你的差異化是「主動ETF雷達 + 研究摘要」。",
      market: "先看成功案例在做什麼，再抄「方法」不抄「人設」。下方每則都有「你可以偷學什麼」。",
      brand: "人名／自創品牌當帳號，公司放簡介。建議 James｜TraderWin。",
      account: "一組 IG+Threads 主帳即可。精選分類對齊內容支柱。",
      system: "成功帳號通常 3–5 個內容支柱、固定比例。這裡已替你算好 TraderWin 專用配比。",
      etf: "日更不用自己產數據——打開雷達站轉譯即可。Threads 搶討論。",
      prompts: "報告給外部 AI 用提示詞；保持數字可核對。",
      layout: "一致性 > 華麗。同一套版型打 100 篇。",
      report: "原始報告或 AI 稿都能產 Threads／IG。",
      compliance: "FAIL 不發。WARN 人工看。",
      calendar: "依支柱自動排一週；可直接當待辦。",
      publish: "發佈只是一半；5-3-1 互動才是成長引擎。",
      done: "7 天行動清單，照做就有節奏。"
    };
    document.getElementById("stepLead").textContent = leads[step.id] || "";
    const pct = progressPercent();
    document.getElementById("progressFill").style.width = pct + "%";
    document.getElementById("progressText").textContent = pct + "% 完成";
  }

  /* ---------- views ---------- */
  function viewWelcome() {
    return `
      <div class="stack">
        <div class="hero-stats">
          <div class="stat"><span>人物</span><b>James</b></div>
          <div class="stat"><span>名單磁鐵</span><b>ETF雷達</b></div>
          <div class="stat"><span>目標</span><b>信任→開戶</b></div>
        </div>
        <div class="callout">
          <strong>優化後公式（對齊成功帳號）</strong><br>
          窄定位 → 可預期日更 → Threads 鉤子 → IG 專業圖卡 → 免費工具（雷達）→ 發文後互動 → 私訊開戶。<br>
          詳見下一步「成功帳號特質」。
        </div>
        <div class="grid-2">
          <div class="card">
            <h3>平台分工（台灣）</h3>
            <ul>
              <li><strong>Threads：</strong>觸及、討論、日更短訊</li>
              <li><strong>IG：</strong>輪播信任、精選、收藏</li>
              <li><strong>工具站：</strong>每天回來的理由</li>
            </ul>
          </div>
          <div class="card">
            <h3>本站路徑</h3>
            <ul>
              <li>案例特質 → 命名 → 申請</li>
              <li>內容作業系統（支柱%）</li>
              <li>ETF／AI 報告 → 排版合規</li>
              <li>週曆 → 發佈 + 5-3-1</li>
            </ul>
          </div>
        </div>
        <div class="card">
          <h3>工具站</h3>
          <p><a href="https://traderwin1.netlify.app/" target="_blank" rel="noopener">https://traderwin1.netlify.app/</a></p>
        </div>
      </div>`;
  }

  function viewMarket() {
    const cases = (window.JCPlaybook && JCPlaybook.CASES) || [];
    const traits = (window.JCPlaybook && JCPlaybook.TRAITS) || [];
    const caseHtml = cases
      .map(
        (c) => `<div class="card">
        <h3>${escapeHtml(c.name)}</h3>
        <p class="help">${escapeHtml(c.type)}</p>
        <ul>${c.traits.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
        <p><strong>可偷學：</strong>${escapeHtml(c.steal)}</p>
      </div>`
      )
      .join("");
    const traitHtml = traits
      .map((t) => `<div class="card"><h3>${escapeHtml(t.title)}</h3><p>${escapeHtml(t.desc)}</p></div>`)
      .join("");
    return `
      <div class="stack">
        <div class="callout">
          以下為公開可觀察的<strong>經營型態</strong>。重點是共通特質，不是複製同一個網紅。
        </div>
        <h3 style="margin:0">成功帳號舉例</h3>
        <div class="grid-2">${caseHtml}</div>
        <h3 style="margin:0">8 個共通特質</h3>
        <div class="grid-2">${traitHtml}</div>
        <div class="card">
          <h3>對照 James／TraderWin</h3>
          <ul>
            <li>窄定位：主動ETF調倉 + 研究30秒摘要</li>
            <li>名單磁鐵：雷達站（已有）</li>
            <li>Threads 日更 + IG 輪播養專業</li>
            <li>軟轉換：明細免費 → 開戶私訊</li>
          </ul>
        </div>
      </div>`;
  }

  function viewSystem() {
    const pillars = (window.JCPlaybook && JCPlaybook.PILLARS) || [];
    const hooks = (window.JCPlaybook && JCPlaybook.HOOKS) || [];
    const os = (window.JCPlaybook && JCPlaybook.weekOS(state.brand)) || [];
    const engage = window.JCPlaybook && JCPlaybook.ENGAGE_531;
    const pillarRows = pillars
      .map(
        (p) => `<tr>
        <td><strong>${p.pct}%</strong></td>
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.platform)}</td>
        <td>${escapeHtml(p.goal)}</td>
      </tr>`
      )
      .join("");
    const osHtml = os
      .map(
        (b) => `<div class="card"><h3>${escapeHtml(b.day)}</h3><ul>${b.items
          .map((i) => `<li>${escapeHtml(i)}</li>`)
          .join("")}</ul></div>`
      )
      .join("");
    return `
      <div class="stack">
        <div class="callout">
          成功帳號用<strong>支柱比例</strong>平衡「專業」與「流量」。ETF 日更比例最高＝你有可防守的節奏。
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>比例</th><th>支柱</th><th>平台</th><th>目的</th></tr></thead>
            <tbody>${pillarRows}</tbody>
          </table>
        </div>
        <div class="card">
          <h3>鉤子公式</h3>
          <ul>${hooks.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
          <button type="button" class="btn small" id="copyHooksBtn">複製全部鉤子</button>
        </div>
        <div class="grid-2">${osHtml}</div>
        ${
          engage
            ? `<div class="card"><h3>${escapeHtml(engage.title)}</h3><ul>${engage.steps
                .map((s) => `<li>${escapeHtml(s)}</li>`)
                .join("")}</ul></div>`
            : ""
        }
      </div>`;
  }

  function bindSystem() {
    document.getElementById("copyHooksBtn")?.addEventListener("click", () => {
      copyText((JCPlaybook.HOOKS || []).join("\n"), " 鉤子");
    });
  }

  function viewBrand() {
    const b = state.brand;
    const cards = NAME_OPTIONS.map((opt) => {
      const selected = b.nameOptionId === opt.id || b.handle === opt.handle;
      return `<button type="button" class="card name-card ${selected ? "selected" : ""}" data-name="${opt.id}" style="text-align:left;cursor:pointer;border-color:${selected ? "rgba(61,139,253,.55)" : ""}">
        <h3>${escapeHtml(opt.displayName)} ${opt.recommended ? '<span class="badge ok">建議</span>' : ""}</h3>
        <p><strong>@${escapeHtml(opt.handle)}</strong></p>
        <p>${escapeHtml(opt.why)}</p>
        <p class="help">備案：${escapeHtml(opt.risk)}</p>
      </button>`;
    }).join("");

    return `
      <div class="stack">
        <div class="callout">
          <strong>為什麼不建議帳號寫 kgi？</strong>
          1）像官方／業務廣告，演算法與用戶都較防備；
          2）個人品牌無法帶走；
          3）成功案例多是人名或自創品牌詞。公司身分用「簡介一行／置頂說明」即可。
        </div>
        <div class="grid-2">${cards}</div>
        <div class="grid-2">
          <div class="field">
            <label>顯示名稱</label>
            <input id="f_displayName" value="${escapeAttr(b.displayName)}" />
          </div>
          <div class="field">
            <label>使用者名稱（不要 @）</label>
            <input id="f_handle" value="${escapeAttr(b.handle)}" />
          </div>
          <div class="field">
            <label>主頁連結（建議 ETF 雷達）</label>
            <input id="f_bioLink" value="${escapeAttr(b.bioLink)}" />
          </div>
          <div class="field">
            <label>所屬（簡介可提，不當帳號名）</label>
            <input id="f_company" value="${escapeAttr(b.company)}" />
          </div>
        </div>
        <div class="field">
          <label>Bio（已去掉「不喊單」防禦句，改為價值＋工具）</label>
          <textarea id="f_bio" rows="5">${escapeHtml(b.bio)}</textarea>
        </div>
        <div class="field">
          <label>CTA</label>
          <input id="f_cta" value="${escapeAttr(b.cta)}" />
        </div>
        <div class="field">
          <label>短免責</label>
          <textarea id="f_disclaimerShort" rows="2">${escapeHtml(b.disclaimerShort)}</textarea>
        </div>
        <div class="card">
          <h3>預覽</h3>
          <p><strong>${escapeHtml(b.displayName)}</strong>　@${escapeHtml(b.handle)}</p>
          <p style="white-space:pre-wrap">${escapeHtml(b.bio)}</p>
          <button type="button" class="btn small" id="copyBioBtn">複製 Bio</button>
          <button type="button" class="btn small" id="copyNameBtn">複製顯示名稱</button>
          <button type="button" class="btn small" id="copyHandleBtn">複製 handle</button>
        </div>
      </div>`;
  }

  function bindBrand() {
    document.querySelectorAll("[data-name]").forEach((el) => {
      el.addEventListener("click", () => {
        const opt = NAME_OPTIONS.find((x) => x.id === el.dataset.name);
        if (opt) {
          applyNameOption(opt);
          render();
          toast("已套用命名方案");
        }
      });
    });
    [
      ["f_displayName", "displayName"],
      ["f_handle", "handle"],
      ["f_bioLink", "bioLink"],
      ["f_company", "company"],
      ["f_bio", "bio"],
      ["f_cta", "cta"],
      ["f_disclaimerShort", "disclaimerShort"]
    ].forEach(([id, key]) => {
      const el = document.getElementById(id);
      el?.addEventListener("input", () => {
        state.brand[key] = el.value;
        if (key === "bioLink") state.brand.etfUrl = el.value;
        saveState();
      });
    });
    document.getElementById("copyBioBtn")?.addEventListener("click", () => copyText(state.brand.bio, " Bio"));
    document.getElementById("copyNameBtn")?.addEventListener("click", () => copyText(state.brand.displayName, " 顯示名稱"));
    document.getElementById("copyHandleBtn")?.addEventListener("click", () => copyText(state.brand.handle, " handle"));
  }

  function positioningPosts() {
    const b = state.brand;
    return {
      1: `我是 ${b.englishName}，平常在證券業服務，這裡用「TraderWin」整理我每天會看的東西。\n\n你會看到兩類內容：\n・主動 ETF 持股異動與排行（有工具可自己查）\n・台股／複委託研究重點摘要\n\n希望你花更少時間，看到更清楚的重點。\n\n${b.disclaimerShort}`,
      2: `為什麼要做「主動ETF雷達」？\n\n主動 ETF 會調倉，資訊散落各處。\n我把異動、排行、最大漲幅追蹤集中在一個工具裡，方便每天快速掃過。\n\n完整明細：${b.etfUrl || b.bioLink}\n\n如果你也想自己執行配置與複委託／台股交易，之後可以再聊開戶與流程。\n\n${b.disclaimerShort}`,
      3: `這裡的內容怎麼用比較好：\n\n・先看現象與數據（ETF 異動、研究摘要）\n・再對照自己的風險承受度\n・需要執行面（開戶、複委託、配置）再找我\n\n我會盡量把來源與風險寫清楚，方便你獨立判斷。\n\n${b.disclaimerShort}`
    };
  }

  function viewAccount() {
    const b = state.brand;
    const ap = accountProgress();
    const items = ACCOUNT_CHECKS.map((c) => {
      const checked = state.accountChecks[c.id] ? "checked" : "";
      const done = state.accountChecks[c.id] ? "done" : "";
      return `<label class="check-item ${done}">
        <input type="checkbox" data-check="${c.id}" ${checked} />
        <div><strong>${c.title}</strong><span>${c.desc}</span></div>
      </label>`;
    }).join("");

    return `
      <div class="stack">
        <div class="callout">
          主帳目標：<strong>${escapeHtml(b.displayName)}</strong>／@${escapeHtml(b.handle)}　
          主頁連結先放 <a href="${escapeAttr(b.bioLink || b.etfUrl)}" target="_blank" rel="noopener">ETF 雷達</a>
        </div>
        <div class="grid-2">
          <div class="card">
            <h3>一鍵複製</h3>
            <button type="button" class="btn small" id="accCopyName">顯示名稱</button>
            <button type="button" class="btn small" id="accCopyHandle">handle</button>
            <button type="button" class="btn small" id="accCopyBio">Bio</button>
            <p class="help" style="margin-top:8px">進度 ${ap.done}/${ap.total}</p>
          </div>
          <div class="card">
            <h3>官方入口</h3>
            <ul>
              <li><a href="https://www.instagram.com/accounts/emailsignup/" target="_blank" rel="noopener">申請 Instagram</a></li>
              <li><a href="https://www.threads.net/" target="_blank" rel="noopener">開啟 Threads</a></li>
            </ul>
          </div>
        </div>
        <div class="checklist">${items}</div>
        <div class="card">
          <h3>定位文（價值取向，非防禦式）</h3>
          <div class="tabs">
            <button type="button" class="tab active" data-pos="1">1 我是誰</button>
            <button type="button" class="tab" data-pos="2">2 工具價值</button>
            <button type="button" class="tab" data-pos="3">3 怎麼用</button>
          </div>
          <pre class="output" id="posOutput"></pre>
          <button type="button" class="btn small" id="copyPosBtn">複製此則</button>
        </div>
      </div>`;
  }

  function bindAccount() {
    document.querySelectorAll("[data-check]").forEach((el) => {
      el.addEventListener("change", () => {
        state.accountChecks[el.dataset.check] = el.checked;
        saveState();
        render();
      });
    });
    document.getElementById("accCopyName")?.addEventListener("click", () => copyText(state.brand.displayName, " 顯示名稱"));
    document.getElementById("accCopyHandle")?.addEventListener("click", () => copyText(state.brand.handle, " handle"));
    document.getElementById("accCopyBio")?.addEventListener("click", () => copyText(state.brand.bio, " Bio"));
    const posts = positioningPosts();
    let current = "1";
    const out = document.getElementById("posOutput");
    const setPos = (k) => {
      current = k;
      out.textContent = posts[k];
      document.querySelectorAll("[data-pos]").forEach((t) => t.classList.toggle("active", t.dataset.pos === k));
    };
    setPos("1");
    document.querySelectorAll("[data-pos]").forEach((t) => t.addEventListener("click", () => setPos(t.dataset.pos)));
    document.getElementById("copyPosBtn")?.addEventListener("click", () => copyText(posts[current], " 定位文"));
  }

  function viewEtf() {
    const b = state.brand;
    return `
      <div class="stack">
        <div class="callout">
          每天打開 <a href="${escapeAttr(b.etfUrl)}" target="_blank" rel="noopener">主動式ETF雷達</a>：
          看「異動查詢／排行／最大漲幅」→ 貼重點到下方 → 產文或複製「ETF 日更提示詞」給外部 AI。
        </div>
        <div class="grid-2">
          <div class="card">
            <h3>建議每日 10 分鐘流程</h3>
            <ul>
              <li>雷達站：今日異動 1–3 檔</li>
              <li>選 1 個現象當鉤子</li>
              <li>Threads 短文 + IG 4 頁</li>
              <li>CTA：完整明細在工具／想執行再聊開戶</li>
            </ul>
          </div>
          <div class="card">
            <h3>開戶吸引力怎麼做</h3>
            <ul>
              <li>先給「免費可查的明細」建立習慣</li>
              <li>再談配置與複委託／台股執行</li>
              <li>不要在異動文直接喊買某股</li>
            </ul>
          </div>
        </div>
        <div class="field">
          <label>今日雷達筆記（可從網站整理後貼上）</label>
          <textarea id="etfNotes" rows="8" placeholder="ETF代號、新增/剔除、排行...">${escapeHtml(state.etfNotes)}</textarea>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn primary" id="etfGenBtn">生成本地草稿</button>
          <button type="button" class="btn ghost" id="etfSampleBtn">載入範例筆記</button>
          <button type="button" class="btn ghost" id="etfPromptBtn">複製「ETF→AI」提示詞</button>
          <a class="btn ghost" href="${escapeAttr(b.etfUrl)}" target="_blank" rel="noopener">打開雷達站</a>
        </div>
        <div class="tabs">
          <button type="button" class="tab active" data-etf-tab="threads">Threads</button>
          <button type="button" class="tab" data-etf-tab="ig">IG 腳本</button>
        </div>
        <pre class="output" id="etfOut">${escapeHtml(state.etfPosts.threads || "尚未產生")}</pre>
        <button type="button" class="btn small" id="etfCopyBtn">複製</button>
      </div>`;
  }

  function genEtfLocal() {
    const notes = (state.etfNotes || "").trim();
    if (notes.length < 20) {
      toast("請先貼上今日雷達筆記");
      return;
    }
    const b = state.brand;
    const lines = notes.split(/\n/).map((x) => x.trim()).filter(Boolean).slice(0, 6);
    const bullets = lines.slice(0, 4).map((l) => `・${l}`).join("\n");
    const hooks = (window.JCPlaybook && JCPlaybook.HOOKS) || ["今天主動ETF有一個調倉，比股價更值得看："];
    const hook = hooks[Math.floor(Math.random() * hooks.length)];
    state.etfPosts.threads = `${hook}\n\n${bullets}\n\n這是管理人調倉現象整理，不是買賣建議。\n你會怎麼解讀這次異動？\n\n完整明細：${b.etfUrl}\n\n${b.disclaimerShort}\n\n${b.cta}`;
    state.etfPosts.ig = `## Slide 1 封面\n${hook}\n${b.displayName}\n\n## Slide 2 異動重點\n${lines.slice(0, 3).join("\n")}\n\n## Slide 3 怎麼讀\n看調倉方向與產業偏好，不預測短線漲跌\n\n## Slide 4 CTA\n完整明細：${b.etfUrl}\n${b.disclaimerShort}\n${b.cta}`;
    saveState();
    toast("已產生 ETF 日更草稿");
    render();
  }

  function bindEtf() {
    let tab = "threads";
    const out = document.getElementById("etfOut");
    document.getElementById("etfNotes")?.addEventListener("input", (e) => {
      state.etfNotes = e.target.value;
      saveState();
    });
    document.getElementById("etfSampleBtn")?.addEventListener("click", () => {
      state.etfNotes = SAMPLE_ETF;
      saveState();
      render();
    });
    document.getElementById("etfGenBtn")?.addEventListener("click", genEtfLocal);
    document.getElementById("etfPromptBtn")?.addEventListener("click", () => {
      const p = JCPrompts.promptEtfDaily(state.brand) + "\n" + (state.etfNotes || "（請貼上今日異動）");
      copyText(p, " ETF 提示詞");
    });
    document.getElementById("etfCopyBtn")?.addEventListener("click", () => copyText(state.etfPosts[tab] || "", ""));
    document.querySelectorAll("[data-etf-tab]").forEach((t) => {
      t.addEventListener("click", () => {
        tab = t.dataset.etfTab;
        out.textContent = state.etfPosts[tab] || "尚未產生";
        document.querySelectorAll("[data-etf-tab]").forEach((x) => x.classList.toggle("active", x === t));
      });
    });
  }

  function viewPrompts() {
    const tabs = [
      ["report", "報告→完整圖文包"],
      ["etf", "ETF 日更"],
      ["carousel", "只做輪播"],
      ["polish", "Threads 潤飾"],
      ["image", "生圖 system"]
    ];
    return `
      <div class="stack">
        <div class="callout">
          你的流程是：<strong>報告 → 外部 AI 整理＋圖文 → 回本站合規／排程</strong>。
          下方提示詞已內建品牌、免責、CTA、排版規範，直接整段複製到 ChatGPT／Claude／Gemini。
        </div>
        <div class="tabs">
          ${tabs
            .map(
              ([id, label]) =>
                `<button type="button" class="tab ${state.promptTab === id ? "active" : ""}" data-ptab="${id}">${label}</button>`
            )
            .join("")}
        </div>
        <pre class="output" id="promptOut"></pre>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn primary" id="copyPromptBtn">複製提示詞</button>
          <button type="button" class="btn ghost" id="copyPromptPlusReport">複製提示詞 + 目前報告區文字</button>
        </div>
        <div class="card">
          <h3>建議丟給 AI 的順序</h3>
          <ul>
            <li>長報告：用「報告→完整圖文包」一次拿 Threads + IG 腳本 + 生圖 prompt</li>
            <li>每日雷達：用「ETF 日更」</li>
            <li>圖不好看：把輪播腳本再丟繪圖 AI，搭配「生圖 system」</li>
            <li>人工核對 <code>numbers_to_verify</code> 後再發</li>
          </ul>
        </div>
      </div>`;
  }

  function currentPromptText() {
    const b = state.brand;
    switch (state.promptTab) {
      case "etf":
        return JCPrompts.promptEtfDaily(b) + "\n" + (state.etfNotes || "");
      case "carousel":
        return JCPrompts.promptCarouselOnly(b);
      case "polish":
        return JCPrompts.promptThreadsPolish(b) + "\n" + (state.posts.threads || "");
      case "image":
        return JCPrompts.promptImageSystem();
      case "report":
      default:
        return JCPrompts.promptReportToPack(b);
    }
  }

  function bindPrompts() {
    const out = document.getElementById("promptOut");
    const refresh = () => {
      out.textContent = currentPromptText();
    };
    refresh();
    document.querySelectorAll("[data-ptab]").forEach((t) => {
      t.addEventListener("click", () => {
        state.promptTab = t.dataset.ptab;
        saveState();
        render();
      });
    });
    document.getElementById("copyPromptBtn")?.addEventListener("click", () => copyText(currentPromptText(), " 提示詞"));
    document.getElementById("copyPromptPlusReport")?.addEventListener("click", () => {
      copyText(currentPromptText() + "\n" + (state.reportText || "（尚無報告文字，請先到產出貼文步驟貼上）"), " 提示詞+報告");
    });
  }

  function viewLayout() {
    return `
      <div class="stack">
        <div class="callout">社群「看起來專業」多半來自固定版型，而不是每天換字體。請把下列規則當預設模板。</div>
        <div class="grid-2">
          <div class="card">
            <h3>IG 輪播</h3>
            <ul>
              <li>尺寸 1080×1350（4:5）</li>
              <li>5–7 頁；每頁 1 重點</li>
              <li>標題 ≤18 字、內文 ≤60 字</li>
              <li>大數字、少段落</li>
              <li>末頁：風險 + 免責 + CTA</li>
            </ul>
          </div>
          <div class="card">
            <h3>配色（金融專業）</h3>
            <ul>
              <li>底：#0B1220</li>
              <li>強調金：#C9A227</li>
              <li>字：#F5F7FB / 次要 #8B9BB4</li>
              <li>避免紅綠滿版漲跌煽動</li>
            </ul>
          </div>
          <div class="card">
            <h3>Threads</h3>
            <ul>
              <li>前 2 行鉤子</li>
              <li>中間條列 3–5 點</li>
              <li>風險獨立段</li>
              <li>免責 + 工具／開戶 CTA</li>
            </ul>
          </div>
          <div class="card">
            <h3>頁面骨架</h3>
            <ul>
              <li>1 封面結論</li>
              <li>2–4 重點</li>
              <li>5 風險</li>
              <li>6 工具明細 + 開戶 CTA</li>
            </ul>
          </div>
        </div>
        <pre class="output">${escapeHtml(JCPrompts.LAYOUT_RULES)}</pre>
        <button type="button" class="btn primary" id="copyLayoutBtn">複製排版規範（可併入任何 AI 提示）</button>
      </div>`;
  }

  function bindLayout() {
    document.getElementById("copyLayoutBtn")?.addEventListener("click", () => copyText(JCPrompts.LAYOUT_RULES, " 排版規範"));
  }

  function viewReport() {
    return `
      <div class="stack">
        <div class="callout">
          兩種用法：① 貼原始報告讓本站粗整理　② 先用「AI 提示詞」步驟產出後，把 AI 結果貼回來再檢查。
        </div>
        <div class="dropzone" id="dropzone">
          拖曳 .md / .txt / .pdf，或
          <label class="btn small" style="display:inline-flex;margin-left:6px">
            選擇檔案
            <input type="file" id="fileInput" accept=".md,.txt,.markdown,.pdf,text/plain" hidden />
          </label>
        </div>
        <div class="field">
          <label>報告原文 或 AI 已整理稿</label>
          <textarea id="reportText" rows="12">${escapeHtml(state.reportText)}</textarea>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn primary" id="genBtn">產生貼文草稿</button>
          <button type="button" class="btn ghost" id="sampleBtn">示範報告</button>
          <button type="button" class="btn ghost" id="toPromptBtn">帶去複製 AI 提示詞</button>
          <button type="button" class="btn ghost" id="copyPostBtn">複製目前分頁</button>
        </div>
        ${
          state.summary
            ? `<div class="card"><h3>重點</h3>
          <p>${escapeHtml(state.summary.title)}｜${escapeHtml(state.summary.primaryTicker || "—")}</p>
          <ul>${(state.summary.keyPoints || []).map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
        </div>`
            : ""
        }
        <div class="tabs">
          <button type="button" class="tab ${state.activePostTab === "threads" ? "active" : ""}" data-tab="threads">Threads</button>
          <button type="button" class="tab ${state.activePostTab === "ig" ? "active" : ""}" data-tab="ig">IG 輪播</button>
          <button type="button" class="tab ${state.activePostTab === "landing" ? "active" : ""}" data-tab="landing">落地摘要</button>
        </div>
        <pre class="output" id="postOutput">${escapeHtml(state.posts[state.activePostTab] || "尚未產生")}</pre>
      </div>`;
  }

  function generateFromText(text, name) {
    if (!text || text.trim().length < 40) {
      toast("內容太短");
      return;
    }
    const summary = JCPipeline.structureReport(text, name || "report");
    state.reportText = text;
    state.reportName = name || "report";
    state.summary = summary;
    state.posts = {
      threads: JCPipeline.renderThreads(summary, state.brand),
      ig: JCPipeline.renderIgCarousel(summary, state.brand),
      landing: JCPipeline.renderLanding(summary, state.brand)
    };
    saveState();
    toast("已產生草稿");
    render();
  }

  function bindReport() {
    const ta = document.getElementById("reportText");
    ta?.addEventListener("input", () => {
      state.reportText = ta.value;
      saveState();
    });
    document.getElementById("sampleBtn")?.addEventListener("click", () => {
      state.reportText = SAMPLE_REPORT;
      saveState();
      render();
    });
    document.getElementById("genBtn")?.addEventListener("click", () => generateFromText(document.getElementById("reportText").value, state.reportName));
    document.getElementById("copyPostBtn")?.addEventListener("click", () => copyText(state.posts[state.activePostTab] || "", ""));
    document.getElementById("toPromptBtn")?.addEventListener("click", () => {
      state.stepIndex = STEPS.findIndex((s) => s.id === "prompts");
      state.promptTab = "report";
      saveState();
      render();
      setTimeout(() => {
        copyText(JCPrompts.promptReportToPack(state.brand) + "\n" + (state.reportText || ""), " 提示詞+報告");
      }, 50);
    });
    document.querySelectorAll("[data-tab]").forEach((t) => {
      t.addEventListener("click", () => {
        state.activePostTab = t.dataset.tab;
        saveState();
        render();
      });
    });
    const input = document.getElementById("fileInput");
    const zone = document.getElementById("dropzone");
    const handleFiles = async (files) => {
      const file = files?.[0];
      if (!file) return;
      try {
        if (window.pdfjsLib) {
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }
        const { name, text } = await JCPipeline.readFileAsText(file);
        generateFromText(text, name);
      } catch (e) {
        toast(e.message || "讀取失敗");
      }
    };
    input?.addEventListener("change", () => handleFiles(input.files));
    zone?.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("drag");
    });
    zone?.addEventListener("dragleave", () => zone.classList.remove("drag"));
    zone?.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("drag");
      handleFiles(e.dataTransfer.files);
    });
  }

  function viewCompliance() {
    if (!state.posts.threads && !state.etfPosts.threads) {
      return `<div class="callout">請先在「產出貼文」或「每日ETF」產生文案。</div>`;
    }
    const text = state.posts.threads || state.etfPosts.threads;
    const c = JCPipeline.checkCompliance(text);
    const badge = c.status === "PASS" ? "ok" : c.status === "WARN" ? "warn" : "fail";
    return `
      <div class="stack">
        <div class="card">
          <h3>結果 <span class="badge ${badge}">${c.status}</span></h3>
          <ul>
            <li>禁用詞：${c.forbidden.length ? escapeHtml(c.forbidden.join("、")) : "無"}</li>
            <li>注意詞：${c.caution.length ? escapeHtml(c.caution.join("、")) : "無"}</li>
            <li>免責：${c.hasDisclaimer ? "有" : "缺"}</li>
            <li>風險：${c.hasRisk ? "有" : "建議補"}</li>
          </ul>
        </div>
        <div class="field">
          <label>編輯後重檢（預設研究文；若空則檢 ETF 文）</label>
          <textarea id="compEdit" rows="14">${escapeHtml(text)}</textarea>
        </div>
        <button type="button" class="btn primary" id="recheckBtn">儲存並重檢</button>
      </div>`;
  }

  function bindCompliance() {
    document.getElementById("recheckBtn")?.addEventListener("click", () => {
      const text = document.getElementById("compEdit").value;
      if (state.posts.threads) state.posts.threads = text;
      else state.etfPosts.threads = text;
      saveState();
      render();
      toast("已重檢");
    });
  }

  function viewCalendar() {
    if (!state.weekPlan.length) {
      state.weekPlan = JCPipeline.buildWeekPlan(state.brand, 7);
      saveState();
    }
    const rows = state.weekPlan
      .map(
        (r) => `<tr>
        <td>${r.date}</td><td>${r.weekLabel}</td><td>${r.time}</td>
        <td>${escapeHtml(r.platform)}</td><td>${escapeHtml(r.pillar)}</td><td>${escapeHtml(r.notes)}</td>
      </tr>`
      )
      .join("");
    return `
      <div class="stack">
        <div class="callout">
          依成功帳號打法：<strong>交易日 ETF 短訊（觸及）</strong> + <strong>週 2–3 研究圖卡（信任）</strong> +
          <strong>1 則教學／開戶前準備（轉換）</strong>。每則發完做 5-3-1。
        </div>
        <div style="display:flex;gap:8px">
          <button type="button" class="btn primary" id="regenPlan">重產 7 天</button>
          <button type="button" class="btn ghost" id="copyPlan">複製</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>日期</th><th>週</th><th>時間</th><th>平台</th><th>支柱</th><th>備註</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;
  }

  function bindCalendar() {
    document.getElementById("regenPlan")?.addEventListener("click", () => {
      state.weekPlan = JCPipeline.buildWeekPlan(state.brand, 7);
      saveState();
      render();
    });
    document.getElementById("copyPlan")?.addEventListener("click", () => {
      copyText(state.weekPlan.map((r) => `${r.date} ${r.time} ${r.pillar}`).join("\n"), " 規劃");
    });
  }

  function viewPublish() {
    const p = state.publishChecks;
    const engage = window.JCPlaybook && JCPlaybook.ENGAGE_531;
    const items = [
      ["hookOk", "前兩行有鉤子／結論前置"],
      ["reviewed", "數字與風險已人工核對"],
      ["etfLinked", "Bio／文案已連到 ETF 雷達"],
      ["scheduled", "已排時間"],
      ["posted", "已發佈"],
      ["engage531", "發文後完成 5-3-1 互動"],
      ["logged", "已記私訊／開戶詢問"]
    ]
      .map(
        ([id, label]) => `<label class="check-item ${p[id] ? "done" : ""}">
        <input type="checkbox" data-pub="${id}" ${p[id] ? "checked" : ""} />
        <div><strong>${label}</strong></div>
      </label>`
      )
      .join("");
    return `
      <div class="stack">
        <div class="callout">
          市場上成長快的帳號，差異常在<strong>發文之後</strong>：回覆、進同溫層、丟問題。不要貼完就關 App。
        </div>
        <div class="card">
          <h3>發佈對象</h3>
          <p>@${escapeHtml(state.brand.handle)} · ${escapeHtml(state.brand.displayName)}</p>
          <p>研究稿：${state.summary ? escapeHtml(state.summary.title) : "—"}</p>
          <p>ETF稿：${state.etfPosts.threads ? "已有" : "—"}</p>
        </div>
        ${
          engage
            ? `<div class="card"><h3>${escapeHtml(engage.title)}</h3><ul>${engage.steps
                .map((s) => `<li>${escapeHtml(s)}</li>`)
                .join("")}</ul></div>`
            : ""
        }
        <div class="checklist">${items}</div>
        <pre class="output">${escapeHtml(state.posts.threads || state.etfPosts.threads || "尚無定稿")}</pre>
        <button type="button" class="btn small" id="pubCopy">複製定稿</button>
      </div>`;
  }

  function bindPublish() {
    document.querySelectorAll("[data-pub]").forEach((el) => {
      el.addEventListener("change", () => {
        state.publishChecks[el.dataset.pub] = el.checked;
        saveState();
        render();
      });
    });
    document.getElementById("pubCopy")?.addEventListener("click", () =>
      copyText(state.posts.threads || state.etfPosts.threads || "", "")
    );
  }

  function viewDone() {
    const ap = accountProgress();
    return `
      <div class="stack">
        <div class="hero-stats">
          <div class="stat"><span>完成度</span><b>${progressPercent()}%</b></div>
          <div class="stat"><span>帳號檢查</span><b>${ap.done}/${ap.total}</b></div>
          <div class="stat"><span>主帳</span><b>@${escapeHtml(state.brand.handle)}</b></div>
        </div>
        <div class="card">
          <h3>未來 7 天（對齊成功帳號節奏）</h3>
          <ul>
            <li>D1：申請 @${escapeHtml(state.brand.handle)}，Bio→雷達站，發 3 則定位文</li>
            <li>D2–D6：每天 08:30 ETF Threads + 發文後 5-3-1</li>
            <li>D2／D4：研究圖文各 1（外部AI+提示詞）</li>
            <li>D3：1 則教學卡（怎麼看異動／開戶前準備）</li>
            <li>D6：回顧哪篇帶來私訊；下週只加碼有效類型</li>
            <li>登錄字號後只改簡介加註，不改品牌主名</li>
          </ul>
        </div>
        <button type="button" class="btn primary" id="goMarket">回成功特質</button>
        <button type="button" class="btn ghost" id="goAccount">去申請帳號</button>
      </div>`;
  }

  function bindDone() {
    document.getElementById("goMarket")?.addEventListener("click", () => {
      state.stepIndex = STEPS.findIndex((s) => s.id === "market");
      saveState();
      render();
    });
    document.getElementById("goAccount")?.addEventListener("click", () => {
      state.stepIndex = STEPS.findIndex((s) => s.id === "account");
      saveState();
      render();
    });
  }

  function renderPanel() {
    const id = STEPS[state.stepIndex].id;
    const panel = document.getElementById("stepPanel");
    const views = {
      welcome: viewWelcome,
      market: viewMarket,
      brand: viewBrand,
      account: viewAccount,
      system: viewSystem,
      etf: viewEtf,
      prompts: viewPrompts,
      layout: viewLayout,
      report: viewReport,
      compliance: viewCompliance,
      calendar: viewCalendar,
      publish: viewPublish,
      done: viewDone
    };
    const view = views[id];
    panel.innerHTML = view ? view() : `<div class="callout">未知步驟</div>`;
    const binders = {
      brand: bindBrand,
      account: bindAccount,
      system: bindSystem,
      etf: bindEtf,
      prompts: bindPrompts,
      layout: bindLayout,
      report: bindReport,
      compliance: bindCompliance,
      calendar: bindCalendar,
      publish: bindPublish,
      done: bindDone
    };
    binders[id]?.();
  }

  function render() {
    renderNav();
    setHeader();
    renderPanel();
    document.getElementById("prevBtn").disabled = state.stepIndex === 0;
    document.getElementById("nextBtn").textContent = state.stepIndex === STEPS.length - 1 ? "完成" : "下一步";
  }

  function init() {
    if (window.pdfjsLib) {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
    // 側欄品牌字
    const sub = document.querySelector(".brand-sub");
    if (sub) sub.textContent = "TraderWin · 主動ETF × 研究";

    document.getElementById("prevBtn").addEventListener("click", () => {
      if (state.stepIndex > 0) {
        state.stepIndex -= 1;
        saveState();
        render();
      }
    });
    document.getElementById("nextBtn").addEventListener("click", () => {
      if (state.stepIndex < STEPS.length - 1) {
        state.stepIndex += 1;
        saveState();
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else toast("可以開始申請帳號與日更了");
    });
    document.getElementById("resetBtn").addEventListener("click", () => {
      if (confirm("清除本機進度？")) {
        state = defaultState();
        saveState();
        render();
      }
    });
    render();
  }

  init();
})();
