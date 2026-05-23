import type { Variants } from 'framer-motion'

/*
 * Reusable scroll-animation variants for the portfolio.
 *
 * These pair with Framer Motion's `whileInView` so each section reveals
 * itself as it scrolls into view. Durations sit in the 0.6s–1.2s range
 * with a soft easeOut-style cubic-bezier, matching the calm, organic feel
 * of the existing green / cream design.
 *
 * Reduced-motion is handled globally by <MotionConfig reducedMotion="user">
 * in App.tsx, which strips transform/scale animations and keeps a plain
 * opacity fade for users who ask for less motion.
 */

// Soft easeOut curve used across every reveal.
export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

/** Fade in while rising gently from below. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

/** Plain opacity fade, no movement. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

/** Enter from the left with a slight fade. */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -70 },
  show: { opacity: 1, x: 0, transition: { duration: 0.95, ease: EASE } },
}

/** Enter from the right with a slight fade. */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 70 },
  show: { opacity: 1, x: 0, transition: { duration: 0.95, ease: EASE } },
}

/** Pop gently into place: small upward motion plus a subtle scale. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

/** Parent orchestrator: reveals its children one after another. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.12 } },
}

/**
 * Hand-lettered "who / am / i" pieces: fade + gentle scale on entry, then a
 * slow, never-ending float so the lettering keeps the playful organic feel.
 * The `index` offsets each piece's float so they drift out of sync.
 */
export const letterReveal = (index: number): Variants => ({
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    y: [0, -8, 0],
    transition: {
      opacity: { duration: 0.7, ease: EASE },
      scale: { duration: 0.7, ease: EASE },
      y: {
        duration: 6 + index * 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.7,
      },
    },
  },
})

/**
 * Experience card inner content: holds its children back until the blob
 * card itself has floated into place, then fades the text in as a block.
 */
export const expTextContainer: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.45, staggerChildren: 0.16 } },
}
