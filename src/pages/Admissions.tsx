import React, { useState } from 'react';
import {
  GraduationCap,
  Calculator,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Calendar,
  Phone,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FEE_SLABS, BUS_LOCALITIES, SCHOOL_INFO } from '../data/schoolData';
import { FeeEstimatorWidget } from '../components/FeeEstimatorWidget';

interface AdmissionsPageProps {
  onOpenInquiry: (grade?: string, locality?: string) => void;
}

export const Admissions: React.FC<AdmissionsPageProps> = ({ onOpenInquiry }) => {
  const { language } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is the admission procedure for Session 2026–27 at Bhartiyam School?",
      a: "Parents can generate a 2-minute Provisional Inquiry Pass online or visit the school office near Jai Stambh, Beohari (Mon–Sat, 9:00 AM – 2:00 PM) with the student's birth certificate and previous report card for interaction."
    },
    {
      q: "Is there any donation or capitation fee required for admission?",
      a: "Strictly NO. Bhartiyam School operates strictly under the MP School Education Fee Regulation Act. All fees are computerized and officially receipted with zero capitation charges."
    },
    {
      q: "What are the age criteria for Nursery and KG admissions?",
      a: "For Nursery admission, the child should have completed 3 years of age as of 31st July 2026. For Class 1, the minimum recommended age is 6 years."
    },
    {
      q: "Does Bhartiyam provide bus pickup for villages outside Beohari town?",
      a: "Yes. Our transport fleet covers town localities (Jai Stambh, Station Road, Bansagar Colony) as well as outlying villages along Paprehi and Rewa Road."
    }
  ];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2">
          <span className="w-8 h-[1.5px] bg-[#A67C2E]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
            {language === 'hi' ? 'सत्र 2026–27 प्रवेश प्रक्रिया' : 'Admissions Open for Session 2026–27'}
          </span>
          <span className="w-8 h-[1.5px] bg-[#A67C2E]" />
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0F1D3A]">
          {language === 'hi' ? 'प्रवेश एवं पारदर्शी शुल्क विवरण' : 'Admissions & Fee Transparency'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-serif italic">
          Nursery to Class XII (MP Board Co-Educational English Medium) • 26:1 Student-Teacher Mentorship • Zero Hidden Charges.
        </p>
      </div>

      {/* Hero CTA Box */}
      <div className="bg-[#0F1D3A] text-white rounded-2xl p-8 sm:p-12 border border-[#A67C2E]/40 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6D5B8]">
            FAST TRACK DIGITAL PASS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Generate Your 2-Minute Provisional Inquiry Pass
          </h2>
          <p className="text-xs sm:text-sm text-stone-300">
            Skip admission queues. Generate an official provisional inquiry pass with unique barcode, send it directly to the school desk on WhatsApp, and schedule your campus visit.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenInquiry()}
          className="px-6 py-3.5 rounded-lg bg-[#B84A14] hover:bg-[#94380D] text-white text-xs uppercase font-bold tracking-wider flex items-center gap-2 shadow-sm shrink-0 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#F4E7CA]" />
          <span>Begin 2-Minute Inquiry Now</span>
        </button>
      </div>

      {/* Grade-wise Fee Structure Table */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
            APPROVED FINANCIAL SCHEDULE
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F1D3A]">
            Comprehensive Grade-Wise Fee Structure
          </h2>
          <p className="text-xs text-stone-500">
            In strict compliance with MP School Education Norms • Billed in 4 easy quarterly installments
          </p>
        </div>

        <div className="bg-white rounded-xl border border-hairline overflow-x-auto shadow-subtle">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F1D3A] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Grade Category</th>
                <th className="py-3.5 px-4">Quarterly Tuition</th>
                <th className="py-3.5 px-4">Annual Dev.</th>
                <th className="py-3.5 px-4">Smart/Lab Fee</th>
                <th className="py-3.5 px-4">Exam Fee (Yearly)</th>
                <th className="py-3.5 px-4">Key Inclusions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DBD0] text-stone-700">
              {FEE_SLABS.map((slab) => (
                <tr key={slab.tier} className="hover:bg-[#F9F6F0]/60 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-[#0F1D3A]">
                    {language === 'hi' ? slab.nameHi : slab.nameEn}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-[#A67C2E]">
                    ₹{slab.quarterlyTuition.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-4 font-mono">
                    ₹{slab.annualDevelopment.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-4 font-mono">
                    ₹{slab.labSmartFee.toLocaleString('en-IN')} / qtr
                  </td>
                  <td className="py-4 px-4 font-mono">
                    ₹{slab.examFeeAnnual.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-4 text-[11px] text-stone-500">
                    {language === 'hi' ? slab.featuresHi.join(', ') : slab.featuresEn.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Fee & Bus Calculator */}
      <section>
        <FeeEstimatorWidget onProceedToInquiry={(grade, loc) => onOpenInquiry(grade, loc)} />
      </section>

      {/* Mandatory Checklist for Parents */}
      <section className="bg-white rounded-2xl border border-hairline p-8 sm:p-10 shadow-subtle">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
            <FileCheck className="w-4 h-4" />
            <span>ADMISSION VERIFICATION CHECKLIST</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0F1D3A]">
            Documents Required at the Time of Admission
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-700">
            <div className="p-3 bg-[#F9F6F0] rounded border border-hairline flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Original Birth Certificate (Nursery to Class 1)</span>
            </div>
            <div className="p-3 bg-[#F9F6F0] rounded border border-hairline flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Original Transfer Certificate (TC) from prior school</span>
            </div>
            <div className="p-3 bg-[#F9F6F0] rounded border border-hairline flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Photocopy of Student and Parent Aadhar Cards</span>
            </div>
            <div className="p-3 bg-[#F9F6F0] rounded border border-hairline flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>4 Passport size color photographs of the student</span>
            </div>
            <div className="p-3 bg-[#F9F6F0] rounded border border-hairline flex items-center gap-2.5 sm:col-span-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Previous year's academic progress report card (Class 2 onwards)</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
            FREQUENT QUESTIONS
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1D3A]">
            Parent Queries Regarding Admissions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-hairline p-4 sm:p-5 shadow-subtle cursor-pointer"
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
            >
              <div className="flex items-center justify-between font-serif font-bold text-sm sm:text-base text-[#0F1D3A]">
                <span>{faq.q}</span>
                <span className="text-[#A67C2E] font-sans text-lg">{activeFaq === idx ? '−' : '+'}</span>
              </div>
              {activeFaq === idx && (
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-hairline pt-3 font-sans">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
