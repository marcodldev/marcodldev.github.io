import Section from '../Section'
import ProjectGallery from '../projects/ProjectGallery'
import MobileScrollHint from '../ui/MobileScrollHint'
import { useScroll } from '../../context/ScrollContext'

export default function Projects() {
  const { currentSection } = useScroll()

  return (
    <Section number="03" index={2} className="projects">
      <div className={`projects-inner ${currentSection === 2 ? 'is-active' : ''}`}>
        <span className="vhs-label">▶ TAPE_03 · PROJECTS</span>
        <h2 className="section-title section-title--serif projects-title">PROJECTS</h2>
        <ProjectGallery />
      </div>
      <MobileScrollHint sectionIndex={2} sectionSelector=".projects" />
    </Section>
  )
}
