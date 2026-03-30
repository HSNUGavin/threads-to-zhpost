# Threads 串文翻譯成 FB 貼文

將 Threads 串文爬下來，翻譯成繁體中文，格式化為 Facebook 貼文，並產生封面圖。

## 使用方式

```
/threads-to-fb <threads-url>
```

## 參數

- `$ARGUMENTS` — Threads 貼文的完整 URL（例如 `https://www.threads.com/@username/post/XXXXX`）

## 步驟

### 1. 爬取 Threads 內容

用 Puppeteer 爬取指定的 Threads 貼文，包含主貼文和所有回覆串文：

```bash
node scrape-threads.js "$ARGUMENTS"
```

如果 puppeteer 沒安裝，先執行 `npm install`。

### 2. 分析內容結構

辨識原文中的：
- 主標題/開場白
- 每個編號的 tip/要點
- 補充說明和連結
- 作者資訊（名稱、帳號、身份）

### 3. 翻譯成繁體中文

- 用自然口語的繁體中文翻譯，語氣像「同事推薦好工具」
- 保留程式碼片段和指令不翻譯（如 `claude --teleport`、`/loop`）
- 保留 URL 不翻譯
- 專有名詞保留英文（Claude Code、Anthropic 等）

### 4. 格式化為 FB 貼文

- 開頭 2-3 句口語 hook
- 用 ⸺ 分隔線區隔摘要和正文
- 每個要點用 emoji + 數字/ 格式（如 📱 1/）
- 每個要點加一句短評說明為什麼重要
- 結尾加互動提問 + 原文出處 + hashtag
- 總長度不超過 3000 字

### 5. 產生封面圖

用 `/generate-cover` 的邏輯產生宣傳圖。爬取作者頭像後執行：

```bash
node generate-image.js --config '{
  "platform": "threads",
  "variant": "dark",
  "authorName": "<作者名>",
  "authorHandle": "<作者帳號>",
  "authorRole": "<作者身份>",
  "avatarPath": "assets/<作者帳號>-avatar.jpg",
  "headlineSmall": "<小字標題>",
  "headlineBig1": "<大字第一行>",
  "headlineBig2": "<大字第二行>",
  "subtitle": "<副標題>",
  "footerLeft": "繁體中文翻譯整理",
  "footerRight": "<日期>",
  "output": "output/<作者帳號>-<主題>-dark.png"
}'
```

也產生一張 light 版（variant: "light"）。

### 6. 輸出

檔名格式統一為 `{作者帳號}-{主題}-{variant}.{ext}`：

- 文案：`output/{作者帳號}-{主題}.md`
- 封面圖 dark：`output/{作者帳號}-{主題}-dark.png`
- 封面圖 light：`output/{作者帳號}-{主題}-light.png`

顯示文案預覽和圖片供使用者確認。
