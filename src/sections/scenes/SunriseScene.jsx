import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { siteConfig } from '../../config'
import Starfield from '../../components/effects/Starfield'
import { FloatingHearts, GoldenDust, RosePetals } from '../../components/effects/Atmosphere'
import { FloralSpray, RoseBloom } from '../../components/Botanicals'
import { ChapterTag, Sparkle } from '../../components/Ui'

export default function SunriseScene() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const scene = siteConfig.scenes.newBeginning
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const archY = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section
      ref={sectionRef}
      id="new-beginning"
      className="relative isolate overflow-clip bg-[#080513] py-24 sm:py-32 lg:py-36"
      aria-labelledby="new-beginning-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_37%,rgba(139,65,80,.18),transparent_40%),radial-gradient(ellipse_at_8%_72%,rgba(93,53,125,.16),transparent_45%),linear-gradient(180deg,#080512_0%,#0f081c_44%,#0a0614_100%)]" />
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_65%)]">
        <Starfield starCount={95} className="opacity-45" />
      </div>
      <RosePetals count={9} seed={63} opacity={0.22} />
      <GoldenDust count={14} seed={88} className="opacity-35" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <ChapterTag number={scene.chapter} label={scene.kicker} />
          <div className="flex items-center gap-2 text-[#edcf9f]/35">
            <Sparkle size={8} />
            <span className="text-[0.48rem] uppercase tracking-[0.3em]">the journey · part one</span>
          </div>
        </div>

        <div className="mt-14 grid items-center gap-16 sm:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="max-w-[34rem]">
            <motion.h2
              id="new-beginning-title"
              className="font-display text-[clamp(3.1rem,7vw,5.8rem)] font-light leading-[0.88] tracking-[-0.035em] text-[#fff7eb]"
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              A new
              <br />
              <span className="blush-gold-text font-script text-[1.18em] leading-[0.8]">beginning.</span>
            </motion.h2>

            <motion.div
              className="mt-8 border-l border-[#edcf9f]/30 pl-5 sm:mt-10 sm:pl-7"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="max-w-[27rem] font-display text-[1.5rem] font-light italic leading-[1.45] text-[#f9ebdb]/85 sm:text-[1.75rem]">
                “{scene.quote}”
              </p>
            </motion.div>

            <motion.p
              className="mt-7 max-w-[27rem] text-[0.9rem] font-light leading-[1.9] text-[#cdc0c5]/58 sm:text-[0.98rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {scene.supporting}
            </motion.p>

            <motion.div
              className="mt-9 flex items-center gap-3 text-[#edcf9f]/58"
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.55 }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#edcf9f]/20 bg-white/[0.025]">
                <Sparkles size={13} strokeWidth={1.3} />
              </span>
              <span className="font-script text-xl text-[#f1d5b8]/60">for every morning after this one</span>
            </motion.div>
          </div>

          <motion.div style={{ y: archY }} className="relative mx-auto w-full max-w-[32rem] lg:mr-0">
            <div className="absolute -inset-8 rounded-[50%] bg-[radial-gradient(ellipse,rgba(244,174,152,.14),transparent_66%)] blur-2xl" />
            <div className="absolute inset-x-8 -top-4 h-24 rounded-full border border-[#edcf9f]/[0.08]" />
            <motion.div
              className="group relative overflow-hidden rounded-t-[999px] rounded-b-[1.8rem] border border-[#f0d6b0]/25 bg-[#130a1e] shadow-[0_40px_110px_rgba(2,0,8,.48)]"
              initial={reduceMotion ? false : { opacity: 0, y: 55, scale: 0.97 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[4/4.7] lg:aspect-[4/5.25]">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d0821_0%,#221033_32%,#652840_62%,#ce796f_83%,#f4bc8c_100%)] transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_75%,rgba(255,212,164,.37),transparent_48%)]" />
                <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_55%)] opacity-70">
                  <Starfield starCount={58} warm />
                </div>

                <motion.div
                  className="absolute left-1/2 top-[45%] h-[42%] w-[65%] -translate-x-1/2 rounded-full"
                  initial={reduceMotion ? false : { opacity: 0, y: 150 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 3.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute inset-[-45%] rounded-full bg-[radial-gradient(circle,rgba(255,218,161,.38),rgba(246,148,131,.14)_44%,transparent_68%)] blur-2xl" />
                  <div className="sun-rays absolute inset-[-115%] opacity-20" />
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_42%_35%,#fff8e9_0%,#ffe0ac_26%,#f5b88e_52%,#db7b7d_78%,rgba(180,72,89,.3)_100%)] animate-sun-glow" />
                  <div className="absolute inset-0 rounded-full border border-[#fff4db]/20" />
                </motion.div>

                <div className="absolute inset-x-0 bottom-[12%] h-[37%] bg-[linear-gradient(0deg,rgba(44,14,38,.78),transparent)]" />
                <svg className="absolute inset-x-0 bottom-[20%] w-full" viewBox="0 0 600 180" fill="none" aria-hidden="true">
                  <path d="M-40 156C71 116 127 144 214 122C304 99 362 35 441 83C508 124 562 135 640 111V200H-40V156Z" fill="#672c49" fillOpacity=".54" />
                  <path d="M-20 174C91 147 176 168 278 156C402 141 465 98 566 131C608 145 642 145 655 140V200H-20V174Z" fill="#37182f" fillOpacity=".88" />
                </svg>

                <div className="pointer-events-none absolute -bottom-8 left-[-17%] w-[72%] opacity-90">
                  <FloralSpray muted className="h-auto w-full" />
                </div>
                <div className="pointer-events-none absolute -bottom-10 right-[-18%] w-[62%] opacity-65">
                  <FloralSpray muted flipped className="h-auto w-full" />
                </div>
                <div className="absolute bottom-[4%] left-[17%] opacity-85">
                  <RoseBloom size={88} palette="cream" />
                </div>
                <div className="absolute bottom-[15%] right-[16%] opacity-55">
                  <RoseBloom size={64} palette="rose" />
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,3,12,.12),transparent_30%,transparent_65%,rgba(10,3,12,.38))]" />
                <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,.25)_0.5px,transparent_0.5px)] [background-size:8px_8px]" />

                <div className="absolute inset-x-0 top-[7%] flex justify-center">
                  <span className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0a0617]/20 px-4 py-2 text-[0.47rem] uppercase tracking-[0.27em] text-white/50 backdrop-blur-md">
                    <Sparkle size={8} />
                    the first light of a new chapter
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="mt-6 flex items-center justify-between gap-4 px-3">
              <p className="font-display text-[0.88rem] italic tracking-wide text-white/48">
                “Every sunrise is proof that endings can be beautiful.”
              </p>
              <Sparkles size={13} className="shrink-0 text-[#edcf9f]/40" strokeWidth={1.2} />
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex items-center justify-center">
          <a
            href="#promises"
            className="group flex flex-col items-center gap-2.5 text-[#f0d7bb]/50 transition-colors hover:text-[#f0d7bb]/85"
          >
            <span className="text-[0.48rem] uppercase tracking-[0.28em]">look up at the stars, my love</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] transition-colors group-hover:border-[#edcf9f]/25">
              <ArrowDown size={13} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
