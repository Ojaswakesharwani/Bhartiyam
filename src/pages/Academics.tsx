import React, { useState } from 'react';
import { BookOpen, Monitor, Award, Clock, ArrowRight, Briefcase, CheckCircle2, FlaskConical, Cpu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FACULTY_OPENINGS } from '../data/schoolData';
import { CareerDrawer } from '../components/CareerDrawer';

export const Academics: React.FC = () => {
  const { language } = useLanguage();
  const [careerOpen, setCareerOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('job-1');

  const handleApplyClick = (id: string) => {
    setSelectedJobId(id);
    setCareerOpen(true);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
          {language === 'hi' ? 'पाठ्यक्रम एवं शिक्षण पद्धति' : 'Pedagogy & Curriculum Architecture'}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0F1D3A]">
          {language === 'hi' ? 'शैक्षणिक उत्कृष्टता एवं परिसर' : 'Academics & Campus Infrastructure'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-serif italic">
          Aligned with the Madhya Pradesh Board of Secondary Education (MPBSE) and enriched with active digital labs, small-batch mentoring, and daily character routines.
        </p>
      </div>

      {/* 3 Academic Wings */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Wing 1 */}
        <div className="bg-white p-7 rounded-xl border border-hairline shadow-subtle hover:border-[#A67C2E] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <span className="px-2.5 py-1 rounded bg-[#F9F6F0] text-[10px] font-mono uppercase text-[#A67C2E] border border-[#E2DBD0]">
              Ages 3 to 6 Years
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0F1D3A]">
              Foundational Wing
            </h3>
            <p className="text-xs text-[#A67C2E] font-medium">Nursery, LKG & UKG</p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Gentle introduction to phonics, bilingual conversational ease (Hindi & English), motor skills through Montessori kits, and moral storytelling.
            </p>
            <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-hairline">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Play-way sensorial learning</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero homework pressure for toddlers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Attentive female care attendants</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Wing 2 */}
        <div className="bg-white p-7 rounded-xl border border-hairline shadow-subtle hover:border-[#A67C2E] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <span className="px-2.5 py-1 rounded bg-[#F9F6F0] text-[10px] font-mono uppercase text-[#A67C2E] border border-[#E2DBD0]">
              Classes 1 to 8
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0F1D3A]">
              Preparatory & Middle
            </h3>
            <p className="text-xs text-[#A67C2E] font-medium">Primary & Upper Primary</p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Building crystal-clear logic in arithmetic, mental math, scientific curiosity, English grammar and public speech confidence in morning assembly.
            </p>
            <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-hairline">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Weekly hands-on science experiments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Computer lab fundamentals & typing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Vedic mathematics & mental logic</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Wing 3 */}
        <div className="bg-[#0F1D3A] text-white p-7 rounded-xl border border-[#A67C2E]/40 shadow-subtle flex flex-col justify-between">
          <div className="space-y-4">
            <span className="px-2.5 py-1 rounded bg-[#1A2E56] text-[10px] font-mono uppercase text-[#E6D5B8] border border-[#A67C2E]/30">
              Classes 9 to 12 MPBSE
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Senior Secondary
            </h3>
            <p className="text-xs text-[#E6D5B8] font-medium">Board Exam Mastery</p>
            <p className="text-xs text-stone-300 leading-relaxed">
              Exacting MP Board exam preparation combined with foundational guidance for CUET, JEE, NEET, and public civil services.
            </p>
            <ul className="text-xs text-stone-300 space-y-2 pt-2 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A67C2E]" />
                <span>Free zero-cost post-school board camps</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A67C2E]" />
                <span>Complete Physics, Chem & Bio practicals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A67C2E]" />
                <span>Previous 10-year question solving</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Science & Computer Labs Feature Section */}
      <section className="bg-white rounded-2xl border border-hairline p-8 sm:p-12 shadow-subtle">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
              EXPERIMENTAL CLARITY
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F1D3A]">
              Smart Classrooms & Experiential Laboratories
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              At Bhartiyam School, science is never memorized from chalkboards alone. Our students regularly manipulate optical benches, microscopes, electrical circuits, and chemical reactions under the direct supervision of trained post-graduate educators.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 bg-[#F9F6F0] rounded border border-hairline">
                <FlaskConical className="w-5 h-5 text-[#A67C2E] mb-1" />
                <p className="font-bold text-[#0F1D3A]">Science Labs</p>
                <p className="text-[11px] text-stone-500">Physics, Chemistry & Biology apparatus</p>
              </div>
              <div className="p-3 bg-[#F9F6F0] rounded border border-hairline">
                <Cpu className="w-5 h-5 text-[#A67C2E] mb-1" />
                <p className="font-bold text-[#0F1D3A]">Digital IT Lab</p>
                <p className="text-[11px] text-stone-500">Individual workstations & internet literacy</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-hairline shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80"
              alt="Bhartiyam Science Laboratories"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* FACULTY RECRUITMENT DESK */}
      <section className="bg-[#F2EDE2] rounded-2xl border border-[#E2DBD0] p-8 sm:p-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DBD0] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
              <Briefcase className="w-4 h-4" />
              <span>FACULTY CAREERS DESK</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#0F1D3A] mt-1">
              Join Bhartiyam's Distinguished Teaching Faculty
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              We welcome dedicated educators who cherish personal mentorship, character building, and academic excellence in Beohari.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-white text-[#0F1D3A] border border-hairline shrink-0">
            {FACULTY_OPENINGS.length} Current Openings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FACULTY_OPENINGS.map((job) => (
            <div
              key={job.id}
              className="bg-white p-5 rounded-xl border border-hairline shadow-subtle flex flex-col justify-between space-y-4 hover:border-[#A67C2E]/60 transition-all"
            >
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#A67C2E]">{job.department}</span>
                <h4 className="font-serif font-bold text-base text-[#0F1D3A]">
                  {language === 'hi' ? job.titleHi : job.titleEn}
                </h4>
                <p className="text-xs text-stone-600">
                  <strong>Qualification:</strong> {job.qualification}
                </p>
                <div className="flex gap-4 text-[10px] text-stone-500 pt-1">
                  <span>📍 {job.location}</span>
                  <span>⏱ {job.experience}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-hairline flex justify-end">
                <button
                  type="button"
                  onClick={() => handleApplyClick(job.id)}
                  className="px-4 py-1.5 rounded bg-[#0F1D3A] hover:bg-[#1A2E56] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3 h-3 text-[#A67C2E]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Application Drawer */}
      <CareerDrawer
        isOpen={careerOpen}
        onClose={() => setCareerOpen(false)}
        selectedJobId={selectedJobId}
      />
    </div>
  );
};
