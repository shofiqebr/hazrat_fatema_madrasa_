'use client';

import { useState } from 'react';
import { useCrudList, useCrudCreate, useCrudUpdate, useCrudDelete } from '@/hooks/useCrud';

interface Notice {
  title: string;
  description: string;
  date: string;
  audience: string;
  postedBy: string;
  isPublished: boolean;
}

const initialForm: Notice = {
  title: '',
  description: '',
  date: '',
  audience: '',
  postedBy: '',
  isPublished: true,
};

export default function NoticeManagement() {
  const [formData, setFormData] = useState<Notice>(initialForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: notices = [], isLoading } = useCrudList<Notice & { _id: string }>(
    '/notice',
    ['notice']
  );
  const createNotice = useCrudCreate<Notice>('/notice', ['notice']);
  const updateNotice = useCrudUpdate<Notice>('/notice', ['notice']);
  const deleteNotice = useCrudDelete('/notice', ['notice']);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateNotice.mutate(
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
      createNotice.mutate(formData, {
        onSuccess: () => {
          setModalOpen(false);
          setFormData(initialForm);
        },
      });
    }
  };

  const handleEdit = (notice: Notice & { _id: string }) => {
    setFormData(notice);
    setEditId(notice._id);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      deleteNotice.mutate(id);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notice Management</h2>
      <button
        onClick={() => {
          setFormData(initialForm);
          setEditId(null);
          setModalOpen(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Notice
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Audience</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Posted By</th>
                <th className="p-2 border">Published</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice._id} className="border-t">
                  <td className="p-2 border">{notice.title}</td>
                  <td className="p-2 border">{notice.audience}</td>
                  <td className="p-2 border">{new Date(notice.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{notice.postedBy}</td>
                  <td className="p-2 border">{notice.isPublished ? 'Yes' : 'No'}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {notices.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No notices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">
              {editId ? 'Edit Notice' : 'Add Notice'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="border p-2"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2"
                rows={4}
                required
              />
              <input
                name="date"
                type="date"
                value={formData.date.split('T')[0]}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <select
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                className="border p-2"
                required
              >
                <option value="">Select Audience</option>
                <option value="Students">Students</option>
                <option value="Teachers">Teachers</option>
                <option value="All">All</option>
              </select>
              <input
                name="postedBy"
                value={formData.postedBy}
                onChange={handleChange}
                placeholder="Posted By"
                className="border p-2"
                required
              />
              <label className="flex items-center gap-2">
                <input
                  name="isPublished"
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={handleChange}
                />
                Published
              </label>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditId(null);
                    setFormData(initialForm);
                  }}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  {editId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
