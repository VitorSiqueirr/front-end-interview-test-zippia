import PropTypes from "prop-types";

export default function UserTable({ currentUsers }) {
  return (
    <>
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
          {currentUsers.map((user) => (
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
    </>
  );
}

UserTable.propTypes = {
  currentUsers: PropTypes.array.isRequired,
};
