import Button from "@/components/button";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

describe("Button", () => {
  it("calls on click when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} label="Test" color="primary" />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });
});
