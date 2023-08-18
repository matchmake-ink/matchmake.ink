import CreateTeam from "@/components/create-team";
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
    const { getByRole, getByText } = render(<CreateTeam />);
    fireEvent.change(getByRole("textbox"), { target: { value: "Test" } });
    fireEvent.click(getByText("Submit"));

    expect(createTeam).toHaveBeenCalledWith("Test");
  });
});
