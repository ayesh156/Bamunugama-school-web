// ═══════════════════════════════════════════════════════════════════════
//  Central Data Repository — MR/Bamunugama Maha Vidyalaya
//  Single source of truth for all institutional data.
//  Refactored to eliminate hardcoded translation-key dependencies.
//  Future-ready: swap this module with a real DB connector layer.
// ═══════════════════════════════════════════════════════════════════════

// ─── 1. School Profile (Basic Institutional Metadata) ──────────────────
export const schoolProfile = {
  name: {
    full: 'MR/Bamunugama Maha Vidyalaya',
    full_si: 'මාර/බමුණුගම මහා විද්‍යාලය',
    short: 'Bamunugama MV',
    short_si: 'බමුණුගම ම.ව',
  },
  address: {
    line1: 'Bamunugama, Horapawita',
    line1_si: 'බමුණුගම, හොරපාවිට',
    city: 'Matara',
    city_si: 'මාතර',
    country: 'Sri Lanka',
    country_si: 'ශ්‍රී ලංකාව',
  },
  type: '1C Mixed',
  censusNo: '07230',
  schoolNo: '22028',
  established: {
    date: '1913-05-09',
    formatted: 'May 9, 1913',
    formatted_si: '1913 මැයි 9',
  },
  zoneDivision: 'Mulatiyana',
  zoneDivision_si: 'මුලටියන',
  province: 'Southern Province',
  province_si: 'දකුණු පළාත',
  principal: {
    name: 'Mr. Chandika Jayawardena',
    name_si: 'චන්දික ජයවර්ධන මයා',
    role: 'Principal',
    role_si: 'විදුහල්පති',
  },
  motto: 'නැණ ගුණ වඩමු',
  mottoTranslation: '— Næna Guna Wadamu: Nurturing Wisdom and Virtue —',
  hero: {
    badge: 'Established 1913',
    badge_si: '1913 දී ස්ථාපිත',
    titleLine1: 'MR/Bamunugama Maha',
    titleLine1_si: 'මාර/බමුණුගම මහා',
    titleLine2: 'Vidyalaya - Matara',
    titleLine2_si: 'විද්‍යාලය - මාතර',
    address: 'Bamunugama, Horapawita · Matara · Sri Lanka',
    address_si: 'බමුණුගම, හොරපාවිට · මාතර · ශ්‍රී ලංකාව',
    explore: 'Explore More',
    explore_si: 'තව දැනගන්න',
    contactBtn: 'Contact Us',
    contactBtn_si: 'අප අමතන්න',
  },
  stats: {
    students: { value: '477+', label: 'Students', label_si: 'සිසුන්' },
    teachers: { value: '35+', label: 'Teachers', label_si: 'ගුරු මණ්ඩලය' },
    awards: { value: '25+', label: 'Awards', label_si: 'සම්මාන' },
    clubs: { value: '12', label: 'Clubs', label_si: 'සමාජ' },
  },
  organization: {
    roles: 'Principal · Vice Principal · Academic Staff · Administrative Staff',
    roles_si: 'විදුහල්පති · නියෝජ්‍ය විදුහල්පති · ආචාර්ය මණ්ඩලය · පරිපාලන කාර්ය මණ්ඩලය',
  },
};

// ─── 2. Contact Details ────────────────────────────────────────────────
export const contactDetails = {
  phone: '0413 001 026',
  email: 'bmvmatara@gmail.com',
  website: 'facebook.com/bamunugama.mv.matara',
  address: {
    label: 'School Address',
    label_si: 'පාසල් ලිපිනය',
    value: 'Bamunugama, Horapawita',
    value_si: 'බමුණුගම, හොරපාවිට',
  },
  principal: {
    label: 'Principal',
    label_si: 'විදුහල්පති',
    value: 'Mr. Chandika Jayawardena',
    value_si: 'චන්දික ජයවර්ධන මයා',
  },
  classification: {
    label: 'School Classification',
    label_si: 'පාසල් වර්ගීකරණය',
    value: '1C Mixed School',
    value_si: '1C මිශ්‍ර',
  },
  established: {
    label: 'Established',
    label_si: 'ආරම්භ කළ දිනය',
    value: 'May 9, 1913',
    value_si: '1913 මැයි 9',
  },
  codes: {
    label: 'Identity Codes',
    label_si: 'හැඳුනුම් කේත',
    value: 'Census no: 07230 | School no: 22028',
    value_si: 'සංගණන අංකය: 07230 | පාසල් අංකය: 22028',
  },
  administration: {
    label: 'Administration',
    label_si: 'පරිපාලනය',
    value: 'Mulatiyana Education Zone, Southern Province',
    value_si: 'මුලටියන අධ්‍යාපන කලාපය/කොට්ඨාසය, දකුණු පළාත',
  },
  phoneLabel: {
    label: 'Phone',
    label_si: 'දුරකථන',
  },
  emailLabel: {
    label: 'Email',
    label_si: 'විද්‍යුත් තැපෑල',
  },
  websiteLabel: {
    label: 'Facebook Page',
    label_si: 'ෆේසබුක් පිටුව',
  },
  // School name card (special highlighted card)
  schoolName: {
    label: null,
    value: 'MR/Bamunugama Maha Vidyalaya',
    value_si: 'මාර/බමුණුගම මහා විද්‍යාලය',
  },
};

// ─── 3. School Anthem ──────────────────────────────────────────────────
export const schoolAnthemData = {
  audioUrl: '/audio/anthem.mp3',
  title: {
    en: 'Official School Anthem',
    si: 'පාසල් ගීතය',
  },
  lyrics: {
    en: [
      [
        'Sirilaka Rohana purangana gelawata',
        'Bandi muthuhara waniwu...',
        'Sonduru Bamunugama maha widuhal mawa',
        'Sipsatha apatha pewu...',
      ],
      [
        'Rata daya samayata apa hadawath thula',
        'Alma wada pubuda...',
        'Nana deepaya dalwa apa wana mal',
        'Wikasitha kala dinida...',
        'Widuhal mawa sarade',
        'Sama kal kithugosa pathuramine...',
      ],
      [
        'Kelipitiyehi wuwa sipsatharehi wuwa',
        'Daskam wiskam pa...',
        'Pirunu sithin yuthuwi mathu sirilaka',
        'Namwamu dadi edi pa...',
        'Widuhal mawa sewane',
        'Sisu sama diwi sakasamu sondine...',
      ],
    ],
    si: [
      [
        'සිරිලක රෝහණ පුරඟන ගෙලවට',
        'බැඳි මුතුහර වැනිවූ …',
        'සොඳුරු බමුණුගම මහ විදුහල් මව',
        'සිප්සත අපට පෙවූ …',
      ],
      [
        'රට දැය සමයට අප හදවත් තුළ',
        'ඇල්ම වඩා පුබුදා …',
        'නැණ දීපය දල්වා අප වන මල්',
        'විකසිත කල දිනිඳා …',
        'විදුහල් මව සැරදේ',
        'සැම කල් කිතුගොස පතුරමිනේ …',
      ],
      [
        'කෙලිපිටියෙහි වුව සිප්සතරෙහි වුව',
        'දස්කම් විස්කම් පා …',
        'පිරුනු සිතින් යුතුවී මතු සිරිලක',
        'නංවමු දැඩි එඩි පා …',
        'විදුහල් මව සෙවනේ',
        'සිසු සැම දිවි සකසමු සොඳිනේ …',
      ],
    ],
  },
};

// ─── 4. National Examination 6-Year Performance Trends ─────────────────
export const examinationTrends = {
  scholarship: [
    { year: '2020', sat: 49, passed: 2, pct: 6 },
    { year: '2021', sat: 52, passed: 6, pct: 4 },
    { year: '2022', sat: 34, passed: 6, pct: 18 },
    { year: '2023', sat: 42, passed: 7, pct: 17 },
    { year: '2024', sat: 44, passed: 5, pct: 11 },
    { year: '2025', sat: 48, passed: 6, pct: 10 },
  ],
  ol: [
    { year: '2020', sat: 35, passed: 32, pct: 91 },
    { year: '2021', sat: 39, passed: 35, pct: 90 },
    { year: '2022', sat: 26, passed: 24, pct: 92 },
    { year: '2023', sat: 43, passed: 36, pct: 84 },
    { year: '2024', sat: 38, passed: 34, pct: 90 },
    { year: '2025', sat: 38, passed: 28, pct: 74 },
  ],
  al: [
    { year: '2020', sat: 9, passed: 5, pct: 55 },
    { year: '2021', sat: 13, passed: 6, pct: 46 },
    { year: '2022', sat: 17, passed: 10, pct: 59 },
    { year: '2023', sat: 6, passed: 1, pct: 33 },
    { year: '2024', sat: 4, passed: 1, pct: 25 },
    { year: '2025', sat: 8, passed: 3, pct: 38 },
  ],
};

// ─── 5. Student Demographics (Enrollment Statistics) ──────────────────
export const studentDemographics = {
  primary: {
    label: 'Primary Section (Grades 1–5)',
    label_si: 'ප්‍රාථමික අංශය (1–5 ශ්‍රේණි)',
    grades: [
      { grade: '1', female: 14, male: 15, total: 29 },
      { grade: '2', female: 19, male: 17, total: 36 },
      { grade: '3A', female: 9, male: 15, total: 24 },
      { grade: '3B', female: 9, male: 13, total: 22 },
      { grade: '4', female: 15, male: 10, total: 25 },
      { grade: '5A', female: 13, male: 10, total: 23 },
      { grade: '5B', female: 13, male: 10, total: 23 },
    ],
    totals: { female: 92, male: 90, total: 182 },
  },
  secondary: {
    label: 'Secondary Section (Grades 6–13)',
    label_si: 'ද්විතීය අංශය (6–13 ශ්‍රේණි)',
    grades: [
      { grade: '6A', female: 10, male: 13, total: 23 },
      { grade: '6B', female: 11, male: 12, total: 23 },
      { grade: '7A', female: 10, male: 12, total: 22 },
      { grade: '7B', female: 15, male: 9, total: 24 },
      { grade: '8A', female: 10, male: 13, total: 23 },
      { grade: '8B', female: 10, male: 13, total: 23 },
      { grade: '9', female: 16, male: 17, total: 33 },
      { grade: '10A', female: 16, male: 11, total: 27 },
      { grade: '10B', female: 13, male: 11, total: 24 },
      { grade: '11A', female: 12, male: 17, total: 29 },
      { grade: '11B', female: 11, male: 14, total: 25 },
      { grade: '12', female: 5, male: 9, total: 14 },
      { grade: '13', female: 8, male: 2, total: 10 },
    ],
    totals: { female: 147, male: 153, total: 300 },
  },
};

// ─── 6. Historical Timeline (Milestone Nodes) ──────────────────────────
export const historicalTimeline = [
  {
    year: '1913',
    titleKey: 'about.timeline.1913.title',
    descKey: 'about.timeline.1913.desc',
    imageKey: 'about.timeline.1913.image_title',
    imageDescKey: 'about.timeline.1913.image_desc',
    viewDocKey: 'about.timeline.1913.view_doc',
    imageSrc: '/images/first-log-1913.png',
    hasDocument: true,
    docImageUrl:
      'https://lh3.googleusercontent.com/d/1oBTLD5SqrCQudAxH2ixO4Kru1OF3jGwr',
    docAlt: 'Official 1913 School Log Document',
  },
  {
    year: '1917',
    titleKey: 'about.timeline.1917.title',
    descKey: 'about.timeline.1917.desc',
  },
  {
    year: '1940',
    titleKey: 'about.timeline.1940.title',
    descKey: 'about.timeline.1940.desc',
  },
  {
    year: '1957',
    titleKey: 'about.timeline.1957.title',
    descKey: 'about.timeline.1957.desc',
  },
  {
    year: '1965',
    titleKey: 'about.timeline.1965.title',
    descKey: 'about.timeline.1965.desc',
  },
  {
    year: '1977',
    titleKey: 'about.timeline.1977.title',
    descKey: 'about.timeline.1977.desc',
  },
  {
    year: '2026',
    titleKey: 'about.timeline.2026.title',
    descKey: 'about.timeline.2026.desc',
  },
];