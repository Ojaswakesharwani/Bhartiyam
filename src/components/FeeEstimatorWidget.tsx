import React, { useState } from 'react';
import { Calculator, CheckCircle2, ShieldCheck, Bus, GraduationCap, ArrowRight, Info } from 'lucide-react';
import { FEE_SLABS, BUS_LOCALITIES } from '../data/schoolData';
import { useLanguage } from '../context/LanguageContext';

interface FeeEstimatorProps {
  onProceedToInquiry?: (selectedGrade: string, locality: string) => void;
}

export const FeeEstimatorWidget: React.FC<FeeEstimatorProps> = ({ onProceedToInquiry }) => {
  const { language, t } = useLanguage();
  const [selectedSlabIndex, setSelectedSlabIndex] = useState(1); // Default Class 1-5
  const [selectedLocalityId, setSelectedLocalityId] = useState('loc-1');
  const [hasSibling, setHasSibling] = useState(false);
  const [needBus, setNeedBus] = useState(true);

  const currentSlab = FEE_SLABS[selectedSlabIndex];
  const currentLocality = BUS_LOCALITIES.find((l) => l.id === selectedLocalityId) || BUS_LOCALITIES[0];

  // Calculations
  const quarterlyTuition = currentSlab.quarterlyTuition;
  const quarterlyBus = needBus ? currentLocality.quarterly : 0;
  const siblingDiscount = hasSibling ? Math.round(quarterlyTuition * 0.10) : 0;
  const netQuarterly = quarterlyTuition - siblingDiscount + quarterlyBus;
  const annualTotalEstimate = (netQuarterly * 4) + currentSlab.annualDevelopment + currentSlab.examFeeAnnual + (currentSlab.labSmartFee * 4);

  return (
    <div className="bg-white rounded-xl border border-hairline shadow-elevated overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#0F1D3A] text-[#F9F6F0] p-6 sm:p-8 border-b border-[#A67C2E]/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6D5B8] font-semibold">
              <Calculator className="w-4 h-4 text-[#A67C2E]" />
              <span>{t('estimator_eyebrow')}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              {t('estimator_heading')}
            </h3>
            <p className="text-xs sm:text-sm text-[#E6D5B8]/80 mt-1.5 max-w-2xl">
              {t('estimator_sub')}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 bg-[#1A2E56] px-3.5 py-2 rounded-lg border border-[#A67C2E]/40">
            <ShieldCheck className="w-5 h-5 text-[#A67C2E]" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-[#E6D5B8]">MP School Fee Norms</p>
              <p className="text-xs text-white font-medium">100% Transparent Receipts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls Left, Summary Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
        {/* Left Column: Selections */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Grade Category Selector */}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-[#0F1D3A] mb-2.5">
              1. {language === 'hi' ? 'बच्चे की कक्षा का चयन करें' : 'Select Grade Category'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FEE_SLABS.map((slab, index) => (
                <button
                  key={slab.tier}
                  type="button"
                  onClick={() => setSelectedSlabIndex(index)}
                  className={`p-3.5 text-left rounded-lg border transition-all duration-200 ${
                    selectedSlabIndex === index
                      ? 'border-[#A67C2E] bg-[#F9F6F0] shadow-sm ring-1 ring-[#A67C2E]'
                      : 'border-hairline bg-white hover:bg-[#F2EDE2]/50'
                  }`}
                >
                  <p className="text-xs font-serif font-bold text-[#0F1D3A]">
                    {language === 'hi' ? slab.nameHi : slab.nameEn}
                  </p>
                  <p className="text-[11px] text-[#A67C2E] font-medium mt-0.5">
                    ₹{slab.quarterlyTuition.toLocaleString('en-IN')} / {language === 'hi' ? 'त्रैमासिक' : 'quarter'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. School Bus / Transport Requirement */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs uppercase font-bold tracking-wider text-[#0F1D3A] flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-[#A67C2E]" />
                <span>2. {language === 'hi' ? 'विद्यालय बस सुविधा' : 'School Bus / Transport Route'}</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F1D3A]">
                <input
                  type="checkbox"
                  checked={needBus}
                  onChange={(e) => setNeedBus(e.target.checked)}
                  className="rounded border-[#A67C2E] text-[#0F1D3A] focus:ring-[#A67C2E] h-4 w-4"
                />
                <span>{language === 'hi' ? 'बस सेवा चाहिए' : 'Required'}</span>
              </label>
            </div>

            {needBus ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BUS_LOCALITIES.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocalityId(loc.id)}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      selectedLocalityId === loc.id
                        ? 'border-[#A67C2E] bg-[#F9F6F0] ring-1 ring-[#A67C2E]'
                        : 'border-hairline bg-white hover:bg-[#F2EDE2]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#0F1D3A]">
                        {language === 'hi' ? loc.nameHi : loc.nameEn}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F2EDE2] text-[#0F1D3A]">
                        {loc.distance}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A67C2E] font-bold mt-1">
                      +₹{loc.quarterly.toLocaleString('en-IN')} / {language === 'hi' ? 'तिमाही' : 'quarter'}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-[#F9F6F0] border border-hairline rounded-lg text-xs text-[#0F1D3A]/70 flex items-center gap-2">
                <Info className="w-4 h-4 text-[#A67C2E] shrink-0" />
                <span>
                  {language === 'hi'
                    ? 'अभिभावक स्वयं अपने साधन से छात्र को विद्यालय लाएंगे। बस शुल्क शून्य रहेगा।'
                    : 'Parents arranging self-transport. Zero bus fee applied.'}
                </span>
              </div>
            )}
          </div>

          {/* 3. Sibling Concession */}
          <div className="p-3.5 rounded-lg bg-[#F9F6F0] border border-hairline flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-[#A67C2E]" />
              <div>
                <p className="text-xs font-bold text-[#0F1D3A]">
                  {language === 'hi' ? 'सहोदर (भाई/बहन) छूट' : 'Sibling Enrolled at Bhartiyam'}
                </p>
                <p className="text-[11px] text-[#0F1D3A]/70">
                  {language === 'hi'
                    ? 'दूसरे बच्चे के शिक्षण शुल्क पर 10% की स्थायी छूट प्रदान की जाती है।'
                    : '10% tuition concession for younger real brother/sister.'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hasSibling}
                onChange={(e) => setHasSibling(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0F1D3A]"></div>
            </label>
          </div>
        </div>

        {/* Right Column: Crystal-Clear Cost Ledger Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-[#F9F6F0] border border-[#E2DBD0] shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-[#E2DBD0] pb-3 mb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#A67C2E]">
                {language === 'hi' ? 'त्रैमासिक शुल्क गणना' : 'Quarterly Fee Ledger'}
              </span>
              <span className="text-[11px] font-mono text-[#0F1D3A]/70">
                Session 2026–27
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#E2DBD0]/50">
                <span className="text-[#0F1D3A]/80">{language === 'hi' ? 'शिक्षण शुल्क (तिमाही)' : 'Tuition Fee (Quarterly)'}</span>
                <span className="font-semibold text-[#0F1D3A]">₹{quarterlyTuition.toLocaleString('en-IN')}</span>
              </div>

              {hasSibling && (
                <div className="flex justify-between py-1 text-emerald-700 border-b border-[#E2DBD0]/50">
                  <span>{language === 'hi' ? 'सहोदर छूट (10%)' : 'Sibling Concession (10%)'}</span>
                  <span className="font-semibold">-₹{siblingDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-[#E2DBD0]/50">
                <span className="text-[#0F1D3A]/80">{language === 'hi' ? 'स्मार्ट क्लास व लैब' : 'Smart Class & Lab Maintenance'}</span>
                <span className="font-semibold text-[#0F1D3A]">₹{currentSlab.labSmartFee.toLocaleString('en-IN')}</span>
              </div>

              {needBus && (
                <div className="flex justify-between py-1 border-b border-[#E2DBD0]/50">
                  <span className="text-[#0F1D3A]/80">{language === 'hi' ? 'बस परिवहन (तिमाही)' : 'Bus Transport (Quarterly)'}</span>
                  <span className="font-semibold text-[#0F1D3A]">₹{quarterlyBus.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-2 flex justify-between items-baseline text-sm">
                <span className="font-serif font-bold text-[#0F1D3A]">
                  {language === 'hi' ? 'कुल देय त्रैमासिक राशि' : 'Estimated Quarterly Payable'}
                </span>
                <span className="font-serif text-2xl font-bold text-[#0F1D3A]">
                  ₹{(netQuarterly + currentSlab.labSmartFee).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Annual Extras Disclosure */}
            <div className="mt-5 p-3 rounded-lg bg-white border border-hairline text-[11px] text-[#0F1D3A]/80 space-y-1.5">
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'वार्षिक विकास शुल्क (वर्ष में 1 बार)' : 'Annual Development (Once a year)'}:</span>
                <span className="font-medium text-[#0F1D3A]">₹{currentSlab.annualDevelopment.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'वार्षिक परीक्षा शुल्क' : 'Annual Exam & Stationery'}:</span>
                <span className="font-medium text-[#0F1D3A]">₹{currentSlab.examFeeAnnual.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'hi' ? 'अनुमानित पाठ्यपुस्तकें' : 'Prescribed NCERT Books Est.'}:</span>
                <span className="font-medium text-[#0F1D3A]">₹{currentSlab.booksEstimate}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-[#E2DBD0]">
            <button
              type="button"
              onClick={() => onProceedToInquiry?.(currentSlab.tier, currentLocality.nameEn)}
              className="w-full py-3 px-4 rounded-lg bg-[#0F1D3A] hover:bg-[#1A2E56] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
            >
              <span>{language === 'hi' ? 'इस कक्षा हेतु प्रवेश फॉर्म भरें' : 'Inquire for this Grade'}</span>
              <ArrowRight className="w-4 h-4 text-[#A67C2E]" />
            </button>
            <p className="text-[10px] text-center text-[#0F1D3A]/60 mt-2">
              ✦ Zero admission lock charges • Official receipt provided for all installments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
