# One-Shot Prompt: Rebuild the Entire Project

The 15-round conversation condensed into one prompt. Drop this into Claude Code and it'll build the full project from an empty repo.

---

## Prompt

```
I want to build a Claude Code skill project called threads-to-zhpost.
It scrapes Threads posts, translates them into Traditional Chinese
Facebook posts, and auto-generates promotional cover images.

Use this URL as an example: https://www.threads.com/@boris_cherny/post/DWfjnqGFPHE

Complete all of the following:

1. Scraper (scrape-threads.js)
   - Puppeteer headless browser (Threads is JS-rendered, curl won't work)
   - Input: Threads URL → Output: JSON

2. Translation + FB post (output/{author}-{topic}.md)
   - Traditional Chinese, conversational tone, like a coworker recommending a tool
   - Emoji-guided sections, keep code/commands as-is, end with engagement question + hashtags

3. Cover image generator
   - Parameterized HTML template at templates/cover-template.html
   - CSS variables for platform color schemes:
     Threads dark/light, X dark/light, LinkedIn, Reddit
   - generate-image.js accepts --config JSON, Puppeteer screenshots 1200x1200 PNG
   - Auto-scrape author avatar from the source page
   - Design principles:
     - Three layers of info: source platform → author (with avatar) → main headline
     - Size contrast: small text for context, big text for the main message
     - Mobile-friendly: minimum 40px font size
     - Output both dark + light versions

4. Claude Code Skills
   - /threads-to-fb <url>: scrape → translate → generate images, end-to-end
   - /generate-cover: standalone image generation, auto-themed by platform

5. Repo cleanup
   - Filename format: {author-handle}-{topic}-{variant}.{ext}
   - MIT License + bilingual disclaimer (English + Chinese)
   - README: install, skill usage, CLI usage, file structure, example output
   - .gitignore excludes node_modules, .env

6. Testing
   - Run sub-agent end-to-end tests: Threads dark, light, X dark
   - Test the full pipeline with a second Threads URL

Push to GitHub when done.
```

---

## Expected Output

```
threads-to-zhpost/
├── .claude/commands/
│   ├── threads-to-fb.md         # /threads-to-fb skill
│   └── generate-cover.md        # /generate-cover skill
├── templates/
│   └── cover-template.html      # Parameterized template (6 themes)
├── assets/                      # Author avatars
├── output/                      # Posts + cover images
├── scrape-threads.js            # Threads scraper
├── generate-image.js            # Cover image generator
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

## Tips

This prompt works end-to-end, but image design is hard to nail in one go:

- **Run this prompt first** to get 80% of the way there
- **Then spend 5-8 rounds iterating on the images**: simplify, enlarge, adjust layout, compare versions
- Short prompts work best for iteration: "make the text bigger," "check the layout," "keep this version and give me a light one too"
