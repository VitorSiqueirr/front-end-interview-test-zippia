import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserFilter from "../../src/components/UserFilter.jsx";
import userEvent from "@testing-library/user-event";

describe("UserFilter Component", () => {
  const user = userEvent.setup();

  it("renders the input field", () => {
    render(<UserFilter onFilterChange={vi.fn()} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls onFilterChange when typing in the input field", async () => {
    const onFilterChange = vi.fn();
    render(<UserFilter onFilterChange={onFilterChange} />);
    await user.type(screen.getByRole("textbox"), "Leanne");
    expect(onFilterChange).toHaveBeenCalledWith("Leanne");
  });
});
