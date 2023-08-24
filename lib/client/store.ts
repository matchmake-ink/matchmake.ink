import { useState, useEffect } from "react";

enum STORE_STATUS {
  INITIALIZING,
  STANDBY,
  REFRESHING,
  ERROR,
}

export class Store<T> {
  data: T;
  status: STORE_STATUS = STORE_STATUS.INITIALIZING;
  private getData: () => Promise<T>;
  private listeners: Array<(data: T, status: STORE_STATUS) => void> = [];

  constructor(initialData: T, getData: () => Promise<T>) {
    this.data = initialData;
    this.getData = getData;
  }

  subscribe(listener: (data: T, status: STORE_STATUS) => void) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (data: T, status: STORE_STATUS) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  async refresh(possibleValue: T | undefined = undefined) {
    const alreadyRefreshing = this.status === STORE_STATUS.REFRESHING;

    this.status = STORE_STATUS.REFRESHING;
    if (possibleValue !== undefined) {
      this.data = possibleValue;
      this.notifyListeners();
    }

    if (alreadyRefreshing) return Promise.resolve();

    try {
      const data = await this.getData();
      this.data = data;
      this.status = STORE_STATUS.STANDBY;
    } catch (e) {
      this.status = STORE_STATUS.ERROR;
      console.log(e);
    } finally {
      this.notifyListeners();
    }

    return Promise.resolve();
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.data, this.status));
  }
}

export function useStore<T>(store: Store<T>) {
  const [data, setData] = useState(store.data);
  const [status, setStatus] = useState(store.status);

  useEffect(() => {
    const onStateChange = (data: T, status: STORE_STATUS) => {
      setData(data);
      setStatus(status);
    };

    store.subscribe(onStateChange);

    return () => {
      store.unsubscribe(onStateChange);
    };
  }, [store]);

  return [data, status];
}
