import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Tasks from './components/Tasks';
import Projects from './components/Projects';
import Calendar from './components/Calendar';
import Profile from './components/Profile';
import Login from './components/Login';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        {isAuthenticated && (
          <div className="sidebar bg-dark text-white">
            <div className="sidebar-header p-3">
              <h3>Logo CC5</h3>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/tasks" 
                  className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tasks')}
                >
                  Tugas
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/projects" 
                  className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  Proyek
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/calendar" 
                  className={`nav-link ${activeTab === 'calendar' ? 'active' : ''}`}
                  onClick={() => setActiveTab('calendar')}
                >
                  Kalender
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/profile" 
                  className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profil
                </Link>
              </li>
            </ul>
            <div className="sidebar-footer p-3">
              <small>Copyright of Kelompok 5 & Cloud Computing 2025</small>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/profile" element={<Profile />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
