import { signUp, signIn, useUser, signOut } from "@/lib/client/auth";
import { vi } from "vitest";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/client/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual("firebase/auth");

  return {
    // @ts-ignore
    ...actual,
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  };
});

vi.mock("@/lib/client/firebase", async () => {
  const actual = await vi.importActual("@/lib/client/firebase");

  return {
    // @ts-expect-error - this is a mock, it's all fine
    ...actual,
    auth: {
      // @ts-expect-error - this is a mock, it's all fine
      ...actual.auth,
      signOut: vi.fn(),
    },
  };
});

vi.mock("react-firebase-hooks/auth", async () => {
  const actual = await vi.importActual("react-firebase-hooks/auth");

  return {
    // @ts-ignore
    ...actual,
    useAuthState: vi.fn(() => [null, false, null]),
  };
});

describe("auth", () => {
  describe("signUp", () => {
    it("should call createUserWithEmailAndPassword with the correct arguments", async () => {
      const email = "test@example.com";
      const password = "password123";

      await signUp(email, password);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        email,
        password
      );
    });
  });

  describe("signIn", () => {
    it("should call signInWithEmailAndPassword with the correct arguments", async () => {
      const email = "test@example.com";
      const password = "password123";

      await signIn(email, password);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        email,
        password
      );
    });
  });
});

describe("useUser", () => {
  it("calls use auth state from firebase hooks", async () => {
    useUser();
    expect(useAuthState).toHaveBeenCalledWith(auth);
  });
});

describe("signOut", () => {
  it("calls signOut from firebase auth", async () => {
    await signOut();
    expect(auth.signOut).toHaveBeenCalledWith();
  });
});
