import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
};

const useStore = create((set) => ({
  students: [],
  courses: [],
  loading: false,
  error: null,

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      const data = await handleResponse(response);
      set({ students: data, error: null });
    } catch (error) {
      console.error('Error fetching students:', error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchCourses: async () => {
    set({ error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/courses`);
      const data = await handleResponse(response);
      set({ courses: data, error: null });
    } catch (error) {
      console.error('Error fetching courses:', error);
      set({ error: error.message });
    }
  },

  addStudent: async (studentData) => {
    set({ error: null });
    try {
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
      const data = await handleResponse(response);
      set((state) => ({
        students: [...state.students, data],
        error: null
      }));
      return data;
    } catch (error) {
      console.error('Error adding student:', error);
      set({ error: error.message });
      throw error;
    }
  },

  updateStudent: async (id, updates) => {
    set({ error: null });
    try {
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
      const data = await handleResponse(response);
      set((state) => ({
        students: state.students.map((student) =>
          student.id === id ? data : student
        ),
        error: null
      }));
      return data;
    } catch (error) {
      console.error('Error updating student:', error);
      set({ error: error.message });
      throw error;
    }
  },

  deleteStudent: async (id) => {
    set({ error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE',
      });
      await handleResponse(response);
      set((state) => ({
        students: state.students.filter((student) => student.id !== id),
        error: null
      }));
    } catch (error) {
      console.error('Error deleting student:', error);
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useStore;
