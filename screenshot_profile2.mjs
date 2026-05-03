import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 }
});

const page = await context.newPage();

// First go to login and login properly via the form
await page.goto('http://localhost:3847/login', { waitUntil: 'networkidle' });

// The login page has pre-filled demo credentials, just submit
await page.click('button[type="submit"]');

// Wait for redirect
await page.waitForURL('**//', { timeout: 5000 }).catch(() => {});

// Give it a moment to settle
await page.waitForTimeout(2000);

// Now check if we're on profile page or redirected
const url = page.url();
console.log('After login URL:', url);

// Now navigate to profile
await page.goto('http://localhost:3847/profile', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

console.log('Final URL:', page.url());

await page.screenshot({ path: '/tmp/profile_mobile.png', fullPage: false });
console.log('Screenshot saved to /tmp/profile_mobile.png');

await browser.close();