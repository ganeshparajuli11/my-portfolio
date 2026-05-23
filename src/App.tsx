import { useEffect, useRef, useState } from 'react'
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import './App.css'
import {
  EASE,
  fadeUp,
  slideLeft,
  slideRight,
  scaleIn,
  staggerContainer,
  letterReveal,
  expTextContainer,
} from './animations'
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

// One viewport rule, reused: animate once, when ~25% of the block is on screen.
const viewportOnce = { once: true, amount: 0.25 } as const

function App() {
  const heroRef = useRef<HTMLElement>(null)
  const whoamiRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Parallax is kept off for reduced-motion users and on compact (mobile)
  // screens so the small-screen layout stays calm and uncluttered.
  const [isCompact, setIsCompact] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const sync = () => setIsCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const parallaxOff = Boolean(prefersReducedMotion) || isCompact

  // Hero parallax: tracks the hero from the top of the page until it has
  // scrolled away. The photo drifts down the most (slowest layer); the
  // wordmark drifts a little (medium layer); the text content scrolls
  // normally (fastest layer).
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const portraitY = useTransform(
    heroProgress,
    [0, 1],
    parallaxOff ? [0, 0] : [0, 72],
  )
  const wordmarkY = useTransform(
    heroProgress,
    [0, 1],
    parallaxOff ? [0, 0] : [0, 30],
  )
  const heroStageOpacity = useTransform(
    heroProgress,
    [0, 0.55, 1],
    prefersReducedMotion ? [1, 1, 1] : [1, 1, 0.18],
  )

  // Who Am I parallax: the portrait drifts gently upward as the section
  // travels past, so the image and the text read at different speeds.
  const { scrollYProgress: whoamiProgress } = useScroll({
    target: whoamiRef,
    offset: ['start end', 'end start'],
  })
  const whoamiPortraitY = useTransform(
    whoamiProgress,
    [0, 1],
    parallaxOff ? [0, 0] : [0, -78],
  )

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <main>
          {/* ===========================  HERO  =========================== */}
          <section className="hero" id="about" ref={heroRef}>
            <motion.div className="hero-stage" style={{ opacity: heroStageOpacity }}>
              <span className="hero-name">Ganesh Parajuli</span>
              <span className="hero-email">parajuliganesh44@gmail.com</span>

              <motion.img
                className="hero-wordmark"
                src="/portfolio-text.png"
                alt="Portfolio"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
                }
                transition={{ duration: 1, ease: EASE, delay: 0.15 }}
                style={{ y: wordmarkY }}
              />

              <motion.img
                className="hero-portrait"
                src="/portrait-cutout.png"
                alt="Ganesh Parajuli"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
                style={{ x: '-50%', y: portraitY }}
              />

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
            </motion.div>
          </section>

          {/* =========================  WHO AM I  ========================= */}
          <section className="whoami-section" id="whoami" ref={whoamiRef}>
            <motion.div
              className="whoami-stage"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <h2 className="whoami-sr">Who am I</h2>

              <motion.img
                className="whoami-who"
                src="/who.png"
                alt=""
                aria-hidden="true"
                variants={letterReveal(0)}
              />
              <motion.img
                className="whoami-am"
                src="/am.png"
                alt=""
                aria-hidden="true"
                variants={letterReveal(1)}
              />
              <motion.img
                className="whoami-i"
                src="/i.png"
                alt=""
                aria-hidden="true"
                variants={letterReveal(2)}
              />

              <motion.img
                className="whoami-portrait"
                src="/portrait-full.png"
                alt="Ganesh Parajuli"
                variants={slideLeft}
                style={{ y: whoamiPortraitY }}
              />

              <motion.p className="whoami-bio" variants={fadeUp}>
                I am a full-stack product architect who pairs AI-augmented development
                with a deep understanding of software architecture to ship polished
                interfaces at supersonic speeds. As a cybersecurity tutor, I bring an
                adversarial mindset to the design process, ensuring everything I build is
                secure by design. I bridge the gap between rapid execution, intuitive UX,
                and robust defense. Ultimately, I build tools that help teams move at the
                speed of thought without ever breaking the system.
              </motion.p>

              <motion.div className="whoami-stats" variants={staggerContainer}>
                <motion.div
                  className="stat-circle stat-olive"
                  variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3, ease: EASE } }}
                >
                  <span className="stat-value">3<sup>+</sup></span>
                  <span className="stat-label">years in<br />product</span>
                </motion.div>
                <motion.div
                  className="stat-circle stat-muted"
                  variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3, ease: EASE } }}
                >
                  <span className="stat-value">6<sup>+</sup></span>
                  <span className="stat-label">projects<br />built</span>
                </motion.div>
                <motion.div
                  className="stat-circle stat-olive"
                  variants={scaleIn}
                  whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3, ease: EASE } }}
                >
                  <span className="stat-value">3<sup>+</sup></span>
                  <span className="stat-label">teams<br />led</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* ========================  EXPERIENCE  ======================== */}
          <section className="exp-section" id="work">
            <motion.div
              className="exp-stage"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <motion.img
                className="exp-heading"
                src={experienceHeading}
                alt="Experience"
                variants={fadeUp}
              />
              {experiences.slice(0, 2).map((role, idx) => (
                <motion.article
                  key={role.title}
                  className={`exp-card exp-card-${idx + 1}`}
                  variants={idx === 0 ? slideLeft : slideRight}
                  whileHover={{
                    scale: 1.025,
                    y: -8,
                    transition: { duration: 0.3, ease: EASE },
                  }}
                >
                  <img
                    className="exp-blob"
                    src={idx === 0 ? experienceBlobLeft : experienceBlobRight}
                    alt=""
                    aria-hidden="true"
                  />
                  <motion.div className="exp-card-content" variants={expTextContainer}>
                    <motion.div className="exp-card-top" variants={fadeUp}>
                      <span className="exp-num">{String(idx + 1).padStart(2, '0')}</span>
                      <div className="exp-card-info">
                        <strong className="exp-title">{role.title}</strong>
                        <em className="exp-meta">{role.company} · {role.location} / {role.date}</em>
                      </div>
                    </motion.div>
                    <motion.ul className="exp-bullets" variants={fadeUp}>
                      {role.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>
          </section>

          {/* ==========================  SKILLS  ========================== */}
          <section className="skills-section" id="skills">
            <motion.img
              className="skills-reference"
              src={skillsReference}
              alt="Skill overview: frontend, design, mobile, and backend"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            />
          </section>
        </main>
      </div>
    </MotionConfig>
  )
}

export default App
