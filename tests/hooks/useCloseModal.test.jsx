import { renderHook, act } from "@testing-library/react-hooks";
import { useCloseModal } from "../../src/hooks/useCloseModal";
import { describe, expect, it, vi } from "vitest";

describe("useCloseModal", () => {
  it("set the state of a function to null when closeModal is called", () => {
    const setNullFunc = vi.fn();
    const { result } = renderHook(() => useCloseModal());

    act(() => {
      result.current.closeModal(setNullFunc);
    });

    expect.soft(setNullFunc).toHaveBeenCalledWith(null);
  });
});
