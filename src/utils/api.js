const API_BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
};

export const api = {
  // Students
  getStudents: async () => {
    const response = await fetch(`${API_BASE_URL}/students`);
    return handleResponse(response);
  },

  addStudent: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...studentData,
        courseIds: studentData.courses
      }),
    });
    return handleResponse(response);
  },

  updateStudent: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updates,
        courseIds: updates.courses
      }),
    });
    return handleResponse(response);
  },

  deleteStudent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Courses
  getCourses: async () => {
    const response = await fetch(`${API_BASE_URL}/courses`);
    return handleResponse(response);
  },
};
