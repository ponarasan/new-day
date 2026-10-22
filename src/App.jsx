import { useCallback, useEffect, useRef, useState } from 'react'
import OpeningExperience from './components/OpeningExperience'
import { ChapterRail, CursorGlow, ScrollProgress } from './components/Chrome'
import Celebration from './sections/Celebration'
import Letter from './sections/Letter'
import SunriseScene from './sections/scenes/SunriseScene'
import PromisesScene from './sections/scenes/PromisesScene'
import Finale from './sections/Finale'
import { Volume2, VolumeX } from 'lucide-react'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [showOpening, setShowOpening] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  const startMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.45
    const playPromise = audio.play()
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => setMusicPlaying(true))
        .catch(() => setMusicPlaying(false))
    } else {
      setMusicPlaying(true)
    }
  }, [])

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      startMusic()
    } else {
      audio.pause()
      setMusicPlaying(false)
    }
  }, [startMusic])

  const handleEntered = useCallback(() => {
    setEntered(true)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const handleOpeningFinished = useCallback(() => {
    setShowOpening(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const handleOpen = useCallback(() => {
    startMusic()
  }, [startMusic])

  useEffect(() => {
    const shouldLock = showOpening
    document.body.classList.toggle('story-locked', shouldLock)
    return () => document.body.classList.remove('story-locked')
  }, [showOpening])

  return (
    <div className="relative min-h-screen bg-[#060411]">
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

      <div className="film-vignette" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <CursorGlow />

      {entered && (
        <>
          <ScrollProgress />
          <ChapterRail />
          <main inert={showOpening ? '' : undefined}>
            <Celebration />
            <Letter />
            <SunriseScene />
            <PromisesScene />
            <Finale />
          </main>
        </>
      )}

      {showOpening && (
        <OpeningExperience onEntered={handleEntered} onFinished={handleOpeningFinished} onMusicStart={handleOpen} />
      )}

      {entered && !showOpening && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={musicPlaying ? 'Mute background music' : 'Play background music'}
          className="fixed bottom-5 right-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-[#f4e6d9]/80 backdrop-blur-md transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#eacb9d]/40"
        >
          {musicPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      )}
    </div>
  )
}