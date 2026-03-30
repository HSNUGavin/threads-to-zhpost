const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Platform icon SVGs
const PLATFORM_ICONS = {
  threads: '<svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg"><path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.745C82.2364 44.745 70.1369 51.4424 63.137 63.4913L78.2246 72.8339C83.2967 64.5765 91.1498 61.2048 97.222 61.2048C97.2951 61.2048 97.3682 61.2051 97.4418 61.2057C105.034 61.2571 110.835 63.6573 114.763 68.3684C117.586 71.7537 119.476 76.3268 120.403 82.0195C113.299 80.7749 105.597 80.3439 97.3663 80.7338C73.4627 81.9584 57.6341 95.4786 58.7729 114.043C59.3513 123.499 63.9051 131.667 71.6827 137.016C78.395 141.613 87.1265 143.961 96.2559 143.503C108.063 142.898 117.372 138.137 123.895 129.35C128.797 122.728 131.916 114.372 133.327 104.008C138.29 106.95 142.057 110.77 144.37 115.476C148.265 123.521 148.413 136.842 138.24 147.016C129.231 156.025 118.567 160.353 97.222 160.516C73.7038 160.335 56.3437 153.228 44.7865 139.141C34.0504 126.058 28.4327 107.383 28.2497 84C28.4327 60.6173 34.0504 41.9423 44.7865 28.8592C56.3437 14.7724 73.7038 7.66498 97.222 7.4844C120.924 7.66634 138.554 14.8242 150.369 28.9639C156.176 35.9118 160.554 44.5769 163.429 54.7671L179.098 50.5161C175.613 38.3584 170.218 27.9641 162.97 19.4936C148.328 2.38053 127.395 -6.50061 97.2567 -6.72461L97.1871 -6.72461C67.2236 -6.50181 46.4346 2.44513 31.676 19.6C19.0469 34.4298 12.5218 55.7825 12.2969 83.9653L12.2969 84.0347C12.5218 112.218 19.0469 133.57 31.676 148.4C46.4346 165.555 67.2236 174.502 97.1871 174.725L97.2567 174.725C121.803 174.539 135.635 168.682 147.12 157.197C163.076 141.24 163.604 119.854 157.458 107.487C153.173 98.8628 145.645 92.1957 135.497 87.6957Z" fill-rule="evenodd" clip-rule="evenodd"/></svg>',
  x: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  reddit: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>',
};

/**
 * Usage:
 *   node generate-image.js                          # legacy: uses old template paths
 *   node generate-image.js --config '{ json }'      # new: JSON config
 *   node generate-image.js --config config.json      # new: JSON file path
 *
 * Config JSON:
 * {
 *   "platform": "threads",         // threads | x | linkedin | reddit
 *   "variant": "dark",             // dark | light
 *   "authorName": "Boris Cherny",
 *   "authorRole": "Anthropic | Head of Claude Code",
 *   "avatarPath": "assets/boris-avatar.jpg",
 *   "headlineSmall": "Claude Code 創造者",
 *   "headlineBig1": "剛公開",
 *   "headlineBig2": "15 個隱藏功能",
 *   "subtitle": "他每天都在用，但很多人不知道的功能",
 *   "footerLeft": "繁體中文翻譯整理",
 *   "footerRight": "2026.03.30",
 *   "output": "output/cover.png"
 * }
 */
(async () => {
  let config;

  const configIdx = process.argv.indexOf('--config');
  if (configIdx !== -1 && process.argv[configIdx + 1]) {
    const configArg = process.argv[configIdx + 1];
    if (configArg.startsWith('{')) {
      config = JSON.parse(configArg);
    } else {
      config = JSON.parse(fs.readFileSync(configArg, 'utf-8'));
    }
  }

  // Legacy mode: template + output as positional args
  if (!config) {
    const templatePath = process.argv[2] || path.join(__dirname, 'templates/threads-card.html');
    const outputPath = process.argv[3] || path.join(__dirname, 'output/fb-cover.png');

    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200 });

    let html = fs.readFileSync(path.resolve(templatePath), 'utf-8');
    const avatarPath = path.join(__dirname, 'assets/boris-avatar.jpg');
    if (fs.existsSync(avatarPath)) {
      const avatarB64 = fs.readFileSync(avatarPath).toString('base64');
      html = html.replace('AVATAR_PLACEHOLDER', `data:image/jpeg;base64,${avatarB64}`);
    }

    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 2000));

    const card = await page.$('.card');
    await card.screenshot({ path: outputPath, type: 'png' });
    console.log(`Image saved to: ${outputPath}`);
    await browser.close();
    return;
  }

  // Config mode
  const platform = config.platform || 'threads';
  const variant = config.variant || 'dark';
  const themeClass = `theme-${platform}-${variant}`;
  const platformLabel = {
    threads: `來自 Threads @${config.authorHandle || ''}`,
    x: `來自 X @${config.authorHandle || ''}`,
    linkedin: `來自 LinkedIn`,
    reddit: `來自 Reddit`,
  }[platform] || `來自 ${platform}`;

  const templatePath = path.join(__dirname, 'templates/cover-template.html');
  let html = fs.readFileSync(templatePath, 'utf-8');

  // Inject avatar
  if (config.avatarPath && fs.existsSync(path.resolve(config.avatarPath))) {
    const ext = path.extname(config.avatarPath).slice(1) === 'png' ? 'png' : 'jpeg';
    const avatarB64 = fs.readFileSync(path.resolve(config.avatarPath)).toString('base64');
    config._avatarSrc = `data:image/${ext};base64,${avatarB64}`;
  } else {
    config._avatarSrc = '';
  }

  // Replace placeholders
  const replacements = {
    '{{THEME_CLASS}}': themeClass,
    '{{PLATFORM_ICON}}': PLATFORM_ICONS[platform] || PLATFORM_ICONS.threads,
    '{{PLATFORM_LABEL}}': platformLabel,
    '{{AVATAR_SRC}}': config._avatarSrc,
    '{{AUTHOR_NAME}}': config.authorName || '',
    '{{AUTHOR_ROLE}}': config.authorRole || '',
    '{{HEADLINE_SMALL}}': config.headlineSmall || '',
    '{{HEADLINE_BIG_1}}': config.headlineBig1 || '',
    '{{HEADLINE_BIG_2}}': config.headlineBig2 || '',
    '{{SUBTITLE}}': config.subtitle || '',
    '{{FOOTER_LEFT}}': config.footerLeft || '',
    '{{FOOTER_RIGHT}}': config.footerRight || '',
  };

  for (const [key, val] of Object.entries(replacements)) {
    html = html.split(key).join(val);
  }

  const outputPath = path.resolve(config.output || 'output/cover.png');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 });
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 15000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  const card = await page.$('.card');
  await card.screenshot({ path: outputPath, type: 'png' });
  console.log(`Image saved to: ${outputPath}`);
  await browser.close();
})();
