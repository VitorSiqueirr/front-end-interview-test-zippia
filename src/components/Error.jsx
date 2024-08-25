import PropTypes from "prop-types";
import "../styles/Error.css";
import { useError } from "../hooks/useError";

export default function Error({ onClose }) {
  const { error } = useError();

  {
    error && (
      <div className="error-container">
        <div className="error-mask"></div>
        <div className="error-content">
          <span role="close" className="close" onClick={onClose}>
            &times;
          </span>
          <span className="error-title">Error:</span>
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }
}

Error.propTypes = {
  onClose: PropTypes.func.isRequired,
};
