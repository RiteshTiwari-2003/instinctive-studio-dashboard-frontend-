import { useState } from 'react';
import AddStudentForm from './AddStudentForm';

const Header = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-light">
        <div className="flex items-center space-x-4">
          <select className="border rounded-md p-2 text-gray-600">
            <option>AY 2024-25</option>
            <option>AY 2023-24</option>
          </select>
          
          <select className="border rounded-md p-2 text-gray-600">
            <option>CBSE 9</option>
            <option>CBSE 10</option>
          </select>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search your course"
              className="border rounded-md p-2 pl-8 w-64"
            />
            <span className="absolute left-2 top-2.5">🔍</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            + Add new Student
          </button>
          
          <div className="flex items-center space-x-2">
            <img
              src="https://ui-avatars.com/api/?name=Adeline+H+Dancy&background=random"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-700">Adeline H. Dancy</span>
          </div>
        </div>
      </div>

      {showAddForm && <AddStudentForm onClose={() => setShowAddForm(false)} />}
    </>
  );
};

export default Header;
