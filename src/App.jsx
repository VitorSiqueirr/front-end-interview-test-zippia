import { useEffect, useState } from "react";
import "./App.css";
import UserFilter from "./components/UserFilter";
import UserTable from "./components/UserTable";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      if (error.name === "TypeError") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(error.message);
      }
    }
  };

  const filterUsers = (nameFilter) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="App">
      <h1 className="title">User Management Dashboard</h1>
      <UserFilter onFilterChange={filterUsers} />
      <button onClick={fetchUsers}>Fetch Users</button>
      {error && <p className="error">{error}</p>}
      <UserTable currentUsers={filteredUsers} />
    </div>
  );
}

export default App;
