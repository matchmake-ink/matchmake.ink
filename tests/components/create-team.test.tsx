import CreateTeam from "@/components/create-team";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createTeam } from "@/lib/client/team";

describe("CreateTeam", () => {
  beforeEach(() => {
    vi.mock("@/lib/client/team", () => ({
      createTeam: vi.fn(),
    }));
  });
  it("calls createTeam when submitted", () => {
    const onFinishedSubmitting = vi.fn();
    const { getByRole } = render(
      <CreateTeam onFinishedSubmitting={onFinishedSubmitting} />
    );
    fireEvent.change(getByRole("textbox"), { target: { value: "Test" } });
    fireEvent.click(getByRole("button"));

    expect(onFinishedSubmitting).toHaveBeenCalled();
    expect(createTeam).toHaveBeenCalledWith("Test");
  });
});
