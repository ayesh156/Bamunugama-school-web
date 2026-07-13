import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, Award, BookOpen, TrendingUp, Users, GraduationCap, Star, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ─── Grade 5 Scholarship Mock Data ───
const scholarshipData = [
  { id: 1, indexNo: 'SCH2024001', name: 'Supun Perera', totalMarks: 194, cutoff: 168, status: 'pass' },
  { id: 2, indexNo: 'SCH2024002', name: 'Dilani Rathnayake', totalMarks: 188, cutoff: 168, status: 'pass' },
  { id: 3, indexNo: 'SCH2024003', name: 'Kavindu Silva', totalMarks: 176, cutoff: 168, status: 'pass' },
  { id: 4, indexNo: 'SCH2024004', name: 'Nadeesha Kumari', totalMarks: 198, cutoff: 168, status: 'pass' },
  { id: 5, indexNo: 'SCH2024005', name: 'Tharindu Jayasuriya', totalMarks: 142, cutoff: 168, status: 'fail' },
  { id: 6, indexNo: 'SCH2024006', name: 'Sanduni Madhushika', totalMarks: 185, cutoff: 168, status: 'pass' },
  { id: 7, indexNo: 'SCH2024007', name: 'Ravindu Lakshan', totalMarks: 162, cutoff: 168, status: 'fail' },
  { id: 8, indexNo: 'SCH2024008', name: 'Oshadi Himasha', totalMarks: 200, cutoff: 168, status: 'pass' },
  { id: 9, indexNo: 'SCH2024009', name: 'Chamindu Vidushan', totalMarks: 134, cutoff: 168, status: 'fail' },
  { id: 10, indexNo: 'SCH2024010', name: 'Dulani Nisansala', totalMarks: 179, cutoff: 168, status: 'pass' },
  { id: 11, indexNo: 'SCH2024011', name: 'Kasun Madusanka', totalMarks: 192, cutoff: 168, status: 'pass' },
  { id: 12, indexNo: 'SCH2024012', name: 'Lahiru Prabath', totalMarks: 147, cutoff: 168, status: 'fail' },
];

// ─── G.C.E. O/L Mock Data ───
const olData = [
  { id: 1, indexNo: 'OL2024001', name: 'Supun Perera', grades: '9A', bestSummary: '9A', islandRank: 1247, districtRank: 48 },
  { id: 2, indexNo: 'OL2024002', name: 'Dilani Rathnayake', grades: '8A 1B', bestSummary: '8A 1B', islandRank: 2893, districtRank: 112 },
  { id: 3, indexNo: 'OL2024003', name: 'Kavindu Silva', grades: '6A 2B 1C', bestSummary: '6A 2B 1C', islandRank: 8541, districtRank: 328 },
  { id: 4, indexNo: 'OL2024004', name: 'Nadeesha Kumari', grades: '9A', bestSummary: '9A', islandRank: 892, districtRank: 31 },
  { id: 5, indexNo: 'OL2024005', name: 'Tharindu Jayasuriya', grades: '4A 3B 2C', bestSummary: '4A 3B 2C', islandRank: 12458, districtRank: 497 },
  { id: 6, indexNo: 'OL2024006', name: 'Sanduni Madhushika', grades: '7A 2B', bestSummary: '7A 2B', islandRank: 4217, districtRank: 176 },
  { id: 7, indexNo: 'OL2024007', name: 'Ravindu Lakshan', grades: '5A 3B 1C', bestSummary: '5A 3B 1C', islandRank: 9674, districtRank: 395 },
  { id: 8, indexNo: 'OL2024008', name: 'Oshadi Himasha', grades: '9A', bestSummary: '9A', islandRank: 456, districtRank: 18 },
  { id: 9, indexNo: 'OL2024009', name: 'Dinesh Fernando', grades: '3A 3B 3C', bestSummary: '3A 3B 3C', islandRank: 21458, districtRank: 812 },
  { id: 10, indexNo: 'OL2024010', name: 'Dulani Nisansala', grades: '6A 2B 1C', bestSummary: '6A 2B 1C', islandRank: 7845, districtRank: 298 },
];

// ─── G.C.E. A/L Mock Data ───
const alData = [
  { id: 1, indexNo: 'AL2024001', name: 'Supun Perera', stream: 'Physical Science', grades: '3A', zScore: 2.4520, districtRank: 12 },
  { id: 2, indexNo: 'AL2024002', name: 'Dilani Rathnayake', stream: 'Biological Science', grades: '2A 1B', zScore: 2.1450, districtRank: 34 },
  { id: 3, indexNo: 'AL2024003', name: 'Kavindu Silva', stream: 'Arts', grades: '3A', zScore: 2.3120, districtRank: 8 },
  { id: 4, indexNo: 'AL2024004', name: 'Nadeesha Kumari', stream: 'Commerce', grades: '3A', zScore: 2.6540, districtRank: 5 },
  { id: 5, indexNo: 'AL2024005', name: 'Tharindu Jayasuriya', stream: 'Physical Science', grades: '1A 2B', zScore: 1.8720, districtRank: 78 },
  { id: 6, indexNo: 'AL2024006', name: 'Sanduni Madhushika', stream: 'Biological Science', grades: '2A 1A', zScore: 2.5210, districtRank: 21 },
  { id: 7, indexNo: 'AL2024007', name: 'Ravindu Lakshan', stream: 'Commerce', grades: '1A 1B 1C', zScore: 1.6540, districtRank: 112 },
  { id: 8, indexNo: 'AL2024008', name: 'Oshadi Himasha', stream: 'Arts', grades: '3A', zScore: 2.8340, districtRank: 3 },
  { id: 9, indexNo: 'AL2024009', name: 'Dinesh Fernando', stream: 'Physical Science', grades: '2B 1C', zScore: 1.2130, districtRank: 245 },
  { id: 10, indexNo: 'AL2024010', name: 'Dulani Nisansala', stream: 'Biological Science', grades: '1A 2B', zScore: 1.9840, districtRank: 56 },
];

// ─── Term Exam Mock Data (existing, enhanced) ───
const termData = [
  { id: 1, indexNo: '2024001', name: 'Supun Perera', grade: 'Grade 10', className: 'Class A', term: 'First Term', subjects: { Sinhala: 85, English: 78, Mathematics: 92, Science: 88, History: 74, Buddhism: 90, ICT: 95, Geography: 80 }, status: 'pass' },
  { id: 2, indexNo: '2024002', name: 'Dilani Rathnayake', grade: 'Grade 10', className: 'Class A', term: 'First Term', subjects: { Sinhala: 92, English: 88, Mathematics: 76, Science: 91, History: 85, Buddhism: 94, ICT: 80, Geography: 87 }, status: 'pass' },
  { id: 3, indexNo: '2024003', name: 'Kavindu Silva', grade: 'Grade 10', className: 'Class A', term: 'First Term', subjects: { Sinhala: 64, English: 71, Mathematics: 55, Science: 60, History: 68, Buddhism: 73, ICT: 82, Geography: 58 }, status: 'pass' },
  { id: 4, indexNo: '2024004', name: 'Nadeesha Kumari', grade: 'Grade 10', className: 'Class B', term: 'First Term', subjects: { Sinhala: 95, English: 90, Mathematics: 97, Science: 93, History: 88, Buddhism: 96, ICT: 98, Geography: 91 }, status: 'pass' },
  { id: 5, indexNo: '2024005', name: 'Tharindu Jayasuriya', grade: 'Grade 10', className: 'Class B', term: 'First Term', subjects: { Sinhala: 45, English: 52, Mathematics: 38, Science: 41, History: 55, Buddhism: 60, ICT: 50, Geography: 48 }, status: 'fail' },
  { id: 6, indexNo: '2024006', name: 'Sanduni Madhushika', grade: 'Grade 11', className: 'Class A', term: 'First Term', subjects: { Sinhala: 88, English: 82, Mathematics: 79, Science: 85, History: 76, Buddhism: 87, ICT: 91, Geography: 83 }, status: 'pass' },
  { id: 7, indexNo: '2024007', name: 'Ravindu Lakshan', grade: 'Grade 11', className: 'Class A', term: 'First Term', subjects: { Sinhala: 72, English: 68, Mathematics: 80, Science: 74, History: 70, Buddhism: 78, ICT: 85, Geography: 77 }, status: 'pass' },
  { id: 8, indexNo: '2024008', name: 'Oshadi Himasha', grade: 'Grade 11', className: 'Class B', term: 'First Term', subjects: { Sinhala: 96, English: 93, Mathematics: 99, Science: 97, History: 91, Buddhism: 98, ICT: 100, Geography: 94 }, status: 'pass' },
  { id: 9, indexNo: '2024009', name: 'Chamindu Vidushan', grade: 'Grade 11', className: 'Class B', term: 'First Term', subjects: { Sinhala: 38, English: 42, Mathematics: 30, Science: 35, History: 44, Buddhism: 50, ICT: 40, Geography: 36 }, status: 'fail' },
  { id: 10, indexNo: '2024010', name: 'Dulani Nisansala', grade: 'Grade 6', className: 'Class A', term: 'First Term', subjects: { Sinhala: 78, English: 74, Mathematics: 82, Science: 80, History: 71, Buddhism: 84, ICT: 76, Geography: 79 }, status: 'pass' },
  { id: 11, indexNo: '2024011', name: 'Kasun Madusanka', grade: 'Grade 6', className: 'Class A', term: 'Second Term', subjects: { Sinhala: 81, English: 77, Mathematics: 86, Science: 83, History: 75, Buddhism: 85, ICT: 88, Geography: 82 }, status: 'pass' },
  { id: 12, indexNo: '2024012', name: 'Lahiru Prabath', grade: 'Grade 6', className: 'Class B', term: 'Second Term', subjects: { Sinhala: 56, English: 63, Mathematics: 48, Science: 52, History: 60, Buddhism: 65, ICT: 70, Geography: 55 }, status: 'fail' },
];

const subjectKeys = ['Sinhala', 'English', 'Mathematics', 'Science', 'History', 'Buddhism', 'ICT', 'Geography'];

export default function Results() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [examType, setExamType] = useState('term');
  const [gradeFilter, setGradeFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [termFilter, setTermFilter] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);

  // Determine which data array to use and its columns
  const activeData = useMemo(() => {
    switch (examType) {
      case 'scholarship':
        return scholarshipData;
      case 'ol':
        return olData;
      case 'al':
        return alData;
      case 'term':
      default:
        return termData;
    }
  }, [examType]);

  // Filter logic
  const filteredResults = useMemo(() => {
    return activeData.filter((student) => {
      const matchSearch =
        student.indexNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGrade = !gradeFilter || student.grade === gradeFilter;
      const matchClass = !classFilter || student.className === classFilter;
      const matchTerm = !termFilter || student.term === termFilter;
      return matchSearch && matchGrade && matchClass && matchTerm;
    });
  }, [searchTerm, gradeFilter, classFilter, termFilter, activeData]);

  const grades = [...new Set(termData.map((r) => r.grade))];
  const classes = [...new Set(termData.map((r) => r.className))];
  const terms = [...new Set(termData.map((r) => r.term))];

  // ─── Badge Renderers ───

  const getStatusBadge = (status, avg) => {
    if (status === 'fail') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          {t('results.badge.fail')}
        </span>
      );
    }
    if (avg !== undefined && avg >= 85) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
          <Award className="w-3.5 h-3.5" />
          {t('results.badge.excellent')}
        </span>
      );
    }
    if (avg !== undefined && avg >= 65) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
          <TrendingUp className="w-3.5 h-3.5" />
          {t('results.badge.good')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
        {t('results.badge.pass')}
      </span>
    );
  };

  const getScholarshipBadge = (status) => {
    if (status === 'pass') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
          <Star className="w-3 h-3" />
          {t('results.badge.scholarship_pass')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
        {t('results.badge.scholarship_fail')}
      </span>
    );
  };

  const getGradeBadge = (gradeStr) => {
    const totalA = (gradeStr.match(/A/g) || []).length;
    if (totalA >= 8 && totalA <= 9) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          {gradeStr}
        </span>
      );
    }
    if (totalA >= 5) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
          {gradeStr}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
        {gradeStr}
      </span>
    );
  };

  const getZScoreBadge = (zscore) => {
    if (zscore >= 2.5) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
          {zscore.toFixed(4)}
        </span>
      );
    }
    if (zscore >= 2.0) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
          {zscore.toFixed(4)}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
        {zscore.toFixed(4)}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  // ─── Column Definitions ───

  const scholarshipColumns = [
    { key: 'indexNo', label: 'results.table.index' },
    { key: 'name', label: 'results.table.name' },
    { key: 'totalMarks', label: 'results.table.total_marks' },
    { key: 'cutoff', label: 'results.table.cutoff' },
    { key: 'status', label: 'results.table.status' },
  ];

  const olColumns = [
    { key: 'indexNo', label: 'results.table.index' },
    { key: 'name', label: 'results.table.name' },
    { key: 'grades', label: 'results.table.subject_grades' },
    { key: 'bestSummary', label: 'results.table.best_summary' },
    { key: 'islandRank', label: 'results.table.island_rank' },
    { key: 'districtRank', label: 'results.table.district_rank' },
  ];

  const alColumns = [
    { key: 'indexNo', label: 'results.table.index' },
    { key: 'name', label: 'results.table.name' },
    { key: 'stream', label: 'results.table.stream' },
    { key: 'grades', label: 'results.table.subject_grades' },
    { key: 'zScore', label: 'results.table.z_score' },
    { key: 'districtRank', label: 'results.table.district_rank' },
  ];

  const termColumns = [
    { key: 'indexNo', label: 'results.table.index' },
    { key: 'name', label: 'results.table.name' },
    { key: 'grade', label: 'results.filter.grade' },
    { key: 'className', label: 'results.filter.class' },
    { key: 'term', label: 'results.filter.term' },
    { key: 'total', label: 'results.table.total' },
    { key: 'average', label: 'results.table.average' },
    { key: 'rank', label: 'results.table.rank' },
    { key: 'status', label: 'results.table.status' },
  ];

  const getColumns = () => {
    switch (examType) {
      case 'scholarship':
        return scholarshipColumns;
      case 'ol':
        return olColumns;
      case 'al':
        return alColumns;
      case 'term':
      default:
        return termColumns;
    }
  };

  const columns = getColumns();

  // ─── Render Cell ───
  const renderCell = (student, col) => {
    switch (col.key) {
      case 'indexNo':
        return (
          <span className="font-mono text-xs text-gray-700 dark:text-gray-300 tracking-wider">
            {student.indexNo}
          </span>
        );
      case 'name':
        return (
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {student.name}
          </span>
        );
      case 'totalMarks':
        return (
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {student.totalMarks}
            <span className="text-gray-400 dark:text-gray-500 font-normal">/200</span>
          </span>
        );
      case 'cutoff':
        return (
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {student.cutoff}
          </span>
        );
      case 'status':
        if (examType === 'scholarship') return getScholarshipBadge(student.status);
        if (examType === 'term') {
          const scores = Object.values(student.subjects);
          const total = scores.reduce((a, b) => a + b, 0);
          const avg = Math.round(total / scores.length);
          return getStatusBadge(student.status, avg);
        }
        return null;
      case 'grades':
        if (examType === 'ol' || examType === 'al') return getGradeBadge(student.grades);
        return null;
      case 'bestSummary':
        return (
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {student.bestSummary}
          </span>
        );
      case 'islandRank':
        return student.islandRank <= 1000 ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <MapPin className="w-3 h-3" />
            {student.islandRank}
          </span>
        ) : (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {student.islandRank.toLocaleString()}
          </span>
        );
      case 'districtRank':
        if (examType === 'ol') {
          return student.districtRank <= 50 ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <MapPin className="w-3 h-3" />
              {student.districtRank}
            </span>
          ) : (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {student.districtRank}
            </span>
          );
        }
        if (examType === 'al') {
          return student.districtRank <= 10 ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
              <Star className="w-3 h-3" />
              {student.districtRank}
            </span>
          ) : (
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {student.districtRank}
            </span>
          );
        }
        return null;
      case 'stream':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <GraduationCap className="w-3 h-3" />
            {language === 'si'
              ? { 'Physical Science': 'භෞතික විද්‍යා', 'Biological Science': 'ජීව විද්‍යා', 'Arts': 'කලා', 'Commerce': 'වාණිජ' }[student.stream] || student.stream
              : student.stream}
          </span>
        );
      case 'zScore':
        return getZScoreBadge(student.zScore);
      case 'grade':
        return <span className="text-gray-600 dark:text-gray-400">{student.grade}</span>;
      case 'className':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300">
            {student.className}
          </span>
        );
      case 'term':
        return <span className="text-gray-600 dark:text-gray-400">{student.term}</span>;
      case 'total':
        if (examType === 'term') {
          const scores = Object.values(student.subjects);
          const total = scores.reduce((a, b) => a + b, 0);
          return (
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {total}/{scores.length * 100}
            </span>
          );
        }
        return null;
      case 'average':
        if (examType === 'term') {
          const scores = Object.values(student.subjects);
          const total = scores.reduce((a, b) => a + b, 0);
          const avg = Math.round(total / scores.length);
          return (
            <span className={`font-bold text-lg ${avg >= 75 ? 'text-emerald-600 dark:text-emerald-400' : avg >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
              {avg}%
            </span>
          );
        }
        return null;
      case 'rank':
        if (examType === 'term') {
          const studentsWithAvg = filteredResults
            .map((s) => ({
              ...s,
              avg: Math.round(Object.values(s.subjects).reduce((x, y) => x + y, 0) / Object.values(s.subjects).length),
            }))
            .sort((a, b) => b.avg - a.avg);
          const rank = studentsWithAvg.findIndex((s) => s.id === student.id) + 1;
          return (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 text-sm font-bold text-gray-700 dark:text-gray-300">
              {rank}
            </span>
          );
        }
        return null;
      default:
        return null;
    }
  };

  // ─── Exam type label map for stats display ───
  const examLabelKey = `results.filter.exam_${examType}`;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-primary-500/5 rounded-2xl blur-3xl" />
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                  {t('results.header.badge')}
                </span>
                <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {t('results.header.title')}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                  {t('results.header.subtitle')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 shadow-sm">
                  <BookOpen className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {activeData.length} {t('results.stats.total_students')}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 shadow-sm">
                  <Users className="w-4 h-4 text-accent-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {filteredResults.length} {t('results.stats.results_count')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section — horizontal 4-col grid */}
        <div className="mb-8 p-4 sm:p-6 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-white/20 dark:border-slate-700/30 shadow-lg backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('results.search.placeholder')}
                className="w-full pl-10 pr-4 p-3 h-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200"
              />
            </div>

            {/* Exam Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={examType}
                onChange={(e) => {
                  setExamType(e.target.value);
                  setSearchTerm('');
                  setGradeFilter('');
                  setClassFilter('');
                  setTermFilter('');
                  setExpandedRow(null);
                }}
                className="w-full pl-10 pr-8 p-3 h-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200 cursor-pointer"
              >
                <option value="scholarship">{t('results.filter.exam_scholarship')}</option>
                <option value="ol">{t('results.filter.exam_ol')}</option>
                <option value="al">{t('results.filter.exam_al')}</option>
                <option value="term">{t('results.filter.exam_term')}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Grade Filter — only for term exams */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                disabled={examType !== 'term'}
                className="w-full pl-10 pr-8 p-3 h-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{t('results.filter.grade_all')}</option>
                {grades.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Class Filter — only for term exams */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                disabled={examType !== 'term'}
                className="w-full pl-10 pr-8 p-3 h-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{t('results.filter.class_all')}</option>
                {classes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Term Filter — only for term exams */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={termFilter}
                onChange={(e) => setTermFilter(e.target.value)}
                disabled={examType !== 'term'}
                className="w-full pl-10 pr-8 p-3 h-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{t('results.filter.term_all')}</option>
                {terms.map((tm) => (
                  <option key={tm} value={tm}>{tm}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Glassmorphism Table Card */}
        <div className="overflow-x-auto select-none rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl">
          <div className="min-w-[900px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200/70 dark:border-slate-700/40 bg-gray-50/60 dark:bg-slate-800/40">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                    >
                      {t(col.label)}
                    </th>
                  ))}
                  {/* Extra column for expand button on term exams */}
                  {examType === 'term' && (
                    <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      <span className="sr-only">{t('results.table.subject')}</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/70 dark:divide-slate-700/30">
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + (examType === 'term' ? 1 : 0)} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Search className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {t('results.no_results')}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((student) => {
                    const isExpanded = expandedRow === student.id;
                    return (
                      <tr
                        key={student.id}
                        className="group transition-colors duration-150 hover:bg-gray-50/50 dark:hover:bg-slate-700/20"
                      >
                        {columns.map((col) => (
                          <td key={col.key} className="px-4 py-4 whitespace-nowrap">
                            {renderCell(student, col)}
                          </td>
                        ))}
                        {/* Expand button for term exams */}
                        {examType === 'term' && (
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => setExpandedRow(isExpanded ? null : student.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors duration-200"
                            >
                              {t('results.table.subject')}
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Expanded Subject Details — only for term exams */}
          {examType === 'term' && expandedRow !== null && (
            <div className="border-t border-gray-200/70 dark:border-slate-700/30 bg-gray-50/30 dark:bg-slate-800/20 animate-fade-in">
              <div className="p-4 sm:p-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary-500 shrink-0" />
                  {(() => {
                    const student = filteredResults.find((s) => s.id === expandedRow);
                    return student ? `${t('results.table.subject')} — ${student.name}` : '';
                  })()}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {subjectKeys.map((sub) => {
                    const student = filteredResults.find((s) => s.id === expandedRow);
                    if (!student) return null;
                    const score = student.subjects[sub];
                    return (
                      <div
                        key={sub}
                        className="p-3 rounded-lg bg-white/60 dark:bg-slate-700/30 border border-gray-200/50 dark:border-slate-600/30 backdrop-blur-sm"
                      >
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{sub}</p>
                        <p className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer stats note */}
        <div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          {language === 'si'
            ? `${t(`results.filter.exam_${examType}`)} — නවතම විභාග ප්‍රතිඵල පෙන්වමින්`
            : `${t(`results.filter.exam_${examType}`)} — Showing latest examination results`}
        </div>
      </div>
    </div>
  );
}