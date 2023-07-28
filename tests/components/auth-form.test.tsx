import AuthForm from "@/components/auth-form";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { signIn, signUp } from "@/lib/auth";

vi.mock("@/lib/auth", () => ({
  signIn: vi.fn(() => {
    return { result: undefined, error: undefined };
  }),
  signUp: vi.fn(() => {
    return { result: undefined, error: undefined };
  }),
}));

describe("AuthForm", () => {
  it("renders all permanent elements crashing", () => {
    render(<AuthForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
  it("switches between signing in and signing up", () => {
    render(<AuthForm />);

    const signUpButton = screen.getByRole("button", {
      name: /sign up now/i,
    });
    expect(signUpButton).toBeInTheDocument();

    fireEvent.click(signUpButton);

    const signInButton = screen.getByRole("button", {
      name: /sign in now/i,
    });
    expect(signInButton).toBeInTheDocument();
  });

  describe("calls functions", () => {
    beforeEach(() => {
      render(<AuthForm />);
      const email = screen.getByLabelText("Email");
      const password = screen.getByLabelText("Password");

      fireEvent.change(email, {
        target: {
          value: "awesomemail@mail.com",
        },
      });
      fireEvent.change(password, {
        target: {
          value: "awesomepassword",
        },
      });
    });

    it("calls sign ip", () => {
      const submit = screen.getByRole("button", {
        name: /submit/i,
      });

      fireEvent.click(submit);
      expect(signIn).toHaveBeenCalledWith(
        "awesomemail@mail.com",
        "awesomepassword"
      );
    });
    it("calls sign up", () => {
      const signUpButton = screen.getByRole("button", {
        name: /sign up now/i,
      });
      fireEvent.click(signUpButton);

      const submit = screen.getByRole("button", {
        name: /submit/i,
      });

      fireEvent.click(submit);
      expect(signUp).toHaveBeenCalledWith(
        "awesomemail@mail.com",
        "awesomepassword"
      );
    });
  });
});
