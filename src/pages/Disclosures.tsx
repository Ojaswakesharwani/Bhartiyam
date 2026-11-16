import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, Eye, ExternalLink, Calendar, Search } from 'lucide-react';
import { useOfficeData } from '../context/OfficeDataContext';
import { useLanguage } from '../context/LanguageContext';
import { DisclosureDocument } from '../data/schoolData';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';

export const Disclosures: React.FC = () => {
  const { disclosures } = useOfficeData();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDoc, setActiveDoc] = useState<DisclosureDocument | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = disclosures.filter((doc) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      doc.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.refNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#A67C2E]" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#A67C2E]">
            {language === 'hi' ? 'सार्वजनिक वैधानिक प्रकटीकरण' : 'Official Regulatory Disclosures & Compliance Vault'}
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0F1D3A]">
          {language === 'hi' ? 'शासकीय मान्यता एवं सम्बद्धता अभिलेख' : 'Public Compliance & Affiliation Ledger'}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-serif italic">
          Mandatory statutory records under the Madhya Pradesh Board of Secondary Education (MPBSE) and Right to Education provisions. Authenticated for parents, inspection authorities, and civic bodies.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-hairline shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Documents' },
            { id: 'affiliation', label: 'MPBSE Affiliations' },
            { id: 'statutory', label: 'UDISE & Trust' },
            { id: 'academic', label: 'Academic & Fee Norms' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0F1D3A] text-white shadow-sm'
                  : 'bg-[#F9F6F0] text-stone-700 hover:bg-[#F2EDE2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search by order number or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-1.5 text-xs rounded-lg border border-hairline bg-[#F9F6F0] focus:outline-none focus:ring-1 focus:ring-[#A67C2E]"
          />
        </div>
      </div>

      {/* Disclosures Ledger Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-hairline p-6 shadow-subtle hover:border-[#A67C2E] transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              {/* Status and Category Pill */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-[#A67C2E] bg-[#E6D5B8]/30 px-2 py-0.5 rounded">
                  {doc.category}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    doc.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : doc.status === 'permanent'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg font-bold text-[#0F1D3A] leading-snug group-hover:text-[#A67C2E] transition-colors">
                {language === 'hi' ? doc.titleHi : doc.titleEn}
              </h3>

              {/* Summary */}
              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                {language === 'hi' ? doc.summaryHi : doc.summaryEn}
              </p>

              {/* Metadata */}
              <div className="pt-3 border-t border-hairline space-y-1 text-[11px] text-stone-500 font-mono">
                <div className="flex justify-between">
                  <span>Ref:</span>
                  <span className="font-semibold text-stone-800 truncate max-w-[180px]">{doc.refNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Authority:</span>
                  <span className="truncate max-w-[180px] text-stone-800">{doc.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valid Through:</span>
                  <span className="text-stone-800">{doc.validThrough}</span>
                </div>
              </div>
            </div>

            {/* View / Download Action */}
            <div className="pt-5 border-t border-hairline mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveDoc(doc)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F1D3A] hover:text-[#A67C2E] transition-colors"
              >
                <Eye className="w-4 h-4 text-[#A67C2E]" />
                <span>Inspect Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDoc(doc)}
                className="p-1.5 rounded-lg border border-hairline hover:bg-[#F2EDE2] text-stone-600 transition-colors"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        document={activeDoc}
        onClose={() => setActiveDoc(null)}
      />
    </div>
  );
};
