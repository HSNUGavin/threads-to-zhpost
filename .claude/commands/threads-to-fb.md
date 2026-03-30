# Threads 串文翻譯成 FB 貼文

將 Threads 串文爬下來，翻譯成繁體中文，並格式化為 Facebook 貼文。

## 使用方式

```
/threads-to-fb <threads-url>
```

## 參數

- `$ARGUMENTS` — Threads 貼文的完整 URL（例如 `https://www.threads.com/@username/post/XXXXX`）

## 步驟

1. **爬取 Threads 內容**：用 Puppeteer 爬取指定的 Threads 貼文，包含主貼文和所有回覆串文。執行以下指令：

```bash
node scrape-threads.js "$ARGUMENTS"
```

如果 `scrape-threads.js` 不存在或 puppeteer 沒安裝，先安裝：
```bash
npm install puppeteer
```

2. **分析內容結構**：辨識原文中的：
   - 主標題/開場白
   - 每個編號的 tip/要點
   - 補充說明和連結
   - 作者資訊

3. **翻譯成繁體中文**：
   - 用自然的繁體中文翻譯，保持技術術語的準確性
   - 保留原始的程式碼片段和指令（如 `claude --teleport`、`/loop`）不翻譯
   - 保留 URL 不翻譯
   - 專有名詞（如 Claude Code、Anthropic）保留英文

4. **格式化為 FB 貼文**：
   - 開頭加一段吸引人的中文摘要（2-3 句話）
   - 用分隔線 `---` 區隔摘要和正文
   - 每個要點用 `數字/` 格式編號
   - 用粗體或引用強調關鍵功能名稱
   - 結尾加上原文出處和 hashtag（#ClaudeCode #AI #CodingTips 等）
   - 總長度控制在 FB 友善的範圍（不超過 3000 字）

5. **輸出結果**：將翻譯完成的 FB 貼文存到 `output/` 資料夾，檔名格式：
   ```
   output/fb-post-{作者名}-{主題關鍵字}.md
   ```

6. **顯示預覽**：在終端顯示完成的 FB 貼文內容供使用者確認。
