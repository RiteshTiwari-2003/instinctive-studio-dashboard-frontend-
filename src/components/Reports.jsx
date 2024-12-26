import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import useStore from '../store/store';

const Reports = () => {
  const { students, courses } = useStore();
  const [selectedReport, setSelectedReport] = useState('enrollment');
  const [dateRange, setDateRange] = useState('month');

  // Mock data for reports
  const enrollmentData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'New Enrollments',
        data: [12, 19, 15, 25],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const performanceData = {
    labels: courses.map(course => course.name),
    datasets: [
      {
        label: 'Average Score',
        data: courses.map(() => Math.floor(Math.random() * 30) + 70), // Mock scores
        borderColor: '#10b981',
        tension: 0.4,
      },
    ],
  };

  const reportTypes = [
    { id: 'enrollment', name: 'Enrollment Analytics' },
    { id: 'performance', name: 'Performance Analysis' },
    { id: 'attendance', name: 'Attendance Report' },
    { id: 'progress', name: 'Course Progress' },
  ];

  const dateRanges = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <button className="btn btn-primary">Download Report</button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm"
            >
              {dateRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {selectedReport === 'enrollment' ? 'Enrollment Trend' : 'Performance Overview'}
          </h2>
          {selectedReport === 'enrollment' ? (
            <Bar
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
          ) : (
            <Line
              data={performanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          )}
        </div>

        {/* Statistics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Active Courses</h3>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Avg. Performance</h3>
              <p className="text-2xl font-bold text-gray-900">78%</p>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Detailed Statistics</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Avg. Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Completion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {students.filter(s => 
                        s.courses.some(sc => sc.courseId === course.id)
                      ).length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.floor(Math.random() * 30) + 70}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.floor(Math.random() * 40) + 60}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
