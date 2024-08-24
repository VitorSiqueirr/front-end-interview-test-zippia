import PropTypes from "prop-types";
import { useState } from "react";

export default function UserTable({ users, onRowClick }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

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
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => handlePageChange(number)}>
            {number}
          </button>
        ))}
      </div>
    </>
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
