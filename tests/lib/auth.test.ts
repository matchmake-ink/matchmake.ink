import { signUp, signIn, useUser } from "@/lib/auth";
import { vi } from "vitest";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
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
