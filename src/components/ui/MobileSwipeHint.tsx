import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useScroll } from '../../context/ScrollContext'

interface MobileSwipeHintProps {
  sectionIndex: number
  nextSectionIndex: number
  sectionSelector: string
}

function isAtSectionBottom(section: HTMLElement) {
  const maxScroll = section.scrollHeight - section.clientHeight
  if (maxScroll <= 8) return true
  return section.scrollTop >= maxScroll - 24
}

export default function MobileSwipeHint({
  sectionIndex,
  nextSectionIndex,
  sectionSelector,
}: MobileSwipeHintProps) {
  const { currentSection, goToSection } = useScroll()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (currentSection !== sectionIndex) {
      setShow(false)
      return
    }

    const mq = window.matchMedia('(max-width: 768px)')

    const getSection = () => document.querySelector(sectionSelector) as HTMLElement | null

    const update = () => {
      if (!mq.matches) {
        setShow(false)
        return
      }

      const section = getSection()
      if (!section) {
        setShow(false)
        return
      }

      setShow(isAtSectionBottom(section))
    }

    update()
    const timers = [0, 120, 400].map((delay) => window.setTimeout(update, delay))
    const raf = requestAnimationFrame(update)

    const section = getSection()
    section?.addEventListener('scroll', update, { passive: true })
    mq.addEventListener('change', update)
    window.addEventListener('resize', update)

    const resizeObserver =
      section && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(update)
        : null
    if (section && resizeObserver) resizeObserver.observe(section)

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      section?.removeEventListener('scroll', update)
      mq.removeEventListener('change', update)
      window.removeEventListener('resize', update)
      resizeObserver?.disconnect()
    }
  }, [currentSection, sectionIndex, sectionSelector])

  if (!show) return null

  return createPortal(
    <button
      type="button"
      className="mobile-swipe-hint"
      aria-label="Vai alla sezione successiva"
      onClick={() => goToSection(nextSectionIndex)}
    >
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 12h12M17 12l-5-5M17 12l-5 5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>,
    document.body,
  )
}
