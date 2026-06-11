import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import SchoolLandingPage from './pages/SchoolLandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/school/2" replace />} />
        <Route path="/school/:schoolId" element={<SchoolLandingPageWrapper />} />
        <Route path="/school/slug/:slug" element={<SchoolLandingPageWrapperSlug />} />
      </Routes>
    </Router>
  );
}

function SchoolLandingPageWrapper() {
  const { schoolId } = useParams();
  return <SchoolLandingPage schoolId={schoolId} isSlug={false} />;
}

function SchoolLandingPageWrapperSlug() {
  const { slug } = useParams();
  return <SchoolLandingPage schoolId={slug} isSlug={true} />;
}

export default App;
