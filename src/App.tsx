import { useEffect, useRef, useState } from 'react'
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
      "The global film industry generates billions in annual box-office revenue, yet accurately forecasting a movie's financial performance remains elusive due to the complex interplay of production budgets, audience preferences, and market dynamics. This study applies multivariate big data analytics to a comprehensive dataset of 10,387 films released between 1980 and 2023. Two predictive models—Multiple Linear Regression and Random Forest Regressor—were developed and evaluated. The Random Forest model achieved R² = 0.66, substantially outperforming the linear baseline (R² = 0.50), with production budget, popularity, and vote count identified as the strongest predictors.",
    pdfUrl: '/2331188_Ganesh_Parajuli.pdf',
  },
]

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
    title: 'UI/UX Designer → Team Lead',
    company: 'Void Nepal Pvt Ltd + Codynn',
    location: 'Sukedhara-04, Kathmandu',
    date: 'Jun 2022 – Mar 2025',
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
    date: 'Sep 2025 – Dec 2025',
    bullets: [
      'Designed a real-estate software platform connecting buyers, sellers, and agents.',
      'Delivered website flows for uploading listings plus buying and selling properties.',
      'Partnered with the team to align UX with real-estate product requirements.',
    ],
  },
]

const skillGroups = [
  {
    category: 'Frontend',
    skills: ['TypeScript & JavaScript', 'React & MERN Stack', 'Front-end Engineering', 'Responsive & Accessible Design'],
  },
  {
    category: 'Backend',
    skills: ['Node.js & Express', 'MongoDB & REST APIs', 'Back-end Integration'],
  },
  {
    category: 'Mobile',
    skills: ['Flutter App Development'],
  },
  {
    category: 'Design',
    skills: ['UI/UX Design & Prototyping', 'Design Systems & Style Guides', 'Full Stack Development'],
  },
]

const highlights = [
  { label: 'Years in Product', value: '3+' },
  { label: 'Teams Led', value: '3+' },
  { label: 'Projects Built', value: '6+' },
]

function App() {
  const [activePaperSlug, setActivePaperSlug] = useState<string | null>(null)
  const revealRef = useRef<IntersectionObserver | null>(null)

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
    const cards = Array.from(document.querySelectorAll('.reveal-card'))
    if (!cards.length) return

    revealRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    cards.forEach((card, index) => {
      card.setAttribute('style', `--reveal-delay: ${index * 80}ms`)
      revealRef.current?.observe(card)
    })

    return () => revealRef.current?.disconnect()
  }, [])

  return (
    <div className="app">
      <div className="page">
        <header className="site-header">
          <div className="logo wordmark">Ganesh Parajuli</div>
          <nav className="nav">
            <a href="#research">Research</a>
            <a href="#work">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="header-cta" href="mailto:ganeshparajuli2059@gmail.com">
            Let&apos;s talk
          </a>
        </header>

        <main>
          {/* ── Hero ── */}
          <section className="hero" id="top">
            <div className="hero-text">
              <p className="eyebrow">Full Stack Developer · Product Designer</p>
              <h1>
                Ganesh <span className="accent">Parajuli</span>
              </h1>
              <p className="lead">
                Full stack developer with a design foundation, building modern web apps, mobile
                products, and user-first platforms.
              </p>
              <div className="hero-actions">
                <a className="btn-primary" href="#work">
                  View experience
                </a>
                <a className="btn-ghost" href="#contact">
                  Contact me
                </a>
              </div>
              <div className="hero-meta">
                <span>📍 Sukedhara-04, Kathmandu</span>
                <span>📞 9843047262</span>
                <span>✉️ ganeshparajuli2059@gmail.com</span>
              </div>
            </div>

            <div className="hero-panel">
              <div className="hero-image">
                <img src="/profile.jpg" alt="Ganesh Parajuli" />
              </div>
              <h2 className="hero-panel-heading">Builds that blend UX and code</h2>
              <p className="hero-panel-body">
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

          {/* ── Research ── */}
          <section className="section" id="research">
            <div className="section-heading">
              <div>
                <span className="section-tag">Published Work</span>
                <h2>Research</h2>
              </div>
              <p>Applied data science and machine learning in the film industry.</p>
            </div>
            <div className="research-grid">
              {papers.map((paper) => (
                <article key={paper.slug} className="research-card reveal-card">
                  <div className="research-card-top">
                    <div className="research-tags">
                      {paper.tags.map((tag) => (
                        <span key={tag} className="research-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="research-year">{paper.year}</span>
                  </div>
                  <h3 className="research-title">{paper.title}</h3>
                  <p className="research-subtitle">{paper.subtitle}</p>
                  <p className="research-authors">
                    {paper.authors} &middot; {paper.institution}
                  </p>
                  <p className="research-abstract">{paper.abstract}</p>
                  <button
                    className="btn-primary research-read-btn"
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

          {/* ── Experience ── */}
          <section className="section" id="work">
            <div className="section-heading">
              <div>
                <span className="section-tag">Career</span>
                <h2>Experience</h2>
              </div>
              <p>Full stack delivery, design leadership, and product execution.</p>
            </div>
            <div className="experience-grid">
              {experiences.map((role) => (
                <article key={role.title + role.company} className="experience-card reveal-card">
                  <div className="experience-header">
                    <div>
                      <h3>{role.title}</h3>
                      <p className="experience-company">
                        {role.company} &middot; {role.location}
                      </p>
                    </div>
                    <span className="date-badge">{role.date}</span>
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

          {/* ── Skills ── */}
          <section className="section section-alt" id="skills">
            <div className="section-heading">
              <div>
                <span className="section-tag">Expertise</span>
                <h2>Skills</h2>
              </div>
              <p>Tools and methods that shape my workflow.</p>
            </div>
            <div className="skills-section">
              {skillGroups.map((group) => (
                <div key={group.category} className="skill-group reveal-card">
                  <h4 className="skill-category">{group.category}</h4>
                  <div className="skill-pills">
                    {group.skills.map((skill) => (
                      <span key={skill} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Education ── */}
          <section className="section" id="education">
            <div className="section-heading">
              <div>
                <span className="section-tag">Background</span>
                <h2>Education &amp; Training</h2>
              </div>
              <p>Continuous growth in design and technology.</p>
            </div>
            <div className="two-column">
              <div className="info-card reveal-card">
                <span className="info-card-tag">Degree</span>
                <h3>Bachelor in Computer Science</h3>
                <p>Herald College · Kathmandu</p>
                <span className="info-card-date">Nov 2022 – Sep 2025</span>
              </div>
              <div className="info-card reveal-card">
                <span className="info-card-tag">Training</span>
                <h3>Full Stack Development</h3>
                <p>Herald College</p>
                <span className="info-card-date">2023</span>
              </div>
              <div className="info-card reveal-card">
                <span className="info-card-tag">Training</span>
                <h3>UI/UX Design</h3>
                <p>Mindrisers Institute of Technology</p>
                <span className="info-card-date">2022</span>
              </div>
            </div>
          </section>

          {/* ── Contact ── */}
          <section className="section contact-section" id="contact">
            <div className="contact-inner">
              <div>
                <span className="section-tag">Get in touch</span>
                <h2>Let&apos;s build something thoughtful.</h2>
                <p>
                  Open to full stack roles, product teams, and ambitious projects. I respond quickly
                  and enjoy solving real-world workflows.
                </p>
              </div>
              <div className="contact-card">
                <a href="mailto:ganeshparajuli2059@gmail.com" className="contact-link">
                  ganeshparajuli2059@gmail.com
                </a>
                <span>Phone: 9843047262</span>
                <span>Location: Sukedhara-04, Kathmandu</span>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <span>Designed &amp; built by Ganesh Parajuli · 2026</span>
        </footer>
      </div>

      {/* ── Research Paper Overlay ── */}
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
              <a className="paper-download-btn" href={activePaper.pdfUrl} download>
                Download PDF
              </a>
              <button className="paper-close-btn" type="button" onClick={closePaper} aria-label="Close">
                ✕
              </button>
            </div>
          </div>
          <iframe className="paper-iframe" src={activePaper.pdfUrl} title={activePaper.title} />
        </div>
      )}
    </div>
  )
}

export default App
