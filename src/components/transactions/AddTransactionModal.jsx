import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { useTransactions } from "../../hooks/useTransactions";
import { CATEGORIES } from "../../data/mockData";

const typeOptions = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const categoryOptions = CATEGORIES.map((c) => ({ value: c, label: c }));

const empty = {
  description: "",
  amount: "",
  type: "expense",
  category: "",
  date: new Date().toISOString().slice(0, 10),
};

export default function AddTransactionModal({ isOpen, onClose, editData = null }) {
  const { addTransaction, editTransaction } = useTransactions();
  const isEdit = !!editData;

  const [form, setForm] = useState(editData || empty);
  const [errors, setErrors] = useState({});

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate() {
    const e = {};
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid positive amount";
    if (!form.category) e.category = "Please select a category";
    if (!form.date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const payload = { ...form, amount: parseFloat(form.amount) };
    if (isEdit) {
      editTransaction(payload);
    } else {
      addTransaction(payload);
    }
    setForm(empty);
    setErrors({});
    onClose();
  }

  function handleClose() {
    setForm(editData || empty);
    setErrors({});
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? "Edit Transaction" : "Add Transaction"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Description"
          id="desc"
          placeholder="e.g. Grocery Store"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          error={errors.description}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Amount"
            id="amount"
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            error={errors.amount}
            required
          />
          <Input
            label="Date"
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            error={errors.date}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Type"
            id="type"
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
            options={typeOptions}
            placeholder={null}
          />
          <Select
            label="Category"
            id="category"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            options={categoryOptions}
            placeholder="Select category"
            error={errors.category}
          />
        </div>

        {errors.category && (
          <p className="text-xs text-rose-500 -mt-2">{errors.category}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            {isEdit ? "Save Changes" : "Add Transaction"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
