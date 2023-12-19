import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  // creating an array of which pages to display based on current page and total pages
  const visiblePages = () => {
    if (totalPages <= 3) {
      // If total pages are 3 or less, show all pages
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else if (currentPage <= 2) {
      // If current page is 1 or 2, show the first 3 pages
      return [1, 2, 3];
    } else if (currentPage >= totalPages - 1) {
      // If current page is near the end, show the last 3 pages
      return [totalPages - 2, totalPages - 1, totalPages];
    } else {
      // If current page is in the middle, show the current page and the adjacent ones
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {/* Previous button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        {/* Ellipsis and first page if needed */}
        {currentPage > 2 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => setCurrentPage(1)}>
                1
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          </>
        )}

        {/* Visible pages */}
        {visiblePages().map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          </li>
        ))}

        {/* Ellipsis and last page if needed */}
        {currentPage < totalPages - 1 && (
          <>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Next button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
