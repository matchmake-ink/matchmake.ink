import Input from "@/components/input";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

describe("Input", () => {
  it("should call onChange", () => {
    const onChange = vi.fn();
    render(<Input label="Test" value="test" onChange={onChange} type="text" />);
    const input = screen.getByLabelText("Test");

    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Test" } });
    expect(onChange).toHaveBeenCalledWith("Test");
  });
});
