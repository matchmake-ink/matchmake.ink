import { createInvite } from "@/lib/server/invite";
import { vi } from "vitest";
import { getFirestore } from "firebase-admin/firestore";

vi.mock("firebase-admin/firestore", () => {
  return {
    getFirestore: vi.fn(() => ({
      doc: vi.fn(() => ({
        set: vi.fn(),
      })),
    })),
  };
});

describe("createInvite", () => {
  it("should create a new invite", async () => {
    const teamUid = "teamUid";
    const uid = "uid";

    await createInvite(teamUid, uid, 1000);

    expect(getFirestore().doc("").set).toHaveBeenCalled();
  });
});
