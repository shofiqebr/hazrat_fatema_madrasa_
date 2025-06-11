'use client';


import { useCrudList, useCrudCreate } from '@/hooks/useCrud';
import AddPaymentModal from "@/app/components/AddPaymentModal";
import { useState } from "react";

const PAYMENT_ENDPOINT = '/payment';
const PAYMENTS_QUERY_KEY = ['payment'];


export enum PAYMENT_TYPE {
  STUDENT = "Student",
  TEACHER = "Teacher",
  DONATION = "Donation",
}

export enum STUDENT_PAYMENT_ITEM_TYPE {
  ADMISSION_FEE = "Admission Fee",
  MONTHLY_FEE = "Monthly Fee",
  EXAM_FEE = "Exam Fee",
  BOOK_FEE = "Book Fee",
  OTHER = "Other",
}

export enum TEACHER_PAYMENT_ITEM_TYPE {
  SALARY = "Salary",
  BONUS = "Bonus",
  DEDUCTION = "Deduction",
  INCREMENT = "Increment",
}

export interface IPaymentItem {
  title: string;
  amount: number;
  studentItemType?: STUDENT_PAYMENT_ITEM_TYPE;
  teacherItemType?: TEACHER_PAYMENT_ITEM_TYPE;
  remarks?: string;
}

export interface IPayment {
  _id?: string;
  type: PAYMENT_TYPE;
  amount: number;
  date: string;
  method: "Cash" | "Bank" | "Online";
  student?: {
    _id: string;
    name: string;
  };
  teacher?: {
    _id: string;
    name: string;
  };
  items: IPaymentItem[];
  donationType?: string;
  donorName?: string;
  donorContact?: string;
  description?: string;
}

// export default function PaymentsPage() {
//   const [payments, setPayments] = useState<IPayment[]>([]);
//   const [showForm, setShowForm] = useState(false);

//   const handleAddPayment = (payment: IPayment) => {
//     setPayments((prev) => [...prev, payment]);
//     setShowForm(false);
//   };

//   const handleCloseModal = () => {
//     setShowForm(false);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Payments</h1>
//       <button
//         onClick={() => setShowForm(true)}
//         className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Add Payment
//       </button>

//       {showForm && (
//         <AddPaymentModal
//           onSave={handleAddPayment}
//           onClose={handleCloseModal}
//         />
//       )}

//       <table className="w-full table-auto border text-sm">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Date</th>
//             <th className="p-2 border">Type</th>
//             <th className="p-2 border">Amount</th>
//             <th className="p-2 border">Method</th>
//             <th className="p-2 border">Reference</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payments.map((payment, index) => (
//             <tr key={index} className="text-center">
//               <td className="p-2 border">{payment.date}</td>
//               <td className="p-2 border">{payment.type}</td>
//               <td className="p-2 border">{payment.amount}</td>
//               <td className="p-2 border">{payment.method}</td>
//               <td className="p-2 border">
//                 {payment.type === PAYMENT_TYPE.STUDENT && payment.student?.name}
//                 {payment.type === PAYMENT_TYPE.TEACHER && payment.teacher?.name}
//                 {payment.type === PAYMENT_TYPE.DONATION && payment.donorName}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



export default function PaymentsPage() {

    
  // Fetch payments list using your useCrudList hook
  const { data: payments = [], isLoading, error } = useCrudList<IPayment>(PAYMENT_ENDPOINT, PAYMENTS_QUERY_KEY);

  // Create payment mutation hook
  const createPaymentMutation = useCrudCreate<IPayment, IPayment>(PAYMENT_ENDPOINT, PAYMENTS_QUERY_KEY);

  const [showForm, setShowForm] = useState(false);

  // When form submits new payment data
  const handleAddPayment = (payment: IPayment) => {
    createPaymentMutation.mutate(payment, {
      onSuccess: () => {
        setShowForm(false);
      },
      onError: (err) => {
        console.error('Failed to add payment', err);
      },
    });
  };

  if (isLoading) return <div>Loading payments...</div>;
  if (error) return <div>Error loading payments</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Payments</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Payment
      </button>

      {showForm && (
        <AddPaymentModal
          onSave={handleAddPayment}
          onClose={() => setShowForm(false)}
        />
      )}

      <table className="w-full table-auto border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Method</th>
            <th className="p-2 border">Reference</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="text-center">
              <td className="p-2 border">{payment.date}</td>
              <td className="p-2 border">{payment.type}</td>
              <td className="p-2 border">{payment.amount}</td>
              <td className="p-2 border">{payment.method}</td>
              <td className="p-2 border">
                {payment.type === PAYMENT_TYPE.STUDENT && payment.student?.name}
                {payment.type === PAYMENT_TYPE.TEACHER && payment.teacher?.name}
                {payment.type === PAYMENT_TYPE.DONATION && payment.donorName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
