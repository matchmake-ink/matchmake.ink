import UserProfile from "@/components/user-profile";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

describe("UserProfile", () => {
  beforeEach(() => {
    vi.mock("@/lib/client/profile", () => {
      return {
        useProfile: () => ({
          profile: {
            ign: "Test IGN",
            discordTag: "Test#1234",
          },
          profileLoading: false,
          profileError: false,
        }),
      };
    });

    render(<UserProfile />);
  });
  it("renders the IGN", () => {
    expect(screen.getByText("Test IGN")).toBeInTheDocument();
  });
  it("renders the Discord tag", () => {
    expect(screen.getByText("Test#1234")).toBeInTheDocument();
  });
});
