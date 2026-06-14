import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SchoolLandingPage from './pages/SchoolLandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<SchoolLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
