import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserTable from "../../src/components/UserTable.jsx";
import userEvent from "@testing-library/user-event";

describe("UserTable Component", () => {
  const user = userEvent.setup();

  const users = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      phone: "1-770-736-8031 x56442",
      address: { city: "Gwenborough" },
      company: { name: "Romaguera-Crona" },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      phone: "010-692-6593 x09125",
      address: { city: "Wisokyburgh" },
      company: { name: "Deckow-Crist" },
    },
  ];

  it("renders the table with user data", () => {
    render(<UserTable users={users} onRowClick={vi.fn()} />);

    expect.soft(screen.getByRole("table")).toBeInTheDocument();
    expect.soft(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect.soft(screen.getByText("Ervin Howell")).toBeInTheDocument();
  });

  it("calls onRowClick when a row is clicked", async () => {
    const onRowClick = vi.fn();
    render(<UserTable users={users} onRowClick={onRowClick} />);

    const firstRow = screen.getAllByRole("row")[1]; // Ignoring the header row
    await user.click(firstRow);

    expect.soft(onRowClick).toHaveBeenCalledWith(users[0]);
  });

  it("handles pagination correctly", async () => {
    render(<UserTable users={users} usersPerPage={1} />);

    expect.soft(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect.soft(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();

    expect
      .soft(screen.queryByRole("button", { name: "Prev" }))
      .not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next" }));

    expect
      .soft(screen.queryByRole("button", { name: "Next" }))
      .not.toBeInTheDocument();

    expect.soft(screen.getByText("Ervin Howell")).toBeInTheDocument();
    expect.soft(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
  });
});
