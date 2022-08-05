export const isBrowser = () => typeof window !== "undefined";

const storage = {
  getItem: <T>(key: string, defaultValue: T): T => {
    if (!isBrowser()) {
      return defaultValue;
    }

    try {
      const storedValue = localStorage.getItem(key);

      return storedValue === null
        ? defaultValue
        : (JSON.parse(storedValue) as T);
    } catch (error) {
      return defaultValue;
    }
  },
  setItem: <T>(key: string, value: T) => {
    if (!isBrowser()) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    if (!isBrowser()) {
      return;
    }

    localStorage.removeItem(key);
  },
  clearItem: () => {
    if (!isBrowser()) {
      return;
    }

    localStorage.clear();
  },
};

export default storage;
