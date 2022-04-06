import ReactPaginate from "react-paginate";
import React from "react";

import styles from "./Pagination.module.css";

function Pagination({
  pagesCount,
  onPageChange,
}: {
  pagesCount: number;
  onPageChange: (event: { selected: number }) => void;
}) {
  return (
    <div className={styles.container}>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pagesCount}
        previousLabel="< previous"
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageLink}
        previousClassName={styles.pageItem}
        previousLinkClassName={styles.pageLink}
        nextClassName={styles.pageItem}
        nextLinkClassName={styles.pageLink}
        breakLabel="..."
        breakClassName={styles.pageItem}
        breakLinkClassName={styles.pageLink}
        containerClassName={styles.paginationContainer}
        activeClassName={styles.pageActive}
        renderOnZeroPageCount={() => null}
      />
    </div>
  );
}

export default Pagination;
