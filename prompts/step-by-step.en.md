# threads-to-zhpost — Build Process

Building a complete Threads translation skill from an empty repo using Claude Code. Below is every prompt and what the AI did in response.

---

## Step 1: Getting started

### What I said

> This is an empty repo. I need a scraper or Chrome MCP to read this Threads post and its thread, translate it to Chinese as a Facebook post, package it as a Claude Code skill, and push to GitHub.
> https://www.threads.com/@boris_cherny/post/DWfjnqGFPHE

### What the AI did

- Tried Chrome MCP to read the page first — `get_page_content` kept erroring out
- Switched to WebFetch — Threads is JS-rendered, only got CSS variables
- Ended up writing a Puppeteer scraper, successfully grabbed all 15 thread items
- Translated it into a Chinese FB post
- Created the `/threads-to-fb` skill
- Set up the GitHub repo and pushed

---

## Step 2: Promo image + copy rewrite

### What I said

> 1. Make an FB promo image that captures the original Threads content but translated, with a headline on top
> 2. Can you make the copy more engaging and readable? Look up how other people write posts like this and mimic the style — not clickbait, just smoother to read

### What the AI did

- Sent a sub-agent to research Taiwanese tech community FB post styles
- Built a dark card image using HTML + CSS listing all 15 features
- Used Puppeteer to screenshot it as PNG
- Rewrote the copy in a more conversational tone with emoji and engagement hooks

---

## Step 3: Image iteration

This part took the longest — about 7 rounds of back and forth.

### 3a

> Too much text on the image. Think about the key point — like "the creator of Claude Code sharing this himself." Grab his avatar. Keep it clean, eye-catching, bigger text.

The AI dropped the feature list, switched to a big headline + avatar + subtitle layout. Scraped Boris's avatar from the Threads page.

### 3b

> How can the tagline emphasize that this was just shared?

The AI changed the wording and colored "just revealed" in orange.

### 3c

> "15 hidden features" should probably be emphasized too.

The AI made the entire "just revealed 15 hidden features" line orange.

### 3d

> Check the layout.

The AI re-examined the image, noticed on its own that it was top-heavy with too much whitespace and text clumped together, and proactively fixed it.

### 3e

> Give me a v2 with different text sizes in the headline.

The AI made a contrast version: small text "Creator of Claude Code" + large text "Just revealed 15 hidden features."

### 3f

> Can you keep the previous version? Have v1 and v2. Also give me a light Claude-themed version.

The AI kept v1 and v2, added a v3 light version, and showed all three.

### 3g

> Keep v2 dark and v3 light, but make the text bigger — easier to read on mobile.

The AI scaled everything up and removed v1.

---

## Step 4: Turn image generation into a skill too

### What I said

> Can the image generation part also be a skill? And auto-select color schemes based on the source platform.

### What the AI did

- Refactored the HTML template to be parameterized with CSS variables for 6 themes (Threads / X / LinkedIn / Reddit dark/light)
- Updated `generate-image.js` to accept JSON config
- Created the `/generate-cover` skill
- Updated `/threads-to-fb` to integrate image generation

---

## Step 5: Wrap-up

### 5a — Folder cleanup

> Do a full cleanup — organize the folder so I can share it as a skill on GitHub.

The AI deleted old files, reorganized the structure, and updated the README.

### 5b — Rename

> I want to rename the repo. threads-to..? Chinese posts?

The AI gave 4 options. I picked `threads-to-zhpost`. The AI renamed it via `gh` CLI and updated all references.

### 5c — Standardize + test

> Update all docs, standardize image filenames, and run a sub-agent to test the output.

The AI unified filenames to `{author}-{topic}-{variant}.png`, then ran sub-agent tests for Threads dark / light / X dark — all passed.

### 5d — Test with a new URL

> Test this one: https://www.threads.com/@boris_cherny/post/DWFohOyE1on

The AI ran the full pipeline via sub-agent. This post was a Channels feature announcement (not a tips list), and the AI correctly identified the different content type and adjusted the headline and copy structure accordingly.

### 5e — Disclaimer

> Should I add a disclaimer to the repo? Are there legal risks? It's just an experimental project.

The AI listed the risk areas (scraping ToS, copyright, avatars, no affiliation) and added an MIT License plus a bilingual disclaimer.

---

## Total: about 15 prompts

| Step | Prompts | Takeaway |
|------|---------|----------|
| Getting started | 1 | Just give a direction — the AI finds the path |
| Image + copy | 1 | You can ask for multiple things at once |
| Image iteration | 7 | Where most of the time goes |
| Skill-ify | 1 | One sentence can extend functionality |
| Wrap-up & testing | 5 | Sub-agent testing is really useful |
