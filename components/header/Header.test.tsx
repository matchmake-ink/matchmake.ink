import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders matchmake.ink as a link to the homepage", () => {
    render(<Header />);
    expect(screen.getByText(/matchmake.ink/)).toHaveAttribute("href", "/");
  });
});
