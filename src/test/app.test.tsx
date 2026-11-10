import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '@/App';

describe('App Foundation Integration Test', () => {
  it('mounts App and renders Header brand title and navigation links', () => {
    render(<App />);

    // Brand and logo check
    expect(screen.getAllByText(/АЛАШ МҰРАСЫ/i)[0]).toBeInTheDocument();

    // Sticky header navigation links
    expect(screen.getAllByRole('link', { name: /Уақыт сызығы/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Тұлғалар/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Баспасөз/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Карта/i })[0]).toBeInTheDocument();
  });

  it('renders Hero section with H1 headline, description, CTA buttons, and stats', () => {
    render(<App />);

    // Hero headline and eyebrow
    expect(
      screen.getByRole('heading', { level: 1, name: /Ұлт оянған дәуір/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/ҚАЗАҚСТАН ТАРИХЫ · 1900—1920/i)).toBeInTheDocument();

    // Call to Action buttons
    expect(screen.getByRole('button', { name: /Тарихты зерттеу/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Тарихи миссияны бастау/i })).toBeInTheDocument();

    // Hero statistical counters
    expect(screen.getByText('1905–1920')).toBeInTheDocument();
    expect(screen.getByText('16+')).toBeInTheDocument();
  });

  it('renders Historical Intro section with 3 thematic pillars and milestone strip', () => {
    render(<App />);

    // Section title
    expect(
      screen.getByRole('heading', { level: 2, name: /ХХ ғасыр басындағы қазақ қоғамы/i })
    ).toBeInTheDocument();

    // 3 Thematic pillars
    expect(screen.getByText(/Білім және Ағарту/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Ұлттық баспасөз/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Саяси сана және Автономия/i)).toBeInTheDocument();

    // Milestone fact strip
    expect(screen.getByText(/1905 — Қарқаралы петициясы/i)).toBeInTheDocument();
    expect(screen.getByText(/1917 — Алаш автономиясы/i)).toBeInTheDocument();
  });

  it('renders Footer with Alash motto, reflection citation, and academic sources', () => {
    render(<App />);

    // Motto & reflection
    expect(
      screen.getByText(/Алаш туы астында, күн сөнгенше сөнбейміз!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Өткенді тану — болашақты түсінудің бастауы/i)
    ).toBeInTheDocument();

    // Archival sources
    expect(
      screen.getAllByText(/ҚР Орталық мемлекеттік архиві/i)[0]
    ).toBeInTheDocument();
  });
});
