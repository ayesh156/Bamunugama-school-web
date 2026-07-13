import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { contactDetails, schoolProfile } from '../data/mockData';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { to: '/', labelKey: 'nav.home' },
    { to: '/about', labelKey: 'nav.about' },
    { to: '/gallery', labelKey: 'nav.gallery' },
    { to: '/contact', labelKey: 'nav.contact' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-slate-950 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-slate-800 transition-colors duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-gray-800 dark:text-white block leading-tight">
                  {t('nav.school.name')}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 block leading-tight">
                  {t('nav.school.subname')}
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-wider mb-4">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300 ease-in-out"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-wider mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent-600 dark:text-accent-400 shrink-0 transition-colors duration-300 ease-in-out" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t('contact.info.address_value').split('\n').map((line, i) => (
                    <span key={i}>{line}{i < t('contact.info.address_value').split('\n').length - 1 ? <br /> : null}</span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0 transition-colors duration-300 ease-in-out" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{contactDetails.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0 transition-colors duration-300 ease-in-out" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{contactDetails.email}</span>
              </li>
            </ul>
          </div>

          {/* School Hours */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white uppercase tracking-wider mb-4">
              {t('footer.school_hours')}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex justify-between">
                <span>{t('footer.mon_fri')}</span>
                <span>7:30 AM - 1:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.saturday')}</span>
                <span>7:30 AM - 12:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>{t('footer.sunday')}</span>
                <span className="text-gray-400 dark:text-gray-500">{t('footer.closed')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300 ease-in-out">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t('footer.design_credit')}
          </p>
        </div>
      </div>
    </footer>
  );
}