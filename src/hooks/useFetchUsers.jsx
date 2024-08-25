import { useEffect, useContext } from "react";
import { fetchUsers } from "../api/fetch";
import { useError } from "./useError";
import { UserContext } from "../contexts/context/UserContext";

export const useFetchUsers = () => {
  const context = useContext(UserContext);
  const { setError } = useError();

  if (!context) {
    throw new Error("useFetchUsers must be used within a UserProvider");
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
    const result = await fetchUsers();
    if (result.data) {
      setUsers(result.data);
      setFilteredUsers(result.data);
    } else if (result.error) {
      setError(result.error);
    }
  };

  return {
    users,
    filteredUsers,
    selectedUser,
    setSelectedUser,
    setFilteredUsers,
    handleFetchUsers,
  };
};
