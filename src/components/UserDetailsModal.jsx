import PropTypes from "prop-types";

export default function UserDetailsModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="modal">
      <div className="mask" onClick={onClose}></div>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>User Details</h2>
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          <p>
            <strong>Address:</strong> {user.address.street}, {user.address.city}
          </p>
          <p>
            <strong>Company:</strong> {user.company.name}
          </p>
        </div>
      </div>
    </div>
  );
}

UserDetailsModal.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
