import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const { language, t } = useLanguage();
  const { darkMode } = useTheme();
  const isDark = darkMode;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 py-8 pt-24 transition-all duration-300">
      {/* ─── Animated geometric background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-400/20 via-primary-500/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-accent-400/20 via-accent-500/10 to-transparent blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-teal-400/5 blur-3xl animate-pulse" style={{ animationDelay: '0.8s' }} />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Decorative circles */}
        <div className="absolute top-[15%] right-[10%] w-16 h-16 border-2 border-primary-300/20 dark:border-primary-500/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[20%] left-[8%] w-10 h-10 border-2 border-accent-300/20 dark:border-accent-500/20 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-[40%] left-[5%] w-6 h-6 border-2 border-blue-300/20 dark:border-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      {/* ─── Glassmorphic card container ─── */}
      <div className="relative z-10 w-full max-w-2xl mx-auto my-8 md:my-12 px-4">
        <div
          className="
            w-full p-8 md:p-12 rounded-3xl text-center
            border border-slate-800 bg-slate-900/50 backdrop-blur-xl
            shadow-2xl transition-all duration-300
          "
        >
          {/* Inner glass shine */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl" />

          {/* ─── 404 Number ─── */}
          <div className="relative mb-6">
            <span
              className="text-[120px] sm:text-[150px] font-black leading-none tracking-tighter select-none"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </span>
          </div>

          {/* ─── Title ─── */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-3">
            {language === 'en' ? 'Page Not Found' : 'පිටුව සොයාගත නොහැක'}
          </h1>

          {/* ─── Divider ─── */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
            <span className="text-primary-500 text-2xl">✦</span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
          </div>

          {/* ─── Description ─── */}
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-sm mx-auto">
            {language === 'en'
              ? 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
              : 'ඔබ සොයන පිටුව ඉවත් කර තිබිය හැක, එහි නම වෙනස් කර තිබිය හැක, හෝ තාවකාලිකව ලබා ගත නොහැක.'
            }
          </p>

          {/* ─── Action Buttons ─── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="
                group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl
                font-semibold text-white text-sm tracking-wide
                bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500
                hover:from-primary-500 hover:via-primary-400 hover:to-accent-400
                shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50
                transition-all duration-300 ease-out
                hover:-translate-y-0.5
              "
            >
              {/* Button glow */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/20 to-accent-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Home className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:rotate-[-12deg]" />
              <span className="relative z-10">
                {language === 'en' ? 'Back to Home' : 'මුල් පිටුවට යන්න'}
              </span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="
                group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl
                font-medium text-sm
                text-slate-600 dark:text-slate-300
                bg-slate-100 dark:bg-slate-700/50
                hover:bg-slate-200 dark:hover:bg-slate-700
                border border-slate-200 dark:border-slate-600/50
                hover:border-slate-300 dark:hover:border-slate-500/50
                transition-all duration-300 ease-out
                hover:-translate-y-0.5
                cursor-pointer
              "
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              {language === 'en' ? 'Go Back' : 'ආපසු යන්න'}
            </button>
          </div>

          {/* ─── Quick links ─── */}
          <div className="mt-10 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 tracking-wide uppercase">
              {language === 'en' ? 'Try these pages' : 'මෙම පිටු උත්සාහ කරන්න'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { href: '/', labelEn: 'Home', labelSi: 'මුල් පිටුව' },
                { href: '/about', labelEn: 'About', labelSi: 'අපි ගැන' },
                { href: '/gallery', labelEn: 'Gallery', labelSi: 'ගැලරිය' },
                { href: '/events', labelEn: 'Events', labelSi: 'උත්සව' },
                { href: '/contact', labelEn: 'Contact', labelSi: 'සම්බන්ධ වන්න' },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="
                    inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg
                    text-xs font-medium
                    text-slate-500 dark:text-slate-400
                    bg-slate-50 dark:bg-slate-800/50
                    hover:bg-primary-50 dark:hover:bg-primary-900/20
                    hover:text-primary-600 dark:hover:text-primary-400
                    border border-slate-200/50 dark:border-slate-700/50
                    hover:border-primary-200 dark:hover:border-primary-800/50
                    transition-all duration-200
                  "
                >
                  <Search className="w-3 h-3" />
                  {language === 'en' ? link.labelEn : link.labelSi}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}