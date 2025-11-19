import React from "react";
const Filters = ({ filters, setFilters }) => (
    <div>
        <input placeholder="Search by number" onChange={(e) => setFilters({ ...filters, number: e.target.value })} />
        <select onChange={(e) => setFilters({ ...filters, fy: e.target.value })}>
            <option>All FY</option>
            <option>2022-23</option>
            <option>2023-24</option>
        </select>
        <input type="date" onChange={(e) => setFilters({ ...filters, start: e.target.value })} />
        <input type="date" onChange={(e) => setFilters({ ...filters, end: e.target.value })} />
    </div>
);
export default Filters;