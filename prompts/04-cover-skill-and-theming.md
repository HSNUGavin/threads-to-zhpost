# Step 4：封面圖 Skill 化與多平台配色

## Prompt

產生圖片的部分，是否也可以做成 skill？然後根據貼文來源平台自動生成對應的配色。

## 產出

- `templates/cover-template.html` — 參數化 HTML 模板，支援 6 種配色主題
- `generate-image.js` — 重寫為支援 JSON config 輸入
- `.claude/commands/generate-cover.md` — `/generate-cover` skill
- `.claude/commands/threads-to-fb.md` — 更新，整合封面圖產生

## 支援的平台配色

| 平台 | Dark | Light |
|------|------|-------|
| Threads | 黑底 + 橘色 | Claude 米色底 + 深橘 |
| X (Twitter) | 純黑 + 藍色 | 白底 + 藍色 |
| LinkedIn | — | 灰底 + 藍色 |
| Reddit | 深灰 + 橘色 | — |
