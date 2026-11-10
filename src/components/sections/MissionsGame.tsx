import React, { useState } from 'react';
import {
  Award,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  ChevronRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useMissionsProgress } from '@/hooks/useMissionsProgress';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { MISSIONS_DATA } from '@/data/missions';
import { ChronologyItem } from '@/data/types';

export const MissionsGame: React.FC = () => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';
  const {
    progress,
    completeMission,
    isMissionCompleted,
    hasBadge,
    resetProgress,
  } = useMissionsProgress();

  const [activeMissionId, setActiveMissionId] = useState<number>(1);
  const [hintUsedMap, setHintUsedMap] = useState<Record<number, boolean>>({});
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  // Mission 1: Chronology state
  const initialChronology = MISSIONS_DATA[0].chronologyItems || [];
  const [chronologyOrder, setChronologyOrder] =
    useState<ChronologyItem[]>(initialChronology);
  const [m1Feedback, setM1Feedback] = useState<'correct' | 'incorrect' | null>(null);

  // Mission 2: Figure identification answers
  const [m2Answers, setM2Answers] = useState<Record<string, number>>({});
  const [m2Checked, setM2Checked] = useState<boolean>(false);

  // Mission 3: Detective domain selections
  const [m3Answers, setM3Answers] = useState<Record<string, string>>({});
  const [m3Checked, setM3Checked] = useState<boolean>(false);

  // Mission 4: Newspaper editor assignments
  const [m4Answers, setM4Answers] = useState<
    Record<string, 'aiqap' | 'qazaq' | 'both'>
  >({});
  const [m4Checked, setM4Checked] = useState<boolean>(false);

  // Mission 5: Dilemma choice
  const [m5Choice, setM5Choice] = useState<number | null>(null);
  const [m5Checked, setM5Checked] = useState<boolean>(false);

  const activeMission =
    MISSIONS_DATA.find((m) => m.id === activeMissionId) || MISSIONS_DATA[0];

  const usedHint = Boolean(hintUsedMap[activeMission.id]);

  const awardPointsForMission = (missionId: number, badgeKey: string) => {
    const bonus = hintUsedMap[missionId] ? 0 : 5;
    completeMission(missionId, badgeKey, 10 + bonus);
  };

  const moveChronologyItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= chronologyOrder.length) return;
    setChronologyOrder((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy;
    });
    setM1Feedback(null);
  };

  const checkMission1 = () => {
    const isSorted = chronologyOrder.every(
      (item, idx) => idx === 0 || chronologyOrder[idx - 1].year <= item.year
    );
    if (isSorted) {
      setM1Feedback('correct');
      awardPointsForMission(1, 'chronicle_keeper');
    } else {
      setM1Feedback('incorrect');
    }
  };

  const checkMission2 = () => {
    const questions = MISSIONS_DATA[1].identificationQuestions || [];
    setM2Checked(true);
    const allCorrect =
      questions.length > 0 &&
      questions.every((q) => m2Answers[q.id] === q.correctIndex);
    if (allCorrect) {
      awardPointsForMission(2, 'figure_expert');
    }
  };

  const checkMission3 = () => {
    const fragments = MISSIONS_DATA[2].detectiveFragments || [];
    setM3Checked(true);
    const allCorrect =
      fragments.length > 0 &&
      fragments.every((f) => m3Answers[f.id] === f.correctDomainId);
    if (allCorrect) {
      awardPointsForMission(3, 'archive_detective');
    }
  };

  const checkMission4 = () => {
    const items = MISSIONS_DATA[3].editorItems || [];
    setM4Checked(true);
    const allCorrect =
      items.length > 0 &&
      items.every((item) => m4Answers[item.id] === item.correctTarget);
    if (allCorrect) {
      awardPointsForMission(4, 'press_reviewer');
    }
  };

  const checkMission5 = () => {
    const dilemma = MISSIONS_DATA[4].dilemma;
    if (!dilemma || m5Choice === null) return;
    setM5Checked(true);
    if (m5Choice === dilemma.correctIndex) {
      awardPointsForMission(5, 'alash_scholar');
    }
  };

  const nextIncompleteMission = MISSIONS_DATA.find(
    (m) => !isMissionCompleted(m.id)
  );

  return (
    <section
      id="missions"
      aria-labelledby="missions-heading"
      className="py-16 sm:py-24 border-b border-soft-line/60 bg-archive-paper/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-gold">
            {isKz
              ? 'ОҚУ СИМУЛЯЦИЯСЫ · ТАРИХИ ЗЕРТТЕУШІ МИССИЯСЫ'
              : 'EDUCATIONAL QUEST · THE HISTORIAN\'S MISSION'}
          </span>
          <h2
            id="missions-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-brown mt-2 mb-4"
          >
            {isKz
              ? '«Алаш ізімен» — тарихи миссиялар'
              : '"Following Alash" — Interactive Missions'}
          </h2>
          <KazakhOrnament variant="divider" size={64} className="my-4" />
          <p className="font-sans text-base text-ink-brown/80 leading-relaxed">
            {isKz
              ? 'Сен — ХХ ғасыр басындағы қазақ қоғамын зерттеп жүрген жас зерттеушісің. Архивтерді қарап, тұлғаларды танып, тарихи оқиғаларды ретімен орналастырып, ұлттық баспасөздің рөлін анықта.'
              : 'Step into the role of a young historian researching early 20th-century Kazakh society. Order key events, identify luminaries, inspect archival clauses, and analyze editorial debates.'}
          </p>
        </div>

        {/* Gamification Progress HUD */}
        <div className="rounded-card border border-soft-line bg-warm-ivory p-5 sm:p-6 shadow-parchment mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div>
                <span className="font-mono text-[11px] uppercase text-ink-brown/65 block">
                  {t('missions.hud_completed', isKz ? 'Миссиялар:' : 'Missions:')}
                </span>
                <span className="font-serif text-2xl font-bold text-ink-brown">
                  {progress.completedMissions.length} / {MISSIONS_DATA.length}
                </span>
              </div>
              <div className="h-8 w-px bg-soft-line hidden sm:block" />
              <div>
                <span className="font-mono text-[11px] uppercase text-ink-brown/65 block">
                  {t('missions.hud_score', isKz ? 'Жиналған ұпай:' : 'Total Score:')}
                </span>
                <span className="font-serif text-2xl font-bold text-deep-burgundy">
                  {progress.totalPoints} {isKz ? 'ұпай' : 'pts'}
                </span>
              </div>
              <div className="h-8 w-px bg-soft-line hidden sm:block" />
              <div>
                <span className="font-mono text-[11px] uppercase text-ink-brown/65 block">
                  {t('missions.hud_badges', isKz ? 'Бейдждер:' : 'Badges:')}
                </span>
                <span className="font-serif text-2xl font-bold text-forest-ink">
                  {progress.badges.length} / {MISSIONS_DATA.length}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {nextIncompleteMission && (
                <button
                  type="button"
                  onClick={() => setActiveMissionId(nextIncompleteMission.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-button bg-deep-burgundy text-warm-ivory text-xs font-mono"
                >
                  {isKz ? 'Келесі миссия:' : 'Next mission:'} #{nextIncompleteMission.id}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}

              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-button border border-soft-line bg-archive-paper/40 hover:bg-archive-paper text-ink-brown text-xs font-mono"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t('missions.reset_progress', isKz ? 'Прогресті тазарту' : 'Reset Progress')}
                </button>
              ) : (
                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetProgress();
                      setConfirmReset(false);
                      setM1Feedback(null);
                      setM2Checked(false);
                      setM3Checked(false);
                      setM4Checked(false);
                      setM5Checked(false);
                    }}
                    className="px-3 py-1.5 rounded-button bg-deep-burgundy text-warm-ivory text-xs font-mono font-bold"
                  >
                    {isKz ? 'Иә, өшіру' : 'Confirm Reset'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-2.5 py-1.5 rounded-button border border-soft-line bg-warm-ivory text-ink-brown text-xs font-mono"
                  >
                    {isKz ? 'Болдырмау' : 'Cancel'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Badges Showcase */}
          <div className="mt-4 pt-4 border-t border-soft-line/70 flex flex-wrap items-center gap-2">
            {MISSIONS_DATA.map((m) => {
              const earned = hasBadge(m.badgeKey);
              return (
                <span
                  key={m.badgeKey}
                  title={isKz ? m.badgeDesc.kz : m.badgeDesc.en}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-colors ${
                    earned
                      ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy font-semibold'
                      : 'bg-archive-paper/30 text-ink-brown/55 border-soft-line'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  {isKz ? m.badgeTitle.kz : m.badgeTitle.en}
                </span>
              );
            })}
          </div>

          <p className="mt-3 font-mono text-[11px] text-ink-brown/60">
            {isKz
              ? 'Ескерту: Прогресс пен бейдждер тіркеусіз осы браузердің жадында (localStorage) сақталады. Дұрыс жауап: +10 ұпай, ишарасыз орындасаңыз: +5 бонус ұпай.'
              : 'Note: Progress and badges are saved locally in this browser (localStorage) without an account. Correct completion awards +10 pts (+5 bonus pts without hints).'}
          </p>
        </div>

        {/* Mission Selector Tabs — swipeable strip on mobile, 5-column grid on desktop */}
        <div
          className="flex sm:grid sm:grid-cols-5 gap-2.5 mb-6 overflow-x-auto pb-1.5 sm:pb-0 -mx-1 px-1 no-scrollbar"
          role="tablist"
          aria-label={isKz ? 'Миссиялар тізімі' : 'Missions list'}
        >
          {MISSIONS_DATA.map((m) => {
            const active = m.id === activeMission.id;
            const done = isMissionCompleted(m.id);
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveMissionId(m.id)}
                className={`min-w-[155px] sm:min-w-0 shrink-0 p-3 rounded-xl border text-left transition-all ${
                  active
                    ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy shadow-subtle'
                    : 'bg-warm-ivory hover:bg-archive-paper/60 text-ink-brown border-soft-line'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span>#{m.id}</span>
                  {done && (
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        active ? 'text-warm-ivory' : 'text-deep-burgundy'
                      }`}
                    />
                  )}
                </div>
                <div className="font-serif font-bold text-sm leading-snug line-clamp-2">
                  {(isKz ? m.title.kz : m.title.en).replace(/^Миссия \d+ — |^Mission \d+ — /, '')}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Mission Workspace */}
        <div
          key={activeMission.id}
          className="rounded-xl border-2 border-soft-line bg-warm-ivory p-4 sm:p-8 shadow-parchment animate-fade-up"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 pb-5 mb-6 border-b border-soft-line">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs uppercase text-deep-burgundy font-bold">
                  {isKz ? activeMission.badgeTitle.kz : activeMission.badgeTitle.en}
                </span>
                {isMissionCompleted(activeMission.id) && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-forest-ink text-warm-ivory font-mono text-[11px]">
                    <ShieldCheck className="w-3 h-3" />
                    {isKz ? 'Орындалды' : 'Completed'}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-brown">
                {isKz ? activeMission.title.kz : activeMission.title.en}
              </h3>
              <p className="font-sans text-sm sm:text-base text-ink-brown/80 mt-2">
                {isKz ? activeMission.objective.kz : activeMission.objective.en}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setHintUsedMap((prev) => ({
                  ...prev,
                  [activeMission.id]: true,
                }))
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button border border-soft-line bg-archive-paper/50 hover:bg-archive-paper text-ink-brown text-xs font-mono"
            >
              <HelpCircle className="w-4 h-4 text-deep-burgundy" />
              {isKz ? 'Ишара алу' : 'Show Hint'}
            </button>
          </div>

          {usedHint && (
            <div className="mb-6 p-4 rounded border border-muted-gold bg-archive-paper/45 text-xs sm:text-sm text-ink-brown flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-deep-burgundy shrink-0 mt-0.5" />
              <span>{isKz ? activeMission.hint.kz : activeMission.hint.en}</span>
            </div>
          )}

          {/* MISSION 1: CHRONOLOGY */}
          {activeMission.type === 'chronology' && (
            <div>
              <ol className="space-y-2.5 mb-6">
                {chronologyOrder.map((item, index) => (
                  <li
                    key={item.id}
                    className="p-3.5 sm:p-4 rounded border border-soft-line bg-archive-paper/35 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-deep-burgundy text-warm-ivory font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-sans text-sm sm:text-base font-medium text-ink-brown">
                          {isKz ? item.label.kz : item.label.en}
                        </p>
                        {m1Feedback === 'correct' && (
                          <p className="font-mono text-xs text-deep-burgundy mt-0.5">
                            {isKz ? item.detail.kz : item.detail.en}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveChronologyItem(index, -1)}
                        disabled={index === 0}
                        aria-label={isKz ? 'Жоғары жылжыту' : 'Move up'}
                        className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper disabled:opacity-35 text-ink-brown"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveChronologyItem(index, 1)}
                        disabled={index === chronologyOrder.length - 1}
                        aria-label={isKz ? 'Төмен жылжыту' : 'Move down'}
                        className="p-1.5 rounded border border-soft-line bg-warm-ivory hover:bg-archive-paper disabled:opacity-35 text-ink-brown"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ol>

              <button
                type="button"
                onClick={checkMission1}
                className="px-5 py-2.5 rounded-button bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory text-sm font-medium transition-colors"
              >
                {t('common.check', isKz ? 'Тексеру' : 'Check Order')}
              </button>

              {m1Feedback === 'correct' && (
                <div className="mt-4 p-4 rounded bg-forest-ink text-warm-ivory text-sm">
                  {isKz
                    ? 'Тамаша! 1905 → 1909 → 1911 → 1913 → 1917 хронологиялық сабақтастығы толық дұрыс реттелді. «Уақыт шежірешісі» бейджі берілді!'
                    : 'Excellent! The 1905 → 1909 → 1911 → 1913 → 1917 chronological sequence is completely accurate. "Chronicler of Time" badge unlocked!'}
                </div>
              )}
              {m1Feedback === 'incorrect' && (
                <div className="mt-4 p-4 rounded border border-deep-burgundy bg-archive-paper/50 text-ink-brown text-sm">
                  {isKz
                    ? 'Кейбір оқиғалардың реті ауысып тұр. Қарқаралы петициясынан (1905) бастап Алаш автономиясына (1917) дейін реттеп қайта тексеріп көріңіз!'
                    : 'Some milestones are out of order. Start from the 1905 Karkaraly Petition through the 1917 Alash Autonomy and check again!'}
                </div>
              )}
            </div>
          )}

          {/* MISSION 2: IDENTIFICATION */}
          {activeMission.type === 'identification' && (
            <div className="space-y-5">
              {(activeMission.identificationQuestions || []).map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 rounded border border-soft-line bg-archive-paper/30"
                >
                  <p className="font-mono text-xs text-muted-gold mb-1">
                    #{idx + 1} · {isKz ? q.clue.kz : q.clue.en}
                  </p>
                  <p className="font-serif text-lg font-bold text-ink-brown mb-3">
                    {isKz ? q.prompt.kz : q.prompt.en}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const selected = m2Answers[q.id] === optIdx;
                      const isCorrectOpt = optIdx === q.correctIndex;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => {
                            setM2Answers((prev) => ({ ...prev, [q.id]: optIdx }));
                            setM2Checked(false);
                          }}
                          aria-pressed={selected}
                          className={`p-3 rounded border text-left text-xs sm:text-sm font-sans transition-colors ${
                            m2Checked && isCorrectOpt
                              ? 'bg-forest-ink text-warm-ivory border-forest-ink font-semibold'
                              : selected
                              ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy font-semibold'
                              : 'bg-warm-ivory hover:bg-archive-paper text-ink-brown border-soft-line'
                          }`}
                        >
                          {isKz ? opt.kz : opt.en}
                        </button>
                      );
                    })}
                  </div>
                  {m2Checked && (
                    <p className="mt-2.5 text-xs text-ink-brown/85 font-sans">
                      {isKz ? q.explanation.kz : q.explanation.en}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={checkMission2}
                className="px-5 py-2.5 rounded-button bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory text-sm font-medium"
              >
                {t('common.check', isKz ? 'Жауаптарды тексеру' : 'Check Answers')}
              </button>
            </div>
          )}

          {/* MISSION 3: ARCHIVE DETECTIVE */}
          {activeMission.type === 'detective' && (
            <div className="space-y-5">
              {(activeMission.detectiveFragments || []).map((frag) => (
                <div
                  key={frag.id}
                  className="p-5 rounded border border-soft-line bg-archive-paper/35"
                >
                  <blockquote className="font-serif text-lg italic text-ink-brown border-l-3 border-deep-burgundy pl-3.5 mb-2">
                    {isKz ? frag.excerpt.kz : frag.excerpt.en}
                  </blockquote>
                  <p className="font-mono text-[11px] text-ink-brown/65 mb-3">
                    {isKz ? frag.source.kz : frag.source.en}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {frag.options.map((opt) => {
                      const selected = m3Answers[frag.id] === opt.id;
                      const isRight = opt.id === frag.correctDomainId;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setM3Answers((prev) => ({ ...prev, [frag.id]: opt.id }));
                            setM3Checked(false);
                          }}
                          aria-pressed={selected}
                          className={`px-3.5 py-2 rounded border text-xs font-mono transition-colors ${
                            m3Checked && isRight
                              ? 'bg-forest-ink text-warm-ivory border-forest-ink font-bold'
                              : selected
                              ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy font-bold'
                              : 'bg-warm-ivory text-ink-brown border-soft-line hover:bg-archive-paper'
                          }`}
                        >
                          {isKz ? opt.label.kz : opt.label.en}
                        </button>
                      );
                    })}
                  </div>
                  {m3Checked && (
                    <p className="mt-2.5 text-xs text-ink-brown/85">
                      {isKz ? frag.explanation.kz : frag.explanation.en}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={checkMission3}
                className="px-5 py-2.5 rounded-button bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory text-sm font-medium"
              >
                {t('common.check', isKz ? 'Талдауды тексеру' : 'Verify Classification')}
              </button>
            </div>
          )}

          {/* MISSION 4: NEWSPAPER EDITOR */}
          {activeMission.type === 'editor' && (
            <div className="space-y-5">
              {(activeMission.editorItems || []).map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded border border-soft-line bg-archive-paper/35"
                >
                  <p className="font-sans text-sm sm:text-base text-ink-brown font-medium mb-3">
                    {isKz ? item.headline.kz : item.headline.en}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { id: 'aiqap', kz: '«Айқап» журналы', en: '"Aiqap" Magazine' },
                        { id: 'qazaq', kz: '«Қазақ» газеті', en: '"Qazaq" Newspaper' },
                        { id: 'both', kz: 'Екеуіне де ортақ', en: 'Shared by Both' },
                      ] as const
                    ).map((choice) => {
                      const selected = m4Answers[item.id] === choice.id;
                      const isRight = item.correctTarget === choice.id;
                      return (
                        <button
                          key={choice.id}
                          type="button"
                          onClick={() => {
                            setM4Answers((prev) => ({
                              ...prev,
                              [item.id]: choice.id,
                            }));
                            setM4Checked(false);
                          }}
                          aria-pressed={selected}
                          className={`px-3.5 py-1.5 rounded border text-xs font-mono transition-colors ${
                            m4Checked && isRight
                              ? 'bg-forest-ink text-warm-ivory border-forest-ink font-bold'
                              : selected
                              ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy font-bold'
                              : 'bg-warm-ivory text-ink-brown border-soft-line hover:bg-archive-paper'
                          }`}
                        >
                          {isKz ? choice.kz : choice.en}
                        </button>
                      );
                    })}
                  </div>
                  {m4Checked && (
                    <p className="mt-2.5 text-xs text-ink-brown/85">
                      {isKz ? item.explanation.kz : item.explanation.en}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={checkMission4}
                className="px-5 py-2.5 rounded-button bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory text-sm font-medium"
              >
                {t('common.check', isKz ? 'Редакциялық таңдауды тексеру' : 'Check Editorial Assignments')}
              </button>

              {m4Checked && activeMission.editorSynthesis && (
                <div className="p-4 rounded border border-deep-burgundy/40 bg-archive-paper/55 text-sm text-ink-brown">
                  {isKz
                    ? activeMission.editorSynthesis.kz
                    : activeMission.editorSynthesis.en}
                </div>
              )}
            </div>
          )}

          {/* MISSION 5: HISTORICAL DECISION */}
          {activeMission.type === 'dilemma' && activeMission.dilemma && (
            <div className="space-y-5">
              <div className="p-5 rounded border border-soft-line bg-archive-paper/40">
                <p className="font-sans text-sm sm:text-base text-ink-brown leading-relaxed mb-3">
                  {isKz
                    ? activeMission.dilemma.context.kz
                    : activeMission.dilemma.context.en}
                </p>
                <p className="font-serif text-xl font-bold text-deep-burgundy">
                  {isKz
                    ? activeMission.dilemma.question.kz
                    : activeMission.dilemma.question.en}
                </p>
              </div>

              <div className="space-y-2.5">
                {activeMission.dilemma.options.map((opt, idx) => {
                  const selected = m5Choice === idx;
                  const isRight = idx === activeMission.dilemma?.correctIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setM5Choice(idx);
                        setM5Checked(false);
                      }}
                      aria-pressed={selected}
                      className={`w-full p-4 rounded border text-left text-sm font-sans transition-colors ${
                        m5Checked && isRight
                          ? 'bg-forest-ink text-warm-ivory border-forest-ink font-semibold'
                          : selected
                          ? 'bg-deep-burgundy text-warm-ivory border-deep-burgundy font-semibold'
                          : 'bg-warm-ivory hover:bg-archive-paper/60 text-ink-brown border-soft-line'
                      }`}
                    >
                      {isKz ? opt.kz : opt.en}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={checkMission5}
                disabled={m5Choice === null}
                className="px-5 py-2.5 rounded-button bg-deep-burgundy hover:bg-burgundy-hover disabled:opacity-45 text-warm-ivory text-sm font-medium"
              >
                {t('common.check', isKz ? 'Шешімді тексеру' : 'Verify Decision')}
              </button>

              {m5Checked && (
                <div className="p-4 rounded border border-forest-ink/40 bg-archive-paper/55 text-sm text-ink-brown leading-relaxed">
                  {isKz
                    ? activeMission.dilemma.explanation.kz
                    : activeMission.dilemma.explanation.en}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

