# Step 1：爬取 Threads 串文並翻譯成 FB 貼文

## Prompt

這是一個空的 repo。需求如下：

1. 寫一個爬蟲（或使用 Chrome MCP）讀取這個 Threads 貼文及其串文內容
2. 將內容翻譯成繁體中文
3. 格式化為 Facebook 貼文形式
4. 做成 Claude Code skill
5. 上傳到 GitHub 分享

URL：https://www.threads.com/@boris_cherny/post/DWfjnqGFPHE

## 產出

- `scrape-threads.js` — Puppeteer 爬蟲腳本
- `output/fb-post-boris-claude-code.md` — 翻譯後的 FB 貼文
- `.claude/commands/threads-to-fb.md` — Claude Code skill 定義
- GitHub repo 建立並推送
