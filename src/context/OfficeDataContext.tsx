import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_NOTICES, NoticeItem, DISCLOSURE_DOCUMENTS, DisclosureDocument } from '../data/schoolData';

export interface AdmissionInquiry {
  id: string;
  timestamp: string;
  studentName: string;
  gradeSeeking: string;
  dateOfBirth: string;
  parentName: string;
  parentPhone: string;
  locality: string;
  transportNeeded: boolean;
  siblingEnrolled: boolean;
  notes?: string;
  status: 'New' | 'Contacted' | 'Campus Visit Scheduled' | 'Enrolled' | 'Archived';
}

interface OfficeDataContextType {
  notices: NoticeItem[];
  addNotice: (notice: Omit<NoticeItem, 'id'>) => void;
  deleteNotice: (id: string) => void;
  inquiries: AdmissionInquiry[];
  addInquiry: (inquiry: Omit<AdmissionInquiry, 'id' | 'timestamp' | 'status'>) => AdmissionInquiry;
  updateInquiryStatus: (id: string, status: AdmissionInquiry['status']) => void;
  disclosures: DisclosureDocument[];
  addDisclosure: (doc: Omit<DisclosureDocument, 'id'>) => void;
}

const INITIAL_MOCK_INQUIRIES: AdmissionInquiry[] = [
  {
    id: 'BHS-2026-081',
    timestamp: 'Today, 10:15 AM',
    studentName: 'Aarav Sharma',
    gradeSeeking: 'Class 6',
    dateOfBirth: '2015-08-14',
    parentName: 'Vikram Sharma',
    parentPhone: '+91 98261 43210',
    locality: 'Station Road, Beohari',
    transportNeeded: true,
    siblingEnrolled: false,
    notes: 'Inquiring regarding science lab facilities and bus pickup timing.',
    status: 'New'
  },
  {
    id: 'BHS-2026-079',
    timestamp: 'Yesterday, 3:40 PM',
    studentName: 'Prisha Patel',
    gradeSeeking: 'Class 1',
    dateOfBirth: '2020-03-22',
    parentName: 'Dharmendra Patel',
    parentPhone: '+91 94243 89123',
    locality: 'Near Jai Stambh, Ward 7',
    transportNeeded: false,
    siblingEnrolled: true,
    notes: 'Elder brother in Class 5. Seeking sibling concession form.',
    status: 'Contacted'
  },
  {
    id: 'BHS-2026-074',
    timestamp: '14 Nov 2026',
    studentName: 'Shashank Mishra',
    gradeSeeking: 'Class 11 (Science)',
    dateOfBirth: '2010-11-05',
    parentName: 'Ramesh Mishra',
    parentPhone: '+91 99812 77654',
    locality: 'Bansagar Colony',
    transportNeeded: true,
    siblingEnrolled: false,
    notes: 'Aiming for MP Board merit with focus on engineering entrance.',
    status: 'Campus Visit Scheduled'
  }
];

const OfficeDataContext = createContext<OfficeDataContextType | null>(null);

export const OfficeDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    const saved = localStorage.getItem('bhartiyam_notices');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use default */ }
    }
    return INITIAL_NOTICES;
  });

  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>(() => {
    const saved = localStorage.getItem('bhartiyam_inquiries');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use default */ }
    }
    return INITIAL_MOCK_INQUIRIES;
  });

  const [disclosures, setDisclosures] = useState<DisclosureDocument[]>(() => {
    const saved = localStorage.getItem('bhartiyam_disclosures');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use default */ }
    }
    return DISCLOSURE_DOCUMENTS;
  });

  useEffect(() => {
    localStorage.setItem('bhartiyam_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('bhartiyam_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('bhartiyam_disclosures', JSON.stringify(disclosures));
  }, [disclosures]);

  const addNotice = (newNotice: Omit<NoticeItem, 'id'>) => {
    const created: NoticeItem = {
      ...newNotice,
      id: `notice-${Date.now()}`
    };
    setNotices(prev => [created, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const addInquiry = (inquiryData: Omit<AdmissionInquiry, 'id' | 'timestamp' | 'status'>): AdmissionInquiry => {
    const serial = Math.floor(84 + inquiries.length);
    const created: AdmissionInquiry = {
      ...inquiryData,
      id: `BHS-2026-${String(serial).padStart(3, '0')}`,
      timestamp: 'Just now',
      status: 'New'
    };
    setInquiries(prev => [created, ...prev]);
    return created;
  };

  const updateInquiryStatus = (id: string, status: AdmissionInquiry['status']) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  const addDisclosure = (docData: Omit<DisclosureDocument, 'id'>) => {
    const created: DisclosureDocument = {
      ...docData,
      id: `doc-${Date.now()}`
    };
    setDisclosures(prev => [created, ...prev]);
  };

  return (
    <OfficeDataContext.Provider value={{
      notices,
      addNotice,
      deleteNotice,
      inquiries,
      addInquiry,
      updateInquiryStatus,
      disclosures,
      addDisclosure
    }}>
      {children}
    </OfficeDataContext.Provider>
  );
};

export const useOfficeData = () => {
  const context = useContext(OfficeDataContext);
  if (!context) {
    throw new Error('useOfficeData must be used within OfficeDataProvider');
  }
  return context;
};
