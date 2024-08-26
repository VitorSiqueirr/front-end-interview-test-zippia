import PropTypes from "prop-types";

export default function TableBody({ users, onRowClick }) {
  return (
    <tbody>
      {users.map((user) => (
        <tr
          className="table-row"
          key={user.id}
          onClick={() => onRowClick(user.id)}>
          <td className="table-name">{user.name}</td>
          <td className="table-username">{user.username}</td>
          <td className="table-email">{user.email}</td>
          <td className="table-phone">{user.phone}</td>
          <td className="table-address">{user.address.city}</td>
          <td className="table-company-name">{user.company.name}</td>
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  users: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
