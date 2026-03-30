Claude Code 的創造者 Boris Cherny 剛宣布了一個讓人興奮的新功能 — Claude Code Channels。簡單說就是：你現在可以用手機上的 Telegram 或 Discord，直接跟正在跑的 Claude Code session 對話。

不用在電腦前面也能操控你的 coding agent，這個工作流太香了。

⸺

📱 什麼是 Claude Code Channels？

Channels 讓你透過外部通訊平台（目前支援 Telegram 和 Discord）連進 Claude Code session。不是只能看，是真的能雙向互動 — 傳訊息給 Claude、收回覆、甚至讓它幫你處理檔案。

用 Boris 的原話：直接從手機 message Claude Code。

⚡ Telegram 設定方式

1. 在 Telegram 找 @BotFather，建一個新 bot 拿到 token
2. 在 Claude Code 裝 plugin：
   /plugin install telegram@claude-plugins-official
3. 設定 token：
   /telegram:configure <你的token>
4. 用 channels 模式啟動：
   claude --channels plugin:telegram@claude-plugins-official
5. 在 Telegram DM 你的 bot，拿到配對碼後回 Claude Code 輸入：
   /telegram:access pair <code>

💬 Discord 設定方式

流程類似 — 到 Discord Developer Portal 建 Application、開 bot、邀進 server，然後一樣裝 plugin、設 token、配對。

   /plugin install discord@claude-plugins-official
   /discord:configure <你的token>
   claude --channels plugin:discord@claude-plugins-official

🔧 Claude 能透過 Channel 做什麼？

→ reply — 回覆訊息，支援傳圖片和檔案
→ react — 加 emoji 反應
→ edit_message — 編輯之前發過的訊息
→ Discord 還多了 fetch_messages 和 download_attachment

🚀 使用情境

想像你在通勤的路上，手機 Telegram 傳一句「幫我跑一下測試然後把結果貼回來」— Claude Code 就直接在你的本機 session 執行，結果傳回你手機。

或是你在開會，突然想到一個 bug，直接 Discord 訊息叫 Claude 去查、去修、回報結果。不用開電腦。

⸺

這個功能目前是 research preview，Boris 說後續會持續擴充支援更多平台。

原文來自 Threads @boris_cherny
Boris Cherny 是 Anthropic 工程師、Claude Code 的創造者與負責人（Head of Claude Code）。

你會想用 Telegram 還是 Discord 來連 Claude Code？還是你有其他想串接的平台？

💡 這篇貼文是用 Claude Code 的 /threads-to-fb skill 產出的 — 自動爬 Threads 串文、翻譯、排版。skill 連結放留言。

#ClaudeCode #AI #CodingTips #Anthropic #開發者工具 #AIcoding #Telegram #Discord
