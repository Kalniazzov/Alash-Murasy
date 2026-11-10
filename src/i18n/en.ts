import { TranslationKey } from './kk';

export const en: Record<TranslationKey, string> = {
  // Brand & General
  'brand.title': 'ALASH HERITAGE',
  'brand.subtitle': 'INTERACTIVE HISTORICAL MUSEUM',
  'brand.tagline': 'DIGITAL ARCHIVE',

  // Navigation Links
  'nav.home': 'Home',
  'nav.timeline': 'Timeline',
  'nav.figures': 'Figures',
  'nav.press': 'Press',
  'nav.map': 'Map',
  'nav.documents': 'Documents',
  'nav.missions': 'Missions',
  'nav.quiz': 'Quiz',
  'nav.favorites': 'Favorites',
  'nav.menu_open': 'Open menu',
  'nav.menu_close': 'Close menu',
  'nav.switch_lang': 'Switch language',

  // Hero Section
  'hero.eyebrow': 'HISTORY OF KAZAKHSTAN · 1900—1920',
  'hero.title': 'The Era of National Awakening',
  'hero.subtitle':
    'Discover the Kazakh intellectuals who advanced education, built a national press, and shaped the idea of self-governance.',
  'hero.cta_explore': 'Explore the story',
  'hero.cta_mission': 'Start the historical mission',
  'hero.scroll_prompt': 'SCROLL TO EXPLORE ↓',
  'hero.image_caption':
    'Alash leaders led by Alikhan Bokeikhan, Akhmet Baitursynuly, and Mirzhakyp Dulatuly (Orenburg, 1917)',
  'hero.image_credit': 'From the Central State Archive of the Republic of Kazakhstan',

  // Hero Statistics Counters
  'hero.stats.era_value': '1905–1920',
  'hero.stats.era_label': 'Historical Era',
  'hero.stats.figures_value': '16+',
  'hero.stats.figures_label': 'Intellectual Leaders',
  'hero.stats.press_value': '2',
  'hero.stats.press_label': 'National Periodicals ("Aiqap", "Qazaq")',
  'hero.stats.docs_value': '100+',
  'hero.stats.docs_label': 'Archival Documents',

  // Historical Introduction
  'intro.badge': 'HISTORICAL CONTEXT',
  'intro.title': 'Kazakh Society at the Turn of the 20th Century',
  'intro.text':
    "At the beginning of the 20th century, colonial administration, land seizures, and dramatic social shifts intensified across the Kazakh steppe. Modern-educated Kazakh youths sought to safeguard their nation's future through enlightenment, the press, legal advocacy, and national self-determination. This vibrant intellectual milieu laid the foundation for the Alash movement.",
  'intro.pillar_education_title': 'Education & Enlightenment',
  'intro.pillar_education_desc':
    'Jadid reform schools, native Kazakh textbooks, and a new generation educated at St. Petersburg, Kazan, and Moscow universities.',
  'intro.pillar_education_tag': 'Enlightenment',
  'intro.pillar_press_title': 'The National Press',
  'intro.pillar_press_desc':
    'The "Aiqap" journal and "Qazaq" newspaper served as the political podium for the nation, awakening public consciousness and defending native rights.',
  'intro.pillar_press_tag': '"Aiqap" & "Qazaq"',
  'intro.pillar_politics_title': 'Political Awakening & Autonomy',
  'intro.pillar_politics_desc':
    'From the 1905 Qarqaraly Petition to State Duma parliamentary representation and the declaration of Alash Autonomy in 1917.',
  'intro.pillar_politics_tag': 'The Alash Idea',

  // Milestone Quick Strip
  'intro.milestones_title': 'KEY MILESTONES',
  'intro.milestone_1905': '1905 — Qarqaraly Petition',
  'intro.milestone_1911': '1911 — "Aiqap" Journal',
  'intro.milestone_1913': '1913 — "Qazaq" Newspaper',
  'intro.milestone_1917': '1917 — Alash Autonomy',

  // Common UI Controls
  'common.close': 'Close',
  'common.back_to_top': 'Back to top',
  'common.more_details': 'More details',
  'common.read_bio': 'Read biography',
  'common.view_doc': 'Read document',
  'common.add_favorite': 'Add to favorites',
  'common.in_favorites': 'Saved in favorites',
  'common.remove_favorite': 'Remove',
  'common.clear_all': 'Clear all',
  'common.empty_favorites': 'No saved items yet',
  'common.search_placeholder': 'Search...',
  'common.filter_all': 'All',
  'common.loading': 'Loading...',
  'common.prev': 'Previous',
  'common.next': 'Next',
  'common.check': 'Check',
  'common.retry': 'Retry',
  'common.retake': 'Retake',
  'common.citation_copied': 'Citation copied!',

  // Favorites Drawer
  'favorites.title': 'Saved Archives',
  'favorites.figures_tab': 'Figures',
  'favorites.documents_tab': 'Documents',
  'favorites.empty_desc':
    'You have not saved any figures or documents yet. Click the bookmark icon on any item to save it for quick reference.',

  // Missions HUD & Gamification
  'missions.hud_score': 'Score:',
  'missions.hud_completed': 'Completed:',
  'missions.hud_badges': 'Badges:',
  'missions.reset_progress': 'Reset progress',
  'missions.reset_confirm':
    'All accumulated points and badges will be cleared. Are you sure?',

  // Timeline Section (M2)
  'timeline.eyebrow': 'ARCHIVAL CHRONOLOGY',
  'timeline.title': 'Interactive Timeline (1905–1920)',
  'timeline.description':
    'Pivotal historical milestones, congresses, and declarations from the 1905 Karkaraly Petition to the dissolution in 1920.',
  'timeline.period_all': 'All Periods',
  'timeline.period_1905_1907': 'Awakening (1905–1907)',
  'timeline.period_1908_1916': 'Press & Enlightenment (1908–1916)',
  'timeline.period_1917_1920': 'Alash Orda Era (1917–1920)',
  'timeline.expand_all': 'Expand all',
  'timeline.collapse_all': 'Collapse all',
  'timeline.show_less': 'Show less',
  'timeline.significance_label': 'Historical Significance:',
  'timeline.figures_involved': 'Involved Figures:',
  'timeline.events_counter': 'events displayed',

  // Figures Gallery Section (M2)
  'figures.eyebrow': 'INTELLECTUAL LEADERS',
  'figures.title': 'Alash Intellectuals Gallery',
  'figures.description':
    'Biographical dossiers, authentic portraits, intellectual pathways, and enduring contributions of the Alash leaders.',
  'figures.search_placeholder':
    'Search by figure name, role, education, or works...',
  'figures.view_all': 'All Figures',
  'figures.view_core': 'Core Leaders',
  'figures.role_all': 'All',
  'figures.role_leader': 'Leaders',
  'figures.role_writer': 'Writers & Poets',
  'figures.role_jurist': 'Jurists',
  'figures.role_scholar': 'Scholars',
  'figures.empty_title': 'No figures found',
  'figures.empty_desc':
    'Try adjusting your search query or removing role filters.',
  'figures.reset_filters': 'Reset all filters',
  'figures.counter_matching': 'figures matching criteria',

  // Figure Dossier Modal (M2)
  'modal.dossier_badge': 'FIGURE DOSSIER',
  'modal.tab_bio': 'Biography',
  'modal.tab_education': 'Education & Career',
  'modal.tab_works': 'Key Works',
  'modal.tab_milestones': 'Milestones',
  'modal.copy_quote': 'Copy quote',
  'modal.quote_copied': 'Copied!',
  'modal.archival_source':
    'Based on Central State Archive of RK & academic editions',

  // Footer & Citations
  'footer.motto': '"Under the banner of Alash, our flame shall never fade!"',
  'footer.motto_sub': '— Sultanmakhmut Toraighyrov',
  'footer.reflection_title': '"Understanding the past is the beginning of understanding the future."',
  'footer.desc':
    '"Alash Heritage" is an educational interactive digital museum dedicated to preserving and exploring the legacy of early 20th century Kazakh intellectuals.',
  'footer.sources_title': 'Academic & Archival Sources',
  'footer.source_cga': 'Central State Archive of the Republic of Kazakhstan (CGA RK)',
  'footer.source_iie': 'Ch. Valikhanov Institute of History and Ethnology',
  'footer.source_ehistory': '"e-history.kz" — History of Kazakhstan Portal',
  'footer.source_nabrk': 'National Academic Library of the Republic of Kazakhstan',
  'footer.sections_title': 'Sections',
  'footer.legal_note':
    'Materials are presented solely for educational and research purposes. Authentic archival photographs and documents belong to state archive collections.',
  'footer.copyright': '© 2026 "Alash Heritage" Digital Archive. All rights reserved.',
};
