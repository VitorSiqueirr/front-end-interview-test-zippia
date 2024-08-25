import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserDetailsModal from "../../src/components/UserDetailsModal.jsx";
import userEvent from "@testing-library/user-event";

describe("UserDetailsModal component", () => {
  const user = userEvent.setup();

  const userExemple = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    website: "johndoe.com",
    address: {
      street: "123 Main St",
      suite: "Apt 101",
      city: "Anytown",
    },
    company: {
      name: "Doe Enterprises",
    },
  };

  it("renders user details correctly", () => {
    const onClose = vi.fn();
    render(<UserDetailsModal user={userExemple} onClose={onClose} />);

    expect.soft(screen.getByText(userExemple.name)).toBeInTheDocument();
    expect.soft(screen.getByText(userExemple.email)).toBeInTheDocument();
    expect.soft(screen.getByText(userExemple.phone)).toBeInTheDocument();
    expect.soft(screen.getByText(userExemple.website)).toBeInTheDocument();
    expect
      .soft(
        screen.getByText((content) =>
          content.includes(userExemple.address.street)
        )
      )
      .toBeInTheDocument();
    expect
      .soft(
        screen.getByText((content) =>
          content.includes(userExemple.address.suite)
        )
      )
      .toBeInTheDocument();
    expect
      .soft(
        screen.getByText((content) =>
          content.includes(userExemple.address.city)
        )
      )
      .toBeInTheDocument();
    expect.soft(screen.getByText(userExemple.company.name)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    render(<UserDetailsModal user={userExemple} onClose={onClose} />);

    const closeButton = screen.getByRole("close");
    await user.click(closeButton);

    expect.soft(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render when user is null", () => {
    const onClose = vi.fn();
    render(<UserDetailsModal user={null} onClose={onClose} />);

    expect(screen.queryByText(userExemple.name)).not.toBeInTheDocument();
  });
});
