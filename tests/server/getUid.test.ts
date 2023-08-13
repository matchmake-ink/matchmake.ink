import { getUid } from "@/lib/server/getUid";
import { getAuth } from "firebase-admin/auth";
import { vi } from "vitest";

describe("getUid", () => {
  beforeEach(() => {
    vi.mock("firebase-admin/auth", () => {
      return {
        getAuth: vi.fn(() => ({
          verifyIdToken: vi.fn(() => Promise.resolve({ uid: "test" })),
        })),
      };
    });

    vi.mock("@/lib/server/admin", () => {
      return {
        default: vi.fn(() => {}),
      };
    });
  });

  it("resolves with the token if it is provided", async () => {
    const request = new Request("https://google.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: "test" }),
    });

    const result = await getUid(request);

    expect(result).toBe("test");
  });
  it("rejects if no token is provided", async () => {
    const request = new Request("https://google.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    // expect getUid to reject
    await expect(getUid(request)).resolves.toBe("");
  });
});
