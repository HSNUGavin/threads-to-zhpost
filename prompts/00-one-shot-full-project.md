# One-Shot Prompt：一次建出整個 threads-to-zhpost 專案

如果要用一個 prompt 從零到完成，可以這樣下：

---

## Prompt

我要建一個 Claude Code skill 專案，功能是把 Threads 串文翻譯成繁體中文的 Facebook 貼文，並自動產生宣傳封面圖。請完成以下所有步驟：

### 1. 爬蟲
- 用 Puppeteer 寫一個 `scrape-threads.js`，輸入 Threads URL，輸出 JSON（包含所有串文內容）
- Threads 是 JS 渲染的頁面，需要 headless browser

### 2. 翻譯與 FB 貼文格式
- 把爬到的英文內容翻譯成繁體中文
- 格式化為 Facebook 貼文風格：口語化 hook 開頭、emoji 引導段落、保留程式碼和指令原文、結尾加互動提問和 hashtag
- 參考台灣科技圈 FB 貼文風格（像同事推薦工具的語氣，不是新聞稿）

### 3. 封面圖產生器
- 用 HTML + CSS 做一個參數化模板 `templates/cover-template.html`
- 支援多平台配色主題（透過 CSS class 切換）：
  - Threads dark：黑底 + 橘色強調
  - Threads light：Claude 米色底 + 深橘
  - X dark：純黑 + Twitter 藍
  - X light：白底 + 藍色
  - LinkedIn：灰底 + 藍色
  - Reddit：深灰 + Reddit 橘
- 模板用 placeholder（`{{AUTHOR_NAME}}`、`{{HEADLINE_BIG_1}}` 等）讓 `generate-image.js` 替換
- `generate-image.js` 接受 `--config` JSON 參數，包含 platform、variant、作者資訊、標題、副標等
- 用 Puppeteer 截圖產生 1200×1200 PNG
- 自動抓取原文作者頭像嵌入圖片

### 4. 圖片設計原則
- 簡潔為主，不超過三層資訊：來源平台 → 作者 → 主標題
- 主標題用大小對比（小字帶 context，大字是主訊息），橘色/藍色強調動作詞和數字
- 所有文字要手機上看得清楚（最小 40px+）
- 產出 dark 和 light 兩版

### 5. Claude Code Skills
建立兩個 skill：

**`.claude/commands/threads-to-fb.md`** — `/threads-to-fb <url>`
- 爬取 Threads 串文
- 翻譯成繁體中文 FB 貼文
- 產生 dark + light 封面圖
- 輸出檔名格式：`{作者帳號}-{主題}-{variant}.{ext}`

**`.claude/commands/generate-cover.md`** — `/generate-cover`
- 根據對話 context 或參數產生封面圖
- 自動選配色（根據來源平台）

### 6. Repo 整理
- Repo 名稱：`threads-to-zhpost`
- 加上 MIT License
- README 包含安裝說明、skill 用法、CLI 用法、檔案結構、範例產出
- 加上中英雙語免責聲明（實驗性專案、爬蟲 ToS、著作權、頭像、風險自負）
- `.gitignore` 排除 node_modules、.env

### 7. 測試
- 用 sub-agent 跑端到端測試：分別測試 Threads dark、Threads light、X dark 三種配色
- 用一個不同的 Threads URL 測試完整 pipeline（爬取 → 翻譯 → 產圖）

先建好 repo 再 push 到 GitHub。

---

## 預期檔案結構

```
threads-to-zhpost/
├── .claude/commands/
│   ├── threads-to-fb.md
│   └── generate-cover.md
├── templates/
│   └── cover-template.html
├── assets/
│   └── (作者頭像)
├── output/
│   └── (產出的貼文和圖片)
├── prompts/
│   └── (prompt 記錄)
├── scrape-threads.js
├── generate-image.js
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

## 使用建議

- 這個 one-shot prompt 很長，但每一段都有對應的驗收標準
- 實際使用時建議拆成 2-3 輪對話會更容易迭代
- 圖片設計很難一次到位，預留迭代空間
- 最容易被忽略的是「手機上字要夠大」— 記得提醒
