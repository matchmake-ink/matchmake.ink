import Sidebar from "@/components/sidebar";
import { render } from "@testing-library/react";

describe("Sidebar", () => {
  it("should render", () => {
    render(<Sidebar />);
  });
});
