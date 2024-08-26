import { renderHook, act } from "@testing-library/react-hooks";
import { useError } from "../../src/hooks/useError";
import { ErrorContext } from "../../src/contexts/context/ErrorContext";
import { describe, expect, it, vi } from "vitest";

const wrapper = ({ children }) => (
  <ErrorContext.Provider value={{ error: "", setError: vi.fn() }}>
    {children}
  </ErrorContext.Provider>
);

describe("useError", () => {
  it("throws an error if used outside of an ErrorProvider", () => {
    const { result } = renderHook(() => useError());
    expect
      .soft(result.error)
      .toEqual(Error("useError must be used within an ErrorProvider"));
  });

  it("returns the correct initial error state", () => {
    const { result } = renderHook(() => useError(), { wrapper });
    expect.soft(result.current.error).toBe("");
  });

  it("update the error state correctly", () => {
    const setError = vi.fn();
    const wrapper = ({ children }) => (
      <ErrorContext.Provider value={{ error: "", setError }}>
        {children}
      </ErrorContext.Provider>
    );

    const { result } = renderHook(() => useError(), { wrapper });

    act(() => {
      result.current.changeErrorText("New error");
    });

    expect.soft(setError).toHaveBeenCalledWith("New error");
  });
});
