import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import TableHeader from "./TableHeader";
import { SORT_DIRECTIONS, TABLE_COLUMNS } from "../consts/table";
import "../styles/UserTable.css";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import { getNestedValue } from "../auxiliary/table";

export default function UserTable({ usersPerPage = 5 }) {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: SORT_DIRECTIONS.ASC,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { filteredUsers, changeSelectedUser } = useUsers();

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue < bValue)
        return sortConfig.direction === SORT_DIRECTIONS.ASC ? -1 : 1;
      if (aValue > bValue)
        return sortConfig.direction === SORT_DIRECTIONS.ASC ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  const currentUsers = useMemo(() => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  }, [sortedUsers, currentPage, usersPerPage]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === SORT_DIRECTIONS.ASC
          ? SORT_DIRECTIONS.DESC
          : SORT_DIRECTIONS.ASC,
    }));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredUsers.length / usersPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <table>
        <TableHeader
          columns={TABLE_COLUMNS}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
        <TableBody users={currentUsers} onRowClick={changeSelectedUser} />
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </>
  );
}

UserTable.propTypes = {
  usersPerPage: PropTypes.number,
};
