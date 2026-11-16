import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useOfficeData } from '../context/OfficeDataContext';
import { useLanguage } from '../context/LanguageContext';

export const NoticeTicker: React.FC = () => {
  const { notices } = useOfficeData();
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (notices.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [notices.length]);

  if (!notices.length) return null;

  const currentNotice = notices[currentIndex] || notices[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % notices.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + notices.length) % notices.length);
  };

  return (
    <div className="bg-[#F2EDE2] border-b border-[#E2DBD0] py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Label Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0F1D3A] text-[#F9F6F0] text-[10px] uppercase font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B84A14] animate-ping" />
            <Bell className="w-3 h-3 text-[#A67C2E]" />
            <span>{language === 'hi' ? 'सूचना पट्ट' : 'Official Bulletin'}</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#A67C2E] uppercase tracking-wider">
            [{currentNotice.category}]
          </span>
        </div>

        {/* Notice Message with Fade */}
        <div className="flex-1 overflow-hidden min-w-0">
          <p className="truncate text-xs text-[#0F1D3A] font-medium transition-all duration-300">
            {language === 'hi' ? currentNotice.titleHi : currentNotice.titleEn}
          </p>
        </div>

        {/* Date and Controls */}
        <div className="flex items-center gap-2 shrink-0 text-[#0F1D3A]/70 text-[11px]">
          <span className="hidden md:inline font-mono">{currentNotice.date}</span>
          <div className="flex items-center gap-0.5 border border-[#E2DBD0] rounded bg-white">
            <button
              onClick={handlePrev}
              className="p-1 hover:bg-[#F2EDE2] text-[#0F1D3A] transition-colors"
              title="Previous notice"
              aria-label="Previous Notice"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[10px] font-mono text-stone-500">
              {currentIndex + 1}/{notices.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-[#F2EDE2] text-[#0F1D3A] transition-colors"
              title="Next notice"
              aria-label="Next Notice"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
