import { useState } from 'react';
import { BarChart3, Users, GraduationCap, BookOpen, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ─── 3 Primary National Exam 6-Year Performance Data ───

const scholarshipTrends = [
  { year: '2020', sat: 49, passed: 2, pct: 6 },
  { year: '2021', sat: 52, passed: 6, pct: 4 },
  { year: '2022', sat: 34, passed: 6, pct: 18 },
  { year: '2023', sat: 42, passed: 7, pct: 17 },
  { year: '2024', sat: 44, passed: 5, pct: 11 },
  { year: '2025', sat: 48, passed: 6, pct: 10 },
];

const olTrends = [
  { year: '2020', sat: 35, passed: 32, pct: 91 },
  { year: '2021', sat: 39, passed: 35, pct: 90 },
  { year: '2022', sat: 26, passed: 24, pct: 92 },
  { year: '2023', sat: 43, passed: 36, pct: 84 },
  { year: '2024', sat: 38, passed: 34, pct: 90 },
  { year: '2025', sat: 38, passed: 28, pct: 74 },
];

const alTrends = [
  { year: '2020', sat: 9, passed: 5, pct: 55 },
  { year: '2021', sat: 13, passed: 6, pct: 46 },
  { year: '2022', sat: 17, passed: 10, pct: 59 },
  { year: '2023', sat: 6, passed: 1, pct: 33 },
  { year: '2024', sat: 4, passed: 1, pct: 25 },
  { year: '2025', sat: 8, passed: 3, pct: 38 },
];

const examTrendsMap = {
  scholarship: scholarshipTrends,
  ol: olTrends,
  al: alTrends,
};

// ─── School Grade Statistics / Enrollment Analytics ───

const primaryGrades = [
  { grade: '1', female: 14, male: 15, total: 29 },
  { grade: '2', female: 19, male: 17, total: 36 },
  { grade: '3A', female: 9, male: 15, total: 24 },
  { grade: '3B', female: 9, male: 13, total: 22 },
  { grade: '4', female: 15, male: 10, total: 25 },
  { grade: '5A', female: 13, male: 10, total: 23 },
  { grade: '5B', female: 13, male: 10, total: 23 },
];

const primaryTotals = { female: 92, male: 90, total: 182 };

const secondaryGrades = [
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
];

const secondaryTotals = { female: 147, male: 153, total: 300 };

export default function Results() {
  const { t, language } = useLanguage();
  const [examType, setExamType] = useState('scholarship');
  const [activeView, setActiveView] = useState('trends'); // 'trends' or 'grade_stats'

  const getTrendData = () => examTrendsMap[examType] || [];

  // ─── Exam label helper ───
  const examLabelKey = () => {
    if (examType === 'scholarship') return 'results.trends.scholarship';
    if (examType === 'ol') return 'results.trends.ol';
    return 'results.trends.al';
  };

  // ─── Percentage badge ───
  const pctBadge = (pct) => {
    if (pct >= 80) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
          {pct}%
        </span>
      );
    }
    if (pct >= 50) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          {pct}%
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20">
        {pct}%
      </span>
    );
  };

  // ─── Visual bar ───
  const pctBar = (pct) => (
    <div className="flex items-center gap-1.5 justify-center">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-6 rounded-sm transition-all duration-300 ${
            i < Math.round(pct / 10)
              ? pct >= 80
                ? 'bg-emerald-500'
                : pct >= 50
                ? 'bg-amber-500'
                : 'bg-red-500'
              : 'bg-gray-200 dark:bg-slate-600'
          }`}
        />
      ))}
      <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">/10</span>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Header ─── */}
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
                {/* View Mode Toggle */}
                <div className="flex rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800/80 shadow-sm">
                  <button
                    onClick={() => setActiveView('trends')}
                    className={`px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200 ${
                      activeView === 'trends'
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    {t('results.view_trends')}
                  </button>
                  <button
                    onClick={() => setActiveView('grade_stats')}
                    className={`px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors duration-200 ${
                      activeView === 'grade_stats'
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    {t('results.grade_stats.view_stats')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Exam Filter Row (only when trends view is active) ─── */}
        {activeView === 'trends' && (
          <div className="mb-8 p-4 sm:p-6 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-white/20 dark:border-slate-700/30 shadow-lg backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Exam Type selector */}
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full pl-10 pr-8 p-3 h-12 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-sm text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all duration-200 cursor-pointer"
                >
                  <option value="scholarship">{t('results.filter.exam_scholarship')}</option>
                  <option value="ol">{t('results.filter.exam_ol')}</option>
                  <option value="al">{t('results.filter.exam_al')}</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Info badge */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 md:col-span-2">
                <Activity className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {t('results.trends.subtitle')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
           VIEW 1: TRENDS (Performance table for 3 national exams)
           ═══════════════════════════════════════════════════════════════ */}
        {activeView === 'trends' && (
          <div className="animate-fade-in">
            {/* Trends header */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                <BarChart3 className="w-3.5 h-3.5" />
                {t('results.trends.badge')}
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {t('results.trends.title')}
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
                {t(examLabelKey())} — {t('results.trends.subtitle')}
              </p>
            </div>

            {/* Glassmorphic Trends Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200/70 dark:border-slate-700/40 bg-gray-50/60 dark:bg-slate-800/40">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {t('results.trends.year')}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {t('results.trends.sat')}
                      {language === 'si' && (
                        <span className="block text-[10px] font-normal text-gray-400 mt-0.5">පෙනී සිටි</span>
                      )}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {t('results.trends.passed')}
                      {language === 'si' && (
                        <span className="block text-[10px] font-normal text-gray-400 mt-0.5">සමත්</span>
                      )}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {t('results.trends.percentage')}
                      {language === 'si' && (
                        <span className="block text-[10px] font-normal text-gray-400 mt-0.5">ප්‍රතිශතය</span>
                      )}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Visual
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/70 dark:divide-slate-700/30">
                  {getTrendData().map((row) => (
                    <tr key={row.year} className="group transition-colors duration-150 hover:bg-gray-50/50 dark:hover:bg-slate-700/20">
                      <td className="px-6 py-4">
                        <span className="font-bold text-gray-900 dark:text-gray-100">{row.year}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{row.sat}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{row.passed}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {pctBadge(row.pct)}
                      </td>
                      <td className="px-6 py-4">
                        {pctBar(row.pct)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {(() => {
                const data = getTrendData();
                const totalSat = data.reduce((s, r) => s + r.sat, 0);
                const totalPassed = data.reduce((s, r) => s + r.passed, 0);
                const avgPct = Math.round(data.reduce((s, r) => s + r.pct, 0) / data.length);
                const bestYear = data.reduce((best, r) => (r.pct > best.pct ? r : best), data[0]);
                return (
                  <>
                    <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-gray-200/50 dark:border-slate-700/30 backdrop-blur-sm text-center">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('results.trends.sat')}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalSat}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-gray-200/50 dark:border-slate-700/30 backdrop-blur-sm text-center">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('results.trends.percentage')}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{avgPct}%</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-gray-200/50 dark:border-slate-700/30 backdrop-blur-sm text-center">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Best Year</p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{bestYear.year} ({bestYear.pct}%)</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
           VIEW 2: GRADE STATISTICS (Enrollment Analytics)
           ═══════════════════════════════════════════════════════════════ */}
        {activeView === 'grade_stats' && (
          <div className="animate-fade-in">
            {/* Stats header */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                <GraduationCap className="w-3.5 h-3.5" />
                {t('results.grade_stats.badge')}
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {t('results.grade_stats.title')}
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
                {t('results.grade_stats.subtitle')}
              </p>
            </div>

            {/* Two-column grid: Primary | Secondary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ─── PRIMARY SECTION ─── */}
              <div className="rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 border-b border-gray-200/70 dark:border-slate-700/40">
                  <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {t('results.grade_stats.primary')}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200/70 dark:border-slate-700/40 bg-gray-50/60 dark:bg-slate-800/40">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {t('results.grade_stats.grade')}
                          {language === 'si' && <span className="block text-[10px] font-normal text-gray-400">ශ්‍රේණිය</span>}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {t('results.grade_stats.female')}
                          {language === 'si' && <span className="block text-[10px] font-normal text-gray-400">ගැහැණු</span>}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {t('results.grade_stats.male')}
                          {language === 'si' && <span className="block text-[10px] font-normal text-gray-400">පිරිමි</span>}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {t('results.grade_stats.total')}
                          {language === 'si' && <span className="block text-[10px] font-normal text-gray-400">එකතුව</span>}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100/70 dark:divide-slate-700/30">
                      {primaryGrades.map((row) => (
                        <tr key={row.grade} className="transition-colors duration-150 hover:bg-gray-50/50 dark:hover:bg-slate-700/20">
                          <td className="px-4 py-3">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">Grade {row.grade}</span>
                          </td>
                          <td className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">{row.female}</td>
                          <td className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">{row.male}</td>
                          <td className="px-4 py-3 text-center font-bold text-gray-900 dark:text-gray-100">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-emerald-500/10 dark:bg-emerald-500/20 border-t-2 border-emerald-400/30 dark:border-emerald-500/30">
                        <td className="px-4 py-4 text-left font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider text-xs">
                          {t('results.grade_stats.total')}
                        </td>
                        <td className="px-4 py-4 text-center font-bold text-emerald-700 dark:text-emerald-300 text-lg">{primaryTotals.female}</td>
                        <td className="px-4 py-4 text-center font-bold text-emerald-700 dark:text-emerald-300 text-lg">{primaryTotals.male}</td>
                        <td className="px-4 py-4 text-center font-bold text-emerald-700 dark:text-emerald-300 text-lg">{primaryTotals.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* ─── SECONDARY SECTION ─── */}
              <div className="rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 border-b border-gray-200/70 dark:border-slate-700/40">
                  <h3 className="text-base font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {t('results.grade_stats.secondary')}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200/70 dark:border-slate-700/40 bg-gray-50/60 dark:bg-slate-800/40">
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {t('results.grade_stats.grade')}
                          {language === 'si' && <span className="block text-[10px] font-normal text-gray-400">ශ්‍රේණිය</span>}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {t('results.grade_stats.female')}
                          {language === 'si' && <span className="block text-[10px] font-normal text-gray-400">ගැහැණු</span>}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {t('results.grade_stats.male')}
                          {language === 'si' && <span className="block text-[10px] font-normal text-gray-400">පිරිමි</span>}
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {t('results.grade_stats.total')}
                          {language === 'si' && <span className="block text-[10px] font-normal text-gray-400">එකතුව</span>}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100/70 dark:divide-slate-700/30">
                      {secondaryGrades.map((row) => (
                        <tr key={row.grade} className="transition-colors duration-150 hover:bg-gray-50/50 dark:hover:bg-slate-700/20">
                          <td className="px-4 py-3">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">Grade {row.grade}</span>
                          </td>
                          <td className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">{row.female}</td>
                          <td className="px-4 py-3 text-center font-medium text-gray-700 dark:text-gray-300">{row.male}</td>
                          <td className="px-4 py-3 text-center font-bold text-gray-900 dark:text-gray-100">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-blue-500/10 dark:bg-blue-500/20 border-t-2 border-blue-400/30 dark:border-blue-500/30">
                        <td className="px-4 py-4 text-left font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider text-xs">
                          {t('results.grade_stats.total')}
                        </td>
                        <td className="px-4 py-4 text-center font-bold text-blue-700 dark:text-blue-300 text-lg">{secondaryTotals.female}</td>
                        <td className="px-4 py-4 text-center font-bold text-blue-700 dark:text-blue-300 text-lg">{secondaryTotals.male}</td>
                        <td className="px-4 py-4 text-center font-bold text-blue-700 dark:text-blue-300 text-lg">{secondaryTotals.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* ─── Grand Total Bar ─── */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 dark:from-amber-500/20 dark:via-yellow-500/20 dark:to-amber-500/20 border border-amber-400/30 dark:border-amber-500/30 shadow-lg backdrop-blur-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
                {language === 'si' ? 'මුළු එකතුව' : 'Grand Total'}
              </p>
              <div className="flex items-center justify-center gap-10 flex-wrap">
                <div>
                  <p className="text-sm text-amber-600 dark:text-amber-400">{language === 'si' ? 'ගැහැණු' : 'Female'}</p>
                  <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                    {primaryTotals.female + secondaryTotals.female}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-amber-600 dark:text-amber-400">{language === 'si' ? 'පිරිමි' : 'Male'}</p>
                  <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                    {primaryTotals.male + secondaryTotals.male}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-amber-600 dark:text-amber-400">{language === 'si' ? 'එකතුව' : 'Total'}</p>
                  <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                    {primaryTotals.total + secondaryTotals.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}