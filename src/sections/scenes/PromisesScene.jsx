import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Heart, Sparkles } from 'lucide-react'
import { siteConfig } from '../../config'
import Starfield from '../../components/effects/Starfield'
import {
  FloatingHearts,
  GoldenDust,
  RosePetals,
  ShootingStars,
  Twinkles,
} from '../../components/effects/Atmosphere'
import { FloralSpray } from '../../components/Botanicals'
import { ChapterTag, Sparkle } from '../../components/Ui'

const softEase = [0.22, 1, 0.36, 1]

function StarMap({ selected, onSelect }) {
  const reduceMotion = useReducedMotion()
  const stars = siteConfig.scenes.promises.stars

  const path = useMemo(() => {
    if (!stars.length) return ''
    return 'M50 85 C56 79 64 73 69 66 C75 58 82 45 82 31 C82 21 73 13 61 16 C57 17 53 24 50 29 C47 24 43 17 39 16 C27 13 18 21 20 31 C20 45 27 58 33 66 C38 73 44 79 50 85 Z'
  }, [stars])

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[34rem]"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.25, ease: softEase }}
    >
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(196,111,153,.105),rgba(81,58,140,.06)_45%,transparent_68%)] blur-2xl" />
      <div className="absolute inset-0 rounded-full border border-[#e8cba0]/[0.09]" />
      <div className="absolute inset-[6%] rounded-full border border-dashed border-[#e8cba0]/[0.08] animate-spin-slower" />
      <div className="absolute inset-[18%] rounded-full border border-white/[0.035]" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.035] to-transparent" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />

      <Twinkles count={14} seed={39} className="rounded-full opacity-70" />

      <motion.span
        className="absolute left-[8%] top-[15%] text-[#f4d9ae]/45"
        animate={reduceMotion ? undefined : { opacity: [0.24, 0.75, 0.24], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkle size={11} />
      </motion.span>
      <motion.span
        className="absolute bottom-[13%] right-[7%] text-[#f1bdcb]/35"
        animate={reduceMotion ? undefined : { opacity: [0.2, 0.65, 0.2], scale: [0.85, 1.05, 0.85] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <Sparkle size={8} />
      </motion.span>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <motion.path
          d={path}
          stroke="url(#constellation-line)"
          strokeWidth="0.27"
          strokeDasharray="1.8 1.7"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 2.8, delay: 0.5, ease: 'easeInOut' }}
        />
        <motion.path
          d="M50 88C6 59 7 20 30 17C41 15 48 22 50 30C52 22 59 15 70 17C93 20 94 59 50 88Z"
          stroke="#efd2a7"
          strokeOpacity=".17"
          strokeWidth=".22"
          initial={reduceMotion ? false : { pathLength: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3.2, delay: 0.3, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="constellation-line" x1="20" y1="16" x2="80" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#efd3a3" stopOpacity=".7" />
            <stop offset=".48" stopColor="#d9a9c4" stopOpacity=".52" />
            <stop offset="1" stopColor="#efd3a3" stopOpacity=".62" />
          </linearGradient>
        </defs>
      </svg>

      <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
        <span className="font-script text-[2.25rem] leading-none text-[#f6dfc6]/24 sm:text-[2.8rem]">Grace</span>
        <span className="mt-2 text-[0.4rem] uppercase tracking-[0.3em] text-[#f1d3a4]/22">written in the stars</span>
      </div>

      {stars.map((star, index) => {
        const isActive = selected === index
        const isBottom = star.y > 75
        return (
          <motion.button
            key={star.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Open promise about ${star.label}`}
            aria-pressed={isActive}
            className={`star-button ${isActive ? 'is-active' : ''}`}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 + index * 0.12, ease: softEase }}
          >
            <span className="relative flex h-7 w-7 items-center justify-center">
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-[#f6d8b3]/40"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [0.8, 1.8], opacity: [0.55, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className="constellation-star" />
            </span>
            <span
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[0.71rem] italic tracking-wide transition-colors duration-300 sm:text-[0.76rem] ${
                isActive ? 'text-[#fbe8cf]' : 'text-[#e8dde0]/72'
              } ${isBottom ? 'bottom-full mb-2' : 'top-full mt-2'}`}
            >
              {star.label}
            </span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}

function PromisePanel({ active }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.aside
      className="glass gradient-border relative flex min-h-[21rem] flex-col overflow-hidden rounded-[1.8rem] p-7 shadow-card sm:p-9"
      initial={reduceMotion ? false : { opacity: 0, x: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.05, delay: 0.25, ease: softEase }}
      aria-live="polite"
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#e7aab7]/[0.09] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#a994e3]/[0.075] blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#efd2a6]/62">
          <Sparkle size={9} />
          <span className="text-[0.49rem] font-medium uppercase tracking-[0.27em]">a promise from me</span>
        </div>
        <span className="text-[0.47rem] uppercase tracking-[0.2em] text-white/22">no. {active ? String(siteConfig.scenes.promises.stars.indexOf(active) + 1).padStart(2, '0') : '—'}</span>
      </div>

      <div className="relative flex flex-1 flex-col justify-center py-10">
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.div
              key={active.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease: softEase }}
            >
              <p className="text-[0.54rem] uppercase tracking-[0.27em] text-[#f2bece]/55">
                about {active.label}
              </p>
              <p className="mt-5 font-display text-[1.55rem] font-light italic leading-[1.42] text-[#fff4e7]/88 sm:text-[1.75rem]">
                “{active.promise}”
              </p>
              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-10 bg-[#e9cda0]/35" />
                <Heart size={11} fill="#efb0c0" strokeWidth={0} className="text-[#efb0c0] opacity-60" />
                <span className="font-script text-xl text-[#edcfc0]/55">forever yours</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#f1d3a4]/15 bg-white/[0.025] text-[#f3c3d0]/70"
                animate={reduceMotion ? undefined : { boxShadow: ['0 0 0 rgba(240,181,193,0)', '0 0 38px rgba(240,181,193,.1)', '0 0 0 rgba(240,181,193,0)'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={21} strokeWidth={1.1} />
              </motion.div>
              <p className="mx-auto mt-6 max-w-[17rem] font-display text-[1.3rem] font-light italic leading-relaxed text-[#f4e1d3]/60 sm:text-[1.45rem]">
                {siteConfig.scenes.promises.defaultMessage}
              </p>
              <p className="mx-auto mt-3 max-w-[16rem] text-[0.68rem] font-light leading-[1.8] text-white/40">
                Each one holds something I want you to remember on the road ahead.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
        <span className="flex items-center gap-2 text-[0.47rem] uppercase tracking-[0.22em] text-white/24">
          <span className="h-1 w-1 rounded-full bg-[#f1b5c3]/60" />
          six little promises
        </span>
        <span className="font-display text-[0.72rem] italic text-white/25">one forever</span>
      </div>
    </motion.aside>
  )
}

export default function PromisesScene() {
  const reduceMotion = useReducedMotion()
  const scene = siteConfig.scenes.promises
  const [selected, setSelected] = useState(null)
  const active = selected === null ? null : scene.stars[selected]

  return (
    <section
      id="promises"
      className="relative isolate overflow-clip bg-[#070412] py-24 sm:py-32 lg:py-36"
      aria-labelledby="promises-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_20%,rgba(76,66,148,.24),transparent_42%),radial-gradient(ellipse_at_20%_58%,rgba(132,56,99,.17),transparent_45%),radial-gradient(ellipse_at_50%_100%,rgba(96,54,110,.12),transparent_55%),linear-gradient(180deg,#070412_0%,#0c071a_50%,#070411_100%)]" />
      <div className="absolute inset-0 aurora opacity-80" />
      <Starfield starCount={185} className="opacity-75" />
      <ShootingStars count={3} />
      <GoldenDust count={25} seed={29} className="opacity-55" />
      <FloatingHearts count={7} seed={53} opacity={0.16} />
      <RosePetals count={7} seed={71} opacity={0.13} />

      <div className="pointer-events-none absolute -right-20 top-[28%] hidden w-[300px] opacity-[0.12] lg:block">
        <FloralSpray flipped className="h-auto w-full" />
      </div>
      <div className="pointer-events-none absolute -left-24 bottom-[8%] hidden w-[320px] opacity-[0.1] lg:block">
        <FloralSpray className="h-auto w-full" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 select-none font-display text-[22rem] italic leading-none text-white/[0.012]">
        02
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1250px] px-6 sm:px-10 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <ChapterTag number={scene.chapter} label={scene.kicker} />
          <div className="flex items-center gap-2 text-[#edcf9f]/35">
            <Sparkle size={9} />
            <span className="text-[0.48rem] uppercase tracking-[0.3em]">the journey · part two</span>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[720px] text-center sm:mt-16">
          <motion.h2
            id="promises-title"
            className="text-balance font-display text-[clamp(2.9rem,6vw,5rem)] font-light leading-[0.94] tracking-[-0.03em] text-[#fff8ee]"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.15, ease: softEase }}
          >
            The future is{' '}
            <span className="blush-gold-text font-script text-[1.18em] leading-[0.8]">yours, Grace.</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-[33rem] text-pretty text-[0.89rem] font-light leading-[1.9] text-[#cfc1cd]/55 sm:text-[0.96rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {scene.intro}
          </motion.p>
        </div>

        <div className="mt-12 grid items-center gap-10 sm:mt-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
          <div>
            <StarMap selected={selected} onSelect={setSelected} />
            <motion.p
              className="mt-4 flex items-center justify-center gap-2 text-[0.47rem] uppercase tracking-[0.27em] text-white/40"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Sparkles size={9} className="text-[#edcf9f]/45" />
              tap a star · open a promise
            </motion.p>
          </div>
          <PromisePanel active={active} />
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
          <motion.p
            className="max-w-[34rem] text-center font-display text-[1.12rem] font-light italic leading-relaxed text-[#f0ddcd]/45"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={reduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            “Whatever you dream of next, I&apos;m already proud of you.”
          </motion.p>
          <a
            href="#forever"
            className="group flex flex-col items-center gap-2.5 text-[#f0d7bb]/50 transition-colors hover:text-[#f0d7bb]/85"
          >
            <span className="text-[0.48rem] uppercase tracking-[0.28em]">one last thing, my love</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] transition-colors group-hover:border-[#edcf9f]/25">
              <ArrowDown size={13} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
