import { useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        users,
        filteredUsers,
        selectedUser,
        setUsers,
        setFilteredUsers,
        setSelectedUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
