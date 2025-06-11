'use client';

import { useState } from 'react';
import {
  useCrudList,
  useCrudCreate,
  useCrudUpdate,
  useCrudDelete,
} from '@/hooks/useCrud';

interface Student {
  _id: string;
  fullName: string;
  rollNumber?: string;
  // Add more fields if needed
}

interface SubjectMark {
  name: string;
  fullMarks: number;
  obtainedMarks: number;
}

interface Result {
  student: string | Student;
  academicYear: string;
  term: string;
  class: string;
  subjects: SubjectMark[];
}

const initialForm: Result = {
  student: '',
  academicYear: '',
  term: '',
  class: '',
  subjects: [],
};

export default function ResultManagement() {
  const [formData, setFormData] = useState<Result>(initialForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { data: results = [], isLoading } = useCrudList<Result & { _id: string }>(
    '/result',
    ['result']
  );
  const createResult = useCrudCreate<Result>('/result', ['result']);
  const updateResult = useCrudUpdate<Result>('/result', ['result']);
  const deleteResult = useCrudDelete('/result', ['result']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubjectChange = (
  index: number,
  field: keyof SubjectMark,
  value: string | number
) => {
  const updatedSubjects = [...formData.subjects];

  if (field === 'name') {
    updatedSubjects[index][field] = value as string;
  } else if (field === 'fullMarks' || field === 'obtainedMarks') {
    updatedSubjects[index][field] = Number(value) as number;
  }

  setFormData({ ...formData, subjects: updatedSubjects });
};


  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', fullMarks: 100, obtainedMarks: 0 }],
    });
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects.splice(index, 1);
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateResult.mutate(
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
      createResult.mutate(formData, {
        onSuccess: () => {
          setModalOpen(false);
          setFormData(initialForm);
        },
      });
    }
  };

  const handleEdit = (result: Result & { _id: string }) => {
    setFormData(result);
    setEditId(result._id);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this result?')) {
      deleteResult.mutate(id);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Result Management</h2>
      <button
        onClick={() => {
          setFormData(initialForm);
          setEditId(null);
          setModalOpen(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Result
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Term</th>
                <th className="p-2 border">Class</th>
                <th className="p-2 border">Subjects</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={res._id} className="border-t">
                  <td className="p-2 border">{res.student?.fullName}</td>
                  <td className="p-2 border">{res.academicYear}</td>
                  <td className="p-2 border">{res.term}</td>
                  <td className="p-2 border">{res.class}</td>
                  <td className="p-2 border">
                    {res.subjects.map((subj, i) => (
                      <div key={i}>
                        {subj.name}: {subj.obtainedMarks}/{subj.fullMarks}
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(res)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(res._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No results found.
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
          <div className="bg-white p-6 rounded w-full max-w-3xl">
            <h3 className="text-xl font-semibold mb-4">
              {editId ? 'Edit Result' : 'Add Result'}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                name="student"
                value={formData.student}
                onChange={handleChange}
                placeholder="Student ID"
                className="border p-2"
                required
              />
              <input
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                placeholder="Academic Year"
                className="border p-2"
                required
              />
              <input
                name="term"
                value={formData.term}
                onChange={handleChange}
                placeholder="Term"
                className="border p-2"
                required
              />
              <input
                name="class"
                value={formData.class}
                onChange={handleChange}
                placeholder="Class"
                className="border p-2"
                required
              />

              <div>
                <h4 className="font-semibold mb-2">Subjects</h4>
                {formData.subjects.map((subject, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      value={subject.name}
                      onChange={(e) =>
                        handleSubjectChange(index, 'name', e.target.value)
                      }
                      placeholder="Subject Name"
                      className="border p-2 w-1/3"
                      required
                    />
                    <input
                      type="number"
                      value={subject.fullMarks}
                      onChange={(e) =>
                        handleSubjectChange(index, 'fullMarks', e.target.value)
                      }
                      placeholder="Full Marks"
                      className="border p-2 w-1/4"
                      required
                    />
                    <input
                      type="number"
                      value={subject.obtainedMarks}
                      onChange={(e) =>
                        handleSubjectChange(index, 'obtainedMarks', e.target.value)
                      }
                      placeholder="Obtained Marks"
                      className="border p-2 w-1/4"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeSubject(index)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubject}
                  className="text-sm text-blue-600 underline"
                >
                  + Add Subject
                </button>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setFormData(initialForm);
                    setEditId(null);
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
