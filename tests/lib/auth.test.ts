import { signUp, signIn } from "@/lib/auth";
import { vi } from "vitest";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual("firebase/auth");

  return {
    // @ts-ignore
    ...actual,
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
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
