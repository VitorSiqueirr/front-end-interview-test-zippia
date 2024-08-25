import { useFetchUsers } from "./hooks/useFetchUsers";
import UserFilter from "./components/UserFilter";
import UserTable from "./components/UserTable";
import UserDetailsModal from "./components/UserDetailsModal";
import Error from "./components/Error";
import Title from "./components/Title";
import "./styles/App.css";
import { useError } from "./hooks/useError";

function App() {
  const { setSelectedUser } = useFetchUsers();

  const { setError } = useError();

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setError(null);
  };

  return (
    <div className="App">
      <Title text={"User Management Dashboard"} />
      <UserFilter />
      <Error onClose={handleCloseModal} />
      <UserTable onRowClick={handleRowClick} />
      <UserDetailsModal onClose={handleCloseModal} />
    </div>
  );
}

export default App;
