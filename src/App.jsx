import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useMouseMotion, useIsTouch, useLenis, useSiteReducedMotion } from './lib/hooks.js'
import GridBackground from './components/GridBackground.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import StatusBar from './components/StatusBar.jsx'
import Marquee from './components/Marquee.jsx'
import Intro from './sections/Intro.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import Services from './sections/Services.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  const reduced = useSiteReducedMotion()
  const isTouch = useIsTouch()
  const mouse = useMouseMotion()
  const scrollTo = useLenis(!reduced)
  const [bootDone, setBootDone] = useState(false)

  const nav = (sel) => scrollTo(sel)

  return (
    <>
      <GridBackground mouse={mouse} reduced={reduced} spotlight={!isTouch} />
      {!isTouch && !reduced && <CustomCursor mouse={mouse} />}

      <AnimatePresence>
        {!bootDone && <LoadingScreen key="loader" onDone={() => setBootDone(true)} reduced={reduced} />}
      </AnimatePresence>

      <main className="relative">
        <Intro bootDone={bootDone} nav={nav} reduced={reduced} />
        <About />
        <Marquee reduced={reduced} />
        <Projects reduced={reduced} />
        <Services />
        <Contact nav={nav} reduced={reduced} />
      </main>

      <StatusBar />
    </>
  )
}
