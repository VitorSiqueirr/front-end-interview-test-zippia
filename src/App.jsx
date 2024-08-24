import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [nameFilter, setNameFilter] = useState("");

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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNameFilter(value);
    filterUsers(value);
  };

  return (
    <div className="App">
      <h1 className="title">User Management Dashboard</h1>
      <input
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={handleInputChange}
      />
      <button onClick={fetchUsers}>Fetch Users</button>
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th className="table-title">Name</th>
            <th className="table-title">Username</th>
            <th className="table-title">Email</th>
            <th className="table-title">Phone</th>
            <th className="table-title">City</th>
            <th className="table-title">Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr className="table-row" key={user.id}>
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
    </div>
  );
}

export default App;
