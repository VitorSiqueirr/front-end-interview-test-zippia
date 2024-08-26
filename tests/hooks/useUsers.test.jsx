import { act, renderHook } from "@testing-library/react-hooks";
import { useUsers } from "../../src/hooks/useUsers.jsx";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserContext } from "../../src/contexts/context/UserContext.js";
import { ErrorContext } from "../../src/contexts/context/ErrorContext.js";
import * as fetchModule from "../../src/api/fetch";

vi.mock("../../src/api/fetch", () => ({
  fetchUsers: vi.fn(),
}));

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

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

describe("useUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws an error if used outside of an ErrorProvider", () => {
    const wrapper = ({ children }) => (
      <ErrorContext.Provider value={{ error: "", setError: vi.fn() }}>
        {children}
      </ErrorContext.Provider>
    );
    const { result } = renderHook(() => useUsers(), { wrapper });
    expect
      .soft(result.error)
      .toEqual(Error("useUsers must be used within a UserProvider"));
  });

  it("initialize with default values", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    expect(result.current.users).toEqual([]);
    expect(result.current.filteredUsers).toEqual([]);
    expect(result.current.selectedUser).toBe(null);
    expect(typeof result.current.changeSelectedUser).toBe("function");
    expect(typeof result.current.filterUsers).toBe("function");
    expect(typeof result.current.handleFetchUsers).toBe("function");
  });

  it("fetch users on mount", async () => {
    const mockSetUsers = vi.fn();
    const mockSetFilteredUsers = vi.fn();

    fetchModule.fetchUsers.mockResolvedValue({ data: mockUsers });

    await act(async () => {
      renderHook(() => useUsers(), {
        wrapper: ({ children }) => (
          <UserContext.Provider
            value={{
              users: [],
              filteredUsers: [],
              selectedUser: null,
              setUsers: mockSetUsers,
              setFilteredUsers: mockSetFilteredUsers,
              setSelectedUser: vi.fn(),
            }}>
            <ErrorContext.Provider value={{ error: "", setError: vi.fn() }}>
              {children}
            </ErrorContext.Provider>
          </UserContext.Provider>
        ),
      });
    });

    expect(fetchModule.fetchUsers).toHaveBeenCalledTimes(1);
    expect(mockSetUsers).toHaveBeenCalledWith(mockUsers);
    expect(mockSetFilteredUsers).toHaveBeenCalledWith(mockUsers);
  });

  it("handle fetch error", async () => {
    const error = "No data received from fetchUsers";
    fetchModule.fetchUsers.mockResolvedValue({ error });

    const mockChangeErrorText = vi.fn();

    await act(async () => {
      renderHook(() => useUsers(), {
        wrapper: ({ children }) => (
          <UserContext.Provider
            value={{
              users: [],
              filteredUsers: [],
              selectedUser: null,
              setUsers: vi.fn(),
              setFilteredUsers: vi.fn(),
              setSelectedUser: vi.fn(),
            }}>
            <ErrorContext.Provider
              value={{ error: "", setError: mockChangeErrorText }}>
              {children}
            </ErrorContext.Provider>
          </UserContext.Provider>
        ),
      });
    });

    expect(mockChangeErrorText).toHaveBeenCalledWith(error);
  });

  it("change selected user", () => {
    const mockSetSelectedUser = vi.fn();
    const { result } = renderHook(() => useUsers(), {
      wrapper: ({ children }) => (
        <UserContext.Provider
          value={{
            users: mockUsers,
            filteredUsers: mockUsers,
            selectedUser: null,
            setUsers: vi.fn(),
            setFilteredUsers: vi.fn(),
            setSelectedUser: mockSetSelectedUser,
          }}>
          <ErrorContext.Provider value={{ error: "", setError: vi.fn() }}>
            {children}
          </ErrorContext.Provider>
        </UserContext.Provider>
      ),
    });

    act(() => {
      result.current.changeSelectedUser(1);
    });

    expect(mockSetSelectedUser).toHaveBeenCalledWith(mockUsers[0]);
  });

  it("filter users", () => {
    const mockSetFilteredUsers = vi.fn();
    const { result } = renderHook(() => useUsers(), {
      wrapper: ({ children }) => (
        <UserContext.Provider
          value={{
            users: mockUsers,
            filteredUsers: mockUsers,
            selectedUser: null,
            setUsers: vi.fn(),
            setFilteredUsers: mockSetFilteredUsers,
            setSelectedUser: vi.fn(),
          }}>
          <ErrorContext.Provider value={{ error: "", setError: vi.fn() }}>
            {children}
          </ErrorContext.Provider>
        </UserContext.Provider>
      ),
    });

    act(() => {
      result.current.filterUsers("John");
    });

    expect(mockSetFilteredUsers).toHaveBeenCalledWith([mockUsers[0]]);
  });
});
