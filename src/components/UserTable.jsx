import PropTypes from "prop-types";
import { useState } from "react";

export default function UserTable({ users, onRowClick, usersPerPage = 5 }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

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

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="table-title" onClick={() => handleSort("name")}>
              Name
            </th>
            <th className="table-title" onClick={() => handleSort("username")}>
              Username
            </th>
            <th className="table-title" onClick={() => handleSort("email")}>
              Email
            </th>
            <th className="table-title" onClick={() => handleSort("phone")}>
              Phone
            </th>
            <th
              className="table-title"
              onClick={() => handleSort("address.city")}>
              City
            </th>
            <th
              className="table-title"
              onClick={() => handleSort("company.name")}>
              Company
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
      {currentPage > 1 && <button onClick={handlePrevPage}>Prev</button>}
      {currentPage < Math.ceil(users.length / usersPerPage) && (
        <button onClick={handleNextPage}>Next</button>
      )}
    </>
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
  usersPerPage: PropTypes.number,
};
