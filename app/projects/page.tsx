import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import ProjectsSection from '@/components/site/ProjectsSection'

export default function ProjectsPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)] min-h-screen">
      <SiteHeader />
      <ProjectsSection showSectionLabel={false} />
      <SiteFooter />
    </main>
  )
}
