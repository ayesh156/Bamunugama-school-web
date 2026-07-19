import { useState, useRef, useEffect } from 'react';
import { Target, Eye, BookOpen, Heart, Shield, Sparkles, Maximize2, X, Play, Pause, ChevronDown, ChevronUp, GraduationCap, Building2, Leaf, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { schoolAnthemData, historicalTimeline, schoolProfile, currentStatusData } from '../data/mockData';

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

/* ------------------------------------------------------------------ */
/*  School Anthem Player – Custom HTML5 Audio with Premium UI          */
/*  Direct Google Drive download stream via export=download API         */
/*  Replaces deprecated Google Drive iframe /preview embed entirely.   */
/* ------------------------------------------------------------------ */
function AnthemPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, x / rect.width));
    const seekTime = fraction * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (t) => {
    if (!t || !isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  /* Equalizer bar animation keyframes injected once */
  const equalizerStyleId = 'anthem-equalizer-keyframes';
  if (typeof document !== 'undefined' && !document.getElementById(equalizerStyleId)) {
    const style = document.createElement('style');
    style.id = equalizerStyleId;
    style.textContent = `
      @keyframes eq-bar-1 { 0%,100% { height: 20%; } 50% { height: 90%; } }
      @keyframes eq-bar-2 { 0%,100% { height: 60%; } 50% { height: 20%; } }
      @keyframes eq-bar-3 { 0%,100% { height: 30%; } 50% { height: 80%; } }
      @keyframes eq-bar-4 { 0%,100% { height: 70%; } 50% { height: 25%; } }
      @keyframes eq-bar-5 { 0%,100% { height: 15%; } 50% { height: 75%; } }
      @keyframes eq-bar-6 { 0%,100% { height: 50%; } 50% { height: 10%; } }
    `;
    document.head.appendChild(style);
  }

  const eqAnimations = [
    'eq-bar-1 0.6s ease-in-out infinite',
    'eq-bar-2 0.5s ease-in-out infinite',
    'eq-bar-3 0.7s ease-in-out infinite',
    'eq-bar-4 0.4s ease-in-out infinite',
    'eq-bar-5 0.6s ease-in-out infinite',
    'eq-bar-6 0.5s ease-in-out infinite',
  ];

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md shadow-xl flex flex-col gap-4 mt-6">
      {/* Hidden HTML5 audio element */}
      <audio ref={audioRef} preload="metadata" src={schoolAnthemData.audioUrl} />

      {/* Track meta — localized titles + lyric string */}
      <div className="flex flex-col items-center text-center gap-1">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          {schoolAnthemData.title.en}{' '}
          <span className="text-base font-normal text-slate-500 dark:text-gray-400">
            / {schoolAnthemData.title.si}
          </span>
        </h3>
        <p className="text-sm text-slate-500 dark:text-gray-400 italic leading-relaxed" lang="si">
          {schoolAnthemData.lyrics.si[0][0]}
        </p>
      </div>

      {/* Play / Pause toggle + seeker row */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white flex items-center justify-center shadow-md dark:shadow-indigo-900/40 hover:scale-105 transition-transform flex-shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
        </button>

        {/* Seeker timeline */}
        <div
          className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden relative cursor-pointer group"
          onClick={handleSeek}
        >
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-indigo-600 rounded-lg transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-primary-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progress}% - 7px)` }}
          />
        </div>
      </div>

      {/* Time indicators */}
      <div className="flex justify-between text-xs text-slate-500 dark:text-gray-400 font-mono -mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Equalizer animation — only animated when isPlaying */}
      <div className="flex items-end justify-center gap-1 h-8 mt-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-primary-600 to-indigo-600 dark:from-primary-500 dark:to-indigo-500 transition-all duration-300"
            style={{
              height: isPlaying ? '100%' : '25%',
              animation: isPlaying ? eqAnimations[i] : 'none',
              opacity: 0.6 + i * 0.06,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main About Page                                                    */
/* ------------------------------------------------------------------ */
export default function About() {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLyricsExpanded, setIsLyricsExpanded] = useState(false);

  const anthemLyrics = schoolAnthemData.lyrics[language === 'si' ? 'si' : 'en'];

  const openLightbox = (src, title) => {
    setLightboxImage(src);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage('');
    setLightboxTitle('');
  };

  const milestones = historicalTimeline;

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
                <p dangerouslySetInnerHTML={{ __html: t('about.history.para1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('about.history.para2') }} />
                <p dangerouslySetInnerHTML={{ __html: t('about.history.para3') }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motto */}
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

          {/* Vision & Mission - Real document text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md card-hover border-l-4 border-blue-500">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-primary-500 dark:text-primary-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('about.vision.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('about.vision.text')}
              </p>
              {language === 'si' && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 italic" lang="si">
                  {t('about.vision.text_si')}
                </p>
              )}
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md card-hover border-l-4 border-rose-500">
              <div className="w-14 h-14 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-accent-500 dark:text-accent-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('about.mission.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('about.mission.text')}
              </p>
              {language === 'en' && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 italic" lang="si">
                  {t('about.mission.text_si')}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* School Anthem — Premium Audio Player */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-100 to-indigo-50 dark:from-primary-900 dark:via-primary-800 dark:to-accent-900 text-slate-800 dark:text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent-500 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-200/60 dark:bg-white/20 text-slate-700 dark:text-white border border-slate-300 dark:border-white/30 mb-4">
            {t('about.anthem.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white mt-2 mb-8">
            {t('about.anthem.title')}
          </h2>

          {/* Premium Audio Player */}
          <AnthemPlayer />

          {/* Lyrics Display — Expandable Card (left-aligned, dynamic map) */}
          <div className="mt-8 bg-white/90 dark:bg-white/10 border border-slate-200 dark:border-white/20 shadow-2xl backdrop-blur-md rounded-2xl p-8 sm:p-12">
            {/* Verse 1 — always visible */}
            <div className="space-y-3 text-left max-w-md mx-auto font-medium tracking-wide leading-relaxed" lang="si">
              {anthemLyrics[0].map((line, i) => (
                <p key={i} className="text-xl sm:text-2xl text-slate-700 dark:text-white leading-relaxed">{line}</p>
              ))}
            </div>

            {/* Verses 2 & 3 — expandable */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isLyricsExpanded ? 'max-h-[900px] opacity-100 mt-8' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-6 text-left max-w-md mx-auto font-medium tracking-wide leading-relaxed">
                {anthemLyrics.slice(1).map((verse, vIdx) => (
                  <div key={vIdx} className="space-y-3" lang="si">
                    <div className="w-12 h-0.5 bg-white/20 mx-auto" />
                    {verse.map((line, lIdx) => (
                      <p key={lIdx} className="text-xl sm:text-2xl text-slate-700 dark:text-white leading-relaxed">{line}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setIsLyricsExpanded(!isLyricsExpanded)}
              className="text-sm font-semibold tracking-wide text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors flex items-center gap-1 mx-auto mt-6"
            >
              {isLyricsExpanded
                ? language === 'si' ? 'හකුලන්න' : t('about.anthem.show_less')
                : language === 'si' ? 'සම්පූර්ණ පද මාලාව බලන්න' : t('about.anthem.show_full')}
              <span
                className={`transition-transform duration-500 ease-in-out inline-block ${
                  isLyricsExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              >
                {isLyricsExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            </button>

            {/* Bottom credit border */}
            <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/20">
              <p className="text-sm text-slate-500 dark:text-gray-300 italic">
                {t('about.anthem.note')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CURRENT STATUS SECTION (Dual-Language Grid) ==================== */}
      <section className="relative py-16 lg:py-20 bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300 ease-in-out">
        {/* Decorative top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 mb-4">
              <Sparkles className="w-3 h-3" />
              {currentStatusData.header.badge[language] || currentStatusData.header.badge.en}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-white mb-4 tracking-tight">
              {currentStatusData.header.title[language] || currentStatusData.header.title.en}
            </h2>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              {currentStatusData.header.subtitle[language] || currentStatusData.header.subtitle.en}
            </p>
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-20 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full" />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16">
            {currentStatusData.stats.map((stat, idx) => (
              <div
                key={idx}
                className="relative group p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 shadow-lg shadow-slate-200/50 dark:shadow-black/10 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 ease-out hover:-translate-y-1 text-center overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
                    {stat.label[language] || stat.label.en}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pillars grid - 2x2 masonry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {currentStatusData.pillars.map((pillar, idx) => {
              const iconMap = {
                academic: GraduationCap,
                infrastructure: Building2,
                welfare: Heart,
                environment: Leaf,
              };
              const PillarIcon = iconMap[pillar.id] || TrendingUp;

              return (
                <div
                  key={pillar.id}
                  className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 shadow-lg shadow-slate-200/50 dark:shadow-black/10 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 ease-out hover:-translate-y-1 overflow-hidden"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Background decorative gradient */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-transparent blur-2xl group-hover:from-primary-500/20 group-hover:via-accent-500/10 transition-all duration-500" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-primary-500/10 via-accent-500/5 to-transparent blur-2xl group-hover:from-primary-500/20 group-hover:via-accent-500/10 transition-all duration-500" />

                  {/* Left accent bar */}
                  <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 pl-5">
                    {/* Icon + Title row */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-400/20 dark:to-accent-400/20 flex items-center justify-center ring-1 ring-primary-200 dark:ring-primary-800/50 group-hover:ring-primary-400 dark:group-hover:ring-primary-600 transition-all duration-300">
                        <PillarIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">
                        {pillar.title[language] || pillar.title.en}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                      {pillar.description[language] || pillar.description.en}
                    </p>
                  </div>
                </div>
              );
            })}
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

                        {/* 1913 Archive Document — Google Drive Inline Image Preview */}
                        {milestone.year === '1913' && milestone.hasDocument && (
                          <div className="mt-6 space-y-4">
                            <div className="text-center space-y-1">
                              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                {t(milestone.imageDescKey)}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 italic" lang="si">
                                1913 මැයි 9 වන දින තබන ලද පාසලේ මුල්ම ලොග් සටහන
                              </p>
                            </div>
                            <div className="flex justify-center">
                              <img
                                src={milestone.docImageUrl}
                                alt={milestone.docAlt}
                                loading="lazy"
                                className="w-full max-w-xl mx-auto rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md bg-white dark:bg-slate-900 transition-transform duration-300 hover:scale-[1.01] cursor-zoom-in"
                                onClick={() => setIsLightboxOpen(true)}
                              />
                            </div>
                          </div>
                        )}
                        {/* Legacy image-based archive card for other milestones */}
                        {milestone.imageSrc && milestone.year !== '1913' && (
                          <div className="mt-4">
                            <div
                              className="w-full max-w-md mx-auto aspect-[3/1] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group/log cursor-pointer relative"
                              onClick={() => openLightbox(milestone.imageSrc, t(milestone.imageKey))}
                            >
                              <img
                                src={milestone.imageSrc}
                                alt={t(milestone.imageKey)}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/log:scale-105"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                              <div className="hidden w-full h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 items-center justify-center flex-col text-white p-4">
                                <p className="text-xs text-center opacity-70">
                                  Image placeholder — place <code className="bg-white/20 px-1 rounded">first-log-1913.png</code> in{' '}
                                  <code className="bg-white/20 px-1 rounded">public/images/</code>
                                </p>
                              </div>
                              <div className="absolute inset-0 bg-black/0 group-hover/log:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover/log:opacity-100 transition-all duration-300 flex flex-col items-center gap-1.5 translate-y-2 group-hover/log:translate-y-0">
                                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Maximize2 className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-xs font-medium text-white/90 tracking-wide">
                                    {t(milestone.viewDocKey)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
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
                <p className="text-sm text-gray-300 mt-2">{language === 'si' ? schoolProfile.organization.roles_si : schoolProfile.organization.roles}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal — Other Milestones */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/20"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] mx-4 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt={lightboxTitle}
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
              <p className="text-white text-lg font-semibold text-center">
                {lightboxTitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 1913 Document Lightbox Modal — In-App Zoom Preview */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors flex items-center justify-center text-white border border-white/20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] mx-4 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/log_document.png"
              alt="Official 1913 School Log Document"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
}