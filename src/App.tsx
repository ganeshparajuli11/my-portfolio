import { useEffect, useRef } from 'react'
import './App.css'
import skillsReference from './assets/Desktop - 17.png'
import experienceHeading from './assets/Group 17.png'
import experienceBlobLeft from './assets/Rectangle 1.png'
import experienceBlobRight from './assets/Rectangle 2.png'

const experiences = [
  {
    title: 'Full Stack Developer / Product Designer',
    company: 'Blynt Tech',
    location: 'Kathmandu',
    date: 'Jun 2025 - Mar 2026',
    bullets: [
      'Designed and built HimalayanUltra, a racing trail platform with event listings, registrations, and winner highlights.',
      'Designed and built RaceTiming, a company portfolio website with service discovery and inquiry flows.',
      'Built a Flutter hospital management app for booking appointments, viewing reports, managing medication, and finding nearby hospitals.',
    ],
  },
  {
    title: 'UI/UX Designer -> Team Lead',
    company: 'Void Nepal Pvt Ltd · Codynn',
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

function App() {
  const sectionObserverRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.section-animate'))
    if (!sections.length) return

    sectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            sectionObserverRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 },
    )

    sections.forEach((section) => sectionObserverRef.current?.observe(section))

    return () => sectionObserverRef.current?.disconnect()
  }, [])

  return (
    <div className="app">
      <main>
        <section className="hero" id="about">
          <div className="hero-stage">
            <span className="hero-name">Ganesh Parajuli</span>
            <span className="hero-email">parajuliganesh44@gmail.com</span>

            <img className="hero-wordmark" src="/portfolio-text.png" alt="Portfolio" />

            <img className="hero-portrait" src="/portrait-cutout.png" alt="Ganesh Parajuli" />

            <div className="hero-social">
              <a href="https://www.instagram.com/ganeshparajuli44" target="_blank" rel="noreferrer">
                <svg className="hero-ig" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>ganeshparajuli44</span>
              </a>
              <a href="https://www.linkedin.com/in/ganesh-parajuli" target="_blank" rel="noreferrer">
                <svg className="hero-ln" viewBox="0 32 448 448" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                  />
                </svg>
                <span>Ganesh Parajuli</span>
              </a>
            </div>

            <span className="hero-role">Full Stack Developer · Product Designer</span>
          </div>
        </section>

        {/* Who am I */}
        <section className="whoami-section section-animate" id="whoami">
          <div className="whoami-stage">
            <h2 className="whoami-sr">Who am I</h2>

            <img className="whoami-who" src="/who.png" alt="" aria-hidden="true" />
            <img className="whoami-am" src="/am.png" alt="" aria-hidden="true" />
            <img className="whoami-i" src="/i.png" alt="" aria-hidden="true" />

            <img className="whoami-portrait" src="/portrait-full.png" alt="Ganesh Parajuli" />

            <p className="whoami-bio">
              I am a full-stack product architect who pairs AI-augmented development
              with a deep understanding of software architecture to ship polished
              interfaces at supersonic speeds. As a cybersecurity tutor, I bring an
              adversarial mindset to the design process, ensuring everything I build is
              secure by design. I bridge the gap between rapid execution, intuitive UX,
              and robust defense. Ultimately, I build tools that help teams move at the
              speed of thought without ever breaking the system.
            </p>

            <div className="whoami-stats">
              <div className="stat-circle stat-olive">
                <span className="stat-value">3<sup>+</sup></span>
                <span className="stat-label">years in<br />product</span>
              </div>
              <div className="stat-circle stat-muted">
                <span className="stat-value">6<sup>+</sup></span>
                <span className="stat-label">projects<br />built</span>
              </div>
              <div className="stat-circle stat-olive">
                <span className="stat-value">3<sup>+</sup></span>
                <span className="stat-label">teams<br />led</span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="exp-section section-animate" id="work">
          <div className="exp-stage">
            <img className="exp-heading" src={experienceHeading} alt="Experience" />
            {experiences.slice(0, 2).map((role, idx) => (
              <article key={role.title} className={`exp-card exp-card-${idx + 1}`}>
                <img
                  className="exp-blob"
                  src={idx === 0 ? experienceBlobLeft : experienceBlobRight}
                  alt=""
                  aria-hidden="true"
                />
                <div className="exp-card-content">
                  <div className="exp-card-top">
                    <span className="exp-num">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="exp-card-info">
                      <strong className="exp-title">{role.title}</strong>
                      <em className="exp-meta">{role.company} · {role.location} / {role.date}</em>
                    </div>
                  </div>
                  <ul className="exp-bullets">
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section section-animate" id="skills">
          <img className="skills-reference" src={skillsReference} alt="Skill overview: frontend, design, mobile, and backend" />
        </section>
      </main>
    </div>
  )
}

export default App
