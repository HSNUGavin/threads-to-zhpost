# threads-to-zhpost

English | **[繁體中文](README.md)**

> **Experimental** — This is a proof-of-concept for Claude Code skills, intended for learning and research only.

Claude Code skills that scrape social media threads (Threads, X, etc.), translate them into Traditional Chinese, format them as Facebook posts, and auto-generate promotional cover images.

## Installation

```bash
git clone https://github.com/HSNUGavin/threads-to-zhpost.git
cd threads-to-zhpost
npm install
```

## Skills

### `/threads-to-fb` — One-click Threads to FB post

```
/threads-to-fb https://www.threads.com/@username/post/XXXXX
```

Automatically scrapes the thread, translates it to Traditional Chinese, formats it as an FB post, and generates dark/light cover images.

### `/generate-cover` — Social media cover image generator

Auto-selects color schemes based on the source platform. Outputs 1200x1200 promotional images.

Supported platform themes:

| Platform | Dark | Light |
|----------|------|-------|
| Threads | Black bg + orange | Claude beige bg |
| X (Twitter) | Pure black + blue | White bg + blue |
| LinkedIn | — | Gray bg + blue |
| Reddit | Dark gray + orange | — |

## Standalone Usage

### Scrape a Threads post

```bash
node scrape-threads.js <threads-url>
```

### Generate a cover image (JSON config)

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

## File Structure

```
.claude/commands/
  threads-to-fb.md       # Skill: Threads → FB post
  generate-cover.md      # Skill: Cover image generator
templates/
  cover-template.html    # Parameterized HTML template (6 platform themes)
generate-image.js        # Puppeteer screenshot script (JSON config)
scrape-threads.js        # Threads scraper
output/                  # Generated posts and images
assets/                  # Avatars and other assets
```

## Example Output

Dark cover:

![Dark](output/boris-cherny-claude-code-dark.png)

Light cover:

![Light](output/boris-cherny-claude-code-light.png)

## Disclaimer

This project is an **experimental proof-of-concept** for Claude Code skills, intended for educational and research purposes only.

- **Web scraping**: This tool scrapes publicly accessible social media content. Users are responsible for complying with the terms of service of the respective platforms (Meta/Threads, X, etc.).
- **Copyright**: Translated and reformatted content remains the intellectual property of the original authors. Always credit the original source and obtain permission before publishing translated content.
- **Avatars & media**: Profile images and media are fetched for local preview purposes. Do not redistribute without permission.
- **No affiliation**: This project is not affiliated with, endorsed by, or associated with Meta, Anthropic, or any social media platform.
- **Use at your own risk**: The authors of this project assume no liability for how it is used. You are solely responsible for ensuring your use complies with applicable laws and platform policies.

## License

[MIT](LICENSE)
