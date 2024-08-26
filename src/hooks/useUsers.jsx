import { useEffect, useContext } from "react";
import { fetchUsers } from "../api/fetch";
import { useError } from "./useError";
import { UserContext } from "../contexts/context/UserContext";

export const useUsers = () => {
  const context = useContext(UserContext);
  const { changeErrorText } = useError();

  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }

  const {
    users,
    filteredUsers,
    selectedUser,
    setUsers,
    setFilteredUsers,
    setSelectedUser,
  } = context;

  useEffect(() => {
    handleFetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchUsers = async () => {
    try {
      const result = await fetchUsers();
      if (result && result.data) {
        setUsers(result.data);
        setFilteredUsers(result.data);
      } else {
        throw new Error("No data received from fetchUsers");
      }
    } catch (error) {
      changeErrorText(error.message || "Failed to fetch users");
    }
  };

  const changeSelectedUser = (id) => {
    if (!id) {
      setSelectedUser(null);
      return;
    }
    const user = users.find((user) => user.id === id);
    setSelectedUser(user);
  };

  const filterUsers = (nameFilter) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return {
    users,
    filteredUsers,
    selectedUser,
    changeSelectedUser,
    filterUsers,
    handleFetchUsers,
  };
};
