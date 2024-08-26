import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserFilter from "../../src/components/UserFilter.jsx";
import userEvent from "@testing-library/user-event";
import { UserContext } from "../../src/contexts/context/UserContext";
import { ErrorContext } from "../../src/contexts/context/ErrorContext";
import { useUsers } from "../../src/hooks/useUsers.jsx";

vi.mock("../../src/hooks/useUsers.jsx", () => ({
  useUsers: () => ({
    filterUsers: vi.fn(),
    handleFetchUsers: vi.fn(),
  }),
}));

const wrapper = ({ children }) => (
  <UserContext.Provider
    value={{
      users: [],
      filteredUsers: [],
      selectedUser: null,
      setUsers: vi.fn(),
      setFilteredUsers: vi.fn(),
      setSelectedUser: vi.fn(),
    }}>
    <ErrorContext.Provider value={{ error: "", setError: vi.fn() }}>
      {children}
    </ErrorContext.Provider>
  </UserContext.Provider>
);

describe("UserFilter Component", () => {
  const user = userEvent.setup();

  it("renders the input field", () => {
    render(<UserFilter />, { wrapper });
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls filterUsers when typing in the input field", async () => {
    const mockFilterUsers = useUsers().filterUsers;

    render(<UserFilter />, { wrapper });
    await user.type(screen.getByRole("textbox"), "Leanne");

    expect(mockFilterUsers).toHaveBeenCalled;
  });
});
