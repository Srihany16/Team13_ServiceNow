import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WellbeingPage from './pages/WellbeingPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('wellbeing');

  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#eaf7f8' }}>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main style={{ padding: '24px 16px', maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
        {currentPage === 'wellbeing' ? <WellbeingPage /> : <Home />}
      </main>
    </div>
  );
}

export default App;
