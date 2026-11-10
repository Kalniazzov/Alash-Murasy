export interface TimelineEvent {
  id: string;
  year: number;
  month?: string;
  dateStr: { kz: string; en: string };
  title: { kz: string; en: string };
  summary: { kz: string; en: string };
  details: { kz: string; en: string };
  significance: { kz: string; en: string };
  location: { kz: string; en: string };
  figuresInvolved: string[];
  period: '1905-1907' | '1908-1916' | '1917-1920';
  image?: string;
}

export interface Figure {
  id: string;
  name: { kz: string; en: string };
  lifeYears: string;
  role: 'leader' | 'writer' | 'jurist' | 'scholar';
  roleTitle: { kz: string; en: string };
  shortBio: { kz: string; en: string };
  fullBio: { kz: string; en: string };
  education: { kz: string; en: string };
  keyWorks: { kz: string[]; en: string[] };
  quote: { kz: string; en: string; citation: string };
  milestones: Array<{ year: number; event: { kz: string; en: string } }>;
  photoUrl?: string;
  isCore: boolean;
}

export interface PressPublication {
  id: 'aiqap' | 'qazaq';
  title: { kz: string; en: string };
  subtitle: { kz: string; en: string };
  years: string;
  city: { kz: string; en: string };
  editor: { kz: string; en: string };
  keyAuthors: { kz: string; en: string };
  issuesCount: { kz: string; en: string };
  description: { kz: string; en: string };
  nameOrigin: { kz: string; en: string };
  coreTopics: { kz: string[]; en: string[] };
  archivalNote: { kz: string; en: string };
}

export interface PressArticle {
  id: string;
  publication: 'aiqap' | 'qazaq';
  issueNumber: string;
  date: { kz: string; en: string };
  title: { kz: string; en: string };
  author: { kz: string; en: string };
  theme: 'education' | 'land' | 'language' | 'women' | 'politics';
  originalExcerpt: { kz: string; en: string };
  modernExplanation: { kz: string; en: string };
  historicalNote: { kz: string; en: string };
  sourceCitation: { kz: string; en: string };
}

export interface MapLocation {
  id: string;
  name: { kz: string; en: string };
  historicalName?: { kz: string; en: string };
  lat: number;
  lng: number;
  category: 'alash_center' | 'press_education' | 'allied_autonomy' | 'imperial_diplomacy';
  era: string;
  region: { kz: string; en: string };
  historicRole: { kz: string; en: string };
  description: { kz: string; en: string };
  keyEvents: Array<{ year: string; text: { kz: string; en: string } }>;
  figuresAssociated: { kz: string[]; en: string[] };
  autonomyNote?: { kz: string; en: string };
}

export interface DocumentClause {
  number: string;
  topic: { kz: string; en: string };
  text: { kz: string; en: string };
  commentary: { kz: string; en: string };
}

export interface DocumentItem {
  id: string;
  title: { kz: string; en: string };
  year: number;
  dateLabel: { kz: string; en: string };
  category: 'petition' | 'manifesto' | 'program' | 'decree' | 'report';
  status: 'extract' | 'summary' | 'transcription';
  statusLabel: { kz: string; en: string };
  historicalContext: { kz: string; en: string };
  transcription: { kz: string; en: string };
  clauses: DocumentClause[];
  keyQuotes: Array<{ kz: string; en: string }>;
  archiveReference: { kz: string; en: string };
}

export interface ChronologyItem {
  id: string;
  year: number;
  label: { kz: string; en: string };
  detail: { kz: string; en: string };
}

export interface IdentificationQuestion {
  id: string;
  prompt: { kz: string; en: string };
  clue: { kz: string; en: string };
  options: Array<{ kz: string; en: string }>;
  correctIndex: number;
  explanation: { kz: string; en: string };
}

export interface DetectiveFragment {
  id: string;
  excerpt: { kz: string; en: string };
  source: { kz: string; en: string };
  options: Array<{ id: string; label: { kz: string; en: string } }>;
  correctDomainId: string;
  explanation: { kz: string; en: string };
}

export interface EditorTopicItem {
  id: string;
  headline: { kz: string; en: string };
  correctTarget: 'aiqap' | 'qazaq' | 'both';
  explanation: { kz: string; en: string };
}

export interface DilemmaScenario {
  context: { kz: string; en: string };
  question: { kz: string; en: string };
  options: Array<{ kz: string; en: string }>;
  correctIndex: number;
  explanation: { kz: string; en: string };
}

export interface Mission {
  id: number;
  badgeKey: string;
  badgeTitle: { kz: string; en: string };
  badgeDesc: { kz: string; en: string };
  title: { kz: string; en: string };
  objective: { kz: string; en: string };
  hint: { kz: string; en: string };
  type: 'chronology' | 'identification' | 'detective' | 'editor' | 'dilemma';
  points: number;
  chronologyItems?: ChronologyItem[];
  identificationQuestions?: IdentificationQuestion[];
  detectiveFragments?: DetectiveFragment[];
  editorItems?: EditorTopicItem[];
  editorSynthesis?: { kz: string; en: string };
  dilemma?: DilemmaScenario;
}

export type QuizCategory =
  | 'figures'
  | 'events_1905'
  | 'press'
  | 'years_1916_1917'
  | 'alash_orda';

export interface QuizQuestion {
  id: number;
  category: QuizCategory;
  question: { kz: string; en: string };
  options: Array<{ kz: string; en: string }>;
  correctIndex: number;
  explanation: { kz: string; en: string };
}

export interface DailyFactItem {
  id: string;
  year: string;
  title: { kz: string; en: string };
  fact: { kz: string; en: string };
  source: { kz: string; en: string };
}
