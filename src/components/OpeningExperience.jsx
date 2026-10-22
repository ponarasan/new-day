import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, MailOpen, Sparkles } from 'lucide-react'
import { siteConfig } from '../config'
import Starfield from './effects/Starfield'
import { FloatingHearts, RosePetals, ShootingStars, Twinkles } from './effects/Atmosphere'
import { FloralSpray } from './Botanicals'
import Moon from './Moon'
import { MagicButton, Sparkle } from './Ui'

const easing = [0.22, 1, 0.36, 1]

function LoveBurst() {
  const hearts = useMemo(() => {
    let seed = 17
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    return Array.from({ length: 24 }, (_, index) => {
      const angle = (Math.PI * 2 * index) / 24 + random() * 0.34
      const distance = 130 + random() * 310
      return {
        id: index,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 30,
        rotate: -90 + random() * 180,
        scale: 0.5 + random() * 1.15,
        duration: 1.1 + random() * 1.3,
        delay: random() * 0.16,
        color: ['#f7b8ca', '#eea0b6', '#edd0a0', '#ffe4e9', '#d887a5'][Math.floor(random() * 5)],
        isStar: index % 4 === 0,
      }
    })
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,239,211,.8),rgba(245,174,194,.3)_35%,transparent_70%)]"
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: 9, opacity: 0 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      />
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute left-1/2 top-1/2"
          style={{ color: heart.color }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }}
          animate={{
            x: heart.x,
            y: heart.y,
            opacity: [0, 0.95, 0.8, 0],
            scale: [0.2, heart.scale, heart.scale * 0.9],
            rotate: heart.rotate,
          }}
          transition={{ duration: heart.duration, delay: heart.delay, ease: 'easeOut' }}
        >
          {heart.isStar ? <Sparkle size={9 + heart.scale * 8} /> : <Heart size={12 + heart.scale * 10} fill="currentColor" strokeWidth={0} />}
        </motion.span>
      ))}
    </div>
  )
}

function CinematicOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#05030d]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(85,46,99,.34),transparent_58%),radial-gradient(ellipse_at_30%_70%,rgba(123,54,79,.2),transparent_45%)]" />
      <Starfield starCount={70} />
      {[0, 1, 2].map((ring) => (
        <motion.span
          key={ring}
          className="absolute h-40 w-40 rounded-full border border-[#efd29f]/20"
          initial={{ scale: 0.35, opacity: 0 }}
          animate={{ scale: 4.5, opacity: [0, 0.55, 0] }}
          transition={{ duration: 2.2, delay: 0.1 + ring * 0.24, ease: 'easeOut' }}
        />
      ))}
      <motion.div
        className="relative z-10 px-8 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.45, ease: easing }}
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#f4d7b1]/20 bg-white/[0.03]">
          <motion.span
            animate={{ scale: [1, 1.16, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[#f6c7d3]"
          >
            <Heart size={21} fill="currentColor" strokeWidth={0} />
          </motion.span>
        </div>
        <p className="font-script text-[2.3rem] leading-none text-[#f4d9c5] sm:text-[3rem]">
          Opening something made for you
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 text-[0.56rem] uppercase tracking-[0.3em] text-[#e7cba4]/55">
          <Sparkle size={8} />
          <span>with all my love</span>
          <Sparkle size={8} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function OpeningExperience({ onEntered, onFinished }) {
  const reduceMotion = useReducedMotion()
  const [entering, setEntering] = useState(false)
  const { opening, recipient, sender } = siteConfig

  useEffect(() => {
    if (!entering) return undefined

    const enterTimer = window.setTimeout(() => onEntered?.(), reduceMotion ? 300 : 1100)
    const finishTimer = window.setTimeout(() => onFinished?.(), reduceMotion ? 650 : 2750)

    return () => {
      window.clearTimeout(enterTimer)
      window.clearTimeout(finishTimer)
    }
  }, [entering, onEntered, onFinished, reduceMotion])

  const handleOpen = () => {
    if (entering) return
    setEntering(true)
  }

  const contentDelay = reduceMotion ? 0 : 0.45

  return (
    <motion.div
      className="no-scrollbar fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#060411]"
      initial={{ opacity: 1 }}
      animate={entering ? { opacity: 0 } : { opacity: 1 }}
      transition={
        entering
          ? { duration: reduceMotion ? 0.3 : 1.15, delay: reduceMotion ? 0.2 : 1.5, ease: 'easeInOut' }
          : { duration: 0.6 }
      }
      aria-label="Opening surprise for Grace Delighty"
    >
      {/* Dreamy night sky */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_18%,rgba(109,65,131,.38),transparent_51%),radial-gradient(ellipse_at_20%_82%,rgba(112,43,73,.28),transparent_48%),linear-gradient(180deg,#060411_0%,#0b071d_46%,#120924_100%)]" />
      <div className="absolute left-[8%] top-[20%] h-[35rem] w-[35rem] rounded-full bg-[#8c538d]/[0.045] blur-[100px]" />
      <Starfield starCount={165} className="opacity-90" />
      <Twinkles count={26} seed={27} className="opacity-80" />
      <ShootingStars count={3} />
      <FloatingHearts count={15} seed={41} opacity={0.33} />
      <RosePetals count={10} seed={8} opacity={0.2} className="hidden sm:block" />

      <Moon className="absolute right-[3%] top-[5%] z-10 w-16 opacity-90 min-[360px]:right-[4%] min-[360px]:top-[6%] min-[360px]:w-20 sm:right-[8%] sm:top-[13%] sm:w-32 lg:right-[10%] lg:top-[14%] lg:w-44" />

      <div className="pointer-events-none absolute -left-16 bottom-[-9rem] z-10 w-[340px] opacity-55 sm:-left-6 sm:bottom-[-7rem] sm:w-[430px] lg:left-[-2%] lg:w-[500px]">
        <FloralSpray className="h-auto w-full" />
      </div>
      <div className="pointer-events-none absolute -right-20 bottom-[-10rem] z-10 hidden w-[360px] opacity-35 sm:block lg:right-[-1%] lg:w-[470px]">
        <FloralSpray flipped className="h-auto w-full" />
      </div>

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-14">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: contentDelay }}
        >
          <span className="h-px w-6 bg-[#eacb9d]/40 sm:w-9" />
          <span className="eyebrow !text-[0.5rem] !tracking-[0.27em] sm:!text-[0.56rem]">
            A little gift · made with love
          </span>
        </motion.div>
        <motion.div
          className="hidden items-center gap-2.5 text-[#eed4b0]/55 min-[360px]:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: contentDelay + 0.2 }}
        >
          <Sparkle size={10} />
          <span className="eyebrow !text-[0.5rem] !tracking-[0.25em] text-[#eed4b0]/55">For Grace</span>
        </motion.div>
      </header>

      <div className="relative z-20 flex min-h-[100svh] flex-col">
        <motion.main
          className="flex flex-1 items-center justify-center px-5 pb-24 pt-28 sm:px-8 sm:pb-20 sm:pt-32"
          animate={
            entering
              ? { opacity: 0, scale: 1.035, filter: 'blur(8px)' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.8, ease: 'easeIn' }}
        >
          <div className="mx-auto w-full max-w-6xl text-center">
            <motion.div
              className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 backdrop-blur-md sm:mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: contentDelay + 0.12, ease: easing }}
            >
              <Sparkles size={11} className="text-[#eacb9d]/80" />
              <span className="text-[0.5rem] font-medium uppercase tracking-[0.27em] text-[#f9eddc]/65 sm:text-[0.56rem]">
                A new chapter begins today
              </span>
              <Sparkles size={11} className="text-[#eacb9d]/80" />
            </motion.div>

            <motion.p
              className="mx-auto max-w-2xl text-balance font-display text-[1.15rem] italic leading-[1.6] text-[#f4e6d9]/75 sm:text-[1.45rem] md:text-[1.65rem]"
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: contentDelay + 0.35, ease: easing }}
            >
              {opening.specialLine}
            </motion.p>

            <div className="relative mt-5 sm:mt-7">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(232,141,168,.16),transparent_70%)] blur-3xl sm:h-64" />
              <h1 className="relative flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 sm:gap-x-6">
                <motion.span
                  className="blush-gold-text font-script text-[clamp(4rem,12vw,9.8rem)] leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,.28)]"
                  initial={reduceMotion ? false : { opacity: 0, y: 42, rotate: -2, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.4, delay: contentDelay + 0.62, ease: easing }}
                  aria-hidden="true"
                >
                  Grace
                </motion.span>
                <motion.span
                  className="blush-gold-text font-script text-[clamp(4rem,12vw,9.8rem)] leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,.28)]"
                  initial={reduceMotion ? false : { opacity: 0, y: 42, rotate: 2, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.4, delay: contentDelay + 0.82, ease: easing }}
                  aria-hidden="true"
                >
                  Delighty
                </motion.span>
                <motion.span
                  className="mb-6 inline-flex text-[#f3aec1] drop-shadow-[0_0_18px_rgba(244,163,187,.55)] sm:mb-10"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 170, damping: 14, delay: contentDelay + 1.05 }}
                  aria-label="Heart"
                >
                  <Heart size={32} fill="currentColor" strokeWidth={0} className="sm:h-11 sm:w-11" />
                </motion.span>
              </h1>
              <span className="sr-only">Grace Delighty ❤️</span>
            </div>

            <motion.div
              className="mx-auto mt-5 flex max-w-2xl items-center gap-4 sm:mt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: contentDelay + 1.15 }}
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e9cc9f]/25" />
              <Sparkle size={10} className="text-[#e9cc9f]/60" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e9cc9f]/25" />
            </motion.div>

            <motion.p
              className="mx-auto mt-5 max-w-xl text-balance font-display text-[1.05rem] font-light leading-relaxed tracking-[0.01em] text-[#fff4e8]/74 sm:text-[1.25rem]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: contentDelay + 1.27, ease: easing }}
            >
              {opening.subtitle}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col items-center sm:mt-10"
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: contentDelay + 1.58, ease: easing }}
            >
              <div className="relative">
                <span className="absolute inset-0 -z-10 rounded-full bg-[#f4bdc9]/35 blur-2xl" />
                <MagicButton onClick={handleOpen} disabled={entering} arrow className="min-h-[3.75rem] px-6 text-[0.64rem] sm:px-10 sm:text-[0.67rem]">
                  <MailOpen size={15} strokeWidth={1.45} />
                  {opening.button}
                </MagicButton>
              </div>
              <motion.p
                className="mt-5 flex items-center gap-2 font-display text-[0.85rem] italic tracking-wide text-white/34"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: contentDelay + 1.9, duration: 1.2 }}
              >
                <span>{opening.footnote}</span>
              </motion.p>
            </motion.div>
          </div>
        </motion.main>

        <footer className="relative z-30 flex items-end justify-between gap-6 px-6 pb-6 sm:px-10 sm:pb-8">
          <motion.div
            className="flex items-center gap-3 text-[#f5e6d5]/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: contentDelay + 1.9 }}
          >
            <span className="h-px w-8 bg-current" />
            <span className="text-[0.48rem] uppercase tracking-[0.27em] sm:text-[0.53rem]">
              First day · Capgemini
            </span>
          </motion.div>
          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: contentDelay + 1.9 }}
          >
            <span className="text-[0.48rem] uppercase tracking-[0.24em] text-[#f5e6d5]/25 sm:text-[0.53rem]">
              made with love, from
            </span>
            <p className="mt-1 font-script text-lg text-[#ebcbb0]/60 sm:text-xl">{sender}</p>
          </motion.div>
        </footer>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-52 bg-gradient-to-t from-[#060411] via-[#060411]/35 to-transparent" />

      <AnimatePresence>{entering && <CinematicOverlay />}</AnimatePresence>
      {entering && <LoveBurst />}

      {entering && (
        <div className="sr-only" role="status">
          Opening your surprise.
        </div>
      )}
    </motion.div>
  )
}
