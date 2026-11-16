import React, { useState } from 'react';
import { X, Briefcase, CheckCircle2, Send, GraduationCap, MapPin, Clock } from 'lucide-react';
import { FACULTY_OPENINGS } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';

interface CareerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJobId?: string;
}

export const CareerDrawer: React.FC<CareerDrawerProps> = ({
  isOpen,
  onClose,
  selectedJobId = 'job-1',
}) => {
  const { language } = useLanguage();
  const [jobId, setJobId] = useState(selectedJobId);
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentJob = FACULTY_OPENINGS.find((j) => j.id === jobId) || FACULTY_OPENINGS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl bg-[#F9F6F0] rounded-xl border border-hairline shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0F1D3A] text-white p-5 border-b border-[#A67C2E]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-[#A67C2E]" />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#E6D5B8]">
                Bhartiyam School Faculty Recruitment Desk
              </p>
              <h3 className="font-serif text-lg font-bold text-white">
                Academic Career Application
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#0F1D3A]">
                Application Received Successfully
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you for your interest in joining Bhartiyam School. The office of Principal Smt. Parul Saxena will review your credentials and contact you for an in-person interview in Beohari.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Position */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                  Select Teaching Opening *
                </label>
                <select
                  value={jobId}
                  onChange={(e) => setJobId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                >
                  {FACULTY_OPENINGS.map((job) => (
                    <option key={job.id} value={job.id}>
                      {language === 'hi' ? job.titleHi : job.titleEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Position Quick Highlights */}
              <div className="p-3 bg-white rounded border border-hairline text-xs space-y-1">
                <p className="font-bold text-[#0F1D3A]">{currentJob.department}</p>
                <p className="text-[11px] text-stone-600">
                  <strong>Required:</strong> {currentJob.qualification}
                </p>
                <div className="flex gap-4 text-[10px] text-stone-500 pt-1">
                  <span>📍 {currentJob.location}</span>
                  <span>⏱ {currentJob.experience}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smt. Ananya Dwivedi"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 94250 00000"
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. candidate@gmail.com"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                    Highest Educational Degree *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M.Sc. Math, B.Ed."
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                  Years of Teaching Experience & Prior Institution
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention previous teaching experience or fresher details..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded border border-hairline text-stone-700 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#0F1D3A] hover:bg-[#1A2E56] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-[#A67C2E]" />
                  <span>Submit Faculty Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
