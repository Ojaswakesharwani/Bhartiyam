export interface SchoolPillar {
  id: number;
  roman: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  accent: string;
  keywords: string[];
}

export interface DisclosureDocument {
  id: string;
  titleEn: string;
  titleHi: string;
  category: 'affiliation' | 'statutory' | 'academic' | 'compliance';
  refNumber: string;
  validThrough: string;
  status: 'active' | 'archived' | 'permanent';
  pages: number;
  summaryEn: string;
  summaryHi: string;
  issuer: string;
  issueDate: string;
  fullBodyText: string;
}

export interface NoticeItem {
  id: string;
  titleEn: string;
  titleHi: string;
  date: string;
  category: 'Admission' | 'Academic' | 'Holiday' | 'Examination' | 'Notice';
  urgent?: boolean;
}

export const SCHOOL_INFO = {
  nameEn: "Pvt. Bhartiyam School, Beohari",
  nameHi: "भारतीयम स्कूल, ब्यौहारी",
  established: 2005,
  yearsOfExcellence: "20+",
  udiseCode: "23160200703",
  board: "Madhya Pradesh Board of Secondary Education (MPBSE)",
  medium: "Co-Educational English Medium",
  principal: "Smt. Parul Saxena",
  addressEn: "Near Jai Stambh, Ward No. 7, Beohari, District Shahdol, Madhya Pradesh – 484774",
  addressHi: "जय स्तंभ के पास, वार्ड नं. 7, ब्यौहारी, जिला शहडोल, मध्य प्रदेश – 484774",
  phonePrimary: "+91 94250 90591",
  phoneLandline: "07650-262231",
  email: "bhartiyam@info.com",
  timingsEn: "Monday to Saturday: 9:00 AM – 2:00 PM",
  timingsHi: "सोमवार से शनिवार: प्रातः 9:00 से दोपहर 2:00 बजे",
  googleMapsUrl: "https://maps.google.com/?q=Bhartiyam+School+Near+Jai+Stambh+Beohari+Shahdol+Madhya+Pradesh+484774",
  whatsappNumber: "919425090591",
};

export const PILLARS: SchoolPillar[] = [
  {
    id: 1,
    roman: "I",
    titleEn: "Academic Rigor",
    titleHi: "शैक्षणिक उत्कृष्टता",
    descEn: "MPBSE curriculum delivered with an intimate 26:1 personal mentorship ratio and 10-minute early Pre-Classes ensuring no child is left behind.",
    descHi: "म.प्र. बोर्ड के पाठ्यक्रम के साथ 26:1 व्यक्तिगत शिक्षक अनुपात और 10-मिनट पूर्व दैनिक तैयारी, ताकि हर विद्यार्थी को उत्कृष्ट परिणाम मिले।",
    accent: "#A67C2E",
    keywords: ["MPBSE Curriculum", "26:1 Ratio", "Pre-Class Alignment", "Board Merit"]
  },
  {
    id: 2,
    roman: "II",
    titleEn: "Smart Classrooms",
    titleHi: "डिजिटल एवं स्मार्ट कक्षाएँ",
    descEn: "Interactive digital touch boards, physics/chemistry/biology apparatus, and high-speed computer labs for experiential learning.",
    descHi: "इंटरैक्टिव डिजिटल बोर्ड, विज्ञान प्रयोगशालाएं और अत्याधुनिक कंप्यूटर लैब जो विद्यार्थियों को व्यवहारिक ज्ञान प्रदान करती हैं।",
    accent: "#0F1D3A",
    keywords: ["Smart Displays", "Physics/Chem Labs", "Digital Workstations", "Audio-Visual"]
  },
  {
    id: 3,
    roman: "III",
    titleEn: "Sports & Discipline",
    titleHi: "खेलकूद एवं अनुशासित दिनचर्या",
    descEn: "Structured physical education, daily morning assemblies, drill routines, and competitive athletics cultivating resilience and teamwork.",
    descHi: "नियमित खेलकूद, प्रेरक प्रातःकालीन सभा, पी.टी. अभ्यास और खेल प्रतियोगिताएं जो छात्रों में अनुशासन व आत्मविश्वास भरती हैं।",
    accent: "#B84A14",
    keywords: ["Physical Education", "Morning Drills", "Athletics Meet", "Character Building"]
  },
  {
    id: 4,
    roman: "IV",
    titleEn: "Sanskar & Seva",
    titleHi: "भारतीय संस्कार एवं सामाजिक सेवा",
    descEn: "Value-driven upbringing, cultural festivals, tree plantation drives, and compassionate community service across Beohari and Shahdol.",
    descHi: "सदाचार, नैतिक मूल्य, वृक्षारोपण एवं सांस्कृतिक कार्यक्रमों के माध्यम से भारतीय संस्कारों और समाज सेवा के प्रति समर्पण।",
    accent: "#86611F",
    keywords: ["Vedic Values", "Community Seva", "Eco Drives", "Respect for Elders"]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rahul",
    roleEn: "Alumni (Batch 2021) • Engineering Undergrad",
    roleHi: "पूर्व छात्र (बैच 2021) • इंजीनियरिंग स्नातक",
    quoteEn: "Our teachers at Bhartiyam gladly gave extra time outside class hours until every single student understood the concept thoroughly. That personal warmth shaped my entire higher education journey.",
    quoteHi: "भारतीयम में हमारे शिक्षक कक्षा समाप्त होने के बाद भी तब तक अतिरिक्त समय देते थे जब तक प्रत्येक विद्यार्थी विषय को पूरी तरह समझ न ले। उसी अपनेपन ने मुझे आगे बढ़ाया।",
    avatarInitial: "R",
    year: "Alumni"
  },
  {
    id: 2,
    name: "Rohit",
    roleEn: "Alumni (Batch 2019) • State Competitive Exam Aspirant",
    roleHi: "पूर्व छात्र (बैच 2019) • राज्य प्रतियोगी परीक्षा अभ्यर्थी",
    quoteEn: "A rare balance of warmth and discipline that prepares students from Beohari to compete confidently at top universities across Madhya Pradesh and India.",
    quoteHi: "स्नेह और कड़े अनुशासन का एक दुर्लभ संगम जो ब्यौहारी जैसे छोटे कस्बे के बच्चों को भी देश के बड़े विश्वविद्यालयों में आत्मविश्वास से प्रतिस्पर्धा करने योग्य बनाता है।",
    avatarInitial: "R",
    year: "Alumni"
  },
  {
    id: 3,
    name: "Mansi Sharma & Mayur Bhatt",
    roleEn: "Parents of Class 4 & Class 8 Students",
    roleHi: "कक्षा 4 व 8 के विद्यार्थियों के अभिभावक",
    quoteEn: "Consistent focus on holistic personality, public speaking, and moral values alongside stellar board exam results. We never have to worry about tuition outside school.",
    quoteHi: "बोर्ड परीक्षा के बेहतरीन परिणामों के साथ-साथ व्यक्तित्व विकास, वाद-विवाद और नैतिक संस्कारों पर निरंतर ध्यान। हमें कभी स्कूल के बाहर ट्यूशन की आवश्यकता नहीं पड़ी।",
    avatarInitial: "M",
    year: "Parents"
  }
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'n-1',
    titleEn: "Admissions Open for Session 2026–27 (Nursery to Class XII) — Limited Seats Available",
    titleHi: "सत्र 2026–27 हेतु प्रवेश प्रारंभ (नर्सरी से 12वीं तक) — सीमित सीटें उपलब्ध",
    date: "15 Nov 2026",
    category: "Admission",
    urgent: true
  },
  {
    id: 'n-2',
    titleEn: "MP Board Class 10th & 12th Intensive Preparation Camp starts 1st December 2026",
    titleHi: "म.प्र. बोर्ड 10वीं एवं 12वीं सघन परीक्षा पूर्व तैयारी शिविर 1 दिसंबर 2026 से प्रारंभ",
    date: "12 Nov 2026",
    category: "Academic"
  },
  {
    id: 'n-3',
    titleEn: "Annual Inter-House Science & Robotics Exhibition scheduled for 18th December 2026",
    titleHi: "वार्षिक अंतर-सदनीय विज्ञान एवं रोबोटिक्स प्रदर्शनी 18 दिसंबर 2026 को आयोजित होगी",
    date: "08 Nov 2026",
    category: "Academic"
  },
  {
    id: 'n-4',
    titleEn: "Parent-Teacher Review Meeting (PTM) for Term II progress on Saturday, 28th November",
    titleHi: "द्वितीय सत्र समीक्षा हेतु अभिभावक-शिक्षक बैठक (PTM) शनिवार, 28 नवंबर को",
    date: "02 Nov 2026",
    category: "Notice"
  }
];

export const FEE_SLABS = [
  {
    tier: "Foundational (Nursery, LKG, UKG)",
    nameEn: "Pre-Primary Wing (Nursery – KG2)",
    nameHi: "पूर्व-प्राथमिक खंड (नर्सरी – के.जी. 2)",
    quarterlyTuition: 3600,
    annualDevelopment: 1800,
    labSmartFee: 600,
    examFeeAnnual: 800,
    booksEstimate: "1,200 – 1,500",
    featuresEn: ["Montessori activity kit", "Story sessions", "Foundational phonics & numeracy", "Nutritious drinking water"],
    featuresHi: ["मॉन्टेसरी खिलौना किट", "रोचक कहानियाँ", "ध्वनि व अंक ज्ञान", "शुद्ध पेयजल व्यवस्था"]
  },
  {
    tier: "Primary (Classes 1 to 5)",
    nameEn: "Primary Wing (Class 1 – 5)",
    nameHi: "प्राथमिक खंड (कक्षा 1 – 5)",
    quarterlyTuition: 4500,
    annualDevelopment: 2200,
    labSmartFee: 900,
    examFeeAnnual: 1000,
    booksEstimate: "1,800 – 2,200",
    featuresEn: ["Smart board curriculum", "Language laboratory", "Weekly computer hands-on", "Spoken English drill"],
    featuresHi: ["स्मार्ट बोर्ड पाठ्यक्रम", "भाषा प्रयोगशाला", "साप्ताहिक कंप्यूटर अभ्यास", "अंग्रेजी वार्तालाप"]
  },
  {
    tier: "Middle (Classes 6 to 8)",
    nameEn: "Middle School (Class 6 – 8)",
    nameHi: "माध्यमिक खंड (कक्षा 6 – 8)",
    quarterlyTuition: 5400,
    annualDevelopment: 2500,
    labSmartFee: 1200,
    examFeeAnnual: 1200,
    booksEstimate: "2,400 – 2,800",
    featuresEn: ["Physics & Chem practicals", "Math laboratory kits", "Competitive Olympiad training", "Sports coaching"],
    featuresHi: ["भौतिकी व रसायन प्रयोग", "गणित प्रयोगशाला किट", "ओलंपियाड तैयारी", "विशेष खेल प्रशिक्षण"]
  },
  {
    tier: "Secondary & Senior Secondary (Classes 9 to 12)",
    nameEn: "Senior School (Class 9 – 12 MPBSE)",
    nameHi: "उच्चतर माध्यमिक खंड (कक्षा 9 – 12 म.प्र. बोर्ड)",
    quarterlyTuition: 6900,
    annualDevelopment: 3000,
    labSmartFee: 1800,
    examFeeAnnual: 1500,
    booksEstimate: "2,800 – 3,500",
    featuresEn: ["Dedicated Board mentorship", "Full science laboratory work", "Doubt-clearing pre-classes", "Career & CUET/JEE guidance"],
    featuresHi: ["बोर्ड परीक्षा हेतु समर्पित मेंटरशिप", "पूर्ण विज्ञान प्रयोगशाला", "शंका समाधान सत्र", "कॅरियर व प्रतियोगी मार्गदर्शन"]
  }
];

export const BUS_LOCALITIES = [
  { id: 'loc-1', nameEn: "Jai Stambh / Ward 7 & Town Heart", nameHi: "जय स्तंभ / वार्ड 7 एवं नगर क्षेत्र", quarterly: 1200, distance: "< 2 km" },
  { id: 'loc-2', nameEn: "Station Road & Beohari Bus Stand", nameHi: "स्टेशन रोड एवं ब्यौहारी बस स्टैंड", quarterly: 1500, distance: "2 – 4 km" },
  { id: 'loc-3', nameEn: "Bansagar Colony & Irrigation Colony", nameHi: "बाणसागर कॉलोनी एवं सिंचाई कॉलोनी", quarterly: 1800, distance: "4 – 7 km" },
  { id: 'loc-4', nameEn: "Paprehi, Rewa Road & Outlying Villages", nameHi: "पपरेही, रीवा रोड एवं निकटवर्ती ग्राम", quarterly: 2400, distance: "7 – 12 km" }
];

export const DISCLOSURE_DOCUMENTS: DisclosureDocument[] = [
  {
    id: "mpbse-cert-2025-26",
    titleEn: "MP Board Affiliation Certificate (2025–26)",
    titleHi: "मध्य प्रदेश माध्यमिक शिक्षा मंडल सम्बद्धता प्रमाण पत्र (2025–26)",
    category: "affiliation",
    refNumber: "MPBSE/AFF/SHAHDOL/2025/084",
    validThrough: "31 March 2027",
    status: "active",
    pages: 3,
    summaryEn: "Official renewal of institutional recognition granted by MPBSE Bhopal for Co-Educational English Medium up to Senior Secondary.",
    summaryHi: "माध्यमिक शिक्षा मंडल भोपाल द्वारा उच्चतर माध्यमिक स्तर तक अंग्रेजी माध्यम हेतु नवीनीकृत मान्यता प्रमाण पत्र।",
    issuer: "Board of Secondary Education, Madhya Pradesh (Bhopal)",
    issueDate: "12 May 2025",
    fullBodyText: `MADHYA PRADESH BOARD OF SECONDARY EDUCATION, BHOPAL
RECOGNITION & AFFILIATION ORDER
Order No: MPBSE/AFF/SHAHDOL/2025/084
Date of Issue: 12th May 2025

This is to certify that:
INSTITUTION NAME: PVT. BHARTIYAM SCHOOL
CAMPUS LOCATION: Near Jai Stambh, Ward No. 7, Beohari, District Shahdol, Madhya Pradesh - 484774
UDISE CODE: 23160200703
MANAGEMENT: Bhartiyam Shiksha & Samajik Kalyan Samiti

Has fulfilled the prescribed infrastructural, academic, teacher qualification, and safety standards mandated under the MP Madhyamik Shiksha Adhiniyam.

The institution is granted renewed recognition as a recognized English-Medium Co-Educational institution for the academic sessions 2025-2026 and 2026-2027.

Principal Smt. Parul Saxena is recognized as Head of Institution.
Authorized Signature: Secretary, MPBSE Bhopal.`
  },
  {
    id: "mpbse-cert-2024-25",
    titleEn: "Historical Affiliation Record (2024–25)",
    titleHi: "पूर्व सम्बद्धता अभिलेख (2024–25)",
    category: "affiliation",
    refNumber: "MPBSE/AFF/SHAHDOL/2024/072",
    validThrough: "31 March 2025",
    status: "archived",
    pages: 2,
    summaryEn: "Historical compliance and inspection verification record for the 2024–2025 academic session.",
    summaryHi: "सत्र 2024–2025 हेतु निरीक्षण एवं वैधानिक मान्यता का अभिलेख।",
    issuer: "District Education Officer, Shahdol Division",
    issueDate: "14 April 2024",
    fullBodyText: `OFFICE OF THE DISTRICT EDUCATION OFFICER, SHAHDOL (M.P.)
ANNUAL INSPECTION AND COMPLIANCE AUDIT
Ref: DEO/SHD/INSP/2024/072

Institution: Pvt. Bhartiyam School, Beohari
UDISE: 23160200703

Summary: On-site verification conducted on 4th April 2024 verified adequate teacher ratio, smart classroom infrastructure, clean drinking water, and fire safety systems. Institution cleared for continuous operations without reservation.`
  },
  {
    id: "udise-trust-pan",
    titleEn: "UDISE+ & Society Trust Registration (23160200703)",
    titleHi: "UDISE+ एवं सोसायटी ट्रस्ट पंजीयन (23160200703)",
    category: "statutory",
    refNumber: "UDISE-23160200703-REG",
    validThrough: "Permanent Institutional Record",
    status: "permanent",
    pages: 4,
    summaryEn: "Ministry of Education National UDISE+ database entry, Trust Deed, and Society PAN registration records.",
    summaryHi: "शिक्षा मंत्रालय के राष्ट्रीय UDISE+ डेटाबेस, ट्रस्ट डीड एवं सोसायटी आयकर पैन पंजीयन विवरण।",
    issuer: "Ministry of Education, Govt. of India & Registrar of Societies MP",
    issueDate: "Registered 2005 (Updated 2026)",
    fullBodyText: `GOVERNMENT OF INDIA & GOVT OF MADHYA PRADESH
UNIFIED DISTRICT INFORMATION SYSTEM FOR EDUCATION (UDISE+)
INSTITUTION CODE: 23160200703
SCHOOL NAME: BHARTIYAM SCHOOL
VILLAGE/TOWN: BEOHARI (WARD 07)
BLOCK: BEOHARI
DISTRICT: SHAHDOL (MADHYA PRADESH)
PIN: 484774
SCHOOL CATEGORY: Primary with Upper Primary, Secondary & Higher Secondary
MANAGEMENT: Registered Educational Trust
ESTABLISHED YEAR: 2005
STATUS: Active and Verified on State & Central Portal.`
  },
  {
    id: "academic-calendar-2026-27",
    titleEn: "Academic Calendar & Planner (Session 2026–27)",
    titleHi: "शैक्षणिक कैलेंडर एवं वार्षिक योजना (सत्र 2026–27)",
    category: "academic",
    refNumber: "BHS/ACAD/PLAN/2026-27",
    validThrough: "April 2027",
    status: "active",
    pages: 6,
    summaryEn: "Quarterly examination schedules, sports week, celebration of Indian festivals, science exhibition, and parent-teacher consultations.",
    summaryHi: "त्रैमासिक परीक्षा कार्यक्रम, खेल सप्ताह, राष्ट्रीय व सांस्कृतिक पर्व, विज्ञान मेला और अभिभावक परामर्श दिवस।",
    issuer: "Academic Council, Bhartiyam School, Beohari",
    issueDate: "01 November 2026",
    fullBodyText: `BHARTIYAM SCHOOL, BEOHARI (SHAHDOL M.P.)
ANNUAL ACADEMIC CALENDAR : SESSION 2026-2027
Approved by Principal Smt. Parul Saxena

Term 1: April 2026 – September 2026
- Periodic Test 1: July 3rd Week
- Mid-Term Examinations: September 2nd Week
- Independence Day & Sanskar Week: August 10-15

Term 2: October 2026 – March 2027
- Annual Sports Meet & PT Drill: December 1st Week
- Science & Arts Exhibition: December 3rd Week
- MP Board Pre-Board Examination: January 2nd Week
- Final Annual Assessments: March 1st Week
- Total Instructional Days: 224 Days.`
  },
  {
    id: "fee-prescribed-books",
    titleEn: "Approved Fee Structure & Prescribed Book List",
    titleHi: "अनुमोदित शुल्क संरचना एवं अधिकृत पाठ्यपुस्तक सूची",
    category: "academic",
    refNumber: "BHS/FEE-BOOKS/2026",
    validThrough: "31 March 2027",
    status: "active",
    pages: 5,
    summaryEn: "Itemized fee notification in strict adherence to MP School Education Fee Regulation Act, with NCERT & MPBSE authorized books.",
    summaryHi: "म.प्र. विद्यालय शुल्क विनियमन अधिनियम के अनुरूप पारदर्शी शुल्क और एनसीईआरटी / म.प्र. बोर्ड अनुमोदित पुस्तकों की अधिकृत सूची।",
    issuer: "School Management Committee (SMC)",
    issueDate: "20 October 2026",
    fullBodyText: `BHARTIYAM SCHOOL, BEOHARI
PUBLIC DISCLOSURE UNDER MP EDUCATION NORMS
SCHEDULE OF FEES & PRESCRIBED TEXTBOOKS : 2026-27

1. Strictly zero capitation fee or unreceipted donations.
2. Complete fee receipts issued through computerized office accounting.
3. Textbooks strictly aligned to NCERT/MPBSE guidelines, easily procurable from local Beohari bookstores.
4. Transport operations running with trained drivers and speed governors.`
  },
  {
    id: "student-merit-records",
    titleEn: "Student Merit & Board Distinction Ledger",
    titleHi: "छात्र योग्यता एवं बोर्ड परीक्षा विशिष्टता पंजी",
    category: "statutory",
    refNumber: "BHS/MERIT/2021-2026",
    validThrough: "Historical Record",
    status: "permanent",
    pages: 8,
    summaryEn: "Consecutive 100% pass percentages in MP Board Class 10th and 12th with top rankers across Beohari block.",
    summaryHi: "ब्यौहारी ब्लॉक में म.प्र. बोर्ड कक्षा 10वीं व 12वीं में 100% उत्तीर्ण परिणाम एवं मेरिट धारक छात्रों की प्रमाणित सूची।",
    issuer: "Office of Examinations & Records, Bhartiyam School",
    issueDate: "June 2026",
    fullBodyText: `BHARTIYAM SCHOOL, BEOHARI
CENTENARY MERIT ROLL & BOARD DISTINCTION AUDIT
- 2024-25 MPBSE 10th: 100% Pass Rate (78% First Division)
- 2024-25 MPBSE 12th Science & Commerce: 98% Pass Rate
- Top marks scored in Mathematics (99/100) and English (97/100).
- Students selected in State Engineering and Nursing colleges.`
  }
];

export const FACULTY_OPENINGS = [
  {
    id: 'job-1',
    titleEn: "Post Graduate Teacher (PGT) — English & Literature",
    titleHi: "स्नातकोत्तर शिक्षक (PGT) — अंग्रेजी एवं साहित्य",
    department: "Senior Secondary (Class 11 & 12)",
    qualification: "M.A. English + B.Ed. (Fluency in English & pedagogical passion)",
    type: "Full-Time Campus Faculty",
    experience: "2+ Years preferred (Enthusiastic freshers welcome)",
    location: "Beohari, Shahdol M.P."
  },
  {
    id: 'job-2',
    titleEn: "Trained Graduate Teacher (TGT) — Mathematics",
    titleHi: "प्रशिक्षित स्नातक शिक्षक (TGT) — गणित",
    department: "Middle & High School (Class 6 to 10)",
    qualification: "B.Sc./M.Sc. Mathematics + B.Ed.",
    type: "Full-Time Campus Faculty",
    experience: "1+ Years experience in board preparation",
    location: "Beohari, Shahdol M.P."
  },
  {
    id: 'job-3',
    titleEn: "Primary Teacher (PRT) — Science & Environmental Studies",
    titleHi: "प्राथमिक शिक्षक (PRT) — विज्ञान एवं पर्यावरण",
    department: "Primary Wing (Class 1 to 5)",
    qualification: "B.Sc. / D.El.Ed. / B.Ed. with interactive activity focus",
    type: "Full-Time Campus Faculty",
    experience: "Experience with young learners",
    location: "Beohari, Shahdol M.P."
  },
  {
    id: 'job-4',
    titleEn: "Montessori & Nursery Lead (NTT)",
    titleHi: "मॉन्टेसरी एवं नर्सरी प्रशिक्षक (NTT)",
    department: "Pre-Primary Wing (Nursery – UKG)",
    qualification: "N.T.T. / Early Childhood Education Certification",
    type: "Full-Time",
    experience: "Warmth, patience, and creative storytelling skills",
    location: "Beohari, Shahdol M.P."
  },
  {
    id: 'job-5',
    titleEn: "Physical Education Teacher & Sports Coach (PET)",
    titleHi: "शारीरिक शिक्षा शिक्षक एवं खेल प्रशिक्षक (PET)",
    department: "Whole School Sports",
    qualification: "B.P.Ed. / M.P.Ed. with expertise in athletics, cricket, volleyball",
    type: "Full-Time",
    experience: "Track record in organizing district-level sports",
    location: "Beohari, Shahdol M.P."
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g-1',
    category: 'smart_class',
    titleEn: 'Interactive Smart Classroom in Action',
    titleHi: 'डिजिटल स्मार्ट क्लासरूम में सजीव शिक्षण',
    descriptionEn: 'Students engaging with visual science simulations on interactive digital panels.',
    descriptionHi: 'इंटरैक्टिव पैनल पर विज्ञान सिमुलेशन के साथ विद्यार्थियों का रोचक अध्ययन।',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    tag: 'Technology'
  },
  {
    id: 'g-2',
    category: 'labs',
    titleEn: 'Hands-On Science Experimentation',
    titleHi: 'विज्ञान प्रयोगशाला में प्रयोगात्मक अभ्यास',
    descriptionEn: 'Equipped physics and chemistry apparatus fostering practical scientific temper.',
    descriptionHi: 'भौतिकी और रसायन विज्ञान के सुसज्जित उपकरणों के साथ व्यावहारिक अभ्यास।',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Laboratories'
  },
  {
    id: 'g-3',
    category: 'labs',
    titleEn: 'Modern Computer & IT Lab',
    titleHi: 'अत्याधुनिक कंप्यूटर एवं सूचना प्रौद्योगिकी लैब',
    descriptionEn: 'Individual workstations ensuring every student gains high-confidence digital fluency.',
    descriptionHi: 'प्रत्येक विद्यार्थी के लिए समर्पित कंप्यूटर वर्कस्टेशन और डिजिटल साक्षरता।',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80',
    tag: 'Digital Literacy'
  },
  {
    id: 'g-4',
    category: 'cultural',
    titleEn: 'Morning Prayer & Assembly Discipline',
    titleHi: 'प्रातःकालीन प्रार्थना एवं अनुशासित सभा',
    descriptionEn: 'Cultivating mindfulness, moral thought of the day, and respectful community conduct.',
    descriptionHi: 'सुप्रभात सभा में एकाग्रता, दैनिक सुविचार और भारतीय संस्कृति के मूल्यों का संचार।',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    tag: 'Sanskar'
  },
  {
    id: 'g-5',
    category: 'sports',
    titleEn: 'Annual Athletic Meet & Track Events',
    titleHi: 'वार्षिक खेलकूद प्रतियोगिता एवं दौड़',
    descriptionEn: 'Fostering sportsmanship, endurance, and healthy peer camaraderie on campus grounds.',
    descriptionHi: 'परिसर में खेल भावना, शारीरिक स्फूर्ति और सहभागिता का उत्सव।',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    tag: 'Sports'
  },
  {
    id: 'g-6',
    category: 'cultural',
    titleEn: 'Annual Day Cultural Festivities',
    titleHi: 'वार्षिक उत्सव में सांस्कृतिक प्रस्तुतियाँ',
    descriptionEn: 'Celebration of Indian classical dance, drama, and regional heritage by young scholars.',
    descriptionHi: 'भारतीय शास्त्रीय नृत्य, लोकगीत और नाट्य कला की मनमोहक प्रस्तुतियां।',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    tag: 'Culture'
  }
];
