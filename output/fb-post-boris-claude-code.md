Claude Code 創始人 Boris Cherny 分享了 15 個隱藏且被低估的功能，這些是他每天都在用的。

我整理翻譯如下，建議收藏：

---

1/ Claude Code 有手機 App
Boris 本人很多程式碼都是在 iOS App 上寫的。不用打開筆電就能改 code。
下載 Claude App > 左側 Code 分頁即可使用。

2/ 在手機/網頁/桌面/終端之間無縫切換 session
用 `claude --teleport` 或 `/teleport` 把雲端 session 接到本機。
或用 `/remote-control` 從手機遠端操控正在跑的本地 session。
Boris 個人設定是在 `/config` 裡啟用「為所有 session 啟用 Remote Control」。

3/ 最強大的兩個功能：/loop 和 /schedule
用這兩個指令讓 Claude 按時間間隔自動執行，最長可以跑一整週。

Boris 本人跑的 loop：
- `/loop 5m /babysit` — 自動處理 code review 和 auto-rebase PR
- `/loop 30m /slack-feedback` — 每 30 分鐘自動把 Slack 回饋整理成 PR
- 還有更多...

4/ 用 Hooks 在 agent 生命週期中確定性地執行邏輯
例如：
- 每次啟動 Claude 時動態載入 context (SessionStart)
- 記錄模型跑的每個 bash 指令 (PreToolUse)
- 把權限確認請求轉發到 WhatsApp 讓你審批 (PermissionRequest)
- 每次 Claude 停下來時自動推它繼續 (Stop)

5/ Dispatch — 不在電腦前也能操控
Boris 每天用 Dispatch 來追 Slack、處理信件、管理檔案。Dispatch 是 Claude Desktop 的安全遠端遙控器，可以使用你的 MCP、瀏覽器和電腦。

6/ 用 Chrome 擴充功能做前端開發
最重要的使用技巧：給 Claude 一個驗證輸出的方式。一旦你這樣做，Claude 會自己反覆迭代直到結果滿意。

想像一下：你請一個工程師做網站但不讓他用瀏覽器，結果會好嗎？不會。但如果給他瀏覽器，他會寫 code 然後迭代到好為止。

7/ 用 Claude Desktop App 自動啟動並測試 web server
Desktop App 內建了自動跑 web server 並在內建瀏覽器中測試的功能。
CLI 或 VSCode 也可以用 Chrome 擴充功能達到類似效果。

8/ Fork 既有 session 的兩種方式
1. 在 session 中執行 `/branch`
2. 從 CLI 執行 `claude --resume <session-id> --fork-session`

9/ 用 /btw 處理旁支問題
Boris 常用這個在 agent 工作時快速問問題，不打斷主流程。

10/ 用 Git Worktree 平行作業
Claude Code 深度支援 git worktree，這是在同一個 repo 做大量平行工作的關鍵。Boris 同時跑數十個 Claude，靠的就是這個。

用 `claude -w` 啟動新 session 到 worktree，或在 Desktop App 勾選「worktree」。
非 git VCS 使用者可以用 WorktreeCreate hook 自訂 worktree 建立邏輯。

11/ 用 /batch 批量扇出大型變更
`/batch` 會先訪談你，然後讓 Claude 把工作扇出到任意數量的 worktree agent（幾十個、幾百個甚至上千個）來完成。
適合大型程式碼遷移和其他可平行化的工作。

12/ 用 --bare 加速 SDK 啟動最多 10 倍
預設情況下 `claude -p`（或 TypeScript/Python SDK）會搜尋本地 CLAUDE.md、設定和 MCP。
但非互動使用時，通常你會想用 `--system-prompt`、`--mcp-config`、`--settings` 明確指定要載入什麼。
加上 `--bare` 旗標即可。

13/ 用 --add-dir 讓 Claude 存取更多資料夾
跨多個 repo 工作時，Boris 通常在一個 repo 啟動 Claude，然後用 `--add-dir`（或 `/add-dir`）讓 Claude 看到另一個 repo。
或在團隊的 settings.json 加入 `additionalDirectories` 讓每次啟動都自動載入。

14/ 用 --agent 給 Claude Code 自訂 system prompt 和工具
自訂 agent 是常被忽略但非常強大的功能。
在 `.claude/agents` 定義新 agent，然後執行 `claude --agent=<你的 agent 名稱>`。

15/ 用 /voice 啟用語音輸入
有趣的事實：Boris 大部分 coding 是用說的，而不是用打的。
CLI 中執行 `/voice` 然後按住空白鍵，Desktop 按語音按鈕，iOS 則啟用聽寫功能。

---

原文來自 Threads @boris_cherny
Boris Cherny 是 Anthropic 的工程師，也是 Claude Code 的創始人。

#ClaudeCode #AI #CodingTips #Anthropic #開發者工具
