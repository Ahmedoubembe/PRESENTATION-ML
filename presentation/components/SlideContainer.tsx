'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import SlideNav from './SlideNav'
import Slide01 from '@/slides/01_title'
import Slide02 from '@/slides/02_problem'
import Slide03 from '@/slides/03_scraping'
import Slide04 from '@/slides/04_geo'
import Slide05 from '@/slides/05_eda_inspection'
import Slide06 from '@/slides/06_eda_missing'
import Slide07 from '@/slides/07_eda_outliers'
import Slide08 from '@/slides/08_eda_univariate'
import Slide09 from '@/slides/09_eda_bivariate'
import Slide10 from '@/slides/10_eda_multivariate'
import Slide11 from '@/slides/11_eda_preparation'
import Slide12 from '@/slides/12_feature_engineering'
import Slide13 from '@/slides/13_models'
import Slide15 from '@/slides/15_feature_importance'
import Slide16 from '@/slides/16_webapp'
import Slide17 from '@/slides/17_demo'
import SlideDeployment from '@/slides/deploy_architecture'
import Slide18 from '@/slides/18_conclusion'

const slides = [
  Slide01, Slide02, Slide03, Slide04, Slide05, Slide06,
  Slide07, Slide08, Slide09, Slide10, Slide11, Slide12,
  Slide13, Slide15, Slide16, Slide17, SlideDeployment, Slide18,
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

export default function SlideContainer() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [scale, setScale] = useState(1)

  const TARGET_WIDTH = 1280
  const TARGET_HEIGHT = 720

  const goNext = useCallback(() => {
    if (current < slides.length - 1) {
      setDirection(1)
      setCurrent(c => c + 1)
    }
  }, [current])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent(c => c - 1)
    }
  }, [current])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / TARGET_WIDTH
      const scaleY = window.innerHeight / TARGET_HEIGHT
      setScale(Math.min(scaleX, scaleY))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const CurrentSlide = slides[current]

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 flex items-center justify-center">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 bg-slate-950 overflow-y-auto overflow-x-hidden slide-scroll"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      <SlideNav
        current={current}
        total={slides.length}
        onPrev={goPrev}
        onNext={goNext}
      />

      {/* Keyboard hint (only on first slide) */}
      {current === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 text-slate-500 text-xs flex items-center gap-2"
        >
          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono">→</kbd>
          <span>pour naviguer</span>
        </motion.div>
      )}
    </div>
  )
}
