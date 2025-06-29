'use client';

import { useState } from 'react';
import { useCrudCreate, useCrudDelete, useCrudList, useCrudUpdate } from '@/hooks/useCrud';

interface Teacher {
  _id?: string;
  name: string;
  id: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  joiningDate: string;
  designation: string;
  subjectSpecialization: string;
  salary: number;
  address: {
    village: string;
    postOffice: string;
    upazila: string;
    district: string;
  };
  emergencyContact: string;
  bloodGroup: string;
  educationQualification: string;
  isActive: boolean;
  comments: string;
}

const initialTeacher: Teacher = {
  name: '',
  id: '',
  phone: '',
  gender: '',
  dateOfBirth: '',
  joiningDate: '',
  designation: '',
  subjectSpecialization: '',
  salary: 0,
  address: {
    village: '',
    postOffice: '',
    upazila: '',
    district: '',
  },
  emergencyContact: '',
  bloodGroup: '',
  educationQualification: '',
  isActive: true,
  comments: '',
};

const TeacherManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Teacher>(initialTeacher);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: teachers, isLoading } = useCrudList<Teacher>('/teacher', ['teacher']);
  const createTeacher = useCrudCreate<Teacher>('/teacher', ['teacher']);
  const updateTeacher = useCrudUpdate<Teacher>('/teacher', ['teacher']);
  const deleteTeacher = useCrudDelete('/teacher', ['teacher']);

  // console.log(teachers)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateTeacher.mutate({ id: editId, data: formData });
    } else {
      createTeacher.mutate(formData);
    }
    closeModal();
  };

  const handleEdit = (teacher: Teacher) => {
    setFormData(teacher);
    setEditId(teacher._id!);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      deleteTeacher.mutate(id);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(initialTeacher);
    setEditId(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Teacher Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Teacher
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
       <table className="w-full border text-sm ">
  <thead>
    <tr className="bg-gray-200">
      <th className="p-2 border">নাম</th>
      <th className="p-2 border">আইডি</th>
      <th className="p-2 border">education Qualification</th>
      <th className="p-2 border">ফোন</th>
      <th className="p-2 border">পদবী</th>
      <th className="p-2 border">অ্যাকশন</th>
    </tr>
  </thead>
  <tbody>
    {teachers?.map((teacher) => (
      <tr key={teacher._id} className="border-t">
        <td className="p-2 border">{teacher.name}</td>
        <td className="p-2 border">{teacher.id}</td>
        <td className="p-2 border">{teacher.educationQualification}</td>
        <td className="p-2 border">{teacher.phone}</td>
        <td className="p-2 border">{teacher.designation}</td>
        <td className="p-2 border flex gap-2 text-center">
          <button
            onClick={() => handleEdit(teacher)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            তৈরি করুন
          </button>
          <button
            onClick={() => handleDelete(teacher._id!)}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            মুছে ফেলুন
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg overflow-auto max-h-screen">
            <h2 className="text-lg font-bold mb-4">{editId ? 'Edit Teacher' : 'Add Teacher'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2" required />
              <input name="id" value={formData.id} onChange={handleChange} placeholder="ID" className="border p-2" required />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2" required />
              <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="border p-2" required />
              <input name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" className="border p-2" required />
              <input name="joiningDate" value={formData.joiningDate} onChange={handleChange} placeholder="Joining Date" className="border p-2" required />
              <input name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" className="border p-2" required />
              <input name="subjectSpecialization" value={formData.subjectSpecialization} onChange={handleChange} placeholder="Subject Specialization" className="border p-2" required />
              <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" className="border p-2" type="number" required />
              <input name="village" value={formData.address.village} onChange={handleChange} placeholder="Village" className="border p-2" required />
              <input name="postOffice" value={formData.address.postOffice} onChange={handleChange} placeholder="Post Office" className="border p-2" required />
              <input name="upazila" value={formData.address.upazila} onChange={handleChange} placeholder="Upazila" className="border p-2" required />
              <input name="district" value={formData.address.district} onChange={handleChange} placeholder="District" className="border p-2" required />
              <input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="Emergency Contact" className="border p-2" required />
              <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" className="border p-2" required />
              <input name="educationQualification" value={formData.educationQualification} onChange={handleChange} placeholder="Education Qualification" className="border p-2" required />
              <textarea name="comments" value={formData.comments} onChange={handleChange} placeholder="Comments" className="border p-2 col-span-2" />
              <div className="col-span-2 flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
