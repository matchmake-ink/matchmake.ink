import Greeter from "@/components/Greeter";
import { render, screen } from "@testing-library/react";

describe("Greeter", () => {
  it("renders a greeting", () => {
    render(<Greeter name="World" />);
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });
});
