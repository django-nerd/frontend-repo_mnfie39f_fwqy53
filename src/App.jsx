import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { About, Experience, Projects, Skills, Education, Contact } from './components/Sections'

function useActiveSection(ids) {
  const [active, setActive] = useState('hero')
  useEffect(() => {
    const observers = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{ if (e.isIntersecting) setActive(id) })
      }, { threshold: 0.4 })
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o=>o.disconnect())
  }, [ids])
  return active
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight)
      setProgress(scrolled)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <div className="h-1 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE]" style={{ width: `${progress*100}%` }} />
    </div>
  )
}

function App() {
  const active = useActiveSection(['hero','about','experience','projects','skills','education','contact'])

  useEffect(() => {
    const handleLink = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
    document.addEventListener('click', handleLink)
    return () => document.removeEventListener('click', handleLink)
  }, [])

  return (
    <div className="min-h-screen bg-[#050714] text-white selection:bg-[#7C3AED]/40 selection:text-white">
      <ScrollProgress />
      <Navbar activeId={active} />

      <main className="relative">
        <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(1000px 500px at -10% -10%, #7C3AED14, transparent), radial-gradient(800px 400px at 110% -10%, #22D3EE14, transparent)'}} />
        <div className="relative mx-auto max-w-[1600px]">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
          <footer className="py-12 text-center text-white/50">© {new Date().getFullYear()} {{NAME}} — Crafted with care.</footer>
        </div>
      </main>
    </div>
  )
}

export default App
