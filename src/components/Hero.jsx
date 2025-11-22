import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  const controls = useAnimation()
  const containerRef = useRef(null)

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }))
  }, [controls])

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[100svh] grid lg:grid-cols-2 items-center gap-10 pt-28 lg:pt-32">
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute inset-0" style={{background: 'radial-gradient(1200px 600px at 10% -10%, #7C3AED22, transparent), radial-gradient(800px 400px at 110% 10%, #22D3EE22, transparent)'}} />
      </div>

      <div className="relative z-10 px-6 md:px-8">
        <motion.span custom={0} animate={controls} initial={{opacity:0,y:20}} className="inline-block text-xs tracking-[0.2em] uppercase text-[#22D3EE] mb-4">{{ROLE_HEADLINE}}</motion.span>
        <motion.h1 custom={1} animate={controls} initial={{opacity:0,y:20}} className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white">
          {{NAME}}
        </motion.h1>
        <motion.p custom={2} animate={controls} initial={{opacity:0,y:20}} className="mt-6 text-lg text-white/70 max-w-xl">
          {{SHORT_INTRO}}
        </motion.p>
        <motion.div custom={3} animate={controls} initial={{opacity:0,y:20}} className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className="group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] shadow-[0_0_40px_rgba(124,58,237,0.35)]">
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
          </a>
          <a href="#contact" className="rounded-full px-6 py-3 text-sm font-semibold text-white/90 border border-white/15 hover:border-white/30 bg-white/5 backdrop-blur">
            View Resume
          </a>
        </motion.div>
      </div>

      <div className="relative h-[55vh] sm:h-[60vh] lg:h-[80vh] px-0 lg:px-6">
        <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_10px_60px_rgba(2,6,23,0.6)]">
          <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </section>
  )
}
