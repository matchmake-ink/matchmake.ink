import { useState, useEffect } from "react";

enum STORE_STATUS {
  INITIALIZING,
  STANDBY,
  REFRESHING,
  ERROR,
}

export class LocalStore<T> {
  private store: Store<T>;
  localStorageKey: string;

  constructor(localStorageKey: string, initialData: T) {
    this.localStorageKey = localStorageKey;

    const localStorageData = localStorage.getItem(localStorageKey);
    this.store = new Store<T>(
      localStorageData ? (JSON.parse(localStorageData) as T) : initialData
    );
  }

  get(): T {
    return this.store.get();
  }

  set(data: T) {
    this.store.set(data);
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  subscribe(listener: (data: T) => void) {
    this.store.subscribe(listener);
  }

  unsubscribe(listener: (data: T) => void) {
    this.store.unsubscribe(listener);
  }
}

export class ApiStore<T> {
  private store: Store<T>;
  private url: string;
  private status: STORE_STATUS = STORE_STATUS.INITIALIZING;

  constructor(url: string, initialData: T) {
    this.url = url;
    this.store = new Store<T>(initialData);
  }

  get(): T {
    return this.store.get();
  }

  async set(data: T) {}

  subscribe(listener: (data: T) => void) {
    this.store.subscribe(listener);
  }

  unsubscribe(listener: (data: T) => void) {
    this.store.unsubscribe(listener);
  }

  async refresh() {
    this.status = STORE_STATUS.REFRESHING;
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      this.store.set(data);
      this.status = STORE_STATUS.STANDBY;
    } catch (e) {
      this.status = STORE_STATUS.ERROR;
      throw e;
    }
  }

  getStatus() {
    return this.status;
  }
}

export class Store<T> {
  data: T;
  private listeners: Array<(data: T) => void> = [];

  constructor(initialData: T) {
    this.data = initialData;
  }

  subscribe(listener: (data: T) => void) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (data: T) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  set(data: T) {
    this.data = data;
    this.notifyListeners();
  }

  get(): T {
    return this.data;
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.data));
  }
}

export function useStore<T>(store: Store<T>) {
  const [data, setData] = useState(store.data);

  useEffect(() => {
    const onStateChange = (data: T) => {
      setData(data);
    };

    store.subscribe(onStateChange);

    return () => {
      store.unsubscribe(onStateChange);
    };
  }, [store]);

  return [data];
}
