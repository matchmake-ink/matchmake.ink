import { signInWithPassword } from "@/lib/server/auth";
import { vi } from "vitest";

describe("signInWithPassword", () => {
  beforeEach(() => {
    vi.mock("firebase/auth", () => {
      return {
        signInWithEmailAndPassword: vi.fn().mockResolvedValue({
          user: {
            uid: "1234",
            email: "jdeiss06@gmail.coim",
            getIdToken: vi.fn().mockResolvedValue("token"),
          },
        }),
        getAuth: vi.fn().mockReturnValue({}),
      };
    });
  });
  it("should return an AuthSuccess object", async () => {
    const res = await signInWithPassword("jdeiss06@gmail.com", "password");
    expect(res).toHaveProperty("uid");
    expect(res).toHaveProperty("email");
    expect(res).toHaveProperty("avatar");
    expect(res).toHaveProperty("token");
  });
});
