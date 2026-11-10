import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Clock,
  Users,
  Newspaper,
  Map as MapIcon,
  FileText,
  Compass,
  Trophy,
  Landmark,
} from 'lucide-react';

export interface Chapter {
  id: string;
  num: string;
  icon: LucideIcon;
  title: { kz: string; en: string };
  desc: { kz: string; en: string };
}

/**
 * Museum wayfinding: the 9 exhibition chapters in visiting order.
 * Used by the Exhibition Guide, Chapter Rail, scroll-spy and chapter numerals.
 */
export const CHAPTERS: Chapter[] = [
  {
    id: 'intro',
    num: '01',
    icon: BookOpen,
    title: { kz: 'Кіріспе', en: 'Introduction' },
    desc: {
      kz: 'ХХ ғасыр басындағы қазақ даласы қандай болды?',
      en: 'What was the Kazakh steppe like around 1900?',
    },
  },
  {
    id: 'timeline',
    num: '02',
    icon: Clock,
    title: { kz: 'Хронология', en: 'Chronology' },
    desc: {
      kz: '1905–1920 жылдардағы 14 басты оқиғаны ретімен көріңіз',
      en: 'Walk through 14 key events of 1905–1920 in order',
    },
  },
  {
    id: 'figures',
    num: '03',
    icon: Users,
    title: { kz: 'Зиялылар', en: 'The Intellectuals' },
    desc: {
      kz: '16 Алаш қайраткерінің өмірі, еңбегі мен тағдыры',
      en: 'Lives, works and fates of 16 Alash figures',
    },
  },
  {
    id: 'press',
    num: '04',
    icon: Newspaper,
    title: { kz: 'Газеттер', en: 'Newspapers' },
    desc: {
      kz: '«Айқап» пен «Қазақ» беттерін парақтап оқыңыз',
      en: 'Leaf through the pages of Aiqap and Qazaq',
    },
  },
  {
    id: 'map',
    num: '05',
    icon: MapIcon,
    title: { kz: 'Тарихи карта', en: 'Historical Map' },
    desc: {
      kz: '12 тарихи қаланы картадан тауып, сырын ашыңыз',
      en: 'Find 12 historic cities and discover their stories',
    },
  },
  {
    id: 'documents',
    num: '06',
    icon: FileText,
    title: { kz: 'Мұрағат', en: 'The Archive' },
    desc: {
      kz: 'Петициялар мен бағдарламалардың мәтінін оқыңыз',
      en: 'Read the original petitions and programmes',
    },
  },
  {
    id: 'missions',
    num: '07',
    icon: Compass,
    title: { kz: 'Миссиялар', en: 'Missions' },
    desc: {
      kz: '5 ойын арқылы ұпай жинап, белгі алыңыз',
      en: 'Play 5 games, earn points and badges',
    },
  },
  {
    id: 'quiz',
    num: '08',
    icon: Trophy,
    title: { kz: 'Тест', en: 'Quiz' },
    desc: {
      kz: '15 сұрақ арқылы біліміңізді сынап көріңіз',
      en: 'Test yourself with 15 questions',
    },
  },
  {
    id: 'conclusion',
    num: '09',
    icon: Landmark,
    title: { kz: 'Мұра', en: 'Legacy' },
    desc: {
      kz: 'Алаш идеясы бүгін неге маңызды?',
      en: 'Why does the Alash idea matter today?',
    },
  },
];

/** Safe smooth scroll helper with legacy fallback. */
export function scrollToSection(id: string): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (!el || typeof el.scrollIntoView !== 'function') return;
  try {
    el.scrollIntoView({ behavior: 'smooth' });
  } catch {
    el.scrollIntoView();
  }
}

