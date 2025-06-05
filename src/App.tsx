import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './contexts/ResumeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';
import Preview from './pages/Preview';
import Export from './pages/Export';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/export" element={<Export />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;