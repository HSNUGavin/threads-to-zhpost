Claude Code 的創造者 Boris Cherny 剛在 Threads 上分享了他自己每天都在用、但很多人不知道的 15 個功能。

有些功能我看完才知道原來可以這樣用，整理翻譯分享給大家。

⸺

📱 1/ 手機就能寫 Code
Boris 本人很多 code 是在 iOS App 上寫的 — 下載 Claude App，左邊切到 Code 分頁就能用。通勤、躺沙發都能改 code。

🔄 2/ Session 跨裝置無縫接續
在手機上寫到一半，回到電腦繼續？用 claude --teleport 就能把雲端 session 接到本機。反過來也行，/remote-control 可以從手機遙控本地 session。

⚡ 3/ /loop 和 /schedule — 讓 Claude 自己持續跑
這兩個指令可以讓 Claude 按照時間間隔自動執行任務，最長能跑一整週。

Boris 自己跑的排程：
→ /loop 5m /babysit — 每 5 分鐘自動處理 code review、rebase PR
→ /loop 30m /slack-feedback — 每半小時把 Slack 回饋整理成 PR

🔧 4/ Hooks — agent 生命週期的掛鉤
可以在 Claude 的不同階段自動觸發邏輯：
→ 啟動時載入 context（SessionStart）
→ 記錄每個 bash 指令（PreToolUse）
→ 權限請求轉發到 WhatsApp 讓你審批（PermissionRequest）
→ Claude 停下來時自動推它繼續（Stop）

📡 5/ Dispatch — 人不在電腦前也能操控
Boris 每天用 Dispatch 追 Slack、處理信件、管理檔案。它是 Claude Desktop 的安全遠端遙控器，能用你的 MCP、瀏覽器和整台電腦。

🌐 6/ Chrome 擴充功能做前端
Boris 說這是最重要的使用技巧：給 Claude 一個能驗證產出的方式。

想像你請一個工程師做網站，但不給他瀏覽器看結果 — 不可能做好。裝了 Chrome 擴充之後，Claude 會自己寫 code → 看結果 → 反覆修到滿意為止。

🖥️ 7/ Desktop App 自動跑 Web Server
Desktop App 內建自動啟動 web server 並在內建瀏覽器測試的功能，不用再手動起 server。CLI 和 VSCode 也能用 Chrome 擴充達到類似效果。

🔀 8/ Fork Session — 兩種方式
想從現有 session 分支出去？
→ 在 session 裡打 /branch
→ 或 CLI 下 claude --resume <session-id> --fork-session

💬 9/ /btw — 插嘴不打斷
Boris 最常用的功能之一：agent 正在忙的時候，用 /btw 快速問個問題，不會中斷主流程。

🌳 10/ Git Worktree 平行作業
Claude Code 深度支援 worktree，這是在同個 repo 做大量平行工作的關鍵。Boris 同時跑幾十個 Claude 就是靠這個。

用 claude -w 就能啟動新 worktree session。

📦 11/ /batch — 大規模批量變更
/batch 會先問你要做什麼，然後自動扇出到數十、數百甚至上千個 worktree agent 去執行。大型 code migration 的神器。

🚀 12/ --bare 加速啟動最高 10 倍
用 SDK（claude -p）做非互動自動化時，加上 --bare 跳過搜尋本地 CLAUDE.md 和 MCP，啟動速度快非常多。

📂 13/ --add-dir 跨 Repo 作業
同時在多個 repo 工作？用 --add-dir 讓 Claude 看到其他資料夾。也可以在團隊 settings.json 設定 additionalDirectories 讓每次啟動都自動載入。

🤖 14/ --agent 自訂 Agent
在 .claude/agents 定義你自己的 agent（含 system prompt 和工具），然後用 claude --agent=<名稱> 啟動。常被忽略但非常強大。

🎤 15/ /voice 語音寫 Code
Boris 本人大部分 coding 其實是用說的，不是打字。CLI 裡 /voice 再按住空白鍵，或用 Desktop App 的語音按鈕都可以。

⸺

原文來自 Threads @boris_cherny
Boris Cherny 是 Anthropic 工程師、Claude Code 的創造者與負責人（Head of Claude Code）。

你最常用的是哪幾個？有沒有其他隱藏功能想補充的？

💡 這篇貼文是用 Claude Code 的 /threads-to-fb skill 產出的 — 自動爬 Threads 串文、翻譯、排版。skill 連結放留言。

#ClaudeCode #AI #CodingTips #Anthropic #開發者工具 #AIcoding
