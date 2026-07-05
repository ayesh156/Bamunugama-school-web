import { useState, useEffect } from 'react';
import { Calendar, Clock, Film, Play, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const eventsData = [
  {
    id: 1,
    videoId: 'bEd39JYEB1c', // Sri Lankan School Sports Meet Marching Band & Athletics
    keyPrefix: 'events.card1',
  },
  {
    id: 2,
    videoId: '1bEmkfLIGrQ', // Sri Lankan School Prize Giving Ceremony & Traditional Dancing
    keyPrefix: 'events.card2',
  },
  {
    id: 3,
    videoId: '3snQH9HnMA8', // Sri Lankan School Exhibition & Inter-School Day Events
    keyPrefix: 'events.card3',
  },
];

export default function Events() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, entry.target.dataset.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.event-card-observer').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      {/* ===== HERO HEADER ===== */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent-500/5 dark:bg-accent-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary-500/3 to-accent-500/3 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-primary-50 dark:bg-slate-800 text-primary-600 dark:text-accent-300 border border-primary-200/50 dark:border-slate-700/50 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {t('events.header.badge')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center text-slate-900 dark:text-white leading-tight mb-4 animate-fade-in">
            {t('events.header.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            {t('events.header.subtitle')}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary-400 to-transparent dark:via-primary-500" />
            <Film className="w-5 h-5 text-accent-500 dark:text-accent-400" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary-400 to-transparent dark:via-primary-500" />
          </div>
        </div>
      </section>

      {/* ===== EVENTS GRID ===== */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsData.map((event, index) => {
              const isExpanded = expandedId === event.id;
              return (
                <article
                  key={event.id}
                  data-id={event.id}
                  className={`event-card-observer group ${
                    visibleItems.includes(String(event.id))
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  } transition-all duration-700 ease-out`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="h-full bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1">
                    {/* YouTube Video Container */}
                    <div className="relative w-full aspect-video bg-slate-900 dark:bg-black rounded-t-2xl overflow-hidden">
                      {isExpanded ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${event.videoId}?autoplay=1`}
                          title={t(`${event.keyPrefix}.title`)}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/60 dark:from-black/90 dark:to-slate-900/70 flex items-center justify-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent-500/80 transition-all duration-300 ease-out group-hover:scale-110 shadow-lg">
                              <Play className="w-7 h-7 md:w-9 md:h-9 text-white ml-0.5" />
                            </div>
                          </div>
                          {/* Thumbnail */}
                          <img
                            src={`https://img.youtube.com/vi/${event.videoId}/maxresdefault.jpg`}
                            alt={t(`${event.keyPrefix}.title`)}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                          {/* Play overlay label */}
                          <button
                            onClick={() => toggleExpand(event.id)}
                            className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5 hover:bg-accent-500/80 transition-colors duration-300 cursor-pointer"
                            aria-label={`Play ${t(`${event.keyPrefix}.title`)}`}
                          >
                            <Play className="w-3 h-3" />
                            <span>{t('events.watch_video')}</span>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Content Metadata */}
                    <div className="p-5 md:p-6">
                      {/* Date badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                          <Calendar className="w-3 h-3" />
                          {t(`${event.keyPrefix}.date`)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>HD</span>
                        </span>
                      </div>

                      {/* Event Title */}
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                        {t(`${event.keyPrefix}.title`)}
                      </h3>

                      {/* Event Description */}
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {t(`${event.keyPrefix}.desc`)}
                      </p>

                      {/* Expand/Collapse Toggle */}
                      <button
                        onClick={() => toggleExpand(event.id)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-accent-400 hover:text-primary-700 dark:hover:text-accent-300 transition-colors duration-200 cursor-pointer group"
                      >
                        <span>{isExpanded ? t('events.collapse_video') : t('events.watch_highlights')}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                        ) : (
                          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA SECTION ===== */}
      <section className="relative pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary-500/5 to-accent-500/5 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />

            <Film className="w-10 h-10 mx-auto mb-4 text-accent-500 dark:text-accent-400" />
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {t('events.header.title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              {t('events.header.subtitle')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}