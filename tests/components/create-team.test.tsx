import CreateTeam from "@/components/create-team";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { createTeam } from "@/lib/client/team";
import { vi } from "vitest";

vi.mock("@/lib/client/team", () => {
  return {
    createTeam: vi.fn(),
  };
});

describe("CreateTeam", () => {
  it("should call createTeam", () => {
    // Arrange
    render(<CreateTeam onFinishedSubmitting={() => {}} />);
    const input = screen.getByLabelText("Team Name");
    const button = screen.getByRole("button");
    const teamName = "Test Team";

    // Act
    fireEvent.change(input, { target: { value: teamName } });
    fireEvent.click(button);

    // Assert
    expect(createTeam).toHaveBeenCalledWith(teamName);
  });
  it("should call onFinishedSubmitting", () => {
    // Arrange
    const onFinishedSubmitting = vi.fn();

    render(<CreateTeam onFinishedSubmitting={onFinishedSubmitting} />);
    const input = screen.getByLabelText("Team Name");
    const button = screen.getByRole("button");
    const teamName = "Test Team";

    // Act
    act(() => {
      fireEvent.change(input, { target: { value: teamName } });
      fireEvent.click(button);
    });

    // Assert
    expect(onFinishedSubmitting).toHaveBeenCalled();
  });
});
