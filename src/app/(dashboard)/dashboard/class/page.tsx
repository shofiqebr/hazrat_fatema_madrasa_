'use client';

import { useState } from 'react';
import { useCrudCreate, useCrudDelete, useCrudList, useCrudUpdate } from '@/hooks/useCrud';
import Modal from '@/app/components/ui/Modal';

interface IClass {
  _id?: string;
  name: string;
  description: string;
}

const initialForm: IClass = {
  name: '',
  description: '',
};

const ClassManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<IClass>(initialForm);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: classList, isLoading } = useCrudList<IClass>('/class', ['class']);
  const createClass = useCrudCreate<IClass>('/class', ['class']);
  const updateClass = useCrudUpdate<IClass>('/class', ['class']);
  const deleteClass = useCrudDelete('/class', ['class']);

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
      updateClass.mutate(
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
      createClass.mutate(formData, {
        onSuccess: () => {
          setModalOpen(false);
          setFormData(initialForm);
        },
      });
    }
  };

  const openEdit = (cls: IClass) => {
    setEditId(cls._id!);
    setFormData({ ...cls });
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">ক্লাস ব্যবস্থাপনা</h1>
        <button
          onClick={() => {
            setModalOpen(true);
            setFormData(initialForm);
            setEditId(null);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          নতুন ক্লাস যোগ করুন
        </button>
      </div>

      {isLoading ? (
        <p>লোড হচ্ছে...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">নাম</th>
                <th className="border px-4 py-2">বর্ণনা</th>
                <th className="border px-4 py-2">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {classList?.map(cls => (
                <tr key={cls._id} className="text-center">
                  <td className="border px-4 py-2">{cls.name}</td>
                  <td className="border px-4 py-2">{cls.description}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => openEdit(cls)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      সম্পাদনা
                    </button>
                    <button
                      onClick={() => cls._id && deleteClass.mutate(cls._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      মুছুন
                    </button>
                  </td>
                </tr>
              ))}
              {classList?.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-4">কোনো ক্লাস পাওয়া যায়নি।</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">
          {editId ? 'ক্লাস সম্পাদনা করুন' : 'নতুন ক্লাস যোগ করুন'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1">নামের ঘর *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ক্লাসের নাম লিখুন"
              className="border p-2 w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1">বর্ণনা</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="বর্ণনা লিখুন"
              className="border p-2 w-full"
            />
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            {editId ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ClassManagement;
