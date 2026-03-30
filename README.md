# social-auto-post

Claude Code skills：把社群串文（Threads、X 等）爬下來、翻譯成繁體中文、格式化成 Facebook 貼文、自動產生宣傳封面圖。

## 安裝

```bash
git clone https://github.com/HSNUGavin/social-auto-post.git
cd social-auto-post
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
  "output": "output/cover.png"
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

![V2 Dark](output/fb-cover-v2-dark-mixed.png)

Light 版封面圖：

![V3 Light](output/fb-cover-v3-light-claude.png)
