import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import AboutSection from '@/components/site/AboutSection'

export default function AboutPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)] min-h-screen">
      <SiteHeader />
      <AboutSection showReadMore={false} />
      <SiteFooter />
    </main>
  )
}
