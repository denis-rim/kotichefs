import { useParams, useNavigate } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";

export default function Invoice() {
  let navigate = useNavigate();
  let params = useParams();

  if (!params.invoiceId) {
    return <div>No invoice id</div>;
  }

  let invoice = getInvoice(parseInt(params.invoiceId, 10));

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={() => {
            // @ts-ignore
            deleteInvoice(invoice.number);
            navigate("/invoices");
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}
