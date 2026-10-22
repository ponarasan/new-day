import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, Mail, Sparkles } from 'lucide-react'
import { siteConfig } from '../config'
import Starfield from '../components/effects/Starfield'
import { FloatingHearts, GoldenDust, RosePetals, ShootingStars } from '../components/effects/Atmosphere'
import { FloralSpray, FloralDivider, RoseBloom } from '../components/Botanicals'
import { ChapterTag, MagicButton, Sparkle } from '../components/Ui'

const smooth = [0.22, 1, 0.36, 1]

function WaxSeal() {
  return (
    <div className="wax-seal relative flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-[46%_54%_48%_52%/50%_45%_55%_50%] sm:h-[4.8rem] sm:w-[4.8rem]">
      <div className="absolute inset-[6px] rounded-[48%_52%_46%_54%/52%_48%_52%_48%] border border-[#ffd9d5]/15" />
      <Heart size={23} fill="#ffd6d1" strokeWidth={0} className="drop-shadow-[0_2px_4px_rgba(62,7,24,.5)]" />
      <span className="absolute bottom-[15%] text-[0.33rem] uppercase tracking-[0.2em] text-[#ffd6d1]/50">G</span>
    </div>
  )
}

function Envelope({ opening, onOpen }) {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(215,132,160,.16),transparent_64%)] blur-2xl" />
      <motion.button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label={`Open your love letter from ${siteConfig.sender}`}
        className="group relative block w-full cursor-pointer text-left disabled:cursor-default"
        initial={false}
        whileHover={opening ? undefined : { y: -5 }}
        transition={{ duration: 0.45, ease: smooth }}
        style={{ perspective: '1500px' }}
      >
        <div className="env-stage relative mx-auto w-full">
            <div className="env-shadow absolute inset-x-[9%] bottom-[4%] h-12 rounded-full" />
          <div
            className="env-3d relative aspect-[1.58/1] w-full rounded-[1rem] border border-[#f8e2d5]/35"
            style={{ transform: 'rotateX(7deg) rotateZ(-1.4deg)' }}
          >
            {/* Envelope back */}
            <div className="envelope-paper absolute inset-0 overflow-hidden rounded-[1rem] shadow-[0_30px_80px_rgba(2,0,8,.45)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(255,255,255,.65),transparent_54%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(130deg,transparent_21%,rgba(153,97,102,.12)_21.3%,transparent_21.7%,transparent_78%,rgba(153,97,102,.09)_78.3%,transparent_78.7%)]" />
            </div>

            {/* Envelope interior */}
            <div className="envelope-inside absolute inset-x-[2%] top-[4%] h-[64%] rounded-t-[.8rem] opacity-90">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,11,27,.24),transparent_55%)]" />
            </div>

            {/* A little of the letter peeks out while it opens */}
            <motion.div
              className="envelope-paper absolute left-[7%] right-[7%] top-[8%] z-[12] h-[73%] rounded-t-[3px] border border-white/35 shadow-[0_10px_35px_rgba(35,8,23,.3)]"
              initial={false}
              animate={
                opening
                  ? { y: '-38%', rotate: -1.1, opacity: 1 }
                  : { y: 0, rotate: 0, opacity: 0.95 }
              }
              transition={{ duration: 1.25, delay: opening ? 0.35 : 0, ease: smooth }}
            >
              <div className="flex h-full flex-col items-center px-6 pt-8 text-center">
                <span className="font-script text-[2.1rem] leading-none text-[#9a5367]/80 sm:text-[2.8rem]">My Grace,</span>
                <span className="mt-4 h-px w-14 bg-[#b7867d]/25" />
                <span className="mt-3 max-w-[14rem] font-display text-[0.85rem] italic leading-relaxed text-[#7b5860]/65">
                  There are a few things I need you to know...
                </span>
                <div className="mt-auto pb-10 text-[#b2757f]/45">
                  <Heart size={13} fill="currentColor" strokeWidth={0} />
                </div>
              </div>
            </motion.div>

            {/* Main pocket */}
            <div className="envelope-front absolute inset-0 z-20 rounded-[1rem] border border-[#fff5ec]/30 shadow-[inset_0_1px_0_rgba(255,255,255,.6),inset_0_-20px_35px_rgba(114,63,69,.07)]">
              <div className="envelope-fold absolute inset-0 rounded-[1rem]" />
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-75"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path d="M0 0L50 47L100 0" stroke="rgba(131,80,81,.19)" strokeWidth=".16" />
                <path d="M50 47L100 100M50 47L0 100" stroke="rgba(131,80,81,.15)" strokeWidth=".14" />
                <path d="M0 1H100" stroke="rgba(255,255,255,.45)" strokeWidth=".18" />
              </svg>
              <div className="absolute left-[11%] top-[13%] h-px w-[39%] rotate-[27deg] bg-[#bc8787]/20" />
              <div className="absolute right-[11%] top-[13%] h-px w-[39%] -rotate-[27deg] bg-[#bc8787]/20" />
              <div className="absolute bottom-[14%] left-[8%] flex items-center gap-2 text-[#97636b]/65">
                <span className="h-px w-5 bg-current opacity-40" />
                <span className="font-script text-xl sm:text-2xl">for you, always</span>
              </div>
              <div className="absolute bottom-[14%] right-[8%] text-[0.44rem] uppercase tracking-[0.27em] text-[#8b5a62]/45">
                {siteConfig.recipient.firstName}
              </div>
            </div>

            {/* Top flap — opens in 3D on click */}
            <motion.div
              className="env-flap absolute inset-x-0 top-0 h-[59%]"
              initial={false}
              animate={opening ? { rotateX: -172 } : { rotateX: 0 }}
              transition={{ duration: 1.25, delay: 0.08, ease: smooth }}
              style={{
                zIndex: opening ? 11 : 30,
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background:
                  'linear-gradient(165deg, #fbf1e4 0%, #f1ddd3 48%, #e8cbc9 100%)',
                filter: 'drop-shadow(0 16px 20px rgba(83,39,52,.26))',
              }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(255,255,255,.55),transparent_44%,rgba(139,80,89,.1))]" />
              <div className="absolute left-1/2 top-[4%] h-full w-px -translate-x-1/2 bg-[#b48484]/15" />
            </motion.div>

            {/* Wax seal */}
            <motion.div
              className="absolute left-1/2 top-[48%] z-40 -translate-x-1/2 -translate-y-1/2"
              initial={false}
              animate={opening ? { opacity: 0, scale: 0.55, rotate: 22 } : { opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
            >
              <WaxSeal />
            </motion.div>

            {opening &&
              [0, 1, 2, 3, 4, 5].map((index) => (
                <motion.span
                  key={index}
                  className="absolute left-1/2 top-[48%] z-40 text-[#f6c9cd]"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.9, 0],
                    x: Math.cos((index / 6) * Math.PI * 2) * 120,
                    y: Math.sin((index / 6) * Math.PI * 2) * 90 - 35,
                    scale: [0.5, 1, 0.2],
                  }}
                  transition={{ duration: 1.4, delay: 0.45, ease: 'easeOut' }}
                >
                  {index % 2 ? <Sparkle size={11} /> : <Heart size={9} fill="currentColor" strokeWidth={0} />}
                </motion.span>
              ))}
          </div>
        </div>
      </motion.button>

      <motion.div
        className="mt-10 flex flex-col items-center"
        initial={false}
        animate={opening ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MagicButton onClick={onOpen} disabled={opening} arrow className="min-h-[3.7rem] px-8">
          <Mail size={15} strokeWidth={1.4} />
          {siteConfig.letter.button}
        </MagicButton>
        <p className="mt-4 flex items-center gap-2 font-display text-[0.88rem] italic tracking-wide text-white/42">
          <Sparkle size={8} />
          sealed with a kiss, just for you
          <Sparkle size={8} />
        </p>
      </motion.div>
    </div>
  )
}

function useLetterSegments() {
  return useMemo(() => {
    const { salutation, paragraphs, closing, signature } = siteConfig.letter
    const raw = [
      { kind: 'salutation', text: salutation },
      ...paragraphs.map((text, index) => ({ kind: 'body', text, index })),
      { kind: 'closing', text: closing },
      { kind: 'signature', text: signature },
    ]

    let offset = 0
    const segments = raw.map((segment) => {
      const chars = Array.from(segment.text)
      const next = { ...segment, chars, start: offset, end: offset + chars.length }
      offset += chars.length
      return next
    })

    return { segments, total: offset }
  }, [])
}

function useTypewriter(total, active) {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (!active) return undefined

    if (reduceMotion || skipped) {
      setCount(total)
      return undefined
    }

    let frame = 0
    let current = 0
    let carry = 0
    let lastTime = performance.now()
    let startedAt = performance.now()
    const millisPerCharacter = 6.8

    const tick = (now) => {
      if (now - startedAt < 280) {
        lastTime = now
        frame = window.requestAnimationFrame(tick)
        return
      }

      const elapsed = Math.min(now - lastTime, 64)
      lastTime = now
      carry += elapsed / millisPerCharacter
      const step = Math.floor(carry)
      if (step > 0) {
        carry -= step
        current = Math.min(total, current + step)
        setCount(current)
      }

      if (current < total) frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    startedAt = performance.now()
    return () => window.cancelAnimationFrame(frame)
  }, [active, reduceMotion, skipped, total])

  const revealAll = () => {
    setSkipped(true)
    setCount(total)
  }

  return { count, complete: count >= total, revealAll }
}

function LetterPaper({ onComplete }) {
  const { letter } = siteConfig
  const { segments, total } = useLetterSegments()
  const { count, complete, revealAll } = useTypewriter(total, true)

  useEffect(() => {
    if (complete) onComplete?.()
  }, [complete, onComplete])

  let remaining = count

  return (
    <motion.article
      className="relative mx-auto w-full max-w-[53rem]"
      initial={{ opacity: 0, y: 50, scale: 0.965, rotate: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 1.05, ease: smooth }}
    >
      <div className="absolute -inset-3 rounded-[1.4rem] border border-[#f6ddc7]/10 rotate-[-1deg] sm:-inset-4" />
      <div className="absolute -inset-8 rounded-[2rem] bg-[#d48a99]/[0.08] blur-3xl" />

      <div className="paper relative overflow-clip rounded-[0.8rem] sm:rounded-[1.1rem]">
        <div className="paper-grain" />
        <div className="pointer-events-none absolute -right-16 -top-20 h-[380px] w-[330px] opacity-[0.11]">
          <FloralSpray muted className="h-auto w-full" />
        </div>
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-[330px] w-[300px] rotate-180 opacity-[0.075]">
          <FloralSpray muted className="h-auto w-full" />
        </div>
        <div className="pointer-events-none absolute right-10 top-16 font-display text-[10rem] leading-none text-[#996d6c]/[0.045]">
          ♡
        </div>

        <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14 md:px-16 md:py-16 lg:px-20">
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-2.5 text-[#91606a]">
              <Heart size={11} fill="currentColor" strokeWidth={0} />
              <span className="text-[0.48rem] font-semibold uppercase tracking-[0.28em]">A letter for Grace</span>
            </div>
            {complete ? (
              <span className="hidden font-display text-[0.7rem] italic tracking-[0.15em] text-[#99747a]/55 sm:block">
                on your first day
              </span>
            ) : (
              <button
                type="button"
                onClick={revealAll}
                aria-label="Reveal the whole letter"
                className="flex shrink-0 items-center gap-1.5 font-display text-[0.76rem] italic tracking-wide text-[#7f4958]/85 underline decoration-[#a9787b]/35 underline-offset-4 transition-colors hover:text-[#5f2c40]"
              >
                <Sparkles size={9} strokeWidth={1.3} />
                <span className="sm:hidden">read it all</span>
                <span className="hidden sm:inline">reveal the whole letter</span>
              </button>
            )}
          </div>
          <div className="mt-7 h-px bg-gradient-to-r from-[#b5837c]/35 via-[#b5837c]/15 to-transparent" />

          <div className="sr-only">
            <p>{letter.salutation}</p>
            {letter.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p>{letter.closing}</p>
            <p>{letter.signature}</p>
          </div>

          <div aria-hidden="true">
            {segments.map((segment) => {
              const visible = Math.min(Math.max(remaining, 0), segment.chars.length)
              remaining -= visible
              if (visible <= 0) return null

              const isActive = !complete && count > segment.start && count < segment.end
              const text = segment.chars.slice(0, visible).join('')

              if (segment.kind === 'salutation') {
                return (
                  <p
                    key="salutation"
                    className={`mt-10 font-script text-[2rem] leading-[1.1] text-[#8c4158] sm:text-[3rem] ${
                      isActive ? 'typing-caret' : ''
                    }`}
                  >
                    {text}
                  </p>
                )
              }

              if (segment.kind === 'closing') {
                return (
                  <p
                    key="closing"
                    className={`mt-12 font-display text-[1.02rem] italic leading-relaxed text-[#7d4b58] sm:text-[1.2rem] ${
                      isActive ? 'typing-caret' : ''
                    }`}
                  >
                    {text}
                  </p>
                )
              }

              if (segment.kind === 'signature') {
                return (
                  <div key="signature" className="mt-2">
                    <p
                      className={`font-script text-[2.2rem] leading-[1.3] text-[#8e4358] sm:text-[2.75rem] ${
                        isActive ? 'typing-caret' : ''
                      }`}
                    >
                      {text}
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-px w-12 bg-[#b4847c]/35" />
                      <Heart size={12} fill="#b76f7c" strokeWidth={0} className="opacity-60" />
                    </div>
                  </div>
                )
              }

              return (
                <p
                  key={`paragraph-${segment.index}`}
                  className={`mt-5 text-pretty font-display font-medium leading-[1.85] text-[#3f2637] sm:mt-6 sm:leading-[1.9] ${
                    segment.index === 0
                      ? 'text-[1.18rem] italic text-[#5d3849] sm:text-[1.42rem]'
                      : 'text-[1.04rem] sm:text-[1.25rem]'
                  } ${isActive ? 'typing-caret' : ''}`}
                >
                  {text}
                </p>
              )
            })}
          </div>

          {complete && (
            <motion.div
              className="mt-10 flex items-center justify-between gap-4 border-t border-[#9c6d6c]/15 pt-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="flex items-center gap-2 text-[0.47rem] uppercase tracking-[0.24em] text-[#9e7378]/55">
                <Sparkles size={10} strokeWidth={1.3} />
                every word was meant
              </span>
              <span className="font-script text-lg text-[#9a5d6a]/65">forever yours</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Letter() {
  const [opening, setOpening] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const reduceMotion = useReducedMotion()
  const [letterDone, setLetterDone] = useState(false)
  const letterAnchor = useRef(null)

  useEffect(() => {
    if (!opening) return undefined
    const delay = reduceMotion ? 260 : 1450
    const timer = window.setTimeout(() => setRevealed(true), delay)
    return () => window.clearTimeout(timer)
  }, [opening, reduceMotion])

  useEffect(() => {
    if (!revealed) return undefined

    const timer = window.setTimeout(() => {
      const anchor = letterAnchor.current
      if (!anchor) return
      const top = anchor.getBoundingClientRect().top + window.scrollY - 28
      if (Math.abs(window.scrollY - top) < 80) return
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
    }, reduceMotion ? 120 : 780)

    return () => window.clearTimeout(timer)
  }, [revealed, reduceMotion])

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
  }

  return (
    <section
      id="letter"
      className="relative isolate overflow-clip bg-[#080512] py-24 sm:py-32 lg:py-40"
      aria-labelledby="letter-title"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#170a22_0%,#090615_25%,#0a0617_74%,#090613_100%)]" />
      <div className="absolute inset-0 aurora opacity-80" />
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]">
        <Starfield starCount={125} className="opacity-55" />
      </div>
      <ShootingStars count={2} />
      <GoldenDust count={18} seed={72} className="opacity-45" />
      <RosePetals count={7} seed={44} className="opacity-25" />
      <FloatingHearts count={6} seed={18} className="opacity-20" />

      <div className="pointer-events-none absolute left-[-9%] top-[18%] hidden w-[300px] opacity-20 lg:block xl:w-[350px]">
        <FloralSpray className="h-auto w-full" />
      </div>
      <div className="pointer-events-none absolute right-[-10%] top-[43%] hidden w-[310px] opacity-15 lg:block xl:w-[370px]">
        <FloralSpray flipped className="h-auto w-full" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 sm:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <ChapterTag number="02" label="From my heart to yours" align="center" />
          <h2
            id="letter-title"
            className="mt-7 text-balance font-display text-[clamp(2.8rem,5.8vw,5rem)] font-light leading-[0.95] tracking-[-0.025em] text-[#fff6ea]"
          >
            Words I need you to{' '}
            <span className="blush-gold-text font-script text-[1.12em] leading-[0.8]">carry</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[0.87rem] font-light leading-[1.85] text-[#cfc0ca]/58 sm:text-[0.95rem]">
            {siteConfig.letter.intro}
          </p>
          <FloralDivider className="mt-8 opacity-75" />
        </div>

        <div className="relative mt-14 sm:mt-16">
          <div className="pointer-events-none absolute left-1/2 top-[42%] -z-10 -translate-x-1/2 -translate-y-1/2 select-none text-center">
            <span className="font-script text-[9rem] leading-none text-[#efb7c1]/[0.025] sm:text-[16rem]">
              for you
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="envelope"
                initial={false}
                exit={{ opacity: 0, y: -30, scale: 0.965, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="relative mx-auto max-w-[760px]"
              >
                <div className="absolute -left-16 top-16 hidden w-36 opacity-35 lg:block">
                  <RoseBloom size={145} palette="rose" />
                </div>
                <div className="absolute -right-16 bottom-24 hidden w-32 rotate-12 opacity-25 lg:block">
                  <RoseBloom size={128} palette="dusk" />
                </div>
                <Envelope opening={opening} onOpen={handleOpen} />
              </motion.div>
            ) : (
              <div key="letter" ref={letterAnchor}>
                <LetterPaper onComplete={() => setLetterDone(true)} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {revealed && !letterDone && (
          <span className="sr-only" role="status">
            Your letter is being written on screen.
          </span>
        )}
      </div>
    </section>
  )
}
