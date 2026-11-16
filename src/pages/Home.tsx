import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  GraduationCap,
  Sparkles,
  BookOpen,
  Monitor,
  Trophy,
  HeartHandshake,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  Phone,
  MessageSquare,
  Shield,
  ChevronRight,
  Award
} from 'lucide-react';
import { HorologicalCrest3D } from '../components/HorologicalCrest3D';
import { FeeEstimatorWidget } from '../components/FeeEstimatorWidget';
import { SchoolCrest } from '../components/SchoolCrest';
import { useLanguage } from '../context/LanguageContext';
import { PILLARS, TESTIMONIALS, SCHOOL_INFO } from '../data/schoolData';

interface HomeProps {
  onOpenInquiry: (grade?: string, locality?: string) => void;
  onOpenOfficePortal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenInquiry, onOpenOfficePortal }) => {
  const { language, t } = useLanguage();
  const [activePillar, setActivePillar] = useState<number>(1);

  const currentPillarData = PILLARS.find((p) => p.id === activePillar) || PILLARS[0];

  const handlePillarClick = (pillarId: number) => {
    setActivePillar(pillarId);
  };

  const scrollToEstimator = () => {
    const el = document.getElementById('fee-bus-estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. SIGNATURE HERO: ASYMMETRIC 12-COLUMN ARCHITECTURAL GRID */}
      <section className="relative pt-6 sm:pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT 7 COLUMNS: EDITORIAL TYPOGRAPHY & INTERACTIVE PILLAR CONTROLS */}
          <div className="lg:col-span-7 space-y-6">
            {/* Subtle Gold-Ruled Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#A67C2E]" />
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
                {t('hero_eyebrow')}
              </span>
            </div>

            {/* Grand Display Headline with Bi-Directional Shimmer Highlight Frame */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0F1D3A] font-semibold tracking-tight leading-[1.15]">
              <span>{t('hero_heading_pre')}</span>{' '}
              <span className="relative inline-block mt-2 sm:mt-0">
                <span
                  className="relative z-10 px-3.5 py-1 text-[#0F1D3A] font-bold tracking-tight rounded-md border transition-all duration-500"
                  style={{
                    borderColor: currentPillarData.accent,
                    boxShadow: `0 0 24px ${currentPillarData.accent}33`,
                    backgroundColor: `${currentPillarData.accent}14`,
                  }}
                >
                  {t('hero_school_name')}
                </span>
                {/* Brass-Gold Shimmer Layer */}
                <span className="absolute inset-0 rounded-md shimmer-gold opacity-60 pointer-events-none" />
              </span>
            </h1>

            {/* Lead Editorial Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-[#0F1D3A]/85 font-normal leading-relaxed max-w-2xl">
              {t('hero_subheading')}
            </p>

            {/* INTERACTIVE 4-PILLAR ARCHITECTURAL TABS */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                  {language === 'hi' ? 'भारतीयम के 4 आधार स्तंभ • 3D सिंक सक्रिय' : 'The Four Institutional Pillars • 3D Synced'}
                </span>
                <span className="text-[10px] text-[#A67C2E] font-medium hidden sm:inline">
                  Click or drag emblem to switch
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PILLARS.map((pillar) => {
                  const isActive = activePillar === pillar.id;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => handlePillarClick(pillar.id)}
                      onMouseEnter={() => handlePillarClick(pillar.id)}
                      className={`p-3 text-left rounded-lg border transition-all duration-300 relative overflow-hidden group ${
                        isActive
                          ? 'bg-[#F2EDE2] border-[#A67C2E] shadow-sm ring-1 ring-[#A67C2E]'
                          : 'bg-white/80 border-[#E2DBD0] hover:bg-[#F2EDE2]/60'
                      }`}
                    >
                      {/* Left Accent Rule */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${
                          isActive ? 'bg-[#A67C2E]' : 'bg-transparent group-hover:bg-[#E2DBD0]'
                        }`}
                      />

                      <div className="flex items-center justify-between pl-1">
                        <span className="font-serif font-bold text-xs sm:text-sm text-[#0F1D3A]">
                          {language === 'hi' ? pillar.titleHi : pillar.titleEn}
                        </span>
                        <span className="text-[10px] font-serif italic text-[#A67C2E]">
                          Pillar {pillar.roman}
                        </span>
                      </div>
                      <p className="pl-1 text-[11px] text-[#0F1D3A]/75 mt-1 leading-snug line-clamp-2">
                        {language === 'hi' ? pillar.descHi : pillar.descEn}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Buttons Row */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="px-6 py-3.5 rounded-lg bg-[#B84A14] hover:bg-[#94380D] text-white text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
              >
                <span>{t('hero_btn_inquiry')}</span>
              </button>

              <button
                type="button"
                onClick={scrollToEstimator}
                className="px-5 py-3.5 rounded-lg bg-white hover:bg-[#F2EDE2] border border-[#E2DBD0] text-[#0F1D3A] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Calculator className="w-4 h-4 text-[#A67C2E]" />
                <span>{t('hero_btn_estimator')}</span>
              </button>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: BESPOKE SVG + THREE.JS 3D KINETIC CREST */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <HorologicalCrest3D
              activePillar={activePillar}
              onSelectPillar={handlePillarClick}
            />
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL METRICS STRIP (LARGE EDITORIAL NUMERALS) */}
      <section className="bg-white border-y border-hairline py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Metric 1 */}
          <div className="border-l-2 border-[#A67C2E] pl-4 sm:pl-6 space-y-1">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1D3A]">
              {t('metric_years_num')}
            </p>
            <p className="text-xs uppercase font-bold tracking-wider text-[#A67C2E]">
              {t('metric_years_label')}
            </p>
            <p className="text-[11px] text-stone-500">
              {t('metric_years_sub')}
            </p>
          </div>

          {/* Metric 2 */}
          <div className="border-l-2 border-[#A67C2E] pl-4 sm:pl-6 space-y-1">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1D3A]">
              {t('metric_ratio_num')}
            </p>
            <p className="text-xs uppercase font-bold tracking-wider text-[#A67C2E]">
              {t('metric_ratio_label')}
            </p>
            <p className="text-[11px] text-stone-500">
              {t('metric_ratio_sub')}
            </p>
          </div>

          {/* Metric 3 */}
          <div className="border-l-2 border-[#A67C2E] pl-4 sm:pl-6 space-y-1">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1D3A]">
              {t('metric_labs_num')}
            </p>
            <p className="text-xs uppercase font-bold tracking-wider text-[#A67C2E]">
              {t('metric_labs_label')}
            </p>
            <p className="text-[11px] text-stone-500">
              {t('metric_labs_sub')}
            </p>
          </div>

          {/* Metric 4 */}
          <div className="border-l-2 border-[#A67C2E] pl-4 sm:pl-6 space-y-1">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1D3A]">
              {t('metric_prep_num')}
            </p>
            <p className="text-xs uppercase font-bold tracking-wider text-[#A67C2E]">
              {t('metric_prep_label')}
            </p>
            <p className="text-[11px] text-stone-500">
              {t('metric_prep_sub')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE BHARTIYAM STANDARD (BENTO EDITORIAL GRID WITH FINE HAIRLINES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#A67C2E]">
            {t('standard_eyebrow')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1D3A]">
            {t('standard_heading')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t('standard_sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bento Card 1: Large Featured (7 Cols) */}
          <div className="md:col-span-7 bg-white p-7 sm:p-9 rounded-xl border border-hairline shadow-subtle hover:shadow-elevated transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#F9F6F0] border border-[#E2DBD0] flex items-center justify-center text-[#A67C2E]">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F1D3A]">
                {t('bento_1_title')}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {t('bento_1_desc')}
              </p>
            </div>
            <div className="pt-6 border-t border-hairline mt-6 flex items-center justify-between text-xs text-[#0F1D3A]">
              <span className="font-mono text-[#A67C2E]">Pedagogical Ratio: 26 to 1</span>
              <span className="font-serif italic">Every Child Counted</span>
            </div>
          </div>

          {/* Bento Card 2: 10-Minute Pre-Class Ritual (5 Cols) */}
          <div className="md:col-span-5 bg-[#0F1D3A] text-white p-7 sm:p-9 rounded-xl border border-[#A67C2E]/40 shadow-subtle flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#1A2E56] border border-[#A67C2E]/30 flex items-center justify-center text-[#E6D5B8]">
                <Clock className="w-6 h-6 text-[#A67C2E]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {t('bento_2_title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {t('bento_2_desc')}
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 mt-6 text-xs text-[#E6D5B8] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A67C2E]" />
              <span>Standardized Daily Morning Habit Since 2005</span>
            </div>
          </div>

          {/* Bento Card 3: Remedial Care (4 Cols) */}
          <div className="md:col-span-4 bg-[#F2EDE2] p-6 sm:p-8 rounded-xl border border-hairline shadow-subtle flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A67C2E]">Zero Cost Support</span>
              <h3 className="font-serif text-xl font-bold text-[#0F1D3A]">
                {t('bento_3_title')}
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                {t('bento_3_desc')}
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2DBD0] mt-4 text-[11px] text-[#0F1D3A] font-semibold">
              ✦ MP Board 10th & 12th Free Camps
            </div>
          </div>

          {/* Bento Card 4: Smart Class & Labs (4 Cols) */}
          <div className="md:col-span-4 bg-white p-6 sm:p-8 rounded-xl border border-hairline shadow-subtle flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-[#A67C2E]">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F1D3A]">
                {t('bento_4_title')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('bento_4_desc')}
              </p>
            </div>
            <div className="pt-4 border-t border-hairline mt-4 text-[11px] text-[#A67C2E] font-medium">
              ✦ Science & IT Workstations
            </div>
          </div>

          {/* Bento Card 5: Sanskar & Seva (4 Cols) */}
          <div className="md:col-span-4 bg-white p-6 sm:p-8 rounded-xl border border-hairline shadow-subtle flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-[#B84A14]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F1D3A]">
                {t('bento_5_title')}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('bento_5_desc')}
              </p>
            </div>
            <div className="pt-4 border-t border-hairline mt-4 text-[11px] text-[#0F1D3A] font-medium">
              ✦ Weekly Shloka & Moral Values
            </div>
          </div>
        </div>
      </section>

      {/* 4. FROM THE PRINCIPAL'S DESK (EDITORIAL LETTER WITH SVG SIGNATURE) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border-2 border-[#A67C2E]/40 p-8 sm:p-12 relative shadow-elevated overflow-hidden">
          {/* Archival corner decorations */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#A67C2E]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#A67C2E]" />

          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#A67C2E]">
              {t('principal_eyebrow')}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F1D3A]">
              {t('principal_heading')}
            </h2>
            <p className="text-xs text-stone-500">
              Pvt. Bhartiyam School, Beohari (Dist. Shahdol M.P.)
            </p>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-stone-800 font-serif leading-relaxed italic max-w-3xl mx-auto">
            <p>"{t('principal_quote_1')}"</p>
            <p>"{t('principal_quote_2')}"</p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#E2DBD0] flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <SchoolCrest size={48} />
              <div>
                <p className="font-serif text-lg font-bold text-[#0F1D3A]">
                  {t('principal_name')}
                </p>
                <p className="text-xs text-stone-600 font-sans">
                  {t('principal_role')}
                </p>
              </div>
            </div>

            {/* Authentic Calligraphic Signature SVG */}
            <div className="text-center sm:text-right">
              <svg className="w-44 h-12 text-[#0F1D3A]" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 45 C 30 10, 40 50, 60 25 C 75 10, 80 40, 95 30 C 110 20, 115 50, 140 20 C 160 30, 175 10, 190 35"
                  stroke="#0F1D3A"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M40 38 L 180 38"
                  stroke="#A67C2E"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                />
              </svg>
              <p className="text-[10px] font-mono text-stone-400 mt-1">Verified Head Signature</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FEE & BUS ROUTE ESTIMATOR WIDGET */}
      <section id="fee-bus-estimator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeeEstimatorWidget
          onProceedToInquiry={(grade, locality) => onOpenInquiry(grade, locality)}
        />
      </section>

      {/* 6. VERIFIED STUDENT & PARENT VOICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#A67C2E]">
            {t('voices_eyebrow')}
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F1D3A]">
            {t('voices_heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((voice) => (
            <div
              key={voice.id}
              className="bg-white p-7 rounded-xl border border-hairline shadow-subtle hover:border-[#A67C2E]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="font-serif text-4xl text-[#A67C2E]/40 font-bold block leading-none">“</span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic font-serif">
                  {language === 'hi' ? voice.quoteHi : voice.quoteEn}
                </p>
              </div>

              <div className="pt-6 border-t border-hairline mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F1D3A] text-[#E6D5B8] flex items-center justify-center font-serif font-bold text-sm">
                  {voice.avatarInitial}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0F1D3A]">{voice.name}</h4>
                  <p className="text-[11px] text-[#A67C2E]">
                    {language === 'hi' ? voice.roleHi : voice.roleEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CAMPUS LOCATION & DIRECT WHATSAPP DESK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F1D3A] text-white rounded-2xl overflow-hidden border border-[#A67C2E]/40 shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 7 Columns: Architectural Campus Desk */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6D5B8]">
                  VISIT BEOHARI CAMPUS
                </span>
                <h3 className="font-serif text-3xl font-bold text-white">
                  {t('campus_loc_heading')}
                </h3>
                <p className="text-xs text-[#E6D5B8]/80">
                  Located in the heart of Beohari near the historic Jai Stambh, easily accessible from all wards and bus terminus.
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#F9F6F0]/90">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#A67C2E] shrink-0 mt-0.5" />
                  <span>{t('campus_loc_address')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#A67C2E] shrink-0" />
                  <span>{t('office_hours')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#A67C2E] shrink-0" />
                  <span>{SCHOOL_INFO.phonePrimary} / {SCHOOL_INFO.phoneLandline}</span>
                </div>
              </div>

              {/* Direct WhatsApp Desk Button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${SCHOOL_INFO.whatsappNumber}?text=${encodeURI('Namaste Bhartiyam School Office, I would like to inquire about school admissions and campus visit.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('whatsapp_desk')}</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenInquiry()}
                  className="px-5 py-3 rounded-lg bg-[#A67C2E] hover:bg-[#86611F] text-white text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <span>Apply for 2026–27</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Architectural Map Graphic Card */}
            <div className="lg:col-span-5 bg-[#0A1326] p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-[#A67C2E]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#A67C2E]/30 pb-3 mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#E6D5B8]">
                    GEOGRAPHIC ANCHOR
                  </span>
                  <span className="text-[10px] font-mono text-[#A67C2E]">24°03′N 81°23′E</span>
                </div>

                <div className="p-4 rounded-lg bg-[#0F1D3A] border border-[#A67C2E]/20 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Compass className="w-4 h-4 text-[#A67C2E]" />
                    <span>Nearest Landmarks in Beohari:</span>
                  </div>
                  <ul className="space-y-1.5 text-stone-300 text-[11px] pl-6 list-disc">
                    <li>Jai Stambh Chowk — 150 meters walking distance</li>
                    <li>Beohari Railway Station — 2.1 km (10 mins by auto)</li>
                    <li>State Highway 9 (Rewa–Shahdol Road) — 400 meters</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={SCHOOL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded border border-[#A67C2E]/50 hover:bg-[#A67C2E]/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#A67C2E]" />
                  <span>Open in Google Maps Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
