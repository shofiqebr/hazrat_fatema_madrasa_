'use client';

import { useState } from 'react';
import {
  useCrudList,
  useCrudCreate,
  useCrudUpdate,
  useCrudDelete,
} from '@/hooks/useCrud';

interface PopulatedUser {
  _id: string;
  name: string;
  // add other fields if needed
}


interface Attendance {
  _id?: string;
  date: string;
    userId: string | PopulatedUser | null;
  role: 'Student' | 'Teacher';
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  recordedBy: string;
  source: 'Manual' | 'Device';
}

const initialForm: Attendance = {
  date: '',
  userId: '',
  role: 'Student',
  status: 'Present',
  recordedBy: '',
  source: 'Manual',
};

export default function AttendanceManagement() {
  const [formData, setFormData] = useState<Attendance>(initialForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: attendances = [], isLoading } = useCrudList<Attendance>('/attendance', ['attendance']);
  const createAttendance = useCrudCreate<Attendance>('/attendance', ['attendance']);
  const updateAttendance = useCrudUpdate<Attendance>('/attendance', ['attendance']);
  const deleteAttendance = useCrudDelete('/attendance', ['attendance']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateAttendance.mutate({ id: editId, data: formData }, {
        onSuccess: () => {
          resetForm();
        },
      });
    } else {
      createAttendance.mutate(formData, {
        onSuccess: () => {
          resetForm();
        },
      });
    }
  };

  const handleEdit = (attendance: Attendance) => {
    setFormData(attendance);
    setEditId(attendance._id || null);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this attendance?')) {
      deleteAttendance.mutate(id);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditId(null);
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Attendance Management</h2>
      <button
        onClick={() => {
          setFormData(initialForm);
          setEditId(null);
          setModalOpen(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Attendance
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">User ID</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Recorded By</th>
                <th className="p-2 border">Source</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((att) => (
                <tr key={att._id} className="border-t">
                  <td className="p-2 border">{att.date}</td>
                  {/* <td className="p-2 border">{att.userId}</td> */}
                 <td className="p-2 border">
  {att.userId && typeof att.userId === 'object' && 'name' in att.userId
    ? att.userId.name
    : att.userId || 'Unknown'}
</td>


                  <td className="p-2 border">{att.role}</td>
                  <td className="p-2 border">{att.status}</td>
                  <td className="p-2 border">{att.recordedBy}</td>
                  <td className="p-2 border">{att.source}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(att)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(att._id!)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {attendances.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    No attendance found.
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
          <div className="bg-white p-6 rounded w-full max-w-xl">
            <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit' : 'Add'} Attendance</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="border p-2"
                required
              />
           <input
  name="userId"
  placeholder="User ID"
  value={
    typeof formData.userId === 'object' && formData.userId !== null && 'name' in formData.userId
      ? formData.userId.name
      : formData.userId ?? ''
  }
  onChange={handleChange}
  className="border p-2"
  required
/>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border p-2"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Leave">Leave</option>
              </select>
              <input
                name="recordedBy"
                placeholder="Recorded By"
                value={formData.recordedBy}
                onChange={handleChange}
                className="border p-2"
                required
              />
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="border p-2"
              >
                <option value="Manual">Manual</option>
                <option value="Device">Device</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
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
