import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Sun, Moon, Menu, X } from 'lucide-react'
import Scene from './Scene'

const links = [
  { label: 'github', href: 'https://github.com/sagthemenace25' },
  { label: 'linkedin', href: 'https://www.linkedin.com/' },
  { label: 'instagram', href: 'https://www.instagram.com/' },
]

function ThemeToggle({ theme, setTheme }) {
  return <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle colour theme">
    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
  </button>
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('shreya-theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('shreya-theme', theme)
  }, [theme])

  const closeMenu = () => setMenuOpen(false)

  return <main>
    <nav className="nav">
      <a className="wordmark" href="#home">shreya<span>.exe</span></a>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {['about', 'projects', 'offscreen', 'timeline', 'contact'].map(item => <a key={item} href={`#${item}`} onClick={closeMenu}>{item}</a>)}
      </div>
      <div className="nav-actions">
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </nav>

    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> SOMEWHERE ON THE INTERNET · 2026</p>
        <h1>hi, i'm<br /><em>shreya.</em></h1>
        <p className="hero-sub">A human with too many tabs open<br />and a suspicious number of side quests.</p>
        <a className="text-link" href="#about">GET TO KNOW ME <ArrowDown size={15} /></a>
      </div>
      <Scene />
      <div className="hero-note"><span>FIG. 001</span><span>AN OBJECT WITH NO PARTICULAR PURPOSE</span></div>
      <div className="hero-index">01 <i /> 07</div>
    </section>

    <section className="intro section" id="about">
      <div className="section-kicker">01 / A BIT ABOUT ME</div>
      <div className="intro-content">
        <h2>Curious by default.<br /><span>Distractible by design.</span></h2>
        <div className="intro-text">
          <p>Hey! I'm Shreya. I like figuring out how things work, making things on the internet, and occasionally getting very invested in a completely unrelated new interest.</p>
          <p>This is my little corner to collect the things I'm building, learning, making, and doing when I'm supposed to be doing something else.</p>
          <p className="muted">More actual-human details coming soon. This website is a work in progress, much like the person writing it.</p>
        </div>
      </div>
    </section>

    <section className="projects section" id="projects">
      <div className="section-kicker">02 / THINGS I'VE MADE</div>
      <div className="section-heading"><h2>Some things<br /><span>escaped my drafts.</span></h2><p>A small collection of projects, experiments<br />and ideas that made it out of my notes app.</p></div>
      <div className="project-grid">
        <article className="project-card featured"><div className="project-art art-one"><span className="art-orbit orbit-a" /><span className="art-orbit orbit-b" /><span className="art-core" /></div><div className="project-meta"><span>01 — IN PROGRESS</span><span>CYBERSECURITY / AI</span></div><h3>Betonus</h3><p>An early-stage idea exploring AI-assisted security operations. More soon.</p><span className="coming-soon">CASE STUDY COMING SOON ↗</span></article>
        <article className="project-card"><div className="project-art art-two"><span className="window-card">hello,<br /><b>internet.</b><i>✳</i></span></div><div className="project-meta"><span>02 — THIS SITE</span><span>CREATIVE CODE</span></div><h3>shreya.exe</h3><p>My intended digital footprint ig. A website that refuses to sit still.</p><span className="coming-soon">YOU ARE HERE ↗</span></article>
      </div>
      <p className="placeholder-note">More projects will appear here as they become real things. No fictional startup case studies, promise.</p>
    </section>

    <section className="offscreen section" id="offscreen">
      <div className="section-kicker">03 / OUTSIDE THE TABS</div>
      <div className="offscreen-layout"><h2>Plot twists<br /><span>happen offline too.</span></h2><div className="hobby-list">
        <div><span>01</span><h3>Sketching</h3><p>Making a mess on paper, but intentionally.</p></div>
        <div><span>02</span><h3>Guitar</h3><p>Learning strings, chords, and patience.</p></div>
        <div><span>03</span><h3>MUNs</h3><p>Formal debates. Informal panic. Great experience.</p></div>
      </div></div>
      <div className="photo-placeholder"><div className="photo-symbol">✳</div><p>THE PHOTO DUMP GOES HERE</p><span>Sketches, guitar moments, MUN chaos & other evidence of life.</span></div>
    </section>

    <section className="timeline section" id="timeline">
      <div className="section-kicker">04 / THE LORE SO FAR</div>
      <div className="timeline-layout">
        <h2>A work<br /><span>in progress.</span></h2>
        <div className="timeline-list">
          <article><span>NOW</span><div><h3>Learning by building</h3><p>Exploring cybersecurity, creative code, and the many things that happen between an idea and a working project.</p></div></article>
          <article><span>ONGOING</span><div><h3>Collecting side quests</h3><p>Sketching, guitar, MUNs, and whatever curiosity decides to throw into the mix.</p></div></article>
          <p className="placeholder-note">The proper timeline — education, experiences and milestones — will go here once the details are confirmed.</p>
        </div>
      </div>
    </section>

    <section className="currently section">
      <div className="section-kicker">05 / CURRENTLY</div>
      <h2>Open tabs<br /><span>in my brain.</span></h2>
      <div className="currently-grid"><div><small>LEARNING</small><p>Cybersecurity, code, and how to make 3D things do cool stuff.</p></div><div><small>EXPLORING</small><p>New ideas, new tools, and whatever rabbit hole appears next.</p></div><div><small>STATUS</small><p><span className="status-dot" /> Building things. Probably overthinking one.</p></div></div>
    </section>

    <footer className="footer section" id="contact">
      <div className="section-kicker">06 / FIND ME ELSEWHERE</div>
      <h2>the internet<br /><span>is a small place.</span></h2>
      <div className="footer-bottom"><p>Have a project, a question, or a very niche recommendation?</p><div className="socials">{links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={14} /></a>)}</div><span className="copyright">© 2026 SHREYA · MADE WITH TOO MANY TABS OPEN</span></div>
    </footer>
  </main>
}