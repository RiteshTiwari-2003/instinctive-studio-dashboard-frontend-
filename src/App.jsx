import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StudentTable from './components/StudentTable';
import Dashboard from './components/Dashboard';
import ChapterManager from './components/ChapterManager';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentTable />} />
              <Route path="/chapter" element={<ChapterManager />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/help" element={
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Quick Start Guide */}
                        <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Start Guide</h3>
                          <p className="text-gray-600 mb-4">Learn the basics of using the dashboard</p>
                          <button className="text-primary hover:text-blue-700">Read More →</button>
                        </div>

                        {/* FAQs */}
                        <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">FAQs</h3>
                          <p className="text-gray-600 mb-4">Find answers to common questions</p>
                          <button className="text-primary hover:text-blue-700">View FAQs →</button>
                        </div>

                        {/* Contact Support */}
                        <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Support</h3>
                          <p className="text-gray-600 mb-4">Get help from our support team</p>
                          <button className="text-primary hover:text-blue-700">Contact Us →</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } />
              <Route path="/settings" element={
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                      <div className="max-w-2xl">
                        {/* Profile Settings */}
                        <div className="mb-8">
                          <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h2>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                              </label>
                              <input
                                type="text"
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                defaultValue="Adeline H. Dancy"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                              </label>
                              <input
                                type="email"
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                defaultValue="adeline@example.com"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Notification Settings */}
                        <div className="mb-8">
                          <h2 className="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                                <p className="text-sm text-gray-500">Receive email updates about your account</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">Course Updates</h3>
                                <p className="text-sm text-gray-500">Get notified about course changes</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                          <button className="btn btn-primary">Save Changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
