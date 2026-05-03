import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 }
});

const page = await context.newPage();

// Inject auth before navigation using the actual AUTH_KEY 'cyberdress_auth'
await page.addInitScript(() => {
  const authUser = {
    email: 'demo@cyberdress.ai',
    name: '赛博玩家',
    loggedIn: true,
    coins: 520,
    level: 'Cyberpunk'
  };
  // Set localStorage (client-side auth)
  localStorage.setItem('cyberdress_auth', JSON.stringify(authUser));
  // Set cookie for middleware (server-side route protection)
  const value = encodeURIComponent(JSON.stringify({ loggedIn: true, email: 'demo@cyberdress.ai' }));
  document.cookie = `cyberdress_auth=${value}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
});

await page.goto('http://localhost:3847/profile', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

await page.screenshot({ path: '/tmp/profile_mobile.png', fullPage: false });

console.log('Screenshot saved to /tmp/profile_mobile.png');
console.log('URL:', page.url());

await browser.close();