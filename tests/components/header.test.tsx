import Header from "@/components/header";
import { render } from "@testing-library/react";
import { vi } from "vitest";

describe("Header", () => {
  beforeEach(() => {
    vi.mock("@/components/auth-button", () => {
      return {
        default: () => <button>Sign In</button>,
      };
    });
  });
  it("renders", () => {
    render(<Header />);
  });
});
