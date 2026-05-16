import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import SchoolLandingPage from './pages/SchoolLandingPage';

/**
 * App Component with Routing
 * Demonstrates how to use the dynamic landing page with React Router
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for school ID: /school/123 */}
        <Route path="/school/:schoolId" element={<SchoolLandingPageWrapper />} />

        {/* Route for school slug: /school/ideal-international */}
        <Route path="/school/slug/:slug" element={<SchoolLandingPageWrapperSlug />} />

        {/* Home page - redirect to example school */}
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="text-center max-w-2xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                  Dynamic School Landing Page
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  A professional, reusable landing page template that dynamically fetches and displays school data.
                </p>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                    Getting Started
                  </h2>
                  <p className="text-gray-600 mb-6">
                    To view a school landing page, navigate to:
                  </p>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-6 text-left font-mono text-sm overflow-auto">
                    <div>/school/:schoolId</div>
                    <div className="text-gray-500 mt-2">Example: /school/1</div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Or use a school slug:
                  </p>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-6 text-left font-mono text-sm overflow-auto">
                    <div>/school/slug/:slug</div>
                    <div className="text-gray-500 mt-2">Example: /school/slug/ideal-international</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="/school/1"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      View School (ID)
                    </a>
                    <a
                      href="/school/slug/ideal-international"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                    >
                      View School (Slug)
                    </a>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
                  <h3 className="font-semibold text-slate-900 mb-3">Features</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>✓ Dynamic school data fetching from API</li>
                    <li>✓ Responsive design (mobile, tablet, desktop)</li>
                    <li>✓ Reusable React components</li>
                    <li>✓ Custom hooks for data management</li>
                    <li>✓ Beautiful Tailwind CSS styling</li>
                    <li>✓ Smooth animations and transitions</li>
                    <li>✓ Error handling and loading states</li>
                    <li>✓ Scroll to top functionality</li>
                  </ul>
                </div>
              </div>
            </div>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen bg-white">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-6">Page not found</p>
                <a
                  href="/"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

/**
 * Wrapper component to extract schoolId from URL params
 */
function SchoolLandingPageWrapper() {
  const { schoolId } = useParams();
  return <SchoolLandingPage schoolId={schoolId} isSlug={false} />;
}

/**
 * Wrapper component to extract slug from URL params
 */
function SchoolLandingPageWrapperSlug() {
  const { slug } = useParams();
  return <SchoolLandingPage schoolId={slug} isSlug={true} />;
}

export default App;
