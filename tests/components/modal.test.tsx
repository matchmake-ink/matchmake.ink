import Modal from "@/components/modal";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

const mockOnClose = vi.fn();

describe("Modal", () => {
  beforeEach(() => {
    render(
      <Modal open={true} onClose={mockOnClose}>
        <p>Test Content</p>
      </Modal>
    );
  });
  it("renders its children", () => {
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
  it("calls onClose when the close button is clicked", () => {
    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
