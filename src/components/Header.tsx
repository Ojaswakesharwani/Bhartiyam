import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, Menu, X, ArrowUpRight, GraduationCap } from 'lucide-react';
import { SchoolCrest } from './SchoolCrest';
import { useLanguage } from '../context/LanguageContext';
import { SCHOOL_INFO } from '../data/schoolData';

interface HeaderProps {
  onOpenInquiry: () => void;
  onOpenOfficePortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiry, onOpenOfficePortal }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { path: '/', label: t('nav_home') },
    { path: '/legacy', label: t('nav_legacy') },
    { path: '/academics', label: t('nav_academics') },
    { path: '/admissions', label: t('nav_admissions') },
    { path: '/disclosures', label: t('nav_disclosures') },
    { path: '/chronicles', label: t('nav_chronicles') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. TOP HERITAGE STRIP */}
      <div className="bg-[#0F1D3A] text-[#F9F6F0] text-xs py-2 px-4 sm:px-6 border-b border-[#A67C2E]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left Institutional Credential */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs tracking-wider text-[#E6D5B8] text-center md:text-left font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B84A14] inline-block animate-pulse"></span>
            <span>{t('top_tagline')}</span>
          </div>

          {/* Right: Direct Clickable Contact Numbers & Language Toggle */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <div className="hidden lg:flex items-center gap-3 text-[#E6D5B8]">
              <a
                href={`tel:${SCHOOL_INFO.phonePrimary}`}
                className="hover:text-white transition-colors flex items-center gap-1 font-semibold"
              >
                <Phone className="w-3 h-3 text-[#A67C2E]" />
                {SCHOOL_INFO.phonePrimary}
              </a>
              <span className="opacity-40">|</span>
              <a
                href={`tel:${SCHOOL_INFO.phoneLandline}`}
                className="hover:text-white transition-colors"
              >
                {SCHOOL_INFO.phoneLandline}
              </a>
            </div>

            {/* Smart Sliding Pill Language Switcher [ EN | हिंदी ] */}
            <div className="relative inline-flex items-center p-0.5 rounded-full bg-[#0A1326] border border-[#A67C2E]/40 shadow-inner">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`relative px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-[#A67C2E] text-white shadow-sm'
                    : 'text-[#E6D5B8]/80 hover:text-white'
                }`}
                title="Switch interface to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`relative px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all duration-200 ${
                  language === 'hi'
                    ? 'bg-[#A67C2E] text-white shadow-sm font-hindi'
                    : 'text-[#E6D5B8]/80 hover:text-white font-hindi'
                }`}
                title="इंटरफ़ेस को हिंदी में बदलें"
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STICKY GLASS-PARCHMENT MAIN NAVIGATION */}
      <nav className="backdrop-blur-md bg-[#F9F6F0]/92 border-b border-[#E2DBD0] shadow-subtle transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* School Crest & Typographic Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <SchoolCrest size={52} className="group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0F1D3A] leading-tight">
                  {language === 'hi' ? 'भारतीयम स्कूल' : 'BHARTIYAM SCHOOL'}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#A67C2E] font-semibold">
                  {language === 'hi' ? 'ब्यौहारी • शहडोल (म.प्र.)' : 'BEOHARI • SHAHDOL M.P.'}
                </span>
              </div>
            </Link>

            {/* Desktop Center Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide rounded transition-all duration-200 ${
                      isActive
                        ? 'text-[#0F1D3A] font-semibold bg-[#E6D5B8]/40 border-b-2 border-[#A67C2E]'
                        : 'text-[#0F1D3A]/75 hover:text-[#0F1D3A] hover:bg-[#F2EDE2]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right Actions: Office Portal + Apply 2026-27 */}
            <div className="hidden md:flex items-center gap-3">
              {/* Office Portal Ghost Button */}
              <button
                type="button"
                onClick={onOpenOfficePortal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0F1D3A] bg-transparent hover:bg-[#E6D5B8]/30 border border-[#E2DBD0] rounded transition-all duration-200"
                title="Management and Clerk Portal Preview"
              >
                <Lock className="w-3.5 h-3.5 text-[#A67C2E]" />
                <span>{t('office_portal')}</span>
              </button>

              {/* Apply 2026–27 Oxford Navy Button */}
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F9F6F0] bg-[#0F1D3A] hover:bg-[#1A2E56] border border-transparent hover:border-[#A67C2E] rounded shadow-sm hover:shadow-gold-glow transition-all duration-300"
              >
                <GraduationCap className="w-4 h-4 text-[#A67C2E]" />
                <span>{t('apply_now')}</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-[#0F1D3A] hover:bg-[#F2EDE2] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2DBD0] bg-[#F9F6F0] px-4 pt-3 pb-6 shadow-elevated">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#E6D5B8]/50 text-[#0F1D3A] font-bold border-l-4 border-[#A67C2E]'
                        : 'text-[#0F1D3A]/80 hover:bg-[#F2EDE2]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-[#E2DBD0] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOfficePortal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded text-xs font-medium text-[#0F1D3A] border border-[#E2DBD0] bg-white"
                >
                  <Lock className="w-3.5 h-3.5 text-[#A67C2E]" />
                  <span>{t('office_portal')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-white bg-[#0F1D3A]"
                >
                  <GraduationCap className="w-4 h-4 text-[#A67C2E]" />
                  <span>{t('apply_now')}</span>
                </button>

                <div className="mt-2 text-center text-xs text-[#0F1D3A]/70 flex justify-center items-center gap-2">
                  <Phone className="w-3 h-3 text-[#A67C2E]" />
                  <a href={`tel:${SCHOOL_INFO.phonePrimary}`} className="font-semibold underline">
                    {SCHOOL_INFO.phonePrimary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
