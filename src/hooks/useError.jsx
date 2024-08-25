import { useContext } from "react";
import { ErrorContext } from "../contexts/context/ErrorContext";

export const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }

  const { error, setError } = context;

  return {
    error,
    setError,
  };
};
