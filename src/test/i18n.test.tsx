import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '@/App';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';

// Helper component to verify hook edge-cases in isolation
const TranslationProbe = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="translated-title">{t('hero.title')}</span>
      <span data-testid="missing-key">{t('missing.key.test', 'Fallback Default')}</span>
      <button onClick={() => setLanguage('en')} data-testid="switch-en-btn">
        Set EN
      </button>
      <button onClick={() => setLanguage('kz')} data-testid="switch-kz-btn">
        Set KZ
      </button>
    </div>
  );
};

describe('i18n & LanguageContext Dynamic Behavior', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = 'kk';
  });

  it('defaults to Kazakh (kz), sets html lang="kk", and renders Kazakh hero text', () => {
    render(<App />);

    expect(document.documentElement.lang).toBe('kk');
    expect(
      screen.getByRole('heading', { level: 1, name: /Ұлт оянған дәуір/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Тарихты зерттеу/i })).toBeInTheDocument();
  });

  it('dynamically switches UI text and html lang attribute when clicking EN button', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Find the language switch button for English
    const enButton = screen.getByRole('button', { name: /^EN$/i });
    await user.click(enButton);

    // Verify HTML lang attribute synchronizes to English
    expect(document.documentElement.lang).toBe('en');

    // Verify Hero texts switch to English
    expect(
      screen.getByRole('heading', { level: 1, name: /The Era of National Awakening/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/HISTORY OF KAZAKHSTAN · 1900—1920/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explore the story/i })).toBeInTheDocument();

    // Verify Navigation links switch to English
    expect(screen.getByRole('link', { name: /^Timeline$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Figures$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Press$/i })).toBeInTheDocument();

    // Verify Historical Intro switches to English
    expect(
      screen.getByRole('heading', { level: 2, name: /Kazakh Society at the Turn of the 20th Century/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Education & Enlightenment/i)).toBeInTheDocument();

    // Verify persistence in localStorage
    expect(window.localStorage.setItem).toHaveBeenCalledWith('alash_language', 'en');
  });

  it('restores Kazakh text and html lang="kk" when toggling back to KZ', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Toggle to EN
    await user.click(screen.getByRole('button', { name: /^EN$/i }));
    expect(document.documentElement.lang).toBe('en');

    // Toggle back to KZ
    await user.click(screen.getByRole('button', { name: /^KZ$/i }));
    expect(document.documentElement.lang).toBe('kk');

    // Verify Kazakh texts are back
    expect(
      screen.getByRole('heading', { level: 1, name: /Ұлт оянған дәуір/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Тарихты зерттеу/i })).toBeInTheDocument();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('alash_language', 'kz');
  });

  it('initializes in English if localStorage contains pre-existing "en" preference', () => {
    window.localStorage.getItem = vi.fn().mockReturnValue('en');

    render(<App />);

    expect(document.documentElement.lang).toBe('en');
    expect(
      screen.getByRole('heading', { level: 1, name: /The Era of National Awakening/i })
    ).toBeInTheDocument();
  });

  it('correctly handles missing keys and returns provided fallback', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <TranslationProbe />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('kz');
    expect(screen.getByTestId('translated-title')).toHaveTextContent('Ұлт оянған дәуір');
    expect(screen.getByTestId('missing-key')).toHaveTextContent('Fallback Default');

    // Switch via probe button
    await user.click(screen.getByTestId('switch-en-btn'));
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    expect(screen.getByTestId('translated-title')).toHaveTextContent(
      'The Era of National Awakening'
    );
  });
});
