import { useState } from "react";
import PropTypes from "prop-types";
import { ErrorContext } from "../context/ErrorContext";

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
      }}>
      {children}
    </ErrorContext.Provider>
  );
};

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
