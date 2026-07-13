import { useState } from 'react';
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  GraduationCap, ShieldCheck, Calendar, Award,
  Building2, Globe, School, ArrowUpRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { contactDetails, schoolProfile } from '../data/mockData';

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.form.name_error');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.email_error_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.email_error_invalid');
    }
    if (!formData.message.trim()) newErrors.message = t('contact.form.message_error');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const isSi = language === 'si';

  // Build school info cards from centralized data schemas — NO translation-key fallback.
  const schoolInfoCards = [
   
    {
      icon: MapPin,
      label: isSi ? contactDetails.address.label_si : contactDetails.address.label,
      value: isSi ? contactDetails.address.value_si : contactDetails.address.value,
    },
    {
      icon: GraduationCap,
      label: isSi ? contactDetails.principal.label_si : contactDetails.principal.label,
      value: isSi ? contactDetails.principal.value_si : contactDetails.principal.value,
    },
    {
      icon: ShieldCheck,
      label: isSi ? contactDetails.classification.label_si : contactDetails.classification.label,
      value: isSi ? contactDetails.classification.value_si : contactDetails.classification.value,
    },
    {
      icon: Calendar,
      label: isSi ? contactDetails.established.label_si : contactDetails.established.label,
      value: isSi ? contactDetails.established.value_si : contactDetails.established.value,
    },
    {
      icon: Award,
      label: isSi ? contactDetails.codes.label_si : contactDetails.codes.label,
      value: isSi ? contactDetails.codes.value_si : contactDetails.codes.value,
    },
    {
      icon: Building2,
      label: isSi ? contactDetails.administration.label_si : contactDetails.administration.label,
      value: isSi ? contactDetails.administration.value_si : contactDetails.administration.value,
    },
    {
      icon: Phone,
      label: isSi ? contactDetails.phoneLabel.label_si : contactDetails.phoneLabel.label,
      value: contactDetails.phone,
    },
    {
      icon: Mail,
      label: isSi ? contactDetails.emailLabel.label_si : contactDetails.emailLabel.label,
      value: contactDetails.email,
    },
    {
      icon: Globe,
      label: isSi ? contactDetails.websiteLabel.label_si : contactDetails.websiteLabel.label,
      value: contactDetails.website,
      isLink: true,
    },
  ];

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=400&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 text-white border border-white/30 mb-4">
            {t('contact.header.badge')}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {t('contact.header.title')}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            {t('contact.header.subtitle')}
          </p>
        </div>
      </section>

      {/* School Identity & Contact Form Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: School Identity Profile Grid */}
            <div className="lg:col-span-2 space-y-5">
              <div className="relative">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <School className="w-5 h-5 text-primary-500" />
                  <span>{isSi ? contactDetails.schoolName.value_si : contactDetails.schoolName.value}</span>
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {schoolInfoCards.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div
                        key={info.label || info.value}
                        className={`group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                          info.highlight
                            ? 'bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-100 dark:border-primary-800/30'
                            : 'bg-gray-50 dark:bg-gray-800/80 border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                            info.highlight
                              ? 'bg-gradient-to-br from-primary-500 to-accent-500 shadow-md'
                              : 'bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-500/20 dark:to-accent-500/20'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              info.highlight ? 'text-white' : 'text-primary-600 dark:text-primary-400'
                            }`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          {info.label && (
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                              {info.label}
                            </p>
                          )}
                          {info.isLink ? (
                            <a
                              href={`https://${info.value}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline inline-flex items-center gap-1 transition-colors"
                            >
                              {info.value}
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          ) : (
                            <p
                              className={`${
                                info.highlight
                                  ? 'text-base font-bold text-gray-800 dark:text-white'
                                  : 'text-sm font-semibold text-gray-700 dark:text-gray-200'
                              } break-words`}
                            >
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700/50">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {t('contact.form.submitted_title')}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                      {t('contact.form.submitted_text')}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 cursor-pointer"
                    >
                      {t('contact.form.send_another')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                      <Send className="w-5 h-5 text-primary-500" />
                      {t('contact.form.title')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          {t('contact.form.name')}{' '}
                          <span className="text-red-500">{t('contact.form.required')}</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                            errors.name
                              ? 'border-red-400 focus:ring-red-400'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                          placeholder={t('contact.form.name_placeholder')}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          {t('contact.form.email')}{' '}
                          <span className="text-red-500">{t('contact.form.required')}</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                            errors.email
                              ? 'border-red-400 focus:ring-red-400'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                          placeholder={t('contact.form.email_placeholder')}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          {t('contact.form.phone')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                          placeholder={t('contact.form.phone_placeholder')}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          {t('contact.form.subject')}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        >
                          <option value="">{t('contact.form.subject_placeholder')}</option>
                          <option value="admissions">{t('contact.form.subject_admissions')}</option>
                          <option value="general">{t('contact.form.subject_general')}</option>
                          <option value="feedback">{t('contact.form.subject_feedback')}</option>
                          <option value="complaint">{t('contact.form.subject_complaint')}</option>
                          <option value="partnership">{t('contact.form.subject_partnership')}</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                      >
                        {t('contact.form.message')}{' '}
                        <span className="text-red-500">{t('contact.form.required')}</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none ${
                          errors.message
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-slate-200 dark:border-slate-700'
                        }`}
                        placeholder={t('contact.form.message_placeholder')}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      {t('contact.form.send')}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-gray-700/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.064906502132!2d80.59037359999999!3d6.121966700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae14502c340b65f%3A0x3af2502df58b54da!2sBamunugama%20Navodya%20School!5e0!3m2!1sen!2slk!4v1783256427052!5m2!1sen!2slk"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Bamunugama Navodya School Location"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}