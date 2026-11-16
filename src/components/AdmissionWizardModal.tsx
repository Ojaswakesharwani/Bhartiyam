import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Printer, Phone, MessageSquare, Download, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SchoolCrest } from './SchoolCrest';
import { useLanguage } from '../context/LanguageContext';
import { useOfficeData, AdmissionInquiry } from '../context/OfficeDataContext';
import { SCHOOL_INFO } from '../data/schoolData';

interface AdmissionWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGrade?: string;
  initialLocality?: string;
}

export const AdmissionWizardModal: React.FC<AdmissionWizardModalProps> = ({
  isOpen,
  onClose,
  initialGrade = 'Class 1',
  initialLocality = 'Near Jai Stambh, Ward 7',
}) => {
  const { language } = useLanguage();
  const { addInquiry } = useOfficeData();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [studentName, setStudentName] = useState('');
  const [gradeSeeking, setGradeSeeking] = useState(initialGrade);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');

  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [locality, setLocality] = useState(initialLocality);

  const [transportNeeded, setTransportNeeded] = useState(true);
  const [siblingEnrolled, setSiblingEnrolled] = useState(false);
  const [notes, setNotes] = useState('');

  // Generated pass state
  const [generatedInquiry, setGeneratedInquiry] = useState<AdmissionInquiry | null>(null);

  if (!isOpen) return null;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !parentPhone.trim()) return;
    setCurrentStep(3);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addInquiry({
      studentName,
      gradeSeeking,
      dateOfBirth: dateOfBirth || '2018-05-10',
      parentName,
      parentPhone,
      locality,
      transportNeeded,
      siblingEnrolled,
      notes,
    });
    setGeneratedInquiry(created);
    setCurrentStep(4);

    // Fire golden celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A67C2E', '#0F1D3A', '#E6D5B8', '#B84A14'],
      });
    } catch (err) {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generateWhatsAppUrl = () => {
    if (!generatedInquiry) return `https://wa.me/${SCHOOL_INFO.whatsappNumber}`;
    const text = encodeURI(
      `Hello Bhartiyam School Beohari Office,\n\nI have generated a Provisional Admission Inquiry Pass for Session 2026–27:\n` +
      `• Pass No: ${generatedInquiry.id}\n` +
      `• Student: ${generatedInquiry.studentName}\n` +
      `• Grade Seeking: ${generatedInquiry.gradeSeeking}\n` +
      `• Parent: ${generatedInquiry.parentName} (${generatedInquiry.parentPhone})\n` +
      `• Locality: ${generatedInquiry.locality}\n` +
      `• Transport: ${generatedInquiry.transportNeeded ? 'Bus Required' : 'Self Arranged'}\n\n` +
      `Kindly guide us regarding campus counseling and document verification timings.`
    );
    return `https://wa.me/${SCHOOL_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-[#F9F6F0] rounded-xl border border-hairline shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#0F1D3A] text-white p-5 border-b border-[#A67C2E]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SchoolCrest size={40} />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#E6D5B8]">
                {language === 'hi' ? 'सत्र 2026–27 प्रवेश पूछताछ' : 'Session 2026–27 Admission Portal'}
              </p>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {currentStep === 4
                  ? (language === 'hi' ? 'अनंतिम प्रवेश पूछताछ पास' : 'Provisional Admission Inquiry Pass')
                  : (language === 'hi' ? '2-मिनट त्वरित प्रवेश आवेदन' : '2-Minute Fast Track Inquiry')}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator (Steps 1 to 3) */}
        {currentStep <= 3 && (
          <div className="px-6 pt-4 pb-2 bg-white border-b border-hairline">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === step
                        ? 'bg-[#0F1D3A] text-white ring-2 ring-[#A67C2E]'
                        : currentStep > step
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {currentStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  <span className="ml-2 text-xs font-medium text-[#0F1D3A] hidden sm:inline">
                    {step === 1
                      ? (language === 'hi' ? 'छात्र विवरण' : 'Student')
                      : step === 2
                      ? (language === 'hi' ? 'अभिभावक' : 'Parent')
                      : (language === 'hi' ? 'प्राथमिकताएं' : 'Logistics')}
                  </span>
                  {step < 3 && <div className="w-10 sm:w-16 h-0.5 bg-stone-200 mx-2" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FORM CONTENT */}
        <div className="p-6">
          {/* STEP 1: STUDENT DETAILS */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                  {language === 'hi' ? 'विद्यार्थी का पूरा नाम *' : 'Child\'s Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                    {language === 'hi' ? 'प्रवेश हेतु कक्षा *' : 'Grade Seeking Admission *'}
                  </label>
                  <select
                    value={gradeSeeking}
                    onChange={(e) => setGradeSeeking(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                  >
                    <option value="Nursery">Nursery (Age 3+)</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG / KG2</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9 (MPBSE)</option>
                    <option value="Class 10">Class 10 (Board)</option>
                    <option value="Class 11">Class 11 (Science / Commerce)</option>
                    <option value="Class 12">Class 12 (Board)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                    {language === 'hi' ? 'जन्म तिथि' : 'Date of Birth'}
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                  {language === 'hi' ? 'पूर्व विद्यालय (यदि लागू हो)' : 'Previous School Attended (If any)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Govt Primary School / Beohari Pre-school"
                  value={previousSchool}
                  onChange={(e) => setPreviousSchool(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F1D3A] hover:bg-[#1A2E56] text-white text-xs uppercase font-bold tracking-wider shadow-sm transition-all"
                >
                  <span>{language === 'hi' ? 'अगला: अभिभावक संपर्क →' : 'Next: Parent Details →'}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PARENT & LOCALITY DETAILS */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                  {language === 'hi' ? 'माता / पिता / अभिभावक का नाम *' : 'Parent / Guardian Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                    {language === 'hi' ? 'मोबाइल नंबर (10 अंक) *' : 'Mobile Number (10 Digits) *'}
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="e.g. 9425012345"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                    {language === 'hi' ? 'ब्यौहारी में निवास क्षेत्र *' : 'Beohari Ward / Locality *'}
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                  >
                    <option value="Near Jai Stambh, Ward 7">Near Jai Stambh, Ward 7</option>
                    <option value="Station Road / Bus Stand">Station Road / Bus Stand</option>
                    <option value="Bansagar Colony / Irrigation">Bansagar Colony / Irrigation</option>
                    <option value="Ward 1 to 5 (Old Town)">Ward 1 to 5 (Old Town)</option>
                    <option value="Paprehi Road">Paprehi Road</option>
                    <option value="Rewa Road & Outskirts">Rewa Road & Outskirts</option>
                    <option value="Nearby Shahdol Villages">Nearby Shahdol Villages</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0F1D3A] border border-hairline rounded-lg hover:bg-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F1D3A] hover:bg-[#1A2E56] text-white text-xs uppercase font-bold tracking-wider shadow-sm transition-all"
                >
                  <span>{language === 'hi' ? 'अगला: सुविधाएं एवं पुष्टि →' : 'Next: Preferences →'}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PREFERENCES & NOTES */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div className="p-4 rounded-lg bg-white border border-hairline space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-[#0F1D3A]">
                    {language === 'hi' ? 'क्या विद्यालय बस / वैन सेवा की आवश्यकता है?' : 'Do you require School Bus / Van Transport?'}
                  </span>
                  <input
                    type="checkbox"
                    checked={transportNeeded}
                    onChange={(e) => setTransportNeeded(e.target.checked)}
                    className="rounded text-[#0F1D3A] focus:ring-[#A67C2E] h-4 w-4"
                  />
                </label>

                <div className="border-t border-stone-200" />

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-semibold text-[#0F1D3A]">
                    {language === 'hi' ? 'क्या कोई सहोदर (भाई/बहन) पहले से भारतीयम में अध्ययनरत है?' : 'Is an elder sibling already enrolled at Bhartiyam?'}
                  </span>
                  <input
                    type="checkbox"
                    checked={siblingEnrolled}
                    onChange={(e) => setSiblingEnrolled(e.target.checked)}
                    className="rounded text-[#0F1D3A] focus:ring-[#A67C2E] h-4 w-4"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                  {language === 'hi' ? 'कोई विशेष प्रश्न या टिप्पणी' : 'Special Remarks or Questions for Principal'}
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Want counseling on science stream curriculum and laboratory schedules."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-hairline bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                />
              </div>

              <div className="p-3 bg-[#E6D5B8]/30 border border-[#A67C2E]/30 rounded-lg text-xs text-[#0F1D3A]">
                <p className="font-semibold text-[#A67C2E]">
                  ✦ {language === 'hi' ? 'पारदर्शी एवं निःशुल्क पंजीकरण' : 'Official Zero-Cost Verification'}
                </p>
                <p className="mt-0.5 text-[11px] text-[#0F1D3A]/80">
                  {language === 'hi'
                    ? 'यह पास प्रस्तुत करने पर विद्यालय कार्यालय में प्राथमिकता के साथ परामर्श और प्रवेश सहायता दी जाएगी।'
                    : 'Presenting this pass at the Bhartiyam campus guarantees prioritized counseling by Smt. Parul Saxena\'s office.'}
                </p>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0F1D3A] border border-hairline rounded-lg hover:bg-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#B84A14] hover:bg-[#94380D] text-white text-xs uppercase font-bold tracking-wider shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#F4E7CA]" />
                  <span>{language === 'hi' ? 'पास उत्पन्न करें एवं जमा करें' : 'Generate Official Inquiry Pass'}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: BESPOKE PROVISIONAL INQUIRY PASS (BHS-2026-084) */}
          {currentStep === 4 && generatedInquiry && (
            <div className="space-y-6">
              {/* PRINTABLE PASS CARD */}
              <div
                id="printable-inquiry-pass"
                className="bg-white border-2 border-[#A67C2E] rounded-xl p-6 relative overflow-hidden shadow-elevated"
              >
                {/* Watermark Crest Background */}
                <div className="absolute right-2 -bottom-6 opacity-5 pointer-events-none">
                  <SchoolCrest size={240} />
                </div>

                {/* Pass Header */}
                <div className="flex items-center justify-between border-b border-[#E2DBD0] pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <SchoolCrest size={44} />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#0F1D3A]">
                        BHARTIYAM SCHOOL, BEOHARI
                      </h4>
                      <p className="text-[10px] text-[#A67C2E] uppercase font-semibold tracking-wider">
                        MP Board Recognized • UDISE: 23160200703
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded bg-[#0F1D3A] text-white text-[11px] font-mono font-bold">
                      {generatedInquiry.id}
                    </span>
                    <p className="text-[10px] text-stone-500 mt-0.5">Session 2026–2027</p>
                  </div>
                </div>

                {/* Candidate & Parent Information Ledger */}
                <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400">Student Candidate</span>
                    <p className="text-sm font-serif font-bold text-[#0F1D3A]">{generatedInquiry.studentName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400">Grade Applied</span>
                    <p className="text-sm font-serif font-bold text-[#A67C2E]">{generatedInquiry.gradeSeeking}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400">Parent / Guardian</span>
                    <p className="text-xs font-semibold text-[#0F1D3A]">{generatedInquiry.parentName}</p>
                    <p className="text-[11px] text-stone-600">{generatedInquiry.parentPhone}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400">Beohari Ward / Locality</span>
                    <p className="text-xs font-semibold text-[#0F1D3A]">{generatedInquiry.locality}</p>
                    <p className="text-[10px] text-stone-500">
                      Transport: {generatedInquiry.transportNeeded ? 'School Bus Requested' : 'Self Arranged'}
                    </p>
                  </div>
                </div>

                {/* Security Verification Barcode & Seal */}
                <div className="border-t border-[#E2DBD0] pt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    {/* Simulated Authentic Barcode Lines */}
                    <div className="flex items-center gap-[2px] h-7">
                      {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 4].map((w, idx) => (
                        <span
                          key={idx}
                          className="bg-[#0F1D3A] h-full"
                          style={{ width: `${w}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-stone-500 mt-1">
                      * {generatedInquiry.id} * VERIFIED
                    </span>
                  </div>

                  {/* Stamp Seal */}
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#A67C2E] p-1 flex flex-col items-center justify-center text-center transform rotate-[-6deg]">
                    <span className="text-[7px] uppercase font-bold text-[#A67C2E]">OFFICE DESK</span>
                    <span className="text-[8px] font-bold text-[#0F1D3A]">BHS 2026</span>
                    <span className="text-[6px] text-stone-500">PARUL SAXENA</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS ROW */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Send on WhatsApp Button */}
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send on WhatsApp to School Office (+91 94250 90591)</span>
                </a>

                {/* Print Pass Button */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto py-3 px-5 rounded-lg bg-[#0F1D3A] hover:bg-[#1A2E56] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4 text-[#A67C2E]" />
                  <span>Print Pass</span>
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#0F1D3A]/70 hover:text-[#0F1D3A] underline"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
