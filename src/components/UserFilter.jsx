import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import "../styles/UserFilter.css";
import { useUsers } from "../hooks/useUsers";

export default function UserFilter() {
  const [nameFilter, setNameFilter] = useState("");
  const { filterUsers, handleFetchUsers } = useUsers();

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
