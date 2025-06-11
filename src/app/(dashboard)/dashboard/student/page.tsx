'use client';

import { useState } from 'react';
import { useCrudCreate, useCrudDelete, useCrudList, useCrudUpdate } from '@/hooks/useCrud';

interface StudentData {
  id?: string;
  fullName: string;
  rollNumber: string;
  class: string;
  gender: string;
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  phone: string;
  permanentAddress: {
    village: string;
    postOffice: string;
    upazila: string;
    district: string;
  };
  currentAddress: string;
  financialStatus: string;
}

export default function StudentManagement() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<StudentData>({
    fullName: '',
    rollNumber: '',
    class: '',
    gender: '',
    dateOfBirth: '',
    fatherName: '',
    motherName: '',
    phone: '',
    permanentAddress: { village: '', postOffice: '', upazila: '', district: '' },
    currentAddress: '',
    financialStatus: '',
  });
  const [editId, setEditId] = useState<string | null>(null);

  const { data: students = [], refetch } = useCrudList<StudentData>('/student', ['student']);
  const createStudent = useCrudCreate<StudentData>('/student', ['student']);
  const updateStudent = useCrudUpdate<StudentData>('/student', ['student']);
  const deleteStudent = useCrudDelete('/student', ['student']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in formData.permanentAddress) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: { ...prev.permanentAddress, [name]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateStudent.mutate({ id: editId, data: formData }, { onSuccess: () => { refetch(); setModalOpen(false); } });
    } else {
      createStudent.mutate(formData, { onSuccess: () => { refetch(); setModalOpen(false); } });
    }
    setFormData({
      fullName: '',
      rollNumber: '',
      class: '',
      gender: '',
      dateOfBirth: '',
      fatherName: '',
      motherName: '',
      phone: '',
      permanentAddress: { village: '', postOffice: '', upazila: '', district: '' },
      currentAddress: '',
      financialStatus: '',
    });
    setEditId(null);
  };

  const handleEdit = (student: StudentData) => {
    setFormData(student);
    setEditId(student.id!);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure to delete?')) {
      deleteStudent.mutate(id, { onSuccess: () => refetch() });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Student Management</h2>
        <button onClick={() => setModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded">Add Student</button>
      </div>

      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Roll</th>
            <th className="p-2 border">Class</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={idx} className="text-sm">
              <td className="border p-2">{student.fullName}</td>
              <td className="border p-2">{student.rollNumber}</td>
              <td className="border p-2">{student.class}</td>
              <td className="border p-2">{student.phone}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(student)} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(student.id!)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-full max-w-3xl">
            <h3 className="text-lg font-bold mb-4">{editId ? 'Edit Student' : 'Add Student'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
              <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2" required />
              <input name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Roll Number" className="border p-2" required />
              <input name="class" value={formData.class} onChange={handleChange} placeholder="Class" className="border p-2" required />
              <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="border p-2" required />
              <input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" className="border p-2" required />
              <input name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father's Name" className="border p-2" required />
              <input name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Mother's Name" className="border p-2" required />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2" required />
              <input name="village" value={formData.permanentAddress.village} onChange={handleChange} placeholder="Village" className="border p-2" required />
              <input name="postOffice" value={formData.permanentAddress.postOffice} onChange={handleChange} placeholder="Post Office" className="border p-2" required />
              <input name="upazila" value={formData.permanentAddress.upazila} onChange={handleChange} placeholder="Upazila" className="border p-2" required />
              <input name="district" value={formData.permanentAddress.district} onChange={handleChange} placeholder="District" className="border p-2" required />
              <input name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="Current Address" className="border p-2" required />
              <input name="financialStatus" value={formData.financialStatus} onChange={handleChange} placeholder="Financial Status" className="border p-2" required />
              <div className="col-span-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{editId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
