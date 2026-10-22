import { useEffect, useRef } from 'react'

/**
 * A quiet little galaxy. Canvas keeps the stars crisp and the animation light.
 */
export default function Starfield({
  className = '',
  starCount = 120,
  maxShootingStars = 2,
  warm = false,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let lastTime = 0
    let nextShoot = 2400 + Math.random() * 4200
    const stars = []
    const shootingStars = []

    const palette = warm
      ? ['255, 244, 225', '255, 224, 183', '251, 195, 205', '234, 210, 255']
      : ['255, 255, 255', '213, 228, 255', '255, 222, 199', '240, 203, 255']

    function makeStar() {
      const depth = Math.random()
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.35 + depth * (width < 640 ? 1.1 : 1.55),
        alpha: 0.18 + Math.random() * 0.68,
        phase: Math.random() * Math.PI * 2,
        speed: 0.00035 + Math.random() * 0.0012,
        drift: (Math.random() - 0.5) * 0.005,
        color: palette[Math.floor(Math.random() * palette.length)],
      }
    }

    function build() {
      stars.length = 0
      const autoCount = Math.max(
        36,
        Math.min(starCount, Math.round((width * height) / 8800)),
      )
      for (let i = 0; i < autoCount; i += 1) stars.push(makeStar())
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height)
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${star.color}, ${star.alpha})`
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function spawnShootingStar() {
      if (shootingStars.length >= maxShootingStars) return
      shootingStars.push({
        x: width * (0.08 + Math.random() * 0.5),
        y: height * (0.06 + Math.random() * 0.32),
        vx: 150 + Math.random() * 150,
        vy: 60 + Math.random() * 75,
        life: 0,
        maxLife: 680 + Math.random() * 320,
        length: 40 + Math.random() * 70,
      })
    }

    function draw(now) {
      ctx.clearRect(0, 0, width, height)
      const time = now || 0

      stars.forEach((star) => {
        const flicker = 0.52 + Math.sin(time * star.speed + star.phase) * 0.48
        const alpha = star.alpha * (0.55 + flicker * 0.65)
        const y = (star.y + time * star.drift) % height
        const x = star.x
        ctx.beginPath()
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`
        ctx.arc(x, y < 0 ? y + height : y, star.radius, 0, Math.PI * 2)
        ctx.fill()

        if (star.radius > 1.25) {
          const halo = ctx.createRadialGradient(x, y, 0, x, y, star.radius * 5)
          halo.addColorStop(0, `rgba(${star.color}, ${alpha * 0.18})`)
          halo.addColorStop(1, `rgba(${star.color}, 0)`)
          ctx.fillStyle = halo
          ctx.beginPath()
          ctx.arc(x, y, star.radius * 5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      if (!reduceMotion) {
        if (time > nextShoot) {
          spawnShootingStar()
          nextShoot = time + 5000 + Math.random() * 8000
        }

        for (let i = shootingStars.length - 1; i >= 0; i -= 1) {
          const star = shootingStars[i]
          star.life += 16
          star.x += star.vx * 0.016
          star.y += star.vy * 0.016
          star.vx *= 0.998
          star.vy *= 0.998
          const progress = star.life / star.maxLife
          const alpha = Math.sin(Math.min(1, progress) * Math.PI) * 0.72

          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - star.length,
            star.y - star.length * 0.42,
          )
          gradient.addColorStop(0, `rgba(255, 248, 236, ${alpha})`)
          gradient.addColorStop(1, 'rgba(255, 248, 236, 0)')
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(star.x - star.length, star.y - star.length * 0.42)
          ctx.stroke()

          ctx.fillStyle = `rgba(255, 251, 245, ${alpha})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, 1.2, 0, Math.PI * 2)
          ctx.fill()

          if (star.life >= star.maxLife) shootingStars.splice(i, 1)
        }
      }

      if (!reduceMotion) frame = window.requestAnimationFrame(draw)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    if (reduceMotion) {
      drawStatic()
    } else {
      frame = window.requestAnimationFrame((time) => {
        lastTime = time
        draw(time)
      })
    }

    return () => {
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
    }
  }, [maxShootingStars, starCount, warm])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
