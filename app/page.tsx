import SiteFooter from '@/components/site/SiteFooter'
import SiteHeader from '@/components/site/SiteHeader'
import SkillsSection from '@/components/site/SkillsSection'
import AboutSection from '@/components/site/AboutSection'
import ExperienceSection from '@/components/site/ExperienceSection'
import ProjectsSection from '@/components/site/ProjectsSection'
import HeroSection from '@/components/site/HeroSection'
import ContactSection from '@/components/site/ContactSection'

export default function Home() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)]">
      <SiteHeader />

      <HeroSection />

      <AboutSection />

      <ExperienceSection />

      <SkillsSection />

      <ProjectsSection />

      <ContactSection />

      <SiteFooter />
    </main>
  )
}
