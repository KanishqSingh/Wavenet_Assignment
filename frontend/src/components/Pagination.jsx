import React from "react";
const Pagination = ({ page, total, onChange }) => (
    <div>
        <button disabled={page <= 1} onClick={() => onChange(page - 1)}>Prev</button>
        <span>{page} / {total}</span>
        <button disabled={page >= total} onClick={() => onChange(page + 1)}>Next</button>
    </div>
);
export default Pagination;