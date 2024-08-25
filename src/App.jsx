import { useEffect, useState } from "react";
import { fetchUsers } from "./api/fetch";
import UserFilter from "./components/UserFilter";
import UserTable from "./components/UserTable";
import UserDetailsModal from "./components/UserDetailsModal";
import "./styles/App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const filterUsers = (nameFilter) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleFetchUsers = async () => {
    const result = await fetchUsers();
    if (result.data) {
      setUsers(result.data);
      setFilteredUsers(result.data);
    } else if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="App">
      <h1 className="title">User Management Dashboard</h1>
      <div className="filter-container">
        <UserFilter onFilterChange={filterUsers} />
        <button className="fetch-button" onClick={handleFetchUsers}>
          Fetch Users
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <UserTable users={filteredUsers} onRowClick={handleRowClick} />
      <UserDetailsModal user={selectedUser} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
