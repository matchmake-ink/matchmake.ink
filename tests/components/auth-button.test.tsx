import AuthButton from "@/components/auth-button";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { signOut } from "@/lib/client/auth";

describe("AuthButton", () => {
  beforeEach(() => {
    vi.mock("next/navigation", () => ({
      useRouter: () => ({
        push: vi.fn(),
      }),
    }));

    vi.mock("@/lib/client/auth", () => ({
      useUser: () => ({
        user: null,
      }),
      signOut: vi.fn(),
    }));

    render(<AuthButton />);
  });
  it("calls signOut when clicked", () => {
    fireEvent.click(screen.getByRole("button"));
    expect(signOut).toHaveBeenCalled();
  });
  it("displays sign in when user is not signed in", () => {
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});
