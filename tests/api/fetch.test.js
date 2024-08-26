import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchUsers } from "../../src/api/fetch";

window.fetch = vi.fn();

describe("fetchUsers", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("search user with success", async () => {
    const mockUsers = [{ id: 1, name: "John Doe" }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const result = await fetchUsers();
    expect.soft(result.data).toEqual(mockUsers);
  });

  it("handle with search error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });

    const result = await fetchUsers();
    expect.soft(result.error).toBe("Failed to fetch users: Not Found");
  });

  it("handle with internet connection error", async () => {
    fetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));

    const result = await fetchUsers();
    expect
      .soft(result.error)
      .toBe("Network error. Please check your internet connection.");
  });

  it("handle other errors", async () => {
    fetch.mockRejectedValueOnce(new Error("Some other error"));

    const result = await fetchUsers();
    expect.soft(result.error).toBe("Some other error");
  });
});
