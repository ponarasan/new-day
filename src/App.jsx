import { useCallback, useEffect, useState } from 'react'
import OpeningExperience from './components/OpeningExperience'
import { ChapterRail, CursorGlow, ScrollProgress } from './components/Chrome'
import Celebration from './sections/Celebration'
import Letter from './sections/Letter'
import SunriseScene from './sections/scenes/SunriseScene'
import PromisesScene from './sections/scenes/PromisesScene'
import Finale from './sections/Finale'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [showOpening, setShowOpening] = useState(true)

  const handleEntered = useCallback(() => {
    setEntered(true)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const handleOpeningFinished = useCallback(() => {
    setShowOpening(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    const shouldLock = showOpening
    document.body.classList.toggle('story-locked', shouldLock)
    return () => document.body.classList.remove('story-locked')
  }, [showOpening])

  return (
    <div className="relative min-h-screen bg-[#060411]">
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
        <OpeningExperience onEntered={handleEntered} onFinished={handleOpeningFinished} />
      )}
    </div>
  )
}
