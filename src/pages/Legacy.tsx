import React from 'react';
import { SchoolCrest } from '../components/SchoolCrest';
import { useLanguage } from '../context/LanguageContext';
import { SCHOOL_INFO, TESTIMONIALS } from '../data/schoolData';
import { Award, Clock, BookOpen, Compass, ShieldCheck, Heart, UserCheck } from 'lucide-react';

export const Legacy: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2">
          <span className="w-8 h-[1.5px] bg-[#A67C2E]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
            {language === 'hi' ? '20+ वर्षों की गौरवशाली परंपरा' : 'Two Decades of Academic Distinction'}
          </span>
          <span className="w-8 h-[1.5px] bg-[#A67C2E]" />
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0F1D3A]">
          {language === 'hi' ? 'संस्थान की विरासत एवं नेतृत्व' : 'The Legacy & Leadership of Bhartiyam'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-serif italic">
          {language === 'hi'
            ? 'वर्ष 2005 में ब्यौहारी की पावन धरा पर प्रज्वलित हुई ज्ञान की यह ज्योति आज शहडोल संभाग के श्रेष्ठतम शैक्षणिक संस्थानों में प्रतिष्ठित है।'
            : 'Founded in 2005 in Beohari, bringing authentic English-medium excellence with enduring Indian sanskar to the heart of Shahdol district.'}
        </p>
      </div>

      {/* Leadership Profile: Smt. Parul Saxena */}
      <section className="bg-white rounded-2xl border border-hairline p-8 sm:p-12 shadow-elevated">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="w-48 h-48 rounded-full border-4 border-[#A67C2E] p-1.5 shadow-gold-glow mb-4 bg-[#F9F6F0] flex items-center justify-center">
              <SchoolCrest size={140} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0F1D3A]">
              Smt. Parul Saxena
            </h3>
            <p className="text-xs uppercase tracking-wider text-[#A67C2E] font-semibold mt-0.5">
              Principal & Head of Institution
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              Pvt. Bhartiyam School, Beohari
            </p>
          </div>

          <div className="lg:col-span-8 space-y-5 text-sm text-stone-700 leading-relaxed">
            <div className="border-l-4 border-[#A67C2E] pl-4 italic font-serif text-base text-[#0F1D3A]">
              "A school in Beohari does not need to mimic Delhi or London to be world-class. It must simply treat every single child with uncompromising scholastic rigor and parental affection."
            </div>
            <p>
              Under the stewardship of Smt. Parul Saxena, Bhartiyam School was founded in 2005 with a vision to democratize high-grade English medium education for families in Beohari block and surrounding rural settlements of Shahdol district.
            </p>
            <p>
              Recognized early by the Madhya Pradesh Board of Secondary Education (MPBSE), Smt. Saxena introduced institutional practices that remain unique across the region—most notably the mandatory <strong>10-Minute Pre-Class Ritual</strong>, where educators review lesson objectives before every period, and zero-cost post-school board camps for 10th and 12th graders.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3 bg-[#F9F6F0] rounded border border-hairline text-center">
                <p className="font-serif text-xl font-bold text-[#0F1D3A]">20+ Yrs</p>
                <p className="text-[10px] uppercase text-[#A67C2E]">Continuous Service</p>
              </div>
              <div className="p-3 bg-[#F9F6F0] rounded border border-hairline text-center">
                <p className="font-serif text-xl font-bold text-[#0F1D3A]">100%</p>
                <p className="text-[10px] uppercase text-[#A67C2E]">Board Pass Record</p>
              </div>
              <div className="p-3 bg-[#F9F6F0] rounded border border-hairline text-center col-span-2 sm:col-span-1">
                <p className="font-serif text-xl font-bold text-[#0F1D3A]">23160200703</p>
                <p className="text-[10px] uppercase text-[#A67C2E]">Verified UDISE Code</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 20-Year Milestones Timeline */}
      <section className="space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
            CHRONOLOGICAL MILESTONES
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F1D3A]">
            The Journey of Bhartiyam (2005 – 2026)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-hairline shadow-subtle space-y-3">
            <span className="font-serif text-2xl font-bold text-[#A67C2E]">2005</span>
            <h4 className="font-serif font-bold text-base text-[#0F1D3A]">Founding at Jai Stambh</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Bhartiyam School opens its doors in Ward 7, Beohari, introducing an English-medium curriculum built around small batch sizes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-hairline shadow-subtle space-y-3">
            <span className="font-serif text-2xl font-bold text-[#A67C2E]">2012</span>
            <h4 className="font-serif font-bold text-base text-[#0F1D3A]">Science & Computer Wings</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Inauguration of modern Physics, Chemistry, Biology apparatus, and individual workstation computer labs for rural students.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-hairline shadow-subtle space-y-3">
            <span className="font-serif text-2xl font-bold text-[#A67C2E]">2018</span>
            <h4 className="font-serif font-bold text-base text-[#0F1D3A]">Smart Classroom Rollout</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Transitioning conventional blackboards into interactive digital audio-visual screens, enabling 3D concept visualizations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-hairline shadow-subtle space-y-3">
            <span className="font-serif text-2xl font-bold text-[#A67C2E]">2026</span>
            <h4 className="font-serif font-bold text-base text-[#0F1D3A]">Two Decades of Trust</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Celebrating over 20 years of continuous service in Beohari with second-generation admissions and block-leading board rankings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
