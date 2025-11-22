import { useEffect, useRef, useState } from 'react'
import { Menu, Download } from 'lucide-react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ activeId }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const indicatorRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!activeId || !indicatorRef.current || !containerRef.current) return
    const idx = links.findIndex(l => l.href === `#${activeId}`)
    if (idx === -1) return
    const items = containerRef.current.querySelectorAll('a[data-nav]')
    const el = items[idx]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const parentRect = containerRef.current.getBoundingClientRect()
    indicatorRef.current.style.width = `${rect.width}px`
    indicatorRef.current.style.transform = `translateX(${rect.left - parentRect.left}px)`
  }, [activeId])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur-xl bg-[#0B1020cc] border-b border-white/10 py-2' : 'bg-transparent py-4'}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] grid place-items-center text-white font-semibold shadow-[0_0_30px_rgba(124,58,237,0.45)]">{{}}</div>
            <span className="text-white/90 font-semibold tracking-wide">{{NAME}}</span>
          </a>

          <nav className="hidden md:block relative">
            <div ref={containerRef} className="flex items-center gap-6 text-sm font-medium">
              {links.map((l) => (
                <a key={l.href} href={l.href} data-nav className={`relative py-2 text-white/70 hover:text-white transition-colors ${`#${activeId}`===l.href ? 'text-white' : ''}`}>
                  {l.label}
                </a>
              ))}
              <span ref={indicatorRef} className="absolute -bottom-1 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] rounded-full transition-transform duration-300 will-change-transform" />
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:inline-flex group relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 hover:border-white/20">
              <span className="relative z-10">Download Resume</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] opacity-0 group-hover:opacity-20 transition-opacity" />
              <Download className="ml-2 h-4 w-4 opacity-70" />
            </a>
            <button className="md:hidden text-white/80" onClick={() => setOpen(v=>!v)} aria-label="Open menu">
              <Menu />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-[#0B1020cc] backdrop-blur-xl p-3">
            <div className="grid gap-2">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
