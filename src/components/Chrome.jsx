import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }} />
}

export function CursorGlow() {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reduceMotion) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    const handleMove = (event) => {
      x.set(event.clientX - 272)
      y.set(event.clientY - 272)
      if (!visible) setVisible(true)
    }
    const handleLeave = () => setVisible(false)

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [reduceMotion, visible, x, y])

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-glow hidden md:block"
      style={{ x, y, opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.5 } }}
    />
  )
}

const chapters = [
  { id: 'celebration', label: 'Her moment' },
  { id: 'letter', label: 'My letter' },
  { id: 'new-beginning', label: 'The journey' },
  { id: 'promises', label: 'Our promises' },
  { id: 'forever', label: 'Always' },
]

export function ChapterRail() {
  const [active, setActive] = useState('celebration')

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.05, 0.2, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Story chapters"
      className="fixed right-6 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-5 xl:flex"
    >
      {chapters.map((chapter, index) => {
        const isActive = active === chapter.id
        return (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-label={chapter.label}
            aria-current={isActive ? 'location' : undefined}
            className="group flex items-center gap-3.5 py-1"
          >
            <span
              className={`hidden translate-x-1 text-[0.53rem] font-medium uppercase tracking-[0.24em] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-70 2xl:inline ${
                isActive ? '!translate-x-0 !opacity-100 !text-[#f1d6ad]' : 'text-white'
              }`}
            >
              {chapter.label}
            </span>
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span
                className={`absolute rounded-full transition-all duration-500 ${
                  isActive
                    ? 'h-5 w-5 border border-[#e8c797]/40'
                    : 'h-2.5 w-2.5 border border-white/20 group-hover:border-[#e8c797]/50'
                }`}
              />
              <span
                className={`rounded-full transition-all duration-500 ${
                  isActive
                    ? 'h-1.5 w-1.5 bg-[#f1d4a6] shadow-[0_0_12px_rgba(241,212,166,.8)]'
                    : 'h-1 w-1 bg-white/35 group-hover:bg-[#f1d4a6]'
                }`}
              />
            </span>
            <span className="w-4 font-display text-[0.66rem] italic text-white/25">
              {String(index + 1).padStart(2, '0')}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
