import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Shield, ArrowUpRight } from 'lucide-react';
import { SchoolCrest } from './SchoolCrest';
import { useLanguage } from '../context/LanguageContext';
import { SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  onOpenOfficePortal: () => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOfficePortal, onOpenInquiry }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#0A1326] text-[#F9F6F0] border-t border-[#A67C2E]/40 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle Background Watermark Crest */}
      <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none translate-x-12 translate-y-12">
        <SchoolCrest size={460} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E2DBD0]/15">
          {/* Column 1: School Identity & Heritage (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <SchoolCrest size={56} />
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
                  {language === 'hi' ? 'भारतीयम स्कूल' : 'BHARTIYAM SCHOOL'}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#A67C2E] font-semibold">
                  Beohari • District Shahdol (M.P.)
                </p>
              </div>
            </div>

            <p className="text-xs text-[#E6D5B8]/80 leading-relaxed max-w-md">
              {t('footer_tagline')}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0F1D3A] border border-[#A67C2E]/40 text-[11px] font-mono text-[#E6D5B8]">
                <Shield className="w-3.5 h-3.5 text-[#A67C2E]" />
                <span>UDISE: {SCHOOL_INFO.udiseCode}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0F1D3A] border border-[#A67C2E]/40 text-[11px] text-[#E6D5B8]">
                <span>MPBSE Affiliated</span>
              </span>
            </div>
          </div>

          {/* Column 2: Institutional Pages (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
              {language === 'hi' ? 'महत्वपूर्ण अनुभाग' : 'Institutional Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-[#F9F6F0]/80 hover:text-white transition-colors">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link to="/legacy" className="text-[#F9F6F0]/80 hover:text-white transition-colors">
                  {t('nav_legacy')}
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-[#F9F6F0]/80 hover:text-white transition-colors">
                  {t('nav_academics')}
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-[#F9F6F0]/80 hover:text-white transition-colors">
                  {t('nav_admissions')}
                </Link>
              </li>
              <li>
                <Link to="/disclosures" className="text-[#F9F6F0]/80 hover:text-white transition-colors">
                  {t('nav_disclosures')}
                </Link>
              </li>
              <li>
                <Link to="/chronicles" className="text-[#F9F6F0]/80 hover:text-white transition-colors">
                  {t('nav_chronicles')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Campus Locality (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
              {language === 'hi' ? 'परिसर संपर्क विवरण' : 'Campus Location & Hours'}
            </h4>
            <div className="space-y-2.5 text-xs text-[#E6D5B8]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A67C2E] shrink-0 mt-0.5" />
                <span>{language === 'hi' ? SCHOOL_INFO.addressHi : SCHOOL_INFO.addressEn}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A67C2E] shrink-0" />
                <div className="flex gap-2">
                  <a href={`tel:${SCHOOL_INFO.phonePrimary}`} className="hover:text-white font-semibold">
                    {SCHOOL_INFO.phonePrimary}
                  </a>
                  <span>•</span>
                  <a href={`tel:${SCHOOL_INFO.phoneLandline}`} className="hover:text-white">
                    {SCHOOL_INFO.phoneLandline}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A67C2E] shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white">
                  {SCHOOL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#A67C2E] shrink-0" />
                <span>{language === 'hi' ? SCHOOL_INFO.timingsHi : SCHOOL_INFO.timingsEn}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="text-xs px-3 py-1.5 rounded bg-[#A67C2E] text-white font-semibold hover:bg-[#86611F] transition-colors"
              >
                Apply 2026–27
              </button>
              <button
                type="button"
                onClick={onOpenOfficePortal}
                className="text-xs px-3 py-1.5 rounded border border-[#A67C2E]/40 text-[#E6D5B8] hover:text-white hover:bg-white/5 transition-colors"
              >
                Office Portal Preview
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E6D5B8]/60">
          <p>{t('footer_rights')}</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#E6D5B8]">Beohari, Shahdol (M.P.) – 484774</span>
            <span>•</span>
            <span className="text-[#A67C2E] font-medium">Head: Smt. Parul Saxena</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
