import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {InvoiceForm} from '../components/InvoiceForm'

const InvoiceDashboard = () => {
  const { token } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [filters, setFilters] = useState({ page:1, limit:10, financialYear: "", invoiceNumber: "", dateFrom: "", dateTo: "" });

  const fetchInvoices = async () => {
    const params = new URLSearchParams(filters);
    const res = await fetch("/api/invoices?" + params.toString(), {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setInvoices(data);
  };

  useEffect(() => { fetchInvoices(); }, [filters]);

  return (
    <div>
      <h2>Invoices</h2>
      {/* Controls: filter by FY, search by number, date range */}
      {/* List with update/delete buttons (call API with token) */}
      <ul>
        {invoices.map(inv => <li key={inv._id}>{inv.financialYear} - #{inv.invoiceNumber} - {new Date(inv.invoiceDate).toLocaleDateString()} - {inv.amount}</li>)}
      </ul>
      <InvoiceForm/>
    </div>
  );
};
export default InvoiceDashboard;
