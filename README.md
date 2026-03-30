# social-auto-post

Claude Code skill：將 Threads 串文爬下來、翻譯成繁體中文、格式化成 Facebook 貼文。

## 安裝

```bash
npm install
```

## Claude Code Skill 使用方式

在 Claude Code 中執行：

```
/threads-to-fb https://www.threads.com/@username/post/XXXXX
```

## 獨立使用爬蟲

```bash
node scrape-threads.js <threads-url>
```

## 檔案結構

```
.claude/commands/threads-to-fb.md  — Claude Code skill 定義
scrape-threads.js                  — Puppeteer 爬蟲
output/                            — 翻譯後的 FB 貼文輸出
```
