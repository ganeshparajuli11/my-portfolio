import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const papers = [
  {
    slug: 'predicting-movie-revenue',
    title: 'Predicting Movie Revenue Using Multivariate Big Data Analytics',
    subtitle: 'A Case Study in the Film Industry',
    authors: 'Ganesh Parajuli, Mandip Raut',
    institution: 'Herald College, Kathmandu',
    year: '2024',
    tags: ['Big Data', 'Machine Learning', 'Random Forest', 'Revenue Prediction', 'Film Industry'],
    abstract:
      'The global film industry generates billions in annual box-office revenue, yet accurately forecasting a movie\'s financial performance remains elusive due to the complex interplay of production budgets, audience preferences, and market dynamics. This study applies multivariate big data analytics to a comprehensive dataset of 10,387 films released between 1980 and 2023. Two predictive models—Multiple Linear Regression and Random Forest Regressor—were developed and evaluated. The Random Forest model achieved R² = 0.66, substantially outperforming the linear baseline (R² = 0.50), with production budget, popularity, and vote count identified as the strongest predictors.',
    pdfUrl: '/2331188_Ganesh_Parajuli.pdf',
  },
]

const INTRO_DURATION_MS = 7000

const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReduced(media.matches)
    update()

    if (media.addEventListener) {
      media.addEventListener('change', update)
      return () => media.removeEventListener('change', update)
    }

    media.addListener(update)
    return () => media.removeListener(update)
  }, [])

  return prefersReduced
}

const experiences = [
  {
    title: 'Full Stack Developer / Product Designer',
    company: 'Blynt Tech',
    location: 'Kathmandu',
    date: '2025',
    bullets: [
      'Designed and built HimalayanUltra, a racing trail platform with event listings, registrations, and winner highlights.',
      'Designed and built RaceTiming, a company portfolio website with service discovery and inquiry flows.',
      'Built a Flutter hospital management app for booking appointments, viewing reports, managing medication, and finding nearby hospitals.',
    ],
  },
  {
    title: 'UI/UX Designer -> Team Lead',
    company: 'Void Nepal Pvt Ltd + Codynn',
    location: 'Sukedhara-04, Kathmandu',
    date: 'Jun 2022 - Mar 2025',
    bullets: [
      'Started as a UI/UX designer and progressed into a leadership role managing design and content delivery.',
      'Led teams to ship web and mobile experiences with consistent design systems and clear handoffs.',
      'Directed research, wireframing, prototyping, and usability testing to improve product adoption.',
      'Collaborated with developers and product managers to align user needs with business goals.',
    ],
  },
  {
    title: 'UI/UX Designer',
    company: 'FlipIQ',
    location: 'Kathmandu',
    date: 'Sep 2025 - Dec 2025',
    bullets: [
      'Designed a real-estate software platform connecting buyers, sellers, and agents.',
      'Delivered website flows for uploading listings plus buying and selling properties.',
      'Partnered with the team to align UX with real-estate product requirements.',
    ],
  },
]

const skills = [
  'Full Stack Development',
  'Front-end Engineering',
  'Back-end Integration',
  'Flutter App Development',
  'React & MERN Stack',
  'Node.js & Express',
  'MongoDB & REST APIs',
  'TypeScript & JavaScript',
  'UI/UX Design & Prototyping',
  'Design Systems & Style Guides',
  'Responsive & Accessible Design',
]

const highlights = [
  {
    label: 'Years in Product',
    value: '3+',
  },
  {
    label: 'Teams Led',
    value: '3+',
  },
  {
    label: 'Projects Built',
    value: '6+',
  },
]

function App() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [introDone, setIntroDone] = useState(prefersReducedMotion)
  const trailRef = useRef<HTMLCanvasElement | null>(null)
  const [activePaperSlug, setActivePaperSlug] = useState<string | null>(null)

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash
      const match = hash.match(/^#research\/(.+)$/)
      setActivePaperSlug(match ? match[1] : null)
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const openPaper = (slug: string) => {
    window.location.hash = `research/${slug}`
  }

  const closePaper = () => {
    window.location.hash = 'research'
  }

  const activePaper = papers.find((p) => p.slug === activePaperSlug) ?? null

  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroDone(true)
      return
    }

    if (introDone) return

    const timer = window.setTimeout(() => {
      setIntroDone(true)
    }, INTRO_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [prefersReducedMotion, introDone])

  const introActive = useMemo(
    () => !prefersReducedMotion && !introDone,
    [prefersReducedMotion, introDone],
  )

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const y = window.scrollY
      const root = document.documentElement
      root.style.setProperty('--parallax-strong', `${y * -0.18}px`)
      root.style.setProperty('--parallax-soft', `${y * -0.08}px`)
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.experience-card'))
    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    cards.forEach((card, index) => {
      card.setAttribute('style', `--reveal-delay: ${index * 120}ms`)
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = trailRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let animation = 0
    let lastMove = performance.now()
    const points: {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      hue: number
    }[] = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * window.devicePixelRatio)
      canvas.height = Math.floor(height * window.devicePixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }

    const addPoint = (x: number, y: number) => {
      lastMove = performance.now()
      const hue = (x / width) * 280 + 20
      points.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        life: 1.1,
        hue,
      })
    }

    const onMove = (event: PointerEvent) => {
      addPoint(event.clientX, event.clientY)
      addPoint(event.clientX + (Math.random() - 0.5) * 12, event.clientY + (Math.random() - 0.5) * 12)
    }

    const tick = () => {
      animation = window.requestAnimationFrame(tick)
      ctx.clearRect(0, 0, width, height)
      const idleFor = performance.now() - lastMove
      const idleFactor = idleFor > 700 ? 2 : 0.75

      for (let i = points.length - 1; i >= 0; i -= 1) {
        const p = points[i]
        p.life -= 0.016 * idleFactor
        p.x += p.vx
        p.y += p.vy

        if (p.life <= 0) {
          points.splice(i, 1)
          continue
        }

        const radius = 30 * p.life
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 60%, ${0.22 * p.life})`)
        gradient.addColorStop(0.5, `hsla(${p.hue + 60}, 90%, 55%, ${0.16 * p.life})`)
        gradient.addColorStop(1, `hsla(${p.hue + 140}, 95%, 50%, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    tick()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      if (animation) {
        window.cancelAnimationFrame(animation)
      }
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    if (introActive) {
      html.classList.add('scroll-lock')
      body.classList.add('scroll-lock')
    } else {
      html.classList.remove('scroll-lock')
      body.classList.remove('scroll-lock')
    }

    return () => {
      html.classList.remove('scroll-lock')
      body.classList.remove('scroll-lock')
    }
  }, [introActive])

  const handleSkip = () => {
    setIntroDone(true)
  }

  return (
    <div className={`app ${introActive ? 'intro-active' : 'intro-done'}`}>
      <canvas ref={trailRef} className="cursor-trail" aria-hidden="true" />
      {!prefersReducedMotion && (
        <div className={`intro ${introDone ? 'intro-hidden' : ''}`}>
          <div className="intro-grid" />
          <div className="intro-halo" />
          <div className="intro-frames">
            <div className="intro-card card-1">
              <span>HimalayanUltra</span>
              <strong>Trail race UI</strong>
            </div>
            <div className="intro-card card-2">
              <span>RaceTiming</span>
              <strong>Brand site</strong>
            </div>
            <div className="intro-card card-3">
              <span>Hospital App</span>
              <strong>Flutter</strong>
            </div>
          </div>
          <div className="intro-tech">
            <span>MERN</span>
            <span>React</span>
            <span>Flutter</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>Figma</span>
            <span>TypeScript</span>
            <span>Express</span>
            <span>Firebase</span>
            <span>REST API</span>
            <span>Tailwind</span>
            <span>Postman</span>
          </div>
          <div className="intro-hero">
            <span className="intro-name">Ganesh Parajuli</span>
            <span className="intro-role">Full Stack Developer</span>
          </div>
          {!introDone && (
            <button className="intro-skip" type="button" onClick={handleSkip}>
              Skip intro
            </button>
          )}
        </div>
      )}

      <div className="page">
        <header className="site-header">
          <div className="logo wordmark">Ganesh Parajuli</div>
          <nav className="nav">
            <a href="#work">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
            <a href="#research">Research</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="header-cta" href="mailto:ganeshparajuli2059@gmail.com">
            Let&apos;s talk
          </a>
        </header>

        <div className="parallax-orb orb-1 parallax-soft" />
        <div className="parallax-orb orb-2 parallax-strong" />

        <main>
          <section className="hero" id="top">
            <div className="hero-text parallax-strong">
              <p className="eyebrow">Full Stack Developer - Product Designer</p>
              <h1>
                Ganesh <span>Parajuli</span>
              </h1>
              <p className="lead">
                Full stack developer with a design foundation, building modern web apps, mobile
                products, and user-first platforms.
              </p>
              <div className="hero-actions">
                <a className="primary" href="#work">
                  View experience
                </a>
                <a className="ghost" href="#contact">
                  Contact me
                </a>
              </div>
              <div className="hero-meta">
                <span>Location: Sukedhara-04, Kathmandu</span>
                <span>Phone: 9843047262</span>
                <span>Email: ganeshparajuli2059@gmail.com</span>
              </div>
            </div>
            <div className="hero-panel parallax-soft">
              <div className="hero-image">
                <img src="/profile.jpg" alt="Ganesh Parajuli portrait" />
              </div>
              <h2>Builds that blend UX and code</h2>
              <p>
                I design, prototype, and ship full stack experiences that help teams move faster
                while keeping interfaces polished and easy to use.
              </p>
              <div className="highlights">
                {highlights.map((item) => (
                  <div key={item.label} className="highlight-card">
                    <span className="highlight-value">{item.value}</span>
                    <span className="highlight-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="work">
            <div className="section-heading">
              <h2>Experience</h2>
              <p>Full stack delivery, design leadership, and product execution.</p>
            </div>
            <div className="experience-grid">
              {experiences.map((role) => (
                <article key={role.title + role.company} className="experience-card">
                  <div className="experience-header">
                    <div>
                      <h3>{role.title}</h3>
                      <p>
                        {role.company} - {role.location}
                      </p>
                    </div>
                    <span className="date">{role.date}</span>
                  </div>
                  <ul>
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="skills">
            <div className="section-heading">
              <h2>Skills</h2>
              <p>Tools and methods that shape my workflow.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="section" id="education">
            <div className="section-heading">
              <h2>Education & Training</h2>
              <p>Continuous growth in design and technology.</p>
            </div>
            <div className="two-column">
              <div className="info-card">
                <h3>Bachelor in Computer Science</h3>
                <p>Herald College - Kathmandu</p>
                <span>Nov 2022 - Sep 2025</span>
              </div>
              <div className="info-card">
                <h3>Full Stack Development Training</h3>
                <p>Herald College</p>
                <span>2023</span>
              </div>
              <div className="info-card">
                <h3>UI/UX Training</h3>
                <p>Mindrisers Institute of Technology</p>
                <span>2022</span>
              </div>
            </div>
          </section>

          <section className="section" id="research">
            <div className="section-heading">
              <h2>Research</h2>
              <p>Published work in data science and machine learning.</p>
            </div>
            <div className="research-grid">
              {papers.map((paper) => (
                <article key={paper.slug} className="research-card experience-card">
                  <div className="research-card-header">
                    <div className="research-tags">
                      {paper.tags.map((tag) => (
                        <span key={tag} className="research-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="date">{paper.year}</span>
                  </div>
                  <h3 className="research-title">{paper.title}</h3>
                  <p className="research-subtitle">{paper.subtitle}</p>
                  <p className="research-authors">
                    {paper.authors} · {paper.institution}
                  </p>
                  <p className="research-abstract">{paper.abstract}</p>
                  <button
                    className="research-read-btn"
                    type="button"
                    onClick={() => openPaper(paper.slug)}
                  >
                    Read Paper
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="section contact" id="contact">
            <div>
              <h2>Let&apos;s build something thoughtful.</h2>
              <p>
                Open to full stack roles, product teams, and ambitious projects. I respond quickly
                and enjoy solving real-world workflows.
              </p>
            </div>
            <div className="contact-card">
              <a href="mailto:ganeshparajuli2059@gmail.com">ganeshparajuli2059@gmail.com</a>
              <span>Phone: 9843047262</span>
              <span>Location: Sukedhara-04, Kathmandu</span>
            </div>
          </section>
        </main>

        <footer className="site-footer">Designed and built by Ganesh Parajuli - 2026</footer>
      </div>

      {activePaper && (
        <div className="paper-overlay" role="dialog" aria-modal="true" aria-label={activePaper.title}>
          <div className="paper-overlay-header">
            <div className="paper-overlay-meta">
              <span className="paper-overlay-title">{activePaper.title}</span>
              <span className="paper-overlay-authors">
                {activePaper.authors} · {activePaper.institution} · {activePaper.year}
              </span>
            </div>
            <div className="paper-overlay-actions">
              <a
                className="paper-download-btn"
                href={activePaper.pdfUrl}
                download
                aria-label="Download PDF"
              >
                Download PDF
              </a>
              <button
                className="paper-close-btn"
                type="button"
                onClick={closePaper}
                aria-label="Close paper"
              >
                ✕
              </button>
            </div>
          </div>
          <iframe
            className="paper-iframe"
            src={activePaper.pdfUrl}
            title={activePaper.title}
          />
        </div>
      )}
    </div>
  )
}

export default App
