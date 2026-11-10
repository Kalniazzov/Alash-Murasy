import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { Timeline } from '@/components/sections/Timeline';
import { TimelineEvent } from '@/data/types';

// Mock dataset with multiple periods and figures
const mockEvents: TimelineEvent[] = [
  {
    id: 'qarqaraly_1905',
    year: 1905,
    month: '06',
    dateStr: { kz: '1905 ж. маусым', en: 'June 1905' },
    title: { kz: 'Қарқаралы петициясы', en: 'Karkaraly Petition' },
    summary: {
      kz: 'Қоянды жәрмеңкесінде патшаға 14 500 адам қол қойған петиция жолданды.',
      en: 'Petition with 14,500 signatures sent to the Tsar from the Koyandy fair.',
    },
    details: {
      kz: 'Петицияда жер, дін, ұлттық тіл, мектеп ашу және сайлау құқығы мәселелері көтерілді.',
      en: 'The petition demanded land rights, freedom of religion, native schools, and political representation.',
    },
    significance: {
      kz: 'Қазақ халқының ХХ ғасырдағы алғашқы жалпыұлттық саяси бағдарламалық талабы.',
      en: 'The first nationwide political manifest of the Kazakh people in the 20th century.',
    },
    location: { kz: 'Қарқаралы', en: 'Karkaraly' },
    figuresInvolved: ['bokeikhanov', 'dulatov', 'aqbaev'],
    period: '1905-1907',
  },
  {
    id: 'aiqap_1911',
    year: 1911,
    month: '01',
    dateStr: { kz: '1911 ж. қаңтар', en: 'January 1911' },
    title: { kz: '«Айқап» журналының жарық көруі', en: 'Founding of Aiqap Magazine' },
    summary: {
      kz: 'Троицк қаласында Мұхамеджан Сералиннің басшылығымен «Айқап» журналы шыға бастады.',
      en: 'Aiqap magazine began publication in Troitsk under the editorship of Mukhamedzhan Seralin.',
    },
    details: {
      kz: 'Журнал қазақ даласындағы ағарту, жер және әйел теңдігі мәселелерін жүйелі талқылады.',
      en: 'The journal addressed enlightenment, agrarian issues, and gender equality in Kazakh society.',
    },
    significance: {
      kz: 'Тұңғыш ұлттық қоғамдық-саяси және әдеби журнал мінбері.',
      en: 'The first Kazakh socio-political and literary periodical forum.',
    },
    location: { kz: 'Троицк', en: 'Troitsk' },
    figuresInvolved: ['seralin', 'toraighyrov'],
    period: '1908-1916',
  },
  {
    id: 'alash_autonomy_1917',
    year: 1917,
    month: '12',
    dateStr: { kz: '1917 ж. желтоқсан', en: 'December 1917' },
    title: { kz: 'Алаш автономиясының жариялануы', en: 'Declaration of Alash Autonomy' },
    summary: {
      kz: 'Екінші жалпықазақ съезінде Алаш автономиясы мен Алашорда үкіметі құрылды.',
      en: 'Second All-Kazakh Congress established Alash Autonomy and the Alash Orda government.',
    },
    details: {
      kz: 'Әлихан Бөкейханов баламалы дауыс беру нәтижесінде Алашорда төрағасы болып сайланды.',
      en: 'Alikhan Bokeikhanov was elected Chairman of Alash Orda via contested ballot.',
    },
    significance: {
      kz: 'ХХ ғасырдағы қазақ ұлттық мемлекеттілігінің негізін қалаған тарихи қадам.',
      en: 'Foundational breakthrough in modern Kazakh statehood and constitutionalism.',
    },
    location: { kz: 'Орынбор', en: 'Orenburg' },
    figuresInvolved: ['bokeikhanov', 'baitursynov', 'dulatov', 'zh_dosmukhamedov'],
    period: '1917-1920',
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

describe('Timeline Component Suite', () => {
  it('renders Timeline section landmark with correct initial header text', () => {
    renderWithProviders(<Timeline events={mockEvents} />);

    const section = document.getElementById('timeline');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'timeline-heading');

    expect(screen.getByRole('heading', { level: 2, name: /Уақыт сызығы/i })).toBeInTheDocument();
    expect(screen.getByText(/МҰРАҒАТТЫҚ ХРОНОЛОГИЯ/i)).toBeInTheDocument();
  });

  it('renders all 4 period filter tabs with accessible roles', () => {
    renderWithProviders(<Timeline events={mockEvents} />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    const tabs = within(tablist).getAllByRole('tab');
    expect(tabs).toHaveLength(4);

    expect(screen.getByRole('tab', { name: /Барлық кезеңдер/i })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', { name: /Ояну жылдары/i })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('filters events when switching period tabs', () => {
    renderWithProviders(<Timeline events={mockEvents} />);

    // Initially all 3 events are present
    expect(screen.getByRole('heading', { level: 3, name: /Қарқаралы петициясы/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /«Айқап» журналының жарық көруі/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Алаш автономиясының жариялануы/i })).toBeInTheDocument();

    // Click '1905–1907' tab
    const tab1905 = screen.getByRole('tab', { name: /Ояну жылдары/i });
    fireEvent.click(tab1905);

    expect(tab1905).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { level: 3, name: /Қарқаралы петициясы/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: /«Айқап» журналының жарық көруі/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: /Алаш автономиясының жариялануы/i })).not.toBeInTheDocument();

    // Click '1908–1916' tab
    const tab1908 = screen.getByRole('tab', { name: /Баспасөз бен ағарту/i });
    fireEvent.click(tab1908);

    expect(screen.queryByRole('heading', { level: 3, name: /Қарқаралы петициясы/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /«Айқап» журналының жарық көруі/i })).toBeInTheDocument();

    // Click '1917–1920' tab
    const tab1917 = screen.getByRole('tab', { name: /Алашорда дәуірі/i });
    fireEvent.click(tab1917);

    expect(screen.queryByRole('heading', { level: 3, name: /«Айқап» журналының жарық көруі/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Алаш автономиясының жариялануы/i })).toBeInTheDocument();

    // Switch back to 'All'
    const tabAll = screen.getByRole('tab', { name: /Барлық кезеңдер/i });
    fireEvent.click(tabAll);

    expect(screen.getByRole('heading', { level: 3, name: /Қарқаралы петициясы/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /«Айқап» журналының жарық көруі/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Алаш автономиясының жариялануы/i })).toBeInTheDocument();
  });

  it('expands and collapses event details when clicking the toggle button', () => {
    renderWithProviders(<Timeline events={mockEvents} />);

    // Initially details container is not in DOM
    expect(
      screen.queryByText(/Петицияда жер, дін, ұлттық тіл/i)
    ).not.toBeInTheDocument();

    // Find and click the toggle button for the first event
    const toggleButtons = screen.getAllByRole('button', { name: /Толығырақ/i });
    expect(toggleButtons[0]).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleButtons[0]);

    // Now details, significance, and figure chips appear
    expect(toggleButtons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Петицияда жер, дін, ұлттық тіл/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Қазақ халқының ХХ ғасырдағы алғашқы жалпыұлттық/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /#bokeikhanov/i })).toBeInTheDocument();

    // Clicking again collapses details
    fireEvent.click(toggleButtons[0]);
    expect(
      screen.queryByText(/Петицияда жер, дін, ұлттық тіл/i)
    ).not.toBeInTheDocument();
  });

  it('handles Expand All and Collapse All correctly', () => {
    renderWithProviders(<Timeline events={mockEvents} />);

    const expandAllBtn = screen.getByRole('button', { name: /Барлығын ашу/i });
    fireEvent.click(expandAllBtn);

    // All 3 events should now have their details visible
    expect(screen.getByText(/Петицияда жер, дін, ұлттық тіл/i)).toBeInTheDocument();
    expect(screen.getByText(/Журнал қазақ даласындағы ағарту/i)).toBeInTheDocument();
    expect(screen.getByText(/Әлихан Бөкейханов баламалы дауыс беру нәтижесінде/i)).toBeInTheDocument();

    // Button text changes to "Барлығын жинау"
    const collapseAllBtn = screen.getByRole('button', { name: /Барлығын жинау/i });
    fireEvent.click(collapseAllBtn);

    expect(screen.queryByText(/Петицияда жер, дін, ұлттық тіл/i)).not.toBeInTheDocument();
  });

  it('navigates chronological steps with previous and next buttons', () => {
    renderWithProviders(<Timeline events={mockEvents} />);

    const prevBtn = screen.getByRole('button', { name: /Алдыңғы/i });
    const nextBtn = screen.getByRole('button', { name: /Келесі/i });

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    fireEvent.click(nextBtn);
    expect(prevBtn).not.toBeDisabled();

    fireEvent.click(nextBtn);
    expect(nextBtn).toBeDisabled();
  });

  it('supports figure chip click callback and fallback scroll', () => {
    const onSelectFigure = vi.fn();
    renderWithProviders(
      <Timeline events={mockEvents} onSelectFigure={onSelectFigure} />
    );

    // Expand first event
    const toggleBtn = screen.getAllByRole('button', { name: /Толығырақ/i })[0];
    fireEvent.click(toggleBtn);

    const figChip = screen.getByRole('button', { name: /#bokeikhanov/i });
    fireEvent.click(figChip);

    expect(onSelectFigure).toHaveBeenCalledWith('bokeikhanov');
  });

  it('dynamically adapts content on language switch between KZ and EN', () => {
    renderWithProviders(
      <>
        <LanguageSwitcherToggle />
        <Timeline events={mockEvents} />
      </>
    );

    // Initial KZ text
    expect(screen.getByRole('heading', { level: 3, name: /Қарқаралы петициясы/i })).toBeInTheDocument();
    expect(screen.getByText('Қарқаралы')).toBeInTheDocument();

    // Toggle to EN
    const switchBtn = screen.getByTestId('lang-toggle-btn');
    fireEvent.click(switchBtn);

    expect(screen.getByRole('heading', { level: 3, name: /Karkaraly Petition/i })).toBeInTheDocument();
    expect(screen.getByText('Karkaraly')).toBeInTheDocument();
    expect(screen.getByText(/ARCHIVAL CHRONOLOGY/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Interactive Timeline/i })).toBeInTheDocument();
  });
});
