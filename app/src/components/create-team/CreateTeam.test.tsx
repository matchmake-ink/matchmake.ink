import { render, screen, fireEvent } from "@testing-library/react";
import { CreateTeam } from "./CreateTeam";
import { vi } from "vitest";

describe("CreateTeam page", () => {
  beforeEach(() => {
    vi.mock("@/api/create-team", () => ({
      createTeam: () => Promise.resolve(),
    }));
    vi.mock("react-router-dom", async () => {
      return {
        redirect: () => Promise.resolve(),
      };
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("renders a form with a name input, discord id input, and discord invite link input ", () => {
    render(<CreateTeam />);
    expect(screen.getByLabelText(/Team Tag/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Discord Server Invite/i)).toBeInTheDocument();
  });
  it("renders a submit button", () => {
    render(<CreateTeam />);
    expect(screen.getByRole("submit")).toBeInTheDocument();
  });
  it("submits the form to the backend", () => {
    render(<CreateTeam />);
    const input = screen.getByLabelText(/Team Tag/i);
    const submitButton = screen.getByRole("submit");

    fireEvent.change(input, { target: { value: "super-awesome-team" } });
    fireEvent.click(submitButton);
  });
});
