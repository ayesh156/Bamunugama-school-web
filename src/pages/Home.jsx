import { ArrowRight, BookOpen, Users, Trophy, Star, FlaskConical, Laptop, Sprout, Award, Apple, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { schoolProfile } from '../data/mockData';

const newsItems = [
  {
    id: 1,
    titleKey: 'home.news.item1.title',
    excerptKey: 'home.news.item1.excerpt',
    image: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=600&h=400&fit=crop',
    date: '2026-06-15',
  },
  {
    id: 2,
    titleKey: 'home.news.item2.title',
    excerptKey: 'home.news.item2.excerpt',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
    date: '2026-05-28',
  },
  {
    id: 3,
    titleKey: 'home.news.item3.title',
    excerptKey: 'home.news.item3.excerpt',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop',
    date: '2026-05-10',
  },
];

// Stats driven by schoolProfile.stats from centralized data
const stats = [
  { icon: Users, value: schoolProfile.stats.students.value, labelKey: schoolProfile.stats.students.label, labelKeySi: schoolProfile.stats.students.label_si },
  { icon: BookOpen, value: schoolProfile.stats.teachers.value, labelKey: schoolProfile.stats.teachers.label, labelKeySi: schoolProfile.stats.teachers.label_si },
  { icon: Trophy, value: schoolProfile.stats.awards.value, labelKey: schoolProfile.stats.awards.label, labelKeySi: schoolProfile.stats.awards.label_si },
  { icon: Star, value: schoolProfile.stats.clubs.value, labelKey: schoolProfile.stats.clubs.label, labelKeySi: schoolProfile.stats.clubs.label_si },
];

const snapshotItems = [
  {
    icon: FlaskConical,
    titleKey: 'home.snapshot.lab.title',
    descKey: 'home.snapshot.lab.desc',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Laptop,
    titleKey: 'home.snapshot.digital.title',
    descKey: 'home.snapshot.digital.desc',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Sprout,
    titleKey: 'home.snapshot.agriculture.title',
    descKey: 'home.snapshot.agriculture.desc',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Award,
    titleKey: 'home.snapshot.medals.title',
    descKey: 'home.snapshot.medals.desc',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Apple,
    titleKey: 'home.snapshot.nutrition.title',
    descKey: 'home.snapshot.nutrition.desc',
    gradient: 'from-rose-500 to-red-500',
  },
  {
    icon: Landmark,
    titleKey: 'home.snapshot.heritage.title',
    descKey: 'home.snapshot.heritage.desc',
    gradient: 'from-gold-600 to-yellow-600',
  },
];

export default function Home() {
  const { t, language } = useLanguage();
  const isSi = language === 'si';

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&h=1080&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-500 border border-gold-500/30 mb-6">
              {isSi ? schoolProfile.hero.badge_si : schoolProfile.hero.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
              {isSi ? schoolProfile.hero.titleLine1_si : schoolProfile.hero.titleLine1}
              <br />
              <span className="text-gold-500">{isSi ? schoolProfile.hero.titleLine2_si : schoolProfile.hero.titleLine2}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 font-bold mb-2" lang="si">
              {t('home.hero.motto')}
            </p>
            <p className="text-base sm:text-lg text-gray-300 mb-2 italic">
              {t('home.hero.motto_eng')}
            </p>
            <p className="text-sm text-gray-400 mb-8">
              {isSi ? schoolProfile.hero.address_si : schoolProfile.hero.address}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/about"
                className="px-8 py-3 rounded-full bg-gold-500 hover:bg-gold-500/90 text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                {isSi ? schoolProfile.hero.explore_si : schoolProfile.hero.explore}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 font-medium"
              >
                {isSi ? schoolProfile.hero.contactBtn_si : schoolProfile.hero.contactBtn}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-white/60" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.labelKey}
                className="glassmorphism rounded-2xl p-6 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                  {isSi ? stat.labelKeySi : stat.labelKey}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Current Snapshot & Achievements Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-500 dark:text-accent-400">
              {t('home.snapshot.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mt-2">
              {t('home.snapshot.title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
              {t('home.snapshot.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snapshotItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.titleKey}
                  className="group relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 card-hover animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`} />

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=400&h=500&fit=crop"
                  alt="Principal"
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gold-500 flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-gray-900">25+</span>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-500 dark:text-accent-400">
                {t('home.principal.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-6">
                {t('home.principal.title')}
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {t('home.principal.para1')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {t('home.principal.para2')}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{isSi ? schoolProfile.principal.name_si : schoolProfile.principal.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{isSi ? schoolProfile.principal.role_si : schoolProfile.principal.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-500 dark:text-accent-400">
              {t('home.news.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mt-2">
              {t('home.news.title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
              {t('home.news.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <article
                key={item.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(item.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {t(item.excerptKey)}
                  </p>
                  <button className="mt-4 text-sm font-medium text-accent-500 dark:text-accent-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors flex items-center gap-1 cursor-pointer">
                    {t('home.news.read_more')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}