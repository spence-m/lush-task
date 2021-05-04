import { render, screen } from "@testing-library/react";
import MyApp from "../pages/index";

it("should render", () => {
  render(<MyApp />);
  expect(screen.getByText("Hello World!")).toBeInTheDocument();
});
