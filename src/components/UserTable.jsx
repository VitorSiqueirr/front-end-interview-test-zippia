import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import "../styles/UserTable.css";

export default function UserTable({ users, onRowClick, usersPerPage = 5 }) {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        const aValue = sortConfig.key.includes(".")
          ? sortConfig.key.split(".").reduce((o, i) => o[i], a)
          : a[sortConfig.key];
        const bValue = sortConfig.key.includes(".")
          ? sortConfig.key.split(".").reduce((o, i) => o[i], b)
          : b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▼" : "▲";
    }
    return "▼";
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="table-title" onClick={() => handleSort("name")}>
              Name <span>{getSortIcon("name")}</span>
            </th>
            <th className="table-title" onClick={() => handleSort("username")}>
              Username <span>{getSortIcon("username")}</span>
            </th>
            <th className="table-title" onClick={() => handleSort("email")}>
              Email <span>{getSortIcon("email")}</span>
            </th>
            <th className="table-title" onClick={() => handleSort("phone")}>
              Phone <span>{getSortIcon("phone")}</span>
            </th>
            <th
              className="table-title"
              onClick={() => handleSort("address.city")}>
              City <span>{getSortIcon("address.city")}</span>
            </th>
            <th
              className="table-title"
              onClick={() => handleSort("company.name")}>
              Company <span>{getSortIcon("company.name")}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              className="table-row"
              key={user.id}
              onClick={() => onRowClick(user)}>
              <td className="table-name">{user.name}</td>
              <td className="table-username">{user.username}</td>
              <td className="table-email">{user.email}</td>
              <td className="table-phone">{user.phone}</td>
              <td className="table-address">{user.address.city}</td>
              <td className="table-company-name">{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentPage > 1 && (
        <button className="pag-button" onClick={handlePrevPage}>
          Prev
        </button>
      )}
      {currentPage < Math.ceil(users.length / usersPerPage) && (
        <button className="pag-button" onClick={handleNextPage}>
          Next
        </button>
      )}
    </>
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
  usersPerPage: PropTypes.number,
};
