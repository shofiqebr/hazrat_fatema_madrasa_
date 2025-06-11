'use client';

import { useState } from 'react';
import { useCrudCreate, useCrudDelete, useCrudList, useCrudUpdate } from '@/hooks/useCrud';
import Modal from '@/app/components/ui/Modal';


interface Homework {
  _id?: string;
  title: string;
  description: string;
  classId: string;
  subjectId: string;
  dueDate: string;
  assignedBy: string;
  attachments: string[];
}

const initialForm: Homework = {
  title: '',
  description: '',
  classId: '',
  subjectId: '',
  dueDate: '',
  assignedBy: '',
  attachments: [],
};

const HomeworkManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Homework>(initialForm);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: homeworkList, isLoading } = useCrudList<Homework>('/homework', ['homework']);
  const createHomework = useCrudCreate<Homework>('/homework', ['homework']);
  const updateHomework = useCrudUpdate<Homework>('/homework', ['homework']);
  const deleteHomework = useCrudDelete('/homework', ['homework']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (editId) {
    updateHomework.mutate(
      { id: editId, data: formData },
      {
        onSuccess: () => {
          setModalOpen(false);
          setFormData(initialForm);
          setEditId(null);
        },
      }
    );
  } else {
    createHomework.mutate(formData, {
      onSuccess: () => {
        setModalOpen(false);
        setFormData(initialForm);
      },
    });
  }
};


  const openEdit = (hw: Homework) => {
    setEditId(hw._id!);
    setFormData({ ...hw });
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Homework Management</h1>
        <button
          onClick={() => {
            setModalOpen(true);
            setFormData(initialForm);
            setEditId(null);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Homework
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Class ID</th>
                <th className="border px-4 py-2">Subject ID</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">Assigned By</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {homeworkList?.map(hw => (
                <tr key={hw._id} className="text-center">
                  <td className="border px-4 py-2">{hw.title}</td>
                  <td className="border px-4 py-2">{hw.classId}</td>
                  <td className="border px-4 py-2">{hw.subjectId}</td>
                  <td className="border px-4 py-2">{new Date(hw.dueDate).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{hw.assignedBy}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => openEdit(hw)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => hw._id && deleteHomework.mutate(hw._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {homeworkList?.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">No homework found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">
          {editId ? 'Edit Homework' : 'Add Homework'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2" required />
          <input name="classId" value={formData.classId} onChange={handleChange} placeholder="Class ID" className="border p-2" required />
          <input name="subjectId" value={formData.subjectId} onChange={handleChange} placeholder="Subject ID" className="border p-2" required />
          <input name="assignedBy" value={formData.assignedBy} onChange={handleChange} placeholder="Assigned By" className="border p-2" required />
          <input type="datetime-local" name="dueDate" value={formData.dueDate} onChange={handleChange} className="border p-2" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 col-span-1 md:col-span-2" required />
          <input name="attachments" value={formData.attachments.join(',')} onChange={(e) => setFormData({ ...formData, attachments: e.target.value.split(',') })} placeholder="Comma separated URLs" className="border p-2 col-span-1 md:col-span-2" />
          <button type="submit" className="col-span-1 md:col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            {editId ? 'Update Homework' : 'Create Homework'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default HomeworkManagement;
