import JoinTeam from "@/components/join-team";
import { joinTeam } from "@/lib/client/team";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

describe("JoinTeam", () => {
  beforeEach(() => {
    vi.mock("@/lib/client/team", () => ({
      joinTeam: vi.fn(),
    }));

    render(<JoinTeam />);
  });
  it("calls joinTeam", () => {
    const join = screen.getByText("Join");
    const id = screen.getByLabelText("Team Code");
    fireEvent.change(id, {
      target: {
        value: "123",
      },
    });

    fireEvent.click(join);
    expect(joinTeam).toHaveBeenCalledWith("123");
  });
});
