/* James Content Studio — 線上逐步引導 */
(function () {
  const STORAGE_KEY = "james_content_studio_v1";

  const DEFAULT_BRAND = {
    englishName: "James",
    displayName: "James｜凱基證券",
    company: "凱基證券",
    role: "服務專員／業務",
    handle: "james_kgi",
    niche: "台股・複委託研究分享",
    bio: "James｜凱基證券\n台股・複委託研究分享｜非投資建議\n每日重點整理，不喊單\n完整摘要與開戶諮詢 ↓",
    bioLink: "",
    cta: "想了解開戶或完整重點 → 主頁連結／私訊 James",
    disclaimerShort: "以上內容僅供研究分享，非投資建議，投資有風險，請自行判斷。",
    disclaimerFull:
      "本內容僅供研究與教育分享，不構成任何有價證券之要約、招攬、建議或推薦。投資人應依自身財務狀況與風險承受度獨立判斷。過往績效不代表未來表現。若涉及開戶或活動方案，悉以凱基證券官方規定與公告為準。"
  };

  const ACCOUNT_CHECKS = [
    { id: "phone_ready", title: "準備手機號碼與常用 Email", desc: "Meta 帳號驗證會用到，建議與你本人資料一致。" },
    { id: "meta_account", title: "註冊／登入 Meta 帳號（Facebook 或已有 IG）", desc: "Threads 需綁定 Instagram；IG 建議之後轉專業帳號。" },
    { id: "ig_create", title: "建立 Instagram 帳號（個人品牌）", desc: "顯示名稱先用「James｜凱基證券」，使用者名稱用下方建議。" },
    { id: "ig_profile", title: "完成 IG 大頭貼、簡介、主頁連結", desc: "簡介直接貼上本系統產生的 Bio；連結可先放 LINE 或稍後補落地頁。" },
    { id: "ig_pro", title: "切換 IG 專業帳號（創作者或企業）", desc: "設定 → 帳號類型與工具 → 切換為專業帳號，方便洞察數據。" },
    { id: "threads_create", title: "用同一 IG 開啟 Threads", desc: "App 或 threads.net 以 Instagram 登入並建立 Threads 個人檔案。" },
    { id: "threads_bio", title: "同步 Threads 名稱與簡介", desc: "與 IG 一致，強化「James｜凱基證券」辨識度。" },
    { id: "positioning_posts", title: "發佈 3 則定位文", desc: "我是誰／我寫什麼／我不寫什麼（文案已在本步驟提供）。" },
    { id: "security", title: "開啟兩步驟驗證", desc: "IG 與 Meta 帳戶安全設定務必打開。" }
  ];

  const STEPS = [
    { id: "welcome", title: "開始使用", hint: "了解流程" },
    { id: "brand", title: "品牌設定", hint: "James 個人品牌" },
    { id: "account", title: "申請第一個帳號", hint: "IG + Threads" },
    { id: "report", title: "上傳報告轉貼文", hint: "重點整理" },
    { id: "compliance", title: "合規檢查", hint: "發佈前把關" },
    { id: "calendar", title: "一週貼文規劃", hint: "發文節奏" },
    { id: "publish", title: "發佈與追蹤", hint: "上線檢查" },
    { id: "done", title: "完成總覽", hint: "下一步建議" }
  ];

  const SAMPLE_REPORT = `# 台積電（2330）法說會後觀察摘要

## 摘要／結論
台積電（2330）本季法說會後，市場聚焦先進製程產能利用率與 AI 相關需求能見度。
短期股價已反映部分樂觀預期，中期仍取決於客戶投片節奏與資本支出執行進度。

## 催化劑／成長動能
- AI 加速器與 HPC 需求延續，3nm／2nm 產能規劃受關注。
- 海外廠進度若符合預期，有助分散地緣風險溢價。
- 若主要客戶上修年度 Outlook，有機會帶動市場風險偏好。

## 財務與估值觀察
- 營收成長動能仍與高階製程組合有關，需追蹤毛利率季對季變化。
- 估值已處相對不低區間，對利空消息敏感度上升。

## 風險
- 總經放緩或終端需求不如預期，可能影響投片能見度。
- 地緣政治與出口管制變化屬結構性不確定因素。
- 技術競爭與客戶自研進度可能改變長期市占假設。

## 觀點／策略
中性偏多觀察：若回檔且基本面未轉弱，可分批研究配置；追高需留意波動風險。
本內容僅供研究分享，非投資建議，投資有風險，請自行判斷。
`;

  function defaultState() {
    return {
      stepIndex: 0,
      brand: { ...DEFAULT_BRAND },
      accountChecks: Object.fromEntries(ACCOUNT_CHECKS.map((c) => [c.id, false])),
      reportText: "",
      reportName: "",
      summary: null,
      posts: { threads: "", ig: "", landing: "" },
      activePostTab: "threads",
      weekPlan: [],
      publishChecks: {
        reviewed: false,
        scheduled: false,
        posted: false,
        logged: false
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
        posts: { threads: "", ig: "", landing: "", ...(parsed.posts || {}) }
      };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const pill = document.getElementById("savePill");
    if (pill) {
      pill.textContent = "已自動儲存於瀏覽器 · " + new Date().toLocaleTimeString();
    }
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
    markStepComplete("brand", !!(state.brand.displayName && state.brand.handle));
    markStepComplete("account", accountProgress().ratio >= 1);
    markStepComplete("report", !!(state.summary && state.posts.threads));
    if (state.posts.threads) {
      const c = JCPipeline.checkCompliance(state.posts.threads);
      markStepComplete("compliance", c.status !== "FAIL");
    } else {
      markStepComplete("compliance", false);
    }
    markStepComplete("calendar", (state.weekPlan || []).length > 0);
    const p = state.publishChecks;
    markStepComplete("publish", p.reviewed && p.posted);
    markStepComplete("done", markStepComplete && accountProgress().ratio >= 0.5);
  }

  function progressPercent() {
    evaluateCompletions();
    const n = STEPS.filter((s) => state.completedSteps[s.id]).length;
    return Math.round((n / STEPS.length) * 100);
  }

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
      welcome: "這是專為你打造的線上工作室：用個人品牌 James（凱基證券）經營 Threads／IG，把研究報告變成可發佈貼文，並完成第一個帳號申請。",
      brand: "先把對外名稱、帳號 ID、簡介定好。之後申請 IG／Threads 直接複製貼上即可。",
      account: "依序完成下列檢查項目。系統無法代你註冊（需你的手機驗證），但會逐步帶你做完並勾選進度。",
      report: "貼上或上傳研究報告，一鍵產出 Threads 文案、IG 輪播腳本與落地頁摘要。",
      compliance: "發佈前自動掃描禁用詞與免責聲明。FAIL 請先修改，不要上線。",
      calendar: "產生未來一週發文節奏，固定時段經營個人品牌。",
      publish: "抽審 → 發佈 → 紀錄。養成每次都可追蹤的習慣。",
      done: "恭喜走到這裡。下面是你的完成狀態與接下來 7 天建議。"
    };
    document.getElementById("stepLead").textContent = leads[step.id] || "";
    const pct = progressPercent();
    document.getElementById("progressFill").style.width = pct + "%";
    document.getElementById("progressText").textContent = pct + "% 完成";
  }

  function copyText(text, label) {
    navigator.clipboard.writeText(text).then(
      () => toast(`已複製${label || ""}`),
      () => toast("複製失敗，請手動選取")
    );
  }

  /* ---------- Step views ---------- */
  function viewWelcome() {
    const ap = accountProgress();
    return `
      <div class="stack">
        <div class="hero-stats">
          <div class="stat"><span>品牌人物</span><b>James</b></div>
          <div class="stat"><span>所屬</span><b>凱基證券</b></div>
          <div class="stat"><span>第一目標</span><b>申請 1 個主帳</b></div>
        </div>
        <div class="callout">
          <strong>你會在這個網頁完成：</strong><br>
          1）設定 James 個人品牌 → 2）一步步申請 IG + Threads →
          3）上傳報告自動轉貼文 → 4）合規檢查 → 5）一週排程 → 6）發佈追蹤。<br>
          進度存在你的瀏覽器，關掉再開還在。
        </div>
        <div class="grid-2">
          <div class="card">
            <h3>經營定位（已為你預設）</h3>
            <ul>
              <li>個人品牌：James｜凱基證券</li>
              <li>內容：台股／複委託研究摘要</li>
              <li>目標：信任感 → 開戶諮詢／導流</li>
              <li>登錄字號：之後再申請，先用個人品牌經營</li>
            </ul>
          </div>
          <div class="card">
            <h3>目前進度快照</h3>
            <p>帳號申請檢查：<strong>${ap.done}/${ap.total}</strong></p>
            <p>是否已產貼文：<strong>${state.summary ? "是" : "尚未"}</strong></p>
            <p>建議：先完成「品牌設定」與「申請第一個帳號」兩步。</p>
          </div>
        </div>
      </div>`;
  }

  function viewBrand() {
    const b = state.brand;
    return `
      <div class="stack">
        <div class="grid-2">
          <div class="field">
            <label>英文名</label>
            <input id="f_englishName" value="${escapeAttr(b.englishName)}" />
          </div>
          <div class="field">
            <label>顯示名稱（IG／Threads）</label>
            <input id="f_displayName" value="${escapeAttr(b.displayName)}" />
          </div>
          <div class="field">
            <label>建議使用者名稱（不要加 @）</label>
            <input id="f_handle" value="${escapeAttr(b.handle)}" />
            <div class="help">若被占用，可試 james.kgi / james_tw_research / jameskgimarkets</div>
          </div>
          <div class="field">
            <label>主頁連結（落地頁 / LINE / 表單，可先留空）</label>
            <input id="f_bioLink" value="${escapeAttr(b.bioLink)}" placeholder="https://..." />
          </div>
        </div>
        <div class="field">
          <label>帳號簡介 Bio</label>
          <textarea id="f_bio" rows="5">${escapeHtml(b.bio)}</textarea>
        </div>
        <div class="field">
          <label>貼文 CTA</label>
          <input id="f_cta" value="${escapeAttr(b.cta)}" />
        </div>
        <div class="field">
          <label>短免責（每則貼文末）</label>
          <textarea id="f_disclaimerShort" rows="2">${escapeHtml(b.disclaimerShort)}</textarea>
        </div>
        <div class="card">
          <h3>預覽</h3>
          <p><strong>${escapeHtml(b.displayName)}</strong>　@${escapeHtml(b.handle)}</p>
          <p style="white-space:pre-wrap">${escapeHtml(b.bio)}</p>
          <button type="button" class="btn small" id="copyBioBtn">複製 Bio</button>
          <button type="button" class="btn small" id="copyNameBtn">複製顯示名稱</button>
        </div>
      </div>`;
  }

  function bindBrand() {
    const map = [
      ["f_englishName", "englishName"],
      ["f_displayName", "displayName"],
      ["f_handle", "handle"],
      ["f_bioLink", "bioLink"],
      ["f_bio", "bio"],
      ["f_cta", "cta"],
      ["f_disclaimerShort", "disclaimerShort"]
    ];
    map.forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", () => {
        state.brand[key] = el.value;
        saveState();
        if (key === "displayName" || key === "handle" || key === "bio") {
          // light re-render preview only when leaving would be better; keep simple save
        }
      });
    });
    document.getElementById("copyBioBtn")?.addEventListener("click", () => copyText(state.brand.bio, " Bio"));
    document.getElementById("copyNameBtn")?.addEventListener("click", () => copyText(state.brand.displayName, " 顯示名稱"));
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
          <strong>第一個帳號目標：</strong>以「${escapeHtml(b.displayName)}」建立
          <strong>Instagram + Threads 同一品牌號</strong>（使用者名稱建議 <strong>@${escapeHtml(b.handle)}</strong>）。
          這是你的個人品牌主帳，之後有登錄字號再考慮第二品牌或加註。
        </div>
        <div class="grid-2">
          <div class="card">
            <h3>一鍵複製資料</h3>
            <p>顯示名稱：<strong>${escapeHtml(b.displayName)}</strong></p>
            <p>使用者名稱：<strong>@${escapeHtml(b.handle)}</strong></p>
            <button type="button" class="btn small" id="accCopyName">複製顯示名稱</button>
            <button type="button" class="btn small" id="accCopyHandle">複製使用者名稱</button>
            <button type="button" class="btn small" id="accCopyBio">複製 Bio</button>
          </div>
          <div class="card">
            <h3>官方入口</h3>
            <ul>
              <li><a href="https://www.instagram.com/accounts/emailsignup/" target="_blank" rel="noopener">申請 Instagram</a></li>
              <li><a href="https://www.threads.net/" target="_blank" rel="noopener">開啟 Threads</a></li>
              <li><a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener">IG 登入後改專業帳號</a></li>
            </ul>
            <p>完成進度：<span class="badge info">${ap.done}/${ap.total}</span></p>
          </div>
        </div>
        <div class="checklist">${items}</div>
        <div class="card">
          <h3>定位文三則（開號後請發）</h3>
          <div class="tabs">
            <button type="button" class="tab active" data-pos="1">1 我是誰</button>
            <button type="button" class="tab" data-pos="2">2 我寫什麼</button>
            <button type="button" class="tab" data-pos="3">3 我不寫什麼</button>
          </div>
          <pre class="output" id="posOutput"></pre>
          <button type="button" class="btn small" id="copyPosBtn">複製此則</button>
        </div>
      </div>`;
  }

  function positioningPosts() {
    const b = state.brand;
    return {
      1: `你好，我是 ${b.englishName}，在${b.company}服務。\n\n這裡會用「研究摘要」的方式，分享台股與複委託的重點整理，幫你節省讀長報告的時間。\n\n我不是來喊單的，而是把資訊整理清楚，讓你自己做判斷。\n\n${b.disclaimerShort}`,
      2: `這個帳號會固定寫：\n\n・台股／產業研究重點\n・複委託與美股摘要\n・開戶前觀念與流程說明\n\n形式以 Threads 文字串 + IG 重點圖卡為主。\n如果你正在找可信的研究整理，歡迎追蹤。\n\n${b.disclaimerShort}`,
      3: `先說清楚我不會做的事：\n\n・不保證報酬\n・不提供私下跟單\n・不傳不明群組連結\n\n投資有風險，所有內容僅供研究分享。\n若你需要開戶或了解流程，可以走主頁連結或私訊我。\n\n${b.disclaimerShort}`
    };
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
    document.getElementById("accCopyHandle")?.addEventListener("click", () => copyText(state.brand.handle, " 使用者名稱"));
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

  function viewReport() {
    return `
      <div class="stack">
        <div class="dropzone" id="dropzone">
          拖曳報告到此，或
          <label class="btn small" style="display:inline-flex;margin-left:6px">
            選擇檔案
            <input type="file" id="fileInput" accept=".md,.txt,.markdown,.pdf,text/plain" hidden />
          </label>
          <div class="help" style="margin-top:8px">支援 .md / .txt / .pdf。也可直接在下方貼上文字。</div>
        </div>
        <div class="field">
          <label>報告內容</label>
          <textarea id="reportText" rows="12" placeholder="在此貼上研究報告...">${escapeHtml(state.reportText)}</textarea>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn primary" id="genBtn">產生重點與貼文</button>
          <button type="button" class="btn ghost" id="sampleBtn">載入示範報告</button>
          <button type="button" class="btn ghost" id="copyPostBtn">複製目前貼文</button>
        </div>
        ${state.summary ? `<div class="card"><h3>結構化重點</h3>
          <p>標題：${escapeHtml(state.summary.title)}</p>
          <p>標的：${escapeHtml(state.summary.primaryTicker || "—")} ｜ 市場：${escapeHtml(state.summary.market)} ｜ 建議帳號：@${escapeHtml(state.brand.handle)}</p>
          <ul>${(state.summary.keyPoints || []).map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
        </div>` : ""}
        <div>
          <div class="tabs">
            <button type="button" class="tab ${state.activePostTab === "threads" ? "active" : ""}" data-tab="threads">Threads</button>
            <button type="button" class="tab ${state.activePostTab === "ig" ? "active" : ""}" data-tab="ig">IG 輪播腳本</button>
            <button type="button" class="tab ${state.activePostTab === "landing" ? "active" : ""}" data-tab="landing">落地頁摘要</button>
          </div>
          <pre class="output" id="postOutput">${escapeHtml(state.posts[state.activePostTab] || "尚未產生貼文")}</pre>
        </div>
      </div>`;
  }

  function generateFromText(text, name) {
    if (!text || text.trim().length < 40) {
      toast("報告內容太短，請再貼多一點");
      return;
    }
    const summary = JCPipeline.structureReport(text, name || "pasted_report");
    state.reportText = text;
    state.reportName = name || "pasted_report";
    state.summary = summary;
    state.posts = {
      threads: JCPipeline.renderThreads(summary, state.brand),
      ig: JCPipeline.renderIgCarousel(summary, state.brand),
      landing: JCPipeline.renderLanding(summary, state.brand)
    };
    saveState();
    toast("已產生貼文草稿");
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
      toast("已載入示範報告，按「產生重點與貼文」");
    });
    document.getElementById("genBtn")?.addEventListener("click", () => {
      generateFromText(document.getElementById("reportText").value, state.reportName || "pasted_report");
    });
    document.getElementById("copyPostBtn")?.addEventListener("click", () => {
      copyText(state.posts[state.activePostTab] || "", " 貼文");
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
        state.reportName = name;
        state.reportText = text;
        saveState();
        generateFromText(text, name);
      } catch (e) {
        console.error(e);
        toast(e.message || "讀取檔案失敗");
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
    if (!state.posts.threads) {
      return `<div class="callout">請先在上一步產生貼文，再回來做合規檢查。</div>`;
    }
    const c = JCPipeline.checkCompliance(state.posts.threads);
    const badge =
      c.status === "PASS" ? "ok" : c.status === "WARN" ? "warn" : "fail";
    return `
      <div class="stack">
        <div class="card">
          <h3>檢查結果 <span class="badge ${badge}">${c.status}</span></h3>
          <ul>
            <li>禁用詞命中：${c.forbidden.length ? escapeHtml(c.forbidden.join("、")) : "無"}</li>
            <li>注意詞命中：${c.caution.length ? escapeHtml(c.caution.join("、")) : "無"}</li>
            <li>免責聲明：${c.hasDisclaimer ? "有" : "缺少"}</li>
            <li>風險表述：${c.hasRisk ? "有" : "建議補上"}</li>
          </ul>
          <p class="help">FAIL：不可發佈。WARN：可發但請人工確認（例如手續費話術需符合公司規範）。</p>
        </div>
        <div class="field">
          <label>可在此微調 Threads 文案後重新檢查</label>
          <textarea id="compEdit" rows="14">${escapeHtml(state.posts.threads)}</textarea>
        </div>
        <button type="button" class="btn primary" id="recheckBtn">儲存並重新檢查</button>
        <pre class="output" id="compOut">${escapeHtml(state.posts.threads)}</pre>
      </div>`;
  }

  function bindCompliance() {
    document.getElementById("recheckBtn")?.addEventListener("click", () => {
      const text = document.getElementById("compEdit").value;
      state.posts.threads = text;
      saveState();
      toast("已更新並重新檢查");
      render();
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
        <td>${r.platform}</td><td>${escapeHtml(r.pillar)}</td><td>${escapeHtml(r.notes)}</td>
      </tr>`
      )
      .join("");
    return `
      <div class="stack">
        <div class="callout">以 <strong>@${escapeHtml(state.brand.handle)}</strong> 單一主帳經營。先求每天 1 則高品質，再考慮加開第二帳。</div>
        <div style="display:flex;gap:8px">
          <button type="button" class="btn primary" id="regenPlan">重新產生 7 天規劃</button>
          <button type="button" class="btn ghost" id="copyPlan">複製規劃表</button>
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
      toast("已更新週曆");
    });
    document.getElementById("copyPlan")?.addEventListener("click", () => {
      const text = state.weekPlan
        .map((r) => `${r.date}(${r.weekLabel}) ${r.time} ${r.platform}｜${r.pillar}`)
        .join("\n");
      copyText(text, " 規劃");
    });
  }

  function viewPublish() {
    const p = state.publishChecks;
    const items = [
      ["reviewed", "已人工抽審數字與風險"],
      ["scheduled", "已排定發佈時間（依週曆）"],
      ["posted", "已發佈到 Threads／IG"],
      ["logged", "已記錄成效（讚、留言、私訊、開戶詢問）"]
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
        <div class="card">
          <h3>本次建議發佈</h3>
          <p>帳號：@${escapeHtml(state.brand.handle)}（${escapeHtml(state.brand.displayName)}）</p>
          <p>內容：${state.summary ? escapeHtml(state.summary.title) : "尚無草稿，請回「上傳報告轉貼文」"}</p>
        </div>
        <div class="checklist">${items}</div>
        <div class="field">
          <label>Threads 定稿（可直接複製）</label>
          <pre class="output">${escapeHtml(state.posts.threads || "尚無內容")}</pre>
          <button type="button" class="btn small" id="pubCopy">複製 Threads 定稿</button>
        </div>
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
    document.getElementById("pubCopy")?.addEventListener("click", () => copyText(state.posts.threads || "", " 定稿"));
  }

  function viewDone() {
    const ap = accountProgress();
    const pct = progressPercent();
    return `
      <div class="stack">
        <div class="hero-stats">
          <div class="stat"><span>整體完成度</span><b>${pct}%</b></div>
          <div class="stat"><span>帳號檢查</span><b>${ap.done}/${ap.total}</b></div>
          <div class="stat"><span>主帳</span><b>@${escapeHtml(state.brand.handle)}</b></div>
        </div>
        <div class="card">
          <h3>接下來 7 天建議（James）</h3>
          <ul>
            <li>D1：完成 IG + Threads 申請與 Bio（本流程第 3 步勾完）</li>
            <li>D1–D2：發 3 則定位文</li>
            <li>D3–D7：每天 1 則研究摘要（用本站「上傳報告轉貼文」）</li>
            <li>每則文末固定免責 + 開戶／諮詢 CTA</li>
            <li>登錄字號核准後，再更新簡介加註，不影響現在先經營個人品牌</li>
          </ul>
        </div>
        <div class="callout">
          此工具部署於 GitHub Pages，資料只存在你的瀏覽器（localStorage），不會上傳到伺服器。
          換裝置請自行匯出文案備份。
        </div>
        <button type="button" class="btn primary" id="goAccount">回帳號申請步驟</button>
      </div>`;
  }

  function bindDone() {
    document.getElementById("goAccount")?.addEventListener("click", () => {
      state.stepIndex = STEPS.findIndex((s) => s.id === "account");
      saveState();
      render();
    });
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

  function renderPanel() {
    const id = STEPS[state.stepIndex].id;
    const panel = document.getElementById("stepPanel");
    const views = {
      welcome: viewWelcome,
      brand: viewBrand,
      account: viewAccount,
      report: viewReport,
      compliance: viewCompliance,
      calendar: viewCalendar,
      publish: viewPublish,
      done: viewDone
    };
    panel.innerHTML = views[id]();
    const binders = {
      brand: bindBrand,
      account: bindAccount,
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
    document.getElementById("nextBtn").textContent =
      state.stepIndex === STEPS.length - 1 ? "完成" : "下一步";
  }

  function init() {
    if (window.pdfjsLib) {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
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
      } else {
        toast("流程已就緒，開始申請帳號與發文吧");
      }
    });
    document.getElementById("resetBtn").addEventListener("click", () => {
      if (confirm("確定清除本機進度？品牌與勾選會重設。")) {
        state = defaultState();
        saveState();
        render();
        toast("已重置");
      }
    });
    render();
  }

  init();
})();
