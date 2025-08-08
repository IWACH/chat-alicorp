import { isBrowser } from "@/core/utils/isBrowser.util";

export const localStorageUtil = {
  get: (key: string) => {
    if (!isBrowser) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set: (key: string, value: string) => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      return;
    }
  },

  remove: (key: string) => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      return;
    }
  },

  getJSON: <T>(key: string, fallback?: T): T | undefined => {
    try {
      const raw = localStorageUtil.get(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },

  setJSON: <T>(key: string, value: T) => {
    try {
      localStorageUtil.set(key, JSON.stringify(value));
    } catch {
      return;
    }
  },

  clear: () => {
    if (!isBrowser) return;
    try {
      localStorage.clear();
    } catch {
      return;
    }
  },
};
