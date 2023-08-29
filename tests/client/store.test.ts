import { Store, LocalStore } from "@/lib/client/store";
import { vi } from "vitest";

describe("Test the store", () => {
  it("should be able to create a store", () => {
    const store = new Store<number>(0);
    expect(store.get()).toBe(0);
  });
  it("should be able to set a store", () => {
    const store = new Store<number>(0);
    store.set(1);
    expect(store.get()).toBe(1);
  });
  it("should publish events", () => {
    const store = new Store<number>(0);

    const listener = vi.fn();
    store.subscribe(listener);
    store.set(1);

    expect(listener).toHaveBeenCalledWith(1);
  });
});

describe("Test the local store", () => {
  it("should be able to create a local store", () => {
    const store = new LocalStore<number>("test", 0);
    expect(store.get()).toBe(0);
    expect(localStorage.getItem("test")).toBe("0");
  });
  it("should be able to set a local store", () => {
    const store = new LocalStore<number>("test", 0);
    store.set(1);
    expect(store.get()).toBe(1);
  });
  it("should publish events", () => {
    const store = new LocalStore<number>("test", 0);

    const listener = vi.fn();
    store.subscribe(listener);
    store.set(1);

    expect(listener).toHaveBeenCalledWith(1);
  });
});
