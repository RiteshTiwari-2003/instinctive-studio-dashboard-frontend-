import { useState, useEffect } from 'react';
import useStore from '../store/store';

const AddStudentForm = ({ onClose }) => {
  const { addStudent, fetchCourses, courses } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cohort: 'AY 2024-25',
    courses: []
  });

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(formData);
    onClose();
  };

  const handleCourseChange = (courseId) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.includes(courseId)
        ? prev.courses.filter(id => id !== courseId)
        : [...prev.courses, courseId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Cohort</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.cohort}
              onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
            >
              <option>AY 2024-25</option>
              <option>AY 2023-24</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Courses</label>
            <div className="space-y-2">
              {courses.map((course) => (
                <label key={course.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.courses.includes(course.id)}
                    onChange={() => handleCourseChange(course.id)}
                  />
                  {course.name}
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-600"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
