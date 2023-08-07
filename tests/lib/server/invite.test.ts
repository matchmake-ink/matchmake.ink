import { createInvite } from "@/lib/server/invite";
import { vi } from "vitest";

vi.mock("firebase-admin/firestore", () => {
  return {
    getFirestore: vi.fn(() => ({
      doc: vi.fn(() => ({
        set: vi.fn(() => "hello world!"),
      })),
    })),
  };
});

describe("createInvite", () => {
  it("should cause no errors", async () => {
    const teamUid = "teamUid";
    const uid = "uid";

    await createInvite(teamUid, uid, 1000);
  });
});
