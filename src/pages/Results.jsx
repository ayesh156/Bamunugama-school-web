import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, Award, BookOpen, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Mock data — replace with real API data in production
const mockResults = [
  { id: 1, indexNo: '2024001', name: 'Supun Perera', grade: 'Grade 10', className: 'Class A', term: 'First Term', subjects: { Sinhala: 85, English: 78, Mathematics: 92, Science: 88, History: 74, Buddhism: 90, ICT: 95, Geography: 80 }, status: 'pass' },
  { id: 2, indexNo: '2024002', name: 'Dilani Rathnayake', grade: 'Grade 10', className: 'Class A', term: 'First Term', subjects: { Sinhala: 92, English: 88, Mathematics: 76, Science: 91, History: 85, Buddhism: 94, ICT: 80, Geography: 87 }, status: 'pass' },
  { id: 3, indexNo: '2024003', name: 'Kavindu Silva', grade: 'Grade 10', className: 'Class A', term: 'First Term', subjects: { Sinhala: 64, English: 71, Mathematics: 55, Science: 60, History: 68, Buddhism: 73, ICT: 82, Geography: 58 }, status: 'pass' },
  { id: 4, indexNo: '2024004', name: 'Nadeesha Kumari', grade: 'Grade 10', className: 'Class B', term: 'First Term', subjects: { Sinhala: 95, English: 90, Mathematics: 97, Science: 93, History: 88, Buddhism: 96, ICT: 98, Geography: 91 }, status: 'pass' },
  { id: 5, indexNo: '2024005', name: 'Tharindu Jayasuriya', grade: 'Grade 10', className: 'Class B', term: 'First Term', subjects: { Sinhala: 45, English: 52, Mathematics: 38, Science: 41, History: 55, Buddhism: 60, ICT: 50, Geography: 48 }, status: 'fail' },
  { id: 6, indexNo: '2024006', name: 'Sanduni Madhushika', grade: 'Grade 11', className: 'Class A', term: 'First Term', subjects: { Sinhala: 88, English: 82, Mathematics: 79, Science: 85, History: 76, Buddhism: 87, ICT: 91, Geography: 83 }, status: 'pass' },
  { id: 7, indexNo: '2024007', name: 'Ravindu Lakshan', grade: 'Grade 11', className: 'Class A', term: 'First Term', subjects: { Sinhala: 72, English: 68, Mathematics: 80, Science: 74, History: 70, Buddhism: 78, ICT: 85, Geography: 77 }, status: 'pass' },
  { id: 8, indexNo: '2024008', name: 'Oshadi Himasha', grade: 'Grade 11', className: 'Class B', term: 'First Term', subjects: { Sinhala: 96, English: 93, Mathematics: 99, Science: 97, History: 91, Buddhism: 98, ICT: 100, Geography: 94 }, status: 'pass' },
  { id: 9, indexNo: '2024009', name: 'Chamindu Vidushan', grade: 'Grade 11', className: 'Class B', term: 'First Term', subjects: { Sinhala: 38, English: 42, Mathematics: 30, Science: 35, History: 44, Buddhism: 50, ICT: 40, Geography: 36 }, status: 'fail' },
  { id: 10, indexNo: '2024010', name: 'Dulani Nisansala', grade: 'Grade 9', className: 'Class A', term: 'First Term', subjects: { Sinhala: 78, English: 74, Mathematics: 82, Science: 80, History: 71, Buddhism: 84, ICT: 76, Geography: 79 }, status: 'pass' },
  { id: 11, indexNo: '2024011', name: 'Kasun Madusanka', grade: 'Grade 9', className: 'Class A', term: 'Second Term', subjects: { Sinhala: 81, English: 77, Mathematics: 86, Science: 83, History: 75, Buddhism: 85, ICT: 88, Geography: 82 }, status: 'pass' },
  { id: 12, indexNo: '2024012', name: 'Lahiru Prabath', grade: 'Grade 9', className: 'Class B', term: 'Second Term', subjects: { Sinhala: 56, English: 63, Mathematics: 48, Science: 52, History: 60, Buddhism: 65, ICT: 70, Geography: 55 }, status: 'fail' },
  { id: 13, indexNo: '2024013', name: 'Thilini Sachithra', grade: 'Grade 8', className: 'Class A', term: 'Second Term', subjects: { Sinhala: 88, English: 85, Mathematics: 80, Science: 87, History: 82, Buddhism: 90, ICT: 84, Geography: 81 }, status: 'pass' },
  { id: 14, indexNo: '2024014', name: 'Prasad Alwis', grade: 'Grade 8', className: 'Class A', term: 'Second Term', subjects: { Sinhala: 70, English: 66, Mathematics: 74, Science: 68, History: 65, Buddhism: 72, ICT: 78, Geography: 69 }, status: 'pass' },
  { id: 15, indexNo: '2024015', name: 'Harshani Madumali', grade: 'Grade 8', className: 'Class B', term: 'Second Term', subjects: { Sinhala: 93, English: 89, Mathematics: 91, Science: 94, History: 86, Buddhism: 92, ICT: 96, Geography: 88 }, status: 'pass' },
  { id: 16, indexNo: '2024016', name: 'Nuwan Pradeep', grade: 'Grade 7', className: 'Class A', term: 'Second Term', subjects: { Sinhala: 75, English: 70, Mathematics: 68, Science: 72, History: 67, Buddhism: 77, ICT: 73, Geography: 71 }, status: 'pass' },
  { id: 17, indexNo: '2024017', name: 'Sachini Navodya', grade: 'Grade 7', className: 'Class A', term: 'Third Term', subjects: { Sinhala: 97, English: 95, Mathematics: 94, Science: 96, History: 92, Buddhism: 99, ICT: 97, Geography: 93 }, status: 'pass' },
  { id: 18, indexNo: '2024018', name: 'Dinesh Fernando', grade: 'Grade 7', className: 'Class B', term: 'Third Term', subjects: { Sinhala: 42, English: 48, Mathematics: 35, Science: 40, History: 47, Buddhism: 52, ICT: 44, Geography: 39 }, status: 'fail' },
  { id: 19, indexNo: '2024019', name: 'Upeksha Dilhani', grade: 'Grade 6', className: 'Class A', term: 'Third Term', subjects: { Sinhala: 86, English: 84, Mathematics: 78, Science: 82, History: 79, Buddhism: 88, ICT: 90, Geography: 85 }, status: 'pass' },
  { id: 20, indexNo: '2024020', name: 'Vishwa Chamara', grade: 'Grade 6', className: 'Class A', term: 'Third Term', subjects: { Sinhala: 63, English: 59, Mathematics: 67, Science: 61, History: 58, Buddhism: 66, ICT: 72, Geography: 64 }, status: 'pass' },
];

const subjectKeys = ['Sinhala', 'English', 'Mathematics', 'Science', 'History', 'Buddhism', 'ICT', 'Geography'];

export default function Results() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [termFilter, setTermFilter] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);

  const filteredResults = useMemo(() => {
    return mockResults.filter((student) => {
      const matchSearch =
        student.indexNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGrade = !gradeFilter || student.grade === gradeFilter;
      const matchClass = !classFilter || student.className === classFilter;
      const matchTerm = !termFilter || student.term === termFilter;
      return matchSearch && matchGrade && matchClass && matchTerm;
    });
  }, [searchTerm, gradeFilter, classFilter, termFilter]);

  const grades = [...new Set(mockResults.map((r) => r.grade))];
  const classes = [...new Set(mockResults.map((r) => r.className))];
  const terms = [...new Set(mockResults.map((r) => r.term))];

  const getStatusBadge = (status, avg) => {
    if (status === 'fail') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          {t('results.badge.fail')}
        </span>
      );
    }
    if (avg >= 85) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <Award className="w-3 h-3" />
          {t('results.badge.excellent')}
        </span>
      );
    }
    if (avg >= 65) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <TrendingUp className="w-3 h-3" />
          {t('results.badge.good')}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
        {t('results.badge.pass')}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getAvgScoreColor = (avg) => {
    if (avg >= 75) return 'text-emerald-600 dark:text-emerald-400';
    if (avg >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

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
                    {mockResults.length} {t('results.table.subject')}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 shadow-sm">
                  <Users className="w-4 h-4 text-accent-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {filteredResults.length} {t('results.table.name')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section — single column on mobile, 4-col grid on desktop */}
        <div className="mb-8 p-4 sm:p-6 rounded-xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            {/* Grade Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="w-full pl-10 pr-8 p-3 h-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200 cursor-pointer"
              >
                <option value="">{t('results.filter.grade_all')}</option>
                {grades.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Class Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full pl-10 pr-8 p-3 h-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200 cursor-pointer"
              >
                <option value="">{t('results.filter.class_all')}</option>
                {classes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Term Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={termFilter}
                onChange={(e) => setTermFilter(e.target.value)}
                className="w-full pl-10 pr-8 p-3 h-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200 cursor-pointer"
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

        {/* Results Table — horizontally scrollable on mobile */}
        <div className="overflow-x-auto select-none rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="min-w-[700px] bg-white dark:bg-slate-800/80 backdrop-blur-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50/80 dark:bg-slate-800/60">
                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {t('results.table.index')}
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {t('results.table.name')}
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {t('results.filter.grade')}
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {t('results.filter.class')}
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {t('results.filter.term')}
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {t('results.table.total')}
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {t('results.table.average')}
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {t('results.table.rank')}
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {t('results.table.status')}
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    <span className="sr-only">{t('results.table.subject')}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60">
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-8 h-8 text-gray-400" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {t('results.no_results')}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((student) => {
                    const scores = Object.values(student.subjects);
                    const total = scores.reduce((a, b) => a + b, 0);
                    const avg = Math.round(total / scores.length);
                    const rank =
                      [...filteredResults]
                        .sort((a, b) => {
                          const aAvg = Math.round(Object.values(a.subjects).reduce((x, y) => x + y, 0) / Object.values(a.subjects).length);
                          const bAvg = Math.round(Object.values(b.subjects).reduce((x, y) => x + y, 0) / Object.values(b.subjects).length);
                          return bAvg - aAvg;
                        })
                        .findIndex((s) => s.id === student.id) + 1;
                    const isExpanded = expandedRow === student.id;

                    return (
                      <tr key={student.id} className="group">
                        <td className="px-4 py-3.5 whitespace-nowrap font-mono text-xs text-gray-700 dark:text-gray-300">
                          {student.indexNo}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {student.name}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-gray-600 dark:text-gray-400">
                          {student.grade}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300">
                            {student.className}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-gray-600 dark:text-gray-400">
                          {student.term}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-center font-semibold text-gray-900 dark:text-gray-100">
                          {total}/{scores.length * 100}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-center">
                          <span className={`font-bold text-lg ${getAvgScoreColor(avg)}`}>
                            {avg}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 text-sm font-bold text-gray-700 dark:text-gray-300">
                            {rank}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-center">
                          {getStatusBadge(student.status, avg)}
                        </td>
                        <td className="px-4 py-3.5 text-center">
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
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Expanded Subject Details */}
          {expandedRow !== null && (
            <div className="border-t border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/40 animate-fade-in">
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
                        className="p-3 rounded-lg bg-white dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600/50"
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
      </div>
    </div>
  );
}