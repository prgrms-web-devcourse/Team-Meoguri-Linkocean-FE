export const isBrowser = () => typeof window !== "undefined";

const storage = {
  getItem: <T>(key: string, defaultValue: T): T => {
    if (!isBrowser()) {
      return defaultValue;
    }

    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
  },
  setItem: <T>(key: string, value: T) => {
    if (!isBrowser()) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    if (!isBrowser()) {
      return;
    }

    window.localStorage.removeItem(key);
  },
  clearItem: () => {
    if (!isBrowser()) {
      return;
    }

    window.localStorage.clear();
  },
};

export default storage;
