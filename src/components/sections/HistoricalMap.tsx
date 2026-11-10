import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Users,
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { MAP_LOCATIONS } from '@/data/mapLocations';
import { MapLocation } from '@/data/types';

type CategoryFilter =
  | 'all'
  | 'alash_center'
  | 'press_education'
  | 'allied_autonomy'
  | 'imperial_diplomacy';

// Equirectangular projection across [lng: 27..86, lat: 38..62] onto 800x440 SVG canvas
function projectPoint(lat: number, lng: number): { x: number; y: number } {
  const minLng = 27;
  const maxLng = 86;
  const minLat = 38;
  const maxLat = 62;
  const x = ((lng - minLng) / (maxLng - minLng)) * 740 + 30;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 380 + 30;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

export const HistoricalMap: React.FC = () => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [selectedId, setSelectedId] = useState<string>('orenburg');
  const [mapZoom, setMapZoom] = useState<number>(1);

  const visibleLocations = useMemo(() => {
    if (categoryFilter === 'all') return MAP_LOCATIONS;
    return MAP_LOCATIONS.filter((loc) => loc.category === categoryFilter);
  }, [categoryFilter]);

  const selectedLocation: MapLocation =
    visibleLocations.find((loc) => loc.id === selectedId) ||
    visibleLocations[0] ||
    MAP_LOCATIONS[0];

  const categories: Array<{ id: CategoryFilter; kz: string; en: string }> = [
    { id: 'all', kz: 'Барлық орталықтар (12)', en: 'All Centers (12)' },
    { id: 'alash_center', kz: 'Алаш орталықтары', en: 'Alash Political Centers' },
    { id: 'press_education', kz: 'Баспасөз және білім', en: 'Press & Education' },
    { id: 'allied_autonomy', kz: 'Түркістан автономиясы', en: 'Turkestan Autonomy' },
    { id: 'imperial_diplomacy', kz: 'Дума және келіссөздер', en: 'Duma & Negotiations' },
  ];

  const getPinColors = (cat: MapLocation['category'], isSelected: boolean) => {
    if (isSelected) {
      return { fill: '#722F35', stroke: '#F3EBDD', ring: '#722F35' };
    }
    if (cat === 'allied_autonomy') {
      return { fill: '#B18A52', stroke: '#382B25', ring: '#B18A52' };
    }
    if (cat === 'alash_center') {
      return { fill: '#722F35', stroke: '#F3EBDD', ring: '#B18A52' };
    }
    return { fill: '#202A27', stroke: '#F3EBDD', ring: '#CDBFA9' };
  };

  return (
    <section
      id="map"
      aria-labelledby="map-heading"
      className="py-16 sm:py-24 border-b border-soft-line/60 bg-archive-paper/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-gold">
            {isKz ? 'ИНТЕРАКТИВТІ ТАРИХИ ГЕОГРАФИЯ' : 'INTERACTIVE HISTORICAL GEOGRAPHY'}
          </span>
          <h2
            id="map-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-brown mt-2 mb-4"
          >
            {t('nav.map', isKz ? 'Карта' : 'Map')} —{' '}
            {isKz ? 'Ұлттық қозғалыс кеңістігі' : 'Geography of the Awakening'}
          </h2>
          <KazakhOrnament variant="divider" size={64} className="my-4" />
          <p className="font-sans text-base text-ink-brown/80 leading-relaxed">
            {isKz
              ? 'Қарқаралы петициясынан Орынбор съездеріне, Троицк пен Семей баспаханаларынан Санкт-Петербург Думасына дейінгі тарихи орталықтарды зерттеңіз.'
              : 'Trace the key centers of early 20th-century Kazakh civic history — from Karkaraly, Troitsk, Orenburg, and Semey to Kokand and Saint Petersburg.'}
          </p>
        </div>

        {/* Category Filter Buttons — horizontal swipe on mobile */}
        <div
          className="flex items-center sm:justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto sm:flex-wrap pb-1.5 sm:pb-0 -mx-1 px-1 no-scrollbar"
          role="group"
          aria-label={isKz ? 'Карта санаттары' : 'Map location categories'}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setCategoryFilter(cat.id);
                const nextList =
                  cat.id === 'all'
                    ? MAP_LOCATIONS
                    : MAP_LOCATIONS.filter((l) => l.category === cat.id);
                if (nextList.length > 0 && !nextList.some((l) => l.id === selectedId)) {
                  setSelectedId(nextList[0].id);
                }
              }}
              aria-pressed={categoryFilter === cat.id}
              className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-deep-burgundy text-warm-ivory font-semibold'
                  : 'bg-warm-ivory text-ink-brown border border-soft-line hover:bg-archive-paper'
              }`}
            >
              {isKz ? cat.kz : cat.en}
            </button>
          ))}
        </div>

        {/* Map + Active City Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          {/* Sepia Cartographic SVG Canvas */}
          <div className="lg:col-span-7 rounded-xl border-2 border-soft-line bg-warm-ivory shadow-parchment overflow-hidden flex flex-col">
            <div className="px-3.5 sm:px-4 py-2.5 bg-archive-paper/70 border-b border-soft-line flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-ink-brown/80 min-w-0">
                <Compass className="w-4 h-4 text-deep-burgundy shrink-0" />
                <span className="truncate">
                  {isKz
                    ? 'Қазақ даласы және тарихи орталықтар'
                    : 'Kazakh Steppe & Historical Hubs'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                {/* City Tour Stepper for effortless mobile & desktop exploration */}
                {visibleLocations.length > 1 && (
                  <div className="flex items-center gap-1 mr-1 bg-warm-ivory/90 border border-soft-line rounded px-1 py-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        const cur = visibleLocations.findIndex(
                          (l) => l.id === selectedLocation.id
                        );
                        const prev =
                          (cur - 1 + visibleLocations.length) % visibleLocations.length;
                        setSelectedId(visibleLocations[prev].id);
                      }}
                      aria-label={isKz ? 'Алдыңғы қала' : 'Previous city'}
                      className="p-0.5 rounded hover:bg-archive-paper text-ink-brown"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[10px] text-deep-burgundy font-bold px-1">
                      {Math.max(
                        1,
                        visibleLocations.findIndex((l) => l.id === selectedLocation.id) + 1
                      )}
                      /{visibleLocations.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const cur = visibleLocations.findIndex(
                          (l) => l.id === selectedLocation.id
                        );
                        const next = (cur + 1) % visibleLocations.length;
                        setSelectedId(visibleLocations[next].id);
                      }}
                      aria-label={isKz ? 'Келесі қала' : 'Next city'}
                      className="p-0.5 rounded hover:bg-archive-paper text-ink-brown"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))}
                  aria-label={isKz ? 'Картаны кішірейту' : 'Zoom map out'}
                  className="p-1 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper text-ink-brown"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoom((z) => Math.min(1.6, +(z + 0.2).toFixed(2)))}
                  aria-label={isKz ? 'Картаны үлкейту' : 'Zoom map in'}
                  className="p-1 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper text-ink-brown"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMapZoom(1)}
                  aria-label={isKz ? 'Бастапқы масштаб' : 'Reset map zoom'}
                  className="p-1 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper text-ink-brown"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-[#EFE5D3] overflow-hidden min-h-[300px] sm:min-h-[380px] flex items-center justify-center">
              <svg
                viewBox="0 0 800 440"
                role="img"
                aria-label={
                  isKz
                    ? 'Алаш қозғалысының тарихи орындары картасы'
                    : 'Historical map of Alash movement centers'
                }
                style={{
                  transform: `scale(${mapZoom})`,
                  transformOrigin: 'center center',
                  transition: 'transform 250ms ease-out',
                }}
                className="w-full h-full select-none"
              >
                {/* Graticule Grid Lines */}
                {[90, 175, 260, 345].map((y) => (
                  <line
                    key={`lat-${y}`}
                    x1={20}
                    y1={y}
                    x2={780}
                    y2={y}
                    stroke="#CDBFA9"
                    strokeDasharray="4 4"
                    strokeWidth={0.8}
                  />
                ))}
                {[140, 280, 420, 560, 700].map((x) => (
                  <line
                    key={`lng-${x}`}
                    x1={x}
                    y1={20}
                    x2={x}
                    y2={420}
                    stroke="#CDBFA9"
                    strokeDasharray="4 4"
                    strokeWidth={0.8}
                  />
                ))}

                {/* Stylized Steppe Core Contour */}
                <path
                  d="M 310,175 L 385,155 L 495,148 L 615,160 L 705,205 L 700,285 L 620,330 L 520,335 L 435,305 L 340,275 L 295,230 Z"
                  fill="#E2D2B8"
                  fillOpacity={0.75}
                  stroke="#B18A52"
                  strokeWidth={1.5}
                  strokeDasharray="6 3"
                />

                {/* Stylized Water Bodies (Caspian, Aral, Balkhash) */}
                <path
                  d="M 285,255 Q 305,275 300,320 Q 285,350 265,340 Q 260,295 285,255 Z"
                  fill="#CDBFA9"
                  fillOpacity={0.65}
                  stroke="#936F3A"
                  strokeWidth={1}
                />
                <ellipse
                  cx={425}
                  cy={285}
                  rx={18}
                  ry={14}
                  fill="#CDBFA9"
                  fillOpacity={0.65}
                  stroke="#936F3A"
                  strokeWidth={0.9}
                />
                <path
                  d="M 595,280 Q 630,272 655,283 Q 630,293 595,287 Z"
                  fill="#CDBFA9"
                  fillOpacity={0.65}
                  stroke="#936F3A"
                  strokeWidth={0.9}
                />

                {/* Animated Historic Connection Lines across Steppe Hubs */}
                {(() => {
                  const zhympity = projectPoint(50.2447, 52.5975);
                  const oren = projectPoint(51.7681, 55.097);
                  const semey = projectPoint(50.4111, 80.2275);
                  const kark = projectPoint(49.4083, 75.0294);
                  const troitsk = projectPoint(54.0894, 61.5714);
                  return (
                    <g
                      stroke="#722F35"
                      strokeOpacity={0.45}
                      strokeWidth={1.6}
                      strokeDasharray="6 6"
                      className="animate-dash-flow"
                    >
                      <line x1={zhympity.x} y1={zhympity.y} x2={oren.x} y2={oren.y} />
                      <line x1={oren.x} y1={oren.y} x2={troitsk.x} y2={troitsk.y} />
                      <line x1={troitsk.x} y1={troitsk.y} x2={kark.x} y2={kark.y} />
                      <line x1={kark.x} y1={kark.y} x2={semey.x} y2={semey.y} />
                    </g>
                  );
                })()}

                {/* Steppe Region Watermark */}
                <text
                  x={515}
                  y={235}
                  textAnchor="middle"
                  fill="#382B25"
                  fillOpacity={0.22}
                  fontSize="15"
                  fontFamily="Cormorant Garamond, Georgia, serif"
                  fontWeight="bold"
                  letterSpacing="4"
                >
                  {isKz ? 'ҚАЗАҚ ДАЛАСЫ' : 'KAZAKH STEPPE'}
                </text>

                {/* Location Pins */}
                {visibleLocations.map((loc) => {
                  const { x, y } = projectPoint(loc.lat, loc.lng);
                  const isSelected = selectedLocation.id === loc.id;
                  const colors = getPinColors(loc.category, isSelected);
                  const shortLabel = (isKz ? loc.name.kz : loc.name.en).split(' (')[0];

                  return (
                    <g
                      key={loc.id}
                      onClick={() => setSelectedId(loc.id)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`${isKz ? loc.name.kz : loc.name.en} (${loc.era})`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedId(loc.id);
                        }
                      }}
                    >
                      {/* Generous invisible touch target for mobile fingers */}
                      <circle cx={x} cy={y} r={19} fill="transparent" />
                      {isSelected && (
                        <>
                          <circle
                            cx={x}
                            cy={y}
                            r={16}
                            fill={colors.ring}
                            fillOpacity={0.22}
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r={12}
                            fill="none"
                            stroke={colors.ring}
                            strokeWidth={1.4}
                            strokeOpacity={0.65}
                          />
                        </>
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 7.5 : 5.5}
                        fill={colors.fill}
                        stroke={colors.stroke}
                        strokeWidth={2}
                      />
                      <text
                        x={x}
                        y={y - 11}
                        textAnchor="middle"
                        fill={isSelected ? '#722F35' : '#382B25'}
                        fontSize={isSelected ? '11.5' : '10'}
                        fontWeight={isSelected ? '700' : '600'}
                        fontFamily="Manrope, sans-serif"
                      >
                        {shortLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Map Legend & Cartographic Attribution */}
            <div className="px-4 py-2.5 bg-warm-ivory border-t border-soft-line flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-ink-brown/70">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-deep-burgundy inline-block" />
                  {isKz ? 'Алаш орталықтары' : 'Alash Centers'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-forest-ink inline-block" />
                  {isKz ? 'Баспасөз / Білім / Дума' : 'Press / Universities'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-muted-gold inline-block" />
                  {isKz ? 'Түркістан автономиясы (Қоқан)' : 'Turkestan Autonomy'}
                </span>
              </div>
              <span>WGS84 · e-history.kz / Academic Atlas</span>
            </div>
          </div>

          {/* Active Location Dossier Card */}
          <div
            key={selectedLocation.id}
            className="lg:col-span-5 rounded-xl border border-soft-line bg-warm-ivory p-5 sm:p-7 shadow-parchment flex flex-col justify-between animate-fade-up"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-archive-paper text-deep-burgundy font-mono text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedLocation.era}
                </span>
                <span className="font-mono text-[11px] text-ink-brown/60">
                  {selectedLocation.lat.toFixed(2)}°N, {selectedLocation.lng.toFixed(2)}°E
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-brown">
                {isKz ? selectedLocation.name.kz : selectedLocation.name.en}
              </h3>
              {selectedLocation.historicalName && (
                <p className="font-mono text-xs text-muted-gold mt-1">
                  {isKz
                    ? selectedLocation.historicalName.kz
                    : selectedLocation.historicalName.en}
                </p>
              )}

              <p className="mt-3 text-sm font-semibold text-deep-burgundy">
                {isKz
                  ? selectedLocation.historicRole.kz
                  : selectedLocation.historicRole.en}
              </p>

              <p className="mt-3 font-sans text-sm text-ink-brown/85 leading-relaxed">
                {isKz
                  ? selectedLocation.description.kz
                  : selectedLocation.description.en}
              </p>

              {selectedLocation.autonomyNote && (
                <div className="mt-4 p-3 rounded border border-muted-gold/60 bg-archive-paper/45 flex items-start gap-2 text-xs text-ink-brown">
                  <AlertCircle className="w-4 h-4 text-deep-burgundy shrink-0 mt-0.5" />
                  <span>
                    {isKz
                      ? selectedLocation.autonomyNote.kz
                      : selectedLocation.autonomyNote.en}
                  </span>
                </div>
              )}

              {/* Key Events in City */}
              <div className="mt-5">
                <h4 className="font-mono text-xs uppercase tracking-wider text-ink-brown/70 flex items-center gap-1.5 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-deep-burgundy" />
                  {isKz ? 'Маңызды оқиғалар:' : 'Key Historical Events:'}
                </h4>
                <ul className="space-y-2">
                  {selectedLocation.keyEvents.map((ev, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-ink-brown/85 bg-archive-paper/30 px-3 py-2 rounded border border-soft-line/60"
                    >
                      <span className="font-mono font-bold text-deep-burgundy mr-2">
                        {ev.year}:
                      </span>
                      {isKz ? ev.text.kz : ev.text.en}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Figures */}
            <div className="mt-5 pt-4 border-t border-soft-line/70">
              <h4 className="font-mono text-xs uppercase tracking-wider text-ink-brown/70 flex items-center gap-1.5 mb-2">
                <Users className="w-3.5 h-3.5 text-deep-burgundy" />
                {isKz ? 'Байланысты тұлғалар:' : 'Associated Figures:'}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(isKz
                  ? selectedLocation.figuresAssociated.kz
                  : selectedLocation.figuresAssociated.en
                ).map((person, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-archive-paper/60 border border-soft-line text-xs text-ink-brown"
                  >
                    {person}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Accessible City List Directory (Mobile & Quick Jump) */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5"
          role="list"
          aria-label={isKz ? 'Тарихи қалалар тізімі' : 'Historical cities list'}
        >
          {visibleLocations.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedId(loc.id)}
                aria-pressed={isSelected}
                className={`p-3 rounded-card border text-left transition-all ${
                  isSelected
                    ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy shadow-subtle'
                    : 'bg-warm-ivory hover:bg-archive-paper/60 text-ink-brown border-soft-line'
                }`}
              >
                <div className="font-serif font-bold text-sm leading-snug">
                  {isKz ? loc.name.kz : loc.name.en}
                </div>
                <div
                  className={`font-mono text-[10px] mt-1 ${
                    isSelected ? 'text-warm-ivory/80' : 'text-muted-gold'
                  }`}
                >
                  {loc.era}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

