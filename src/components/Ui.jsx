import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Heart, Sparkles } from 'lucide-react'

export function Sparkle({ className = '', size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M16 0C16.8 9.5 22.5 15.2 32 16C22.5 16.8 16.8 22.5 16 32C15.2 22.5 9.5 16.8 0 16C9.5 15.2 15.2 9.5 16 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ChapterTag({ number, label, align = 'left', light = false }) {
  return (
    <div
      className={`flex items-center gap-3.5 ${
        align === 'center' ? 'justify-center' : 'justify-start'
      }`}
    >
      <span
        className={`font-display text-2xl italic leading-none ${
          light ? 'text-[#8a5263]' : 'text-[#e7c99a]'
        }`}
      >
        {number}
      </span>
      <span
        className={`h-px w-8 ${
          light ? 'bg-[#9d6a70]/35' : 'bg-gradient-to-r from-[#e8ca9c]/60 to-transparent'
        }`}
      />
      <span className={light ? 'eyebrow !text-[#875d65]' : 'eyebrow'}>{label}</span>
    </div>
  )
}

export function MagicButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  arrow = false,
  disabled = false,
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={reduceMotion ? undefined : { scale: 1.025, y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.975 }}
      transition={{ type: 'spring', stiffness: 420, damping: 25 }}
      className={`btn-shine group relative inline-flex min-h-[3.4rem] items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.19em] transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 ${
        variant === 'primary'
          ? 'magic-button bg-[linear-gradient(112deg,#ffecd0_0%,#f8c1cd_48%,#eac890_100%)]'
          : 'ghost-button'
      } ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2.5 whitespace-nowrap">{children}</span>
      {arrow && (
        <ArrowUpRight
          size={15}
          strokeWidth={1.6}
          className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </motion.button>
  )
}

export function FadeUp({ children, className = '', delay = 0, y = 26, amount = 0.25 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function WordReveal({ text, className = '', delay = 0, once = true }) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  return (
    <motion.span
      className={`inline ${className}`}
      initial={reduceMotion ? undefined : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
      }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '112%', opacity: 0.2 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function ScrollCue({ label = 'Begin the story', href = '#celebration' }) {
  const reduceMotion = useReducedMotion()
  return (
    <a
      href={href}
      className="group inline-flex flex-col items-center gap-3 text-white/40 transition-colors hover:text-white/75"
    >
      <span className="text-[0.56rem] font-medium uppercase tracking-[0.29em]">{label}</span>
      <motion.span
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] backdrop-blur"
        animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={13} strokeWidth={1.5} />
      </motion.span>
    </a>
  )
}

export function TinyHeart({ className = '' }) {
  return <Heart size={12} fill="currentColor" strokeWidth={0} className={className} aria-hidden="true" />
}

export function OrnamentLine({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#e9cda3]/30 to-[#e9cda3]/60" />
      <Sparkles size={12} strokeWidth={1.2} className="text-[#e9cda3]/70" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#e9cda3]/30 to-[#e9cda3]/60" />
    </div>
  )
}
