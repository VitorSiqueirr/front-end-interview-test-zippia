import { useState } from "react";
import PropTypes from "prop-types";

export default function UserFilter({ onFilterChange }) {
  const [nameFilter, setNameFilter] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNameFilter(value);
    onFilterChange(value);
  };

  return (
    <input
      type="text"
      placeholder="Filter by name"
      value={nameFilter}
      onChange={handleInputChange}
    />
  );
}

UserFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
