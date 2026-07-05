import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X, GraduationCap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/gallery', labelKey: 'nav.gallery' },
  { to: '/contact', labelKey: 'nav.contact' },
];

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${
      isActive
        ? 'text-accent-600 dark:text-accent-300 font-semibold'
        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-300'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-300 ease-in-out ${
      isActive
        ? 'bg-primary-50 dark:bg-primary-900/60 text-accent-600 dark:text-accent-300 font-semibold'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-slate-900/50 transition-colors duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-gray-800 dark:text-white block leading-tight">
                {t('nav.school.name')}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 block leading-tight">
                {t('nav.school.subname')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                {t(link.labelKey)}
              </NavLink>
            ))}
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-3 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out cursor-pointer"
              aria-label={language === 'en' ? 'Switch to Sinhala' : 'Switch to English'}
            >
              {t('nav.language.toggle')}
            </button>
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
              aria-label={darkMode ? t('nav.lightmode') : t('nav.darkmode')}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out cursor-pointer"
              aria-label={language === 'en' ? 'Switch to Sinhala' : 'Switch to English'}
            >
              {t('nav.language.toggle')}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
              aria-label={darkMode ? t('nav.lightmode') : t('nav.darkmode')}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg animate-slide-down transition-colors duration-300 ease-in-out">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileLinkClass}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}