# One-Shot Prompt：一個 prompt 重建整個專案

把前面 15 輪對話濃縮成一個 prompt。丟給 Claude Code 就能從空 repo 建出完整專案。

---

## Prompt

```
我要建一個叫 threads-to-zhpost 的 Claude Code skill 專案。
功能：把 Threads 串文爬下來、翻譯成繁體中文 FB 貼文、自動產生宣傳封面圖。

用這個 URL 當範例：https://www.threads.com/@boris_cherny/post/DWfjnqGFPHE

請完成以下所有步驟：

1. 爬蟲（scrape-threads.js）
   - Puppeteer headless browser（Threads 是 JS 渲染，curl 拿不到）
   - 輸入 Threads URL，輸出 JSON

2. 翻譯 + FB 貼文（output/{作者}-{主題}.md）
   - 繁體中文，口語化，像同事推薦工具的語氣
   - emoji 引導段落、保留程式碼原文、結尾互動提問 + hashtag

3. 封面圖產生器
   - 參數化 HTML 模板 templates/cover-template.html
   - CSS variables 切換平台配色：
     Threads dark/light、X dark/light、LinkedIn、Reddit
   - generate-image.js 接受 --config JSON，Puppeteer 截圖 1200×1200 PNG
   - 自動從原文頁面爬作者頭像
   - 圖片設計原則：
     - 三層資訊：來源平台 → 作者（含頭像）→ 主標題
     - 大小對比：小字帶 context，大字是主訊息
     - 手機友善：最小字 40px 以上
     - 產出 dark + light 兩版

4. Claude Code Skills
   - /threads-to-fb <url>：爬取 → 翻譯 → 產圖，一條龍
   - /generate-cover：獨立產圖，根據平台自動配色

5. Repo 整理
   - 檔名格式：{作者帳號}-{主題}-{variant}.{ext}
   - MIT License + 中英雙語免責聲明
   - README：安裝、skill 用法、CLI 用法、範例產出
   - .gitignore 排除 node_modules、.env

6. 測試
   - 跑 sub-agent 端到端測試：Threads dark、light、X dark
   - 再用另一個 Threads URL 測試完整 pipeline

建好後 push 到 GitHub。
```

---

## 預期產出

```
threads-to-zhpost/
├── .claude/commands/
│   ├── threads-to-fb.md         # /threads-to-fb skill
│   └── generate-cover.md        # /generate-cover skill
├── templates/
│   └── cover-template.html      # 參數化模板（6 種配色）
├── assets/                      # 作者頭像
├── output/                      # 貼文 + 封面圖
├── prompts/                     # prompt 紀錄
├── scrape-threads.js            # Threads 爬蟲
├── generate-image.js            # 封面圖產生器
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

## 使用建議

這個 one-shot prompt 能跑，但圖片設計很難一次到位。建議：

- **先跑這個 prompt** 拿到 80% 的成果
- **再花 5-8 輪迭代圖片**：簡化、放大、調排版、多版本比較
- 迭代時用短指令最有效：「字大一點」「排版看一下」「保留這版再給我一個淺色的」
