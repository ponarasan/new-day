import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Heart, Mail, Sparkles } from 'lucide-react'
import { siteConfig } from '../config'
import Starfield from '../components/effects/Starfield'
import {
  FloatingHearts,
  GoldenDust,
  RosePetals,
  ShootingStars,
} from '../components/effects/Atmosphere'
import { FloralSpray, FloralDivider } from '../components/Botanicals'
import { ChapterTag, MagicButton, Sparkle } from '../components/Ui'

function LoveBurst({ burstKey }) {
  const hearts = useMemo(() => {
    let value = burstKey * 311 + 17
    const random = () => {
      value = (value * 9301 + 49297) % 233280
      return value / 233280
    }
    return Array.from({ length: 26 }, (_, index) => {
      const angle = -Math.PI * 0.9 + (Math.PI * 1.8 * index) / 25 + random() * 0.25
      const distance = 130 + random() * 330
      return {
        id: index,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0.35 + random() * 1,
        rotate: -90 + random() * 180,
        duration: 1.3 + random() * 1.15,
        delay: random() * 0.24,
        color: ['#f8b6c8', '#efa1b7', '#edcda0', '#ffe2e6', '#d783a1'][
          Math.floor(random() * 5)
        ],
      }
    })
  }, [burstKey])

  return (
    <div className="pointer-events-none fixed inset-0 z-[85] overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.span
          key={`${burstKey}-${heart.id}`}
          className="absolute left-1/2 top-[58%]"
          style={{ color: heart.color }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }}
          animate={{
            x: heart.x,
            y: heart.y,
            opacity: [0, 0.92, 0.8, 0],
            scale: [0.2, heart.scale, heart.scale * 0.85],
            rotate: heart.rotate,
          }}
          transition={{ duration: heart.duration, delay: heart.delay, ease: 'easeOut' }}
        >
          {heart.id % 5 === 0 ? (
            <Sparkle size={8 + heart.scale * 9} />
          ) : (
            <Heart size={10 + heart.scale * 13} fill="currentColor" strokeWidth={0} />
          )}
        </motion.span>
      ))}
      <motion.div
        className="absolute left-1/2 top-[58%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,225,213,.32),rgba(242,166,186,.14)_38%,transparent_70%)] blur-xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 0.8, 0], scale: [0.5, 3.5, 5] }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      />
    </div>
  )
}

function HeartConstellation() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 w-[min(118vw,880px)] -translate-x-1/2 -translate-y-[46%] opacity-65" aria-hidden="true">
      <svg viewBox="0 0 700 700" fill="none" className="h-auto w-full">
        <defs>
          <linearGradient id="final-heart-line" x1="120" y1="80" x2="580" y2="640" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f7ddb1" stopOpacity=".45" />
            <stop offset=".35" stopColor="#f3b6c7" stopOpacity=".36" />
            <stop offset=".7" stopColor="#d5b8ee" stopOpacity=".28" />
            <stop offset="1" stopColor="#f4d8ad" stopOpacity=".36" />
          </linearGradient>
          <radialGradient id="final-heart-fill">
            <stop stopColor="#eaa6bc" stopOpacity=".055" />
            <stop offset="1" stopColor="#8f71b7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="350" cy="350" r="288" stroke="#f1d4a6" strokeOpacity=".055" />
        <circle cx="350" cy="350" r="233" stroke="#f1d4a6" strokeOpacity=".045" strokeDasharray="2 8" />
        <motion.path
          d="M350 614C90 430 76 218 210 137C288 90 337 153 350 192C363 153 412 90 490 137C624 218 610 430 350 614Z"
          fill="url(#final-heart-fill)"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.4 }}
        />
        <motion.path
          d="M350 614C90 430 76 218 210 137C288 90 337 153 350 192C363 153 412 90 490 137C624 218 610 430 350 614Z"
          stroke="url(#final-heart-line)"
          strokeWidth=".9"
          strokeDasharray="2.5 7"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 3.5, delay: 0.5, ease: 'easeInOut' }}
        />
        {[
          [210, 137],
          [350, 192],
          [490, 137],
          [544, 268],
          [486, 435],
          [350, 614],
          [214, 435],
          [156, 268],
        ].map(([x, y], index) => (
          <motion.g
            key={`${x}-${y}`}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.1 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 + index * 0.13 }}
          >
            <circle cx={x} cy={y} r="5.5" fill="#f9e5c1" fillOpacity=".1" />
            <circle cx={x} cy={y} r="1.5" fill="#f9e5c1" fillOpacity=".72" />
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default function Finale() {
  const reduceMotion = useReducedMotion()
  const { finale, recipient, sender, letter } = siteConfig
  const [burstKey, setBurstKey] = useState(0)
  const [loveSent, setLoveSent] = useState(false)

  const sendLove = () => {
    setBurstKey((value) => value + 1)
    setLoveSent(true)
  }

  return (
    <section
      id="forever"
      className="relative isolate min-h-[100svh] overflow-clip bg-[#05030e]"
      aria-labelledby="forever-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(108,55,104,.24),transparent_44%),radial-gradient(ellipse_at_24%_72%,rgba(129,51,86,.16),transparent_40%),radial-gradient(ellipse_at_78%_78%,rgba(81,66,142,.16),transparent_42%),linear-gradient(180deg,#070411_0%,#0b0617_60%,#06030d_100%)]" />
      <div className="absolute inset-0 aurora opacity-70" />
      <HeartConstellation />
      <Starfield starCount={200} className="opacity-80" />
      <ShootingStars count={4} />
      <GoldenDust count={30} seed={17} className="opacity-65" />
      <FloatingHearts count={12} seed={81} opacity={0.22} />
      <RosePetals count={9} seed={31} opacity={0.18} />

      <div className="pointer-events-none absolute -left-24 bottom-[-7rem] hidden w-[390px] opacity-25 lg:block">
        <FloralSpray className="h-auto w-full" />
      </div>
      <div className="pointer-events-none absolute -right-28 top-[20%] hidden w-[350px] opacity-15 lg:block">
        <FloralSpray flipped className="h-auto w-full" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1100px] flex-col items-center justify-center px-6 py-24 sm:px-10 sm:py-28">
        <ChapterTag number="03" label="Always" align="center" />

        <motion.div
          className="mt-10 flex items-center justify-center gap-3 text-[#edcf9f]/55"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#edcf9f]/30" />
          <Heart size={14} fill="currentColor" strokeWidth={0} />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#edcf9f]/30" />
        </motion.div>

        <p className="mt-6 text-center text-[0.55rem] font-medium uppercase tracking-[0.33em] text-[#f0d4ad]/56">
          {finale.kicker}
        </p>

        <motion.h2
          id="forever-title"
          className="mt-6 max-w-[920px] text-balance text-center font-script text-[clamp(3.2rem,8.6vw,7.3rem)] leading-[0.95] text-[#fff5e9]"
          initial={reduceMotion ? false : { opacity: 0, y: 34, filter: 'blur(9px)' }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {finale.script}
        </motion.h2>

        <motion.p
          className="mt-7 max-w-[38rem] text-balance text-center font-display text-[1.25rem] font-light leading-[1.55] text-[#f5e6d9]/78 sm:text-[1.55rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {finale.lead}
        </motion.p>

        <FloralDivider className="mt-9 opacity-60" />

        <motion.p
          className="mt-8 max-w-[37rem] text-pretty text-center text-[0.83rem] font-light leading-[1.95] text-[#cfc1cb]/52 sm:text-[0.91rem]"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.35 }}
        >
          {finale.paragraph}
        </motion.p>

        <motion.div
          className="glass gradient-border relative mt-10 w-full max-w-[31rem] overflow-hidden rounded-[1.55rem] px-7 py-7 text-center shadow-card sm:px-9"
          initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#efb1c0]/[0.09] blur-3xl" />
          <p className="text-[0.48rem] uppercase tracking-[0.3em] text-[#f0d4ac]/45">{finale.plate.small}</p>
          <p className="mt-2 font-script text-[2.5rem] leading-none text-[#fff2e1] sm:text-[2.9rem]">{finale.plate.name}</p>
          <p className="mt-3 text-[0.55rem] font-medium uppercase tracking-[0.27em] text-[#f4dcc4]/45">
            {finale.plate.line}
          </p>
          <div className="mx-auto mt-5 flex items-center justify-center gap-2.5">
            <span className="h-px w-8 bg-[#eacb9d]/25" />
            <Sparkle size={8} className="text-[#eacb9d]/45" />
            <span className="h-px w-8 bg-[#eacb9d]/25" />
          </div>
          <p className="mt-4 font-display text-[0.95rem] italic leading-relaxed text-white/36">
            “{letter.closing}”
          </p>
          <p className="mt-1 font-script text-[1.7rem] text-[#efcdc2]/60">{sender}</p>
        </motion.div>

        <motion.p
          className="mt-9 max-w-[35rem] text-balance text-center font-script text-[1.6rem] leading-[1.4] text-[#f1c9cc]/62 sm:text-[1.95rem]"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.15, delay: 0.3 }}
        >
          {finale.loveNote}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          <MagicButton onClick={sendLove} className="min-h-[3.6rem] px-8">
            <Heart size={15} fill="currentColor" strokeWidth={0} />
            Send a little love
          </MagicButton>
          <a
            href="#letter"
            className="ghost-button inline-flex min-h-[3.6rem] items-center justify-center gap-2.5 rounded-full px-7 text-[0.62rem] font-medium uppercase tracking-[0.19em] text-white/55 transition-all hover:text-white/85"
          >
            <Mail size={14} strokeWidth={1.4} />
            Read my letter again
          </a>
        </motion.div>

        <p className="mt-8 flex min-h-[1.2rem] items-center gap-2 text-[0.5rem] uppercase tracking-[0.26em] text-[#f1c6d1]/42">
          {loveSent && (
            <>
              <Heart size={9} fill="currentColor" strokeWidth={0} />
              sent, with every piece of my heart
            </>
          )}
        </p>

        <div className="mt-12 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#eccfa2]/20" />
            <span className="font-display text-[0.65rem] italic uppercase tracking-[0.15em] text-white/24">
              Go be brilliant, my love
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#eccfa2]/20" />
          </div>
          <a
            href="#celebration"
            className="group flex items-center gap-2 text-[0.48rem] uppercase tracking-[0.26em] text-white/45 transition-colors hover:text-white/80"
          >
            <ArrowUp size={11} strokeWidth={1.4} className="transition-transform group-hover:-translate-y-0.5" />
            back to the beginning
          </a>
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/[0.055] px-6 py-7">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2 text-[0.47rem] uppercase tracking-[0.25em] text-white/20">
            <Sparkles size={9} className="text-[#eacfa3]/35" />
            <span>{finale.footer}</span>
          </div>
          <p className="font-display text-[0.74rem] italic tracking-wide text-white/24">
            For {recipient.fullName} · {recipient.company} · {recipient.role}
          </p>
        </div>
      </footer>

      <AnimatePresence>{burstKey > 0 && <LoveBurst key={burstKey} burstKey={burstKey} />}</AnimatePresence>
    </section>
  )
}
