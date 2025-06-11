import React, { useState } from "react";
import { IPayment, PAYMENT_TYPE } from "../(dashboard)/dashboard/payment/page";


interface AddPaymentModalProps {
  onClose: () => void;
  onSave: (payment: IPayment) => void;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<IPayment>({
    type: PAYMENT_TYPE.STUDENT,
    amount: 0,
    date: "",
    method: "Cash",
    items: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Add Payment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="border p-2"
          >
            {Object.values(PAYMENT_TYPE).map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="border p-2"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <select
            name="method"
            value={formData.method}
            onChange={handleChange}
            required
            className="border p-2"
          >
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Online">Online</option>
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentModal;
