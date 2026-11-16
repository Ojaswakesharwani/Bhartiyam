import React from 'react';
import { X, ZoomIn, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LightboxModalProps {
  item: {
    titleEn: string;
    titleHi: string;
    descriptionEn: string;
    descriptionHi: string;
    image: string;
    tag: string;
  } | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  const { language } = useLanguage();
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#0F1D3A] rounded-xl overflow-hidden border border-[#A67C2E]/40 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#A67C2E]/30 bg-[#0A1326] text-white">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#A67C2E] text-white">
              {item.tag}
            </span>
            <h3 className="font-serif text-base sm:text-lg font-bold text-white">
              {language === 'hi' ? item.titleHi : item.titleEn}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Preview */}
        <div className="relative aspect-[16/10] bg-stone-900 flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.titleEn}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Caption Plaque */}
        <div className="p-4 px-6 bg-[#0F1D3A] text-[#F9F6F0] flex items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#E6D5B8] leading-relaxed">
            {language === 'hi' ? item.descriptionHi : item.descriptionEn}
          </p>
          <span className="text-[10px] text-stone-400 font-mono shrink-0">
            Bhartiyam Beohari Campus Records
          </span>
        </div>
      </div>
    </div>
  );
};
