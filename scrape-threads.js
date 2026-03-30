const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2] || 'https://www.threads.com/@boris_cherny/post/DWfjnqGFPHE';

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  console.error('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for content to load
  await page.waitForSelector('[data-pressable-container]', { timeout: 15000 }).catch(() => {
    console.error('Waiting for alternate selector...');
  });

  // Extra wait for dynamic content
  await new Promise(r => setTimeout(r, 5000));

  // Extract all post text content
  const posts = await page.evaluate(() => {
    const results = [];

    // Try multiple selectors for Threads post content
    const selectors = [
      '[data-pressable-container]',
      'div[class*="Caption"]',
      'span[dir="auto"]',
      'div[dir="auto"]',
    ];

    // Get all text blocks that look like post content
    const allSpans = document.querySelectorAll('span[dir="auto"]');
    for (const span of allSpans) {
      const text = span.textContent.trim();
      if (text.length > 20) {
        results.push(text);
      }
    }

    // Also try divs with dir=auto
    const allDivs = document.querySelectorAll('div[dir="auto"]');
    for (const div of allDivs) {
      const text = div.textContent.trim();
      if (text.length > 20 && !results.includes(text)) {
        results.push(text);
      }
    }

    return [...new Set(results)];
  });

  // Output as JSON
  const output = {
    url,
    posts: posts,
    scrapedAt: new Date().toISOString()
  };

  console.log(JSON.stringify(output, null, 2));

  await browser.close();
})();
