import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  Trophy,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { KazakhOrnament } from '@/components/ui/KazakhOrnament';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';
import { QuizCategory } from '@/data/types';

type CategorySelection = 'all' | QuizCategory;

export const Quiz: React.FC = () => {
  const { language, t } = useLanguage();
  const isKz = language === 'kz';

  const [selectedCategory, setSelectedCategory] =
    useState<CategorySelection>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answersById, setAnswersById] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const questions = useMemo(() => {
    if (selectedCategory === 'all') return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  const safeIndex = Math.min(currentIndex, Math.max(0, questions.length - 1));
  const currentQuestion = questions[safeIndex];
  const selectedAnswer = currentQuestion
    ? answersById[currentQuestion.id]
    : undefined;
  const hasAnsweredCurrent = selectedAnswer !== undefined;

  const categories: Array<{ id: CategorySelection; kz: string; en: string }> = [
    { id: 'all', kz: 'Барлық сұрақтар (15)', en: 'All Questions (15)' },
    { id: 'figures', kz: '1. Қазақ зиялылары', en: '1. Kazakh Intellectuals' },
    { id: 'events_1905', kz: '2. 1905 жылғы оқиғалар', en: '2. Events of 1905' },
    { id: 'press', kz: '3. «Айқап» және «Қазақ»', en: '3. "Aiqap" & "Qazaq"' },
    { id: 'years_1916_1917', kz: '4. 1916–1917 жылдар', en: '4. 1916–1917 Crisis & Congresses' },
    { id: 'alash_orda', kz: '5. Алаш партиясы және Алашорда', en: '5. Alash Party & Alash Orda' },
  ];

  const correctCount = useMemo(() => {
    return questions.reduce((acc, q) => {
      return answersById[q.id] === q.correctIndex ? acc + 1 : acc;
    }, 0);
  }, [questions, answersById]);

  const handleCategoryChange = (cat: CategorySelection) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const handleSelectOption = (optIdx: number) => {
    if (!currentQuestion || hasAnsweredCurrent) return;
    setAnswersById((prev) => ({
      ...prev,
      [currentQuestion.id]: optIdx,
    }));
  };

  const handleNext = () => {
    if (safeIndex + 1 < questions.length) {
      setCurrentIndex(safeIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetake = () => {
    const nextMap = { ...answersById };
    for (const q of questions) {
      delete nextMap[q.id];
    }
    setAnswersById(nextMap);
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const getFeedbackTier = () => {
    const ratio = questions.length > 0 ? correctCount / questions.length : 0;
    if (ratio >= 0.85) {
      return {
        kz: 'Тарих білгірі!',
        en: 'Master of History!',
        descKz:
          'Сіз ХХ ғасыр басындағы қазақ зиялылары, ұлттық баспасөз және Алаш қозғалысы тарихын терең меңгергенсіз.',
        descEn:
          'Outstanding command of the Kazakh awakening, national press, and Alash Orda constitutional history.',
      };
    }
    if (ratio >= 0.5) {
      return {
        kz: 'Жақсы нәтиже! Тағы бірнеше дерекпен таныс.',
        en: 'Good result! Explore a few more archival details.',
        descKz:
          'Негізгі тарихи оқиғаларды жақсы білесіз. Құжаттар архиві мен Timeline арқылы біліміңізді толықтыра аласыз.',
        descEn:
          'Solid grasp of core milestones. Review the Document Archive and Timeline to master every detail.',
      };
    }
    return {
      kz: 'Тарихты зерттеуді жалғастыр!',
      en: 'Keep exploring the history!',
      descKz:
        'Жоғарыдағы Уақыт сызығы, Тұлғалар галереясы және Баспасөз бөлімдерін қарап шығып, тестті қайта тапсырып көріңіз.',
      descEn:
        'Revisit the Timeline, Figures Gallery, and Press Archive above, then retake the quiz anytime.',
    };
  };

  return (
    <section
      id="quiz"
      aria-labelledby="quiz-heading"
      className="py-16 sm:py-24 border-b border-soft-line/60 bg-warm-ivory"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-gold">
            {isKz ? 'БІЛІМДІ БЕКІТУ · 5 ТАРИХИ САНАТ' : 'KNOWLEDGE CHECK · 5 HISTORICAL CATEGORIES'}
          </span>
          <h2
            id="quiz-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-brown mt-2 mb-4"
          >
            {isKz ? 'Тарихи тест — Біліміңізді тексеріңіз' : 'Historical Quiz — Test Your Knowledge'}
          </h2>
          <KazakhOrnament variant="divider" size={64} className="my-4" />
          <p className="font-sans text-base text-ink-brown/80">
            {isKz
              ? 'Қазақ зиялылары, 1905 жылғы петиция, «Айқап» пен «Қазақ», 1916–1917 жж. өзгерістер және Алашорда бойынша біліміңізді тексеріңіз.'
              : 'Assess your understanding across all five themes — with instant historical explanations after every answer.'}
          </p>
        </div>

        {/* Category Filter — horizontal swipe on mobile */}
        <div
          className="flex items-center sm:justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto sm:flex-wrap pb-1.5 sm:pb-0 -mx-1 px-1 no-scrollbar"
          role="group"
          aria-label={isKz ? 'Тест тақырыптары' : 'Quiz category filter'}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              aria-pressed={selectedCategory === cat.id}
              className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-deep-burgundy text-warm-ivory font-semibold'
                  : 'bg-archive-paper/45 text-ink-brown border border-soft-line hover:bg-archive-paper'
              }`}
            >
              {isKz ? cat.kz : cat.en}
            </button>
          ))}
        </div>

        {/* Quiz Card */}
        <div className="rounded-xl border-2 border-soft-line bg-archive-paper/35 p-4 sm:p-8 shadow-parchment">
          {!isFinished && currentQuestion ? (
            <div key={currentQuestion.id} className="animate-fade-up">
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-mono text-ink-brown/75 mb-2">
                <span>
                  {isKz ? 'Сұрақ' : 'Question'} {safeIndex + 1} / {questions.length}
                </span>
                <span>
                  {isKz ? 'Дұрыс жауап:' : 'Correct:'} {correctCount}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-warm-ivory overflow-hidden mb-6 border border-soft-line/50">
                <div
                  className="h-full bg-deep-burgundy transition-all duration-300"
                  style={{
                    width: `${((safeIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Prompt */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-brown mb-5 leading-snug">
                {isKz ? currentQuestion.question.kz : currentQuestion.question.en}
              </h3>

              {/* 4 Answer Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let btnStyle =
                    'bg-warm-ivory hover:bg-archive-paper/80 text-ink-brown border-soft-line';
                  if (hasAnsweredCurrent) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-forest-ink text-warm-ivory border-forest-ink font-semibold';
                    } else if (isChosen) {
                      btnStyle =
                        'bg-deep-burgundy text-warm-ivory border-deep-burgundy font-semibold';
                    } else {
                      btnStyle =
                        'bg-warm-ivory/60 text-ink-brown/65 border-soft-line/60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasAnsweredCurrent}
                      className={`w-full p-4 rounded-card border text-left text-sm sm:text-base font-sans transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{isKz ? opt.kz : opt.en}</span>
                      {hasAnsweredCurrent && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                      )}
                      {hasAnsweredCurrent && isChosen && !isCorrect && (
                        <XCircle className="w-5 h-5 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {hasAnsweredCurrent && (
                <div className="mt-6 pt-5 border-t border-soft-line space-y-4">
                  <div className="p-4 rounded bg-warm-ivory border border-soft-line text-sm text-ink-brown leading-relaxed">
                    <span className="font-mono text-xs font-bold uppercase text-deep-burgundy block mb-1">
                      {selectedAnswer === currentQuestion.correctIndex
                        ? isKz
                          ? 'Дұрыс жауап!'
                          : 'Correct!'
                        : isKz
                        ? 'Түсіндірме:'
                        : 'Historical Explanation:'}
                    </span>
                    {isKz
                      ? currentQuestion.explanation.kz
                      : currentQuestion.explanation.en}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory text-sm font-medium"
                    >
                      {safeIndex + 1 < questions.length
                        ? isKz
                          ? 'Келесі сұрақ'
                          : 'Next Question'
                        : isKz
                        ? 'Нәтижені көру'
                        : 'View Results'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Final Result View */
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-deep-burgundy text-warm-ivory mx-auto flex items-center justify-center">
                <Trophy className="w-7 h-7" />
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-gold">
                {isKz ? 'ТЕСТ НӘТИЖЕСІ' : 'QUIZ SCORE'}
              </div>
              <p className="font-serif text-4xl font-bold text-ink-brown">
                {correctCount} / {questions.length}
              </p>
              <h3 className="font-serif text-2xl font-bold text-deep-burgundy">
                {isKz ? getFeedbackTier().kz : getFeedbackTier().en}
              </h3>
              <p className="font-sans text-sm sm:text-base text-ink-brown/80 max-w-lg mx-auto">
                {isKz ? getFeedbackTier().descKz : getFeedbackTier().descEn}
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-deep-burgundy hover:bg-burgundy-hover text-warm-ivory text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('common.retake', isKz ? 'Қайта тапсыру' : 'Retake Quiz')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

