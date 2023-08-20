import { setProfile } from "@/lib/client/profile";
import { updateDoc, doc } from "firebase/firestore";
import { vi } from "vitest";
import { db } from "@/lib/client/firebase";

describe("profile", () => {
  beforeEach(() => {
    vi.mock("firebase/firestore", async () => {
      const actual = await vi.importActual("firebase/firestore");

      return {
        //@ts-ignore
        ...actual,
        updateDoc: vi.fn(),
      };
    });
  });

  describe("setProfile", () => {
    it("should call setDoc with the correct arguments", async () => {
      setProfile("1235125", "test", "test1235");

      expect(updateDoc).toHaveBeenCalledWith(doc(db, "profiles", "1235125"), {
        ign: "test",
        discordTag: "test1235",
      });
    });
  });
});
