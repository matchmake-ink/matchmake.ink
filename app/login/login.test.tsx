import Login from "./page";
import { render, screen } from "@testing-library/react";

describe("Login page", () => {
  beforeEach(() => {
    render(<Login />);
  });
  it("renders a discord auth button", () => {
    expect(screen.getByText(/Sign in with Discord/)).toBeInTheDocument();
  });
});
