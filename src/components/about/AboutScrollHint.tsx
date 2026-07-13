import { useEffect, useState } from 'react'
import { useScroll } from '../../context/ScrollContext'

export default function AboutScrollHint() {
  const { currentSection } = useScroll()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (currentSection !== 1) {
      setShow(false)
      return
    }

    const mq = window.matchMedia('(max-width: 768px)')

    const getSection = () => document.querySelector('.about-skills') as HTMLElement | null

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

      const maxScroll = section.scrollHeight - section.clientHeight
      const canScroll = maxScroll > 8
      const nearBottom = section.scrollTop >= maxScroll - 24
      setShow(canScroll && !nearBottom)
    }

    update()

    const section = getSection()
    section?.addEventListener('scroll', update, { passive: true })
    mq.addEventListener('change', update)
    window.addEventListener('resize', update)

    return () => {
      section?.removeEventListener('scroll', update)
      mq.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [currentSection])

  if (!show) return null

  return (
    <div className="about-scroll-hint" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 5v12M12 17l-5-5M12 17l5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
