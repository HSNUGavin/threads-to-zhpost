# 內容生產管道規格（Content Production Pipeline）

社群串文 → 繁體中文 FB 貼文的自動化管道，共 4 個階段。

## 管道總覽

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Stage 1 │────▶│ Stage 2 │──┬─▶│ Stage 3 │
│  爬取   │     │  翻譯   │  │  │ 封面圖  │
└─────────┘     └─────────┘  │  └─────────┘
                             │  ┌─────────┐
                             └─▶│ Stage 4 │
                                │ FB 貼文  │
                                └─────────┘
```

**執行順序**：Stage 1 → Stage 2 → Stage 3 + Stage 4（可並行）

---

## Stage 1：爬取（Scrape）

| 項目 | 說明 |
|------|------|
| **輸入** | Threads URL（例如 `https://www.threads.com/@username/post/XXXXX`） |
| **執行** | `node scrape-threads.js <url>` |
| **輸出** | `raw.json` |
| **工具** | Puppeteer headless browser（Threads 是 JS 渲染，curl 拿不到） |

### 輸出格式

```json
{
  "url": "https://www.threads.com/@boris_cherny/post/DWfjnqGFPHE",
  "posts": ["post text 1", "post text 2", "..."],
  "scrapedAt": "2026-04-02T12:00:00.000Z"
}
```

### 驗收標準

- [ ] 輸出為合法 JSON
- [ ] `posts` 陣列非空（至少 1 筆）
- [ ] `url` 欄位與輸入一致
- [ ] `scrapedAt` 為合法 ISO 時間戳

---

## Stage 2：翻譯（Translate）

| 項目 | 說明 |
|------|------|
| **輸入** | `raw.json`（Stage 1 產出） |
| **輸出** | `translated.json` |
| **工具** | Claude（LLM 翻譯 + 內容結構分析） |

### 翻譯規則

- 自然口語的繁體中文，語氣像「同事推薦好工具」
- 程式碼片段和指令保留原文（如 `claude --teleport`、`/loop`）
- URL 保留原文
- 專有名詞保留英文（Claude Code、Anthropic 等）

### 輸出格式

```json
{
  "sourceUrl": "<原始 URL>",
  "author": {
    "name": "作者名",
    "handle": "帳號",
    "role": "身份描述"
  },
  "topic": "<主題簡述>",
  "headlineSmall": "<小字標題>",
  "headlineBig1": "<大字第一行>",
  "headlineBig2": "<大字第二行>",
  "subtitle": "<副標題>",
  "translatedPosts": ["翻譯後的文字 1", "..."],
  "fbPostBody": "<完整 FB 貼文內容>",
  "hashtags": ["#ClaudeCode", "#AI", "..."]
}
```

### FB 貼文格式規範

- 開頭 2-3 句口語 hook
- 每個要點用 emoji 或數字格式（如 `1.`）
- 每個要點加一句短評說明為什麼重要
- 結尾加互動提問 + 原文出處 + hashtag
- 總長度不超過 3000 字

### 驗收標準

- [ ] `translatedPosts` 至少 5 筆
- [ ] `fbPostBody` 長度 > 500 字元
- [ ] 包含至少一個 hashtag
- [ ] 包含原文出處（`原文出處` + URL）
- [ ] 內容為繁體中文（含「的」「是」「功能」等常見字）
- [ ] 程式碼指令保持英文原文

---

## Stage 3：封面圖（Cover Image）

| 項目 | 說明 |
|------|------|
| **輸入** | `translated.json`（Stage 2 產出） |
| **輸出** | `cover-{variant}.png`（1200×1200） |
| **執行** | `node generate-image.js --config '<JSON>'` |
| **工具** | Puppeteer 截圖 + HTML 模板（`templates/cover-template.html`） |

### Config JSON

```json
{
  "platform": "threads",
  "variant": "dark",
  "authorName": "<from translated.json author.name>",
  "authorHandle": "<from translated.json author.handle>",
  "authorRole": "<from translated.json author.role>",
  "avatarPath": "assets/<handle>-avatar.jpg",
  "headlineSmall": "<from translated.json>",
  "headlineBig1": "<from translated.json>",
  "headlineBig2": "<from translated.json>",
  "subtitle": "<from translated.json>",
  "footerLeft": "繁體中文翻譯整理",
  "footerRight": "<日期 YYYY.MM.DD>",
  "output": "<output path>"
}
```

### 支援平台配色

| 平台 | Dark | Light |
|------|------|-------|
| Threads | 黑底 + 橘色 | Claude 米色底 + 深橘 |
| X (Twitter) | 純黑 + 藍色 | 白底 + 藍色 |
| LinkedIn | — | 灰底 + 藍色 |
| Reddit | 深灰 + 橘色 | — |

### 圖片設計原則

- 三層資訊：來源平台 → 作者（含頭像）→ 主標題
- 大小對比：小字帶 context，大字是主訊息
- 手機友善：最小字 40px 以上

### 驗收標準

- [ ] PNG 檔案存在
- [ ] 檔案大小 > 10KB
- [ ] 尺寸為 1200×1200

---

## Stage 4：組裝 FB 貼文（Assemble）

| 項目 | 說明 |
|------|------|
| **輸入** | `translated.json`（Stage 2 產出） |
| **輸出** | `fb-post.md` |
| **工具** | 文字組裝（無外部依賴） |

### 輸出格式

```markdown
# FB 貼文：<topic>

> 來源：<sourceUrl>
> 作者：<author.name> (@<author.handle>) — <author.role>
> 翻譯日期：<YYYY-MM-DD>

---

<fbPostBody>

---

## 封面圖

- Dark 版：`<cover-dark path>`
- Light 版：`<cover-light path>`（如有）

## 發布 Checklist

- [ ] 確認翻譯內容正確
- [ ] 確認封面圖品質
- [ ] 標註原文出處
- [ ] 選擇發布時間
```

### 驗收標準

- [ ] 檔案長度 > 500 字元
- [ ] 包含原始 URL
- [ ] 包含至少一個 hashtag
- [ ] 包含作者名稱
- [ ] `fbPostBody` 內容完整

---

## 檔名規範

所有產出統一命名為 `{作者帳號}-{主題}-{variant}.{ext}`：

| 類型 | 格式 | 範例 |
|------|------|------|
| 原始資料 | `raw.json` | `raw.json` |
| 翻譯資料 | `translated.json` | `translated.json` |
| FB 貼文 | `{handle}-{topic}.md` | `boris-cherny-claude-code.md` |
| 封面圖 dark | `{handle}-{topic}-dark.png` | `boris-cherny-claude-code-dark.png` |
| 封面圖 light | `{handle}-{topic}-light.png` | `boris-cherny-claude-code-light.png` |

---

## Agent 並行化策略

```
Timeline:
────────────────────────────────────────────────
Agent 1 (爬取)    ██████████
Agent 2 (翻譯)              ████████████████████
Agent 3 (封面圖)                                 ██████████
Agent 4 (FB 貼文)                                ██████████
────────────────────────────────────────────────
                  sequential ──▶  sequential ──▶ parallel ─▶
```

- **Agent 1 → Agent 2**：必須依序執行（翻譯需要原始資料）
- **Agent 3 + Agent 4**：可並行執行（各自只依賴 translated.json）
- 每個 Agent 在寫入前必須驗證輸出符合驗收標準
