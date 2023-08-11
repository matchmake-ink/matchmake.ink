import AuthButton from "@/components/auth-button";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { signOut } from "@/lib/client/auth";

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("AuthButton", () => {
  it("calls signOut when clicked", () => {
    render(<AuthButton />);

    fireEvent.click(screen.getByRole("button"));
    expect(signOut).toHaveBeenCalled();
  });
  it("displays sign in when user is not signed in", () => {
    vi.clearAllMocks();
    vi.mock("@/lib/client/auth", () => ({
      useUser: () => ({
        user: null,
      }),
      signOut: vi.fn(),
    }));
    render(<AuthButton />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});
