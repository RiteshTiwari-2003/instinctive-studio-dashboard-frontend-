import { useState } from 'react';
import useStore from '../store/store';

const ChapterManager = () => {
  const { courses } = useStore();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [newChapter, setNewChapter] = useState({
    title: '',
    description: '',
    duration: '',
    resources: '',
  });

  // Mock chapters data (replace with actual API data)
  const chapters = [
    {
      id: 1,
      title: 'Introduction to Physics',
      description: 'Basic concepts and principles of physics',
      duration: '2 hours',
      progress: 75,
      resources: 'PDF, Video',
    },
    {
      id: 2,
      title: 'Forces and Motion',
      description: 'Understanding Newton\'s laws of motion',
      duration: '3 hours',
      progress: 50,
      resources: 'PDF, Quiz',
    },
    // Add more chapters as needed
  ];

  const handleAddChapter = (e) => {
    e.preventDefault();
    // Add chapter logic here
    setShowAddChapter(false);
    setNewChapter({
      title: '',
      description: '',
      duration: '',
      resources: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Chapter Management</h1>
        <button
          onClick={() => setShowAddChapter(true)}
          className="btn btn-primary"
        >
          Add New Chapter
        </button>
      </div>

      {/* Course Selection */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Select Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedCourse?.id === course.id
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 hover:border-primary'
              }`}
            >
              <h3 className="font-medium text-gray-900">{course.name}</h3>
              <p className="text-sm text-gray-500">{course.code}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chapters List */}
      {selectedCourse && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Chapters for {selectedCourse.name}
            </h2>
            <div className="space-y-4">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{chapter.title}</h3>
                    <span className="text-sm text-gray-500">{chapter.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{chapter.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Resources:</span>
                      <span className="text-xs font-medium text-gray-900">
                        {chapter.resources}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${chapter.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{chapter.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Chapter Modal */}
      {showAddChapter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Chapter</h2>
            <form onSubmit={handleAddChapter} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newChapter.title}
                  onChange={(e) =>
                    setNewChapter({ ...newChapter, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newChapter.description}
                  onChange={(e) =>
                    setNewChapter({ ...newChapter, description: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input
                  type="text"
                  value={newChapter.duration}
                  onChange={(e) =>
                    setNewChapter({ ...newChapter, duration: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="e.g., 2 hours"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resources</label>
                <input
                  type="text"
                  value={newChapter.resources}
                  onChange={(e) =>
                    setNewChapter({ ...newChapter, resources: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="e.g., PDF, Video, Quiz"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddChapter(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterManager;
