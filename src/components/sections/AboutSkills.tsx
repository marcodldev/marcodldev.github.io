import Section from '../Section'
import SkillsRibbon from '../skills/SkillsRibbon'
import VhsTimeline from '../about/VhsTimeline'
import MobileScrollHint from '../ui/MobileScrollHint'
import MobileSwipeHint from '../ui/MobileSwipeHint'
import { useScroll } from '../../context/ScrollContext'

export default function AboutSkills() {
  const { currentSection } = useScroll()
  const isActive = currentSection === 1

  return (
    <Section number="02" index={1} className="about-skills">
      <div className={`about-skills-inner ${isActive ? 'is-active' : ''}`}>
        <div className="about-skills-main">
          <div className="about-content">
            <span className="vhs-label">▶ TAPE_02 · ABOUT</span>
            <h2 className="section-title section-title--serif">CHI SONO</h2>
            <p className="section-desc">
              Sono un Full Stack Developer palermitano. Tutto è partito da Boolean (2022–2023):
              lì ho studiato HTML, CSS, JavaScript, Vue, PHP, Laravel e MySQL — il primo
              passo serio nello sviluppo web. A Generation Italy ho consolidato Java con un
              percorso da Junior Java Developer, lavorando su logica backend e codice in team.
              Frequento il corso di Laurea in Informatica all&apos;Università di Palermo e
              lavoro in CAT S.r.l. su software gestionali in PHP e PostgreSQL, moduli Odoo
              e integrazioni tra sistemi. Uso l&apos;AI come leva operativa — non come slogan —
              per analizzare, scrivere e rifinire codice con più velocità e meno rumore.
            </p>
          </div>

          <VhsTimeline />

          <div className="about-creative">
            <span className="vhs-label">▶ CREATIVE SIDE</span>
            <h2 className="section-title section-title--serif">OLTRE IL CODICE</h2>
            <p className="section-desc about-creative-desc">
              Oltre allo sviluppo software sono un appassionato di design visivo, animazioni
              e video editing. Ho iniziato con Windows Movie Maker, sono passato a Sony Vegas Pro
              e oggi lavoro principalmente su DaVinci Resolve per montaggio e post-produzione.
              Ho curato locandine e materiali grafici, montato tracce audio su REAPER e, più di
              recente, il montaggio di un podcast. Un profilo creativo che affianca il mio lavoro
              da Full Stack Developer: occhio alla composizione, al ritmo visivo e alla comunicazione.
            </p>
          </div>
        </div>

        <SkillsRibbon />
      </div>
      <MobileScrollHint sectionIndex={1} sectionSelector=".about-skills" />
      <MobileSwipeHint sectionIndex={1} nextSectionIndex={2} sectionSelector=".about-skills" />
    </Section>
  )
}
