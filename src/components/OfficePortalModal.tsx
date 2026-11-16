import React, { useState } from 'react';
import {
  X,
  Lock,
  Users,
  Bell,
  UploadCloud,
  Phone,
  Calendar,
  CheckCircle2,
  Trash2,
  PlusCircle,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useOfficeData, AdmissionInquiry } from '../context/OfficeDataContext';
import { SchoolCrest } from './SchoolCrest';
import { useLanguage } from '../context/LanguageContext';

interface OfficePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficePortalModal: React.FC<OfficePortalModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const {
    inquiries,
    updateInquiryStatus,
    notices,
    addNotice,
    deleteNotice,
    disclosures,
    addDisclosure,
  } = useOfficeData();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'notices' | 'uploader'>('inquiries');
  const [inquirySearch, setInquirySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Notice Form State
  const [noticeTitleEn, setNoticeTitleEn] = useState('');
  const [noticeTitleHi, setNoticeTitleHi] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Admission' | 'Academic' | 'Holiday' | 'Examination' | 'Notice'>('Notice');
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  // Uploader Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'affiliation' | 'statutory' | 'academic' | 'compliance'>('affiliation');
  const [uploadRef, setUploadRef] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.studentName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.parentName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.id.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.locality.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitleEn.trim()) return;

    addNotice({
      titleEn: noticeTitleEn,
      titleHi: noticeTitleHi.trim() || noticeTitleEn,
      category: noticeCategory,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      urgent: noticeCategory === 'Holiday' || noticeCategory === 'Admission',
    });

    setNoticeTitleEn('');
    setNoticeTitleHi('');
    setNoticeSuccess(true);
    setTimeout(() => setNoticeSuccess(false), 3000);
  };

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    addDisclosure({
      titleEn: uploadTitle,
      titleHi: uploadTitle,
      category: uploadCategory,
      refNumber: uploadRef || `BHS/DOC/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      validThrough: 'Current Session',
      status: 'active',
      pages: 1,
      summaryEn: `Uploaded through Office Portal by School Clerk on ${new Date().toLocaleDateString()}.`,
      summaryHi: `विद्यालय कार्यालय द्वारा अपलोड किया गया आधिकारिक दस्तावेज।`,
      issuer: 'Bhartiyam School Office Registry',
      issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      fullBodyText: `BHARTIYAM SCHOOL, BEOHARI
OFFICE REGISTRY UPLOAD
Document: ${uploadTitle}
Date: ${new Date().toLocaleDateString()}
Status: Approved by Head of Institution Smt. Parul Saxena.`
    });

    setUploadTitle('');
    setUploadRef('');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl bg-[#F9F6F0] rounded-xl border border-hairline shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Management Header Bar */}
        <div className="bg-[#0F1D3A] text-white p-4 sm:p-5 border-b border-[#A67C2E]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <SchoolCrest size={42} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6D5B8]">
                  Management & Clerk Administrative Desk
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#A67C2E] text-white">
                  DEMO CONSOLE
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Bhartiyam School Office Portal</span>
                <span className="text-xs font-sans font-normal text-stone-300 hidden sm:inline">
                  — Smt. Parul Saxena & Administrative Staff
                </span>
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

        {/* Value Pitch Banner for Management */}
        <div className="bg-[#F2EDE2] border-b border-hairline px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#0F1D3A]">
            <Sparkles className="w-4 h-4 text-[#A67C2E] shrink-0" />
            <span className="font-medium">
              Effortless zero-agency school management: Update notices in 10 seconds, track incoming parent admissions, and maintain compliance records.
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-[#0F1D3A]">
            <span className="bg-white px-2 py-0.5 rounded border border-hairline">
              <strong>{inquiries.length}</strong> Total Inquiries
            </span>
            <span className="bg-white px-2 py-0.5 rounded border border-hairline">
              <strong>{notices.length}</strong> Live Notices
            </span>
          </div>
        </div>

        {/* 3 Nav Tabs */}
        <div className="bg-white border-b border-hairline px-4 sm:px-6 flex gap-2 sm:gap-4 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'border-[#0F1D3A] text-[#0F1D3A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4 text-[#A67C2E]" />
            <span>Tab 1: Live Admission Inquiries</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#0F1D3A] text-white">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'notices'
                ? 'border-[#0F1D3A] text-[#0F1D3A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Bell className="w-4 h-4 text-[#A67C2E]" />
            <span>Tab 2: 10-Second Notice Publisher</span>
          </button>

          <button
            onClick={() => setActiveTab('uploader')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'uploader'
                ? 'border-[#0F1D3A] text-[#0F1D3A]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-[#A67C2E]" />
            <span>Tab 3: One-Click Affiliation & Records Uploader</span>
          </button>
        </div>

        {/* TAB CONTENTS (SCROLLABLE) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#F9F6F0]">
          {/* TAB 1: LIVE ADMISSION INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-hairline">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by student, parent, locality..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-hairline focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-[11px] text-stone-500 font-medium">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-xs px-2.5 py-1.5 rounded border border-hairline bg-white focus:outline-none"
                  >
                    <option value="All">All Statuses ({inquiries.length})</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Campus Visit Scheduled">Visit Scheduled</option>
                    <option value="Enrolled">Enrolled</option>
                  </select>
                </div>
              </div>

              {/* Inquiries Table / Cards */}
              <div className="space-y-3">
                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-hairline text-stone-500 text-xs">
                    No inquiries found matching criteria.
                  </div>
                ) : (
                  filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-white p-4 rounded-lg border border-hairline shadow-subtle hover:border-[#A67C2E]/40 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold text-[#0F1D3A] bg-[#F2EDE2] px-2 py-0.5 rounded">
                            {inq.id}
                          </span>
                          <span className="font-serif font-bold text-sm text-[#0F1D3A]">
                            {inq.studentName}
                          </span>
                          <span className="text-xs text-[#A67C2E] font-semibold bg-[#E6D5B8]/30 px-2 py-0.5 rounded">
                            {inq.gradeSeeking}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-stone-400 font-mono">{inq.timestamp}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              inq.status === 'New'
                                ? 'bg-amber-100 text-amber-800'
                                : inq.status === 'Contacted'
                                ? 'bg-blue-100 text-blue-800'
                                : inq.status === 'Campus Visit Scheduled'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-700 mb-3">
                        <div>
                          <span className="text-stone-400 text-[10px] uppercase font-bold block">Parent / Phone</span>
                          <span className="font-medium text-[#0F1D3A]">{inq.parentName}</span>
                          <span className="block font-mono text-[11px] text-stone-600">{inq.parentPhone}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] uppercase font-bold block">Beohari Locality</span>
                          <span className="text-[#0F1D3A]">{inq.locality}</span>
                          <span className="block text-[10px] text-stone-500">
                            {inq.transportNeeded ? '🚌 Needs Bus' : '🚶 Self Transport'}
                            {inq.siblingEnrolled && ' • 👨‍👩‍👧 Sibling Concession'}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-400 text-[10px] uppercase font-bold block">Remarks / Notes</span>
                          <span className="text-stone-600 italic text-[11px] line-clamp-2">
                            {inq.notes || 'Direct web inquiry via admission wizard.'}
                          </span>
                        </div>
                      </div>

                      {/* Management Quick Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${inq.parentPhone}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0F1D3A] text-white text-[11px] font-semibold hover:bg-[#1A2E56] transition-colors"
                          >
                            <Phone className="w-3 h-3 text-[#A67C2E]" />
                            <span>Call Parent</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => updateInquiryStatus(inq.id, 'Campus Visit Scheduled')}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-hairline text-stone-700 text-[11px] hover:bg-stone-50"
                          >
                            <Calendar className="w-3 h-3 text-[#A67C2E]" />
                            <span>Schedule Campus Visit</span>
                          </button>
                        </div>

                        {/* Status Switcher Dropdown */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-stone-500 uppercase font-semibold">Change Status:</span>
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            className="text-[11px] py-1 px-2 rounded border border-hairline bg-stone-50 text-stone-800"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Campus Visit Scheduled">Campus Visit Scheduled</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: 10-SECOND NOTICE PUBLISHER */}
          {activeTab === 'notices' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Notice Publisher Form (Left 6 Cols) */}
              <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-hairline shadow-subtle">
                <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#A67C2E]" />
                    <h4 className="font-serif font-bold text-base text-[#0F1D3A]">
                      Publish New Live Notice
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#A67C2E]">Live Sync Active</span>
                </div>

                {noticeSuccess && (
                  <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Notice published! Check the live notice ticker on the website.</span>
                  </div>
                )}

                <form onSubmit={handlePublishNotice} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                      Notice Category *
                    </label>
                    <select
                      value={noticeCategory}
                      onChange={(e) => setNoticeCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                    >
                      <option value="Admission">Admission Alert</option>
                      <option value="Academic">Academic / Examination</option>
                      <option value="Holiday">School Holiday Notification</option>
                      <option value="Notice">General Parent Notice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                      Notice Headline (English) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Winter timings effective 1st December: 9:30 AM to 2:30 PM"
                      value={noticeTitleEn}
                      onChange={(e) => setNoticeTitleEn(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1 font-hindi">
                      Notice Headline in Hindi (हिंदी अनुवाद)
                    </label>
                    <input
                      type="text"
                      placeholder="उदा. शीतकालीन समय परिवर्तन: 1 दिसंबर से विद्यालय समय 9:30 से 2:30 रहेगा"
                      value={noticeTitleHi}
                      onChange={(e) => setNoticeTitleHi(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white font-hindi focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#0F1D3A] hover:bg-[#1A2E56] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <PlusCircle className="w-4 h-4 text-[#A67C2E]" />
                    <span>Publish to Live Website Notice Ticker</span>
                  </button>
                </form>
              </div>

              {/* Active Notices Manager (Right 6 Cols) */}
              <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-hairline shadow-subtle">
                <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                  <h4 className="font-serif font-bold text-base text-[#0F1D3A]">
                    Currently Live Notices ({notices.length})
                  </h4>
                  <span className="text-[10px] text-stone-500">Instant deletion allowed</span>
                </div>

                <div className="space-y-3 max-h-[360px] overflow-y-auto">
                  {notices.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 rounded-lg bg-[#F9F6F0] border border-hairline flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-[#0F1D3A] text-white">
                            {n.category}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500">{n.date}</span>
                        </div>
                        <p className="font-medium text-[#0F1D3A] truncate">{n.titleEn}</p>
                        <p className="font-hindi text-[11px] text-stone-600 truncate mt-0.5">{n.titleHi}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteNotice(n.id)}
                        className="p-1.5 rounded hover:bg-rose-100 text-stone-400 hover:text-rose-700 transition-colors shrink-0"
                        title="Delete notice"
                        aria-label="Delete notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ONE-CLICK AFFILIATION & RECORDS UPLOADER */}
          {activeTab === 'uploader' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Upload Form */}
              <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-hairline shadow-subtle">
                <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-[#A67C2E]" />
                    <h4 className="font-serif font-bold text-base text-[#0F1D3A]">
                      Upload Official Compliance PDF
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#A67C2E]">No IT Agency Needed</span>
                </div>

                {uploadSuccess && (
                  <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Certificate added to Public Disclosures Vault!</span>
                  </div>
                )}

                <form onSubmit={handleSimulatedUpload} className="space-y-4">
                  {/* Simulated Drag & Drop Zone */}
                  <div className="border-2 border-dashed border-[#A67C2E]/50 rounded-lg p-6 text-center hover:bg-[#F9F6F0] transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-[#A67C2E] mx-auto mb-2" />
                    <p className="text-xs font-semibold text-[#0F1D3A]">
                      Drag and drop MP Board order / Certificate PDF
                    </p>
                    <p className="text-[10px] text-stone-500 mt-1">
                      Supports PDF, PNG, JPG up to 15MB
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                      Document Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fire Safety & Building Structural Certificate 2026"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                        Category
                      </label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none"
                      >
                        <option value="affiliation">Affiliation Record</option>
                        <option value="statutory">Statutory & UDISE</option>
                        <option value="academic">Academic & Fees</option>
                        <option value="compliance">Safety Compliance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-1">
                        Order / Ref Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. MPBSE/2026/099"
                        value={uploadRef}
                        onChange={(e) => setUploadRef(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-hairline bg-white focus:outline-none"
                      >
                      </input>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#0F1D3A] hover:bg-[#1A2E56] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#A67C2E]" />
                    <span>Save & Publish to Public Disclosures Page</span>
                  </button>
                </form>
              </div>

              {/* Existing Disclosures Vault List */}
              <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-hairline shadow-subtle">
                <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                  <h4 className="font-serif font-bold text-base text-[#0F1D3A]">
                    Public Documents in Vault ({disclosures.length})
                  </h4>
                  <span className="text-[10px] text-stone-500">Live on /disclosures</span>
                </div>

                <div className="space-y-2.5 max-h-[380px] overflow-y-auto">
                  {disclosures.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-lg bg-[#F9F6F0] border border-hairline flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-bold text-[#0F1D3A] truncate">{doc.titleEn}</p>
                        <p className="text-[10px] font-mono text-stone-500">{doc.refNumber} • {doc.issuer}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 shrink-0">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
