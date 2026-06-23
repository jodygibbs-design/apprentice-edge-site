"use client";

import { useState, useEffect, useCallback } from "react";

interface NumericalQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface VerbalQuestion {
  id: number;
  passage: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface SJTQuestion {
  id: number;
  scenario: string;
  question: string;
  options: string[];
  ranking: string[];
  explanation: string;
}

interface QuestionBank {
  employer: string;
  numerical: NumericalQuestion[];
  verbal: VerbalQuestion[];
  sjt: SJTQuestion[];
}

type TestType = "numerical" | "verbal" | "sjt";
type Phase = "select" | "test" | "results";

const TIME_LIMITS: Record<TestType, number> = {
  numerical: 25 * 60,
  verbal: 20 * 60,
  sjt: 30 * 60,
};

const LABELS: Record<TestType, string> = {
  numerical: "Numerical Reasoning",
  verbal: "Verbal Reasoning",
  sjt: "Situational Judgement",
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function scoreAnswer(type: TestType, q: NumericalQuestion | VerbalQuestion | SJTQuestion, answer: string): boolean {
  if (type === "sjt") {
    // For SJT, just check the best option (first in ranking)
    const sjt = q as SJTQuestion;
    return answer === sjt.ranking[0];
  }
  return answer === (q as NumericalQuestion | VerbalQuestion).answer;
}

export default function PsychometricTest({ bank, companyName }: { bank: QuestionBank; companyName: string }) {
  const [phase, setPhase] = useState<Phase>("select");
  const [testType, setTestType] = useState<TestType>("numerical");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);

  const questions = bank[testType] as (NumericalQuestion | VerbalQuestion | SJTQuestion)[];

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setPhase("results");
  }, []);

  useEffect(() => {
    if (phase !== "test" || submitted) return;
    setTimeLeft(TIME_LIMITS[testType]);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, testType, submitted, handleSubmit]);

  function startTest(type: TestType) {
    setTestType(type);
    setAnswers({});
    setSubmitted(false);
    setCurrentQ(0);
    setPhase("test");
  }

  function retake() {
    setPhase("select");
    setAnswers({});
    setSubmitted(false);
    setCurrentQ(0);
  }

  if (phase === "select") {
    return (
      <div className="py-8">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Practice Tests — {companyName}</h2>
        <p className="text-slate-500 text-sm mb-6">
          Original questions written in the style of {companyName}&apos;s assessments. Not a copy of any real test.
          Unlimited retakes — each attempt generates the same question set.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {(["numerical", "verbal", "sjt"] as TestType[]).map((type) => {
            const count = bank[type].length;
            const minutes = TIME_LIMITS[type] / 60;
            return (
              <button
                key={type}
                onClick={() => startTest(type)}
                className="text-left border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all group"
              >
                <div className="text-2xl mb-3">
                  {type === "numerical" ? "🔢" : type === "verbal" ? "📖" : "⚖️"}
                </div>
                <p className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">
                  {LABELS[type]}
                </p>
                <p className="text-xs text-slate-400">{count} questions · {minutes} min limit</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const correct = questions.filter((q, i) => {
      const ans = answers[i];
      if (!ans) return false;
      return scoreAnswer(testType, q, ans);
    }).length;
    const total = questions.length;
    const pct = Math.round((correct / total) * 100);

    return (
      <div className="py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-center bg-indigo-50 rounded-2xl px-8 py-5 border border-indigo-100">
            <p className="text-4xl font-bold text-indigo-700">{pct}%</p>
            <p className="text-sm text-slate-500 mt-1">{correct} / {total} correct</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{LABELS[testType]} — Results</h2>
            <p className="text-slate-500 text-sm mt-1">
              {pct >= 80 ? "Strong performance — you are in the competitive range." :
               pct >= 60 ? "Good start. Review the explanations below and retake to improve." :
               "Keep practising — read each explanation carefully before retaking."}
            </p>
            <button
              onClick={retake}
              className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-2"
            >
              ← Try another test
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, i) => {
            const userAns = answers[i];
            const correct = userAns ? scoreAnswer(testType, q, userAns) : false;
            const rightAns = testType === "sjt"
              ? (q as SJTQuestion).ranking[0]
              : (q as NumericalQuestion | VerbalQuestion).answer;
            const optLetters = ["A", "B", "C", "D"];

            return (
              <div key={i} className={`border rounded-2xl p-5 ${correct ? "border-green-200 bg-green-50/30" : "border-red-200 bg-red-50/20"}`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className={`text-lg shrink-0 ${correct ? "text-green-600" : "text-red-500"}`}>
                    {correct ? "✓" : "✗"}
                  </span>
                  <div className="flex-1">
                    {testType === "verbal" && (q as VerbalQuestion).passage && (
                      <p className="text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mb-3 leading-relaxed italic">
                        {(q as VerbalQuestion).passage}
                      </p>
                    )}
                    {testType === "sjt" && (q as SJTQuestion).scenario && (
                      <p className="text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mb-3 leading-relaxed">
                        {(q as SJTQuestion).scenario}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-slate-900 mb-2">Q{i + 1}. {q.question}</p>
                    <div className="space-y-1 mb-3">
                      {q.options.map((opt, j) => {
                        const letter = optLetters[j];
                        const isRight = letter === rightAns;
                        const isUser = letter === userAns;
                        return (
                          <p key={j} className={`text-xs px-3 py-1.5 rounded-lg ${
                            isRight ? "bg-green-100 text-green-800 font-medium" :
                            isUser && !isRight ? "bg-red-100 text-red-700 line-through" :
                            "text-slate-500"
                          }`}>
                            <span className="font-mono mr-2">{letter}.</span>{opt}
                          </p>
                        );
                      })}
                    </div>
                    <p className="text-xs text-slate-600 bg-white border border-slate-100 rounded-lg px-3 py-2">
                      <span className="font-semibold">Explanation: </span>
                      {(q as NumericalQuestion).explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Test phase
  const q = questions[currentQ];
  const isLast = currentQ === questions.length - 1;
  const allAnswered = questions.every((_, i) => answers[i]);
  const timerUrgent = timeLeft < 120;

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-slate-700">{LABELS[testType]}</p>
          <p className="text-xs text-slate-400">{companyName} · Question {currentQ + 1} of {questions.length}</p>
        </div>
        <div className={`font-mono text-sm font-bold px-3 py-1.5 rounded-lg ${
          timerUrgent ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
        }`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6 flex-wrap">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className={`w-7 h-7 rounded-md text-xs font-medium transition-colors ${
              i === currentQ ? "bg-indigo-600 text-white" :
              answers[i] ? "bg-indigo-100 text-indigo-700" :
              "bg-slate-100 text-slate-400 hover:bg-slate-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="border border-slate-200 rounded-2xl p-6 mb-4">
        {testType === "verbal" && (q as VerbalQuestion).passage && (
          <p className="text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 mb-4 leading-relaxed italic">
            {(q as VerbalQuestion).passage}
          </p>
        )}
        {testType === "sjt" && (q as SJTQuestion).scenario && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Scenario</p>
            <p className="text-sm text-slate-700 leading-relaxed">{(q as SJTQuestion).scenario}</p>
          </div>
        )}
        <p className="font-semibold text-slate-900 mb-4 text-sm leading-relaxed">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, j) => {
            const letter = ["A", "B", "C", "D"][j];
            const selected = answers[currentQ] === letter;
            return (
              <button
                key={j}
                onClick={() => setAnswers((prev) => ({ ...prev, [currentQ]: letter }))}
                className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-all ${
                  selected
                    ? "border-indigo-400 bg-indigo-50 text-indigo-900 font-medium"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span className="font-mono text-slate-400 mr-2">{letter}.</span>{opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 justify-between">
        <button
          onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
          disabled={currentQ === 0}
          className="text-sm px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-colors"
        >
          ← Previous
        </button>
        <div className="flex gap-3">
          {!isLast && (
            <button
              onClick={() => setCurrentQ((q) => Math.min(questions.length - 1, q + 1))}
              className="text-sm px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Next →
            </button>
          )}
          {(isLast || allAnswered) && (
            <button
              onClick={handleSubmit}
              className="text-sm px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors"
            >
              Submit test
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center mt-4">
        {Object.keys(answers).length} of {questions.length} answered · Not affiliated with {companyName}
      </p>
    </div>
  );
}
