import UserFilter from "./components/UserFilter";
import UserTable from "./components/UserTable";
import UserDetailsModal from "./components/UserDetailsModal";
import Error from "./components/Error";
import Title from "./components/Title";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Title text={"User Management Dashboard"} />
      <UserFilter />
      <Error />
      <UserTable />
      <UserDetailsModal />
    </div>
  );
}

export default App;
