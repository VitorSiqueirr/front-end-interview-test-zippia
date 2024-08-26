import PropTypes from "prop-types";

export default function Pagination({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) {
  return (
    <>
      {currentPage > 1 && (
        <button className="pag-button" onClick={onPrevPage}>
          Prev
        </button>
      )}
      {currentPage < totalPages && (
        <button className="pag-button" onClick={onNextPage}>
          Next
        </button>
      )}
    </>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
};
