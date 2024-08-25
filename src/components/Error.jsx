import PropTypes from "prop-types";
import "../styles/Error.css";
import { useError } from "../hooks/useError";
import { useCloseModal } from "../hooks/useCloseModal";

export default function Error() {
  const { error, changeErrorText } = useError();
  const { closeModal } = useCloseModal();

  return (
    <>
      {error && (
        <div className="error-container">
          <div className="error-mask"></div>
          <div className="error-content">
            <span
              role="close"
              className="close"
              onClick={() => closeModal(changeErrorText)}>
              &times;
            </span>
            <span className="error-title">Error:</span>
            <p className="error">{error}</p>
          </div>
        </div>
      )}
    </>
  );
}

Error.propTypes = {
  onClose: PropTypes.func.isRequired,
};
