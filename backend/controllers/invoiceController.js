// controllers/invoiceController.js
import Invoice from "../model/Invoice.js";

const getFY = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  // FY runs Apr–Mar (if month <= Mar, it's previous FY)
  return d.getMonth() + 1 <= 3 ? `${year - 1}-${year}` : `${year}-${year + 1}`;
};

export const createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, invoiceDate, amount } = req.body;
    if (invoiceNumber == null || !invoiceDate || amount == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const fy = getFY(invoiceDate);

    const existing = await Invoice.findOne({ financialYear: fy, invoiceNumber });
    if (existing) return res.status(400).json({ message: "Invoice number already exists in this FY" });

    const prev = await Invoice.findOne({ financialYear: fy, invoiceNumber: { $lt: invoiceNumber } }).sort({ invoiceNumber: -1 });
    const next = await Invoice.findOne({ financialYear: fy, invoiceNumber: { $gt: invoiceNumber } }).sort({ invoiceNumber: 1 });

    const dt = new Date(invoiceDate);
    if (prev && dt < prev.invoiceDate) return res.status(400).json({ message: `Invoice date must be >= invoice ${prev.invoiceNumber}` });
    if (next && dt > next.invoiceDate) return res.status(400).json({ message: `Invoice date must be <= invoice ${next.invoiceNumber}` });

    const invoice = await Invoice.create({ invoiceNumber, invoiceDate: dt, amount, financialYear: fy, createdBy: req.user?._id });
    res.json({ message: "Invoice created", invoice });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Duplicate invoice number for that FY" });
    res.status(500).json({ message: err.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { number } = req.params;
    const update = req.body;
    // If updating invoiceNumber or date, validate neighbors similarly (omitted for brevity — implement same checks)
    const invoice = await Invoice.findOneAndUpdate({ invoiceNumber: number }, update, { new: true });
    res.json({ message: "Invoice updated", invoice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const { invoiceNumbers } = req.body;
    if (!invoiceNumbers?.length) return res.status(400).json({ message: "No invoiceNumbers provided" });
    await Invoice.deleteMany({ invoiceNumber: { $in: invoiceNumbers } });
    res.json({ message: "Invoices deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 10, fy, startDate, endDate, invoiceNumber } = req.query;
    const filter = {};
    if (fy) filter.financialYear = fy;
    if (invoiceNumber) filter.invoiceNumber = Number(invoiceNumber);
    if (startDate || endDate) {
      filter.invoiceDate = {};
      if (startDate) filter.invoiceDate.$gte = new Date(startDate);
      if (endDate) filter.invoiceDate.$lte = new Date(endDate);
    }

    const total = await Invoice.countDocuments(filter);
    const invoices = await Invoice.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ financialYear: -1, invoiceNumber: 1 });

    res.json({ data: invoices, page: Number(page), total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
