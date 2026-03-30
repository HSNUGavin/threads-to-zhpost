# 社群貼文封面圖產生器

根據來源平台自動配色，產生 1200x1200 的社群宣傳圖片。

## 使用方式

```
/generate-cover
```

Claude 會根據對話 context 自動判斷平台和內容，或你可以直接指定。

## 參數（透過 `$ARGUMENTS` 或對話提供）

可以用自然語言描述，例如：
- `/generate-cover threads dark Boris Cherny 的 15 個隱藏功能`
- `/generate-cover x light Andrej Karpathy 的 AI 訓練技巧`

## 步驟

1. **確認資訊**：從對話 context 或參數中取得以下資訊：
   - `platform`：來源平台（threads / x / linkedin / reddit）
   - `variant`：配色（dark / light）— 如果使用者沒指定，根據平台預設：
     - threads → 提供 dark + light 兩版
     - x → dark
     - linkedin → light
     - reddit → dark
   - `authorName`：原作者名稱
   - `authorHandle`：原作者帳號（不含 @）
   - `authorRole`：原作者身份描述
   - `avatarPath`：頭像圖片路徑（如果沒有，先用 Puppeteer 從原文連結爬取）
   - `headlineSmall`：小字標題行（通常是「XXX 創造者」或「XXX 分享」）
   - `headlineBig1`：大字標題第一行
   - `headlineBig2`：大字標題第二行
   - `subtitle`：副標題
   - `footerLeft`：左下角文字
   - `footerRight`：右下角文字（通常是日期）

2. **建立 config JSON**：組合成 JSON 物件。

3. **產生圖片**：執行：
```bash
node generate-image.js --config '<JSON>'
```

4. **檢查產出**：讀取產出的 PNG 檔案確認視覺效果。如果有排版問題（文字截斷、重疊等）直接修正後重新產生。

5. **顯示結果**：告訴使用者圖片路徑。

## 支援的平台配色

| 平台 | Dark | Light |
|------|------|-------|
| threads | 黑底 + 橘色強調 | Claude 米色底 + 深橘強調 |
| x | 純黑底 + Twitter 藍 | 白底 + Twitter 藍 |
| linkedin | — | LinkedIn 灰底 + 藍色強調 |
| reddit | 深灰底 + Reddit 橘 | — |
