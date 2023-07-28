import { setProfile } from "@/lib/profile";
import { setDoc, doc } from "firebase/firestore";
import { vi } from "vitest";
import { db } from "@/lib/firebase";

describe("setProfile", () => {
  vi.mock("firebase/firestore", async () => {
    const actual = await vi.importActual("firebase/firestore");

    return {
      //@ts-ignore
      ...actual,
      setDoc: vi.fn(),
    };
  });
  it("should call setDoc with the correct arguments", async () => {
    setProfile("1235125", "test", "test1235");

    expect(setDoc).toHaveBeenCalledWith(doc(db, "profiles", "1235125"), {
      ign: "test",
      discordTag: "test1235",
    });
  });
});
