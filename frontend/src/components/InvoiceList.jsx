import React from "react";

const InvoiceList = ({ invoices, onEdit, onDelete }) => {
    return (
        <div className="mt-10 px-6">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Invoices</h3>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full border border-gray-300 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">No</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Amount</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoices?.map((inv) => (
                            <tr key={inv._id} className="text-center">
                                <td className="px-4 py-2 border">{inv.number}</td>
                                <td className="px-4 py-2 border">{inv.date}</td>
                                <td className="px-4 py-2 border">{inv.amount}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        onClick={() => onEdit(inv)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                        onClick={() => onDelete(inv._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceList;
