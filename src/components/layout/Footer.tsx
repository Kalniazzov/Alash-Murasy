import React from 'react';
import { ChevronUp, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';

export interface AcademicReference {
  nameKz: string;
  nameEn: string;
  url: string;
  descKz: string;
  descEn: string;
}

export const ACADEMIC_SOURCES: AcademicReference[] = [
  {
    nameKz: 'ҚР Орталық мемлекеттік архиві (ЦГА РК)',
    nameEn: 'Central State Archive of the Republic of Kazakhstan (CGA RK)',
    url: 'https://cga-rk.kz',
    descKz: 'Түпнұсқа петициялар мен басылымдар қоры',
    descEn: 'Original petitions & period press files',
  },
  {
    nameKz: 'Ш.Ш. Уәлиханов атындағы Тарих және этнология институты',
    nameEn: 'Ch. Valikhanov Institute of History and Ethnology',
    url: 'https://iie.kz',
    descKz: 'Академиялық зерттеулер, құжаттар жинағы',
    descEn: 'Academic research & documentary collections',
  },
  {
    nameKz: '«Қазақстан тарихы» ғылыми-ағартушылық порталы',
    nameEn: 'Portal "History of Kazakhstan"',
    url: 'https://e-history.kz',
    descKz: 'Алаш хроникасы және тұлғалар мақалалары',
    descEn: 'Alash chronicles & scholarly articles',
  },
  {
    nameKz: 'Қазақстан Республикасының Ұлттық архиві',
    nameEn: 'National Archives of the Republic of Kazakhstan',
    url: 'https://www.ulttyqarhiv.kz',
    descKz: 'Ресми мемлекеттік мұрағат қоры',
    descEn: 'Official state archival repository',
  },
];

export interface FooterProps {
  onBackToTop?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  const { language, setLanguage, t } = useLanguage();
  const isKz = language === 'kz';

  const scrollToTop = () => {
    if (onBackToTop) {
      onBackToTop();
    } else if (typeof window !== 'undefined') {
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el && typeof el.scrollIntoView === 'function') {
      try {
        el.scrollIntoView({ behavior: 'smooth' });
      } catch {
        el.scrollIntoView();
      }
    }
  };

  return (
    <footer
      id="footer"
      role="contentinfo"
      className="bg-forest-ink text-warm-ivory border-t border-soft-line/40 relative overflow-hidden pb-20 md:pb-0"
    >
      {/* Decorative Kazakh Frieze Crown */}
      <KazakhOrnament
        variant="border-band"
        size={14}
        color="#B18A52"
        className="opacity-40"
      />

      {/* Alash Motto Banner */}
      <div className="border-b border-soft-line/20 py-10 px-4 sm:px-6 lg:px-8 text-center bg-black/15">
        <div className="max-w-4xl mx-auto">
          <KazakhOrnament variant="seal" size={36} color="#B18A52" className="mx-auto mb-3" />
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl italic text-warm-ivory leading-relaxed">
            {t('footer.motto', isKz ? '«Алаш туы астында, күн сөнгенше сөнбейміз!»' : '"Under the banner of Alash, our flame shall never fade!"')}
          </blockquote>
          <cite className="block mt-2 font-mono text-xs sm:text-sm text-muted-gold uppercase tracking-wider not-italic">
            {t('footer.motto_sub', isKz ? '— Сұлтанмахмұт Торайғыров' : '— Sultanmakhmut Toraighyrov')}
          </cite>
          <p className="font-serif text-sm text-warm-ivory/70 mt-3 italic">
            {t('footer.reflection_title', isKz ? '«Өткенді тану — болашақты түсінудің бастауы.»' : '"Understanding the past is the beginning of understanding the future."')}
          </p>
        </div>
      </div>

      {/* Main 4-Column Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Project Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <KazakhOrnament variant="seal" size={28} color="#B18A52" />
              <span className="font-serif font-bold text-xl tracking-wider uppercase text-warm-ivory">
                {t('brand.title', isKz ? 'АЛАШ МҰРАСЫ' : 'ALASH HERITAGE')}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-warm-ivory/75 leading-relaxed">
              {t(
                'footer.desc',
                isKz
                  ? '«Алаш мұрасы» — ХХ ғасыр басындағы қазақ зиялыларының мұрасын сақтау мен танытуға арналған білім беру цифрлық интерактивті музейі.'
                  : '"Alash Heritage" is an educational interactive digital museum dedicated to preserving and exploring the legacy of early 20th century Kazakh intellectuals.'
              )}
            </p>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 bg-warm-ivory/10 border border-soft-line/30 rounded font-mono text-[11px] text-muted-gold tracking-widest uppercase">
                ЦИФРЛЫҚ МҰРАҒАТ · 2026
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Sitemap */}
          <div>
            <h4 className="font-serif font-bold text-base uppercase tracking-wider text-muted-gold mb-4 border-b border-soft-line/20 pb-2">
              {t('footer.sections_title', isKz ? 'Бөлімдер' : 'Sections')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              {[
                { href: '#timeline', kz: 'Уақыт сызығы (1905–1920)', en: 'Timeline (1905–1920)' },
                { href: '#figures', kz: 'Алаш қайраткерлері', en: 'Prominent Figures' },
                { href: '#press', kz: '«Айқап» және «Қазақ»', en: 'Press Archive' },
                { href: '#map', kz: 'Интерактивті карта', en: 'Historical Map' },
                { href: '#documents', kz: 'Құжаттар мен архив', en: 'Document Archive' },
                { href: '#missions', kz: '«Алаш ізімен» миссиялары', en: 'Learning Missions' },
                { href: '#quiz', kz: 'Тарихи тест', en: 'Historical Quiz' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-warm-ivory/75 hover:text-muted-gold transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-muted-gold/60">›</span>
                    <span>{isKz ? link.kz : link.en}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic Sources */}
          <div>
            <h4 className="font-serif font-bold text-base uppercase tracking-wider text-muted-gold mb-4 border-b border-soft-line/20 pb-2">
              {t('footer.sources_title', isKz ? 'Ғылыми және архивтік дереккөздер' : 'Academic & Archival Sources')}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-sans">
              {ACADEMIC_SOURCES.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col text-warm-ivory/80 hover:text-muted-gold transition-colors"
                  >
                    <span className="font-medium flex items-center gap-1 underline underline-offset-2">
                      {isKz ? src.nameKz : src.nameEn}
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    </span>
                    <span className="text-[11px] text-warm-ivory/50">
                      {isKz ? src.descKz : src.descEn}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Archival Ethics & Licensing */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-base uppercase tracking-wider text-muted-gold mb-4 border-b border-soft-line/20 pb-2">
              {isKz ? 'Мұрағаттық этика' : 'Archival Policy'}
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-warm-ivory/75 leading-relaxed bg-black/20 p-3 rounded border border-soft-line/20">
              <ShieldCheck className="w-4 h-4 text-muted-gold shrink-0 mt-0.5" />
              <p>
                {t(
                  'footer.legal_note',
                  isKz
                    ? 'Сайтта тек түпнұсқа тарихи фотосуреттер мен құжаттар пайдаланылады. Жасанды интеллектпен жасалған жалған портреттер қолданылмайды.'
                    : 'Materials are presented solely for educational and research purposes. Authentic archival photographs and documents belong to state archive collections.'
                )}
              </p>
            </div>
            <p className="font-sans text-xs text-warm-ivory/60 leading-relaxed">
              {isKz
                ? 'Материалдар ағартушылық және коммерциялық емес зерттеу мақсатында ұсынылған.'
                : 'All materials are presented strictly for non-commercial educational and research purposes.'}
            </p>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="mt-12 pt-6 border-t border-soft-line/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-warm-ivory/60">
          <div>
            <p>
              {t(
                'footer.copyright',
                isKz
                  ? '© 2026 «Алаш мұрасы» Цифрлық мұрағаты. Барлық құқықтар қорғалған.'
                  : '© 2026 "Alash Heritage" Digital Archive. All rights reserved.'
              )}
            </p>
          </div>

          {/* Bottom language toggle & Back to top button */}
          <div className="flex items-center gap-4">
            {/* Quick Language Toggle */}
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setLanguage('kz')}
                aria-label="Қазақ тілі"
                className={`hover:text-warm-ivory transition-colors ${
                  isKz ? 'text-muted-gold font-bold underline' : 'text-warm-ivory/60'
                }`}
              >
                KZ
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-label="English language"
                className={`hover:text-warm-ivory transition-colors ${
                  !isKz ? 'text-muted-gold font-bold underline' : 'text-warm-ivory/60'
                }`}
              >
                EN
              </button>
            </div>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-warm-ivory/10 hover:bg-warm-ivory/20 text-warm-ivory transition-colors border border-soft-line/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold"
              aria-label={isKz ? 'Беттің басына оралу' : 'Scroll to top'}
            >
              <span>{isKz ? 'Жоғарыға' : 'Back to top'}</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
