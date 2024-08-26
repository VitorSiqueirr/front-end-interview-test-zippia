import PropTypes from "prop-types";
import { SORT_DIRECTIONS } from "../const/table";

export default function TableHeader({ columns, sortConfig, onSort }) {
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === SORT_DIRECTIONS.ASC ? "▼" : "▲";
    }
    return "▼";
  };

  return (
    <thead>
      <tr>
        {columns.map(({ key, label }) => (
          <th key={key} className="table-title" onClick={() => onSort(key)}>
            {label} <span>{getSortIcon(key)}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  sortConfig: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};
