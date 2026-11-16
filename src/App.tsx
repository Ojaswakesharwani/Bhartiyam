import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { OfficeDataProvider } from './context/OfficeDataContext';
import { Header } from './components/Header';
import { NoticeTicker } from './components/NoticeTicker';
import { Footer } from './components/Footer';
import { AdmissionWizardModal } from './components/AdmissionWizardModal';
import { OfficePortalModal } from './components/OfficePortalModal';

// Pages
import { Home } from './pages/Home';
import { Legacy } from './pages/Legacy';
import { Academics } from './pages/Academics';
import { Admissions } from './pages/Admissions';
import { Disclosures } from './pages/Disclosures';
import { Chronicles } from './pages/Chronicles';
import { OfficePortalPage } from './pages/OfficePortalPage';

export function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('Class 1');
  const [selectedLocality, setSelectedLocality] = useState('Near Jai Stambh, Ward 7');
  const [officePortalOpen, setOfficePortalOpen] = useState(false);

  const handleOpenInquiry = (grade?: string, locality?: string) => {
    if (grade) setSelectedGrade(grade);
    if (locality) setSelectedLocality(locality);
    setInquiryModalOpen(true);
  };

  const handleOpenOfficePortal = () => {
    setOfficePortalOpen(true);
  };

  return (
    <LanguageProvider>
      <OfficeDataProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#0F1D3A] selection:bg-[#E6D5B8] selection:text-[#0F1D3A]">
            {/* Architectural Header */}
            <Header
              onOpenInquiry={() => handleOpenInquiry()}
              onOpenOfficePortal={handleOpenOfficePortal}
            />

            {/* Live Bulletin Ticker */}
            <NoticeTicker />

            {/* Main Multi-page Routes */}
            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      onOpenInquiry={handleOpenInquiry}
                      onOpenOfficePortal={handleOpenOfficePortal}
                    />
                  }
                />
                <Route path="/legacy" element={<Legacy />} />
                <Route path="/academics" element={<Academics />} />
                <Route
                  path="/admissions"
                  element={<Admissions onOpenInquiry={handleOpenInquiry} />}
                />
                <Route path="/disclosures" element={<Disclosures />} />
                <Route path="/chronicles" element={<Chronicles />} />
                <Route path="/office-portal" element={<OfficePortalPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Editorial Footer */}
            <Footer
              onOpenInquiry={() => handleOpenInquiry()}
              onOpenOfficePortal={handleOpenOfficePortal}
            />

            {/* 3-Step Admission Inquiry Wizard Modal */}
            <AdmissionWizardModal
              isOpen={inquiryModalOpen}
              onClose={() => setInquiryModalOpen(false)}
              initialGrade={selectedGrade}
              initialLocality={selectedLocality}
            />

            {/* Interactive Office Portal Modal */}
            <OfficePortalModal
              isOpen={officePortalOpen}
              onClose={() => setOfficePortalOpen(false)}
            />
          </div>
        </BrowserRouter>
      </OfficeDataProvider>
    </LanguageProvider>
  );
}

export default App;
