import CreateInvite from "@/components/create-invite";
import { createInvite } from "@/lib/client/team";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";

describe("CreateInvite", () => {
  beforeEach(() => {
    vi.mock("@/lib/client/team", () => ({
      createInvite: vi.fn(async () => Promise.resolve("12345678")),
    }));

    render(<CreateInvite />);
  });
  it("calls createInvite", () => {
    const create = screen.getByText("Create Invite");
    fireEvent.click(create);
    expect(createInvite).toHaveBeenCalled();
  });
});
