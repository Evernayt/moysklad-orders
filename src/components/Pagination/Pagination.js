import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Вперед"
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="Назад"
      renderOnZeroPageCount={null}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-page"
      activeLinkClassName="pagination-active"
      previousLinkClassName="pagination-previous-next"
      nextLinkClassName="pagination-previous-next"
      disabledLinkClassName="pagination-disabled"
      breakLinkClassName="pagination-break"
      // forcePage={page - 1}
    />
  );
};

export default Pagination;
