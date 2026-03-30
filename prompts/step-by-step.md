# threads-to-zhpost 製作過程

用 Claude Code 從一個空 repo 做出完整的 Threads 翻譯 skill，以下是每一步的 prompt 和 AI 的回應。

---

## Step 1：起手

### 我說

> 這是空的 repo，需求是寫爬蟲或用 Chrome MCP 讀這個 Threads 串文，翻譯成中文變成 FB 貼文形式，做成 skill 然後上傳到 GitHub 分享
> https://www.threads.com/@boris_cherny/post/DWfjnqGFPHE

### AI 做了什麼

- 先試 Chrome MCP 讀頁面 → `get_page_content` 一直報錯
- 改用 WebFetch → Threads 是 JS 渲染，拿到的都是 CSS 變數
- 最後寫了 Puppeteer 爬蟲，成功抓到 15 條串文內容
- 翻譯成中文 FB 貼文
- 建了 `/threads-to-fb` skill
- 建 GitHub repo 並推送

---

## Step 2：做宣傳圖 + 改文案

### 我說

> 1. 幫我做一張 FB 宣傳圖片，儘量還原 Threads 的原文但翻譯，上面加一個標題
> 2. 文字內容可否再吸引人好閱讀一點，本地化。搜尋其他人都怎樣寫文的去模仿，不是要過度吸引，只是閱讀起來比較順

### AI 做了什麼

- 派 sub-agent 搜尋台灣科技圈的 FB 貼文風格
- 用 HTML + CSS 做了一張深色卡片，列出全部 15 個功能
- Puppeteer 截圖產生 PNG
- 重寫文案，改成比較口語的風格，加了 emoji 和互動提問

---

## Step 3：圖片來回修改

這段改最久，前後大概 7 輪。

### 3a

> 圖片字太多，應該要想好重點，例如 Claude Code 創造者自己分享的，然後可以截圖他的頭像，簡潔有吸引力，字大一點

AI 砍掉功能列表，改成大標題 + 頭像 + 副標。從 Threads 頁面爬了 Boris 的頭像。

### 3b

> 標語怎麼樣可以強調剛分享？

AI 把「分享」改成橘色的「剛公開」。

### 3c

> 15 個隱藏功能好像也該強調

AI 把「剛公開 15 個隱藏功能」整段變橘色。

### 3d

> 排版看一下

AI 重新看了圖片，自己發現偏上、空白太多、文字黏在一起，主動修了。

### 3e

> 給我 v2 版本，標題文字大小不同呢？

AI 做了大小對比版：小字「Claude Code 創造者」+ 大字「剛公開 15 個隱藏功能」。

### 3f

> 原本版本可以留著嗎，有 v1 v2，另外再給我一個 Claude 淺底色的版本

AI 保留 v1、v2，新增 v3 淺色版，三版一起給我看。

### 3g

> 留 v2 dark v3 light 但是字都大一點，手機閱讀方便

AI 全部元素放大，刪掉 v1。

---

## Step 4：圖片產生也做成 skill

### 我說

> 產圖片的部分是否也可以有 skill？然後根據貼文來源生成配色之類

### AI 做了什麼

- HTML 模板改成參數化，用 CSS variables 切 6 種配色（Threads / X / LinkedIn / Reddit 的 dark/light）
- `generate-image.js` 改成吃 JSON config
- 建了 `/generate-cover` skill
- 更新 `/threads-to-fb` 整合產圖

---

## Step 5：收尾

### 5a 整理資料夾

> 進行完整規劃，幫我清理一下資料夾，變成我可以在 GitHub repo 分享的 skill

AI 刪舊檔、整理結構、更新 README。

### 5b 改名

> repo 我想改名 threads-to..? 中文貼文？

AI 給了 4 個選項，我選了 `threads-to-zhpost`，AI 用 gh CLI 改名並更新所有引用。

### 5c 標準化 + 測試

> 文檔都更新一下，然後圖片名字應該要標準化，另外跑 sub agent 測試一下產出

AI 把檔名統一成 `{作者}-{主題}-{variant}.png`，派 sub-agent 測了 Threads dark / light / X dark 三種，全過。

### 5d 用新 URL 測整個流程

> 測試這個看看 https://www.threads.com/@boris_cherny/post/DWFohOyE1on

AI 派 sub-agent 跑完整 pipeline。這篇是 Channels 新功能發布（不是 tips 列表），AI 自己判斷出來並調整了標題和文案結構。

### 5e 免責聲明

> 我的 repo 是否要放免責聲明？是否有法律責任，只是實驗性質的專案

AI 列出風險點（爬蟲 ToS、著作權、頭像、無關聯性），加了 MIT License + 中英雙語 disclaimer。

---

## 總共用了大概 15 輪 prompt

| 步驟 | 輪數 | 重點 |
|------|------|------|
| 起手 | 1 | 給方向就好，AI 自己找路 |
| 做圖 + 文案 | 1 | 可以同時要多件事 |
| 圖片迭代 | 7 | 花最多時間的地方 |
| Skill 化 | 1 | 一句話就能擴展功能 |
| 收尾測試 | 5 | sub-agent 測試很好用 |
