import { Footer } from "./Footer";
import { screen, render } from "@testing-library/react";
import contributors from "./contributors.json";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders the names of the contributors", () => {
    contributors.forEach((contributor) => {
      expect(screen.getByText(contributor.name)).toBeInTheDocument();
    });
  });
  it("links the names of the contributors to their github profile", () => {
    contributors.forEach((contributor) => {
      expect(screen.getByText(contributor.name).closest("a")).toHaveAttribute(
        "href",
        contributor.url
      );
    });
  });
});
