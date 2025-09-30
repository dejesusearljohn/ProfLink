import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import FacultyDirectory from './components/FacultyDirectory';
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
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
              <Route path="/browse-faculty" element={<FacultyDirectory />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MockDataProvider>
  );
}

export default App;
