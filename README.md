# threads-to-zhpost

**[English](README.en.md)** | 繁體中文

> **Experimental / 實驗性專案** — 這是一個 Claude Code skill 的概念驗證，僅供學習和研究用途。

Claude Code skills：把社群串文（Threads、X 等）爬下來、翻譯成繁體中文、格式化成 Facebook 貼文、自動產生宣傳封面圖。

這個 repo 也包含了完整的製作過程，記錄了每一步的 prompt 和 AI 的回應：
- [製作過程（Step by Step）](prompts/step-by-step.md)
- [一個 Prompt 重建整個專案](prompts/one-shot.md)

## 安裝

```bash
git clone https://github.com/HSNUGavin/threads-to-zhpost.git
cd threads-to-zhpost
npm install
```

## Skills

### `/threads-to-fb` — 一鍵完成 Threads → FB 貼文

```
/threads-to-fb https://www.threads.com/@username/post/XXXXX
```

自動爬取串文 → 翻譯成繁體中文 → 格式化 FB 貼文 → 產生 dark/light 兩版封面圖。

### `/generate-cover` — 社群貼文封面圖產生器

根據來源平台自動配色，產生 1200×1200 宣傳圖。

支援平台配色：

| 平台 | Dark | Light |
|------|------|-------|
| Threads | 黑底 + 橘色 | Claude 米色底 |
| X (Twitter) | 純黑 + 藍色 | 白底 + 藍色 |
| LinkedIn | — | 灰底 + 藍色 |
| Reddit | 深灰 + 橘色 | — |

## 獨立使用

### 爬 Threads 串文

```bash
node scrape-threads.js <threads-url>
```

### 產生封面圖（JSON config）

```bash
node generate-image.js --config '{
  "platform": "threads",
  "variant": "dark",
  "authorName": "Boris Cherny",
  "authorHandle": "boris_cherny",
  "authorRole": "Anthropic｜Head of Claude Code",
  "avatarPath": "assets/boris-avatar.jpg",
  "headlineSmall": "Claude Code 創造者",
  "headlineBig1": "剛公開",
  "headlineBig2": "15 個隱藏功能",
  "subtitle": "他每天都在用，但很多人不知道的功能",
  "footerLeft": "繁體中文翻譯整理",
  "footerRight": "2026.03.30",
  "output": "output/boris-cherny-claude-code-dark.png"
}'
```

## 檔案結構

```
.claude/commands/
  threads-to-fb.md       # Skill: Threads → FB 貼文
  generate-cover.md      # Skill: 封面圖產生器
templates/
  cover-template.html    # 參數化 HTML 模板（6 種平台配色）
generate-image.js        # Puppeteer 截圖腳本（支援 JSON config）
scrape-threads.js        # Threads 爬蟲
output/                  # 產出的貼文和圖片
assets/                  # 頭像等素材
```

## 範例產出

Dark 版封面圖：

![Dark](output/boris-cherny-claude-code-dark.png)

Light 版封面圖：

![Light](output/boris-cherny-claude-code-light.png)

## Disclaimer / 免責聲明

This project is an **experimental proof-of-concept** for Claude Code skills, intended for educational and research purposes only.

- **Web scraping**: This tool scrapes publicly accessible social media content. Users are responsible for complying with the terms of service of the respective platforms (Meta/Threads, X, etc.).
- **Copyright**: Translated and reformatted content remains the intellectual property of the original authors. Always credit the original source and obtain permission before publishing translated content.
- **Avatars & media**: Profile images and media are fetched for local preview purposes. Do not redistribute without permission.
- **No affiliation**: This project is not affiliated with, endorsed by, or associated with Meta, Anthropic, or any social media platform.
- **Use at your own risk**: The authors of this project assume no liability for how it is used. You are solely responsible for ensuring your use complies with applicable laws and platform policies.

---

本專案為 Claude Code skill 的**實驗性概念驗證**，僅供學習與研究用途。

- **爬蟲**：本工具爬取公開的社群媒體內容。使用者有責任遵守各平台（Meta/Threads、X 等）的服務條款。
- **著作權**：翻譯和重新排版的內容，著作權仍屬於原作者。發布前請務必標註原文出處，並取得原作者同意。
- **頭像與媒體**：頭像圖片僅供本地預覽使用，請勿未經授權轉發。
- **無關聯性**：本專案與 Meta、Anthropic 或任何社群平台無關，也未獲得任何官方背書。
- **風險自負**：專案作者不對任何使用方式承擔法律責任。使用者應自行確保符合相關法律與平台規範。

## License

[MIT](LICENSE)
