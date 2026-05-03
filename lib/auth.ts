'use client';

const AUTH_KEY = 'cyberdress_auth';

export interface AuthUser {
  email: string;
  name: string;
  loggedIn: boolean;
  coins: number;
  level: string;
}

export const DEFAULT_USER: AuthUser = {
  email: 'demo@cyberdress.ai',
  name: '赛博玩家',
  loggedIn: true,
  coins: 520,
  level: 'Cyberpunk',
};

export const DEMO_PASSWORD = 'cyberdress123';

function setAuthCookie(user: AuthUser) {
  // Set cookie for middleware (server-side route protection)
  // cookie max-age 7 days, path /
  const value = encodeURIComponent(JSON.stringify({ loggedIn: user.loggedIn, email: user.email }));
  document.cookie = `${AUTH_KEY}=${value}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = `${AUTH_KEY}=; path=/; max-age=0`;
}

export function getAuth(): AuthUser {
  if (typeof window === 'undefined') return { ...DEFAULT_USER, loggedIn: false };
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return { ...DEFAULT_USER, loggedIn: false };
  try {
    return JSON.parse(stored);
  } catch {
    return { ...DEFAULT_USER, loggedIn: false };
  }
}

export function login(email: string, password: string): AuthUser | null {
  if (email === DEFAULT_USER.email && password === DEMO_PASSWORD) {
    const user: AuthUser = { ...DEFAULT_USER, loggedIn: true };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    setAuthCookie(user);
    return user;
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  clearAuthCookie();
}

export function isLoggedIn(): boolean {
  return getAuth().loggedIn;
}

export function updateUserLevel(level: string): void {
  const user = getAuth();
  user.level = level;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  setAuthCookie(user);
}

export function updateCoins(coins: number): void {
  const user = getAuth();
  user.coins = coins;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('spro-coins-updated'));
}

export function addCoins(amount: number): number {
  const user = getAuth();
  user.coins += amount;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('spro-coins-updated'));
  return user.coins;
}
