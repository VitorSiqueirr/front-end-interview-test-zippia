import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import "../styles/UserFilter.css";
import { useFetchUsers } from "../hooks/useFetchUsers";

export default function UserFilter() {
  const [nameFilter, setNameFilter] = useState("");
  const { users, setFilteredUsers, handleFetchUsers } = useFetchUsers();

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
    <div className="filter-container">
      <Input
        className={"filter"}
        type={"text"}
        placeholder={"Filter By Name..."}
        value={nameFilter}
        onChange={handleInputChange}
      />
      <Button className="fetch-button" onClick={handleFetchUsers}>
        Fetch Users
      </Button>
    </div>
  );
}
