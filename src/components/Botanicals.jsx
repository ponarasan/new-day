import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const palettes = {
  blush: { light: '#f8c8ce', mid: '#d77a93', deep: '#8e3453', gold: '#f1d4a7' },
  rose: { light: '#f3b3c3', mid: '#c86282', deep: '#762943', gold: '#e9c897' },
  cream: { light: '#fff0d8', mid: '#ecc79f', deep: '#b67a72', gold: '#f6dca8' },
  dusk: { light: '#d9b6dd', mid: '#976994', deep: '#55345e', gold: '#d7bd8b' },
}

function RosePetal({ rotation, scale = 1, fill, stroke, opacity = 0.94 }) {
  return (
    <path
      d="M0 2 C-22 -1 -42 -18 -44 -40 C-46 -65 -27 -81 -4 -84 C19 -87 42 -70 44 -46 C46 -22 27 -3 0 2Z"
      fill={fill}
      stroke={stroke}
      strokeWidth="0.65"
      opacity={opacity}
      transform={`rotate(${rotation}) scale(${scale})`}
    />
  )
}

export function RoseBloom({ size = 130, palette = 'blush', className = '', open = true, centered = false }) {
  const uid = useId().replace(/:/g, '')
  const colors = palettes[palette] || palettes.blush
  const reduceMotion = useReducedMotion()

  return (
    <svg
      viewBox="-100 -100 200 200"
      width={size}
      height={size}
      x={centered ? -size / 2 : undefined}
      y={centered ? -size / 2 : undefined}
      aria-hidden="true"
      className={`overflow-visible ${className}`}
      style={{ filter: 'drop-shadow(0 12px 28px rgba(34, 8, 31, 0.26))' }}
    >
      <defs>
        <radialGradient id={`rose-outer-${uid}`} cx="40%" cy="28%" r="72%">
          <stop offset="0%" stopColor={colors.light} />
          <stop offset="45%" stopColor={colors.mid} />
          <stop offset="100%" stopColor={colors.deep} />
        </radialGradient>
        <radialGradient id={`rose-inner-${uid}`} cx="38%" cy="24%" r="75%">
          <stop offset="0%" stopColor="#ffe1df" />
          <stop offset="34%" stopColor={colors.light} />
          <stop offset="100%" stopColor={colors.mid} />
        </radialGradient>
        <radialGradient id={`rose-center-${uid}`} cx="45%" cy="38%" r="64%">
          <stop offset="0%" stopColor={colors.gold} />
          <stop offset="55%" stopColor={colors.mid} />
          <stop offset="100%" stopColor={colors.deep} />
        </radialGradient>
      </defs>

      <motion.g
        initial={reduceMotion || !open ? false : { scale: 0.78, rotate: -7, opacity: 0 }}
        whileInView={reduceMotion || !open ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        style={{ transformOrigin: '0px 0px' }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
          <RosePetal
            key={`outer-${rotation}`}
            rotation={rotation}
            scale={index % 2 === 0 ? 1 : 0.92}
            fill={`url(#rose-outer-${uid})`}
            stroke="rgba(255, 226, 218, 0.18)"
          />
        ))}
        {[18, 80, 142, 204, 266, 328].map((rotation, index) => (
          <RosePetal
            key={`inner-${rotation}`}
            rotation={rotation}
            scale={0.64 + index * 0.016}
            fill={`url(#rose-inner-${uid})`}
            stroke="rgba(255, 235, 226, 0.2)"
            opacity={0.94}
          />
        ))}
        {[40, 105, 170, 235, 300].map((rotation, index) => (
          <RosePetal
            key={`core-${rotation}`}
            rotation={rotation}
            scale={0.37 + index * 0.012}
            fill={`url(#rose-center-${uid})`}
            stroke="rgba(255, 238, 226, 0.22)"
            opacity={0.96}
          />
        ))}

        <path
          d="M-2 1 C-14 -5 -15 -18 -5 -23 C6 -29 17 -20 14 -10 C12 -2 4 3 -2 1Z"
          fill={colors.deep}
          opacity="0.48"
          stroke="rgba(255, 230, 221, 0.26)"
          strokeWidth="0.8"
        />
        <path
          d="M-6 -2 C-13 -9 -8 -18 1 -18 C11 -18 16 -10 11 -4 C7 1 -1 2 -6 -2Z"
          fill={colors.light}
          opacity="0.42"
          stroke="rgba(255, 242, 231, 0.4)"
          strokeWidth="0.6"
        />
        <path
          d="M-6 -28 C8 -38 24 -30 27 -17 C30 -5 18 2 8 0"
          fill="none"
          stroke="rgba(255, 235, 225, 0.27)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="18" cy="-54" r="2.2" fill={colors.gold} opacity="0.38" />
      </motion.g>
    </svg>
  )
}

function Leaf({ d, fill = '#4d394d', opacity = 0.52 }) {
  return <path d={d} fill={fill} opacity={opacity} />
}

/**
 * An elegant, hand-drawn rose spray for the edges of the experience.
 * All light, no stock imagery.
 */
export function FloralSpray({ className = '', flipped = false, muted = false }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 480 500"
      fill="none"
      aria-hidden="true"
      className={`overflow-visible ${className}`}
      style={{ transform: flipped ? 'scaleX(-1)' : undefined }}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="floral-stem" x1="200" y1="500" x2="250" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor={muted ? '#5d4654' : '#83616e'} stopOpacity="0.25" />
          <stop offset=".56" stopColor={muted ? '#89646c' : '#b48a83'} stopOpacity="0.6" />
          <stop offset="1" stopColor={muted ? '#af8b85' : '#e4b8a2'} stopOpacity="0.62" />
        </linearGradient>
        <linearGradient id="floral-leaf" x1="200" y1="400" x2="300" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3c273d" stopOpacity="0.5" />
          <stop offset="1" stopColor="#75535f" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id="floral-haze">
          <stop stopColor="#d7859c" stopOpacity="0.2" />
          <stop offset="1" stopColor="#d7859c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="250" cy="250" rx="220" ry="230" fill="url(#floral-haze)" />
      <path
        d="M260 500C266 423 267 362 260 303C253 242 224 206 192 166"
        stroke="url(#floral-stem)"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M260 353C317 322 355 276 371 220"
        stroke="url(#floral-stem)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M255 411C204 393 161 362 139 320"
        stroke="url(#floral-stem)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M263 450C311 432 349 394 368 344"
        stroke="url(#floral-stem)"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity=".8"
      />
      <path
        d="M259 292C240 272 223 238 224 211"
        stroke="url(#floral-stem)"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity=".7"
      />

      <Leaf d="M256 433C228 415 207 386 212 354C244 363 267 389 273 414C270 425 264 431 256 433Z" fill="url(#floral-leaf)" opacity=".88" />
      <Leaf d="M263 389C295 370 319 342 319 312C286 319 266 340 254 364C254 375 258 383 263 389Z" fill="url(#floral-leaf)" opacity=".68" />
      <Leaf d="M255 333C222 316 204 289 211 260C241 270 259 297 265 319C262 328 259 332 255 333Z" fill="url(#floral-leaf)" opacity=".64" />
      <Leaf d="M269 359C300 346 333 314 341 279C310 288 282 310 268 333C265 344 266 353 269 359Z" fill="url(#floral-leaf)" opacity=".5" />
      <Leaf d="M255 438C288 431 320 403 331 373C301 377 275 394 258 415C255 423 254 432 255 438Z" fill="url(#floral-leaf)" opacity=".45" />

      <motion.g
        animate={reduceMotion ? undefined : { rotate: [0, 1.4, 0, -1.2, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '260px 330px' }}
      >
        <g transform="translate(192 167) scale(.96)">
          <RoseBloom size={172} palette="rose" open={false} centered />
        </g>
        <g transform="translate(377 214) scale(.7) rotate(12)">
          <RoseBloom size={150} palette="blush" open={false} centered />
        </g>
        <g transform="translate(136 322) scale(.54) rotate(-16)">
          <RoseBloom size={120} palette="cream" open={false} centered />
        </g>
        <g transform="translate(369 347) scale(.42) rotate(8)">
          <RoseBloom size={104} palette="dusk" open={false} centered />
        </g>
      </motion.g>

      <g fill="#ecd0a2" opacity=".5">
        <circle cx="302" cy="212" r="2.6" />
        <circle cx="157" cy="245" r="1.7" />
        <circle cx="367" cy="287" r="1.9" />
        <circle cx="219" cy="113" r="1.4" />
      </g>

      <path
        d="M343 247C361 236 379 238 392 251"
        stroke="#e8c994"
        strokeOpacity=".24"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M124 356C108 347 88 348 73 357"
        stroke="#e8c994"
        strokeOpacity=".2"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

export function GardenRow({ className = '', seed = 0 }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`} aria-hidden="true">
      <div className="relative mx-auto h-[230px] w-full max-w-[1500px] sm:h-[290px]">
        <div className="absolute -bottom-12 left-[-4%] w-[48%] max-w-[390px] opacity-90 sm:left-[1%]">
          <FloralSpray muted className="h-auto w-full" />
        </div>
        <div className="absolute -bottom-10 right-[-5%] w-[46%] max-w-[380px] opacity-75 sm:right-[1%]">
          <FloralSpray flipped muted className="h-auto w-full" />
        </div>
        <div className="absolute bottom-0 left-[24%] hidden w-24 opacity-50 lg:block">
          <RoseBloom size={110} palette="cream" />
        </div>
        <div className="absolute bottom-7 right-[26%] hidden w-20 opacity-40 xl:block">
          <RoseBloom size={95} palette="rose" />
        </div>
      </div>
    </div>
  )
}

export function FloralDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8c99b]/35 sm:w-20" />
      <svg width="54" height="28" viewBox="0 0 54 28" fill="none">
        <path d="M27 21C20 15 14 15 10 19C7 22 8 26 12 26C17 26 19 20 27 13C35 20 37 26 42 26C46 26 47 22 44 19C40 15 34 15 27 21Z" stroke="#e9ca9c" strokeOpacity=".5" strokeWidth=".8" />
        <circle cx="27" cy="10" r="1.8" fill="#f1d6a8" fillOpacity=".7" />
        <path d="M27 6V1M32 10H37M22 10H17" stroke="#e9ca9c" strokeOpacity=".35" strokeWidth=".8" strokeLinecap="round" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8c99b]/35 sm:w-20" />
    </div>
  )
}
