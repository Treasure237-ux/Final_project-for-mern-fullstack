import { Link } from 'react-router-dom'
import BrandIcon from '../components/BrandIcon'

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f2ea] dark:bg-gray-950">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ffe1d6] opacity-80 blur-3xl float-slow" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-[#d6e5ff] opacity-70 blur-3xl float-slow" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#d4f4e8] opacity-70 blur-3xl float-slow" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm dark:border-amber-500/40 dark:bg-gray-900/70 dark:text-amber-200">
              <BrandIcon className="h-4 w-4" />
              SmartQuiz Studio
              <span className="h-2 w-2 rounded-full bg-amber-500" />
            </span>
            <h1 className="font-display mt-6 text-5xl leading-tight text-gray-900 dark:text-white sm:text-6xl">
              Exam-ready notes and quizzes in minutes, not hours.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
              Turn any topic into structured study notes, smart flashcards, and quizzes. Built for focus, clarity,
              and real retention.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-[#e85d3f] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#d54f35] dark:shadow-none"
              >
                Start Building
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-gray-900/20 bg-white/70 px-6 py-3 text-base font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:border-gray-900/40 dark:border-gray-500/40 dark:bg-gray-900/50 dark:text-gray-100"
              >
                Sign In
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Topics mastered', value: '2.4k+' },
                { label: 'Quizzes generated', value: '9.1k+' },
                { label: 'Avg. time saved', value: '46%' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-900/10 bg-white/70 p-4 text-center shadow-sm dark:border-gray-700/50 dark:bg-gray-900/60"
                >
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal-delayed">
            <div className="rounded-3xl border border-gray-900/10 bg-white/90 p-6 shadow-2xl shadow-[var(--shadow)] backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/70">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Today’s focus</p>
                  <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">Cellular Respiration</h2>
                </div>
                <span className="rounded-full bg-[#1a936f] px-3 py-1 text-xs font-semibold text-white">Ready</span>
              </div>
              <div className="mt-6 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-500/40 dark:bg-amber-500/10">
                  <p className="font-semibold text-gray-900 dark:text-white">Key idea</p>
                  <p className="mt-2">
                    ATP production follows glycolysis → Krebs cycle → electron transport chain. Each step captures
                    energy efficiently.
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 dark:border-sky-500/40 dark:bg-sky-500/10">
                  <p className="font-semibold text-gray-900 dark:text-white">Quick check</p>
                  <p className="mt-2">Which stage produces the most ATP directly?</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Glycolysis', 'Krebs cycle', 'ETC'].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-gray-900/10 bg-white px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-700/50 dark:bg-gray-900/60 dark:text-gray-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-900/10 bg-gray-50 p-4 text-sm text-gray-600 dark:border-gray-700/50 dark:bg-gray-900/40 dark:text-gray-300">
                <span>Auto-generated in 38 seconds</span>
                <span className="font-semibold text-[#2b59c3]">Preview</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-gray-900/10 bg-white/70 p-5 text-sm shadow-lg shadow-[var(--shadow)] backdrop-blur lg:block dark:border-gray-700/60 dark:bg-gray-900/70">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Study flow</p>
              <div className="mt-3 space-y-3 text-gray-700 dark:text-gray-300">
                {['Outline', 'Deep notes', 'Flashcards', 'Quiz mode'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#e85d3f]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Structured by design',
              body: 'Every note follows a consistent, exam-friendly structure so you can scan, retain, and review fast.',
            },
            {
              title: 'Adaptive prompts',
              body: 'Tune tone, depth, and difficulty per subject to get the right level of explanation every time.',
            },
            {
              title: 'Progress you can feel',
              body: 'Track topics, review weak areas, and generate fresh quizzes to keep momentum.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-gray-900/10 bg-white/70 p-6 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/60"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage

