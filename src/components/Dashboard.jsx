import { useState, useEffect } from 'react';
import useStore from '../store/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { students, courses, fetchStudents, fetchCourses } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchStudents(), fetchCourses()]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchStudents, fetchCourses]);

  // Calculate statistics
  const totalStudents = students.length;
  const totalCourses = courses.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const averageCoursesPerStudent = students.length > 0
    ? students.reduce((acc, student) => acc + student.courses.length, 0) / students.length
    : 0;

  // Prepare data for enrollment trend chart
  const enrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Student Enrollments',
        data: [65, 78, 90, 85, 95, totalStudents],
        borderColor: '#3b82f6',
        tension: 0.4,
      },
    ],
  };

  // Prepare data for course distribution
  const courseDistribution = {
    labels: courses.map(course => course.name),
    datasets: [
      {
        data: courses.map(course => 
          students.reduce((acc, student) => 
            acc + (student.courses.some(sc => sc.courseId === course.id) ? 1 : 0), 0)
        ),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#ec4899',
        ],
      },
    ],
  };

  // Prepare data for student status
  const statusData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [
          activeStudents,
          totalStudents - activeStudents,
        ],
        backgroundColor: ['#10b981', '#ef4444'],
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Students</h3>
          <p className="text-3xl font-bold text-primary mt-2">{totalStudents}</p>
          <p className="text-sm text-gray-500 mt-1">Across all courses</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Students</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{activeStudents}</p>
          <p className="text-sm text-gray-500 mt-1">Currently enrolled</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Courses</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalCourses}</p>
          <p className="text-sm text-gray-500 mt-1">Available courses</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Avg Courses/Student</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {averageCoursesPerStudent.toFixed(1)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Per active student</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Enrollment Trend</h3>
          <Line
            data={enrollmentData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>

        {/* Course Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Course Distribution</h3>
          <Bar
            data={courseDistribution}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        {/* Student Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Status</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={statusData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {students.slice(-5).reverse().map((student) => (
              <div key={student.id} className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">
                    Enrolled in {student.courses.length} courses
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-gray-500">
                    {new Date(student.dateJoined).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
