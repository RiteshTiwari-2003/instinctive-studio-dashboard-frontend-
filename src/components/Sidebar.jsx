import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Students', path: '/students', icon: '👥' },
  { name: 'Chapter', path: '/chapter', icon: '📚' },
  { name: 'Help', path: '/help', icon: '❓' },
  { name: 'Reports', path: '/reports', icon: '📈' },
  { name: 'Settings', path: '/settings', icon: '⚙️' }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-sidebar text-white h-screen w-64 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Quyl.</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={\`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors \${
                location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-700'
              }\`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
