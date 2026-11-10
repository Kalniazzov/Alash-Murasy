import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { FiguresGallery } from '@/components/sections/FiguresGallery';
import { Figure } from '@/data/types';

const mockFigures: Figure[] = [
  {
    id: 'bokeikhanov',
    name: { kz: 'Әлихан Бөкейханов', en: 'Alikhan Bokeikhanov' },
    lifeYears: '1866–1937',
    role: 'leader',
    roleTitle: { kz: 'Алашорда үкіметінің төрағасы', en: 'Chairman of Alash Orda Government' },
    shortBio: {
      kz: 'Ұлт-азаттық қозғалыстың көсемі, қоғам қайраткері, экономист-ғалым.',
      en: 'Leader of the national liberation movement, statesman, and economist.',
    },
    fullBio: {
      kz: 'Әлихан Нұрмұхамедұлы Бөкейханов — ХХ ғасыр басындағы қазақ зиялыларының рухани жетекшісі.',
      en: 'Alikhan Bokeikhanov was the visionary leader of the Kazakh intellectual renaissance.',
    },
    education: {
      kz: 'Санкт-Петербург Императорлық орман институтын бітірген.',
      en: 'Graduated from the Saint Petersburg Imperial Forestry Institute.',
    },
    keyWorks: {
      kz: ['«Қырғыз өлкесінің тарихи очеркі»', '«Қазақ» газетіндегі бағдарламалық мақалалар'],
      en: ['Historical Sketch of the Kazakh Steppe', 'Editorial essays in Qazaq newspaper'],
    },
    quote: {
      kz: 'Тірі болсам, қазаққа қызмет қылмай қоймаймын.',
      en: 'As long as I live, I shall not cease to serve the Kazakh people.',
      citation: 'Әлихан Бөкейханов, 1906 ж.',
    },
    milestones: [
      { year: 1905, event: { kz: 'Қарқаралы петициясын ұйымдастырушылардың бірі', en: 'Co-author of the Karkaraly Petition' } },
      { year: 1906, event: { kz: 'І Мемлекеттік Дума депутаты болып сайланды', en: 'Elected deputy of the 1st State Duma' } },
      { year: 1917, event: { kz: 'Алашорда үкіметінің төрағасы болып сайланды', en: 'Elected Chairman of Alash Orda Government' } },
    ],
    photoUrl: '/portraits/bokeikhanov.webp',
    isCore: true,
  },
  {
    id: 'baitursynov',
    name: { kz: 'Ахмет Байтұрсынұлы', en: 'Akhmet Baitursynov' },
    lifeYears: '1872–1937',
    role: 'writer',
    roleTitle: { kz: 'Ұлт ұстазы, «Қазақ» газетінің бас редакторы', en: 'Teacher of the Nation, Chief Editor of Qazaq' },
    shortBio: {
      kz: 'Ағартушы, қазақ тіл білімінің атасы, ақын, реформатор.',
      en: 'Enlightener, founding father of Kazakh linguistics, poet, and reformer.',
    },
    fullBio: {
      kz: 'Ахмет Байтұрсынұлы қазақ әліпбиін реформалап, төте жазуды жасады.',
      en: 'Akhmet Baitursynov reformed the Arabic script into the Kazakh Tote Zhazu alphabet.',
    },
    education: {
      kz: 'Орынбор мұғалімдер семинариясын тәмамдаған.',
      en: 'Graduated from the Orenburg Teachers Seminary.',
    },
    keyWorks: {
      kz: ['«Қырық мысал» (1909)', '«Маса» (1911)', '«Тіл — құрал» (1914)'],
      en: ['Forty Fables (1909)', 'The Mosquito (1911)', 'Language Instrument (1914)'],
    },
    quote: {
      kz: 'Сөзі жоғалған жұрттың өзі де жоғалады.',
      en: 'A nation that loses its language shall itself be lost.',
      citation: 'Ахмет Байтұрсынұлы, 1913 ж.',
    },
    milestones: [
      { year: 1909, event: { kz: 'Семей түрмесіне қамалды', en: 'Imprisoned in Semipalatinsk prison' } },
      { year: 1913, event: { kz: '«Қазақ» газетін шығара бастады', en: 'Founded and edited Qazaq newspaper' } },
      { year: 1920, event: { kz: 'Қазақ автономиясының Оқу-ағарту халық комиссары', en: 'People Commissar of Education' } },
    ],
    photoUrl: '/portraits/baitursynov.webp',
    isCore: true,
  },
  {
    id: 'aqbaev',
    name: { kz: 'Жақып Ақбаев', en: 'Zhaqyp Aqbaev' },
    lifeYears: '1876–1934',
    role: 'jurist',
    roleTitle: { kz: 'Қазақтан шыққан тұңғыш құқық магистрі', en: 'First Kazakh Master of Jurisprudence' },
    shortBio: {
      kz: 'Алаш қозғалысының көрнекті қайраткері, заң ғылымдарының магистрі.',
      en: 'Prominent Alash activist and Master of Jurisprudence.',
    },
    fullBio: {
      kz: 'Жақып Ақбаев патшалық билік тұсында ұлт құқықтарын заң жүзінде қорғаған.',
      en: 'Zhaqyp Aqbaev defended national human and civic rights under Tsarist law.',
    },
    education: {
      kz: 'Санкт-Петербург университетінің заң факультетін 1-дәрежелі дипломмен бітірген.',
      en: 'Graduated with 1st Class Honours from Saint Petersburg University Faculty of Law.',
    },
    keyWorks: {
      kz: ['Қарқаралы петициясының заңдық баптары', '«Қазақтардың отбасылық құқығы»'],
      en: ['Legal articles of Karkaraly Petition', 'Family Law of the Kazakhs'],
    },
    quote: {
      kz: 'Заң алдында барлық адам тең болуы — әділетті қоғамның басты шарты.',
      en: 'Equality of all before the law is the primary condition of a just society.',
      citation: 'Жақып Ақбаев, 1907 ж.',
    },
    milestones: [
      { year: 1905, event: { kz: 'Қарқаралы петициясының заң мәтінін түзісті', en: 'Drafted legal provisions of the Karkaraly Petition' } },
      { year: 1908, event: { kz: 'Саяси белсенділігі үшін жер аударылды', en: 'Exiled for political activism' } },
      { year: 1917, event: { kz: 'Алашорда мүшелігіне сайланды', en: 'Elected member of Alash Orda' } },
    ],
    photoUrl: undefined,
    isCore: false,
  },
  {
    id: 'ermekov',
    name: { kz: 'Әлімхан Ермеков', en: 'Alimkhan Ermekov' },
    lifeYears: '1891–1970',
    role: 'scholar',
    roleTitle: { kz: 'Тұңғыш қазақ математика профессоры', en: 'First Kazakh Professor of Mathematics' },
    shortBio: {
      kz: 'Алашорданың ең жас мүшесі, шекара комиссиясының төрағасы, математик.',
      en: 'Youngest Alash Orda member, border delineation commissioner, and mathematician.',
    },
    fullBio: {
      kz: 'Әлімхан Ермеков 1920 жылы Мәскеуде Ленин алдында Қазақстанның шекарасын ғылыми дәлелдеп қорғаған.',
      en: 'Alimkhan Ermekov defended and secured Kazakhstan national borders in Moscow in 1920.',
    },
    education: {
      kz: 'Томск технологиялық институтын бітірген.',
      en: 'Graduated from Tomsk Institute of Technology.',
    },
    keyWorks: {
      kz: ['«Қазақ шекарасы туралы баяндама»', '«Ұлы математика курсы»'],
      en: ['Report on Kazakh Borders', 'Higher Mathematics Course'],
    },
    quote: {
      kz: 'Қазақтың жері — қазақтың мәңгілік еншісі.',
      en: 'The land of the Kazakhs is the eternal heritage of the Kazakh people.',
      citation: 'Әлімхан Ермеков, 1920 ж.',
    },
    milestones: [
      { year: 1917, event: { kz: 'Екінші жалпықазақ съезінде Алашорда мүшесі болып сайланды', en: 'Elected Alash Orda member at 2nd All-Kazakh Congress' } },
      { year: 1920, event: { kz: 'Мәскеуде қазақ жерінің шекарасын қорғап қалды', en: 'Defended borders of Kazakhstan in Moscow' } },
    ],
    photoUrl: undefined,
    isCore: false,
  },
];

const LanguageSwitcherToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      onClick={() => setLanguage(language === 'kz' ? 'en' : 'kz')}
      data-testid="lang-toggle-btn"
    >
      Switch Lang
    </button>
  );
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('FiguresGallery and FigureModal Integration Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders FiguresGallery section landmark and heading', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    const section = document.getElementById('figures');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'figures-heading');

    expect(screen.getByRole('heading', { level: 2, name: /Алаш зиялыларының галереясы/i })).toBeInTheDocument();
    expect(screen.getByText(/ҰЛТ ҚАЙРАТКЕРЛЕРІ/i)).toBeInTheDocument();
  });

  it('initially displays all figures in gallery grid', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    expect(screen.getByText(/Әлихан Бөкейханов/i)).toBeInTheDocument();
    expect(screen.getByText(/Ахмет Байтұрсынұлы/i)).toBeInTheDocument();
    expect(screen.getByText(/Жақып Ақбаев/i)).toBeInTheDocument();
    expect(screen.getByText(/Әлімхан Ермеков/i)).toBeInTheDocument();
  });

  it('filters figures via live search by name', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    const searchInput = screen.getByPlaceholderText(/Тұлғаның аты, қызметі, білімі немесе еңбегі/i);
    fireEvent.change(searchInput, { target: { value: 'Бөкейхан' } });

    expect(screen.getByText(/Әлихан Бөкейханов/i)).toBeInTheDocument();
    expect(screen.queryByText(/Ахмет Байтұрсынұлы/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Жақып Ақбаев/i)).not.toBeInTheDocument();
  });

  it('filters figures via live search by key works or education', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    const searchInput = screen.getByPlaceholderText(/Тұлғаның аты, қызметі, білімі немесе еңбегі/i);
    fireEvent.change(searchInput, { target: { value: 'Маса' } });

    expect(screen.getByText(/Ахмет Байтұрсынұлы/i)).toBeInTheDocument();
    expect(screen.queryByText(/Әлихан Бөкейханов/i)).not.toBeInTheDocument();
  });

  it('displays empty state and allows resetting filters when no figures match query', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    const searchInput = screen.getByPlaceholderText(/Тұлғаның аты, қызметі, білімі немесе еңбегі/i);
    fireEvent.change(searchInput, { target: { value: 'Белгісіз қайраткер' } });

    expect(screen.getByText(/Сұранысқа сәйкес тұлға табылмады/i)).toBeInTheDocument();

    const clearBtn = screen.getAllByRole('button', { name: /Сүзгілерді тазарту/i })[0];
    fireEvent.click(clearBtn);

    expect(screen.getByText(/Әлихан Бөкейханов/i)).toBeInTheDocument();
    expect(screen.getByText(/Ахмет Байтұрсынұлы/i)).toBeInTheDocument();
  });

  it('filters figures by role pills', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    // Click Jurists pill
    const juristPill = screen.getByRole('button', { name: /Заңгерлер/i });
    fireEvent.click(juristPill);

    expect(screen.getByText(/Жақып Ақбаев/i)).toBeInTheDocument();
    expect(screen.queryByText(/Әлихан Бөкейханов/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ахмет Байтұрсынұлы/i)).not.toBeInTheDocument();

    // Click Scholars pill
    const scholarPill = screen.getByRole('button', { name: /Ғалымдар мен ағартушылар/i });
    fireEvent.click(scholarPill);

    expect(screen.getByText(/Әлімхан Ермеков/i)).toBeInTheDocument();
    expect(screen.queryByText(/Жақып Ақбаев/i)).not.toBeInTheDocument();

    // Click All pill
    const allPill = screen.getByRole('button', { name: /Барлығы/i });
    fireEvent.click(allPill);

    expect(screen.getByText(/Әлихан Бөкейханов/i)).toBeInTheDocument();
    expect(screen.getByText(/Жақып Ақбаев/i)).toBeInTheDocument();
  });

  it('toggles between Core Leaders (8/2) and All figures (16/4)', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    const coreToggle = screen.getByRole('button', { name: /Негізгі құрам/i });
    fireEvent.click(coreToggle);

    // Only core figures (bokeikhanov, baitursynov)
    expect(screen.getByText(/Әлихан Бөкейханов/i)).toBeInTheDocument();
    expect(screen.getByText(/Ахмет Байтұрсынұлы/i)).toBeInTheDocument();
    expect(screen.queryByText(/Жақып Ақбаев/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Әлімхан Ермеков/i)).not.toBeInTheDocument();

    const allToggle = screen.getByRole('button', { name: /Барлық тұлғалар/i });
    fireEvent.click(allToggle);

    expect(screen.getByText(/Жақып Ақбаев/i)).toBeInTheDocument();
    expect(screen.getByText(/Әлімхан Ермеков/i)).toBeInTheDocument();
  });

  it('toggles favorite bookmark without opening modal due to stopPropagation', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    // Initially modal is not open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Find favorite button for Bokeikhanov
    const favBtn = screen.getAllByRole('button', { name: /Таңдаулыға қосу/i })[0];
    fireEvent.click(favBtn);

    // Modal should NOT be opened
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Button label updates to remove favorite
    expect(screen.getByRole('button', { name: /(?:Таңдаулыдан )?өшіру/i })).toBeInTheDocument();

    // Clicking again toggles off
    const unfavBtn = screen.getByRole('button', { name: /(?:Таңдаулыдан )?өшіру/i });
    fireEvent.click(unfavBtn);

    expect(screen.queryByRole('button', { name: /(?:Таңдаулыдан )?өшіру/i })).not.toBeInTheDocument();
  });

  it('opens FigureModal when clicking figure card and renders full accessible dossier', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    // Click on Bokeikhanov card
    const card = screen.getByRole('button', { name: /Әлихан Бөкейханов, 1866–1937/i });
    fireEvent.click(card);

    // Modal dialog is opened
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'figure-modal-name');

    // Header info in modal
    expect(within(modal).getByRole('heading', { level: 3, name: /Әлихан Бөкейханов/i })).toBeInTheDocument();
    expect(within(modal).getByText('1866–1937')).toBeInTheDocument();
    expect(within(modal).getByText(/Алашорда үкіметінің төрағасы/i)).toBeInTheDocument();

    // Tab 1 Bio content and Quote
    expect(within(modal).getByText(/Әлихан Нұрмұхамедұлы Бөкейханов/i)).toBeInTheDocument();
    expect(within(modal).getByText(/Тірі болсам, қазаққа қызмет қылмай қоймаймын/i)).toBeInTheDocument();
    expect(within(modal).getByText(/Әлихан Бөкейханов, 1906 ж./i)).toBeInTheDocument();

    // Switch to Education tab
    const eduTab = within(modal).getByRole('tab', { name: /Білімі мен қызметі/i });
    fireEvent.click(eduTab);
    expect(within(modal).getByText(/Санкт-Петербург Императорлық орман институтын бітірген/i)).toBeInTheDocument();

    // Switch to Key Works tab
    const worksTab = within(modal).getByRole('tab', { name: /Негізгі еңбектері/i });
    fireEvent.click(worksTab);
    expect(within(modal).getByText(/Қырғыз өлкесінің тарихи очеркі/i)).toBeInTheDocument();

    // Switch to Milestones tab
    const milestonesTab = within(modal).getByRole('tab', { name: /Маңызды белестер/i });
    fireEvent.click(milestonesTab);
    expect(within(modal).getByText(/І Мемлекеттік Дума депутаты болып сайланды/i)).toBeInTheDocument();

    // Close modal via close button
    const closeBtn = within(modal).getAllByRole('button', { name: /Жабу/i })[0];
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes FigureModal when Escape key is pressed', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    const card = screen.getByRole('button', { name: /Ахмет Байтұрсынұлы, 1872–1937/i });
    fireEvent.click(card);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Fire Escape key
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders monogram seal fallback for figures without photoUrl', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    // Aqbaev has no photoUrl, should render monogram 'ЖА'
    expect(screen.getByText('ЖА')).toBeInTheDocument();
    expect(screen.getAllByText(/АРХИВТІК ПОРТРЕТ/i)[0]).toBeInTheDocument();
  });

  it('dynamically adapts texts across gallery and modal when switching language', () => {
    renderWithProviders(
      <>
        <LanguageSwitcherToggle />
        <FiguresGallery figures={mockFigures} />
      </>
    );

    // Initial KZ text
    expect(screen.getByText(/Алаш зиялыларының галереясы/i)).toBeInTheDocument();
    expect(screen.getByText(/Әлихан Бөкейханов/i)).toBeInTheDocument();

    // Switch language to EN
    const switchBtn = screen.getByTestId('lang-toggle-btn');
    fireEvent.click(switchBtn);

    expect(screen.getByText(/Alash Intellectuals Gallery/i)).toBeInTheDocument();
    expect(screen.getByText(/Alikhan Bokeikhanov/i)).toBeInTheDocument();
    expect(screen.getByText(/INTELLECTUAL LEADERS/i)).toBeInTheDocument();

    // Open modal in EN
    const card = screen.getByRole('button', { name: /Alikhan Bokeikhanov, 1866–1937/i });
    fireEvent.click(card);

    const modal = screen.getByRole('dialog');
    expect(within(modal).getByText(/Chairman of Alash Orda Government/i)).toBeInTheDocument();
    expect(within(modal).getByText(/As long as I live, I shall not cease to serve the Kazakh people/i)).toBeInTheDocument();
  });

  it('renders Poster-Shezhire centered on Bokeikhanov, shows live historical bonds on focus, and switches to Cards view', () => {
    renderWithProviders(<FiguresGallery figures={mockFigures} />);

    // Default layout is Poster-Shezhire with central leader insignia
    expect(screen.getByText('ОРТАЛЫҚ ТҰЛҒА')).toBeInTheDocument();
    expect(screen.getByText(/АЛАШ ОРДАСЫ · БІРТҰТАС ТАРИХИ ШЕЖІРЕ-ПОСТЕР/i)).toBeInTheDocument();

    // Focusing Baitursynov plaque reveals his historical bond in the top ribbon
    const baitursynovPlaque = screen.getByRole('button', { name: /Ахмет Байтұрсынұлы, 1872–1937/i });
    fireEvent.focus(baitursynovPlaque);
    expect(screen.getByText(/Орынборда «Қазақ» газетін бірге шығарып/i)).toBeInTheDocument();

    // Portrait img uses face-centered vertical object-position (50% 15% for bokeikhanov)
    const bokeikhanovImg = screen.getByAltText(/Әлихан Бөкейханов/i);
    expect(bokeikhanovImg).toHaveStyle({ objectPosition: '50% 15%' });

    // Switch to Cards Grid view and verify tall card actions appear
    const cardsToggle = screen.getByRole('button', { name: /Карточкалар/i });
    fireEvent.click(cardsToggle);
    expect(cardsToggle).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByText(/Өмірбаянды оқу/i).length).toBe(mockFigures.length);
  });
});
