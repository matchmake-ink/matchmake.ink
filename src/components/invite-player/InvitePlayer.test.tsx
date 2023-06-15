import { render, screen } from "@testing-library/react";
import { InvitePlayer } from "./InvitePlayer";

describe("InvitePlayer", () => {
  beforeEach(() => {
    render(<InvitePlayer />);
  });

  it("renders the text 'Invite Player' ", () => {
    expect(screen.getByText(/Invite Player/)).toBeInTheDocument();
  });
  it("renders a text input field", () => {
    expect(screen.getByLabelText(/Discord Username/)).toBeInTheDocument();
  });
  it("renders a submit button", () => {
    expect(screen.getByRole("button", { name: /Invite/ })).toBeInTheDocument();
  });
  it("");
});
