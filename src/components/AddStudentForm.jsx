import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useStore from '../store/store';

const AddStudentForm = ({ onClose }) => {
  const { addStudent, fetchCourses, courses } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cohort: 'AY 2024-25',
    courses: [],
    status: 'Active'
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a FormData object to send both file and JSON data
      const submitData = new FormData();
      
      // Append all form fields
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('cohort', formData.cohort);
      submitData.append('status', formData.status);
      
      // Append courses
      formData.courses.forEach(courseId => {
        submitData.append('courses[]', courseId);
      });

      // Append image if exists
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      await addStudent(submitData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
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
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={formData.cohort}
              onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded"
              onChange={handleImageChange}
            />
            {previewUrl && (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="mt-2 w-20 h-20 object-cover rounded"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Courses</label>
            <div className="max-h-40 overflow-y-auto border rounded p-2">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`course-${course.id}`}
                    checked={formData.courses.includes(course.id)}
                    onChange={() => handleCourseChange(course.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`course-${course.id}`}>{course.name}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddStudentForm.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AddStudentForm;
