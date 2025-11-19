import React from "react";
const InvoiceList = ({ invoices, onEdit, onDelete }) => {
    return (
        <div>
            <h3>Invoices</h3>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices?.map((inv) => (
                        <tr key={inv._id}>
                            <td>{inv.number}</td>
                            <td>{inv.date}</td>
                            <td>{inv.amount}</td>
                            <td>
                                <button onClick={() => onEdit(inv)}>Edit</button>
                                <button onClick={() => onDelete(inv._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default InvoiceList;