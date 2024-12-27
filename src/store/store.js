import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_URL;

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
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch students');
      }
      const data = await response.json();
      set({ students: data, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching students:', error);
      set({ error: error.message, loading: false });
    }
  },

  fetchCourses: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch courses');
      }
      const data = await response.json();
      set({ courses: data, error: null });
    } catch (error) {
      console.error('Error fetching courses:', error);
      set({ error: error.message });
    }
  },

  addStudent: async (formData) => {
    set({ error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        body: formData // FormData will set the correct Content-Type header automatically
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add student');
      }
      
      const newStudent = await response.json();
      
      set(state => ({
        students: [newStudent, ...state.students],
        error: null
      }));
      
      return newStudent;
    } catch (error) {
      console.error('Error adding student:', error);
      set({ error: error.message });
      throw error;
    }
  }
}));

export default useStore;
