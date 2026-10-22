import { motion, useReducedMotion } from 'framer-motion'
import { Sparkle } from './Ui'

export default function Moon({ className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute inset-[-55%] rounded-full bg-[radial-gradient(circle,rgba(255,231,197,0.19)_0%,rgba(231,169,173,0.08)_35%,transparent_68%)] blur-2xl" />
      <div className="absolute inset-[-13%] rounded-full border border-[#f6e0c1]/10" />
      <motion.div
        className="relative aspect-square w-full overflow-hidden rounded-full bg-[radial-gradient(circle_at_33%_27%,#fff9ea_0%,#f8e7cc_28%,#e5c5a5_57%,#b78982_100%)] shadow-[0_0_90px_rgba(255,226,188,0.25),inset_-22px_-18px_45px_rgba(103,58,74,0.3)]"
        animate={reduceMotion ? undefined : { y: [0, -9, 0], rotate: [0, 1.2, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="absolute left-[22%] top-[23%] h-[12%] w-[14%] rounded-full bg-[#d9b59d]/30 blur-[1px]" />
        <span className="absolute left-[53%] top-[42%] h-[18%] w-[20%] rounded-full bg-[#d0aa98]/25 blur-[1.5px]" />
        <span className="absolute left-[37%] top-[65%] h-[9%] w-[11%] rounded-full bg-[#d5aea0]/25 blur-[1px]" />
        <span className="absolute left-[65%] top-[20%] h-[7%] w-[9%] rounded-full bg-[#d5aea0]/20 blur-[1px]" />
        <span className="absolute left-[15%] top-[56%] h-[6%] w-[8%] rounded-full bg-[#d8b39e]/20 blur-[1px]" />
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_72%_72%,rgba(75,45,62,0.35),transparent_48%)] mix-blend-multiply" />
        <span className="absolute inset-0 rounded-full border border-white/20" />
      </motion.div>
      <motion.span
        className="absolute -right-[28%] top-[6%] text-[#f5ddb5]/60"
        animate={reduceMotion ? undefined : { opacity: [0.25, 0.8, 0.25], scale: [0.85, 1.08, 0.85] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkle size={15} />
      </motion.span>
      <span className="absolute -left-[16%] bottom-[18%] text-[#f5ddb5]/35">
        <Sparkle size={8} />
      </span>
    </div>
  )
}
