import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i=0) => ({ opacity: 1, y: 0, transition: { delay: 0.05 * i, duration: 0.6, ease: [0.22,1,0.36,1] } })
}

export function SectionWrapper({ id, title, subtitle, children, index=0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: false })

  return (
    <section id={id} ref={ref} className="relative scroll-mt-24 py-20">
      <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(600px 300px at 10% 0%, #7C3AED11, transparent), radial-gradient(500px 250px at 90% 0%, #22D3EE0f, transparent)'}} />
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <motion.div variants={sectionVariants} initial="hidden" animate={isInView? 'show' : 'hidden'} custom={0} className="mb-10">
            <span className="block text-[11px] tracking-[0.25em] uppercase text-white/50">{title}</span>
            {subtitle && <p className="mt-2 text-white/70 max-w-2xl">{subtitle}</p>}
          </motion.div>
          {children}
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <SectionWrapper id="about" title="ABOUT ME" subtitle="{{ABOUT_TEXT}}">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">
        <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ amount: 0.3, once: false }} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
          <div className="h-40 w-40 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] shadow-[0_0_60px_rgba(34,211,238,0.25)]" />
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {['Y+ experience','Projects shipped','Awards'].map((t,i)=> (
              <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-3 text-white/70">
                <div className="text-xl font-semibold text-white">--</div>
                <div className="text-xs tracking-wide">{t}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ amount: 0.3, once: false }} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 text-white/80 leading-relaxed">
          {{ABOUT_LONG}}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export function Experience() {
  const items = Array.from({length:4}).map((_,i)=>({
    title: `{{JOB_TITLE_${i+1}}}`,
    company: `{{COMPANY_${i+1}}}`,
    dates: `{{DATES_${i+1}}}`,
    bullets: ['{{POINT_1}}','{{POINT_2}}','{{POINT_3}}']
  }))

  return (
    <SectionWrapper id="experience" title="EXPERIENCE" subtitle="Selected roles and impact">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="pl-10 space-y-6">
          {items.map((item,idx)=> (
            <motion.div key={idx} variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ amount: 0.2 }} custom={idx}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white/80">
              <div className="absolute left-3 top-6 h-3 w-3 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] shadow-[0_0_20px_rgba(124,58,237,0.6)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="text-white font-semibold">{item.title} • <span className="text-white/70">{item.company}</span></div>
                <div className="text-xs text-white/50">{item.dates}</div>
              </div>
              <ul className="mt-3 grid gap-2 list-disc ml-5">
                {item.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export function Projects() {
  const projects = Array.from({length:6}).map((_,i)=>({
    title: `{{PROJECT_${i+1}_TITLE}}`,
    desc: `{{PROJECT_${i+1}_DESC}}`,
    stack: ['React','Tailwind','Motion'],
  }))

  return (
    <section id="projects" className="relative py-20">
      <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(700px 350px at 20% 0%, #7C3AED11, transparent), radial-gradient(600px 300px at 90% 10%, #22D3EE14, transparent)'}} />
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-10">
          <span className="block text-[11px] tracking-[0.25em] uppercase text-white/50">PROJECTS</span>
          <p className="mt-2 text-white/70 max-w-2xl">Selected work. Scroll to slide horizontally.</p>
        </div>
      </div>
      <HorizontalGallery items={projects} />
    </section>
  )
}

function HorizontalGallery({ items }) {
  // A simple CSS-based horizontal scroll that engages when in view
  return (
    <div className="relative">
      <div className="sticky top-16 md:top-20 lg:top-24 z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
          <div className="text-sm text-white/70">Scroll horizontally to explore</div>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
        <div className="flex gap-6 px-6 md:px-8 pb-8 w-max">
          {items.map((p, i) => (
            <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{ once:false }} transition={{duration:0.5, delay:i*0.05}}
              className="snap-center min-w-[80vw] sm:min-w-[60vw] lg:min-w-[40vw] xl:min-w-[32vw] rounded-3xl border border-white/10 bg-[#0B1020cc] backdrop-blur-xl p-6 text-white/80 hover:-translate-y-1 transition-transform">
              <div className="h-40 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] mb-4" />
              <div className="text-white font-semibold text-lg">{p.title}</div>
              <div className="text-white/70 mt-1">{p.desc}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((t,idx)=>(<span key={idx} className="px-2 py-1 rounded-full bg-white/10 border border-white/10 text-xs">{t}</span>))}
              </div>
              <div className="mt-4 flex gap-3">
                <a className="px-3 py-2 rounded-full text-xs bg-white/10 border border-white/10 hover:bg-white/15" href="#">View Code</a>
                <a className="px-3 py-2 rounded-full text-xs bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white" href="#">Case Study</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  const groups = [
    { name: 'Programming', items: ['JavaScript','TypeScript','Python','Go','Rust'] },
    { name: 'Frameworks & Tools', items: ['React','Next.js','Tailwind','Node','Vite'] },
    { name: 'Design / UX', items: ['Figma','Prototyping','Motion','Accessibility'] },
    { name: 'Other', items: ['CI/CD','Testing','Analytics'] },
  ]
  return (
    <SectionWrapper id="skills" title="SKILLS" subtitle="A snapshot of my toolkit">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {groups.map((g,gi)=> (
          <motion.div key={gi} variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ amount: 0.2 }} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
            <div className="text-white/80 font-semibold mb-3">{g.name}</div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s,i)=> (
                <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs hover:scale-105 transition-transform">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

export function Education() {
  const items = [
    { title: '{{DEGREE}}', org: '{{INSTITUTION}}', year: '{{YEAR}}' },
    { title: '{{CERT_1}}', org: '{{PLATFORM_1}}', year: '{{YEAR_1}}' },
  ]
  return (
    <SectionWrapper id="education" title="EDUCATION & CERTIFICATIONS" subtitle="Formal education and selected certificates">
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((ed, i)=> (
          <motion.div key={i} variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ amount: 0.2 }} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 text-white/80">
            <div className="flex items-baseline justify-between">
              <div className="text-white font-semibold">{ed.title}</div>
              <div className="text-xs text-white/50">{ed.year}</div>
            </div>
            <div className="text-white/60">{ed.org}</div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

export function Contact() {
  return (
    <SectionWrapper id="contact" title="LET'S WORK TOGETHER" subtitle="Have a project in mind or want to say hi?">
      <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1,y:0}} viewport={{ amount: 0.2 }} className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#0B1020cc] backdrop-blur-xl p-8">
        <form className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/60">Name</label>
              <input className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40" placeholder="Your name" />
            </div>
            <div>
              <label className="text-xs text-white/60">Email</label>
              <input className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/60">Message</label>
            <textarea rows="5" className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Tell me a bit about your project" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-white/60 text-sm">Or reach me at {{EMAIL}} · {{SOCIALS}}</div>
            <button className="group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#22D3EE]">
              <span className="relative z-10">Send Message</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
          </div>
        </form>
      </motion.div>
    </SectionWrapper>
  )
}
