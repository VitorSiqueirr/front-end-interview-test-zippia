import PropTypes from "prop-types";
import "../styles/Title.css";

export default function Title({ text }) {
  return <h1 className="title">{text}</h1>;
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
};
