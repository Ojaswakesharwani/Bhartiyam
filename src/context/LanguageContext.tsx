import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<string, { en: string; hi: string }> = {
  // Top Strip & Navigation
  top_tagline: {
    en: "EST. 2005  •  MP BOARD RECOGNIZED (UDISE: 23160200703)  •  NEAR JAI STAMBH, BEOHARI",
    hi: "स्थापना 2005  •  म.प्र. बोर्ड मान्यता प्राप्त (UDISE: 23160200703)  •  जय स्तंभ के पास, ब्यौहारी"
  },
  call_office: {
    en: "Call Office",
    hi: "कार्यालय संपर्क"
  },
  apply_now: {
    en: "Apply 2026–27",
    hi: "प्रवेश 2026–27"
  },
  office_portal: {
    en: "Office Portal",
    hi: "कार्यालय पोर्टल"
  },
  nav_home: {
    en: "Home",
    hi: "मुख्य पृष्ठ"
  },
  nav_legacy: {
    en: "Legacy & Principal",
    hi: "संस्थान एवं प्राचार्य"
  },
  nav_academics: {
    en: "Academics & Campus",
    hi: "शिक्षा एवं परिसर"
  },
  nav_admissions: {
    en: "Admissions & Fees",
    hi: "प्रवेश एवं शुल्क"
  },
  nav_disclosures: {
    en: "Official Disclosures",
    hi: "शासकीय प्रकटीकरण"
  },
  nav_chronicles: {
    en: "Campus Chronicles",
    hi: "परिसर गतिविधियाँ"
  },

  // Hero Section
  hero_eyebrow: {
    en: "— ADMISSIONS OPEN FOR SESSION 2026–27  •  NURSERY TO CLASS XII",
    hi: "— सत्र 2026–27 हेतु प्रवेश प्रारंभ  •  नर्सरी से बारहवीं तक"
  },
  hero_heading_pre: {
    en: "Shaping Character & Intellect at",
    hi: "चरित्र निर्माण और उत्कृष्ट शिक्षा का केंद्र —"
  },
  hero_school_name: {
    en: "BHARTIYAM SCHOOL",
    hi: "भारतीयम स्कूल, ब्यौहारी"
  },
  hero_subheading: {
    en: "Two decades of disciplined English-medium education in Beohari—uniting thoughtful classroom mentorship, modern smart labs, and enduring Indian sanskar.",
    hi: "ब्यौहारी में दो दशकों से निरंतर अनुशासित अंग्रेजी माध्यम शिक्षा — समर्पित व्यक्तिगत मार्गदर्शन, आधुनिक स्मार्ट लैब्स और भारतीय संस्कारों का संगम।"
  },
  hero_btn_inquiry: {
    en: "Begin 2-Minute Admission Inquiry →",
    hi: "2-मिनट में प्रवेश पूछताछ आरंभ करें →"
  },
  hero_btn_estimator: {
    en: "Calculate Fee & Bus Route",
    hi: "शुल्क एवं बस रूट कैलकुलेटर"
  },

  // 4 Pillars
  pillar_1_title: {
    en: "I. Academic Rigor",
    hi: "१. शैक्षणिक उत्कृष्टता"
  },
  pillar_1_desc: {
    en: "MPBSE curriculum with 26:1 personal mentorship & 10-minute early Pre-Classes.",
    hi: "म.प्र. बोर्ड पाठ्यक्रम, 26:1 व्यक्तिगत शिक्षक अनुपात एवं 10-मिनट पूर्व दैनिक तैयारी।"
  },
  pillar_2_title: {
    en: "II. Smart Classrooms",
    hi: "२. डिजिटल स्मार्ट कक्षाएँ"
  },
  pillar_2_desc: {
    en: "Interactive digital boards, science & computer labs for experiential clarity.",
    hi: "इंटरैक्टिव डिजिटल बोर्ड, आधुनिक विज्ञान व कंप्यूटर प्रयोगशालाएँ प्रायोगिक ज्ञान हेतु।"
  },
  pillar_3_title: {
    en: "III. Sports & Discipline",
    hi: "३. खेल एवं अनुशासित जीवन"
  },
  pillar_3_desc: {
    en: "Structured physical education, morning assemblies, and team character.",
    hi: "नियमित खेलकूद, प्रेरक प्रातःकालीन सभा और अनुशासित व्यक्तित्व विकास।"
  },
  pillar_4_title: {
    en: "IV. Sanskar & Seva",
    hi: "४. भारतीय संस्कार एवं सेवा"
  },
  pillar_4_desc: {
    en: "Value-driven upbringing, cultural heritage, and community service in Beohari.",
    hi: "नैतिक मूल्य, एकादशी व राष्ट्रीय पर्वों पर सेवा कार्य तथा भारतीय संस्कृति का सम्मान।"
  },

  // Key Metrics
  metric_years_num: {
    en: "2005",
    hi: "2005"
  },
  metric_years_label: {
    en: "Founded in Beohari",
    hi: "ब्यौहारी में स्थापित"
  },
  metric_years_sub: {
    en: "20+ Years Legacy of Trust",
    hi: "20 से अधिक वर्षों की अविश्वसनीय प्रतिष्ठा"
  },
  metric_ratio_num: {
    en: "26 : 1",
    hi: "26 : 1"
  },
  metric_ratio_label: {
    en: "Student-to-Teacher Ratio",
    hi: "विद्यार्थी-शिक्षक अनुपात"
  },
  metric_ratio_sub: {
    en: "Personal Mentorship in Every Period",
    hi: "प्रत्येक छात्र पर व्यक्तिगत ध्यान"
  },
  metric_labs_num: {
    en: "15+",
    hi: "15+"
  },
  metric_labs_label: {
    en: "Smart Labs & Modern Rooms",
    hi: "स्मार्ट लैब्स एवं कक्षाएँ"
  },
  metric_labs_sub: {
    en: "Physics, Chem, Bio & IT Facilities",
    hi: "विज्ञान, कंप्यूटर व डिजिटल सुविधाएं"
  },
  metric_prep_num: {
    en: "10 Min",
    hi: "10 मिनट"
  },
  metric_prep_label: {
    en: "Early Pre-Class Readiness",
    hi: "दैनिक पूर्व-कक्षा तैयारी"
  },
  metric_prep_sub: {
    en: "Faculty Lesson Alignment Every Morning",
    hi: "हर सुबह शिक्षकों का समन्वित पूर्वाभ्यास"
  },

  // The Bhartiyam Standard Bento
  standard_eyebrow: {
    en: "ACADEMIC TRADITION & METHODOLOGY",
    hi: "शैक्षणिक परंपरा एवं अध्यापन पद्धति"
  },
  standard_heading: {
    en: "The Bhartiyam Standard of Education",
    hi: "भारतीयम स्कूल की विशिष्ट शिक्षण शैली"
  },
  standard_sub: {
    en: "Every element of our campus is designed to foster inquisitive minds, strong ethical compasses, and lifelong scholastic confidence in Beohari.",
    hi: "हमारे परिसर का प्रत्येक पहलू ब्यौहारी के नौनिहालों में आत्म-विश्वास, तीक्ष्ण बुद्धि और भारतीय संस्कारों के सिंचन हेतु समर्पित है।"
  },

  // Bento Cards
  bento_1_title: {
    en: "Child-Centered Pedagogy",
    hi: "बाल-केंद्रित शिक्षण पद्धति"
  },
  bento_1_desc: {
    en: "Teaching is adapted to the pace of every child. Small batch sizes ensure quiet students are never left behind in mathematics or languages.",
    hi: "हर बच्चे की सीखने की गति का सम्मान। छोटे समूह होने से संकोची विद्यार्थी भी गणित और भाषा में कभी पीछे नहीं रहते।"
  },
  bento_2_title: {
    en: "10-Minute Pre-Class Ritual",
    hi: "10-मिनट का दैनिक पूर्व-कक्षा अभ्यास"
  },
  bento_2_desc: {
    en: "Every educator arrives 10 minutes prior to the first bell to align blackboard objectives, review yesterday's doubts, and welcome learners with focus.",
    hi: "प्रत्येक शिक्षक प्रथम घंटी से 10 मिनट पहले उपस्थित होकर दैनिक पाठ योजना और पिछले दिन की शंकाओं का समाधान तैयार रखते हैं।"
  },
  bento_3_title: {
    en: "Remedial & Special Care Hours",
    hi: "अतिरिक्त उपचारात्मक मार्गदर्शन"
  },
  bento_3_desc: {
    en: "Free zero-cost remedial support after regular hours for students preparing for MP Board Class 10 & 12 board examinations.",
    hi: "कक्षा 10वीं व 12वीं बोर्ड परीक्षाओं की तैयारी कर रहे विद्यार्थियों के लिए विद्यालय समय के पश्चात निःशुल्क विशेष मार्गदर्शन।"
  },
  bento_4_title: {
    en: "Smart & Experiential Labs",
    hi: "स्मार्ट एवं प्रयोगात्मक प्रयोगशालाएँ"
  },
  bento_4_desc: {
    en: "Fully equipped Science apparatus and high-speed computer workstation labs giving rural Shahdol students global digital literacy.",
    hi: "सुसज्जित भौतिकी, रसायन, जीवविज्ञान और कंप्यूटर प्रयोगशालाएं जो ब्यौहारी के विद्यार्थियों को आधुनिक तकनीक से जोड़ती हैं।"
  },
  bento_5_title: {
    en: "Ekadashi Seva & Indian Sanskar",
    hi: "संस्कार, सेवा एवं सांस्कृतिक निष्ठा"
  },
  bento_5_desc: {
    en: "Weekly moral storytelling, morning Shloka recitations, tree plantation drives, and respect for elders woven into the everyday timetable.",
    hi: "प्रातःकालीन श्लोक पाठ, नैतिक विचार, वृक्षारोपण अभियान और माता-पिता व गुरुजनों के प्रति कृतज्ञता की भावना का विकास।"
  },

  // From Principal's Desk
  principal_eyebrow: {
    en: "LEADERSHIP & VISION",
    hi: "नेतृत्व एवं दूरदृष्टि"
  },
  principal_heading: {
    en: "From the Principal's Desk",
    hi: "प्राचार्य की कलम से"
  },
  principal_name: {
    en: "Smt. Parul Saxena",
    hi: "श्रीमती पारुल सक्सेना"
  },
  principal_role: {
    en: "Principal & Head of Institution, Bhartiyam School, Beohari",
    hi: "प्राचार्य एवं संस्था प्रमुख, भारतीयम स्कूल, ब्यौहारी"
  },
  principal_quote_1: {
    en: "Education in a town like Beohari must never be a hollow imitation of urban trends. It must be authentic, academically exacting, and deeply rooted in character.",
    hi: "ब्यौहारी जैसे ऐतिहासिक क्षेत्र में शिक्षा केवल शहरी प्रवृत्तियों का अनुकरण नहीं हो सकती। यह प्रामाणिक, शैक्षणिक रूप से सुदृढ़ और चरित्र निर्माण में दृढ़ होनी चाहिए।"
  },
  principal_quote_2: {
    en: "For over two decades, our faculty has treated every child who enters these gates as our sacred responsibility. Whether a child dreams of public civil services, medicine, engineering, or armed defense forces, our foundation stands unshakeable.",
    hi: "विगत 20 वर्षों से हमारे शिक्षक इस परिसर में प्रवेश करने वाले प्रत्येक बच्चे को अपना पावन दायित्व मानते हैं। चाहे विद्यार्थी प्रशासनिक सेवा, चिकित्सा, इंजीनियरिंग या सेना में जाने का स्वप्न देखे—उसकी नींव यहीं सुदृढ़ होती है।"
  },

  // Estimator Section
  estimator_eyebrow: {
    en: "TRANSPARENT FINANCIAL PLANNING",
    hi: "पारदर्शी एवं स्पष्ट शुल्क विवरण"
  },
  estimator_heading: {
    en: "Interactive Fee & Bus Route Estimator",
    hi: "शुल्क एवं बस मार्ग आकलन कैलकुलेटर"
  },
  estimator_sub: {
    en: "Select your child's grade category and residence locality in Beohari for a comprehensive quarterly budget breakdown with zero hidden fees.",
    hi: "अपने बच्चे की कक्षा और ब्यौहारी में निवास स्थान चुनें — बिना किसी छुपे शुल्क के स्पष्ट त्रैमासिक व वार्षिक विवरण प्राप्त करें।"
  },

  // Testimonials
  voices_eyebrow: {
    en: "VERIFIED COMMUNITY ENDORSEMENTS",
    hi: "अभिभावक एवं पूर्व छात्रों के अनुभव"
  },
  voices_heading: {
    en: "Student & Parent Voices",
    hi: "भारतीयम परिवार की सच्ची आवाजें"
  },

  // Location & Contact
  campus_loc_heading: {
    en: "Visit Our Campus in Beohari",
    hi: "ब्यौहारी स्थित हमारे परिसर में पधारें"
  },
  campus_loc_address: {
    en: "Near Jai Stambh, Ward No. 7, Beohari, District Shahdol, Madhya Pradesh – 484774",
    hi: "जय स्तंभ के पास, वार्ड नं. 7, ब्यौहारी, जिला शहडोल, मध्य प्रदेश – 484774"
  },
  office_hours: {
    en: "Monday to Saturday : 9:00 AM – 2:00 PM (Public Visits Welcome)",
    hi: "सोमवार से शनिवार : प्रातः 9:00 बजे से दोपहर 2:00 बजे तक"
  },
  whatsapp_desk: {
    en: "Chat with Admissions Desk on WhatsApp",
    hi: "व्हाट्सएप पर प्रवेश दल से सीधे बात करें"
  },

  // Footer
  footer_tagline: {
    en: "Nurturing intellect, cultural grace, and steadfast discipline in Shahdol district since 2005.",
    hi: "वर्ष 2005 से शहडोल संभाग में ज्ञान, सांस्कृतिक गरिमा और अटूट अनुशासन का संचार।"
  },
  footer_rights: {
    en: "All Rights Reserved. Bhartiyam School, Beohari (MPBSE UDISE: 23160200703).",
    hi: "सर्वाधिकार सुरक्षित। भारतीयम स्कूल, ब्यौहारी (म.प्र. बोर्ड UDISE: 23160200703)."
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bhartiyam_lang');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bhartiyam_lang', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const t = (key: string, defaultText?: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return defaultText || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      <div className={language === 'hi' ? 'font-hindi' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
