import { useMemo } from 'react'

const heartColors = ['#f6b8ca', '#e996ad', '#efc7d3', '#f6d9df', '#d87c9d']

function seeded(seed) {
  let value = seed
  return () => {
    value += 0x6d2b79f5
    let t = value
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function HeartShape({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20.7s-7.9-4.96-9.7-10.2C1.1 6.6 3.8 3.2 7.5 3.2c2.3 0 3.8 1.2 4.5 2.8.7-1.6 2.2-2.8 4.5-2.8 3.7 0 6.4 3.4 5.2 7.3C19.9 15.74 12 20.7 12 20.7Z"
        fill={color}
      />
    </svg>
  )
}

export function FloatingHearts({
  count = 12,
  className = '',
  seed = 7,
  opacity = 0.36,
  minSize = 7,
  maxSize = 17,
}) {
  const hearts = useMemo(() => {
    const random = seeded(seed)
    return Array.from({ length: count }, (_, index) => {
      const duration = 14 + random() * 14
      return {
        id: index,
        left: 3 + random() * 94,
        size: minSize + random() * (maxSize - minSize),
        duration,
        delay: -random() * duration,
        drift: -55 + random() * 110,
        opacity: opacity * (0.55 + random() * 0.7),
        color: heartColors[Math.floor(random() * heartColors.length)],
        rotate: -20 + random() * 40,
        blur: random() > 0.68 ? 1.2 : 0,
      }
    })
  }, [count, maxSize, minSize, opacity, seed])

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-float"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            '--duration': `${heart.duration}s`,
            '--delay': `${heart.delay}s`,
            '--drift': `${heart.drift}px`,
            '--opacity': heart.opacity,
            transform: `rotate(${heart.rotate}deg)`,
            filter: heart.blur ? `blur(${heart.blur}px)` : undefined,
          }}
        >
          <HeartShape color={heart.color} />
        </span>
      ))}
    </div>
  )
}

export function RosePetals({ count = 14, className = '', seed = 19, minSize = 6, maxSize = 13, opacity = 0.34 }) {
  const petals = useMemo(() => {
    const random = seeded(seed)
    return Array.from({ length: count }, (_, index) => {
      const duration = 16 + random() * 15
      const width = minSize + random() * (maxSize - minSize)
      return {
        id: index,
        left: -3 + random() * 106,
        width,
        height: width * (1.3 + random() * 0.8),
        duration,
        delay: -random() * duration,
        sway: -90 + random() * 180,
        spin: 180 + random() * 540,
        opacity: opacity * (0.55 + random() * 0.65),
      }
    })
  }, [count, maxSize, minSize, opacity, seed])

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.width}px`,
            height: `${petal.height}px`,
            '--duration': `${petal.duration}s`,
            '--delay': `${petal.delay}s`,
            '--sway': `${petal.sway}px`,
            '--spin': `${petal.spin}deg`,
            '--opacity': petal.opacity,
          }}
        />
      ))}
    </div>
  )
}

export function GoldenDust({ count = 22, className = '', seed = 31 }) {
  const dust = useMemo(() => {
    const random = seeded(seed)
    return Array.from({ length: count }, (_, index) => {
      const duration = 13 + random() * 16
      return {
        id: index,
        left: random() * 100,
        size: 1 + random() * 2.8,
        duration,
        delay: -random() * duration,
        drift: -45 + random() * 90,
        opacity: 0.22 + random() * 0.42,
      }
    })
  }, [count, seed])

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {dust.map((dot) => (
        <span
          key={dot.id}
          className="dust"
          style={{
            left: `${dot.left}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            '--duration': `${dot.duration}s`,
            '--delay': `${dot.delay}s`,
            '--drift': `${dot.drift}px`,
            '--opacity': dot.opacity,
          }}
        />
      ))}
    </div>
  )
}

export function ShootingStars({ className = '', count = 3 }) {
  const stars = useMemo(
    () => [
      { left: '12%', top: '18%', delay: '1s', duration: '11s' },
      { left: '64%', top: '8%', delay: '6s', duration: '14s' },
      { left: '34%', top: '42%', delay: '10s', duration: '17s' },
    ].slice(0, count),
    [count],
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          className="shooting-star"
          style={{
            left: star.left,
            top: star.top,
            '--delay': star.delay,
            '--duration': star.duration,
          }}
        />
      ))}
    </div>
  )
}

export function Twinkles({ className = '', count = 18, seed = 4 }) {
  const sparkles = useMemo(() => {
    const random = seeded(seed)
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      left: random() * 100,
      top: random() * 100,
      size: 2 + random() * 5,
      delay: random() * 6,
      duration: 3 + random() * 5,
      opacity: 0.2 + random() * 0.5,
    }))
  }, [count, seed])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="star-shape absolute animate-twinkle bg-[#ffe8c2]"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
