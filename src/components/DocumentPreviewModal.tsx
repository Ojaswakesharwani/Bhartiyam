import React, { useState } from 'react';
import { X, Printer, Download, Check, ShieldCheck, FileText, ExternalLink } from 'lucide-react';
import { SchoolCrest } from './SchoolCrest';
import { DisclosureDocument } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';

interface DocumentPreviewModalProps {
  document: DisclosureDocument | null;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  onClose,
}) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!document) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(document.refNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-3xl bg-[#F9F6F0] rounded-xl border border-hairline shadow-2xl overflow-hidden my-6">
        {/* Top Control Bar */}
        <div className="bg-[#0F1D3A] text-white p-4 px-6 flex items-center justify-between border-b border-[#A67C2E]/40">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#A67C2E]" />
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#E6D5B8]">
                Public Compliance Vault • Official Document Viewer
              </p>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white truncate max-w-lg">
                {language === 'hi' ? document.titleHi : document.titleEn}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4 text-[#A67C2E]" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Archival Certificate Paper Surface */}
        <div className="p-6 sm:p-10 max-h-[75vh] overflow-y-auto">
          <div className="bg-white border-2 border-[#A67C2E] p-6 sm:p-10 relative shadow-sm rounded-lg">
            {/* Corner Filigree Borders */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#A67C2E]" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#A67C2E]" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#A67C2E]" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#A67C2E]" />

            {/* Document Header */}
            <div className="text-center border-b-2 border-[#0F1D3A] pb-5 mb-6">
              <div className="flex justify-center mb-3">
                <SchoolCrest size={60} />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1D3A] uppercase tracking-wide">
                BHARTIYAM SCHOOL, BEOHARI
              </h2>
              <p className="text-xs uppercase tracking-widest font-semibold text-[#A67C2E] mt-0.5">
                Recognized by Madhya Pradesh Board of Secondary Education
              </p>
              <p className="text-[11px] text-stone-600 mt-1">
                Near Jai Stambh, Ward 7, Beohari, Dist. Shahdol (M.P.) • UDISE: 23160200703
              </p>
            </div>

            {/* Verification Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#F9F6F0] border border-hairline rounded text-[11px] mb-6">
              <div>
                <span className="block text-stone-400 font-bold uppercase text-[9px]">Ref / Order No.</span>
                <span className="font-mono font-bold text-[#0F1D3A]">{document.refNumber}</span>
              </div>
              <div>
                <span className="block text-stone-400 font-bold uppercase text-[9px]">Status</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 capitalize">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {document.status}
                </span>
              </div>
              <div>
                <span className="block text-stone-400 font-bold uppercase text-[9px]">Date of Record</span>
                <span className="text-[#0F1D3A]">{document.issueDate}</span>
              </div>
              <div>
                <span className="block text-stone-400 font-bold uppercase text-[9px]">Issuing Authority</span>
                <span className="text-[#0F1D3A] truncate">{document.issuer}</span>
              </div>
            </div>

            {/* Document Body */}
            <div className="prose max-w-none text-xs sm:text-sm text-stone-800 leading-relaxed font-serif whitespace-pre-line p-4 bg-[#FDFBF7] border border-[#E2DBD0] rounded">
              {document.fullBodyText}
            </div>

            {/* Signatures & Seal Area */}
            <div className="mt-8 pt-6 border-t border-[#E2DBD0] flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Seal */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full border-2 border-double border-[#A67C2E] flex flex-col items-center justify-center text-center p-1">
                  <ShieldCheck className="w-5 h-5 text-[#A67C2E]" />
                  <span className="text-[7px] uppercase font-bold text-[#0F1D3A]">VERIFIED RECORD</span>
                  <span className="text-[6px] text-stone-500">BHS SHAHDOL</span>
                </div>
                <div className="text-left text-xs">
                  <p className="font-bold text-[#0F1D3A]">Public Compliance Ledger</p>
                  <p className="text-[11px] text-stone-500">Digitally authenticated by School Registry</p>
                </div>
              </div>

              {/* Principal Signature */}
              <div className="text-center sm:text-right">
                <div className="font-serif italic text-base text-[#0F1D3A] font-semibold">
                  Parul Saxena
                </div>
                <div className="border-t border-stone-400 w-36 my-1 mx-auto sm:ml-auto" />
                <p className="text-xs font-bold text-[#0F1D3A]">Smt. Parul Saxena</p>
                <p className="text-[10px] text-stone-500">Principal & Head of Institution</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#F2EDE2] border-t border-hairline p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={handleCopyRef}
            className="text-stone-700 hover:text-[#0F1D3A] flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <FileText className="w-4 h-4 text-[#A67C2E]" />}
            <span>{copied ? 'Reference Copied!' : `Copy Ref: ${document.refNumber}`}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded bg-[#0F1D3A] hover:bg-[#1A2E56] text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-[#A67C2E]" />
              <span>Download Official Copy</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-hairline bg-white hover:bg-stone-50 text-stone-700 font-medium text-xs"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
