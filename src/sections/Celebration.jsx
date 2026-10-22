import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown, Heart, Sparkles } from 'lucide-react'
import { siteConfig } from '../config'
import Starfield from '../components/effects/Starfield'
import { FloatingHearts, GoldenDust, RosePetals } from '../components/effects/Atmosphere'
import { FloralSpray, RoseBloom } from '../components/Botanicals'
import { ChapterTag, Sparkle } from '../components/Ui'

function TiltCard({ children }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 120, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 120, damping: 22 })
  const glareX = useMotionValue(52)
  const glareY = useMotionValue(20)
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,246,230,.13), transparent 45%)`

  const handleMove = (event) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    rotateX.set((0.5 - y) * 7)
    rotateY.set((x - 0.5) * 8)
    glareX.set(x * 100)
    glareY.set(y * 100)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
      initial={reduceMotion ? false : { opacity: 0, y: 38, rotate: -2 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.div className="pointer-events-none absolute inset-0 z-10 rounded-[2rem]" style={{ background: glare }} />
      {children}
    </motion.div>
  )
}

function AchievementCard() {
  const { card } = siteConfig.celebration

  return (
    <TiltCard>
      <div className="relative rounded-[2rem]">
        <div className="absolute -inset-2 rotate-[1.8deg] rounded-[2.2rem] border border-[#e9c99a]/10" />
        <div className="absolute -inset-5 rounded-[2.5rem] bg-[#eb9fae]/[0.06] blur-3xl" />
        <div className="glass-strong gradient-border relative overflow-hidden rounded-[2rem] px-6 py-7 shadow-card sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(240,174,189,.21),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(0deg,rgba(86,31,60,.2),transparent)]" />
          <RoseBloom
            size={90}
            palette="dusk"
            className="pointer-events-none absolute -bottom-7 -right-6 opacity-35"
          />

          <div className="relative flex items-start justify-between gap-5">
            <p className="max-w-[9rem] text-[0.52rem] font-medium uppercase leading-[1.8] tracking-[0.25em] text-[#f0d6b2]/70">
              {card.kicker}
            </p>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f1d3a3]/20 bg-white/[0.03] text-[#f1d2a1]/75">
              <Sparkles size={15} strokeWidth={1.2} />
            </span>
          </div>

          <div className="relative mt-10 sm:mt-12">
            <p className="font-display text-[0.85rem] italic tracking-wide text-white/55">This one is for</p>
            <h3 className="mt-3 font-script text-[clamp(3.2rem,5.2vw,4.6rem)] leading-[1.02] text-[#fff5e5]">
              <span className="block">Grace</span>
              <span className="blush-gold-text block pl-1">Delighty</span>
            </h3>
            <div className="mt-6 h-px w-12 bg-gradient-to-r from-[#edcf9e]/70 to-transparent" />
            <p className="mt-5 text-[0.64rem] font-medium uppercase tracking-[0.3em] text-[#f8e9d4]/82">
              {card.role}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="h-px w-4 bg-[#e8c797]/50" />
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.36em] text-[#eccfa0]">
                {card.company}
              </p>
            </div>
          </div>

          <div className="relative mt-10 border-t border-white/15 pt-6 sm:mt-12">
            <p className="max-w-[18rem] font-display text-[1.3rem] font-light italic leading-snug text-[#fff4e9]/82 sm:text-[1.45rem]">
              “{card.line}”
            </p>
            <div className="mt-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-[#f1c9d3]/75">
                <motion.span
                  animate={{ scale: [1, 1.14, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Heart size={13} fill="currentColor" strokeWidth={0} />
                </motion.span>
                <span className="text-[0.48rem] uppercase tracking-[0.27em]">with all my love</span>
              </div>
              <span className="font-display text-[0.68rem] italic tracking-[0.18em] text-white/36">
                first day
              </span>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

export default function Celebration() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { celebration } = siteConfig
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const sunY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120])
  const floralY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -30])

  return (
    <section
      ref={ref}
      id="celebration"
      className="relative isolate min-h-[100svh] overflow-clip bg-[#070414]"
      aria-labelledby="celebration-title"
    >
      {/* Pre-dawn to sunrise */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#060411_0%,#0b071d_28%,#1c0d2b_54%,#3a172f_76%,#6e3040_91%,#a2555a_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_82%,rgba(255,199,157,.27),transparent_43%),radial-gradient(ellipse_at_28%_75%,rgba(193,92,121,.15),transparent_42%)]" />
      <div className="absolute inset-0 aurora opacity-60" />
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_68%)]">
        <Starfield starCount={130} className="opacity-65" />
      </div>
      <div className="absolute inset-0 bg-dot-grid opacity-[0.08] [mask-image:linear-gradient(to_bottom,transparent,black_30%,transparent_70%)]" />

      {/* The rising sun */}
      <motion.div
        className="pointer-events-none absolute bottom-[-34%] right-[-29%] z-0 aspect-square w-[92vw] max-w-[920px] sm:bottom-[-29%] sm:right-[-20%] lg:bottom-[-25%] lg:right-[-8%] lg:w-[62vw]"
        style={{ y: sunY }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, y: 170, scale: 0.9 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 3.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="absolute inset-[-14%] rounded-full bg-[radial-gradient(circle,rgba(255,224,181,.32)_0%,rgba(246,152,151,.19)_34%,transparent_66%)] blur-3xl" />
          <div className="sun-rays absolute inset-[-30%] opacity-35" />
          <div className="absolute inset-[13%] animate-sun-glow rounded-full bg-[radial-gradient(circle_at_42%_36%,#fff8e8_0%,#ffe3b7_23%,#f6bb9b_47%,#e18e91_66%,rgba(187,83,111,.24)_79%,transparent_80%)] blur-[1px]" />
          <div className="absolute inset-[12%] rounded-full border border-[#ffe9cb]/15" />
        </motion.div>
      </motion.div>

      {/* Distant hills */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[32vh] min-h-[190px] w-full opacity-80"
        viewBox="0 0 1440 380"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 251C150 219 260 254 397 228C535 202 613 130 763 168C902 204 1007 289 1168 255C1280 232 1364 201 1440 217V380H0V251Z" fill="#2a122a" fillOpacity=".72" />
        <path d="M0 306C169 268 291 303 430 290C600 273 699 219 852 256C1010 294 1135 332 1440 280V380H0V306Z" fill="#1a0a20" fillOpacity=".92" />
        <path d="M0 344C235 316 383 344 540 334C751 320 833 286 1051 317C1230 342 1334 338 1440 325V380H0V344Z" fill="#100713" />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[38vh] bg-[linear-gradient(0deg,rgba(6,4,17,.86),rgba(17,8,24,.17),transparent)]" />
      <GoldenDust count={24} seed={52} className="z-[2] opacity-80" />
      <RosePetals count={12} seed={23} className="z-[2] opacity-50" />
      <FloatingHearts count={7} seed={13} className="z-[2] opacity-30" />
      <motion.div
        style={{ y: floralY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[26vh] min-h-[170px]"
      >
        <div className="absolute -bottom-24 left-[-12%] w-[52%] max-w-[560px] opacity-65 sm:left-[-6%] lg:w-[40%]">
          <FloralSpray className="h-auto w-full" />
        </div>
        <div className="absolute -bottom-32 right-[-13%] w-[58%] max-w-[600px] opacity-40 sm:right-[-4%] lg:w-[42%]">
          <FloralSpray flipped className="h-auto w-full" />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1320px] flex-col px-6 pb-14 pt-8 sm:px-10 sm:pt-10 lg:px-14">
        <div className="flex items-center justify-between gap-6">
          <ChapterTag number="01" label="Her moment" />
          <div className="hidden items-center gap-2 text-[#f0d1a3]/45 sm:flex">
            <Sparkle size={9} />
            <span className="text-[0.52rem] uppercase tracking-[0.26em]">for Grace, with pride</span>
          </div>
        </div>

        <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.12fr_.78fr] lg:gap-16 lg:py-20">
          <div className="max-w-[42rem]">
            <motion.div
              className="inline-flex items-center gap-3 rounded-full border border-[#f0d2a5]/20 bg-[#160c23]/35 px-4 py-2 backdrop-blur-md"
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Sparkles size={12} className="text-[#f0d2a5]" strokeWidth={1.4} />
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.29em] text-[#f8e6c9]/85">
                {celebration.eyebrow}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#f2aebf]" />
            </motion.div>

            <h1
              id="celebration-title"
              className="mt-7 font-display text-[clamp(2.5rem,12.2vw,3.2rem)] font-light leading-[0.88] tracking-[-0.035em] text-[#fff8ef] min-[390px]:text-[clamp(3.2rem,7.4vw,6.6rem)]"
            >
              <motion.span
                className="block"
                initial={reduceMotion ? false : { opacity: 0, y: 36, filter: 'blur(8px)' }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 1.2, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {celebration.titleLead}
              </motion.span>
              <motion.span
                className="relative -mt-0.5 block pl-2 sm:mt-1"
                initial={reduceMotion ? false : { opacity: 0, y: 38, filter: 'blur(8px)' }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.35, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="blush-gold-text font-script text-[clamp(4rem,20vw,5rem)] leading-[0.9] tracking-normal min-[390px]:text-[clamp(5rem,10vw,9.5rem)]">
                  Grace
                </span>
                <span className="ml-1 text-[#eda8b8]">!</span>
              </motion.span>
            </h1>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.95, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl border-l border-[#eccd9e]/30 pl-5 sm:mt-8"
            >
              <p className="font-display text-[1.18rem] font-light leading-[1.55] text-[#fff2e2]/88 sm:text-[1.45rem]">
                {celebration.journey}
              </p>
            </motion.div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.95, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[35rem] text-pretty text-[0.87rem] font-light leading-[1.9] text-[#e5d3d2]/68 sm:text-[0.95rem]"
            >
              {celebration.paragraph}
            </motion.p>

            <motion.div
              className="mt-9 flex items-center gap-4 text-[#f1c9d3]/50 sm:mt-11"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.span
                animate={{ scale: [1, 1.16, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart size={15} fill="currentColor" strokeWidth={0} />
              </motion.span>
              <span className="h-px w-16 bg-gradient-to-r from-[#f1c9d3]/35 to-transparent" />
              <span className="font-script text-lg text-[#f7d7c3]/60 sm:text-xl">today, everything begins</span>
            </motion.div>
          </div>

          <div className="mx-auto w-full max-w-[25.5rem] lg:mx-0 lg:justify-self-end">
            <AchievementCard />
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <motion.a
            href="#letter"
            className="group flex items-center gap-3 text-[#f1ddc4]/52 transition-colors hover:text-[#f6e5d0]/85"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.025] transition-colors group-hover:border-[#edcc9e]/30">
              <ArrowDown size={13} strokeWidth={1.4} className="transition-transform duration-500 group-hover:translate-y-0.5" />
            </span>
            <span className="text-[0.55rem] font-medium uppercase tracking-[0.27em]">
              There&apos;s a letter for you
            </span>
          </motion.a>

          <motion.p
            className="hidden font-display text-sm italic tracking-wide text-white/22 sm:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Scroll gently, my love.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
