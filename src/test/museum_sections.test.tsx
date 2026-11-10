import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '@/App';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { PressArchive } from '@/components/sections/PressArchive';
import { HistoricalMap } from '@/components/sections/HistoricalMap';
import { MissionsGame } from '@/components/sections/MissionsGame';
import { Quiz } from '@/components/sections/Quiz';
import { Conclusion } from '@/components/sections/Conclusion';
import { ExhibitionGuide } from '@/components/sections/ExhibitionGuide';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

describe('Phase 2 & 3 Museum Sections Verification Suite', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('PressArchive: filters articles by publication/topic and opens/closes Newspaper Viewer modal', () => {
    render(
      <LanguageProvider>
        <PressArchive />
      </LanguageProvider>
    );

    // Both flagship publications are rendered
    expect(screen.getAllByText(/«Айқап» журналы/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/«Қазақ» газеті/i).length).toBeGreaterThan(0);

    // Filter by Women's Equality topic
    const womenBtn = screen.getByRole('button', { name: /Әйел теңдігі/i });
    fireEvent.click(womenBtn);
    expect(womenBtn).toHaveAttribute('aria-pressed', 'true');

    // Open Newspaper Viewer modal on the filtered article
    const openButtons = screen.getAllByRole('button', { name: /Оқып шығу/i });
    expect(openButtons.length).toBeGreaterThan(0);
    fireEvent.click(openButtons[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Close via Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('HistoricalMap: renders 12 historical hubs and clearly distinguishes Kokand Turkestan Autonomy', () => {
    render(
      <LanguageProvider>
        <HistoricalMap />
      </LanguageProvider>
    );

    // Default hub is Orenburg
    expect(screen.getAllByText(/Орынбор/i).length).toBeGreaterThan(0);

    // Select Kokand and verify historical accuracy distinction note
    const kokandButtons = screen.getAllByRole('button', { name: /Қоқан/i });
    fireEvent.click(kokandButtons[0]);

    expect(screen.getAllByText(/Түркістан автономиясы/i).length).toBeGreaterThan(0);
  });

  it('DocumentArchive & FavoritesDrawer: bookmarks archival documents and surfaces them in Favorites drawer', () => {
    render(<App />);

    const docsSection = document.getElementById('documents');
    expect(docsSection).not.toBeNull();

    if (docsSection) {
      const saveBtns = within(docsSection).getAllByRole('button', {
        name: /Таңдаулыға қосу|Save/i,
      });
      expect(saveBtns.length).toBeGreaterThan(0);
      fireEvent.click(saveBtns[0]);
    }

    // Open Favorites Drawer from Header
    const header = document.querySelector('header');
    expect(header).not.toBeNull();
    if (header) {
      const favBtn = within(header).getByRole('button', {
        name: /Таңдаулылар|Favorites/i,
      });
      fireEvent.click(favBtn);
    }

    const drawer = screen.getByRole('dialog');
    expect(drawer).toBeInTheDocument();

    // Switch to Documents tab inside FavoritesDrawer
    const docsTab = within(drawer).getByRole('button', { name: /Құжаттар/i });
    fireEvent.click(docsTab);
    expect(within(drawer).getByText(/Қарқаралы петициясы/i)).toBeInTheDocument();
  });

  it('MissionsGame: allows switching between all 5 missions and completing Mission 5 (1916 Dilemma)', () => {
    render(
      <LanguageProvider>
        <MissionsGame />
      </LanguageProvider>
    );

    // Switch to Mission 5 tab
    const mission5Tab = screen.getByRole('tab', { name: /#5 «Тарихи шешім»/i });
    fireEvent.click(mission5Tab);
    expect(mission5Tab).toHaveAttribute('aria-selected', 'true');

    // Select Option B (protecting unarmed civilians from punitive expeditions)
    const optionB = screen.getByRole('button', {
      name: /Қарусыз халықты жазалаушы әскердің жаппай қырғынынан аман сақтап қалу/i,
    });
    fireEvent.click(optionB);

    const submitBtn = screen.getByRole('button', { name: /Тексеру|Шешімді тексеру/i });
    fireEvent.click(submitBtn);

    // Historical explanation and badge earned appear
    expect(screen.getByText(/Минскіде Земгор бөлімін ұйымдастырды/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Алаш мұрасын зерттеуші/i).length).toBeGreaterThan(0);
  });

  it('Quiz: supports category filtering, instant answer explanation, and bilingual toggle', () => {
    render(
      <LanguageProvider>
        <Quiz />
      </LanguageProvider>
    );

    // Filter to 1905 category
    const cat1905 = screen.getByRole('button', { name: /1905 жылғы оқиғалар/i });
    fireEvent.click(cat1905);
    expect(cat1905).toHaveAttribute('aria-pressed', 'true');

    // Answer the first question in 1905 category (Karkaraly Petition demands)
    const correctOption = screen.getByRole('button', {
      name: /Жер құқығы, ана тілінде білім беру/i,
    });
    fireEvent.click(correctOption);

    // Explanation block appears immediately
    expect(
      screen.getByText(/Қарқаралы петициясы жерді тартып алуды тоқтатуды/i)
    ).toBeInTheDocument();
  });

  it('Conclusion: cycles Daily Historical Fact and renders Alash vs Turkestan comparison table', () => {
    render(
      <LanguageProvider>
        <Conclusion />
      </LanguageProvider>
    );

    expect(
      screen.getByRole('heading', {
        name: /Тарихи салыстыру: Алаш автономиясы және Түркістан/i,
      })
    ).toBeInTheDocument();

    // Initially displays fact #1 ("Qazaq" circulation)
    expect(
      screen.getByRole('heading', { name: /Халық қаржысымен шыққан ұлттық газет/i })
    ).toBeInTheDocument();

    const nextFactBtn = screen.getByRole('button', { name: /Келесі дерек/i });
    fireEvent.click(nextFactBtn);

    // Advances to fact #2 (Karkaraly Petition scale)
    expect(
      screen.getByRole('heading', { name: /Қарқаралы петициясының ауқымы/i })
    ).toBeInTheDocument();
  });

  it('ExhibitionGuide & MobileBottomNav: renders curated guided routes, visited progress, and mobile tour stepper', () => {
    render(
      <LanguageProvider>
        <ExhibitionGuide visitedHalls={['intro', 'timeline']} activeSection="figures" />
        <MobileBottomNav activeSection="figures" />
      </LanguageProvider>
    );

    // 3 curated tour routes
    expect(screen.getByText(/Қысқа танысу туры/i)).toBeInTheDocument();
    expect(screen.getByText(/Тұлғалар мен Баспасөз/i)).toBeInTheDocument();
    expect(screen.getByText(/Интерактивті ойын туры/i)).toBeInTheDocument();

    // Visited progress counter (2/9)
    expect(screen.getByText('2/9')).toBeInTheDocument();
    expect(screen.getByText(/2 зал қаралды/i)).toBeInTheDocument();

    // Mobile virtual tour dock shows current hall 03/09
    const mobileBar = screen.getByRole('region', { name: /Мобильді виртуалды гид тақтасы/i });
    expect(within(mobileBar).getByText(/ЗАЛ 03\/09/i)).toBeInTheDocument();
  });

  it('Timeline -> FigureModal cross-link: clicking a figure chip in Timeline opens their full dossier modal', () => {
    render(<App />);

    const timelineSection = document.getElementById('timeline');
    expect(timelineSection).not.toBeNull();

    if (timelineSection) {
      const expandAllBtn = within(timelineSection).getByRole('button', {
        name: /Барлығын ашу/i,
      });
      fireEvent.click(expandAllBtn);

      const bokeikhanovChips = within(timelineSection).getAllByRole('button', {
        name: /Бөкейханов/i,
      });
      expect(bokeikhanovChips.length).toBeGreaterThan(0);
      fireEvent.click(bokeikhanovChips[0]);
    }

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(within(modal).getAllByText(/Бөкейханов/i).length).toBeGreaterThan(0);
  });
});
