import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import WellbeingPage from './pages/WellbeingPage';
import SupportPage from './pages/SupportPage';
import StaffDashboard from './pages/StaffDashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#eaf7f8' }}>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main style={{ padding: '24px 16px', maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
        {currentPage === 'dashboard' && <StudentDashboard studentId="STU001" />}
        {currentPage === 'support' && <SupportPage studentId="STU001" />}
        {currentPage === 'wellbeing' && <WellbeingPage />}
        {currentPage === 'staff' && <StaffDashboard />}
        {currentPage === 'home' && <Home />}
      </main>
    </div>
  );
}

export default App;
