// src/pages/InvoicePage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getInvoices, createInvoice, deleteInvoices } from "../api/invoices";
import InvoiceList from "../components/InvoiceList";
import InvoiceForm from "../components/InvoiceForm";

const InvoicePage = () => {
  const { token } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);

  const loadData = async () => {
    try {
      const res = await getInvoices(token, page);
      setInvoices(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(); }, [page]);

  return (
    <div>
      <h2>Invoice Management</h2>
      <InvoiceForm onSubmit={async (data) => { await createInvoice(data, token); loadData(); }} />
      <InvoiceList invoices={invoices} />
    </div>
  );
};
export default InvoicePage;
