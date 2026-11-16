import React, { useState } from 'react';
import { Camera, Eye, Filter, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';
import { LightboxModal } from '../components/LightboxModal';

export const Chronicles: React.FC = () => {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<any | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#A67C2E]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
            {language === 'hi' ? 'परिसर संस्मरण एवं गतिविधियाँ' : 'Campus Chronicles & Visual Archive'}
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0F1D3A]">
          {language === 'hi' ? 'दैनिक जीवन, प्रयोगशालाएँ एवं संस्कृति' : 'Life at Bhartiyam School, Beohari'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-serif italic">
          Moments of discovery, morning assembly assemblies, laboratory practicals, and cultural festivals captured across our campus.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'all', label: 'All Chronicles' },
          { id: 'smart_class', label: 'Smart Classrooms' },
          { id: 'labs', label: 'Science & IT Labs' },
          { id: 'cultural', label: 'Cultural & Seva' },
          { id: 'sports', label: 'Sports & Athletics' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              filter === tab.id
                ? 'bg-[#0F1D3A] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-[#F2EDE2] border border-hairline'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Curated Masonry Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative bg-white rounded-xl overflow-hidden border border-hairline shadow-subtle hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container with Zoom effect */}
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0F1D3A]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-white/90 text-[#0F1D3A] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-5 h-5 text-[#A67C2E]" />
                </span>
              </div>
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#0F1D3A]/85 text-white backdrop-blur-sm">
                {item.tag}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#0F1D3A] group-hover:text-[#A67C2E] transition-colors">
                {language === 'hi' ? item.titleHi : item.titleEn}
              </h3>
              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {language === 'hi' ? item.descriptionHi : item.descriptionEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={activeImage}
        onClose={() => setActiveImage(null)}
      />
    </div>
  );
};
