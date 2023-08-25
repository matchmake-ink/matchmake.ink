import { signInWithPassword, signUpWithPassword } from "@/lib/server/auth";
import { vi } from "vitest";

describe("signing in/up with password", () => {
  beforeEach(() => {
    vi.mock("firebase/auth", () => {
      return {
        signInWithEmailAndPassword: vi.fn().mockResolvedValue({
          user: {
            uid: "1234",
            email: "jdeiss06@gmail.com",
            getIdToken: vi.fn().mockResolvedValue("token"),
          },
        }),
        createUserWithEmailAndPassword: vi.fn().mockResolvedValue({
          user: {
            uid: "1234",
            email: "jdeiss06@gmail.com",
            getIdToken: vi.fn().mockResolvedValue("token"),
          },
        }),
        getAuth: vi.fn().mockReturnValue({}),
      };
    });
    vi.mock("@/lib/server/firebase", () => {
      return {
        db: {
          doc: () => {
            return {
              set: () => {},
            };
          },
        },
        clientAuth: {},
      };
    });
  });
  it("signIn should return an AuthSuccess object", async () => {
    const res = await signInWithPassword("jdeiss06@gmail.com", "password");
    expect(res).toHaveProperty("uid");
    expect(res).toHaveProperty("email");
    expect(res).toHaveProperty("avatar");
    expect(res).toHaveProperty("token");
  });
});
