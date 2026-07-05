import { Target, Eye, BookOpen, Heart, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const values = [
  {
    icon: BookOpen,
    titleKey: 'about.values.academic.title',
    descKey: 'about.values.academic.desc',
  },
  {
    icon: Heart,
    titleKey: 'about.values.character.title',
    descKey: 'about.values.character.desc',
  },
  {
    icon: Shield,
    titleKey: 'about.values.inclusive.title',
    descKey: 'about.values.inclusive.desc',
  },
  {
    icon: Sparkles,
    titleKey: 'about.values.innovation.title',
    descKey: 'about.values.innovation.desc',
  },
];

const milestones = [
  { year: '1972', titleKey: 'about.timeline.1972.title', descKey: 'about.timeline.1972.desc' },
  { year: '1985', titleKey: 'about.timeline.1985.title', descKey: 'about.timeline.1985.desc' },
  { year: '1998', titleKey: 'about.timeline.1998.title', descKey: 'about.timeline.1998.desc' },
  { year: '2010', titleKey: 'about.timeline.2010.title', descKey: 'about.timeline.2010.desc' },
  { year: '2020', titleKey: 'about.timeline.2020.title', descKey: 'about.timeline.2020.desc' },
  { year: '2026', titleKey: 'about.timeline.2026.title', descKey: 'about.timeline.2026.desc' },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1920&h=400&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 text-white border border-white/30 mb-4">
            {t('about.header.badge')}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {t('about.header.title')}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            {t('about.header.subtitle')}
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&h=450&fit=crop"
                alt="School History"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-500 dark:text-accent-400">
                {t('about.history.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-6">
                {t('about.history.title')}
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{t('about.history.para1')}</p>
                <p>{t('about.history.para2')}</p>
                <p dangerouslySetInnerHTML={{ __html: t('about.history.para3') }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motto & Vision Mission */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-2xl mb-8">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-2" lang="si">
                {t('about.motto.quote')}
              </p>
              <p className="text-lg text-gray-200 italic">
                {t('about.motto.translation')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md card-hover">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-primary-500 dark:text-primary-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('about.vision.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('about.vision.text')}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md card-hover">
              <div className="w-14 h-14 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-accent-500 dark:text-accent-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('about.mission.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('about.mission.text')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-500 dark:text-accent-400">
              {t('about.values.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mt-2">
              {t('about.values.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.titleKey}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 card-hover animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{t(value.titleKey)}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t(value.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-500 dark:text-accent-400">
              {t('about.timeline.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mt-2">
              {t('about.timeline.title')}
            </h2>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={milestone.year}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ml-10 md:ml-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md card-hover">
                        <span className="text-sm font-bold text-gold-500">{milestone.year}</span>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-1">
                          {t(milestone.titleKey)}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {t(milestone.descKey)}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-2 md:left-1/2 w-5 h-5 rounded-full bg-gold-500 border-4 border-white dark:border-gray-800 shadow-md transform -translate-x-1/2 z-10" />

                    {/* Spacer for the other side */}
                    <div className="hidden md:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-500 dark:text-accent-400">
              {t('about.org.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mt-2">
              {t('about.org.title')}
            </h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=500&fit=crop"
              alt="School Organization"
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white">{t('about.org.title')}</h3>
                <p className="text-sm text-gray-300 mt-2">{t('about.org.roles')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}