import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  Home,
  Info,
  FileText,
  Image,
  Mail,
  Calendar,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { to: '/', labelKey: 'nav.home', icon: Home },
  { to: '/about', labelKey: 'nav.about', icon: Info },
  { to: '/events', labelKey: 'nav.events', icon: Calendar },
  { to: '/results', labelKey: 'nav.results', icon: FileText },
  { to: '/gallery', labelKey: 'nav.gallery', icon: Image },
  { to: '/contact', labelKey: 'nav.contact', icon: Mail },
];

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${
      isActive
        ? 'text-accent-600 dark:text-accent-300 font-semibold'
        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-300'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary-50 dark:bg-slate-800/40 text-primary-600 dark:text-accent-400 font-semibold border-l-4 border-primary-500 dark:border-accent-500'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
    }`;

  const handleOpen = () => {
    setMobileOpen(true);
  };

  const handleClose = () => {
    setMobileOpen(false);
  };

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* ===== DESKTOP NAVBAR ===== */}
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
                onClick={mobileOpen ? handleClose : handleOpen}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== BACKDROP OVERLAY ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] md:hidden"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* ===== MOBILE SIDE DRAWER (CONDITIONALLY RENDERED) ===== */}
      {mobileOpen && (
        <div
          className="fixed top-0 left-0 z-[9999] h-full w-[80vw] max-w-[360px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col shadow-2xl md:hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Header Section: Logo on left, Language/Theme/Close on right */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
            {/* School Logo Badge */}
            <Link to="/" onClick={handleNavClick} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {t('nav.school.name')}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                  {t('nav.school.subname')}
                </p>
              </div>
            </Link>

            {/* Right-side controls row */}
            <div className="flex items-center gap-1.5">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out cursor-pointer"
                aria-label={language === 'en' ? 'Switch to Sinhala' : 'Switch to English'}
              >
                {t('nav.language.toggle')}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out cursor-pointer"
                aria-label={darkMode ? t('nav.lightmode') : t('nav.darkmode')}
              >
                {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              {/* Close X Action */}
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 ease-in-out cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-start pt-12 px-5 space-y-2 overflow-y-auto">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={handleNavClick}
                className={mobileLinkClass}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 60}ms both`,
                }}
              >
                <link.icon className="w-5 h-5 shrink-0" />
                <span>{t(link.labelKey)}</span>
              </NavLink>
            ))}
          </div>

          {/* Bottom Branding Area */}
          <div className="shrink-0 px-4 py-5 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-center text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} {t('nav.school.name')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}