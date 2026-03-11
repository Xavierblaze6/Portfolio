import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import ContactSection from '@/components/site/ContactSection'

export default function ContactPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)] min-h-screen">
      <SiteHeader />
      <ContactSection showSectionFooter={false} />
      <SiteFooter />
    </main>
  )
}
