'use client';

class MemoryStorage implements Storage {
  private store: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] !== undefined ? this.store[key] : null;
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }
}

export const safeSessionStorage = (() => {
  if (typeof window === 'undefined') {
    return new MemoryStorage();
  }
  try {
    const testKey = '__storage_test__';
    window.sessionStorage.setItem(testKey, testKey);
    window.sessionStorage.removeItem(testKey);
    return window.sessionStorage;
  } catch (e) {
    console.warn('[Storage] sessionStorage is blocked or unavailable, falling back to memory storage:', e);
    return new MemoryStorage();
  }
})();

export const safeLocalStorage = (() => {
  if (typeof window === 'undefined') {
    return new MemoryStorage();
  }
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch (e) {
    console.warn('[Storage] localStorage is blocked or unavailable, falling back to memory storage:', e);
    return new MemoryStorage();
  }
})();
