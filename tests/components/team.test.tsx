import { CreateTeam } from "@/components/team";
import { vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { createTeam } from "@/lib/client/team";

describe("CreateTeam", () => {
  beforeEach(() => {
    vi.mock("@/lib/client/team", () => ({
      createTeam: vi.fn(),
    }));
  });
  it("calls createTeam when submitted", () => {
    const { getByLabelText, getByText } = render(<CreateTeam />);
    fireEvent.change(getByLabelText("Team Name"), {
      target: { value: "Test" },
    });
    fireEvent.change(getByLabelText("Team Email"), {
      target: { value: "Test" },
    });
    fireEvent.click(getByText("Submit"));

    expect(createTeam).toHaveBeenCalledWith("Test", "Test");
  });
});
