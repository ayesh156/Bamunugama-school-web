import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const galleryCategories = [
  {
    id: 'sports',
    label: { en: 'Sports & Athletics', si: 'ක්‍රීඩා සහ මලල ක්‍රීඩා' },
    images: [
      { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1dXwhS1JpDzVaMmrRnKYA3225JkxH07UrIz70ooewDYtV6wQ_hqFEXU&s=10', alt: { en: 'Students running on track', si: 'ධාවන පථයේ දිවෙන සිසුන්' } },
      { src: 'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=600&h=400&fit=crop', alt: { en: 'Sports day event', si: 'ක්‍රීඩා දින උත්සවය' } },
      { src: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&h=400&fit=crop', alt: { en: 'Cricket match', si: 'ක්‍රිකට් තරඟය' } },
      { src: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&h=400&fit=crop', alt: { en: 'Volleyball tournament', si: 'වොලිබෝල් තරඟාවලිය' } },
      { src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop', alt: { en: 'Athletic competition', si: 'මලල ක්‍රීඩා තරඟය' } },
      { src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop', alt: { en: 'Football practice', si: 'පාපන්දු පුහුණුව' } },
    ],
  },
  {
    id: 'classrooms',
    label: { en: 'Classrooms & Learning', si: 'පන්ති කාමර සහ ඉගෙනුම්' },
    images: [
      { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop', alt: { en: 'Modern classroom', si: 'නවීන පන්ති කාමරය' } },
      { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop', alt: { en: 'Students studying', si: 'පාඩම් කරන සිසුන්' } },
      { src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop', alt: { en: 'Computer lab', si: 'පරිගණක විද්‍යාගාරය' } },
      { src: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600&h=400&fit=crop', alt: { en: 'Science laboratory', si: 'විද්‍යා රසායනාගාරය' } },
      { src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop', alt: { en: 'Science exhibition', si: 'විද්‍යා ප්‍රදර්ශනය' } },
      { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop', alt: { en: 'Library reading session', si: 'පුස්තකාල කියවීම් සැසිය' } },
    ],
  },
  {
    id: 'events',
    label: { en: 'School Events & Culture', si: 'පාසල් උත්සව සහ සංස්කෘතිය' },
    images: [
      { src: 'https://media.istockphoto.com/id/1480277406/photo/graduation-group-and-back-view-of-students-celebrate-education-success-behind-of-excited.jpg?s=612x612&w=0&k=20&c=KRfzU9eeBsUdCNUXQSIx4yf6O2PlMD9XvckFgx-hndc=', alt: { en: 'Graduation ceremony', si: 'උපාධි ප්‍රදානෝත්සවය' } },
      { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', alt: { en: 'Cultural event', si: 'සංස්කෘතික උත්සවය' } },
      { src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop', alt: { en: 'Annual festival', si: 'වාර්ෂික උත්සවය' } },
      { src: 'https://t4.ftcdn.net/jpg/08/88/09/21/360_F_888092109_NgbtxV6c2Ms2Ea9r6wfTQavMQ4IxDFkz.jpg', alt: { en: 'Music performance', si: 'සංගීත ප්‍රදර්ශනය' } },
      { src: 'https://www.shutterstock.com/editorial/image-editorial/M5TaA4x7NbD1gaycMzg4MDY=/sri-lankan-school-children-viewing-paintings-during-440nw-10070753b.jpg', alt: { en: 'Art exhibition', si: 'චිත්‍ර ප්‍රදර්ශනය' } },
      { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop', alt: { en: 'School assembly', si: 'පාසල් රැස්වීම' } },
    ],
  },
];

export default function Gallery() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('sports');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentCategory = galleryCategories.find((c) => c.id === activeCategory);
  const allImages = currentCategory?.images || [];

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevImage(e);
    if (e.key === 'ArrowRight') nextImage(e);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 ease-in-out">
      {/* ==================== PAGE HEADER ==================== */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&h=400&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 backdrop-blur-[2px]" />
        </div>
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-white/10 text-white border border-white/20 backdrop-blur-md mb-5 shadow-lg shadow-white/5">
            <Sparkles className="w-3.5 h-3.5" />
            {t('gallery.header.badge')}
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-5 tracking-tight">
            <span className="bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
              {t('gallery.header.title')}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            {t('gallery.header.subtitle')}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* ==================== CATEGORY FILTERS ==================== */}
      <section className="py-10 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-16 z-30 transition-colors duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {galleryCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out cursor-pointer
                    ${
                      isActive
                        ? 'text-white shadow-xl shadow-primary-500/30 scale-105'
                        : 'text-slate-800 dark:text-white bg-white dark:bg-slate-800 shadow-md dark:shadow-slate-900/50 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {/* Active background with glassmorphism */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-accent-500 shadow-lg shadow-primary-500/30 animate-gradient-x" />
                  )}
                  {/* Glow ring */}
                  {isActive && (
                    <span className="absolute -inset-[2px] rounded-full border border-white/30 animate-pulse" />
                  )}
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 ease-in-out">
                    {isActive && <Sparkles className="w-3.5 h-3.5 animate-pulse" />}
                    {category.label[language] || category.label.en}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== GALLERY GRID ==================== */}
      <section className="py-16 pb-24 bg-white dark:bg-slate-900 transition-colors duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allImages.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-slate-600 dark:text-slate-400 text-lg transition-colors duration-300 ease-in-out">No images in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {allImages.map((image, index) => {
                const altText = image.alt[language] || image.alt.en;
                return (
                  <div
                    key={index}
                    className="
                      group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800
                      shadow-md hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5
                      transition-all duration-500 ease-out cursor-pointer
                      hover:-translate-y-1 hover:scale-[1.02]
                    "
                    style={{ animationDelay: `${index * 0.08}s` }}
                    onClick={() => openModal(index)}
                    onKeyDown={(e) => e.key === 'Enter' && openModal(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${altText}`}
                  >
                    {/* Image container */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image.src}
                        alt={altText}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-[2deg]"
                        loading="lazy"
                      />
                    </div>

                    {/* Gradient overlay (full on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />

                    {/* Bottom caption slide-up */}
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center ring-1 ring-white/30">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium leading-snug line-clamp-2">
                            {altText}
                          </p>
                          {language === 'si' && image.alt.en && (
                            <p className="text-white/60 text-xs mt-1 line-clamp-1">
                              {image.alt.en}
                            </p>
                          )}
                          {language === 'en' && image.alt.si && (
                            <p className="text-white/60 text-xs mt-1 line-clamp-1">
                              {image.alt.si}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Index badge */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-[10px] font-bold">{index + 1}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ==================== IMAGE PREVIEW MODAL ==================== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 cursor-pointer z-20 backdrop-blur-md border border-white/10 hover:border-white/30 hover:scale-110"
            aria-label={t('gallery.modal.close')}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous button */}
          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 cursor-pointer z-20 backdrop-blur-md border border-white/10 hover:border-white/30 hover:scale-110 hover:shadow-xl"
            aria-label={t('gallery.modal.previous')}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Image container */}
          <div className="max-w-5xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <img
                src={allImages[currentImageIndex]?.src}
                alt={allImages[currentImageIndex]?.alt?.[language] || allImages[currentImageIndex]?.alt?.en || ''}
                className="w-full h-full max-h-[70vh] object-contain bg-black/40"
              />
            </div>
            <div className="text-center mt-5 space-y-2">
              <p className="text-white/90 text-base sm:text-lg font-medium">
                {allImages[currentImageIndex]?.alt?.[language] || allImages[currentImageIndex]?.alt?.en}
              </p>
              <p className="text-white/40 text-sm tracking-wide">
                {currentImageIndex + 1} <span className="text-white/20 mx-2">/</span> {allImages.length}
              </p>
              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-3">
                {allImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex
                        ? 'w-8 bg-primary-400'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 cursor-pointer z-20 backdrop-blur-md border border-white/10 hover:border-white/30 hover:scale-110 hover:shadow-xl"
            aria-label={t('gallery.modal.next')}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </div>
  );
}