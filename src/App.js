import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import FacultyDirectory from './components/FacultyDirectory';
import Counter from './components/Counter';
import ProtectedRoute from './components/ProtectedRoute';
import { MockDataProvider } from './data/MockDataService';
import './styles/ProfLink.css';

function App() {
  return (
    <MockDataProvider>
      <Router>
        <div className="min-h-screen bg-gradient-subtle">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/counter" element={<Counter />} />
              <Route 
                path="/student-dashboard" 
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/faculty-dashboard" 
                element={
                  <ProtectedRoute requiredRole="faculty">
                    <FacultyDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/browse-faculty" 
                element={
                  <ProtectedRoute>
                    <FacultyDirectory />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </MockDataProvider>
  );
}

export default App;
