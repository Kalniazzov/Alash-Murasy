import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Search,
  X,
  Bookmark,
  Users,
  Feather,
  Scale,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Filter,
  GitBranch,
  LayoutGrid,
  Crown,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useFavorites } from '@/hooks/useFavorites';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { SmartPortraitImg } from '@/components/ui/SmartPortraitImg';
import { Figure } from '@/data/types';
import { figures as defaultFigures } from '@/data/figures';
import { FigureModal } from './FigureModal';

export type FigureRoleFilter = 'all' | 'leader' | 'writer' | 'jurist' | 'scholar';
export type FigureViewScope = 'all' | 'core';
export type GalleryLayoutMode = 'shezhire' | 'grid';

export interface FiguresGalleryProps {
  figures?: Figure[];
  className?: string;
  onOpenFigure?: (figure: Figure) => void;
  externalSelectedId?: string | null;
  onExternalSelectHandled?: () => void;
}

const ROLE_BADGE_LABELS: Record<Figure['role'], { kz: string; en: string }> = {
  leader: { kz: 'Көшбасшы', en: 'Leader' },
  writer: { kz: 'Қаламгер', en: 'Writer' },
  scholar: { kz: 'Ғалым', en: 'Scholar' },
  jurist: { kz: 'Заңгер', en: 'Jurist' },
};

interface ShezhireRelationInfo {
  tagKz: string;
  tagEn: string;
  bondKz: string;
  bondEn: string;
}

/**
 * Historical role tags & connection bonds to the central Alash leadership
 * for the interactive Poster-Shezhire experience.
 */
const SHEZHIRE_RELATIONS: Record<string, ShezhireRelationInfo> = {
  bokeikhanov: {
    tagKz: 'Алаш көсемі · Төраға',
    tagEn: 'Supreme Leader · Chairman',
    bondKz:
      'Орталық тұлға — Алаш қозғалысының саяси көсемі, Алаш партиясы мен Алашорда үкіметінің төрағасы, барлық зиялыларды ұлттық мемлекеттік идея төңірегіне топтастырушы.',
    bondEn:
      'Central Figure — Political architect of the Alash movement and elected Chairman of the Alash Orda government uniting all national intellectuals.',
  },
  baitursynov: {
    tagKz: 'Ұлт ұстазы · Редактор',
    tagEn: 'Teacher of the Nation',
    bondKz:
      'Орталық көшбасшының ең жақын рухани серігі: Орынборда «Қазақ» газетін бірге шығарып, Алаш партиясы бағдарламасы мен ұлттық әліпбиді қалыптастырды.',
    bondEn:
      'Closest intellectual partner: co-published the newspaper "Qazaq" in Orenburg and co-drafted the Alash Party program.',
  },
  dulatov: {
    tagKz: 'Бас идеолог · Қаламгер',
    tagEn: 'Chief Ideologue',
    bondKz:
      '1905 жылғы Қарқаралы петициясынан бастап Алашорда үкіметіне дейін бірге күресіп, «Оян, қазақ!» үндеуімен ұлттық оянудың жаршысы болды.',
    bondEn:
      'Fought side by side from the 1905 Karkaraly Petition to the Alash Orda council, awakening national consciousness with "Oyan, Qazaq!".',
  },
  tynyshbaev: {
    tagKz: 'Төраға орынбасары',
    tagEn: 'Deputy Chairman',
    bondKz:
      'ІІ Мемлекеттік Дума мен Жалпықазақ съездеріндегі сенімді үзеңгілес, Алашорда үкіметі төрағасының орынбасары әрі тұңғыш теміржол инженері.',
    bondEn:
      'State Duma colleague, Deputy Chairman of the Alash Orda government, and pioneering railway engineer.',
  },
  kh_dosmukhamedov: {
    tagKz: 'Батыс Алашорда · Ғалым',
    tagEn: 'Western Alash Pillar',
    bondKz:
      'Алашорда үкіметінің мүшесі, Жымпитыдағы Күнбатыс Алашорда бөлімін басқарып, Мәскеудегі орталық келіссөздерге қатысқан ғалым-дәрігер.',
    bondEn:
      'Member of the Alash Orda council who co-led the Western branch in Zhympity and represented Alash in central negotiations.',
  },
  zh_dosmukhamedov: {
    tagKz: 'Ойыл уәлаяты төрағасы',
    tagEn: 'Western Alash Chairman',
    bondKz:
      'Күнбатыс Алашорда (Ойыл уәлаяты) үкіметінің төрағасы, Семейдегі орталық Алашордамен біртұтас мемлекеттік бағыт ұстанған кәсіби заңгер.',
    bondEn:
      'Chairman of the Western Alash Orda branch, coordinating constitutional governance and militia defense with Semey.',
  },
  zhumabaev: {
    tagKz: 'Алаш рухының ақыны',
    tagEn: 'Poet of Alash Spirit',
    bondKz:
      'Жалпықазақ съездеріне қатысып, оқу-ағарту комиссиясында еңбек еткен және Алаш азаттық идеясын поэзия шыңына көтерген лирик ақын.',
    bondEn:
      'Delegate to the All-Kazakh Congresses who served on education commissions and immortalized the Alash ideal in poetry.',
  },
  toraighyrov: {
    tagKz: 'Алаш ұранының жыршысы',
    tagEn: 'Bard of Alash Anthem',
    bondKz:
      'Семейдегі Алаш ордасы орталығында қызмет етіп, «Алаш ұраны» мен «Таныстыру» поэмасында Алаш көсемдерінің тарихи бейнесін сомдады.',
    bondEn:
      'Worked in the Semey Alash capital and authored "Alash Urany" and "Tanystyru" celebrating the Alash leadership.',
  },
  ermekov: {
    tagKz: 'Шекара қорғаушы ғалым',
    tagEn: 'Border Negotiator',
    bondKz:
      'Алашорда үкіметінің мүшесі; 1920 жылы Мәскеуде орталық көшбасшымен тізе қосып, Қазақ автономиясының біртұтас шекарасын ғылыми дәлелмен қорғап шықты.',
    bondEn:
      'Alash Orda member who presented the decisive 1920 territorial report in Moscow securing Kazakhstan’s historic borders.',
  },
  marsekov: {
    tagKz: 'Заңгер · «Сарыарқа»',
    tagEn: 'Jurist & Publicist',
    bondKz:
      'Семей облыстық Қазақ комитеті мен Алаш соты жүйесін құруға қатысып, «Сарыарқа» газетінде автономия құқығын негіздеді.',
    bondEn:
      'Helped build the Semey Kazakh Committee and Alash judicial system while championing autonomy in "Saryarqa".',
  },
  aqbaev: {
    tagKz: 'Құқық магистрі · Заңгер',
    tagEn: 'Master of Law',
    bondKz:
      '1905 жылғы Қарқаралы петициясын бірге ұйымдастырушы, Алашорда үкіметінің мүшесі және тәуелсіз сот билігінің авторы.',
    bondEn:
      'Co-organizer of the 1905 Karkaraly Petition, Alash Orda council member, and architect of constitutional courts.',
  },
  zhamanmurynov: {
    tagKz: 'Съезд ұйымдастырушысы',
    tagEn: 'Congress Organizer',
    bondKz:
      '1917 жылғы Бірінші жалпықазақ съезін ұйымдастыру бюросында еңбек етіп, Ырғыз бен Батыс өңірде жер және ел басқару ісін жүргізді.',
    bondEn:
      'Served in the organizing bureau of the First All-Kazakh Congress and led regional self-governance in Irgiz.',
  },
  karataev: {
    tagKz: 'Дума депутаты · Заңгер',
    tagEn: 'State Duma Jurist',
    bondKz:
      'ІІ Мемлекеттік Дума мінберінен қазақ жерін қоныс аудару саясатынан қорғап, «Айқап» журналында құқықтық реформаларды көтерді.',
    bondEn:
      'Defended Kazakh ancestral lands from the podium of the Second State Duma and advanced legal reform in "Aiqap".',
  },
  torekulov: {
    tagKz: 'Дипломат · Публицист',
    tagEn: 'Diplomat & Publicist',
    bondKz:
      'Орынборда «Еркін дала» ұйымын құрып, кейін Түркістан мен халықаралық дипломатияда ұлттық мемлекетшілдік дәстүрін жалғастырды.',
    bondEn:
      'Co-founded the "Erkin Dala" youth circle in Orenburg and carried national statecraft into Turkestan and diplomacy.',
  },
  shokay: {
    tagKz: 'Түркістан автономиясы',
    tagEn: 'Turkestan Leader',
    bondKz:
      'Мемлекеттік Думаның Мұсылман фракциясы мен 1917 жылғы жалпықазақ съездерінде Алаш көсемдерімен одақтасып, Қоқанда Түркістан автономиясын басқарды.',
    bondEn:
      'Allied with Alash leaders in the Duma Muslim Faction and 1917 Congresses before heading the Turkestan Autonomy in Kokand.',
  },
  sadvakasov: {
    tagKz: '«Жас Алаш» қайраткері',
    tagEn: 'Young Alash Statesman',
    bondKz:
      'Омбыдағы Алаш жастар қозғалысынан өсіп шығып, 1920 жылдары Алаш арыстарының жер, тіл және ұлттық өнеркәсіп бағытын мемлекеттік деңгейде қорғады.',
    bondEn:
      'Rose from the Omsk Alash youth union to champion Alash policies on land, Kazakh language, and national culture in the 1920s.',
  },
};

interface RoleFilterOption {
  id: FigureRoleFilter;
  labelKz: string;
  labelEn: string;
  icon: React.FC<{ className?: string }>;
}

const ROLE_FILTERS: RoleFilterOption[] = [
  { id: 'all', labelKz: 'Барлығы', labelEn: 'All', icon: Users },
  { id: 'leader', labelKz: 'Жетекшілер', labelEn: 'Leaders', icon: Sparkles },
  { id: 'writer', labelKz: 'Ақын-жазушылар', labelEn: 'Writers & Poets', icon: Feather },
  { id: 'jurist', labelKz: 'Заңгерлер', labelEn: 'Jurists', icon: Scale },
  { id: 'scholar', labelKz: 'Ғалымдар мен ағартушылар', labelEn: 'Scholars', icon: GraduationCap },
];

interface PositionedOrbitNode {
  figure: Figure;
  ring: 1 | 2;
  xPct: number;
  yPct: number;
}

export const FiguresGallery: React.FC<FiguresGalleryProps> = ({
  figures = defaultFigures || [],
  className = '',
  onOpenFigure,
  externalSelectedId,
  onExternalSelectHandled,
}) => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';
  const { isFavorite, toggleFavorite } = useFavorites();

  // Filter, search, and layout states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<FigureRoleFilter>('all');
  const [viewScope, setViewScope] = useState<FigureViewScope>('all');
  const [layoutMode, setLayoutMode] = useState<GalleryLayoutMode>('shezhire');
  const [hoveredFigureId, setHoveredFigureId] = useState<string | null>(null);

  // Modal active figure
  const [activeModalFigure, setActiveModalFigure] = useState<Figure | null>(null);

  useEffect(() => {
    if (!externalSelectedId) return;
    const found = (Array.isArray(figures) ? figures : []).find(
      (f) => f.id === externalSelectedId
    );
    if (found) {
      setActiveModalFigure(found);
    }
    if (onExternalSelectHandled) {
      onExternalSelectHandled();
    }
  }, [externalSelectedId, figures, onExternalSelectHandled]);

  // Filtered figures computation
  const filteredFigures = useMemo(() => {
    const list = Array.isArray(figures) ? figures : [];
    const query = searchQuery.trim().toLowerCase();

    return list.filter((figure) => {
      if (viewScope === 'core' && !figure.isCore) {
        return false;
      }

      if (selectedRole !== 'all' && figure.role !== selectedRole) {
        return false;
      }

      if (query) {
        const matchesNameKz = figure.name.kz.toLowerCase().includes(query);
        const matchesNameEn = figure.name.en.toLowerCase().includes(query);
        const matchesRoleKz = figure.roleTitle.kz.toLowerCase().includes(query);
        const matchesRoleEn = figure.roleTitle.en.toLowerCase().includes(query);
        const matchesShortBioKz = figure.shortBio.kz.toLowerCase().includes(query);
        const matchesShortBioEn = figure.shortBio.en.toLowerCase().includes(query);
        const matchesEducationKz = figure.education.kz.toLowerCase().includes(query);
        const matchesEducationEn = figure.education.en.toLowerCase().includes(query);
        const matchesWorksKz = figure.keyWorks.kz.some((w) => w.toLowerCase().includes(query));
        const matchesWorksEn = figure.keyWorks.en.some((w) => w.toLowerCase().includes(query));

        if (
          !matchesNameKz &&
          !matchesNameEn &&
          !matchesRoleKz &&
          !matchesRoleEn &&
          !matchesShortBioKz &&
          !matchesShortBioEn &&
          !matchesEducationKz &&
          !matchesEducationEn &&
          !matchesWorksKz &&
          !matchesWorksEn
        ) {
          return false;
        }
      }

      return true;
    });
  }, [figures, searchQuery, selectedRole, viewScope]);

  // Central Hub Figure (Alikhan Bokeikhanov when present in filtered set)
  const centerFigure = useMemo(
    () => filteredFigures.find((f) => f.id === 'bokeikhanov') || null,
    [filteredFigures]
  );

  const orbitingFigures = useMemo(
    () =>
      centerFigure
        ? filteredFigures.filter((f) => f.id !== centerFigure.id)
        : filteredFigures,
    [filteredFigures, centerFigure]
  );

  // Compute non-overlapping radial coordinates (0..100%) for Desktop Poster-Shezhire
  const positionedOrbitNodes: PositionedOrbitNode[] = useMemo(() => {
    const count = orbitingFigures.length;
    if (count === 0) return [];

    // Single spacious ring when <= 8 orbiting figures
    if (count <= 8) {
      const startDeg = count === 8 ? -67.5 : -90;
      const rx = count <= 4 ? 30 : 34;
      const ry = count <= 4 ? 30 : 34.5;
      return orbitingFigures.map((figure, idx) => {
        const deg = startDeg + (idx * 360) / count;
        const rad = (deg * Math.PI) / 180;
        return {
          figure,
          ring: 1,
          xPct: Number((50 + rx * Math.cos(rad)).toFixed(2)),
          yPct: Number((50 + ry * Math.sin(rad)).toFixed(2)),
        };
      });
    }

    // Two concentric staggered rings when > 8 orbiting figures (e.g. 7 Inner Core + 8 Outer Statesmen)
    const coreFirst = [
      ...orbitingFigures.filter((f) => f.isCore),
      ...orbitingFigures.filter((f) => !f.isCore),
    ];
    const innerCount = Math.min(7, Math.ceil(count / 2));
    const innerList = coreFirst.slice(0, innerCount);
    const outerList = coreFirst.slice(innerCount);

    const innerNodes: PositionedOrbitNode[] = innerList.map((figure, idx) => {
      const deg = -90 + (idx * 360) / innerList.length;
      const rad = (deg * Math.PI) / 180;
      return {
        figure,
        ring: 1,
        xPct: Number((50 + 23.5 * Math.cos(rad)).toFixed(2)),
        yPct: Number((50 + 24 * Math.sin(rad)).toFixed(2)),
      };
    });

    // Offset outer ring start angle (-67.5 deg) so outer plaques never hit cardinal walls and stagger cleanly
    const outerStartDeg = outerList.length === 8 ? -67.5 : -90 + 180 / outerList.length;
    const outerNodes: PositionedOrbitNode[] = outerList.map((figure, idx) => {
      const deg = outerStartDeg + (idx * 360) / outerList.length;
      const rad = (deg * Math.PI) / 180;
      return {
        figure,
        ring: 2,
        xPct: Number((50 + 42.5 * Math.cos(rad)).toFixed(2)),
        yPct: Number((50 + 42 * Math.sin(rad)).toFixed(2)),
      };
    });

    return [...innerNodes, ...outerNodes];
  }, [orbitingFigures]);

  const hasOuterRing = positionedOrbitNodes.some((n) => n.ring === 2);

  // Counts for UI indicators
  const totalCount = Array.isArray(figures) ? figures.length : 0;
  const coreCount = useMemo(
    () => (Array.isArray(figures) ? figures.filter((f) => f.isCore).length : 0),
    [figures]
  );

  const handleCardClick = useCallback(
    (figure: Figure) => {
      if (onOpenFigure) {
        onOpenFigure(figure);
      } else {
        setActiveModalFigure(figure);
      }
    },
    [onOpenFigure]
  );

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedRole('all');
    setViewScope('all');
  }, []);

  const activeRelation = hoveredFigureId ? SHEZHIRE_RELATIONS[hoveredFigureId] : null;

  const renderPortraitFallback = (figure: Figure, compact = false) => {
    const initials = figure.name.kz
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join('');

    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-archive-paper/80 to-warm-ivory p-2 text-center">
        <KazakhOrnament
          variant="seal"
          size={compact ? 56 : 84}
          className="absolute text-muted-gold/25 transition-colors"
        />
        <span
          className={`font-serif ${
            compact ? 'text-xl sm:text-2xl' : 'text-3xl'
          } font-bold text-ink-brown tracking-wider relative z-10`}
        >
          {initials || figure.id.slice(0, 2).toUpperCase()}
        </span>
        <span className="font-mono text-[8px] uppercase tracking-wider text-muted-gold mt-1 relative z-10 leading-tight">
          {isKz ? 'АРХИВТІК ПОРТРЕТ' : 'ARCHIVAL PORTRAIT'}
        </span>
      </div>
    );
  };

  return (
    <section
      id="figures"
      aria-labelledby="figures-heading"
      className={`py-16 sm:py-24 border-b border-soft-line/60 bg-archive-paper/20 relative ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-gold font-semibold">
            {t('figures.eyebrow', isKz ? 'ҰЛТ ҚАЙРАТКЕРЛЕРІ' : 'INTELLECTUAL LEADERS')}
          </span>
          <h2
            id="figures-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-brown mt-2 mb-4 tracking-tight"
          >
            {t('figures.title', isKz ? 'Алаш зиялыларының галереясы' : 'Alash Intellectuals Gallery')}
          </h2>
          <KazakhOrnament variant="divider" size={72} className="my-3 text-muted-gold" />
          <p className="font-sans text-sm sm:text-base text-ink-brown/75 leading-relaxed">
            {t(
              'figures.description',
              isKz
                ? 'Орталығында Алаш көсемі Әлихан Бөкейханов тұрған біртұтас тарихи шежіре-постер және 16 қайраткердің толық өмірбаян қоры.'
                : 'Explore the interconnected Alash Poster-Shezhire centered on Alikhan Bokeikhanov alongside full archival dossiers of 16 national leaders.'
            )}
          </p>
        </div>

        {/* Filter & View Mode Controls Panel */}
        <div className="bg-warm-ivory border border-soft-line rounded-xl p-4 sm:p-6 shadow-subtle mb-8 sm:mb-10">
          {/* Row 1: Search Bar + Scope Toggle + Layout Switcher */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 mb-5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-ink-brown/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isKz
                    ? 'Тұлғаның аты, қызметі, білімі немесе еңбегі бойынша іздеу...'
                    : 'Search by figure name, role, education, or works...'
                }
                aria-label={t('common.search_placeholder', isKz ? 'Іздеу...' : 'Search...')}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-soft-line/80 bg-archive-paper/30 text-ink-brown placeholder-ink-brown/50 text-sm font-sans focus:outline-none focus:border-deep-burgundy focus:ring-1 focus:ring-deep-burgundy transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={isKz ? 'Іздеуді тазарту' : 'Clear search'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-brown/50 hover:text-ink-brown transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2.5 shrink-0">
              {/* Core vs Extended View Scope Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-lg border border-soft-line/80 bg-archive-paper/40">
                <button
                  type="button"
                  onClick={() => setViewScope('all')}
                  className={`px-3 py-1.5 rounded text-xs font-sans font-medium transition-all ${
                    viewScope === 'all'
                      ? 'bg-deep-burgundy text-warm-ivory shadow-xs'
                      : 'text-ink-brown/80 hover:text-ink-brown'
                  }`}
                >
                  {isKz ? 'Барлық тұлғалар' : 'All Figures'} ({totalCount})
                </button>
                <button
                  type="button"
                  onClick={() => setViewScope('core')}
                  className={`px-3 py-1.5 rounded text-xs font-sans font-medium transition-all ${
                    viewScope === 'core'
                      ? 'bg-deep-burgundy text-warm-ivory shadow-xs'
                      : 'text-ink-brown/80 hover:text-ink-brown'
                  }`}
                >
                  {isKz ? 'Негізгі құрам' : 'Core Leaders'} ({coreCount})
                </button>
              </div>

              {/* Poster-Shezhire vs Cards Grid View Mode Toggle */}
              <div
                role="group"
                aria-label={isKz ? 'Көрініс түрі' : 'Display mode'}
                className="flex items-center gap-1 p-1 rounded-lg border border-muted-gold/50 bg-forest-ink/5"
              >
                <button
                  type="button"
                  onClick={() => setLayoutMode('shezhire')}
                  aria-pressed={layoutMode === 'shezhire'}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-sans font-semibold transition-all ${
                    layoutMode === 'shezhire'
                      ? 'bg-forest-ink text-warm-ivory shadow-xs'
                      : 'text-ink-brown/80 hover:text-ink-brown'
                  }`}
                >
                  <GitBranch className="w-3.5 h-3.5 text-muted-gold" />
                  <span>{isKz ? 'Шежіре-постер' : 'Poster-Shezhire'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  aria-pressed={layoutMode === 'grid'}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-sans font-semibold transition-all ${
                    layoutMode === 'grid'
                      ? 'bg-forest-ink text-warm-ivory shadow-xs'
                      : 'text-ink-brown/80 hover:text-ink-brown'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-muted-gold" />
                  <span>{isKz ? 'Карточкалар' : 'Cards'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Role Filter Pills — smooth horizontal swipe on mobile */}
          <div className="flex items-center gap-2 pt-3 border-t border-soft-line/50 overflow-x-auto sm:flex-wrap pb-1 sm:pb-0 -mx-1 px-1 no-scrollbar">
            <span className="font-mono text-xs text-ink-brown/60 flex items-center gap-1.5 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-muted-gold" />
              {isKz ? 'Рөлі бойынша:' : 'By Role:'}
            </span>

            {ROLE_FILTERS.map((roleOpt) => {
              const isSelected = selectedRole === roleOpt.id;
              const Icon = roleOpt.icon;
              return (
                <button
                  key={roleOpt.id}
                  type="button"
                  onClick={() => setSelectedRole(roleOpt.id)}
                  aria-pressed={isSelected}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium border transition-all ${
                    isSelected
                      ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy shadow-subtle'
                      : 'bg-warm-ivory hover:bg-archive-paper/50 text-ink-brown/85 border-soft-line/70'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{isKz ? roleOpt.labelKz : roleOpt.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Status & Reset */}
          <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-ink-brown/70 border-t border-soft-line/40">
            <div>
              <span className="text-muted-gold font-bold">{filteredFigures.length}</span>{' '}
              {isKz ? 'қайраткер көрсетілді' : 'figures matching criteria'}
            </div>
            {(searchQuery || selectedRole !== 'all' || viewScope !== 'all') && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-deep-burgundy hover:underline font-sans text-xs"
              >
                {isKz ? 'Сүзгілерді тазарту' : 'Reset all filters'}
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredFigures.length === 0 ? (
          <div className="text-center py-16 bg-warm-ivory rounded-xl border border-soft-line/60 p-8 max-w-md mx-auto">
            <Users className="w-10 h-10 mx-auto text-muted-gold/50 mb-3" />
            <h3 className="font-serif text-xl font-bold text-ink-brown mb-2">
              {isKz ? 'Сұранысқа сәйкес тұлға табылмады' : 'No figures found'}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-ink-brown/70 mb-4">
              {isKz
                ? 'Іздеу сөзін өзгертіп немесе сүзгілерді алып тастап көріңіз.'
                : 'Try adjusting your search query or removing role filters.'}
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 rounded bg-deep-burgundy text-warm-ivory font-sans text-xs font-medium hover:bg-burgundy-hover transition-colors"
            >
              {isKz ? 'Сүзгілерді тазарту' : 'Clear filters'}
            </button>
          </div>
        ) : layoutMode === 'shezhire' ? (
          /* ================================================================
             MODE 1 (DEFAULT): INTERACTIVE ALASH POSTER-SHEZHIRE
             - Desktop (lg+): 360° Radial Shanyrak Poster centered on Alikhan Bokeikhanov
             - Mobile & Tablet (< lg): Vertical Connected Shezhire Poster with central golden trunk
             ================================================================ */
          <div className="poster-shezhire-board relative rounded-2xl border-2 border-muted-gold/60 shadow-[0_24px_60px_rgba(20,27,25,0.28)] overflow-hidden p-4 sm:p-6 lg:p-8 text-warm-ivory">
            {/* Ornamental Poster Corner Seals */}
            <div className="absolute top-3 left-3 pointer-events-none text-muted-gold/55" aria-hidden="true">
              <KazakhOrnament variant="corner" size={34} />
            </div>
            <div className="absolute top-3 right-3 pointer-events-none text-muted-gold/55 rotate-90" aria-hidden="true">
              <KazakhOrnament variant="corner" size={34} />
            </div>
            <div className="absolute bottom-3 left-3 pointer-events-none text-muted-gold/55 -rotate-90" aria-hidden="true">
              <KazakhOrnament variant="corner" size={34} />
            </div>
            <div className="absolute bottom-3 right-3 pointer-events-none text-muted-gold/55 rotate-180" aria-hidden="true">
              <KazakhOrnament variant="corner" size={34} />
            </div>

            {/* Poster Top Banner & Live Historical Bond Bar */}
            <div className="relative z-20 max-w-3xl mx-auto text-center mb-6 lg:mb-4">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.07] border border-muted-gold/40 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-muted-gold">
                <Crown className="w-3.5 h-3.5" />
                <span>
                  {isKz
                    ? 'АЛАШ ОРДАСЫ · БІРТҰТАС ТАРИХИ ШЕЖІРЕ-ПОСТЕР'
                    : 'ALASH ORDA · UNIFIED HISTORICAL POSTER-SHEZHIRE'}
                </span>
              </div>

              <div className="mt-2.5 min-h-[44px] flex items-center justify-center px-3 py-2 rounded-xl bg-black/25 border border-white/10 backdrop-blur-xs">
                <p className="font-sans text-xs sm:text-sm text-warm-ivory/90 leading-relaxed">
                  {activeRelation ? (
                    <>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-gold font-bold mr-2">
                        [{isKz ? activeRelation.tagKz : activeRelation.tagEn}]
                      </span>
                      <span>{isKz ? activeRelation.bondKz : activeRelation.bondEn}</span>
                    </>
                  ) : isKz ? (
                    'Ортада — Алаш көсемі, айналасында — ұлт мемлекеттілігін бірге құрған серіктері. Кез келген портретті басып, толық өмірбаянын оқыңыз.'
                  ) : (
                    'At the center stands the Chairman of Alash Orda, surrounded by fellow statesmen in interconnected rings. Select any portrait to open their full dossier.'
                  )}
                </p>
              </div>

              {/* Legend Pills */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] text-warm-ivory/75">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-muted-gold ring-2 ring-muted-gold/40" />
                  {isKz ? 'Орталық тұлға (Төраға)' : 'Central Hub (Chairman)'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-deep-burgundy ring-2 ring-muted-gold/50" />
                  {isKz ? 'І шеңбер · Негізгі өзек' : 'Inner Ring · Core Pillars'}
                </span>
                {hasOuterRing && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-warm-ivory/80" />
                    {isKz ? 'ІІ шеңбер · Алаш қайраткерлері' : 'Outer Ring · Alash Statesmen'}
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Canvas: Vertical Connected Tree on < lg | 360° Radial Shanyrak on lg+ */}
            <div
              className={`relative w-full ${
                hasOuterRing
                  ? 'lg:h-[1120px] xl:h-[1180px]'
                  : orbitingFigures.length > 0
                  ? 'lg:h-[800px] xl:h-[850px]'
                  : 'lg:py-12'
              }`}
            >
              {/* DESKTOP SVG LAYER (lg+): Concentric Shanyrak Circles & Radiating Connection Threads */}
              {orbitingFigures.length > 0 && (
                <svg
                  viewBox="0 0 1000 1000"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0"
                >
                  <defs>
                    <radialGradient id="posterCenterGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#B18A52" stopOpacity="0.32" />
                      <stop offset="55%" stopColor="#722F35" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#1c2522" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx="500" cy="500" r="360" fill="url(#posterCenterGlow)" />

                  {/* Decorative Shanyrak Compass Rings */}
                  <g className="animate-shanyrak-slow">
                    <circle
                      cx="500"
                      cy="500"
                      r="118"
                      fill="none"
                      stroke="#B18A52"
                      strokeWidth="1.2"
                      strokeDasharray="5 7"
                      opacity="0.45"
                    />
                    <line x1="382" y1="500" x2="618" y2="500" stroke="#B18A52" strokeWidth="0.8" opacity="0.22" />
                    <line x1="500" y1="382" x2="500" y2="618" stroke="#B18A52" strokeWidth="0.8" opacity="0.22" />
                  </g>

                  {/* Inner & Outer Orbit Guide Ellipses */}
                  {hasOuterRing ? (
                    <>
                      <ellipse
                        cx="500"
                        cy="500"
                        rx="235"
                        ry="240"
                        fill="none"
                        stroke="#B18A52"
                        strokeWidth="1.2"
                        strokeDasharray="6 8"
                        opacity="0.35"
                      />
                      <ellipse
                        cx="500"
                        cy="500"
                        rx="425"
                        ry="420"
                        fill="none"
                        stroke="#CDBFA9"
                        strokeWidth="1"
                        strokeDasharray="4 10"
                        opacity="0.25"
                      />
                    </>
                  ) : (
                    <ellipse
                      cx="500"
                      cy="500"
                      rx={orbitingFigures.length <= 4 ? 300 : 340}
                      ry={orbitingFigures.length <= 4 ? 300 : 345}
                      fill="none"
                      stroke="#B18A52"
                      strokeWidth="1.3"
                      strokeDasharray="6 8"
                      opacity="0.38"
                    />
                  )}

                  {/* Radiating Shezhire Connection Lines from Center (500, 500) to Every Orbit Node */}
                  {positionedOrbitNodes.map(({ figure, ring, xPct, yPct }) => {
                    const x2 = xPct * 10;
                    const y2 = yPct * 10;
                    const isActive = hoveredFigureId === figure.id;

                    return (
                      <g key={`ray-${figure.id}`}>
                        {/* Base heritage ray */}
                        <line
                          x1="500"
                          y1="500"
                          x2={x2}
                          y2={y2}
                          stroke={isActive ? '#E9CF9C' : ring === 1 ? '#B18A52' : '#CDBFA9'}
                          strokeWidth={isActive ? 2.8 : ring === 1 ? 1.6 : 1.05}
                          strokeDasharray={ring === 2 && !isActive ? '5 6' : undefined}
                          opacity={isActive ? 0.95 : ring === 1 ? 0.52 : 0.28}
                        />
                        {/* Animated highlight pulse when hovered/focused */}
                        {isActive && (
                          <line
                            x1="500"
                            y1="500"
                            x2={x2}
                            y2={y2}
                            stroke="#722F35"
                            strokeWidth="2.2"
                            strokeDasharray="8 10"
                            className="animate-dash-flow"
                          />
                        )}
                        {/* Midpoint golden knot */}
                        <circle
                          cx={(500 + x2) / 2}
                          cy={(500 + y2) / 2}
                          r={isActive ? 4.5 : 2.5}
                          fill={isActive ? '#E9CF9C' : '#B18A52'}
                          opacity={isActive ? 0.95 : 0.45}
                        />
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* CENTER CROWN HUB: Alikhan Bokeikhanov (or Ornamental Alash Seal when filtered out) */}
              {centerFigure ? (
                (() => {
                  const centerName = isKz ? centerFigure.name.kz : centerFigure.name.en;
                  const centerFav = isFavorite('figure', centerFigure.id);
                  const centerRel = SHEZHIRE_RELATIONS[centerFigure.id];

                  return (
                    <div className="poster-center-node relative mx-auto max-w-[236px] sm:max-w-[252px] lg:w-[168px] xl:w-[186px] mb-8 lg:mb-0">
                      <div
                        role="button"
                        tabIndex={0}
                        aria-label={`${centerName}, ${centerFigure.lifeYears}`}
                        onClick={() => handleCardClick(centerFigure)}
                        onMouseEnter={() => setHoveredFigureId(centerFigure.id)}
                        onMouseLeave={() => setHoveredFigureId(null)}
                        onFocus={() => setHoveredFigureId(centerFigure.id)}
                        onBlur={() => setHoveredFigureId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleCardClick(centerFigure);
                          }
                        }}
                        className="relative rounded-2xl bg-gradient-to-b from-warm-ivory via-warm-ivory to-archive-paper text-ink-brown border-2 border-muted-gold shadow-[0_0_38px_rgba(177,138,82,0.42)] p-3 sm:p-3.5 lg:p-2.5 xl:p-3 text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold"
                      >
                        {/* Bookmark Button (Top-Right of Plaque, never covering face) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite('figure', centerFigure.id);
                          }}
                          aria-label={
                            centerFav
                              ? t('common.remove_favorite', isKz ? 'Таңдаулыдан өшіру' : 'Remove favorite')
                              : t('common.add_favorite', isKz ? 'Таңдаулыға қосу' : 'Add to favorites')
                          }
                          className={`absolute top-2 right-2 z-20 p-1.5 rounded-full border transition-all ${
                            centerFav
                              ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy'
                              : 'bg-warm-ivory/95 text-ink-brown/70 hover:text-deep-burgundy border-soft-line'
                          }`}
                        >
                          <Bookmark className={`w-3 h-3 ${centerFav ? 'fill-warm-ivory' : ''}`} />
                        </button>

                        {/* Crown Insignia */}
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-deep-burgundy text-warm-ivory font-mono text-[9px] uppercase tracking-wider font-bold mb-2 shadow-xs">
                          <Crown className="w-2.5 h-2.5 text-muted-gold" />
                          <span>{isKz ? 'ОРТАЛЫҚ ТҰЛҒА' : 'CENTRAL LEADER'}</span>
                        </div>

                        {/* Uncropped Vertical 3:4 Portrait Medallion */}
                        <div className="w-32 h-40 sm:w-36 sm:h-44 lg:w-24 lg:h-32 xl:w-28 xl:h-36 mx-auto rounded-xl overflow-hidden border-2 border-muted-gold bg-archive-paper shadow-inner">
                          <SmartPortraitImg
                            figureId={centerFigure.id}
                            photoUrl={centerFigure.photoUrl}
                            alt={centerName}
                            className="w-full h-full object-cover sepia-[0.06] contrast-[1.04]"
                            fallback={renderPortraitFallback(centerFigure, true)}
                          />
                        </div>

                        {/* Name & Role Plate */}
                        <div className="mt-2.5">
                          <h3 className="font-serif text-base sm:text-lg lg:text-[13px] xl:text-[15px] font-bold text-ink-brown leading-tight line-clamp-2">
                            {centerName}
                          </h3>
                          <span className="block font-mono text-[10px] font-bold text-deep-burgundy mt-0.5">
                            {centerFigure.lifeYears}
                          </span>
                          {centerRel && (
                            <span className="block font-sans text-[10px] text-ink-brown/75 font-medium mt-0.5 line-clamp-1">
                              {isKz ? centerRel.tagKz : centerRel.tagEn}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Mobile/Tablet Downward Shezhire Stem connecting Bokeikhanov to the Tree Trunk */}
                      {orbitingFigures.length > 0 && (
                        <div
                          aria-hidden="true"
                          className="lg:hidden flex flex-col items-center pointer-events-none -mb-8 pt-1"
                        >
                          <span className="w-3 h-3 rounded-full bg-muted-gold ring-4 ring-muted-gold/25" />
                          <span className="w-0.5 h-7 bg-gradient-to-b from-muted-gold to-muted-gold/60" />
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                /* Pure decorative central seal when Bokeikhanov is filtered out by role/search */
                <div
                  aria-hidden="true"
                  className="poster-center-node hidden lg:flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-muted-gold/60 bg-forest-ink/95 text-center p-3 shadow-[0_0_30px_rgba(177,138,82,0.28)]"
                >
                  <KazakhOrnament variant="seal" size={56} className="text-muted-gold/75" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-gold mt-1">
                    АЛАШ ШЕЖІРЕСІ
                  </span>
                </div>
              )}

              {/* ORBITING ALASH FIGURES: Connected Vertical Tree (< lg) & Radial Shanyrak (lg+) */}
              {positionedOrbitNodes.length > 0 && (
                <div className="relative pt-2 lg:pt-0 lg:static">
                  {/* Mobile Central Vertical Golden Shezhire Trunk (< lg) */}
                  <div
                    aria-hidden="true"
                    className="lg:hidden absolute left-1/2 top-0 bottom-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-muted-gold via-muted-gold/55 to-muted-gold/15 pointer-events-none"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-5 sm:gap-6 lg:block relative lg:static z-10">
                    {positionedOrbitNodes.map(({ figure, ring, xPct, yPct }, idx) => {
                      const figureName = isKz ? figure.name.kz : figure.name.en;
                      const isFav = isFavorite('figure', figure.id);
                      const rel = SHEZHIRE_RELATIONS[figure.id];
                      const isHovered = hoveredFigureId === figure.id;
                      const isLeftMobileCol = idx % 2 === 0;

                      return (
                        <div
                          key={figure.id}
                          style={
                            {
                              '--poster-x': `${xPct}%`,
                              '--poster-y': `${yPct}%`,
                            } as React.CSSProperties
                          }
                          className="poster-orbit-node relative lg:w-[122px] xl:w-[138px]"
                        >
                          {/* Mobile Horizontal Golden Branch Connector to Central Spine (< sm) */}
                          <span
                            aria-hidden="true"
                            className={`sm:hidden absolute top-1/2 h-[2px] w-2.5 bg-muted-gold/70 pointer-events-none ${
                              isLeftMobileCol ? '-right-2.5' : '-left-2.5'
                            }`}
                          />
                          <span
                            aria-hidden="true"
                            className={`sm:hidden absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-muted-gold pointer-events-none ${
                              isLeftMobileCol ? '-right-[14px]' : '-left-[14px]'
                            }`}
                          />

                          {/* Portrait Plaque Button */}
                          <div
                            role="button"
                            tabIndex={0}
                            aria-label={`${figureName}, ${figure.lifeYears}`}
                            onClick={() => handleCardClick(figure)}
                            onMouseEnter={() => setHoveredFigureId(figure.id)}
                            onMouseLeave={() => setHoveredFigureId(null)}
                            onFocus={() => setHoveredFigureId(figure.id)}
                            onBlur={() => setHoveredFigureId(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleCardClick(figure);
                              }
                            }}
                            className={`group relative rounded-xl p-2.5 sm:p-3 lg:p-2 text-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted-gold ${
                              ring === 1
                                ? 'bg-warm-ivory/95 text-ink-brown border-[1.5px] border-muted-gold shadow-[0_10px_24px_rgba(0,0,0,0.28)]'
                                : 'bg-warm-ivory/90 text-ink-brown border border-soft-line/90 hover:border-muted-gold shadow-[0_8px_20px_rgba(0,0,0,0.24)]'
                            } ${isHovered ? 'ring-2 ring-muted-gold shadow-[0_0_26px_rgba(177,138,82,0.5)]' : ''}`}
                          >
                            {/* Bookmark Toggle (Top-Right corner of plaque) */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite('figure', figure.id);
                              }}
                              aria-label={
                                isFav
                                  ? t('common.remove_favorite', isKz ? 'Таңдаулыдан өшіру' : 'Remove favorite')
                                  : t('common.add_favorite', isKz ? 'Таңдаулыға қосу' : 'Add to favorites')
                              }
                              className={`absolute top-1.5 right-1.5 z-20 p-1.5 rounded-full border transition-all ${
                                isFav
                                  ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy shadow-xs'
                                  : 'bg-warm-ivory/90 text-ink-brown/65 hover:text-deep-burgundy border-soft-line/80'
                              }`}
                            >
                              <Bookmark className={`w-2.5 h-2.5 ${isFav ? 'fill-warm-ivory' : ''}`} />
                            </button>

                            {/* Uncropped Vertical 3:4 Portrait Medallion — Faces 100% Clear on Mobile & Desktop */}
                            <div
                              className={`w-full max-w-[116px] sm:max-w-[126px] aspect-[3/4] lg:w-[74px] lg:h-[94px] xl:w-[86px] xl:h-[110px] mx-auto rounded-lg overflow-hidden bg-archive-paper border ${
                                ring === 1 ? 'border-muted-gold/80' : 'border-soft-line'
                              }`}
                            >
                              <SmartPortraitImg
                                figureId={figure.id}
                                photoUrl={figure.photoUrl}
                                alt={figureName}
                                className="w-full h-full object-cover sepia-[0.06] contrast-[1.04] group-hover:sepia-0 group-hover:scale-105 transition-transform duration-500"
                                fallback={renderPortraitFallback(figure, true)}
                              />
                            </div>

                            {/* Name, Years & Role Tag */}
                            <div className="mt-2">
                              <h3 className="font-serif text-[13px] sm:text-sm lg:text-[11.5px] xl:text-[12.5px] font-bold text-ink-brown group-hover:text-deep-burgundy leading-tight line-clamp-2 transition-colors">
                                {figureName}
                              </h3>
                              <span className="block font-mono text-[9.5px] text-muted-gold font-semibold mt-0.5">
                                {figure.lifeYears}
                              </span>
                              <span className="block font-sans text-[9.5px] text-ink-brown/70 leading-tight mt-0.5 line-clamp-1">
                                {rel
                                  ? isKz
                                    ? rel.tagKz
                                    : rel.tagEn
                                  : ROLE_BADGE_LABELS[figure.role]
                                  ? isKz
                                    ? ROLE_BADGE_LABELS[figure.role].kz
                                    : ROLE_BADGE_LABELS[figure.role].en
                                  : figure.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ================================================================
             MODE 2: CLASSIC PORTRAIT CARDS GRID (Tall 3:4 Uncropped Portraits)
             ================================================================ */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredFigures.map((figure) => {
              const figureName = isKz ? figure.name.kz : figure.name.en;
              const figureRoleTitle = isKz ? figure.roleTitle.kz : figure.roleTitle.en;
              const figureShortBio = isKz ? figure.shortBio.kz : figure.shortBio.en;
              const isFav = isFavorite('figure', figure.id);

              return (
                <div
                  key={figure.id}
                  onClick={() => handleCardClick(figure)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${figureName}, ${figure.lifeYears}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(figure);
                    }
                  }}
                  className="museum-card group bg-warm-ivory border border-soft-line rounded-xl overflow-hidden shadow-subtle flex flex-col cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-burgundy"
                >
                  {/* Tall 3:4 Portrait Top Area so full face & shoulders are never cropped */}
                  <div className="relative aspect-[3/4] bg-archive-paper/50 border-b border-soft-line/60 overflow-hidden flex items-center justify-center">
                    <SmartPortraitImg
                      figureId={figure.id}
                      photoUrl={figure.photoUrl}
                      alt={figureName}
                      className="w-full h-full object-cover sepia-[0.08] contrast-[1.03] group-hover:sepia-0 group-hover:scale-105 transition-transform duration-500"
                      fallback={renderPortraitFallback(figure, false)}
                    />

                    {/* Top-Right: Favorite Button */}
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite('figure', figure.id);
                        }}
                        aria-label={
                          isFav
                            ? t('common.remove_favorite', isKz ? 'Таңдаулыдан өшіру' : 'Remove favorite')
                            : t('common.add_favorite', isKz ? 'Таңдаулыға қосу' : 'Add to favorites')
                        }
                        title={isFav ? 'In favorites' : 'Add to favorites'}
                        className={`p-2 rounded-full backdrop-blur-xs border transition-all ${
                          isFav
                            ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy shadow-sm'
                            : 'bg-warm-ivory/90 hover:bg-warm-ivory text-ink-brown/70 hover:text-deep-burgundy border-soft-line/70'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-warm-ivory' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Card Content Area (Badges placed cleanly below portrait, never over faces) */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold text-muted-gold tracking-wide">
                          {figure.lifeYears}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {figure.isCore && (
                            <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-forest-ink text-warm-ivory">
                              {isKz ? 'Негізгі' : 'Core'}
                            </span>
                          )}
                          <span className="px-2 py-0.5 font-mono text-[10px] font-semibold rounded-full bg-archive-paper/60 border border-soft-line/80 text-ink-brown uppercase tracking-wider">
                            {ROLE_BADGE_LABELS[figure.role]
                              ? isKz
                                ? ROLE_BADGE_LABELS[figure.role].kz
                                : ROLE_BADGE_LABELS[figure.role].en
                              : figure.role}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-brown group-hover:text-deep-burgundy transition-colors leading-snug mb-1">
                        {figureName}
                      </h3>

                      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-deep-burgundy/90 mb-3 line-clamp-1">
                        {figureRoleTitle}
                      </p>

                      <p className="font-sans text-xs sm:text-sm text-ink-brown/75 leading-relaxed line-clamp-3 mb-4">
                        {figureShortBio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-soft-line/40 flex items-center justify-between text-xs font-sans font-semibold text-deep-burgundy group-hover:text-burgundy-hover transition-colors">
                      <span>{t('common.read_bio', isKz ? 'Өмірбаянды оқу' : 'Read biography')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Instance */}
        <FigureModal
          figure={activeModalFigure}
          isOpen={Boolean(activeModalFigure)}
          onClose={() => setActiveModalFigure(null)}
        />
      </div>
    </section>
  );
};
