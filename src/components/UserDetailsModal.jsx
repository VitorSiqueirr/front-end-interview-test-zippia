import PropTypes from "prop-types";
import "../styles/UserDetailsModal.css";
import { useUsers } from "../hooks/useUsers";
import { useCloseModal } from "../hooks/useCloseModal";

export default function UserDetailsModal() {
  const { selectedUser, changeSelectedUser } = useUsers();
  const { closeModal } = useCloseModal();

  if (!selectedUser) return null;

  return (
    <div className="modal">
      <div
        className="mask"
        onClick={() => closeModal(changeSelectedUser)}></div>
      <div className="modal-content">
        <span
          role="close"
          className="close"
          onClick={() => closeModal(changeSelectedUser)}>
          &times;
        </span>
        <h2>User Details</h2>
        <div>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser.phone}
          </p>
          <p>
            <strong>Website:</strong> {selectedUser.website}
          </p>
          <p>
            <strong>Address:</strong> {selectedUser.address.street},{" "}
            {selectedUser.address.suite} , {selectedUser.address.city}
          </p>
          <p>
            <strong>Company:</strong> {selectedUser.company.name}
          </p>
        </div>
      </div>
    </div>
  );
}

UserDetailsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
